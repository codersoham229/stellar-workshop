"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isConnected as freighterIsConnected,
  requestAccess as freighterRequestAccess,
  getAddress as freighterGetAddress,
  isAllowed as freighterIsAllowed,
} from "@stellar/freighter-api";

export interface UseStellarWalletReturn {
  /** User's Stellar public key (G-address), or null if disconnected */
  publicKey: string | null;
  /** Alias for publicKey */
  address: string | null;
  /** True if user has connected their wallet */
  isConnected: boolean;
  /** True if Freighter extension is installed, false if not, null during initial check */
  isInstalled: boolean | null;
  /** True while performing connection or check operations */
  isLoading: boolean;
  /** Connection or wallet error message if any */
  error: string | null;
  /** Function to trigger wallet connection request */
  connect: () => Promise<string | null>;
  /** Function to disconnect wallet */
  disconnect: () => void;
  /** Function to get user's public key */
  getPublicKey: () => Promise<string | null>;
  /** Function to re-check extension presence and connection status */
  checkConnection: () => Promise<boolean>;
}

const STORAGE_KEY = "stellar_wallet_connected";

/**
 * Custom React hook `useStellarWallet` for Stellar Testnet Web3 apps using `@stellar/freighter-api`.
 *
 * 1. Checks if the Freighter browser extension is installed (`isConnected()`).
 * 2. Handles connecting & disconnecting (`requestAccess()`, `getAddress()` / `getPublicKey()`).
 * 3. Stores public key, connection status, and errors in React state.
 * 4. Exports `connect()`, `disconnect()`, and `getPublicKey()` methods.
 */
export function useStellarWallet(): UseStellarWalletReturn {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to extract address string from freighter response
  const extractAddress = (res: unknown): string | null => {
    if (!res) return null;
    if (typeof res === "string") return res;
    if (typeof res === "object") {
      const obj = res as { address?: string; publicAddress?: string; publicKey?: string; error?: unknown };
      if (obj.error) return null;
      if (typeof obj.address === "string") return obj.address;
      if (typeof obj.publicAddress === "string") return obj.publicAddress;
      if (typeof obj.publicKey === "string") return obj.publicKey;
    }
    return null;
  };

  // Helper to extract boolean result from freighter response
  const extractBoolean = (res: unknown): boolean => {
    if (typeof res === "boolean") return res;
    if (typeof res === "object" && res !== null) {
      const obj = res as { isConnected?: boolean; isAllowed?: boolean; error?: unknown };
      if (typeof obj.isConnected === "boolean") return obj.isConnected;
      if (typeof obj.isAllowed === "boolean") return obj.isAllowed;
    }
    return Boolean(res);
  };

  // getPublicKey method
  const getPublicKey = useCallback(async (): Promise<string | null> => {
    try {
      const res = await freighterGetAddress();
      const addr = extractAddress(res);
      if (addr) {
        setPublicKey(addr);
      }
      return addr;
    } catch (err: unknown) {
      console.error("Error retrieving Stellar public key:", err);
      return null;
    }
  }, []);

  // Check connection status & extension installation
  const checkConnection = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (typeof window === "undefined") {
        setIsInstalled(false);
        setIsLoading(false);
        return false;
      }

      // 1. Check if Freighter extension is installed (isConnected())
      const connectedRes = await freighterIsConnected();
      const installed = extractBoolean(connectedRes);
      setIsInstalled(installed);

      if (!installed) {
        setIsConnected(false);
        setPublicKey(null);
        setIsLoading(false);
        return false;
      }

      // 2. Check if wallet permission was previously allowed
      const allowedRes = await freighterIsAllowed();
      const allowed = extractBoolean(allowedRes);
      const wasConnectedLocally = localStorage.getItem(STORAGE_KEY) === "true";

      if (allowed && wasConnectedLocally) {
        const keyRes = await freighterGetAddress();
        const key = extractAddress(keyRes);

        if (key) {
          setPublicKey(key);
          setIsConnected(true);
          setIsLoading(false);
          return true;
        }
      }

      setIsConnected(false);
      setPublicKey(null);
      setIsLoading(false);
      return false;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to check Freighter extension status.";
      console.error("Error checking Stellar wallet connection:", err);
      setError(errorMessage);
      setIsConnected(false);
      setPublicKey(null);
      setIsLoading(false);
      return false;
    }
  }, []);

  // Initial check on hook mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Connect wallet method using requestAccess() and getAddress() / getPublicKey()
  const connect = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Check if Freighter is installed
      const connectedRes = await freighterIsConnected();
      const installed = extractBoolean(connectedRes);
      setIsInstalled(installed);

      if (!installed) {
        const errMsg =
          "Freighter extension is not installed. Please install Freighter from https://www.freighter.app";
        setError(errMsg);
        setIsLoading(false);
        return null;
      }

      // 2. Request access from user (requestAccess())
      const accessRes = await freighterRequestAccess();
      if (typeof accessRes === "object" && accessRes !== null && "error" in accessRes && accessRes.error) {
        const errObj = accessRes as { error: string };
        throw new Error(errObj.error || "User rejected connection request.");
      }

      let key = extractAddress(accessRes);

      // 3. Fallback to getAddress() / getPublicKey() if requestAccess did not return key directly
      if (!key) {
        const keyRes = await freighterGetAddress();
        key = extractAddress(keyRes);
      }

      if (!key) {
        throw new Error("Could not retrieve Stellar public key from Freighter.");
      }

      // 4. Update React state & save connection flag
      setPublicKey(key);
      setIsConnected(true);
      setError(null);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, "true");
      }
      setIsLoading(false);
      return key;
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Failed to connect to Freighter wallet.";
      console.error("Freighter wallet connection error:", err);
      setError(message);
      setIsConnected(false);
      setPublicKey(null);
      setIsLoading(false);
      return null;
    }
  }, []);

  // Disconnect wallet method
  const disconnect = useCallback(() => {
    setPublicKey(null);
    setIsConnected(false);
    setError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    publicKey,
    address: publicKey,
    isConnected,
    isInstalled,
    isLoading,
    error,
    connect,
    disconnect,
    getPublicKey,
    checkConnection,
  };
}

export default useStellarWallet;

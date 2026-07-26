import {
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Memo,
  Asset,
  BASE_FEE,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

// Horizon server & Network passphrase configuration for Stellar Testnet
export const HORIZON_TESTNET_URL = "https://horizon-testnet.stellar.org";
export const STELLAR_NETWORK_PASSPHRASE = Networks.TESTNET;

// Default Organizer Public Key on Stellar Testnet for ticket sales
export const DEFAULT_ORGANIZER_PUBLIC_KEY =
  "GDXJCYG3V6T4E7NMCY5M6O3MKZG5U5VJ3K2L1ABCDEF";

export interface PurchaseTicketParams {
  /** Purchaser's Stellar public key (G-address) */
  userPublicKey: string;
  /** Ticket tier price in XLM (e.g., 5 or 15) */
  tierPriceXlm: number | string;
  /** Custom memo text to identify the ticket purchase (max 28 bytes) */
  memoText: string;
  /** Optional target organizer public key (defaults to DEFAULT_ORGANIZER_PUBLIC_KEY) */
  organizerPublicKey?: string;
}

export interface PurchaseTicketResultSuccess {
  success: true;
  hash: string;
}

export interface PurchaseTicketResultError {
  success: false;
  error: string;
}

export type PurchaseTicketResult =
  | PurchaseTicketResultSuccess
  | PurchaseTicketResultError;

/**
 * Asynchronous helper function to purchase a conference ticket on Stellar Testnet.
 *
 * 1. Fetches user account details from Horizon Testnet.
 * 2. Builds a payment transaction sending `tierPriceXlm` XLM to organizer.
 * 3. Attaches custom `Memo.text(memoText)` to identify the ticket type.
 * 4. Configures base fee (10,000 stroops) and 30-second timeout.
 * 5. Signs transaction XDR with Freighter (`signTransaction`).
 * 6. Submits transaction to Horizon and returns `{ success: true, hash }` or `{ success: false, error }`.
 */
export async function purchaseTicket({
  userPublicKey,
  tierPriceXlm,
  memoText,
  organizerPublicKey = DEFAULT_ORGANIZER_PUBLIC_KEY,
}: PurchaseTicketParams): Promise<PurchaseTicketResult> {
  try {
    if (!userPublicKey) {
      return { success: false, error: "User public key is required." };
    }

    const server = new Horizon.Server(HORIZON_TESTNET_URL);

    // 1. Fetch user account details from Stellar Testnet Horizon
    let sourceAccount;
    try {
      sourceAccount = await server.loadAccount(userPublicKey);
    } catch (err: unknown) {
      console.error("Failed to load user account from Horizon:", err);
      return {
        success: false,
        error:
          "User account not found on Stellar Testnet. Please fund account using Friendbot.",
      };
    }

    // 2. Format memo text (Stellar Memo.text allows up to 28 bytes)
    const sanitizedMemoText = memoText.slice(0, 28);

    // 3. Build Payment Transaction
    // Base fee: 10,000 stroops (0.001 XLM) or BASE_FEE
    const customFee = "10000";

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: customFee,
      networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
    })
      .addOperation(
        Operation.payment({
          destination: organizerPublicKey,
          asset: Asset.native(),
          amount: tierPriceXlm.toString(),
        })
      )
      .addMemo(Memo.text(sanitizedMemoText))
      .setTimeout(30) // Set reasonable timeout (30 seconds)
      .build();

    const xdr = transaction.toXDR();

    // 4. Sign transaction XDR with Freighter extension
    let signedResult;
    try {
      signedResult = await signTransaction(xdr, {
        networkPassphrase: STELLAR_NETWORK_PASSPHRASE,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "User rejected signing request.";
      return { success: false, error: `Freighter signing failed: ${msg}` };
    }

    // Extract signed XDR string from response
    let signedXdr: string | null = null;
    if (typeof signedResult === "string") {
      signedXdr = signedResult;
    } else if (typeof signedResult === "object" && signedResult !== null) {
      const obj = signedResult as { signedTxXdr?: string; error?: string };
      if (obj.error) {
        return { success: false, error: `Freighter signing error: ${obj.error}` };
      }
      signedXdr = obj.signedTxXdr || null;
    }

    if (!signedXdr) {
      return {
        success: false,
        error: "Failed to retrieve signed transaction XDR from Freighter.",
      };
    }

    // 5. Submit signed transaction to Horizon Testnet
    const transactionToSubmit = TransactionBuilder.fromXDR(
      signedXdr,
      STELLAR_NETWORK_PASSPHRASE
    );

    const response = await server.submitTransaction(transactionToSubmit);

    return {
      success: true,
      hash: response.hash,
    };
  } catch (err: unknown) {
    console.error("purchaseTicket transaction error:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Failed to process ticket purchase transaction on Stellar.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export default purchaseTicket;

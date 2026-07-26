# 🎟️ Stellar Web3 Ticket Reservation App

A lightweight, high-performance decentralized web application for purchasing virtual event tickets on the **Stellar Testnet**. Built using **React**, **Tailwind CSS**, `@stellar/stellar-sdk`, and the **Freighter Wallet API**.

![Stellar Testnet](https://img.shields.io/badge/Network-Stellar%20Testnet-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 🚀 Overview

Traditional event ticketing platforms suffer from predatory platform fees, slow transaction processing, and fraudulent secondary sales. 

This project demonstrates how the **Stellar Blockchain** solves these challenges by enabling instant, micro-fee ticket purchases. Users connect their **Freighter Wallet**, select a ticket tier (e.g., General Admission vs. VIP), and pay directly in **XLM**. Once confirmed on-chain, the application generates a dynamic **Digital Ticket Pass** containing the unique **Transaction Hash** as proof of entry.

---

## ✨ Key Features

- 🔐 **Seamless Wallet Connection:** Integrated with the `@stellar/freighter-api` for safe key management and transaction signing.
- ⚡ **Instant Settlement:** Leverages Stellar’s fast 3–5 second network finality for real-time ticket issuance.
- 🏷️ **Dynamic Tiering:** Multi-tier support (General Admission = 5 XLM, VIP = 15 XLM) passing tier metadata via Stellar transaction `Memo`.
- 🎟️ **Proof-of-Reservation Pass:** Generates a dynamic digital pass displaying the holder's address, tier, and verifiable transaction hash.
- 🔍 **Explorer Verification:** Direct deep-link to verify payments on [StellarExpert Explorer](https://stellar.expert/explorer/testnet).

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Blockchain SDK:** `@stellar/stellar-sdk`
- **Wallet Provider:** `@stellar/freighter-api`
- **Network:** Stellar Testnet (Horizon API)

---

## ⚙️ Installation & Setup

### Prerequisites

1. Install the **[Freighter Wallet Extension](https://www.freighter.app/)** in your browser.
2. Switch Freighter network settings to **Testnet**.
3. Fund your test account with testnet XLM using the **[Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator)**.

### Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/stellar-ticket-app.git](https://github.com/your-username/stellar-ticket-app.git)
   cd stellar-ticket-app

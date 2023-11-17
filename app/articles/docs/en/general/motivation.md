---
id: general-motivation
title: motivation
description: Motivation for the development of whitehat, an on-chain bug bounty protocol
---

## what is whitehat ?

whitehat protocol is a program on the solana blockchain, submitted by a team of [WBA]() members for [solana hyperdrive hackathon](https://hyperdrive.solana.com/).

currently deployed on devnet at : `HATo3yGickypg7QCZJjZAAMYNicGatoDp6b1WKuYx7vm`.

## bounty protocol : but anonymous, fast and fair.

bug bounty protocols are bureaucratic and time-consuming for both parties, id disclosure mandatory, and risks of duplicated reports often discourage whitehats.

how can crypto fix this ?

- anonymity : pseudonymous identity (pubkey), confidential transfers, throwaway keys.
- faster & safer iterations : hackers submits a vulnerability, protocol validates it's legitimacy, hacker proceeds to hack, once validated
- fair payout : if you can hack it, you'll get paid !\*

## anonimity

we believe privacy is a human right.

we'll never sell your data, and we despise companies doing so.

our protocol enforces privacy by using these following technologies :

1. ed25519-ecies [[npm](https://www.npmjs.com/package/@whitehat-xyz/ed25519-ecies)] [[github](https://github.com/ez-krk/whitehat/main/ed25519-ecies/)]: an ecies implementation for ed25519 keys on solana.
2. throwaway keys : vulnerability report can be encrypted without exposing your public key (we create one on the fly).
3. confidential transfers (unimplemented)

## faster & safer iterations

by allowing whitehats to hack with impunity\*, we can discover vulnerability before bad guys do !

moving fast and breaking things : but with satefy !

the ecosystem benefits as a whole, actors of the supply-chain iterate faster and minimize financial risks, while sharpening their skills.

## fair payout

traditional bug bounty platform are time-consuming, you risk to get your work duplicated, and they often try to discard payments.

how we fix this ?

1. you know beforehand the protocol tvl, payout percentage and average response time 😉
1. fair dispute resolution (dao comprising whitehats and protocols)

## responsible disclosure

we enforce the principle of responsible disclosure, by encrypting a vulnerability reports for it's corresponding protocol encryption public key deterministically generated, which only protocol owner can retrieve the private key to decrypt the messages.

## \* you must return all funds

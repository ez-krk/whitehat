---
id: protocol-register
title: register
description: instructions to  register a protocol.
---

## instructions to register a protocol.

to register a protocol there are few prerequesites :

- protocol name (_max 50 characters_)
- whitehat percent : percent whitehats get paid to return all funds.
- your 1st program address (_you can add more later_)
- signer must be the **upgrade authority** of your program (_hot wallet, ledger, multisig, governance, etc.._)

## account array

| name             | mut | sig | description                                          |
| ---------------- | :-: | :-: | ---------------------------------------------------- |
| `owner`          | ✅  | ✅  | signer, payer of the transaction.                    |
| `encryption`     |     |     | deterministic keypair generated on front-end.        |
| `auth`           |     |     | this account doesn't exist, but is required to sign. |
| `vault`          | ✅  |     | whitehat vault holding the sol to be recovered.      |
| `protocol`       | ✅  |     | user pda for your protocol.                          |
| `analytics`      | ✅  |     | global pda for analytics.                            |
| `system_program` |     |     | the solana system program id.                        |

## instruction arguments

| args      |   type   | description                                           |
| --------- | :------: | ----------------------------------------------------- |
| `name`    | `string` | `protocol` name visible by everyone.                  |
| `percent` |  `u64`   | the percent you pay to whitehats returning all funds. |

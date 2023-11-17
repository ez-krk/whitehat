---
id: protocol-approve
title: approve
description: instructions to approve a vulnerability or exploit
---

## instructions to approve a vulnerability or exploit

they're not the same instruction, but their user experience is similar.

⚠️**make sure the vulnerability reports conforms to our minimum vulnerability template**⚠️

- ⚠️ **you must follow the minimum vulnerability template** ⚠️
- a `.txt`file or [node.js]()
- use either our [cli tool]() or [npm package]()
- encrypt the vulnerability for a **protocol encryption public key**.

## approve vulnerability account array

| name             | mut | sig | description                                                |
| ---------------- | :-: | :-: | ---------------------------------------------------------- |
| `owner`          | ✅  | ✅  | signer of the transaction, protocol owner.                 |
| `protocol`       |     |     | `protocol.owner` must me `program_data` upgrade authority. |
| `vulnerability`  | ✅  |     | your vulnerability report.                                 |
| `analytics`      | ✅  |     | global pda for analytics.                                  |
| `system_program` |     |     | the solana system program id.                              |

## approve exploit account array

| name             | mut | sig | description                                                |
| ---------------- | :-: | :-: | ---------------------------------------------------------- |
| `owner`          | ✅  | ✅  | whitehat, signer of the transaction                        |
| `protocol`       |     |     | `protocol.owner` must me `program_data` upgrade authority. |
| `vulnerability`  | ✅  |     | your vulnerability report.                                 |
| `analytics`      | ✅  |     | global pda for analytics.                                  |
| `system_program` |     |     | the solana system program id.                              |

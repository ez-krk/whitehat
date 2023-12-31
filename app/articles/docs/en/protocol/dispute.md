---
id: protocol-dispute
title: dispute
description: instructions to dispute a vulnerability or exploit
---

## instructions to dispute a vulnerability or exploit

for a vulnerability report, here are the requirements :

- ⚠️ **you must follow the minimum vulnerability template** ⚠️
- a `.txt`file or [node.js]()
- use either our [cli tool]() or [javascript library]()
- encrypt the vulnerability for a **protocol encryption public key**.

## account array

| name             | mut | sig | description                                                 |
| ---------------- | :-: | :-: | ----------------------------------------------------------- |
| `signer`         | ✅  | ✅  | whitehat, signer of the transaction                         |
| `program_data`   |     |     | program address you want to add to your protocol.           |
| `payout`         | ✅  |     | any address your want to get paid (_we don't support sns_). |
| `protocol`       | ✅  |     | `protocol.owner` must me `program_data` upgrade authority.  |
| `vulnerability`  | ✅  |     | your vulnerability report.                                  |
| `analytics`      | ✅  |     | global pda for analytics.                                   |
| `system_program` |     |     | the solana system program id.                               |

## instruction arguments

| args      |  type   | description                                          |
| --------- | :-----: | ---------------------------------------------------- |
| `message` | `bytes` | encrypted message as `Buffer`, `Vec<u8>` or `&[u8]`. |
| `id`      |  `u64`  | the vulnerability id.                                |
| `seed`    |  `u64`  | random number.                                       |

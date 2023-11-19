---
id: protocol-approve
title: approve
description: approve a vulnerability or exploit
---

## approve a vulnerability or exploit

they're not the same instructions, but share a similar user experience.

⚠️**make sure the vulnerability reports conforms to our minimum vulnerability template**⚠️

## minimum vulnerability template

```md
## account constraint on protocol account.

## clear description, including how it was discovered.

## steps to reproduce.

## severity level (low, medium, high, critical).

## any supporting evidence (screenshots, logs, etc..).

## recommendations for fixing the issue.
```

## approve vulnerability accounts array

| name          | mut | sig | description                                                |
| ------------- | --- | --- | ---------------------------------------------------------- |
| owner         | ✔️  | ✔️  | signer of the transaction, protocol owner.                 |
| protocol      | ❌  | ❌  | `protocol.owner` must me `program_data` upgrade authority. |
| vulnerability | ✔️  | ❌  | the vulnerability report to approve                        |
| analytics     | ✔️  | ❌  | global pda for analytics.                                  |

## approve exploit account array

| name             | mut | sig | description                                                |
| ---------------- | :-: | :-: | ---------------------------------------------------------- |
| `owner`          | ✅  | ✅  | whitehat, signer of the transaction                        |
| `protocol`       |     |     | `protocol.owner` must me `program_data` upgrade authority. |
| `vulnerability`  | ✅  |     | your vulnerability report.                                 |
| `analytics`      | ✅  |     | global pda for analytics.                                  |
| `system_program` |     |     | the solana system program id.                              |

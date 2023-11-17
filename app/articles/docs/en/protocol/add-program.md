---
id: protocol-add-program
title: add program
description: instructions to add a program to a protocol (requires a registered protocol).
---

## instructions to register add a program.

to add a program, here are the requirements :

- program address
- signer must be the the program's **upgrade authority**

## account array

| name             | mut | sig | description                                                          |
| ---------------- | :-: | :-: | -------------------------------------------------------------------- |
| `owner`          | ✅  | ✅  | signer of the transaction, must me `program_data` upgrade authority. |
| `program_data`   |     |     | program address you want to add to your protocol.                    |
| `protocol`       | ✅  |     | user pda for your protocol.                                          |
| `analytics`      | ✅  |     | global pda for analytics.                                            |
| `system_program` |     |     | the solana system program id.                                        |

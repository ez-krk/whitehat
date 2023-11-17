---
id: toolbox-command-line-interface
title: command line interface
description: command line interface
---

## command line interface

usage documentation for whitehat-cli [crate](), generated with [soda](https://www.usesoda.dev/) 🥤

## dependencies

- [rust](https://www.rust-lang.org/)
- [solana-cli](https://docs.solana.com/cli/)

## usage

### ① install whitehat-cli

```bash
$ cargo install whitehat-cli
```

### ② report a vulnerability

```bash
$ whitehat </path/to/keypair.json> report_vulnerability </path/to/message.txt> <id> <seed>
// example :
$ whitehat keypair.json report_vulnerability H37Zh3Hcu9N7vMqX8z2fAWXgsvpdT5VCvw55DwHzcBTm HATo3yGickypg7QCZJjZAAMYNicGatoDp6b1WKuYx7vm message.txt 1 1
```

### ③ deposit funds

```bash
$ whitehat keypair.json deposit_sol_hack <payout_pubkey> <protocol_owner_pubkey> <id> <seed>
// example :
$ whitehat keypair.json deposit_sol_hack H37Zh3Hcu9N7vMqX8z2fAWXgsvpdT5VCvw55DwHzcBTm HATo3yGickypg7QCZJjZAAMYNicGatoDp6b1WKuYx7vm 1 1
```

now you have wait protocol to validate your exploit, if no dispute is raised : funds will be deposited after review ⭐️

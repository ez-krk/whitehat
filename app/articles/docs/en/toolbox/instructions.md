---
id: toolbox-instructions
title: instructions
description: whitehat program instructions
---

## initialize

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| admin         | ✔️  | ✔️  |             |
| auth          | ❌  | ❌  |             |
| vault         | ❌  | ❌  |             |
| analytics     | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

## register protocol

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| owner         | ✔️  | ✔️  |             |
| encryption    | ❌  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| auth          | ❌  | ❌  |             |
| vault         | ✔️  | ❌  |             |
| analytics     | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

### instruction arguments

| name    | type   | description |
| ------- | ------ | ----------- |
| name    | string |             |
| percent | u64    |             |

## add program

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| owner         | ✔️  | ✔️  |             |
| programData   | ❌  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| analytics     | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

## report vulnerability

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| signer        | ✔️  | ✔️  |             |
| programData   | ❌  | ❌  |             |
| payout        | ❌  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| vulnerability | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

### instruction arguments

| name    | type  | description |
| ------- | ----- | ----------- |
| message | bytes |             |
| id      | u64   |             |
| seed    | u64   |             |

## approve vulnerability

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| owner         | ✔️  | ✔️  |             |
| protocol      | ❌  | ❌  |             |
| vulnerability | ✔️  | ❌  |             |
| analytics     | ✔️  | ❌  |             |

## deposit sol hack

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| signer        | ✔️  | ✔️  |             |
| payout        | ❌  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| vault         | ✔️  | ❌  |             |
| vulnerability | ❌  | ❌  |             |
| hack          | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

## claim sol

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| owner         | ✔️  | ✔️  |             |
| auth          | ❌  | ❌  |             |
| vault         | ✔️  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

## approve sol hack

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| owner         | ✔️  | ✔️  |             |
| auth          | ❌  | ❌  |             |
| vault         | ✔️  | ❌  |             |
| fees          | ✔️  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| payout        | ✔️  | ❌  |             |
| hack          | ✔️  | ❌  |             |
| analytics     | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

## delete protocol

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| admin         | ✔️  | ✔️  |             |
| programData   | ❌  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| analytics     | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

## delete vulnerability

### accounts array

| name          | mut | sig | description |
| ------------- | --- | --- | ----------- |
| admin         | ✔️  | ✔️  |             |
| programData   | ❌  | ❌  |             |
| protocol      | ✔️  | ❌  |             |
| vulnerability | ✔️  | ❌  |             |
| analytics     | ✔️  | ❌  |             |
| systemProgram | ❌  | ❌  |             |

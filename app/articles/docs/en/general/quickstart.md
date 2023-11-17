---
id: general-quickstart
title: quickstart
description: describes the whitehat protocol
---

**tl;dr** : _it's a 2 steps workflow : **vulnerability report**, then **exploit**_ (protocol validates each step).

## warnings

⚠️ **whitehats have to follow the minimum vulnerability template** ⚠️

⚠️ **by using whitehat, protocols agrees to legally discharge whitehats returning all funds** ⚠️

⚠️ **to hack with impunity, whitehats must return all funds** ⚠️

## 🧪 workflow 🧪

### protocol

1. [register](/docs/protocol/register/) set _name_, _whitehat percent_.
2. [add program](/docs/protocol/add-program/) signer must be _program upgrade authority_.
3. [vulnerability approval](https://nodejs.org/ja/) (or _dispute_)
4. [exploit approval](https://nodejs.org/ja/) (or _dispute_)
5. voilà !

### whitehat

1. [scout](/docs/whitehat/scout/)
2. [vulnerability](/docs/whitehat/vulnerability/)
3. [exploit](/docs/whitehat/exploit/)
4. voilà !

### dispute resolution

we constrained dispute resolution to whitehat protocol **upgrade authority** only.

this means, once we move program authority to a _squad_ : the _squad_ will handle dispute resolutions.

we plan to move the program authority on a _squad_ and later on a _realm_.

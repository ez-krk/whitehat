---
id: general-quickstart
title: quickstart
description: describes the whitehat protocol
---

## what is whitehat ?

⚡️ bounty protocol : but anonymous, fast and fair. ⚡️

tl;dr : _it's a 2 steps workflow : **vulnerability report**, then **exploit**_ (protocol validates each step).

whitehat protocol is a program on the solana blockchain, submitted by a team of [WBA]() members for [solana hyperdrive hackathon](https://hyperdrive.solana.com/), currently deployed on devnet.

currently deployed program address : `HATo3yGickypg7QCZJjZAAMYNicGatoDp6b1WKuYx7vm`.

we bring the followings to the bug bounty industry :

1. no bureacracy
2. privacy
3. legal discharge
4. fair payout

in this documentation, you may read a lot the words **protocol** and **whitehat** :

- **protocol** refers to a developer owning and registering other programs in ours, and paying **whitehat** for a set percentage if they report a vulnerability and return all the funds.
- **whitehat** refers to a developer or "_hacker_" interacting with our program, and programs owned by a **protocol** in attempt to cause unwanted behavior (often withdrawing tokens), help the **protocol** team to iterate on the issue, and get paid after returning all funds obtained this way.

**by using whitehat, protocols agrees to legally discharge whitehats returning all fudns**

⚠️ whitehats have to follow the minimum vulnerability template ⚠️

## 🧪 workflow 🧪

### protocol

1. [protocol registration](/docs/protocol/register/) set _name_, _whitehat percent_.
2. [add program](/docs/protocol/register/) signer must be _program upgrade authority_.
3. [vulnerability approval](https://nodejs.org/ja/) (or _dispute/appeal_)
4. [exploit approval](https://nodejs.org/ja/)
5.

### whitehat

1. [vulnerability report](https://nodejs.org/ja/) ^18.18.0
2. [exploit](https://nodejs.org/ja/)
3. [payout](https://nodejs.org/ja/)
   (recovered funds split, or _dispute/appeal_)

※ We don't write Java but we need it for mobile apps working

## 📗 Usage 📗

### ① Install Skeet/Firebase CLI

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### ② Create Skeet App

```bash
$ skeet create <appName>
```

![Skeet Create Select Template](/doc-images/cli/SkeetCreateSelectTemplate.png)

You can choose a template for the frontend.

- [Next.js (React)](https://nextjs.org/)
- [Expo (React Native)](https://expo.dev/)

※ This tutorial uses the Expo version, but you can use the same procedure even using the Next.js version.

### ③ Run Skeet App

```bash
$ cd <appName>
$ skeet s
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

📲 Frontend(Expo) - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

**⚠️ You need to finish _Activate Skeet ChatApp_ step to fully use default Skeet App ⚠️**

## 🤖 Activate Skeet ChatApp 🤖

### ① Create Googel Cloud Project

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### ② Add Firebase Project

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### ③ Activate Firebase Build

#### - Activate Firebase Authentication

- Activate Firebase Authentication
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

#### - Activate Firebase Firestore

- Activate Firestore
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

#### - Firebase Storage

- Activate Firebase Storage
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-storage.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-storage.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-storage.png)

### ④ Skeet init to setup project

Run _skeet init_ command and select your GCP Project ID and Regions to setup.

Then, please visit the URL to authenticate your Firebase account.

```bash
$ skeet init --only-dev
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1

Visit this URL on this device to log in:

https://accounts.google.com/o/oauth2/auth?project...

Waiting for authentication...
```

### ⑤ How to setup Secret Key

#### - Upgrade to Firebase Blaze Plan

Skeet Framework uses [Cloud Secret Manager](https://firebase.google.com/docs/functions/config-env?hl=en&gen=2nd) environment variables to manage sensitive information such as API keys.

This command requires a Firebase Blaze or higher plan.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan-en.png)

From the Firebase console's bottom left menu, select _Upgrade_.

- [Firebase Console](https://console.firebase.google.com/u/0/project/_/usage/details)

#### - Cloud Usage of Skeet Framework

Skeet Framework requires a Firebase Blaze plan or higher.

Google Cloud Free Program should cover the usage fee for the development environment.

The Google Cloud Free Tier has two parts:

- A 90-day free trial with a $300 credit to use with any Google Cloud services.
- Always Free, which provides limited access to many common Google Cloud resources, free of charge.

[Free cloud features and trial offer](https://cloud.google.com/free/docs/free-cloud-features)

[Firabse Blaze Pricing Plans](https://firebase.google.com/pricing#blaze-calculator)

**⚠️ We also recommend setting things like budget alerts to avoid unexpected charges. ⚠️**

- [Avoid surprise bills](https://firebase.google.com/docs/projects/billing/avoid-surprise-bills)

#### - Set Secret Key in Cloud Secret Manager

using the _skeet add secret <secretKey>_ command

Set the OpenAI API key as an environment variable.

```bash
$ skeet add secret CHAT_GPT_ORG
? Enter value for CHAT_GPT_ORG: <yourOpenAIKey>
```

Set CHAT_GPT_KEY as well.

```bash
$ skeet add secret CHAT_GPT_KEY
? Enter value for CHAT_GPT_KEY: <yourOpenAIKey>
```

You can also write it in _functions/skeet/.env_ to try it easily,
This method does not translate to production environments.

#### - Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

Now you are ready to use Skeet ChatApp 🎉

## 📱 User Login Auth 📱

```bash
$ skeet s
```

Run Skeet App locally and access to

[http://localhost:19006/register](http://localhost:19006/register)

Let's create a new user account with your email address and password.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/user-register.png)

After registration, you will see the console log like below.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation.png)

Click the link in the console log to verify your email address.

```bash
To verify the email address epics.dev@gmail.com, follow this link: <Link>
```

Successfully verified your email address.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation-clicked.png)

## ✉️ Create AI Chat Room ✉️

After login, access this page to create a chat room.

[http://localhost:19006/user/open-ai-chat](http://localhost:19006/user/open-ai-chat)

Let's create a chat room with the following settings.

OpenAI Chat Room Settings

| item             | description                       | type                |
| ---------------- | --------------------------------- | ------------------- |
| Model            | Select OpenAI API's Model         | gpt3.5-turbo / gpt4 |
| Max Tokens       | Set OpenAI API's Max Tokens       | number              |
| Temperature      | Set OpenAI API's Temperature      | number              |
| System Charactor | Set OpenAI API's System Charactor | string              |

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-chatroom.png)

Now you are all set 🎉

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-chat-stream.gif)

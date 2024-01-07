# Angle Berry Client

## Development

This is a step-by-step guide on how to set up and run this project on your computer.

### 1. Installing NodeJS

Ensure that you have the latest (LTS) version (20) of [NodeJS](https://nodejs.org) installed on your system. [NodeJS](https://nodejs.org) is required to run the development environment for this project.

### 2. Installing PNPM

If you don't have PNPM installed on your system, you will need to install it before proceeding with the setup. PNPM is required for this repository, and it's an alternative package manager to NPM or Yarn.

To install PNPM, open a terminal and run the following command:

```cmd
npm i -g pnpm
```

Once you have PNPM installed, continue with the remaining steps:

### 3. Installing Git

https://www.git-scm.com/downloads

### 3. Clone the projects

1. Run this in your terminal: `git clone --depth 1 https://github.com/babakfp/angle-berry-client.git`
2. Run this in your terminal: `git clone --depth 1 https://github.com/babakfp/angle-berry-server.git`

### 3. Setup Steps

Open the projects in two separate vsCode instances.

To set up the development environment for your project, follow these steps:

1. Duplicate the [`.env.example`](./.env.example) file located in the root of your project and rename the duplicate file to `.env`.
2. In the [`angle-berry-server`](https://github.com/babakfp/angle-berry-server) directory, open a terminal and run the following command to start the server: `pnpm serve`.
3. Once the server is running, copy the domain address displayed in the terminal. For example, it might be `http://127.0.0.1:8090`.
4. Update the value for `PUBLIC_POCKETBASE_URL` in the [`.env`](./.env) file with the copied domain address.
5. Run `pnpm i` and `pnpm dev`.

You have now completed all steps 🎉.

## Todo

-   BUG: When sending a new message in the chat and immediately attempting to edit it, the message content is not automatically written in the input box. This issue seems to be related to the "bind" keyword. However, it is important to note that this functionality works fine for old messages.

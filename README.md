# Angle Berry (Client)

## Todo

- Update `pocketbase`.
- Add fallback for `svelte-copy`.
- BUG: When sending a new message in the chat and immediately attempting to edit it, the message content is not automatically written in the input box. This issue seems to be related to the "bind" keyword. However, it is important to note that this functionality works fine for old messages.

## Development

Before proceeding with the setup, please ensure that you have the latest version of Node.js installed on your system. Node.js is required to run the development environment for this project.

### Installing PNPM

If you don't have PNPM installed on your system, you will need to install it before proceeding with the setup. PNPM is required for this repository, and it's an alternative package manager to NPM or Yarn.

To install PNPM, open a terminal and run the following command:

```
npm i -g pnpm
```

Once you have PNPM installed, continue with the remaining steps:

### Setup Steps

To set up the development environment for your project, follow these steps:

1. Duplicate the `.env.example` file located in the root of your project and rename the duplicate file to `.env`.
2. In the `angle-berry-server` directory, open a terminal and run the following command to start the server: `serve`.
3. Once the server is running, copy the domain address displayed in the terminal. For example, it might be `http://127.0.0.1:8090`.
4. Update the values for `POCKETBASE_URL` and `PUBLIC_POCKETBASE_URL` in the `.env` file with the copied domain address.

You have now completed the necessary steps to set up your development environment using Pocketbase with SvelteKit.

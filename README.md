# Angle Berry Client

This project consists of two repositories:

-   [Angle Berry Client](https://github.com/babakfp/angle-berry-client) (current)
-   [Angle Berry Server](https://github.com/babakfp/angle-berry-server)

## Development

-   Install [NodeJS](https://nodejs.org) (v20.10.0 stable).
-   Install [PNPM](https://pnpm.io/installation) (v8.14.0 stable).
-   Install [Git](https://www.git-scm.com/downloads) (v2.40.1.windows.1 stable).
-   Install [vsCode](https://code.visualstudio.com/download) - Optional.

### Clone the repositories

-   Run `git clone --depth 1 https://github.com/babakfp/angle-berry-client.git`.
-   Run `git clone --depth 1 https://github.com/babakfp/angle-berry-server.git`.

### Setup

Open the projects in two separate vsCode instances, and:

1. In the `angle-berry-server` directory, open a terminal and run the following command to start the server: `pnpm serve`.
2. Once the server is running, copy the domain address displayed in the terminal. For example, it might be `http://127.0.0.1:8090`.
3. In the `angle-berry-server` directory, duplicate the [`.env.example`](./.env.example) file located in the root of your project and rename the duplicate file to `.env`.
4. Update the value for `PUBLIC_POCKETBASE_URL` in the [`.env`](./.env) file with the copied domain address.
5. Run `pnpm i` and `pnpm dev`.
6. Good job 🎉.

## Todo

-   BUG: When sending a new message in the chat and immediately attempting to edit it, the message content is not automatically written in the input box. This issue seems to be related to the "bind" keyword. However, it is important to note that this functionality works fine for old messages.

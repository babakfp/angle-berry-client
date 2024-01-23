# Angle Berry Client

This project consists of two repositories:

-   [Angle Berry Client](https://github.com/babakfp/angle-berry-client) (Current)
-   [Angle Berry Server](https://github.com/babakfp/angle-berry-server)

## Technology stack

### Client

-   [TypeScript](https://typescriptlang.org)
-   [Svelte](https://svelte.dev)
-   [SvelteKit](https://kit.svelte.dev)
-   [TailwindCSS](https://tailwindcss.com)

### Server

-   [PocketBase](https://pocketbase.io)

### Dependencies

#### Angle Berry Client

-   [@sveltejs/adapter-vercel](https://npmjs.com/package/@sveltejs/adapter-vercel)
-   [@sveltejs/kit](https://npmjs.com/package/@sveltejs/kit)
-   [@sveltejs/vite-plugin-svelte](https://npmjs.com/package/@sveltejs/vite-plugin-svelte)
-   [@typescript-eslint/eslint-plugin](https://npmjs.com/package/@typescript-eslint/eslint-plugin)
-   [@typescript-eslint/parser](https://npmjs.com/package/@typescript-eslint/parser)
-   [autoprefixer](https://npmjs.com/package/autoprefixer)
-   [cssnano](https://npmjs.com/package/cssnano)
-   [eslint](https://npmjs.com/package/eslint)
-   [eslint-config-prettier](https://npmjs.com/package/eslint-config-prettier)
-   [eslint-plugin-svelte](https://npmjs.com/package/eslint-plugin-svelte)
-   [phosphor-icons-svelte](https://npmjs.com/package/phosphor-icons-svelte)
-   [pocketbase](https://npmjs.com/package/pocketbase)
-   [pocketbase-typegen](https://npmjs.com/package/pocketbase-typegen)
-   [postcss](https://npmjs.com/package/postcss)
-   [postcss-load-config](https://npmjs.com/package/postcss-load-config)
-   [prettier](https://npmjs.com/package/prettier)
-   [prettier-plugin-svelte](https://npmjs.com/package/prettier-plugin-svelte)
-   [prettier-plugin-tailwindcss](https://npmjs.com/package/prettier-plugin-tailwindcss)
-   [svelte](https://npmjs.com/package/svelte)
-   [svelte-check](https://npmjs.com/package/svelte-check)
-   [svelte-copy](https://npmjs.com/package/svelte-copy)
-   [svelte-french-toast](https://npmjs.com/package/svelte-french-toast)
-   [svelte-loading-bar](https://npmjs.com/package/svelte-loading-bar)
-   [svelte-outclick](https://npmjs.com/package/svelte-outclick)
-   [svelte-select](https://npmjs.com/package/svelte-select)
-   [sveltekit-superforms](https://npmjs.com/package/sveltekit-superforms)
-   [tailwindcss](https://npmjs.com/package/tailwindcss)
-   [tailwindcss-addons](https://npmjs.com/package/tailwindcss-addons)
-   [tslib](https://npmjs.com/package/tslib)
-   [typescript](https://npmjs.com/package/typescript)
-   [vite](https://npmjs.com/package/vite)
-   [zod](https://npmjs.com/package/zod)

#### Angle Berry Server

-   [PocketBase](https://pocketbase.io)

## Hosting

-   [Angle Berry Client](https://github.com/babakfp/angle-berry-client) is hosted on [Vercel](https://vercel.com).
-   [Angle Berry Server](https://github.com/babakfp/angle-berry-server) is hosted on [Hop](https://hop.io).

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
6. Done 🎉.

#### `angle-berry-client` auth credentials

There are two users that you can switch between by the user menu:

-   User
-   -   Username: `user`
-   -   Password: `useruser`
-   Admin
-   -   Username: `admin`
-   -   Password: `adminadmin`

#### `angle-berry-server` admin credentials

Use this to log in to the PocketBase dashboard:

-   Email: `admin@example.com`
-   Password: `admin@example.com`

### Commands

-   `dev`: Run SvelteKit project.
-   `build`: Build SvelteKit project.
-   `preview`: Preview the build of SvelteKit project.
-   `prepare`: Nothing important (you don't need to run this).
-   `check`: Check for issues in the code.
-   `check:watch`: Check for issues in the code.
-   `lint`: Check for issues in the code.
-   `format`: Format and make the code look good.
-   `typegen`: Generate PocketBase schema types.

## Todo

-   BUG: When sending a new message in the chat and immediately attempting to edit it, the message content is not automatically written in the input box. This issue seems to be related to the "bind" keyword. However, it is important to note that this functionality works fine for old messages.

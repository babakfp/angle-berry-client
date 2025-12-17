# Angle Berry Client

This project consists of two repositories:

- [Angle Berry Client](https://github.com/babakfp/angle-berry-client) (Current)
- [Angle Berry Server](https://github.com/babakfp/angle-berry-server)

## Technology stack

### Client

- [TypeScript](https://typescriptlang.org)
- [Svelte](https://svelte.dev) & [SvelteKit](https://kit.svelte.dev)
- [TailwindCSS](https://tailwindcss.com)

### Server (Database)

- [PocketBase](https://pocketbase.io)

### Dependencies

#### Angle Berry Client

- [@ianvs/prettier-plugin-sort-imports](https://npmjs.com/package/@ianvs/prettier-plugin-sort-imports)
- [@sveltejs/adapter-vercel](https://npmjs.com/package/@sveltejs/adapter-vercel)
- [@sveltejs/kit](https://npmjs.com/package/@sveltejs/kit)
- [@sveltejs/vite-plugin-svelte](https://npmjs.com/package/@sveltejs/vite-plugin-svelte)
- [@tailwindcss/cli](https://npmjs.com/package/@tailwindcss/cli)
- [@tailwindcss/vite](https://npmjs.com/package/@tailwindcss/vite)
- [@types/node](https://npmjs.com/package/@types/node)
- [phosphor-icons-svelte](https://npmjs.com/package/phosphor-icons-svelte)
- [pocketbase](https://npmjs.com/package/pocketbase)
- [pocketbase-types](https://npmjs.com/package/pocketbase-types)
- [prettier](https://npmjs.com/package/prettier)
- [prettier-plugin-svelte](https://npmjs.com/package/prettier-plugin-svelte)
- [prettier-plugin-tailwindcss](https://npmjs.com/package/prettier-plugin-tailwindcss)
- [svelte](https://npmjs.com/package/svelte)
- [svelte-copy](https://npmjs.com/package/svelte-copy)
- [svelte-hot-french-toast](https://npmjs.com/package/svelte-hot-french-toast)
- [svelte-loading-bar](https://npmjs.com/package/svelte-loading-bar)
- [svelte-outclick](https://npmjs.com/package/svelte-outclick)
- [sveltekit-superforms](https://npmjs.com/package/sveltekit-superforms)
- [tailwindcss](https://npmjs.com/package/tailwindcss)
- [tailwindcss-addons](https://npmjs.com/package/tailwindcss-addons)
- [typescript](https://npmjs.com/package/typescript)
- [valibot](https://npmjs.com/package/valibot)
- [vite](https://npmjs.com/package/vite)

#### Angle Berry Server

- [PocketBase](https://pocketbase.io)

## Hosting

- [Angle Berry Client](https://github.com/babakfp/angle-berry-client) is hosted on [Vercel](https://vercel.com).
- [Angle Berry Server](https://github.com/babakfp/angle-berry-server) is hosted on?

## Development

- Install [NodeJS](https://nodejs.org) (v20.10.0 stable).
- Install [PNPM](https://pnpm.io/installation) (v8.14.0 stable).
- Install [Git](https://www.git-scm.com/downloads) (v2.40.1.windows.1 stable).
- Install [vsCode](https://code.visualstudio.com/download) - Optional.

### Clone the repositories

- Run `git clone --depth 1 https://github.com/babakfp/angle-berry-client.git`.
- Run `git clone --depth 1 https://github.com/babakfp/angle-berry-server.git`.

### Setup

Open the projects in two separate vsCode instances, and:

1. In the `angle-berry-server` directory, open a terminal and run the following command to start the server: `pnpm serve`.
2. Once the server is running, copy the domain address displayed in the terminal. For example, it might be `http://127.0.0.1:8090`.
3. In the `angle-berry-server` directory, duplicate the [`.env.example`](./.env.example) file located in the root of your project and rename the duplicate file to `.env`.
4. Update the value for `PUBLIC_PB_URL` in the [`.env`](./.env) file with the copied domain address.
5. Run `pnpm i` and `pnpm dev`.
6. Done 🎉.

#### `angle-berry-client` auth credentials

There are two users that you can switch between by the user menu:

- User
    - Username: `user`
    - Password: `useruser`
- Admin
    - Username: `admin`
    - Password: `adminadmin`

#### `angle-berry-server` admin credentials

Use this to log in to the PocketBase dashboard:

- Email: `admin@example.com`
- Password: `admin@example.com`

### Commands

- `dev`: This runs the project in development mode.
- `build`: This builds the project. You don't need to run this.
- `preview`: This previews the built project.
- `prepare`: This isn't important. You don't need to run this.
- `format`: This makes the code look pretty.
- `typegen`: This generates PocketBase TS types. Use this to update the types when the PocketBase schema changes.

## Todo

- **Issue**: When sending a new message in the chat and immediately attempting to edit it, the message content is not automatically written in the input box. This issue seems to be related to the "bind" keyword. However, it is important to note that this functionality works fine for old messages.

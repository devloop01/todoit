# todoit

A minimal todo app, powered by [`svelte`](https://github.com/sveltejs/svelte).

## Run Locally

after cloning the project run `pnpm i` (or `npm install` or `yarn`), start a development server:

```bash
pnpm dev
```

To run the `database` locally on your comuter

```bash
pnpm db:start
```

## Generating & Pushing migrations

I'm using Drizzle ORM to generate and push database migrations (both local & production)

run below command to `generate` migrations

```bash
pnpm db:generate
```

run below command to `push` the migrations

```bash
pnpm db:push
```

or instead of running separately run below command to do both (`generate` and `push`)

```bash
pnpm db:migrate
```

## Setup with Vercel

After importing the project from github in vercel add your `environment` variables

In the `Build and Output Settings` toggle `override` and set the build command to

```bash
pnpm db:migrate && vite build
```

This will create the migrations and push them to the connected `local` or `production` database

It's better to generate migrations and test locally before pushing the migrations.

PS: sometimes vercel tries to use the generated cache and that results in build error you can disable new builds to use cache using  `VERCEL_FORCE_NO_BUILD_CACHE`, and setting this value to `1`

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

## Generatinig & Pushing migrations

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

In the `Build and Output Settings` toggle `override` and set the command to

```bash
pnpm db:migrate && vite build
```

This will create all the migrations and push them to the production database that you will connect with your production application

Its better to generate migrations and test them locally after which you can commit the migrations on github which will be used by vercel to `push` into the production database

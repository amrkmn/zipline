# Zipline 4

> [!WARNING]  
> This is a work in progress, the database is not final and is subject to change without a migration.

Roadmap for v4: https://diced.notion.site/Zipline-v4-Roadmap-058aceb8a35140e7af4c726560aa3db1?pvs=4

## Running Zipline v4

Running v4 as of the latest commit is as simple as spinning up a docker container with a few of the required environment variables.

It is recommended to follow the guide available at [v4.zipline.diced.sh/docs/get-started/docker](https://v4.zipline.diced.sh/docs/get-started/docker).

There is also a guide on how to run Zipline v4 without docker [here](https://v4.zipline.diced.sh/docs/get-started/source).

# Contributing

Here are some simple instructions to get Zipline v4 running and ready to develop on.

## Prerequisites

- nodejs (lts -> 20.x, 22.x)
- pnpm (9.x)
- a postgresql server

## Setup

You should probably use a `.env` file to manage your environment variables, here is an example .env file with every available environment variable:

````bash
DEBUG=zipline

# required
CORE_SECRET="a secret"

# required
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zipline?schema=public"

# these are optional
CORE_PORT=3000
CORE_HOSTNAME=0.0.0.0

# one of these is required
DATASOURCE_TYPE="local"
DATASOURCE_TYPE="s3"

# if DATASOURCE_TYPE=local
DATASOURCE_LOCAL_DIRECTORY="/path/to/your/local/files"

# if DATASOURCE_TYPE=s3
DATASOURCE_S3_ACCESS_KEY_ID="your-access-key-id"
DATASOURCE_S3_SECRET_ACCESS_KEY="your-secret-access-key"
DATASOURCE_S3_REGION="your-region"
DATASOURCE_S3_BUCKET="your-bucket"
DATASOURCE_S3_ENDPOINT="your-endpoint" # if using a custom endpoint other than aws s3

# optional but both are required if using ssl
SSL_KEY="/path/to/your/ssl/key"
SSL_CERT="/path/to/your/ssl/cert"

````

Install dependencies:

```bash
pnpm install
```

Finally you may start the development server:

```bash
pnpm dev
```

If you wish to build the production version of Zipline, you can run the following command:

```bash
pnpm build
```

And to run the production version of Zipline:

```bash
pnpm start
```

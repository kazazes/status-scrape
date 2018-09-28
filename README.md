<h1 align="center">
📟 status-scrape ⛏
</h1>

> Scrape and analyze service uptime via statuscheck.io, controlled via a web GUI.

<h4 align="center">

[![CircleCI](https://circleci.com/gh/kazazes/status-scrape.svg?style=svg&circle-token=89eb1acb780525c0aad93ed2ca7d0c34db9ec386)](https://circleci.com/gh/kazazes/status-scrape)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=kazazes/status-scrape&identifier=150507884)](https://dependabot.com)

</span>

## Installation

```bash
git clone https://github.com/kazazes/status-scrape && cd status-scrape
yarn install
yarn run build
```

## Usage

```bash
yarn run serve
```

Then go to [http://localhost:8080/](http://localhost:8080/).

## Meta

**Peter Kazazes** – [@pkpolls](https://twitter.com/pkpolls) – peter@peterk.co

---

## Project Structure

```
packages
├── admin-frontend
├── prisma
├── scraper
└── server
```

- `admin-frontend` - A Vue.js application which controls the scraper targets and scheduling, and displays historical scraping data.
- `prisma` - A [Prisma](https://prisma.io) GraphQL data model/ORM which handles database operations.
- `scraper` - The scraper and associated utilities. These are designed to be run locally or via Google Cloud Functions. They are dispatched by the server.
- `server` - An Express server which serves the admin frontend and dispatches scheduled scraping jobs.

<h1 align="center">
status-scrape
</h1>

<h3 align="center">

[![Build Status][travis-image]][travis-url]

</span>

> Scrape and analyze service uptime via statuscheck.io, controlled via a web GUI.

A PoC MVP for [Blameless](blameless.com).

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

[travis-image]: https://api.travis-ci.com/kazazes/status-scrape.svg?token=DqckDax3jsWgZj7AnN1c&branch=master
[travis-url]: https://travis-ci.com/kazazes/status-scrape

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
- `prisma` - A [Prisma](https://prisma.io) GraphQL datamodel/ORM which handles database operations.
- `scraper` - The scraper and associated utilities. These are designed to be run via Amazon Lambda or Google Cloud Functions.
- `server` - An Express server which serves the admin frontend and dispatches scheduled scraping jobs.

# newspapers/scraper

This service is responsible for crawling https://www.freedomforum.org/todaysfrontpages and gathering all of the URL's for each newspaper.

Please be a good citizen and use this responsibly. You probably only need to run this once when first setting up.

## Setup

```sh
$ npm ci

# Create the storage bucket in Cloudflare R2.
$ npm run bucket

# This will take a moment, grab some coffee.
$ npm run crawl

# This uploads your data file to Cloudflare R2.
$ npm run upload
```
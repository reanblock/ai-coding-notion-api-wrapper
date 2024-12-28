# Notion API Wrapper

A simple API Wrapper for Notion based on [this tutorial](https://www.youtube.com/watch?v=QlUt06XLbJE).

## Some AI Prompts used

After setting up an basic boilerplate to get a page from Notion...

```
> Add main() to index.js
> update notion.js: create class NotionWrapper and initialize with the page id 
> update tests/notion.test.js: add a test for getPage()
> create modules/constants.js: move NOTION_PAGE_ID into it. Then update notion.test.js: don't mock but use the page id from constants. 
> The test is broken because the returned value is formatted using dashes in standard UUID format. Can you update the test to fix that please?
> /ask If I run the test outside of Ada using npm run test, then the test fail because the notion token does not appear to be loaded from the environment variables. How can I fix this?
> update index.js: use the NotionWrapper
> update index.js: create a cli app where we can hit any method in `notion.js` via different commands, use something like commander.
> update package.json: add a new 'run' script to run the cli from the index.js
```

## Install

```bash
npm i
```

## Run

Run using `npm`:

```bash
npm run cli getPage
```

Run using `node` and `jq` (to get pretty formatted JSON in the terminal!)

```bash
node index.js getPage | jq
```

# Test PR Update for Agent
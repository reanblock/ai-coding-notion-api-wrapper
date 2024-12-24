require('dotenv').config();
const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const NOTION_PAGE_ID="1669ae644fcd807b83d0fa18980d3e7d"

const getPage = async () => {
    const response = await notion.pages.retrieve({ page_id: NOTION_PAGE_ID })
    console.log(response)
}

const main = async () => {
    await getPage();
}

main();

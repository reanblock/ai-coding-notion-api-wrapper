require('dotenv').config();
const NotionWrapper = require('./modules/notion');

const { NOTION_PAGE_ID } = require('./modules/constants');

const getPage = async () => {
    const notionWrapper = new NotionWrapper(NOTION_PAGE_ID);
    const response = await notionWrapper.getPage();
    // console.log(response)
}

const main = async () => {
    await getPage();
}

main();

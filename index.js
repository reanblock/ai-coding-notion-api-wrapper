require('dotenv').config();
const { Command } = require('commander');
const NotionWrapper = require('./modules/notion');
const { NOTION_PAGE_ID } = require('./modules/constants');

const program = new Command();
const notionWrapper = new NotionWrapper(NOTION_PAGE_ID);

program
  .name('notion-cli')
  .description('CLI to interact with Notion API')
  .version('1.0.0');

program
  .command('getPage')
  .description('Retrieve a page from Notion')
  .action(async () => {
    try {
      const response = await notionWrapper.getPage();
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error retrieving page:', error);
    }
  });

program.parse(process.argv);

require('dotenv').config();
const { Command } = require('commander');
const NotionWrapper = require('./modules/notion');
const { NOTION_PAGE_ID } = require('./modules/constants');

const program = new Command();
const notionWrapper = new NotionWrapper(NOTION_PAGE_ID);

program
  .usage('getPage')
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

program
  .command('deleteBlock <blockId>')
  .description('Delete a block from Notion by its ID')
  .action(async (blockId) => {
    try {
      const response = await notionWrapper.deleteBlock(blockId);
      console.log('Block deleted:', response);
    } catch (error) {
      console.error('Error deleting block:', error);
    }
  });

program
  .command('getPageBlocks')
  .description('Retrieve blocks from a page in Notion')
  .action(async () => {
    try {
      const blocks = await notionWrapper.getPageBlocks();
      console.log(JSON.stringify(blocks, null, 2));
    } catch (error) {
      console.error('Error retrieving page blocks:', error);
    }
  });

program
  .command('version')
  .description('Retrieve the version of this software')
  .action(async () => {
    console.log("0.1.0");
  });

program.parse(process.argv);

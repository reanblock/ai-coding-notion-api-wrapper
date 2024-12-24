const { Client } = require("@notionhq/client");
const { NOTION_PAGE_ID } = require('../modules/constants');
const NotionWrapper = require('../modules/notion');

describe("Notion API", () => {
    it("should retrieve a page successfully", async () => {
        const notion = new Client({ auth: process.env.NOTION_TOKEN });
        const response = await notion.pages.retrieve({ page_id: NOTION_PAGE_ID });
        const receivedId = response.id.replace(/-/g, '');
        expect(receivedId).toBe(NOTION_PAGE_ID);

        // Assuming the title is stored in response.properties.title.title[0].text.content
        const expectedTitle = "AI Coding Exercise Page"; // Replace with the actual expected title
        const receivedTitle = response.properties.title.title[0].text.content;
        expect(receivedTitle).toBe(expectedTitle);
    });
    
    it("should retrieve all blocks from a page successfully", async () => {
        const notionWrapper = new NotionWrapper(NOTION_PAGE_ID);
        const blocks = await notionWrapper.getPageBlocks();
        
        expect(Array.isArray(blocks)).toBe(true);
        expect(blocks.length).toBeGreaterThan(0); // Assuming the page has at least one block
    });

    it("should add text to a page successfully", async () => {
        const notion = new Client({ auth: process.env.NOTION_TOKEN });
        const notionWrapper = new NotionWrapper(NOTION_PAGE_ID);
        const text = "This is a test text block.";
        
        const response = await notionWrapper.addText(text);
        const addedText = response.results[0].paragraph.rich_text[0].text.content;
        
        expect(addedText).toBe(text);
    });
    
    it("should delete a block successfully", async () => {
        const notionWrapper = new NotionWrapper(NOTION_PAGE_ID);
        const text = "This is a test text block to be deleted.";
        
        // Add a block to delete
        const addResponse = await notionWrapper.addText(text);
        const blockId = addResponse.results[0].id;

        // Delete the block
        const deleteResponse = await notionWrapper.deleteBlock(blockId);
        
        expect(deleteResponse.archived).toBe(true);
    });
});

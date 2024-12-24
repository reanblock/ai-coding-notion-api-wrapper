const { Client } = require("@notionhq/client");
const { NOTION_PAGE_ID } = require('../modules/constants');

describe("Notion API", () => {
    it("should retrieve a page successfully", async () => {
        const notion = new Client({ auth: process.env.NOTION_TOKEN });
        const response = await notion.pages.retrieve({ page_id: NOTION_PAGE_ID });
        const receivedId = response.id.replace(/-/g, '');
        expect(receivedId).toBe(NOTION_PAGE_ID);
    });
});

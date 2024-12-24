const { Client } = require("@notionhq/client");

class NotionWrapper {
    constructor(pageId) {
        this.notion = new Client({
            auth: process.env.NOTION_TOKEN,
        });
        this.pageId = pageId;
    }

    async getPage() {
        const response = await this.notion.pages.retrieve({ page_id: this.pageId });
        return response;
    }
}

module.exports = NotionWrapper;

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
    async getPageBlocks() {
        const blocks = [];
        let cursor;
        do {
            const response = await this.notion.blocks.children.list({
                block_id: this.pageId,
                start_cursor: cursor,
            });
            blocks.push(...response.results);
            cursor = response.next_cursor;
        } while (cursor);
        return blocks;
    }

    async addText(text, parentBlock = this.pageId) {
        const response = await this.notion.blocks.children.append({
            block_id: parentBlock,
            children: [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: text,
                                },
                            },
                        ],
                    },
                },
            ],
        });
        return response;
    }
    async deleteBlock(blockId) {
        const response = await this.notion.blocks.delete({
            block_id: blockId,
        });
        return response;
    }
}

module.exports = NotionWrapper;

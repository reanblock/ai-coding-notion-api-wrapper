const { Client } = require("@notionhq/client");

/**
 * A wrapper class for interacting with the Notion API.
 */
class NotionWrapper {
    /**
     * Initializes the NotionWrapper with a page ID.
     * @param {string} pageId - The ID of the Notion page.
     */
    constructor(pageId) {
        this.notion = new Client({
            auth: process.env.NOTION_TOKEN,
        });
        this.pageId = pageId;
    }

    /**
     * Retrieves the page details from Notion.
     * @returns {Promise<Object>} The page details.
     */
    async getPage() {
        const response = await this.notion.pages.retrieve({ page_id: this.pageId });
        return response;
    }
    /**
     * Retrieves all blocks from the specified page.
     * @returns {Promise<Array>} An array of blocks.
     */
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

    /**
     * Adds a text block to the specified parent block.
     * @param {string} text - The text content to add.
     * @param {string} [parentBlock=this.pageId] - The parent block ID.
     * @returns {Promise<Object>} The response from the Notion API.
     */
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
    /**
     * Deletes a block by its ID.
     * @param {string} blockId - The ID of the block to delete.
     * @returns {Promise<Object>} The response from the Notion API.
     */
    async deleteBlock(blockId) {
        const response = await this.notion.blocks.delete({
            block_id: blockId,
        });
        return response;
    }
}

module.exports = NotionWrapper;

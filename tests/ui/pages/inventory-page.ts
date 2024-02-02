import { type Page, type Locator , expect } from '@playwright/test';

class InventoryPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }
    
    async selectSortOption(sortOption: string) {
        await this.page.locator('select.product_sort_container').selectOption(sortOption);

    }
}

export default InventoryPage;
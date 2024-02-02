import { type Page, type Locator , expect } from '@playwright/test';

class InventoryPage {

    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;
    readonly sort: Locator;

    constructor(page: Page) {
        this.page = page
        this.addToCartBtn = page.locator('#add-to-cart-sauce-labs-backpack')
        this.cartBadge = page.locator('shopping_cart_badge')
        this.sort = page.locator('select.product_sort_container')
    }
    
    async selectSortOption(sortOption: string) {
        await this.sort.selectOption(sortOption);

    }

    async addToCart(){
        await this.addToCartBtn.click()
        await this.page.waitForTimeout(3000)
    }

    async validateCartBadge(){
        await this.cartBadge.isVisible()
    }
}

export default InventoryPage;
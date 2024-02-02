import { type Page, type Locator , expect } from '@playwright/test';

class InventoryPage {

    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;
    readonly sort: Locator;
    readonly removeToCartBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.addToCartBtn = page.locator('#add-to-cart-sauce-labs-backpack')
        this.cartBadge = page.locator('shopping_cart_badge')
        this.sort = page.locator('select.product_sort_container')
        this.removeToCartBtn = page.locator('#remove-sauce-labs-backpack')
    }
    
    async selectSortOption(sortOption: string) {
        await this.sort.selectOption(sortOption);

    }

    async addToCart(){
        await this.addToCartBtn.click()
        await this.page.waitForTimeout(3000)
    }

    async validateCartBadge(shouldShow: boolean){
        if(shouldShow){
            await this.cartBadge.isVisible()
        }else{
            await expect(this.cartBadge).toBeHidden();
        }
    }

    async removeToCart(){
        await this.removeToCartBtn.click()
        await this.page.waitForTimeout(3000)

    }
}

export default InventoryPage;
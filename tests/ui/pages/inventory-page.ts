import { type Page, type Locator , expect } from '@playwright/test';

class InventoryPage {

    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;
    readonly sort: Locator;
    readonly removeToCartBtn: Locator;
    readonly selectItemLink: Locator;
    readonly backToProductsLink: Locator;

    constructor(page: Page) {
        this.page = page
        this.addToCartBtn = page.locator('#add-to-cart-sauce-labs-backpack')
        this.cartBadge = page.locator('shopping_cart_badge')
        this.sort = page.locator('select.product_sort_container')
        this.removeToCartBtn = page.locator('#remove-sauce-labs-backpack')
        this.selectItemLink = page.locator('#item_4_title_link')
        this.backToProductsLink = page.locator('#back-to-products')
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

    async selectItem(){
        await this.selectItemLink.click()
        await this.page.waitForTimeout(3000)
    }

    async backToProducts(){
        await this.backToProductsLink.click()
        await this.page.waitForTimeout(3000)

    }

    async validateInventoryUrl(selection: boolean){
        if(selection){
            var pageUrl = /.*inventory/;
        }else{
            var pageUrl = /.*inventory-item/;
        }

        await expect(this.page).toHaveURL(pageUrl);

    }
}

export default InventoryPage;
import { type Page, type Locator , expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class InventoryPage {

    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;
    readonly sort: Locator;
    readonly removeToCartBtn: Locator;
    readonly selectItemLink: Locator;
    readonly backToProductsLink: Locator;
    readonly cartIcon: Locator;
    readonly checkoutBtn: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly pcode: Locator
    readonly continueCheckoutBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.addToCartBtn = page.locator('#add-to-cart-sauce-labs-backpack')
        this.cartBadge = page.locator('shopping_cart_badge')
        this.sort = page.locator('select.product_sort_container')
        this.removeToCartBtn = page.locator('#remove-sauce-labs-backpack')
        this.selectItemLink = page.locator('#item_4_title_link')
        this.backToProductsLink = page.locator('#back-to-products')
        this.cartIcon = page.locator('#shopping_cart_container')
        this.checkoutBtn = page.locator('#checkout')
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.pcode = page.locator('#postal-code')
        this.continueCheckoutBtn = page.locator('#continue')
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

    async validateURL(url: string){
        var pageUrl: RegExp = /.*saucedemo/
        if(url == 'inventory'){
            var pageUrl = /.*inventory/;
        }else if(url == 'inventory-item'){
            var pageUrl = /.*inventory-item/;
        }else if(url == 'checkout-step-one'){
            var pageUrl = /.*checkout-step-one/;
        }else if(url == 'checkout-step-two'){
            var pageUrl = /.*checkout-step-two/;
        }

        await expect(this.page).toHaveURL(pageUrl);

    }

    async clickCartIcon(){
        await this.cartIcon.click()
        await this.page.waitForTimeout(1000)
    }

    async clickCheckoutBtn(){
        await this.checkoutBtn.click()
        await this.page.waitForTimeout(1000)
    }

    async fillCheckoutInfo(){
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const address = faker.location.streetAddress()
        
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.pcode.fill(address)
        await this.page.waitForTimeout(3000)
    }

    async clickContinueCheckoutBtn() {
        await this.continueCheckoutBtn.click()
        await this.page.waitForTimeout(3000)
    }
}

export default InventoryPage;
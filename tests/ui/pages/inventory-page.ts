import { type Page, type Locator , expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {ProductObj} from '../../models/ProductObj'
import productResponse from '../../data/products.json'
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
    readonly finishBtn: Locator;
    readonly checkoutCompletedHeader: Locator;
    readonly backHomeBtn: Locator
    readonly kebabOption: Locator;
    readonly inventoryTitle: Locator;
    readonly productTitle: Locator;
    readonly productColumn: Locator
    readonly twitterIcon: Locator
    readonly fbIcon: Locator
    readonly linkedinIcon: Locator
    readonly copyRightLabel: Locator
    readonly productContents: Locator
    readonly firstProduct: Locator
    readonly productContainer: Locator
    readonly sortOptions: Locator
    readonly productCard: Locator
    readonly backToProductsBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.addToCartBtn = page.locator('.btn_inventory')
        this.cartBadge = page.locator('.shopping_cart_badge')
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
        this.finishBtn = page.locator('#finish')
        this.checkoutCompletedHeader = page.locator('complete-header')
        this.backHomeBtn = page.getByRole('button', { name: 'Back Home' })
        this.kebabOption = page.locator('#react-burger-menu-btn')
        this.inventoryTitle = page.locator('.app_logo')
        this.productTitle = page.locator('span.title')
        this.productContainer = page.locator('.inventory_list')
        this.productColumn = page.locator('.inventory_list .inventory_item')
        this.twitterIcon = page.locator("[href*='twitter']")
        this.fbIcon = page.locator("[href*='facebook']")
        this.linkedinIcon = page.locator("[href*='linkedin']")
        this.copyRightLabel = page.locator('.footer_copy')
        this.productContents = this.productColumn
        this.firstProduct = this.productContents.first().locator('.btn_inventory')
        this.productCard = page.locator('.inventory_details_container')
        this.backToProductsBtn = page.locator('#back-to-products')

    }

    async getProductCount(){
        return  await this.productContents.count();

    }

    async clickSort(){
        await this.sort.click()
    }
        
    async getSortOption() {
        const sortOptionCount = await this.sort.locator('option').count()
        const sortOptionArr: string[] = []

        for(let index = 0; index < sortOptionCount; index++){
            let sortItem = await this.sort.locator('option').nth(index).textContent() as string;
            sortOptionArr.push(sortItem)
        }
        
        return [sortOptionArr, sortOptionCount]
    }

    async selectSortOption(sortOption){
        const productDetails = await this.getProductDetails();
        await this.sort.selectOption(sortOption)
        
        return productDetails
    }

    async validateSortResult(sortOption, productOriginalState){
        if(sortOption == 'Name (A to Z)'){
            const productDetails = await this.getProductDetails();
            const productArr = productOriginalState.sort((item1, item2) => {
                return item1.name!.localeCompare(item2.name!);
            });

            expect(JSON.stringify(productArr)).toEqual(JSON.stringify(productDetails))

        }

        else if(sortOption == 'Name (Z to A)'){
            const productDetails = await this.getProductDetails();
            const productArr = productOriginalState.sort((item1, item2) => {
                return item2.name!.localeCompare(item1.name!);
            });

            expect(JSON.stringify(productArr)).toEqual(JSON.stringify(productDetails))

        }

        else if(sortOption == 'Price (low to high)'){
            const productDetails = await this.getProductDetails();
            console.log("JSON.stringify(productDetails):: ",JSON.stringify(productDetails))
            const productArr = productOriginalState.sort((item1, item2) => {
                const price1 = parseFloat(item1.price.replace('$', ''));
                const price2 = parseFloat(item2.price.replace('$', ''));

                return price1 - price2 || item1.name!.localeCompare(item2.name!);
            });

            expect(JSON.stringify(productArr)).toEqual(JSON.stringify(productDetails))

        }

        else if(sortOption == 'Price (high to low)'){
            const productDetails = await this.getProductDetails();
            const productArr = productOriginalState.sort((item1, item2) => {
                const price1 = parseFloat(item1.price.replace('$', ''));
                const price2 = parseFloat(item2.price.replace('$', ''));

                return price2 - price1 || item1.name!.localeCompare(item2.name!);
            });

            expect(JSON.stringify(productArr)).toEqual(JSON.stringify(productDetails))

        }

        else {
            console.log('Sort option does not exist')
        }
    }
    async addToCart(count: number = 1, frmInventoryItem = false){

        if(frmInventoryItem == true){
            await this.addToCartBtn.click()
        } else {
            for(let index = 0 ; index < count ;index++){
                await this.productContents.nth(index).locator(this.addToCartBtn).click()
            }
        }

    }

    async chooseNumberOfProduct(){

        return Math.floor(Math.random() * (await this.getProductCount() - 1 + 1) + 1);

    }
    

    async validateCartBadge(shouldShow: boolean){
        if(shouldShow){
            await expect(this.cartBadge).toBeVisible()
        }else{
            await expect(this.cartBadge).toBeHidden();
        }
    }

    async removeToCart(frmInventoryItem = false){
        if(frmInventoryItem == true){
            await this.addToCartBtn.click()
            expect(await this.addToCartBtn.textContent()).toEqual('Add to cart')
        } else{
            await this.firstProduct.click()
            expect(await this.firstProduct.textContent()).toEqual('Add to cart')
        }
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
        }else if(url == 'checkout-complete'){
            var pageUrl = /.*checkout-complete/;
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

    async clickFinishCheckoutBtn() {
        await this.finishBtn.click()
        await this.page.waitForTimeout(3000)
    }

    async validateCompletedPage(){
        await expect(this.page.getByText('Thank you for your order!')).toBeVisible()
        await expect(this.page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible()
        await this.backHomeBtn.click()
        await this.page.waitForTimeout(3000)
    }

    async verifyInventoryPageElements(){
        await expect(this.kebabOption).toBeVisible()
        await expect(this.inventoryTitle).toContainText('Swag Labs')
        await expect(this.cartIcon).toBeVisible()
        await expect(this.productTitle).toContainText('Products')
        await expect(this.sort).toBeVisible()
        await expect(this.productContainer).toBeVisible()
        await expect(this.twitterIcon).toBeVisible()
        await expect(this.fbIcon).toBeVisible()
        await expect(this.linkedinIcon).toBeVisible()
        await expect(this.copyRightLabel).toContainText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')

        return true
    }

    async verifyInventoryItemPageElements(){
        await expect(this.kebabOption).toBeVisible()
        await expect(this.inventoryTitle).toContainText('Swag Labs')
        await expect(this.cartIcon).toBeVisible()
        await expect(this.backToProductsBtn).toBeVisible()
        await expect(this.productCard).toBeVisible()
        await expect(this.twitterIcon).toBeVisible()
        await expect(this.fbIcon).toBeVisible()
        await expect(this.linkedinIcon).toBeVisible()
        await expect(this.copyRightLabel).toContainText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    }

    async getProductDetails(specific = false){
        const productArr: ProductObj[] = []
        
        if(specific == false){
            for(let index = 0 ; index < await this.getProductCount() ;index++){
                let productObj: ProductObj = {
                    name: await this.productContents.nth(index).locator('.inventory_item_name').textContent(),
                    description: await this.productContents.nth(index).locator('.inventory_item_desc').textContent(),
                    price: await this.productContents.nth(index).locator('.inventory_item_price').textContent()
                }
    
                productArr.push(productObj)
            }
        } else {
            let productObj: ProductObj = {
                name: await this.productContents.nth(1).locator('.inventory_item_name').textContent(),
                description: await this.productContents.nth(1).locator('.inventory_item_desc').textContent(),
                price: await this.productContents.nth(1).locator('.inventory_item_price').textContent()
            }

            productArr.push(productObj)
        }

        return productArr
    }

    async clickFirstProduct(){
        await this.productContents.nth(0).locator('#item_4_img_link').click()

    }

    async getProductDetailsfromInventoryItemPage(){
        let product = [{
            name: await this.page.locator('.inventory_details_container .inventory_details_name').textContent(),
            description: await this.page.locator('.inventory_details_container .inventory_details_desc').textContent(),
            price: await this.page.locator('.inventory_details_container .inventory_details_price').textContent()
        }]

        return product

    }

    async verifyProductDetails(productDetails = null){
        if(productDetails){
            const productArr = await this.getProductDetailsfromInventoryItemPage()
            expect(JSON.stringify(productArr)).toEqual(JSON.stringify(await this.getProductDetailsfromInventoryItemPage()))

        } else {
            const productArr = await this.getProductDetails()
            expect(JSON.stringify(productArr)).toEqual(JSON.stringify(productResponse))
        }

    }

    async verifyRemoveToCartBtn(frmInventoryItem = false){
        if(frmInventoryItem == true){
            const buttonText = await this.addToCartBtn.textContent()
            expect(buttonText).toEqual('Remove')
        } 
        else{
            const buttonText = await this.firstProduct.textContent()

            expect(buttonText).toEqual('Remove')
        }
    }

    async verifyCartNumber(count: number = 1, frmInventoryItem = false){
        if(frmInventoryItem == true){
            await expect(this.cartBadge).toBeHidden();
        }else {
            const cartNum = await this.cartIcon.textContent()
            expect(count.toString()).toEqual(cartNum)
        }

    }
}

export default InventoryPage;
import { type Page, type Locator , expect } from '@playwright/test';
import InventoryPage from './inventory-page';
import {ProductObj} from '../../models/ProductObj'

class CartPage extends InventoryPage{
    readonly yourCartLabel: Locator
    readonly quantityLabel: Locator
    readonly cartList: Locator
    readonly continueCheckoutBtn: Locator
    readonly checkOutInfoLabel: Locator
    readonly checkOutInfoContainer: Locator
    readonly cancelCheckout: Locator
    readonly continueCheckout: Locator
    readonly checkoutBtn: Locator

    constructor(page: Page) {
        super(page);
        this.yourCartLabel = this.page.locator('.header_secondary_container')
        this.quantityLabel = this.page.locator('.cart_quantity_label')
        this.cartList = this.page.locator('.cart_list')
        this.continueCheckoutBtn = this.page.locator('.back')
        this.checkOutInfoLabel = this.page.locator('.header_secondary_container')
        this.checkOutInfoContainer = this.page.locator('.checkout_info')
        this.cancelCheckout = this.page.locator('.cart_cancel_link')
        this.continueCheckout = this.page.locator('.submit-button')
        this.checkoutBtn = this.page.locator('.checkout_button')
    }

    async clickShoppingCart(){
        await this.cartIcon.click()
    }

    async verifyCartPageElements(){
        await expect(this.kebabOption).toBeVisible()
        await expect(this.inventoryTitle).toContainText('Swag Labs')
        await expect(this.cartIcon).toBeVisible()
        await expect(this.yourCartLabel).toContainText('Your Cart')
        await expect(this.quantityLabel).toContainText('QTY')
        await expect(this.cartList).toBeVisible()
        await expect(this.continueCheckoutBtn).toBeVisible()
        await expect(this.twitterIcon).toBeVisible()
        await expect(this.fbIcon).toBeVisible()
        await expect(this.linkedinIcon).toBeVisible()
        await expect(this.copyRightLabel).toContainText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    }

    async getProductDetailsfrmCart(){
        let productFromCartArr: ProductObj[] = []
        let cartListCount = await this.cartList.locator('.cart_item').count()

        for(let index = 0; index < cartListCount ; index++){
           let productFromCart: ProductObj = {
            name: await this.cartList.locator('.cart_item .inventory_item_name').nth(index).textContent(),
            description: await this.cartList.locator('.cart_item .inventory_item_desc').nth(index).textContent(),
            price: await this.cartList.locator('.cart_item .inventory_item_price').nth(index).textContent()
           }
           productFromCartArr.push(productFromCart)
        }

        return productFromCartArr

    }

    async verifyCartProducts(productAdded){

        await expect(JSON.stringify(productAdded)).toEqual(JSON.stringify(await this.getProductDetailsfrmCart()))

    }

    async verifyCheckoutStepOnePageElements(){
        await expect(this.kebabOption).toBeVisible()
        await expect(this.inventoryTitle).toContainText('Swag Labs')
        await expect(this.cartIcon).toBeVisible()
        await expect(this.checkOutInfoLabel).toContainText('Checkout: Your Information')
        await expect(this.checkOutInfoContainer).toBeVisible()
        await expect(this.cancelCheckout).toBeVisible()
        await expect(this.continueCheckout).toBeVisible()
        await expect(this.twitterIcon).toBeVisible()
        await expect(this.fbIcon).toBeVisible()
        await expect(this.linkedinIcon).toBeVisible()
        await expect(this.copyRightLabel).toContainText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    }

    async clickCheckoutButton(){
        await this.checkoutBtn.click()
    }
    
}

export default CartPage;
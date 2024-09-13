import { type Page, type Locator , expect } from '@playwright/test';
import InventoryPage from './inventory-page';

class CartPage extends InventoryPage{
    readonly yourCartLabel: Locator
    readonly quantityLabel: Locator
    readonly cartList: Locator
    readonly continueCheckoutBtn: Locator

    constructor(page: Page) {
        super(page);
        this.yourCartLabel = this.page.locator('.header_secondary_container')
        this.quantityLabel = this.page.locator('.cart_quantity_label')
        this.cartList = this.page.locator('.cart_list')
        this.continueCheckoutBtn = this.page.locator('.back')
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
    
}

export default CartPage;
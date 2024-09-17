import { type Page, type Locator , expect } from '@playwright/test';
import InventoryPage from './inventory-page';
import {ProductObj} from '../../models/ProductObj'
import {faker} from '@faker-js/faker'

class CartPage extends InventoryPage{
    readonly secondaryHeader: Locator
    readonly quantityLabel: Locator
    readonly cartList: Locator
    readonly continueCheckoutBtn: Locator
    readonly checkOutInfoContainer: Locator
    readonly cancelCheckout: Locator
    readonly continueCheckout: Locator
    readonly checkoutBtn: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly zip: Locator
    readonly continueBtn: Locator
    readonly descriptionLabel: Locator
    readonly finishBtn: Locator
    readonly summarySection: Locator
    readonly itemTotal: Locator
    readonly taxInfo: Locator
    readonly totalWithTax: Locator

    constructor(page: Page) {
        super(page);
        this.secondaryHeader = this.page.locator('.header_secondary_container')
        this.quantityLabel = this.page.locator('.cart_quantity_label')
        this.cartList = this.page.locator('.cart_list')
        this.continueCheckoutBtn = this.page.locator('.back')
        this.checkOutInfoContainer = this.page.locator('.checkout_info')
        this.cancelCheckout = this.page.locator('.cart_cancel_link')
        this.continueCheckout = this.page.locator('.submit-button')
        this.checkoutBtn = this.page.locator('.checkout_button')
        this.firstName = this.page.locator('#first-name')
        this.lastName = this.page.locator('#last-name')
        this.zip = this.page.locator('#postal-code')
        this.continueBtn = this.page.getByRole('button', {name:'continue'})
        this.descriptionLabel = this.page.locator('.cart_desc_label')
        this.finishBtn = this.page.locator('#finish')
        this.summarySection = this.page.locator('.summary_info')
        this.itemTotal = this.page.locator('.summary_subtotal_label')
        this.taxInfo = this.page.locator('.summary_tax_label')
        this.totalWithTax = this.page.locator('.summary_total_label')
    }

    async clickShoppingCart(){
        await this.cartIcon.click()
    }

    async verifyCartPageElements(){
        await expect(this.kebabOption).toBeVisible()
        await expect(this.inventoryTitle).toContainText('Swag Labs')
        await expect(this.cartIcon).toBeVisible()
        await expect(this.secondaryHeader).toContainText('Your Cart')
        await expect(this.quantityLabel).toContainText('QTY')
        await expect(this.descriptionLabel).toContainText('Description')
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
        await expect(this.secondaryHeader).toContainText('Checkout: Your Information')
        await expect(this.checkOutInfoContainer).toBeVisible()
        await expect(this.cancelCheckout).toBeVisible()
        await expect(this.continueCheckout).toBeVisible()
        await expect(this.twitterIcon).toBeVisible()
        await expect(this.fbIcon).toBeVisible()
        await expect(this.linkedinIcon).toBeVisible()
        await expect(this.copyRightLabel).toContainText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    }

    async verifyCheckoutStepTwoPageElements(){
        await expect(this.kebabOption).toBeVisible()
        await expect(this.inventoryTitle).toContainText('Swag Labs')
        await expect(this.cartIcon).toBeVisible()
        await expect(this.secondaryHeader).toContainText('Checkout: Overview')
        await expect(this.quantityLabel).toContainText('QTY')
        await expect(this.descriptionLabel).toContainText('Description')
        await expect(this.cartList).toBeVisible()
        await expect(this.summarySection).toBeVisible()
        await expect(this.cancelCheckout).toBeVisible()
        await expect(this.finishBtn).toBeVisible()
        await expect(this.twitterIcon).toBeVisible()
        await expect(this.fbIcon).toBeVisible()
        await expect(this.linkedinIcon).toBeVisible()
        await expect(this.copyRightLabel).toContainText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    }

    async clickCheckoutButton(){
        await this.checkoutBtn.click()
    }

    async inputCheckoutDetails(){
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const zip = faker.location.zipCode()

        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.zip.fill(zip)
    }

    async clickContinueButton(){
        await this.continueBtn.click()
    }
    
    async verifySummaryInfo(){
        const paymentInfo = await this.summarySection.locator('.summary_value_label').first().textContent()
        const shippingInfo = await this.summarySection.locator('.summary_value_label').nth(1).textContent()
        const itemTotal = await this.itemTotal.textContent() as string
        const tax = await this.taxInfo.textContent() as string
        const totalWithTax = await this.totalWithTax.textContent() as string

        const itemTotalValue = itemTotal.split(' ')[2].replace('$', '')
        const taxValue = tax.split(' ')[1].replace('$','')
        const totalWithTaxVal = totalWithTax.split(' ')[1].replace('$','')

        console.log('paymentInfo: ',paymentInfo)
        console.log('shippingInfo: ',shippingInfo)

        
        console.log('itemTotal: ',itemTotalValue)
        console.log('tax: ',taxValue)
        console.log('totalWithTax: ',totalWithTaxVal)



    }
}

export default CartPage;
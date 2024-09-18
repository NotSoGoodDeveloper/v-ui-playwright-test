import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import InventoryPage from '../pages/inventory-page'
import CartPage from '../pages/cart-page'
import {ProductObj} from '../../models/ProductObj'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let cartPage: CartPage
let productCount: number
let productAdded: ProductObj[]

test.beforeEach(async({page}) => {
  await page.goto('/inventory.html')
  await page.waitForTimeout(1000)
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  productCount = await inventoryPage.chooseNumberOfProduct()  
  productAdded = await inventoryPage.addToCart(productCount)
})

test.describe('Cart', async() => {

  test('Products should be viewed in the cart with correct details @smoke', async()=>{
    await test.step('Given: Products already added', async()=>{
      await inventoryPage.verifyRemoveToCartBtn()
      await inventoryPage.verifyCartNumber(productCount)
    })

    await test.step('And: I click shopping cart icon', async()=>{
      await cartPage.clickShoppingCart()

    })

    await test.step('When: I redirected to cart page', async()=>{
      await inventoryPage.validateURL('cart');
    })

    await test.step(`And: I see cart page elements #cartPageElements
    - Kebab option 
    - Swag Labs label
    - cart icon
    - Your Cart label
    - QTY label
    - Description label
    - Product card container
    - Remove button
    - Continue Shopping button
    - Checkout button
    - twitter icon
    - facebook icon 
    - linkedin icon
    - label for © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`, async()=>{
      await cartPage.verifyCartPageElements()
    })

    await test.step('Then: I should see correct product details <name>, <description>, <price>', async()=>{
      await cartPage.verifyCartProducts(productAdded)

    })

  })

  test('Products should display in checkout overview with correct details @smoke', async()=>{
    await test.step('Given: Products already added', async()=>{
      await inventoryPage.verifyRemoveToCartBtn()
      await inventoryPage.verifyCartNumber(productCount)
    })
    await test.step('And: I click shopping cart icon', async()=>{
      await cartPage.clickShoppingCart()

    })

    await test.step('And: I redirected to cart page', async()=>{
      await inventoryPage.validateURL('cart');
    })

    await test.step('And: I should see correct product details <name>, <description>, <price>', async()=>{
      await cartPage.verifyCartProducts(productAdded)

    })

    await test.step('And: I click checkout button', async()=>{
      await cartPage.clickCheckoutButton()

    })

    await test.step('And: I redirected to checkout step one page', async()=>{
      await cartPage.validateURL('checkout-step-one')

    })

    await test.step(`And: I see checkout step one elements #checkoutStepOnePageElements
    - Kebab option 
    - Swag Labs label
    - cart icon
    - Checkout: Your Information label
    - Checkout details container
    - Cancel button
    - Continue  button
    - twitter icon
    - facebook icon 
    - linkedin icon
    - label for © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`, async()=>{
      await cartPage.verifyCheckoutStepOnePageElements()
    })
  })

  test('Products can be checkout @smoke', async()=>{
    await test.step('Given: Products already added', async()=>{
      await inventoryPage.verifyRemoveToCartBtn()
      await inventoryPage.verifyCartNumber(productCount)
    })
    await test.step('And: I click shopping cart icon', async()=>{
      await cartPage.clickShoppingCart()

    })

    await test.step('And: I redirected to cart page', async()=>{
      await inventoryPage.validateURL('cart');
    })

    await test.step('And: I see correct product details <name>, <description>, <price>', async()=>{
      await cartPage.verifyCartProducts(productAdded)

    })

    await test.step('And: I click checkout button', async()=>{
      await cartPage.clickCheckoutButton()

    })

    await test.step('And: I redirected to checkout step one page', async()=>{
      await cartPage.validateURL('checkout-step-one')

    })

    await test.step('And: I input <firstname>, <lastname>, and <zip>', async()=>{
      await cartPage.inputCheckoutDetails()
    })

    await test.step('And: I click Continue button', async()=>{
      await cartPage.clickContinueButton()
    })

    await test.step(`And: I see checkout step two elements #checkoutStepTwoPageElements
    - Kebab option 
    - Swag Labs label
    - cart icon
    - Checkout: Overview label
    - QTY label
    - Description label
    - Checkout details container
    - Summary Section
    - Cancel button
    - Finish  button
    - twitter icon
    - facebook icon 
    - linkedin icon
    - label for © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`, async()=>{
      await cartPage.verifyCheckoutStepTwoPageElements()
    })

    await test.step('And: I see correct Product details <name>, <description>, <price>', async()=>{
      await cartPage.verifyCartProducts(productAdded)

    })

    await test.step('And: I see correct Summary info <paymentInfo>, <shippingInfo>, <priceTotal>, <tax>, <total (including tax)>', async()=>{
      await cartPage.verifySummaryInfo(productAdded)
    })

    await test.step('When: I click Finish button', async()=>{
      await cartPage.clickFinishCheckoutBtn()
    })

    await test.step('Then: I should redirected to checkout complete page', async()=>{
      await cartPage.validateURL('checkout-complete')
    })

    await test.step(`And: I see checkout step two elements #checkoutCompletePageElements
    - Kebab option 
    - Swag Labs label
    - cart icon
    - Checkout: Complete label
    - Checkout complete container
    - twitter icon
    - facebook icon 
    - linkedin icon
    - label for © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`, async()=>{
    })
    await cartPage.verifyCheckoutCompletedPageElements()

  })


})
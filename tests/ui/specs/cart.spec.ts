import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import InventoryPage from '../pages/inventory-page'
import CartPage from '../pages/cart-page'

const { ENV } = require("../../utils/setup/env");
const envUtil = new ENV();

let loginPage: LoginPage
let inventoryPage: InventoryPage
let cartPage: CartPage

test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  await page.goto(envUtil.getUrl());
  await loginPage.login(envUtil.getValidUser(),envUtil.getPass())
  await loginPage.validateLogin();
})

test.describe('Cart', async() => {

  test('Products should be viewed in the cart with correct details @smoke', async()=>{
    await test.step('Given: Products already added', async()=>{
      let productCount: number
      productCount = await inventoryPage.chooseNumberOfProduct()  
      await inventoryPage.addToCart(productCount)
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

    })

  })

  test('Products should display in checkout overview with correct details @smoke', async()=>{

  })

  test('Products can be checkout @smoke', async()=>{

  })


})
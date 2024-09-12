import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import InventoryPage from '../pages/inventory-page'

const { ENV } = require("../../utils/setup/env");
const envUtil = new ENV();

let loginPage: LoginPage
let inventoryPage: InventoryPage

test.beforeEach(async({page}) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await page.goto(envUtil.getUrl());
  await loginPage.login(envUtil.getValidUser(),envUtil.getPass())
  await loginPage.validateLogin();
})

test.describe('Inventory', async() => {
  test('The list of available products with correct details should display @smoke', async({page}) =>{
    await test.step('Given: I am on the inventory page', async() =>{
      await inventoryPage.validateURL('/.*inventory/');
    })

    await test.step(`And: I see inventory page elements #inventoryPageElements
    - Kebab option 
    - Swag Labs label
    - cart icon
    - Products label
    - Sort dropdown
    - Product card list
    - twitter icon
    - facebook icon 
    - linkedin icon
    - label for © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy` , async() =>{
      await inventoryPage.verifyInventoryPageElements()
    })

    await test.step('When: I see the list of available product cards in two column layout', async() =>{
      expect(await inventoryPage.verifyInventoryPageElements()).toBeTruthy()
    })

    await test.step('Then: I should see their <name>, <descriptions>, <images>, <prices> and Add to Cart button next to EACH product', async() =>{
      await inventoryPage.verifyProductDetails()
    })
  })

  test('Product/s can be added to cart @smoke', async() => {
    let productCount: number
    await test.step('Given: I choose {number} of product', async() => {
      productCount = await inventoryPage.chooseNumberOfProduct()
    
    })

    await test.step('And: I click the Add to Cart button', async() => {
      await inventoryPage.addToCart(productCount)
    
    })

    await test.step('And: the button text turned to Remove from Add to cart text', async() => {
      await inventoryPage.verifyRemoveToCartBtn()
    
    })

    await test.step('And: the cart icon should have a red badge with the correct number of product/s that has been added', async() => {
      await inventoryPage.verifyCartNumber(productCount)
    
    })
    
  })


  test('Product/s can be removed to cart @smoke', async() => {

  })

  test('Product list could be sorted correctly @smoke', async() => {


  })


  //checkout page

  test('Products should be viewed in the cart with correct details @smoke', async()=>{


  })

  test('Products should display in checkout overview with correct details @smoke', async()=>{

  })

  test('Products can be checkout @smoke', async()=>{

  })


})
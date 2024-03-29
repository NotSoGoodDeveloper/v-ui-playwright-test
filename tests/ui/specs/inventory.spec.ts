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
  test('Sort Inventory list', async() =>{
    let sortOption = ['hilo', 'lohi','za', 'az']
    for(let sort of sortOption){
      await inventoryPage.selectSortOption(sort)
    }
  })

  test('Add to cart', async() => {
    await inventoryPage.addToCart() 
    await inventoryPage.validateCartBadge(true)
  })

  test('Remove to cart', async() => {
    await inventoryPage.addToCart() 
    await inventoryPage.validateCartBadge(true)
    await inventoryPage.removeToCart()
    await inventoryPage.validateCartBadge(false)

  })

  test('Select item then add and remove to cart', async()=>{
    await inventoryPage.selectItem()
    await inventoryPage.validateURL('inventory-item')
    await inventoryPage.addToCart() 
    await inventoryPage.validateCartBadge(true)
    await inventoryPage.removeToCart()
    await inventoryPage.validateCartBadge(false)
    await inventoryPage.backToProducts()
    await inventoryPage.validateURL('inventory')

  })

  test('Checkout item', async()=>{
    await inventoryPage.addToCart() 
    await inventoryPage.validateCartBadge(true)
    await inventoryPage.clickCartIcon()
    await inventoryPage.clickCheckoutBtn()
    await inventoryPage.validateURL('checkout-step-one')
    await inventoryPage.fillCheckoutInfo()
    await inventoryPage.clickContinueCheckoutBtn()
    await inventoryPage.validateURL('checkout-step-two')
    await inventoryPage.clickFinishCheckoutBtn()
    await inventoryPage.validateURL('checkout-complete')
    await inventoryPage.validateCompletedPage();
    await inventoryPage.validateURL('inventory')
  })


})
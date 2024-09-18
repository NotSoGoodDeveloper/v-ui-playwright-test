import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import InventoryPage from '../pages/inventory-page'

let loginPage: LoginPage
let inventoryPage: InventoryPage

test.beforeEach(async({page}) => {
  await page.goto('/inventory.html')
  await page.waitForTimeout(1000)
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
})

test.describe('Inventory', async() => {
  test('The list of available products with correct details should display @smoke', async({page}) =>{
    await test.step('Given: I am on the inventory page', async() =>{
      await inventoryPage.validateURL('inventory');
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

    await test.step('When: I click the Add to Cart button', async() => {
      await inventoryPage.addToCart(productCount)
    
    })

    await test.step('And: the button text turned to Remove from Add to cart text', async() => {
      await inventoryPage.verifyRemoveToCartBtn()
    
    })

    await test.step('Then: the cart icon should have a red badge with the correct number of product/s that has been added', async() => {
      await inventoryPage.verifyCartNumber(productCount)
    
    })
    
  })


  test('Product/s can be removed to cart @smoke', async() => {
    await test.step('Given: I add a product to cart', async() => {
      await inventoryPage.addToCart(2)
    })

    await test.step(`When: I click Remove on some product/s
                    And: the button text turned to Add to cart from Remove text`, async() => {
      await inventoryPage.removeToCart()
    })

    await test.step(`And: the cart icon with the red badge number decreases
                    Then: reflect the correct number of product/s`, async() => {
      await inventoryPage.verifyCartNumber(1)
    })
  })

  test('Product list could be sorted correctly @smoke', async() => {
    let sortOptions
    await test.step('Given: I click the sort dropdown ', async() => {
      await inventoryPage.clickSort()
    })

    await test.step('And: I see sort options', async() => {
      sortOptions = await inventoryPage.getSortOption()
    })

    for(let index = 0; index < sortOptions[1]; index++){
      await test.step(`When: I select ${sortOptions[0][index]} sort options
                      Then: the product list should show result based on the sort option I selected`, async() => {
        const productOriginalState = await inventoryPage.selectSortOption(sortOptions[0][index])
        await inventoryPage.validateSortResult(sortOptions[0][index], productOriginalState)
      })
    }
  })

  test('Product can be viewed specifically and can be added and remove to cart @smoke', async({page}) =>{
    let productDetails
    await test.step('Given: I choose a Product', async() =>{
      productDetails = await inventoryPage.getProductDetails('one')
    })

    await test.step('And: I click the Product', async() =>{
      await inventoryPage.clickFirstProduct()
    })

    await test.step('And: I redirected to Inventory-item page', async() =>{
      await inventoryPage.validateURL('inventory-item')
    })

    await test.step(`And: I see the product's inventory item page elements #inventoryItemPageElements
    - Kebab option 
    - Swag Labs label
    - cart icon
    - Back to Products label
    - Product card container
    - twitter icon
    - facebook icon 
    - linkedin icon
    - label for © 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy` , async() =>{
      await inventoryPage.verifyInventoryItemPageElements()
    })

    await test.step('And: I see correct Product Details <name>, <description> and <price>', async() =>{
      await inventoryPage.verifyProductDetails(productDetails)
    })

    await test.step('When: I click Add to cart button', async() =>{
      await inventoryPage.addToCart(0, true)
    })

    await test.step('And: the button text turned to Remove from Add to cart text', async() =>{
      await inventoryPage.verifyRemoveToCartBtn('inventory-item')
    })

    await test.step('Then: the cart icon should have a red badge with the correct number of product that has been added', async() =>{
      await inventoryPage.verifyCartNumber()

    })
    
    await test.step(`When: I click Remove on the selected product
                    And: the button text turned to Add to cart from Remove text`, async() => {
      await inventoryPage.removeToCart(true)
    })

    await test.step(`Then: the cart icon with the red badge number decreases
                    And: reflect the correct number of product/s`, async() => {
      await inventoryPage.verifyCartNumber(0, true)

    })
  })

})
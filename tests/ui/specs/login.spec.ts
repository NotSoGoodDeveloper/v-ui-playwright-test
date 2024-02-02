import { test, expect } from '@playwright/test';
import LoginPage  from '../pages/login-page';

require('dotenv').config();

const URL = process.env.URL as string;
const validUser = process.env.VALID_USER as string
const lockedUser = process.env.LOCKED_USER as string
const pass = process.env.PASSWORD as string;

let loginPage: LoginPage;


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(URL);
});

test.describe('Login', async () => {
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });
  
  test('Login valid account', async ({ page }) => {
    await loginPage.login(validUser,pass)
    await loginPage.validateLogin();
  });

  test('Login with incorrect password', async ({ page }) => {
    await loginPage.login(validUser,'incorrectp@ss')
    await loginPage.validateLogin();
  });

  test('Login with non existing user', async ({ page }) => {
    await loginPage.login('non-existing-user','incorrectp@ss')
    await loginPage.validateLogin();
  });

  test('Login locked account', async ({ page }) => {
    await loginPage.login(lockedUser,pass)
    await loginPage.validateLockedCredentials()
  });

});


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

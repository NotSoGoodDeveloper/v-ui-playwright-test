import { test, expect } from '@playwright/test';
import LoginPage  from '../pages/login-page';

const { ENV } = require("../../utils/setup/env");
const envUtil = new ENV();

let loginPage: LoginPage;


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(envUtil.getUrl());
});

test.describe('Login', async () => {
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });
  
  test('Login valid account', async () => {
    await loginPage.login(envUtil.getValidUser(),envUtil.getPass())
    await loginPage.validateLogin();
  });

  test('Login with incorrect password', async () => {
    await loginPage.login(envUtil.getValidUser(),'incorrectp@ss')
    await loginPage.validateLogin();
  });

  test('Login with non existing user', async () => {
    await loginPage.login('non-existing-user','incorrectp@ss')
    await loginPage.validateLogin();
  });

  test('Login locked account', async () => {
    await loginPage.login(envUtil.getLockedUser(),envUtil.getPass())
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

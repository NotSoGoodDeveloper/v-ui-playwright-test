import { chromium, type FullConfig } from '@playwright/test';
import LoginPage from '../../ui/pages/login-page';
const { ENV } = require("../../utils/setup/env");

const envUtil = new ENV();

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    await page.goto(baseURL!)
    await loginPage.login(envUtil.getValidUser(),envUtil.getPass())
    await loginPage.validateLogin()
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;
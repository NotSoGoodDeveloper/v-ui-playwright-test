import { type Page, type Locator , expect } from '@playwright/test';

class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }
    
    async login(username: string ,password: string) {
        await this.page.locator('id=user-name').fill(username);
        await this.page.locator('id=password').fill(password);
        await this.page.getByRole('button').click();
    }
    async validateLogin() {
        const pageUrl = /.*inventory/;
        await expect(this.page).toHaveURL(pageUrl);
        await expect(this.page).toHaveTitle(/Swag Labs/);
      }
}

export default LoginPage;
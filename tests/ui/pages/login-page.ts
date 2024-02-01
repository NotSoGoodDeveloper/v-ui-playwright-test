import { type Page, type Locator , expect } from '@playwright/test';
import message from '../../utils/messages'

class LoginPage {

    readonly page: Page;
    readonly messagePanel : Locator

    constructor(page: Page) {
        this.page = page
        this.messagePanel = page.getByRole('heading', {name: 'error'})
    }
    
    async login(username: string ,password: string) {
        await this.page.locator('id=user-name').fill(username);
        await this.page.locator('id=password').fill(password);
        await this.page.getByRole('button').click();
    }
    async validateLogin() {
        try{
            const pageUrl = /.*inventory/;
            await expect(this.page).toHaveURL(pageUrl);
            await expect(this.page).toHaveTitle(/Swag Labs/);
        }catch{
            await expect(this.page.getByText(message.incorrect_user.error)).toBeVisible();
        }
    }

    async validateLockedCredentials() {
        await expect(this.page.getByText(message.locked_user.error)).toBeVisible();
    }
}

export default LoginPage;
import {Page,Locator} from "@playwright/test"
export class BasePage {

    constructor(protected page: Page) {}

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}.png`
        });
    }
}
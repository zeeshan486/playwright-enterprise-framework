import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    readonly productNames: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productNames = page.getByTestId("inventory-item-name");
        this.checkoutButton = page.getByTestId("checkout");
    }

    private getProductId(productName: string): string {
        return productName.replaceAll(" ", "-").toLowerCase();
    }

    async removeProductsFromCart(productNames: string[]): Promise<void> {
        for (const productName of productNames) {
            const productId = this.getProductId(productName);
            await this.page.getByTestId(`remove-${productId}`).click();
        }
    }

    async clickOnCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
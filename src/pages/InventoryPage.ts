import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
    readonly productsTitle: Locator;
    readonly cartCount: Locator;
    readonly cartIcon: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);
        this.productsTitle = page.getByTestId("title");
        this.cartCount = page.getByTestId("shopping-cart-badge");
        this.cartIcon = page.getByTestId("shopping-cart-link");
        this.menuButton = page.getByRole("button", { name: "Open Menu" });
        this.logoutLink = page.getByRole("link", { name: "Logout" });
    }

    private getProductId(productName: string): string {
        return productName.replaceAll(" ", "-").toLowerCase();
    }

    async addProductsToCart(productNames: string[]): Promise<void> {
        for (const productName of productNames) {
            const productId = this.getProductId(productName);
            await this.page.getByTestId(`add-to-cart-${productId}`).click();
        }
    }

    async removeProductsFromCart(productNames: string[]): Promise<void> {
        for (const productName of productNames) {
            const productId = this.getProductId(productName);
            await this.page.getByTestId(`remove-${productId}`).click();
        }
    }

    async openCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async logout(): Promise<void> {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}

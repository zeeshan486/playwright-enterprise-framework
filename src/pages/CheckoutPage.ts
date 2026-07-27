import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByTestId("firstName");
        this.lastNameInput = page.getByTestId("lastName");
        this.postalCodeInput = page.getByTestId("postalCode");
        this.continueButton = page.getByTestId("continue");
        this.errorMessage = page.getByTestId("error");
        this.finishButton = page.getByTestId("finish");
        this.successMessage = page.getByTestId("complete-header");
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async clickFinishButton(): Promise<void> {
        await this.finishButton.click();
    }
}
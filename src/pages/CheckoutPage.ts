import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage{

    private readonly firstNameInput:Locator;
    private readonly lastNameInput:Locator;
    private readonly postalCodeInput:Locator;
    private readonly continueButton : Locator;
    private readonly finishButton : Locator;
    private readonly successMessage : Locator;
    private readonly errorMessage : Locator;



    constructor(page:Page){
        super(page)
        this.firstNameInput = page.getByTestId("firstName")
        this.lastNameInput = page.getByTestId("lastName")
        this.postalCodeInput = page.getByTestId("postalCode")
        this.continueButton = page.getByTestId("continue")
        this.errorMessage = page.getByTestId("error")
        this.finishButton = page.getByTestId("finish")
        this.successMessage = page.getByTestId("complete-header")
    }

    async fillCheckoutInformation(firstName:string,lastName:string,postalCode:string){

        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.postalCodeInput.fill(postalCode)

    }

    async getErrorMessage():Promise<string>{

        if(!(await this.errorMessage.isVisible())){
            return ""
        }
        return (((await this.errorMessage.textContent())?.trim()) ?? "")
    }

    async getSuccessMessage():Promise<string>{

        if(!(await this.successMessage.isVisible())){
            return ""
        }

        return ((await this.successMessage.textContent())?.trim() ?? "");
    }


    async clickContinueButton():Promise<void>{
          await this.continueButton.click();
    }
    async clickFinishButton():Promise<void>{
        await this.finishButton.click();
    }



}
import { Locator, Page } from "@playwright/test";
import { BasePage} from "./BasePage";

export class CartPage extends BasePage{

    private readonly productNames : Locator;
    private readonly checkout:Locator;


    private getProductId(productName:string):string{
        return productName.replaceAll(" ","-").toLowerCase();
    }

    constructor(page:Page){
        super(page)
        this.productNames = page.getByTestId("inventory-item-name");
        this.checkout = page.getByTestId("checkout")
    }

    async getProductNames():Promise<string[]>{
        return await this.productNames.allTextContents();
    }

    async removeProductsFromCart(prodcutNames:string[]):Promise<void>{

        for(const productName of prodcutNames){

            const productId = this.getProductId(productName);
            const removeButton = this.page.getByTestId(`remove-${productId}`)
            if(!(await removeButton.isVisible())){
                throw new Error(`product ${productName} not found`)
            }
            await removeButton.click();


        }
    }
    async clickOnCheckout():Promise<void>{
        await this.checkout.click();

    }    



}
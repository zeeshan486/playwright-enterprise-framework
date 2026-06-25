import {Page,expect,Locator} from "@playwright/test"
import {BasePage} from "./BasePage"

export class InventoryPage extends BasePage{

    readonly productsTitle : Locator;
    readonly cartCount : Locator;

    private getProductId(productNames:string):string{
        return productNames.replaceAll(" ","-").toLowerCase();
    }



    constructor(page:Page){
        super(page)
        this.productsTitle =  page.getByTestId('title')
        this.cartCount = page.getByTestId("shopping-cart-badge")
        
    }

    async addProductsToCart(productNames:string[]):Promise<void>{

        for(const productName of productNames){
        const productId =  this.getProductId(productName);  
        const addToCartButton  = this.page.getByTestId(`add-to-cart-${productId}`)
        

        if(!(await addToCartButton .isVisible())){
            throw new Error(`Product '${productName}' not found`)
        }

        await addToCartButton .click();  
        }
        
        


    }

    async getCartBadgeCount(): Promise<number>{
        const cartCount = Number((await this.cartCount.textContent())?.trim()??0);
        return cartCount;

    }




}

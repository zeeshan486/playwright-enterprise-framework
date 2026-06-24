import {Page,expect,Locator} from "@playwright/test"
import {BasePage} from "./BasePage"

export class InventoryPage extends BasePage{

    readonly productsTitle : Locator;
    readonly cartCount : Locator;

    private getProductId(productName:string):string{
        return productName.replaceAll(" ","-").toLowerCase();
    }



    constructor(page:Page){
        super(page)
        this.productsTitle =  page.getByTestId('title')
        this.cartCount = page.getByTestId("shopping-cart-badge")
        
    }

    async addProductToCart(productName:string):Promise<void>{

        const productId =  this.getProductId(productName);
        const addToCartButton  = this.page.getByTestId(`add-to-cart-${productId}`)
        

        if(!(await addToCartButton .isVisible())){
            throw new Error(`Product '${productName}' not found`)
        }

        await addToCartButton .click();


    }

    async getCartBadgeCount(): Promise<number>{
        const cartCaount = Number((await this.cartCount.textContent())?.trim()??0);
        return cartCaount;

    }




}

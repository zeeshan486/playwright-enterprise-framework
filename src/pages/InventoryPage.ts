import {Page,expect,Locator} from "@playwright/test"
import {BasePage} from "./BasePage"

export class InventoryPage extends BasePage{

    private readonly productsTitle : Locator;
    private readonly cartCount : Locator;
    private readonly cartIcon : Locator;
private readonly menuButton: Locator;
private readonly logoutLink: Locator;




    constructor(page:Page){
        super(page)
        this.productsTitle =  page.getByTestId('title')
        this.cartCount = page.getByTestId("shopping-cart-badge")
        this.cartIcon =  page.getByTestId("shopping-cart-link")
        this.menuButton = page.getByRole("button", { name: "Open Menu" });
this.logoutLink = page.getByRole("link", { name: "Logout" });

        
    }
    private getProductId(productNames:string):string{
        return productNames.replaceAll(" ","-").toLowerCase();
    }
    async getProductsTitle(): Promise<string>{
        return (await this.productsTitle.innerText()).trim() ?? ""
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

    async removeProductsFromCart(productNames:string[]):Promise<void>{

        for(const productName of productNames){
            const productId = this.getProductId(productName)
            const removeFromCartButton =  this.page.getByTestId(`remove-${productId}`)

            if(!(await removeFromCartButton.isVisible())){
                throw new Error(`Remove Button not for ${productName}`)
            }
            await removeFromCartButton.click();

        }

    }

    async getCartBadgeCount(): Promise<number>{
        if(!(await this.cartCount.isVisible())){
            return 0
        }
        const cartCount = Number((await this.cartCount.textContent())?.trim()??0);
        return cartCount;

    }

    async openCart():Promise<void>{
         await this.cartIcon.click();
    }

async logout(): Promise<void> {

    await this.menuButton.click();

    await this.logoutLink.click();

}



}

import {test as base} from  "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

interface MyFixture{
    loginPage:LoginPage,
    inventoryPage:InventoryPage
    cartPage : CartPage
    checkoutPage:CheckoutPage
}

export const test = base.extend<MyFixture>({
    loginPage : async({page},use)=>{
        const loginPage = new LoginPage(page)
        await use(loginPage);
    },
    inventoryPage : async({page},use)=>{
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    },
    cartPage : async({page},user)=>{
        const cartPage = new CartPage(page)
        await user(cartPage)
    },
    checkoutPage:async({page},use)=>{
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    }
    
}) 

export {expect} from "@playwright/test"
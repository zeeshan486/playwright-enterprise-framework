import {test , expect} from "../fixtures/pageFixture"
import { users } from "../test-data/users"
import { products } from "../test-data/product"

test.beforeEach("Login with valid user",async({loginPage,inventoryPage})=>{
    await loginPage.navigate("/");
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    await expect(inventoryPage.productsTitle).toHaveText("Products")

})



test("TC-07 Remove Product",async({inventoryPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name])
    await inventoryPage.removeProductsFromCart([products.backpack.name])
    expect(await inventoryPage.getCartBadgeCount()).toBe(0)
})

test("TC-08  Remove One Product From Multiple Products",async({inventoryPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name,products.bikeLight.name])
    await inventoryPage.removeProductsFromCart([products.backpack.name])
    expect(await inventoryPage.getCartBadgeCount()).toBe(1)

})
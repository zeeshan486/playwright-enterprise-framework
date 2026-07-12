import {test , expect} from "../fixtures/pageFixture"
import { users } from "../test-data/users"
import { products } from "../test-data/product"

test.beforeEach("Login with valid user",async({loginPage,inventoryPage})=>{
    await loginPage.navigate("/");
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    expect(await inventoryPage.getProductsTitle()).toBe("Products")

})
test("TC-10 Remove Product From Cart",async({inventoryPage,cartPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name])
    await inventoryPage.openCart()
    await cartPage.removeProductsFromCart([products.backpack.name])
    expect(await inventoryPage.getCartBadgeCount()).toBe(0)



})
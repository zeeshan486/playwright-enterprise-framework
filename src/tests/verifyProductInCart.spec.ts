import {test,expect} from "../fixtures/pageFixture"
import{products} from "../test-data/product"
import { users } from "../test-data/users"

test.beforeEach("Login",async({loginPage,inventoryPage})=>{

    await loginPage.navigate("/")
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    expect(await inventoryPage.getProductsTitle()).toBe("Products")

})

test("TC-09 Verify Product In Cart",async({inventoryPage,cartPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name,products.bikeLight.name]);
    await inventoryPage.openCart();
    expect(await cartPage.getProductNames()).toContain(products.backpack.name)
    expect(await cartPage.getProductNames()).toContain(products.bikeLight.name)


})
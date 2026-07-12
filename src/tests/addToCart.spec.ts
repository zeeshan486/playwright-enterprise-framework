import {test,expect} from "../fixtures/pageFixture"
import { products } from "../test-data/product";
import { users } from "../test-data/users";


test.beforeEach("Login with valid user",async({loginPage,inventoryPage})=>{
    await loginPage.navigate("/");
    await loginPage.login(users.standardUser.username,users.standardUser.password)
    expect(await inventoryPage.getProductsTitle()).toBe("Products")

})

test("TC-05 Add Single Product",async({inventoryPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name])
    expect(await inventoryPage.getCartBadgeCount()).toBe(1)




 
})
test("TC-06 Add Multiple Products",async({inventoryPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name,products.bikeLight.name])
    expect(await inventoryPage.getCartBadgeCount()).toBe(2)

})
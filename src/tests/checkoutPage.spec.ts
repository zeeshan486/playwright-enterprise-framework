import {test , expect} from "../fixtures/pageFixture"
import { users } from "../test-data/users"
import { checkoutUsers } from "../test-data/checkoutUsers"
import { products } from "../test-data/product"

test.beforeEach("Login with valid user",async({loginPage,inventoryPage})=>{
await inventoryPage.navigate("/inventory.html");
     expect(await inventoryPage.getProductsTitle()).toBe("Products")

})

test("TC-11 Successful Checkout",async({inventoryPage,cartPage,checkoutPage})=>{

    await inventoryPage.addProductsToCart([products.backpack.name])
    await inventoryPage.openCart()
    await cartPage.clickOnCheckout()
    await checkoutPage.fillCheckoutInformation(checkoutUsers.validUser.firstName,checkoutUsers.validUser.lastName,checkoutUsers.validUser.postalCode)
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    expect(await checkoutPage.getSuccessMessage()).toBe("Thank you for your order!")

})

test("TC-12 Missing First Name",async({inventoryPage,cartPage,checkoutPage})=>{
    await inventoryPage.addProductsToCart([products.backpack.name])
    await inventoryPage.openCart()
    await cartPage.clickOnCheckout()
    await checkoutPage.fillCheckoutInformation(checkoutUsers.missingFirstName.firstName,checkoutUsers.missingFirstName.lastName,checkoutUsers.missingFirstName.postalCode)
    await checkoutPage.clickContinueButton()
    expect(await checkoutPage.getErrorMessage()).toBe("Error: First Name is required")
})

test("TC-13 Missing Postal Code",async({inventoryPage,cartPage,checkoutPage})=>{
    await inventoryPage.addProductsToCart([products.backpack.name])
    await inventoryPage.openCart()
    await cartPage.clickOnCheckout()
    await checkoutPage.fillCheckoutInformation(checkoutUsers.missingPostalCode.firstName,checkoutUsers.missingPostalCode.lastName,checkoutUsers.missingPostalCode.postalCode)
    await checkoutPage.clickContinueButton()
    expect(await checkoutPage.getErrorMessage()).toBe("Error: Postal Code is required")
})
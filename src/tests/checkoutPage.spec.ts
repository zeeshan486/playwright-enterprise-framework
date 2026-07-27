import { test, expect } from "../fixtures/pageFixture";
import { checkoutUsers } from "../test-data/checkoutUsers";
import { products } from "../test-data/product";

test.beforeEach("Navigate to inventory page", async ({ inventoryPage }) => {
    await inventoryPage.navigate("/inventory.html");
    await expect(inventoryPage.productsTitle).toHaveText("Products");
});

test("TC-11 Successful Checkout", async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await inventoryPage.openCart();
    await cartPage.clickOnCheckout();
    await checkoutPage.fillCheckoutInformation(
        checkoutUsers.validUser.firstName,
        checkoutUsers.validUser.lastName,
        checkoutUsers.validUser.postalCode
    );
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
});

test("TC-12 Missing First Name", async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await inventoryPage.openCart();
    await cartPage.clickOnCheckout();
    await checkoutPage.fillCheckoutInformation(
        checkoutUsers.missingFirstName.firstName,
        checkoutUsers.missingFirstName.lastName,
        checkoutUsers.missingFirstName.postalCode
    );
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.errorMessage).toHaveText("Error: First Name is required");
});

test("TC-13 Missing Postal Code", async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await inventoryPage.openCart();
    await cartPage.clickOnCheckout();
    await checkoutPage.fillCheckoutInformation(
        checkoutUsers.missingPostalCode.firstName,
        checkoutUsers.missingPostalCode.lastName,
        checkoutUsers.missingPostalCode.postalCode
    );
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.errorMessage).toHaveText("Error: Postal Code is required");
});
import { test, expect } from "../fixtures/pageFixture";
import { authentication } from "../constants/authentication";
import { products } from "../test-data/product";

// Explicitly override storageState for this spec file to use the Error User session
test.use({ storageState: authentication.errorUser, headless: false });

test.beforeEach("Navigate to inventory with Error User session", async ({ inventoryPage }) => {
    await inventoryPage.navigate("/inventory.html");
    await expect(inventoryPage.productsTitle).toHaveText("Products");
});

test("TC-14 Error User Session Navigation & Cart Interaction", async ({page, inventoryPage }) => {
    // Verify Error User session starts on inventory page
    await expect(inventoryPage.productsTitle).toHaveText("Products");
    // const cookies = await page.context().cookies()
    // console.log(cookies[0].value) provide actual session-username
    // Attempt product addition with Error User session
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await expect(inventoryPage.cartCount).toHaveText("1");
});

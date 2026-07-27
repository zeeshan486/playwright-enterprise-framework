import { test, expect } from "../fixtures/pageFixture";
import { products } from "../test-data/product";

test.beforeEach("Navigate to inventory page", async ({ inventoryPage }) => {
    await inventoryPage.navigate("/inventory.html");
    await expect(inventoryPage.productsTitle).toHaveText("Products");
});

test("TC-09 Verify Product In Cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name, products.bikeLight.name]);
    await inventoryPage.openCart();
    await expect(cartPage.productNames).toHaveText([
        products.backpack.name,
        products.bikeLight.name
    ]);
});
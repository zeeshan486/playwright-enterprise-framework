import { test, expect } from "../fixtures/pageFixture";
import { products } from "../test-data/product";

test.beforeEach("Navigate to inventory page", async ({ inventoryPage }) => {
    await inventoryPage.navigate("/inventory.html");
    await expect(inventoryPage.productsTitle).toHaveText("Products");
});

test("TC-05 Add Single Product", async ({ inventoryPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await expect(inventoryPage.cartCount).toHaveText("1");
});

test("TC-06 Add Multiple Products", async ({ inventoryPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name, products.bikeLight.name]);
    await expect(inventoryPage.cartCount).toHaveText("2");
});


import { test, expect } from "../fixtures/pageFixture";
import { products } from "../test-data/product";

test.beforeEach("Navigate to inventory page", async ({ inventoryPage }) => {
    await inventoryPage.navigate("/inventory.html");
    await expect(inventoryPage.productsTitle).toHaveText("Products");
});

test("TC-07 Remove Product", async ({ inventoryPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await inventoryPage.removeProductsFromCart([products.backpack.name]);
    await expect(inventoryPage.cartCount).toBeHidden();
});

test("TC-08 Remove One Product From Multiple Products", async ({ inventoryPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name, products.bikeLight.name]);
    await inventoryPage.removeProductsFromCart([products.backpack.name]);
    await expect(inventoryPage.cartCount).toHaveText("1");
});
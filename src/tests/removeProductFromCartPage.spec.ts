import { test, expect } from "../fixtures/pageFixture";
import { products } from "../test-data/product";

test.beforeEach("Navigate to inventory page", async ({ inventoryPage }) => {
    await inventoryPage.navigate("/inventory.html");
    await expect(inventoryPage.productsTitle).toHaveText("Products");
});

test("TC-10 Remove Product From Cart Page", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductsToCart([products.backpack.name]);
    await inventoryPage.openCart();
    await cartPage.removeProductsFromCart([products.backpack.name]);
    await expect(inventoryPage.cartCount).toBeHidden();
});
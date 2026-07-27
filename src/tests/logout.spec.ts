import { test, expect } from "../fixtures/pageFixture";

test("TC-03 Logout Successfully", async ({ inventoryPage, page }) => {
    await inventoryPage.navigate("/inventory.html");
    await inventoryPage.logout();
    await expect(page).toHaveURL(/.*\/$/);
});
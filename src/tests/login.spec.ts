import { test, expect } from "../fixtures/pageFixture";
import { users } from "../test-data/users";

// Reset storageState for authentication tests so user starts logged out
test.use({ storageState: { cookies: [], origins: [] } });

test("TC-01 Successful Login", async ({ page,loginPage, inventoryPage }) => {
    await loginPage.navigate("/");
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(inventoryPage.productsTitle).toHaveText("Products"); 
});

test("TC-02 Locked User Login", async ({ loginPage }) => {
    await loginPage.navigate("/");
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");

});

test("TC-03 Invalid Login", async ({ loginPage }) => {
    await loginPage.navigate("/");
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

test("TC-05 Protected Route Without Login", async ({ loginPage, page }) => {
    await loginPage.accessProtectedInventory();
    await expect(page).toHaveURL(/.*\/$/);
});

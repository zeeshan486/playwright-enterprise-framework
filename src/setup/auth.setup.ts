import { test as setup, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { users } from "../test-data/users";
import { authentication } from "../constants/authentication";

setup("Authenticate Standard User", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate("/");

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    await page.context().storageState({
        path: authentication.standardUser
    });

});
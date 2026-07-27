import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { authentication } from "../constants/authentication";
import { getEnvConfig } from "../utils/env";

const envConfig = getEnvConfig();

setup("Authenticate Standard User", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate("/");

    await loginPage.login(
        envConfig.credentials.standardUser.username,
        envConfig.credentials.standardUser.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    await page.context().storageState({
        path: authentication.standardUser
    });
});

setup("Authenticate Error User", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate("/");

    await loginPage.login(
        envConfig.credentials.errorUser.username,
        envConfig.credentials.errorUser.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    await page.context().storageState({
        path: authentication.errorUser
    });
});
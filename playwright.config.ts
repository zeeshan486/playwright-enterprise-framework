import { defineConfig, devices } from "@playwright/test";
import { authentication } from "./src/constants/authentication";
import { getEnvConfig } from "./src/utils/env";

const envConfig = getEnvConfig();

export default defineConfig({
    testDir: "./src/tests",
    timeout: envConfig.timeout,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,

    reporter: process.env.CI
        ? [
              ["github"],
              ["html", { outputFolder: "artifacts/reports", open: "never" }]
          ]
        : [
              ["list"],
              ["html", { outputFolder: "artifacts/reports", open: "never" }]
          ],

    use: {
        baseURL: envConfig.baseURL,
        testIdAttribute: "data-test",
        headless: envConfig.headless,
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    },

    projects: [
        {
            name: "setup",
            testDir: "./src/setup",
            testMatch: /.*\.setup\.ts/
        },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                storageState: authentication.standardUser
            },
            dependencies: ["setup"]
        },
        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                storageState: authentication.standardUser
            },
            dependencies: ["setup"]
        },
        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"],
                storageState: authentication.standardUser
            },
            dependencies: ["setup"]
        }
    ]
});
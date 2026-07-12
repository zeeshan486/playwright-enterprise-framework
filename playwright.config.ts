import { defineConfig, devices } from "@playwright/test";

import { authentication } from "./src/constants/authentication";

export default defineConfig({

    testDir: "./src/tests",
  
    fullyParallel: true,

    reporter: [
        ["html", {
            outputFolder: "artifacts/reports",
            open: "never"
        }]
    ],

    use: {

        baseURL: "https://www.saucedemo.com",

        trace: "retain-on-failure",

        screenshot: "only-on-failure",

        video: "retain-on-failure",
        testIdAttribute:"data-test",
        headless:false

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

        }

    ]

});
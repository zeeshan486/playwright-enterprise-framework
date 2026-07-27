import * as dotenv from "dotenv";
import * as path from "path";

// Determine active environment name (qa, stage, prod)
const targetEnv = (process.env.ENV || "qa").toLowerCase();

// 1. Load environment-specific configuration file (.env.qa, .env.stage, .env.prod)
dotenv.config({ path: path.resolve(process.cwd(), `.env.${targetEnv}`) });

// 2. Fallback to default .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export interface UserCredentials {
    username: string;
    password: string;
}

export interface EnvironmentConfig {
    envName: string;
    baseURL: string;
    timeout: number;
    headless: boolean;
    credentials: {
        standardUser: UserCredentials;
        errorUser: UserCredentials;
    };
}

const environments: Record<string, EnvironmentConfig> = {
    qa: {
        envName: "qa",
        baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
        timeout: 30000,
        headless: process.env.HEADLESS !== "false",
        credentials: {
            standardUser: {
                username: process.env.TEST_USERNAME || "standard_user",
                password: process.env.TEST_PASSWORD || "secret_sauce"
            },
            errorUser: {
                username: process.env.ERROR_USER_USERNAME || "error_user",
                password: process.env.ERROR_USER_PASSWORD || "secret_sauce"
            }
        }
    },
    stage: {
        envName: "stage",
        baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
        timeout: 45000,
        headless: process.env.HEADLESS !== "false",
        credentials: {
            standardUser: {
                username: process.env.TEST_USERNAME || "standard_user",
                password: process.env.TEST_PASSWORD || "secret_sauce"
            },
            errorUser: {
                username: process.env.ERROR_USER_USERNAME || "error_user",
                password: process.env.ERROR_USER_PASSWORD || "secret_sauce"
            }
        }
    },
    prod: {
        envName: "prod",
        baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
        timeout: 60000,
        headless: process.env.HEADLESS !== "false",
        credentials: {
            standardUser: {
                username: process.env.TEST_USERNAME || "standard_user",
                password: process.env.TEST_PASSWORD || "secret_sauce"
            },
            errorUser: {
                username: process.env.ERROR_USER_USERNAME || "error_user",
                password: process.env.ERROR_USER_PASSWORD || "secret_sauce"
            }
        }
    }
};

export function getEnvConfig(): EnvironmentConfig {
    const config = environments[targetEnv] || environments.qa;

    if (process.env.CI) {  //On CI Servers (Jenkins, GitHub Actions, GitLab CI, Azure DevOps): These CI tools automatically inject an environment variable CI=true when running pipelines on cloud servers.
        config.headless = true;
    }

    return config;
}

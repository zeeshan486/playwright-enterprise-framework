# Playwright Enterprise Framework

An enterprise-grade, scalable End-to-End (E2E) Test Automation Framework built with **Playwright**, **TypeScript**, **Page Object Model (POM)**, **Custom Fixtures**, **Multi-Environment Configuration**, and **CI/CD Pipelines (Jenkins & GitHub Actions)**.

---

## Key Architectural Features

- **Page Object Model (POM)**: Complete object-oriented encapsulation of web pages (`src/pages/`) deriving from a `BasePage` base class.
- **Custom Fixtures (`test.extend`)**: Dependency injection of page instances directly into test function signatures (`src/fixtures/pageFixture.ts`), eliminating manual instantiation boilerplate.
- **Session Reuse (`storageState`)**: Global authentication setup (`src/setup/auth.setup.ts`) saving authenticated states to JSON files, enabling high-speed parallel test execution.
- **Multi-Environment Support**: Built-in support for `DEV`, `QA`, `STAGING`, and `PROD` environments managed via `src/utils/env.ts` and `.env` files.
- **Auto-Retrying Web Assertions**: Full utilization of Playwright locator assertions (`await expect(locator).toHaveText(...)`) to guarantee zero test flakiness.
- **Cross-Browser & Multi-Project Matrix**: Configured for Chromium, Firefox, and WebKit test execution.
- **Enterprise CI/CD Pipelines**: 
  - **Jenkins Declarative Pipeline (`Jenkinsfile`)**: Parameterized environment (`ENVIRONMENT`) and browser (`BROWSER`) execution.
  - **GitHub Actions (`.github/workflows/playwright.yml`)**: Automated execution on Push/PR with HTML artifact archiving.

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI workflow
├── artifacts/                     # Generated test reports & session storage
│   ├── .auth/                     # Preserved auth storage states
│   └── reports/                   # Playwright HTML execution reports
├── docs/
│   └── test-plan.md               # Enterprise Test Suite Plan
├── src/
│   ├── constants/
│   │   └── authentication.ts      # Auth state file paths
│   ├── fixtures/
│   │   └── pageFixture.ts         # Custom extended Playwright fixture
│   ├── pages/                     # Page Object Model classes
│   │   ├── BasePage.ts            # Parent Page Object with core actions
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── setup/
│   │   └── auth.setup.ts          # Global authentication setup
│   ├── test-data/                 # Decoupled test dataset modules
│   │   ├── checkoutUsers.ts
│   │   ├── product.ts
│   │   └── users.ts
│   ├── tests/                     # Test Spec files
│   │   ├── addToCart.spec.ts
│   │   ├── checkoutPage.spec.ts
│   │   ├── login.spec.ts
│   │   ├── logout.spec.ts
│   │   ├── removeFromCart.spec.ts
│   │   ├── removeProductFromCartPage.spec.ts
│   │   └── verifyProductInCart.spec.ts
│   └── utils/
│       └── env.ts                 # Multi-Environment configuration manager
├── .env                           # Local environment variable configuration
├── .env.example                   # Environment variable template
├── Jenkinsfile                    # Declarative Jenkins CI/CD Pipeline
├── package.json                   # Dependencies & NPM scripts
├── playwright.config.ts           # Central Playwright configuration
└── tsconfig.json                  # Strict TypeScript configuration
```

---

## Local Setup & Execution

### 1. Installation

```bash
npm install
npx playwright install --with-deps
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and set desired defaults:

```env
ENV=qa
BASE_URL=https://www.saucedemo.com
HEADLESS=true
```

### 3. NPM Execution Commands

| Command | Description |
| :--- | :--- |
| `npm test` | Run tests on Chromium (Default QA environment) |
| `npm run test:all` | Run test suite across all browsers (Chromium, Firefox, WebKit) |
| `npm run test:chromium` | Run test suite strictly on Chromium |
| `npm run test:firefox` | Run test suite strictly on Firefox |
| `npm run test:webkit` | Run test suite strictly on WebKit |
| `npm run test:qa` | Execute tests targeting QA environment |
| `npm run test:staging` | Execute tests targeting Staging environment |
| `npm run test:prod` | Execute tests targeting Production environment |
| `npm run test:headed` | Run tests in headful browser mode |
| `npm run test:ui` | Open Playwright Interactive UI Mode |
| `npm run typecheck` | Perform TypeScript type safety compilation check |
| `npm run report` | Open Playwright HTML Execution Report |

---

## CI/CD Pipelines

### Jenkins Pipeline (`Jenkinsfile`)

The framework includes a parameterized declarative `Jenkinsfile` supporting:
- **`ENVIRONMENT` Parameter**: Select `qa`, `staging`, `prod`, or `dev`.
- **`BROWSER` Parameter**: Select `chromium`, `firefox`, `webkit`, or `all`.
- **`HEADLESS` Parameter**: Toggle headless execution.
- **HTML Reporting**: Automatically archives HTML reports and failure traces.

### GitHub Actions Pipeline (`.github/workflows/playwright.yml`)

Runs on every push or pull request to `main` / `master`, executes Playwright tests, and uploads HTML execution reports as build artifacts for 30 days.
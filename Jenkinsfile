pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'stage', 'prod'],
            description: 'Target deployment environment for test execution'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Browser engine for test execution'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
    }

    environment {
        ENV = "${params.ENVIRONMENT}"
        HEADLESS = "${params.HEADLESS}"
        CI = 'true'
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '30'))
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out repository source code..."
                checkout scm
            }
        }

        stage('Environment Diagnostic') {
            steps {
                echo "=== Environment Diagnostics ==="
                echo "Target Environment : ${env.ENV}"
                echo "Target Browser     : ${params.BROWSER}"
                echo "Headless Mode      : ${env.HEADLESS}"
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browser binaries..."
                sh 'npx playwright install --with-deps'
            }
        }

        stage('TypeScript Validation') {
            steps {
                echo "Running type check..."
                sh 'npm run typecheck'
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                script {
                    echo "Executing Playwright suite on environment: ${params.ENVIRONMENT} against browser: ${params.BROWSER}..."
                    
                    switch(params.BROWSER) {
                        case 'chromium':
                            sh 'npm run test:chromium'
                            break
                        case 'firefox':
                            sh 'npm run test:firefox'
                            break
                        case 'webkit':
                            sh 'npm run test:webkit'
                            break
                        case 'all':
                            sh 'npm run test:all'
                            break
                        default:
                            sh 'npm run test:chromium'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Archiving test artifacts and reports..."
            
            // Archive HTML reports and failure traces/screenshots
            archiveArtifacts artifacts: 'artifacts/reports/**/*, test-results/**/*', allowEmptyArchive: true

            // Publish HTML report if Jenkins HTML Publisher plugin is installed
            script {
                if (pluginManager.hasPlugin('htmlpublisher')) {
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'artifacts/reports',
                        reportFiles: 'index.html',
                        reportName: 'Playwright E2E Test Report',
                        reportTitles: 'Playwright Test Execution Summary'
                    ])
                }
            }
        }
        success {
            echo "Pipeline completed successfully! All Playwright E2E tests passed."
        }
        failure {
            echo "Pipeline failed. Inspect archived Playwright HTML reports and failure traces."
        }
    }
}

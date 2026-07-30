pipeline {

    agent any

    options {
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(
                numToKeepStr: '20',
                artifactNumToKeepStr: '10'
        ))
        disableConcurrentBuilds()
        timestamps()
    }

    parameters {

        choice(
            name: 'ENV',
            choices: ['qa', 'stage', 'prod'],
            description: 'Select Target Environment'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Browser'
        )

        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
    }

    environment {

        NODE_ENV = 'test'
    }

    stages {

        stage('Checkout Source') {

            steps {

                checkout scm

            }

        }

        stage('Prepare Environment') {

            steps {

                script {

                    switch(params.ENV) {

                        case "qa":

                            env.BASE_URL = "https://www.saucedemo.com"

                            env.STANDARD_CREDENTIAL = "qa-standard-user"
                            env.ERROR_CREDENTIAL = "qa-error-user"

                            break

                        case "stage":

                            env.BASE_URL = "https://stage.company.com"

                            env.STANDARD_CREDENTIAL = "stage-standard-user"
                            env.ERROR_CREDENTIAL = "stage-error-user"

                            break

                        case "prod":

                            env.BASE_URL = "https://company.com"

                            env.STANDARD_CREDENTIAL = "prod-standard-user"
                            env.ERROR_CREDENTIAL = "prod-error-user"

                            break

                        default:

                            error("Invalid Environment")

                    }

                }

            }

        }

        stage('Install Dependencies') {

            steps {

                bat 'npm ci'

            }

        }

        stage('Install Playwright Browsers') {

            steps {

                bat 'npx playwright install'

            }

        }

        stage('Run Playwright Tests') {

            steps {

                withCredentials([

                    usernamePassword(
                            credentialsId: env.STANDARD_CREDENTIAL,
                            usernameVariable: 'TEST_USERNAME',
                            passwordVariable: 'TEST_PASSWORD'
                    ),

                    usernamePassword(
                            credentialsId: env.ERROR_CREDENTIAL,
                            usernameVariable: 'ERROR_USER_USERNAME',
                            passwordVariable: 'ERROR_USER_PASSWORD'
                    )

                ]) {

                    bat """
                    set ENV=${params.ENV}
                    set BASE_URL=%BASE_URL%
                    set HEADLESS=${params.HEADLESS}
                    set BROWSER=${params.BROWSER}

                    npm test
                    """

                }

            }

        }

    }

    post {

        always {

            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
            ])

        }

        success {

            echo "Playwright Tests Passed"

        }

        failure {

            echo "Playwright Tests Failed"

        }

        cleanup {

            cleanWs()

        }

    }

}
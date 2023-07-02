## Task 7 (Authorization)
Prerequisites

    The task is a continuation of Homework 6 and should be done in the same repo.

Architecture

Find the entire program architecture: here.
Task Focus
Tasks
Task 7.1

    Create a new service called authorization-service at the same level as Product and Import services with its own AWS CDK Stack. The backend project structure should look like this:

backend-repository
product-service
import-service
authorization-service

    Create a lambda function called basicAuthorizer under the Authorization Service.
    This lambda should have at least one environment variable with the following credentials:

{yours_github_account_login}=TEST_PASSWORD

    {yours_github_account_login} - your GitHub account name. Login for test user should be your GitHub account name
    TEST_PASSWORD - password string. Password for test user must be "TEST_PASSWORD"
    example: johndoe=TEST_PASSWORD

    This basicAuthorizer lambda should take Basic Authorization token, decode it and check that credentials provided by token exist in the lambda environment variable.
    This lambda should return 403 HTTP status if access is denied for this user (invalid authorization_token) and 401 HTTP status if Authorization header is not provided.

NOTE: Do not send your credentials to the GitHub. Use .env file and dotenv package to add environment variables to the lambda. Add .env file to .gitignore file.

.env file example:
vasiapupkin=TEST_PASSWORD

Task 7.2

    Add Lambda authorization to the /import path of the Import Service API Gateway.
    Use your basicAuthorizer lambda as the Lambda authorizer

Task 7.3

    Request from the client application to the /import path of the Import Service should have Basic Authorization header:

Authorization: Basic {authorization_token}

    {authorization_token} is a base64-encoded {yours_github_account_login}:TEST_PASSWORD
    example: Authorization: Basic sGLzdRxvZmw0ZXs0UGFzcw==

    Client should get authorization_token value from browser localStorage

const authorization_token = localStorage.getItem('authorization_token')

Task 7.4

    Commit all your work to separate branch (e.g. task-7 from the latest master) in your own repository.
    Create a pull request to the master branch.
    Submit link to the pull request to Crosscheck page in RS App.

Evaluation criteria (70 points for covering all criteria)

Provide your reviewers with the link to the repo, client application and URLs to execute the /import path of the Import Service`

    authorization-service is added to the repo, has correct basicAuthorizer lambda and correct AWS CDK Stack
    Import Service AWS CDK Stack has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. Response should be in 403 HTTP status if access is denied for this user (invalid authorization_token) and in 401 HTTP status if Authorization header is not provided.
    Client application is updated to send "Authorization: Basic authorization_token" header on import. Client should get authorization_token value from browser localStorage

Additional (optional) tasks

NOTE: Recommended for personal growth and further interviews, but this part would not be evaluated on cross-check.

    +30 - Client application should display alerts for the responses in 401 and 403 HTTP statuses. This behavior should be added to the nodejs-aws-fe-main/src/index.tsx file.
    Just Practice, No Evaluation - Add Login page and protect getProductsList lambda by the Cognito Authorizer
        Create Cognito User Pool using a demo from the lecture. Leave email in a list of standard required attributes. Checkbox Allow users to sign themselves up should be checked. Also, set email as an attribute that you want to verify.
        Add App Client to the User Pool
        In the App Client Settings section select all Identity Providers. Fill the Callback URL(s) field with your Client Application URL (i.e. http://localhost:3000/). Allow only Authorization code grant OAuth Flow. Allow all OAuth Scopes
        Create Domain name
        After all of these manipulations, you can open your Login Page by clicking on the Launch Hosted UI link in the App Client Settings
        Provide this link to your reviewers. The reviewer can just confirm that everything works for him too.
        Add Cognito authorizer to the getProductsList lambda. Use Authorization as a Token Source
        How to make sure that everything works as expected:
            Open Login Page and Sign Up a new user. Use a real email address to create this user
            Verify user using code from the email
            After verification and after every login you will be redirected to the Client application. URL should contain id_token which can be used to access the getProductsList lambda
            Call getProductsList lambda using id_token as a value for the Authorization header
        Remove authorization from the getProductsList after your task will be checked

## Tasks 10. Backend For Frontend
### Task 10.1

    Created a new service called bff-service at the same level as Product Service and Import Service. The backend project structure should look like this:
        backend-repository
            product-service
            import-service
            bff-service

    Created an application in this folder, that listens for all requests and redirects those requests to the appropriate services based on variables provided by the .env file.

    Here's the workflow example that BFF Service should support:

    Make requests to BFF Service with URL in the following format: {bff-service-url}/{recipient-service-name}?var1=someValue
        {bff-service-url} - for example, http://localhost:3000
        {recipient-service-name} - "cart" or "product" (you can use any other mapping of your choice)
        ?var1=someValue - query string

    Get recipientURL from the env variables using {recipient-service-name} as a key

    Get request method (GET, POST, etc.)

    Make a new request to the needed service using the appropriate method and recipientURL

    BFF Service should return the result of the recipient’s request

    If BFF Service cannot find recipientURL by the {recipient-service-name}, return a "Cannot process request" error message with status 502.
    BFF Service should return the same status code and error message that the recipient service returns to the BFF Service in case of any error on the recipient service side.

### Task 10.2

    Deploy BFF Service with Elastic Beanstalk.

    Application name must follow the following convention {yours_github_account_login}-bff-api
    Use the --cname option {yours_github_account_login}-bff-api-{environment_name}
    Use the --single option

    BFF Service should work only with requests from the Product Service and Cart Service.
    All Product Service and Cart Service methods should work correctly if requested via BFF Service

Link: http://alami-bff-service.eba-mwfjmyj4.us-east-1.elasticbeanstalk.com/

### Task 10.3

    Commit all your work to separate branch (e.g. task-10 from the latest master) in your own repository.
    Create a pull request to the master branch.
    Submit link to the pull request to Crosscheck page in RS App.

Evaluation criteria (80 points for covering all criteria)

Provide your reviewers with the following information:

    link to the repo
    Product Service API URL
    Cart Service API URL
    BFF Service API URL
    example of how to call createProduct lambda with all needed information: URL, payload, headers, etc.
    example how to call Product Service and Cart Service via BFF Service URL

    A working and correct application should be in the bff-service folder. Reviewer can start this application locally with any valid configuration in the .env file and this application should works as described in the Task 10.1
    The BFF Service should be deployed with Elastic Beanstalk. The BFF Service call should be redirected to the appropriate service : Product Service or Cart Service. The response from the BFF Service should be the same as if Product Service or Cart Service services were called directly.

Application Functionality (MUST HAVE)

By this point your application must be able to do:

    Products representation on Home page should be based on Product Service API.
    Products are coming from Product DB.
    Product images are not randomly generated on client side. Product image, same as another product model information should be stored on BE side in Product DB.
    Products might be created through CSV product file import from client side.
    Cart might be created with appropriate product set.
    Auth logic should be in place

### Additional (optional) tasks

    +20 - Add a cache at the BFF Service level for a request to the getProductsList lambda function of the Product Service. The cache should expire in 2 minutes.
    How to test:
        Get products list
        Create new product
        Get products list - result shouldn’t have new product
        Wait more than 2 minutes
        Get products list - result should have new product

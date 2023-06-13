**Task 4 (Integration with NoSQL Database)

**Task 4.1**

    Use AWS Console to create two database tables in DynamoDB. Expected schemas for products and stocks:

Product model:

* id -  uuid (Primary key)
* title - text, not null
* description - text
* price - integer

Stock model:

* product_id - uuid (Foreign key from products.id)
* count - integer (Total number of products in stock, can't be exceeded)

Write a script to fill tables with test examples. Store it in your Github repository. Execute it for your DB to fill data.

[task4.1products.bat](task4.1products.bat)
[task4.1stocks.bat](task4.1stocks.bat)

**Task 4.2**

Extend your AWS CDK Stack with data about your database table and pass it to lambda’s environment variables section.
Integrate the getProductsList lambda to return via GET /products request a list of products from the database (joined stocks and products tables).
Implement a Product model on FE side as a joined model of product and stock by productId. For example:

**BE: Separate tables in DynamoDB**

Stock model example in DB:
{
product_id: '19ba3d6a-f8ed-491b-a192-0a33b71b38c4',
count: 2
}

**Product model example in DB:**
{
id: '19ba3d6a-f8ed-491b-a192-0a33b71b38c4'
title: 'Product Title',
description: 'This product ...',
price: 200
}

FE: One product model as a result of BE models join (product and it's stock)

Product model example on Frontend side:
{
id: '19ba3d6a-f8ed-491b-a192-0a33b71b38c4',
count: 2
price: 200,
title: ‘Product Title’,
description: ‘This product ...’
}

NOTE: This setup means User cannot buy more than product.count (no more items in stock) - but this is future functionality on FE side.

Integrate the getProductsById lambda to return via GET /products/{productId} request a single product from the database.

**Task 4.3**

* Create a lambda function called createProduct under the Product Service which will be triggered by the HTTP POST method.
* The requested URL should be /products.
* Implement its logic so it will be creating a new item in a Products table.
* Save the URL (API Gateway URL) to execute the implemented lambda functions for later - you'll need to provide it in the PR (e.g in PR's description) when submitting the task.

**Task 4.4**

* Commit all your work to separate branch (e.g. task-4 from the latest master) in BE (backend) and if needed in FE (frontend) repositories.
* Create a pull request to the master branch.
* Submit link to the pull request to Crosscheck page in RS App.
<hr>
**Evaluation criteria (70 points for covering all criteria)**

Reviewers should verify the lambda functions by invoking them through provided URLs.

* Task 4.1 is implemented
* Task 4.2 is implemented lambda links are provided and returns data
* Task 4.3 is implemented lambda links are provided and products is stored in DB (call Task 4.2 to see the product)
* Your own Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend. Link to a working Frontend application is provided for cross-check reviewer.
<hr>

**Additional (optional) tasks**

* +6 (All languages) - POST /products lambda functions returns error 400 status code if product data is invalid
* +6 (All languages) - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
* +6 (All languages) - All lambdas do console.log for each incoming requests and their arguments
* +6 (All languages) - Use RDS instance instead of DynamoDB tables. Do not commit your environment variables to github!
* +6 (All languages) - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa) (https://devcenter.kinvey.com/nodejs/tutorials/bl-transactional-support, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html)

**Description Template for PRs**

The following should be present in PR's description field:

    What was done?

    Example:

Service is done, but FE is not working...

Additional scope - logger, swagger, unit tests, transaction

    Link to Product Service API - .....
    Link to FE PR (YOUR OWN REPOSITORY) - ...
    In case SWAGGER file is not provided - please provide product schema in PR description

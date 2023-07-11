## Task 8 (Integration with SQL Database)

### Task 8.1

This Pull Request maked special for task 8.1
### https://github.com/alami/nodejs-aws-cart-api/pull/1
#### Could you check it from this PR link

1.	https://github.com/alami/nodejs-aws-cart-api.git forked from https://github.com/rolling-scopes-school/nodejs-aws-cart-api
2.	**initialize [alami-lamda-integration-SQL](alami-lamda-integration-SQL)**
3.	Deploy your code to AWS Lambda
https://github.com/alami/nodejs-aws-cart-api/pull/1

### Task 8.2

Use AWS Console to create a database instance in RDS with PostgreSQL
#### "alami-postgres-instance"
and **"security group"**  with default rule **"Inbound group":  
"All traffic" - "myIP"**

Connect to database instance via a tool called **DataGrip**
Create the following tables:
<pre>

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create type CART_STATUS AS ENUM ('OPEN', 'ORDERED');
create table carts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid DEFAULT uuid_generate_v4() not null,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status CART_STATUS NOT NULL
);

create table cart_items (
    product_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    count integer,
    cart_id UUID NOT NULL,
    foreign key (cart_id) references carts (id)
);
</pre>

SQL script to fill tables with test examples. 
Store it in your Github repository. 
Execute it for your DB to fill data.
<pre>
INSERT INTO carts (user_id, created_at, updated_at, status)
VALUES
(uuid_generate_v4(), '2023-07-10', '2023-07-10', 'OPEN'),
(uuid_generate_v4(), '2023-07-11', '2023-07-11', 'ORDERED'),
(uuid_generate_v4(), '2023-07-12', '2023-07-12', 'OPEN');

INSERT INTO cart_items (product_id, count, cart_id)
VALUES
(uuid_generate_v4(), 2, (SELECT id FROM carts WHERE status='OPEN' LIMIT 1)),
(uuid_generate_v4(), 1, (SELECT id FROM carts WHERE status='ORDERED' LIMIT 1)),
(uuid_generate_v4(), 3, (SELECT id FROM carts WHERE created_at='2023-07-12' LIMIT 1));
</pre>
### Task 8.3

    Update source code in the application to use PostgreSQL instead of memory storage.

    You can make integration by using Typeorm.
    Or you can use a simpler library such as pg.

    Integrate with RDS
    Extend your AWS CDK Stack file with credentials to your database instance and pass it to lambda’s environment variables section.

Task 8.4

    Commit all your work to separate branch (e.g. task-8 from the latest master) in your new repository.
    Create a pull request to the master branch.
    Submit link to the pull request to Crosscheck page in RS App.

Evaluation criteria (70 points for covering all criteria)

Reviewers should verify the lambda functions by invoking them through provided URLs.

    Task 8.1 is implemented
    Task 8.2 is implemented
    Task 8.3 is implemented lambda links are provided and cart's data is stored in DB

Additional (optional) tasks

    +20 (All languages) - Create orders table and integrated with it Order model:

orders:
id - uuid
user_id - uuid
cart_id - uuid (Foreign key from carts.id)
payment - JSON
delivery - JSON
comments - text
status - ENUM or text
total - number

Set status to 'ORDERED' after checkout instead of cart deletion.

    +4 (All languages) - Create users table and integrate with it
    +3 (All languages) - Transaction based creation of checkout
    +3 (All languages) - Integrate Cart service with FE repository

Penalties

    -50 - Serverless Framework used to create and deploy infrastructure

Description Template for PRs
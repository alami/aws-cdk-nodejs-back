# Task 6 SQS & SNS, Async Microservices Communication
Goal

    Learn what async microservices communication is all about
    Explore different async services like SNS, SQS, etc.
    Set up an integration with AWS SNS and AWS SQS

Topics

    Async Messaging Overview
    AWS SQS Overview
    AWS SNS Overview
    Integration with SQS, SNS and Lambda Overview

Prerequisites

    The task is a continuation of Homework 5 and should be done in the same repo
    Task goal is to create a service to be able to save products which were provided in csv file in database.

Architecture

Find the entire program architecture: here.
Task Focus
Tasks
Task 6.1

    Create a lambda function called catalogBatchProcess under the Product Service which will be triggered by an SQS event.
    Create an SQS queue called catalogItemsQueue, in the AWS CDK Stack.
    Configure the SQS to trigger lambda catalogBatchProcess with 5 messages at once via batchSize property.
    The lambda function should iterate over all SQS messages and create corresponding products in the products table.

Task 6.2

    Update the importFileParser lambda function in the Import Service to send each CSV record into SQS.
    It should no longer log entries from the readable stream to CloudWatch.

Task 6.3

    Create an SNS topic createProductTopic and email subscription in the AWS CDK Stack of the Product Service.
    Create a subscription for this SNS topic with an email endpoint type with your own email in there.
    Update the catalogBatchProcess lambda function in the Product Service to send an event to the SNS topic once it creates products.

Task 6.4

    Commit all your work to separate branch (e.g. task-6 from the latest master) in your own repository.
    Create a pull request to the master branch.
    Submit link to the pull request to Crosscheck page in RS App.

Evaluation criteria (70 points for covering all criteria)

Reviewers should verify the lambda functions, SQS and SNS topic and subscription in PR.

    AWS CDK Stack contains configuration for catalogBatchProcess function
    AWS CDK Stack contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS
    AWS CDK Stack contains configuration for SQS catalogItemsQueue
    AWS CDK Stack contains configuration for SNS Topic createProductTopic and email subscription

Additional (optional) tasks

    +15 (All languages) - catalogBatchProcess lambda is covered by unit tests
    +15 (All languages) - set a Filter Policy for SNS createProductTopic in AWS CDK Stack and create an additional email subscription to distribute messages to different emails depending on the filter for any product attribute

Description Template for PRs

The following should be present in PR's description field:

    What was done?

FE link: http://alami-nodejs-aws-shop-react.s3-website-us-east-1.amazonaws.com

6.1 added catalogBatchProcess

Additional scope - webpack, swagger, unit tests

    Link to Product Service and Import Service APIs - .....

    Link to FE PR (YOUR OWN REPOSITORY) - ...

    In case SWAGGER file is not provided - please provide product schema in PR description

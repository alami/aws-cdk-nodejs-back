import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dotenv from 'dotenv'

dotenv.config()

const app = new cdk.App();

const stack = new cdk.Stack(app, `${process.env.PREFIX}-stack`, {
    description: `Stack for deploy of ${process.env.PREFIX} application`,
    env: {region: process.env.PRODUCT_AWS_REGION},
})

new  nodejs.NodejsFunction(stack, 'BasicAuthorizerLambda', {
    functionName: 'basicAuthorizer',
    runtime: lambda.Runtime.NODEJS_18_X,
    entry: 'src/handler/basicAuthorizer.ts'
})
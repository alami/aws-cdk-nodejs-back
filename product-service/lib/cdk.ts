import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps} from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import * as apigatewayv2 from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'

import { productsTableName, stocksTableName } from "../db";


const prefix = process.env.PREFIX

const app = new cdk.App();

const stack = new cdk.Stack(app, `${prefix}-stack`, {
    description: `Stack for deploy all resources  of ${prefix} application`,
    env: {region: process.env.PRODUCT_AWS_REGION},
})

const sharedLambdaProps: Partial<NodejsFunctionProps> = {
    runtime: Runtime.NODEJS_18_X,
    environment: {
        PRODUCT_AWS_REGION: process.env.PRODUCT_AWS_REGION,
        PRODUCTS_TABLE_NAME: productsTableName,
        STOCKS_TABLE_NAME: stocksTableName,
    },
}
const getProductsList = new NodejsFunction(
    stack,
    `${prefix}-getProductsList-lambda`,
    {
        ...sharedLambdaProps,
        functionName: 'getProductsList',
        entry: 'src/handlers/getProductsList.ts',
    }
)

const api = new apigatewayv2.HttpApi(stack, `${prefix}-api`, {
    corsPreflight: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: [apigatewayv2.CorsHttpMethod.ANY],
    },
})

api.addRoutes({
    integration: new HttpLambdaIntegration(
        `${prefix}-getProductsList-lambda-integration`,
        getProductsList
    ),
    path: '/products',
    methods: [apigatewayv2.HttpMethod.GET],
})


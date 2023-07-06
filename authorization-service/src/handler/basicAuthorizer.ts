import { APIGatewayTokenAuthorizerHandler, APIGatewayAuthorizerResult } from 'aws-lambda';

export const handler: APIGatewayTokenAuthorizerHandler = async (
    event, _ctx, cb): Promise<any> => {
    if (event['type'] !== 'TOKEN')
        cb('Unauthorized')
    try {
        const { authorizationToken } = event || {}
        const [ _, encodedCreds] = authorizationToken.split(' ')
        const bf = Buffer.from(encodedCreds, 'base64')
        const [username, password] = bf.toString('utf-8').split(':')
        console.log(`username: ${username} and password: ${password}`)
        const testPass = process.env[username]
        const effect = !testPass || testPass !== password ? 'Deny' : 'Allow'
        const policy = generatePolicy(encodedCreds, event.methodArn, effect)
        cb(null, policy);
        return policy;
    } catch {
        cb('Unauthorized');
    }
};
function generatePolicy(
    principalId: string,
    resource: string,
    effect: 'Allow' | 'Deny' = 'Allow'
): APIGatewayAuthorizerResult {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };
}

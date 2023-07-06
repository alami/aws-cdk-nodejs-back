
export const buildResponse = (statusCode: number, body: unknown) => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-headers': '*',
    },
    body: JSON.stringify(body),
});
export const createResponse = (
    statusCode: number,
    body: any,
    headers: Headers = CORS_HEADER
) => ({
    statusCode,
    headers,
    body: JSON.stringify(body, null, 2),
})
export const CORS_HEADER = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
}
type Headers = Record<string, string>
export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}
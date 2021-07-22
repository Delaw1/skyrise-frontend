export const SystemConstant = {
    HEADER: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS'
    },
    VERB: {
        POST: "POST",
        GET: "GET"
    },
    TOKEN: (token) => {
        return {
            "Authorization": `Bearer ${token}`
        }
    }
}
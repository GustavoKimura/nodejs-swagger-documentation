module.exports = async function ensureAuthenticated(request: any, response: any, next: any) {
    const token = request.headers.authorization;

    if (!token) {
        return response.status(401).send();
    }

    const [, user] = token.split(' ');

    if (user === 'admin') {
        return next();
    }

    return response.status(401).send();
};
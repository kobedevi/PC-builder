class AuthError extends Error {
    constructor(e) {
        super()
        this.message = 'Unauthorized';
        this.statusCode = 401;
    }
}

module.exports = AuthError;
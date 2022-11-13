class ForbiddenError extends Error {
    constructor(e) {
        super()
        this.message = 'Forbidden'
        this.statusCode = 403;
    }
}

module.exports = ForbiddenError;
class NotFoundError extends Error {
    constructor() {
        super()
        this.message = "Resource not found";
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;
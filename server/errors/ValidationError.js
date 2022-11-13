class ValidationError extends Error {
    constructor(e) {
        super()
        this.message = e.message;
        this.statusCode = 400;
    }
}

module.exports = ValidationError;
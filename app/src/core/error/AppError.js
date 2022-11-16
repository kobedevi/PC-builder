class AppError extends Error {
    constructor(e) {
        super();
        this.message = String(e);
    }
}

export default AppError;
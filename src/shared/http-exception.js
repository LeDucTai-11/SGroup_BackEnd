class HttpException extends Error {
    constructor(statusCode,message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
export default HttpException;
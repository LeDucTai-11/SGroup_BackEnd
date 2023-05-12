class HttpException extends Error {
    constructor(statusCode,message) {
        super(message);
        this.statusCode = statusCode;
    }
}
export default HttpException;
import httpException from "../shared/http-exception.js";
const exceptionHandler = (err,req,res,next) => {
    if(err instanceof httpException) {
        return res.status(err.statusCode).json({
            "message" : err.message,
            "errors" : err.errors
        });
    }
    next();
}

export default exceptionHandler;
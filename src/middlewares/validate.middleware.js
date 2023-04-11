export default(req, res,next) => {
    if(isValidName(req.body.fullname) && isValidAge(req.body.age)) {
        next();
    }else {
        return res.status(400).json({
            "message" : "User is not valid."
        });
    }
}

const isValidName = (fullName) => {
    let regex = /^[a-zA-Z ]+$/;
    return regex.test(fullName);
}

const isValidAge = (age) => {
    return age > 0;
}

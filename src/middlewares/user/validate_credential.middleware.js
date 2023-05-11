export default (req, res, next) => {
    const { username, password } = req.body;
    if (username.length < 3) {
        return res.status(400).json({ message: "Username is not valid" });
    }

    if (password.length < 3) {
        return res.status(400).json({ message: "Password is not valid" });
    }
    next();
}
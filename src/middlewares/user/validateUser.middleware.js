export default(req, res, next) =>{
    const { fullname, username, password, email, age,gender } = req.body;
    
    if (fullname.length < 2) {
      return res.status(400).json({ message: "Full name is not valid" });
    }

    if(gender == null) {
      return res.status(400).json({ message: "Gender is not valid" });
  }

    if (username.length < 3) {
      return res.status(400).json({ message: "Username is not valid" });
    }

    if (password.length < 3) {
      return res.status(400).json({ message: "Password is not valid" });
    }
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    if (isNaN(age) || age < 1 || age > 120) {
      return res.status(400).json({ message: "Age is not valid" });
    }

    next();
  }
  
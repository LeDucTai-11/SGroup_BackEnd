export default(req, res, next) =>{
    const { fullname, gender, age } = req.body;
    
    if (fullname.length < 2) {
      return res.status(400).json({ message: "Full name is not valid" });
    }
  
    if(gender == null) {
        return res.status(400).json({ message: "Gender is not valid" });
    }

    if (isNaN(age) || age < 1 || age > 120) {
      return res.status(400).json({ message: "Age is not valid" });
    }
    next();
  }
  
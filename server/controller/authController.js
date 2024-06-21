const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  const { phone, email, name, password } = req.body;

  try {
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      phone,
      email,
      name,
      password,
      photo:
        "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
      experience: "",
      skills: [],
      education: "",
    });

    if (user) {
      res.status(201).json({
        message: "User Registered Successfully.",
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const {phone, password} = req.body;
  try {
      const user = await User.findOne({phone});
      if(!user){
          return res.status(401).json({message: 'Invalid credentials'});
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if(!isPasswordMatch){
          return res.status(401).json({message: 'Invalid credentials'});
      }

      res.status(201).json({
        message: "User Logged-In Successfully.",
        token: generateToken(user._id),
      });

  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

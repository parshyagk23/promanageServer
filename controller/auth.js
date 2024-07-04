const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyJwt = require('../middlewares/VerifyToken')

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        errormessage: "Bad request",
      });
    }
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(409).json({
        errormessage: "Username Already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const UserData = new User({
      username,
      email,
      password: hashedPassword,
    });
    await UserData.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {

    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errormessage: "Bad request",
      });
    }
    const UserDetails = await User.findOne({ email })
    if (!UserDetails) {
      return res.status(401).json({
        errormessage: "Invalid Credentials!!",
      });
    }
    const passwordMatches = await bcrypt.compare(
      password,
      UserDetails?.password
    );
    if (!passwordMatches) {
      return res.status(401).json({
        errormessage: "Invalid Credentials!!",
      });
    }

    const token = jwt.sign(
      {
        userId: UserDetails?._id,
        username: UserDetails?.username,
        email: UserDetails?.email
      },
      process.env.SECRET_CODE,
      { expiresIn: "24h" }
    );
    res.json({
      message: "User Login SuccessFully",
      token,
      username: UserDetails?.username,
      _id: UserDetails?._id,
      email: UserDetails?.email
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      errorMessage: "Internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
   
    const userId = verifyJwt.decodeToken[req.headers["authorization"]]
    if (!userId) {
      return res.status(400).json({
        errorMessage: "Something Went wrong Please Login Again",
      });
    }
    if (oldPassword || newPassword) {
      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          errorMessage: "Bad Request,Invalid Credential",
        });
      }
      const userDetails = await User.findOne({ _id: userId }).select(
        "password"
      );
      if (!userDetails) {
        return res.status(404).json({
          errorMessage: "User not found",
        });
      }
      const passwordCheck = await bcrypt.compare(
        oldPassword,
        userDetails.password
      );
      if (!passwordCheck) {
        return res
          .status(401)
          .json({ errorMessage: "Invalid Password", success: false });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const response = await User.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword } }
      );
    }
    

    res.status(200).json({ success: true, message: "Update successful", name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}
module.exports = { registerUser, loginUser,updateUser };

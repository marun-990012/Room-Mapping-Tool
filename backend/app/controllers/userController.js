
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from "../models/UserModel.js";

// user Registration controller
const userController = {};

userController.register = async (req, res) => {
 
  const {name,email,password} = req.body;
  
  try {
    const user = new User({name,email,password});
   
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(201).json({result:user,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong with server", success:false});
  }
};


// user login controller
userController.login = async (req, res) => {
 
  const { password, email } = req.body;
 
  try {
    const user = await User.findOne({ email: email });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const tokenData = { userId: user._id, role: user.userType };
   
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await user.save();
    return res.json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong wih server", success:false});
  }
};

//account controller
userController.account = async (req, res) => {
  try {
    const account = await User.findOne({_id:req.userId});
    if(!account){
      return res.status(404).json({message:"Account not found", success:false});
    }
    return res.status(200).json({result:account,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong wih server", success:false});
  }
};

export default userController;
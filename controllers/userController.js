import User from "../models/User.js";
import emailRegister from "../helper/emailRegister.js";
("../helper/emailRegister.js");
const test = (request, response) => {
  const successMessage = "Test successfully handled User routes correctly";

  response.send({
    msg: successMessage,
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, web } = req.body;

    // Check for duplicate user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already registered");
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      web,
    });

    const savedUser = await user.save();

    // Send registration email
    emailRegister({
      email,
      name,
      token: savedUser.token,
    });

    res.json(savedUser);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: "something wrong!" });
  }
};

export default register;

const confirm = async (req, res) => {
  // Use req.params to read data from the URL, in this case, the token, as defined in the route
  const { token } = req.params;
  // console.log(req.params);
  const confirmedUser = await User.findOne({ token });
  // console.log(confirmedUser);
  // console.log(token);
  if (!confirmedUser) {
    const error = new Error("Invalid token");
    // console.log("Invalid token");
    return res.status(404).json({ msg: error.message });
  }
  try {
    confirmedUser.token = null;
    confirmedUser.confirmed = true;
    await confirmedUser.save();
    res.json({
      msg: "User confirmed successfully",
    });
    // console.log("User confirmed successfully");
  } catch (error) {
    console.error(error.message);
  }
};

export { test, register, confirm };

import User from "../models/User.js";
import emailRegister from "../helper/emailRegister.js";
import generateJWT from "../helper/generateJWT.js";

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

const profile = (req, res) => {
  // Extract user data stored on the Node.js server
  // console.log(req.user);
  const { user } = req;

  try {
    // Send user data in the response
    res.status(200).json({
      user,
    });
  } catch (error) {
    // Handle errors and send a 404 response
    return res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

const authentication = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      const error = new Error("User does not exist");
      return res.status(403).json({ msg: error.message });
    }

    // Check if the user is confirmed
    if (!user.confirmed) {
      const error = new Error("Your account has not been confirmed");
      return res.status(403).json({ msg: error.message });
    }

    // Authenticate the user by checking the password
    if (await user.checkPassword(password)) {
      // Generate and send JWT for authentication
      // https://jwt.io/
      res.json({
        user,
        token: generateJWT(user._id),
        msg: "User authenticated",
      });
    } else {
      const error = new Error("Incorrect password");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Authentication error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { test, register, confirm, profile, authentication };

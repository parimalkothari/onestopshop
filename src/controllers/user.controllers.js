import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    username,
    email,
    password,
    phonenumber,
    role,
    addressline1,
    addressline2,
    pincode,
    city,
    state,
    country,
  } = req.body;
  if (
    [
      fullname,
      username,
      email,
      password,
      role,
      addressline1,
      addressline2,
      pincode,
      city,
      state,
      country,
    ].some((field) => {
      return !field || field.trim() === "";
    })
  ) {
    throw new ApiError(401, "All fields are required");
  }

  if (!phonenumber) {
    throw new ApiError(401, "Phone number is required");
  }
  if (phonenumber.toString().length != 10) {
    throw new ApiError(401, "phone number should have 10 digits");
  }

  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (existingUser) {
    throw new ApiError(403, "email or username already in use");
  }

  if (!req.files || !req.files.avatar) {
    throw new ApiError(401, "Avatar is required");
  }

  const localFilePath = req.files.avatar[0].path;
  const avatar = await uploadOnCloudinary(localFilePath);
  if (!avatar) {
    throw new ApiError(500, "something went wrong while uploading avatar");
  }

  const newUser = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    phonenumber,
    role,
    avatar: avatar.url,
    address: {
      addressline1,
      addressline2,
      pincode,
      city,
      state,
      country,
    },
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while creating user");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(401, "either of email or username is required");
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(404, "Invalid credentials");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(404, "Invalid credentials");
  }
  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user);
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Something went wrong");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken",refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError("Unauthorized request");
  }
  await User.updateOne(
    {
      _id: req.user._id,
    },
    {
      $unset: {
        refreshToken:""
      },
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {success:true}, "user logged out"));
});

export { registerUser, loginUser,logoutUser};

const { User } = require("../Models/index");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// read all
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// read one
exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// create user
exports.createUser = catchAsync(async (req, res, next) => {
  const user = req.body;
  const existedEmail = await User.findOne({ where: { email: user.email } });

  if (existedEmail) {
    return next(new AppError("Email already exists", 404));
  }

  const newUser = await User.create(user);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

// update
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;
  const userToUpdate = await User.findOne({ where: { id } });

  // Throws error when user does not exist in DataBase
  if (!userToUpdate) {
    return next(new AppError("No user found with that ID", 404));
  }

  // [Optional]: when the user type noting (ex: {})
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("No data to update", 404));
  }

  // if the password == password return false
  const isDataEqual = Object.keys(req.body).every(
    (key) => userToUpdate[key] === req.body[key]
  );

  if (isDataEqual) {
    return next(new AppError("No data to update", 404));
  }

  // update to database
  await User.update(newData, { where: { id } });

  // store Updated
  const updatedUser = await User.findOne({ where: { id } });

  res.status(201).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

// delete
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  await user.destroy({ where: { id } });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

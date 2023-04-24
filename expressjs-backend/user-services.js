const mongoose = require("mongoose");
const userModel = require("./user");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// delete user by id
async function deleteUser(id) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      console.log('Deleted user:', deletedUser);
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      return { error: error.message };
    }
  }


async function findUserByNameAndJob(name, job) {
  return await userModel.find({ name: name, job: job });
}

async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.findUserByNameAndJob = findUserByNameAndJob;
exports.deleteUser = deleteUser;
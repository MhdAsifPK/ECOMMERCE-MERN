import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// oro time password create aakkumbo e function avide exicute aavum(pre method use cheythond)
userSchema.pre("save", async function (next) {
  // console.log("first")
  if (!this.isModified("password")) {
    // console.log("second")
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password, salt);

});

const User = mongoose.model("User", userSchema);

export default User;

"use server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "./mongoose";
import { signIn, signOut } from "./auth";
import { AuthError } from "next-auth";
import { User } from "@/models/user";

export const UpdateProfile = async (previousState, formData, session) => {
  const { name,email, phone, img, password } = Object.fromEntries(formData);

  try {
    await connectMongoDB();

    // Find user by email from session
    const user = await User.findOne({ email });
    if (!user) {
      const errorMessage = 'User not found';
  console.error(errorMessage);

  // Return error message so it can be handled on the client
  return { error: errorMessage };
    }

    // Hash new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update user profile fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.img = img || user.img;

    await user.save();
    revalidatePath("/profile"); // Revalidate the profile page if needed

    return { success: true }; // Indicate success
  } catch (error) {
    throw new Error(`Profile update failed: ${error.message}`);

    return { error: "Something went wrong during profile update" };
  }
};

export const addUser = async (previousState, formData) => {
  const { name, password, email, img,status, isAdmin } = Object.fromEntries(
    formData
  );
  
  try {
 
    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User with this email already exists" };
    }
    const newUser = new User({
      name,
      email,
      img,
      password,
      isAdmin,
      status
    });
    await newUser.save();
    console.log("saved to database");
    revalidatePath("/admin");
    return { success: true }; // Return success status

  } catch (error) {
    console.log(error);
    return { error: "something went wrong" };

  }
};
// export const deleteProject = async (formData) => {
//   const { id } = Object.fromEntries(formData);
//   try {
//     await connectMongoDB();

//     const deletedProject = await Project.findByIdAndDelete(id);

//     if (!deletedProject) {
//       throw new Error("Project not found");
//     }

//     console.log("Project deleted from database");
//     revalidatePath("/projects"); // Revalidate the path to update the cache
//     revalidatePath("/admin "); // Revalidate the path to update the cache
//   } catch (error) {
//     console.log(error);
//     return { error: "Something went wrong" };
//   }
// };
// export const deletePost = async (formData) => {
//   const { id } = Object.fromEntries(formData);
//   try {
//     await connectMongoDB();

//     const deletedPost = await Post.findByIdAndDelete(id);

//     if (!deletedPost) {
//       throw new Error("Post not found");
//     }

//     console.log("Post deleted from database");
//     revalidatePath("/blog"); // Revalidate the path to update the cache
//     revalidatePath("/admin "); // Revalidate the path to update the cache
//   } catch (error) {
//     console.log(error);
//     return { error: "Something went wrong" };
//   }
// };
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectMongoDB();
    await Post.deleteMany({ userId: id });

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    console.log("User deleted from database");
    revalidatePath("/admin"); // Revalidate the path to update the cache
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
export const register = async (previousState, formData) => {
  const {
    name,
    email,
    phone,
    password,
    img,
    status,
    confirmPassword,
  } = Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectMongoDB();

    // Check if the email or username already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return { error: "Email already registered" };
    }

    const existingUserByName = await User.findOne({ name });
    if (existingUserByName) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      img,
      status
    });

    await newUser.save();
    console.log("User saved to database");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};
// export const login = async (previousState, formData) => {
//   const { username, password } = Object.fromEntries(formData);
//   try {
//     const result = await signIn("credentials", { redirect: false, username, password });

//     if (result?.error) {
//       return { error: "Invalid username or password" };
//     }

//     console.log("logged in successfully");
//     return { success: true };
//   } catch (error) {
//     return { error: "An unexpected error occurred. Please try again." };
//   }
// };
// export const login = async (previousState, formData) => {
//   const { email, password } = Object.fromEntries(formData);

//   try {
//     const result = await signIn("credentials", { redirect: false, email, password });

//     if (!result?.ok) {
//       // Handle error
//       return { error: "Invalid credentials" };
//     }

//     console.log("Logged in successfully");
//     return { success: true };
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid credentials" };
//         default:
//           return { error: "Something went wrong" };
//       }
//     }
//     return { error: "An unexpected error occurred. Please try again." };
//   }
// };

export const login = async (previousState, formData) => {    console.error('Profile update error:', error.message);

  const { email, password } = Object.fromEntries(formData);
  // console.log(username, password);
  try {
    
    // console.log(username,password);
    const result = await signIn("credentials", { redirect: false, email, password });

    console.log("logged in successfully");
    return { success: true };
  } catch (error) {
    // console.log("Authorize Error:", error.message);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};




export const handleLogout = async () => {
  await signOut();
};
export const handleGithubLogin = async () => {
  await signIn("github");
};

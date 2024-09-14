import {Project} from "@/models/regions";
import { connectMongoDB } from "./mongoose";
import { unstable_noStore as noStore } from "next/cache";
import { Post } from "@/models/ip";
import { User } from "@/models/user";
export const getPosts = async () => {
  try {
   await connectMongoDB();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get posts");
  }
};
export const getProjects = async () => {
  try {
    await connectMongoDB();
    const projects = await Project.find();
    return projects;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get projects");
  }
};
export const getProject = async (slug) => {
  try {
    await connectMongoDB();
    // console.log(slug);
    const project = await Project.findOne({ slug });
    if (!project) {
      throw new Error("Project not found");
    }
    // console.log(project);
    return project;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get project");
  }
};
export const getPost = async (slug) => {
  try {
    await connectMongoDB();
    // console.log(slug);
    const post = await Post.findOne({ slug });
    // console.log(post);
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get post");
  }
};
export const getUser = async (id) => {
  noStore();
  try {
    await connectMongoDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get user");
  }
};
export const getUsers = async () => {
  try {
    await connectMongoDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get users");
  }
};

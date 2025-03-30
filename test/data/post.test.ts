import { expect } from "chai";
import postDataLayer from "../../src/data/postDataLayer";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { Post, User } from "../../src/model/models";
import { Comment } from "../../src/model/models";


describe("Post Data Layer", () => {
    let testUser: any;
    let testPost: any;
    let testComment: any; 
    before(async () => {
        await mongoose.connect(process.env.DB_uri || "");
        testUser = await User.create({
            name: "Test User",
            email: "testUser@example.com",
            password: "password123",
        });
        testPost = await postDataLayer.createPost("Test post content", testUser._id, testUser.name);
        testComment = await postDataLayer.createComment("Test comment content", testUser._id, testUser.name, testPost._id);
        
    });
    after(async () => {
        User.deleteMany({ name: "Test User" });
        Post.deleteMany({ authorName: "Test User" });
        Comment.deleteMany({});
        await mongoose.disconnect();
    });
    describe("Create a Post", () => {
        it("should create a post and return it", async () => {
            const post = await postDataLayer.createPost("New post content", testUser._id, testUser.name);
            expect(post).to.be.an("object");
            expect(post).to.have.property("content", "New post content");
            expect(post).to.have.property("author", testUser._id);
        });
    });
    describe("Update a Post", () => {
        it("should update a post and return it", async () => {
            const updatedPost = await postDataLayer.updatePostContent("Updated post content", testPost._id);
            expect(updatedPost).to.be.an("object");
            expect(updatedPost).to.have.property("content", "Updated post content");
        });
    });
    
    describe("Get a Post by id", () => {
        it("should return a post when a valid post ID is provided", async () => {
            const result = await postDataLayer.getPostById(testPost._id, ["content", "authorName", "author"]);
            expect(result).to.be.an("object");
            expect(result).to.have.property("content", "Updated post content");
            expect(result).to.have.property("authorName", testUser.name);
        });
        
    });
    describe("Get all Posts", () => {
        it("should return all posts", async () => {
            const posts = await postDataLayer.getAllPosts(1, ["content", "authorName", "author"]);
            expect(posts).to.be.an("array");
            expect(posts.length).to.be.greaterThan(0);
            expect(posts.length).to.be.lessThan(11);
            expect(posts[0]).to.have.property("authorName", testUser.name);
        });
    });
    describe("Creating a comment on a post", () => {
        it("should return a new comment", async () => {
            const comment = await postDataLayer.createComment("Test comment on the test post", testUser._id, testUser.name, testPost._id);

            expect(comment).to.be.an("object");
            expect(comment).to.have.property("content", "Test comment on the test post");
            expect(comment).to.have.property("userName", testUser.name);
            expect(comment).to.have.property("postId", testPost._id);
        });
    });
    describe("Get comments on post by post id", () => {
        it("should return an array of comments", async () => {
            const comments = await postDataLayer.getCommentsByPostId(testPost._id);
            expect(comments).to.be.an("array");
            expect(comments.length).to.be.greaterThan(0);
            expect(comments[0]).to.have.property("content", "Test comment content");
            expect(comments[0]).to.have.property("userName", testUser.name);  
        });
        it("should throw an error if postId is invalid", async () => {
            try {
                await postDataLayer.getCommentsByPostId("invalidPostId");
            } catch (error: any) {
                expect(error.message).to.equal("PostId is not valid!");
            }
        });

    });
    describe("Update a comment", () => {
        it("should update a comment and return it", async () => {
            const updatedComment = await postDataLayer.updateComment("Updated comment content", testComment._id);
            expect(updatedComment).to.be.an("object");
            expect(updatedComment).to.have.property("content", "Updated comment content");
        });
    });
    describe("Get a comment by it's id ", () => { 
        it("should return a comment when valid id is provided", async () => {
            const result = await postDataLayer.getCommentById(testComment._id, ["content", "userName", "postId"]);
            expect(result).to.be.an("object");
            expect(result).to.have.property("content", "Updated comment content");
            expect(result).to.have.property("userName", testUser.name);
        });
    })







});
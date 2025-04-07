import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import request from "supertest";
import { app } from "../../src/index"; 
import { Post, User } from "../../src/model/models";
import { Comment } from "../../src/model/models";
import { generateToken } from "../../src/util/jwt";
import feedDataLayer from "../../src/data/feedDataLayer";


dotenv.config();

describe("Feed Controller Integration Tests", () => {
    let testUser: any;
    let testPost: any;
    let testComment: any;
    let authToken: string;
    
    before(async () => {
        await mongoose.connect(process.env.DB_uri || "");
        

        testUser = await User.create({
            name: "Test Controller User",
            email: "testcontroller@example.com",
            password: "password123",
        });
        authToken = generateToken(testUser._id, testUser.name);

        testPost = await Post.create({
            content: "Test controller post content",
            userId: testUser._id,
            userName: testUser.name,
            numberOfComments: 0
        });
        
        testComment = await feedDataLayer.createComment("Test controller comment content", testUser._id, testUser.name,testPost._id);
        
    
    });
    
    after(async () => {
        await User.deleteMany({ name: "Test Controller User" });
        await Post.deleteMany({ userName: "Test Controller User" });
        await Comment.deleteMany({ userName: "Test Controller User" });
        await mongoose.disconnect();
    });
    
    describe("GET /feed/:pageNumber", () => {
        it("should return posts for page 1", async () => {
            const response = await request(app)
                .get("/feed?page=1");
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.be.an("array");
            expect(response.body.data.length).to.be.lessThan(11); // Max 10 posts per page
        });

    });
    
    describe("GET /feed/:postId", () => {
        it("should return a specific post when a valid ID is provided", async () => {
            const response = await request(app)
                .get(`/feed/${testPost._id}`)
                .expect(200);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("content", "Test controller post content");
            expect(response.body.data).to.have.property("userName", testUser.name);
        });
        
       
    });
    
    describe("POST /feed", () => {
        it("should create a new post when authenticated", async () => {
            const postData = { content: "New integration test post" };
            const response = await request(app)
                .post("/feed")
                .set("Authorization", `Bearer ${authToken}`)
                .set("Content-Type", "application/json")
                .send(postData)
                .expect(201);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("content", "New integration test post");
            expect(response.body.data).to.have.property("userName", testUser.name);
        });
    });
        
    
    describe("patch /feed/:postId", () => {
        it("should update a post when authenticated", async () => {
            const updateData = {
                content: "Updated controller test post content"
            };
            
            const response = await request(app)
                .patch(`/feed/${testPost._id}`)
                .set("Authorization", `Bearer ${authToken}`)
                .send(updateData)
                .expect(200);
                
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("content", "Updated controller test post content");
        });
        
    });
    
    describe("DELETE /feed/:postId", () => {
        let postToDelete: any;
        
        before(async () => {

            postToDelete = await Post.create({
                content: "Post to be deleted",
                userId: testUser._id,
                userName: testUser.name,
                numberOfComments: 0
            });
        });
        
        it("should delete a post when authenticated", async () => {
            const response = await request(app)
                .delete(`/feed/${postToDelete._id}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(201);
                
            expect(response.body).to.have.property("success", true);
            
            const deletedPost = await Post.findById(postToDelete._id);
            expect(deletedPost).to.be.null;
        });
      
      
    });
    
    describe("GET /feed/:postId/comments", () => {
        it("should return comments for a specific post", async () => {
            const response = await request(app)
                .get(`/feed/${testPost._id}/comments`)
                .expect(200);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.be.an("array");
            expect(response.body.data.length).to.be.greaterThan(0);
            expect(response.body.data[0]).to.have.property("userName", testUser.name);
        });

    });
    
    describe("POST /comments", () => {
        it("should create a new comment when authenticated", async () => {
            const commentData = {
                content: "New integration test comment"
            };
            
            const response = await request(app)
                .post(`/feed/${testPost._id}/comments`)
                .set("Authorization", `Bearer ${authToken}`)
                .send(commentData)
                .expect(201);
                
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("content", "New integration test comment");
            expect(response.body.data).to.have.property("userName", testUser.name);
            expect(response.body.data).to.have.property("postId", testPost._id.toString());
        });
    });
    
    describe("PATCH /comments/:commentId", () => {
        it("should update a comment when authenticated", async () => {
            const updateData = {
                content: "Updated controller test comment content"
            };
            
            const response = await request(app)
                .patch(`/feed/comments/${testComment._id}`)
                .set("Authorization", `Bearer ${authToken}`)
                .send(updateData)
                .expect(200);
                
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("content", "Updated controller test comment content");
        });

    });
    
    describe("DELETE /comments/:commentId", () => {

        
    
        it("should delete a comment when authenticated", async () => {
            const response = await request(app)
                .delete(`/feed/comments/${testComment._id}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
                
            expect(response.body).to.have.property("success", true);
            
            // Verify comment was actually deleted
            const deletedComment = await Comment.findById(testComment._id);
            expect(deletedComment).to.be.null;
        });
        
        
    });
});
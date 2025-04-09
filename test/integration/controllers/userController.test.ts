import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import request from "supertest";
import { app } from "../../../src/index"; 
import { Post, User } from "../../../src/model/models";
import { Comment } from "../../../src/model/models";
import { generateToken } from "../../../src/util/jwt";
import feedDataLayer from "../../../src/data/feedDataLayer";


dotenv.config();

describe("User Controller Integration Tests", () => {
    let testUser: any;
    let testPost: any;
    let usersPost: any;
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
        usersPost = await feedDataLayer.createPost("Test controller post content", testUser.id, testUser.name);
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
        await Comment.deleteMany({});
        await mongoose.disconnect();
    });
    
    describe("GET /users?name=`userName`", () => {
        it("should return user data by his name", async () => {
            const response = await request(app)
                .get(`/users?name=${testUser.name}`);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data[0]).to.have.property("name", testUser.name);
            expect(response.body.data).to.have.length.greaterThan(0);
            expect(response.body.data).to.be.an("array");
        });

    });
      describe("GET /users?id=`userId`", () => {
        it("should return user data by his id", async () => {
            const response = await request(app)
                .get(`/users?id=${testUser.id}`);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("name", testUser.name);
        });

    });

    
    describe("GET /users/posts", () => {
        it("should return a list of posts of the user", async () => {

            const response = await request(app)
                .get("/users/posts")
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.be.an("array");
            expect(response.body.data).to.be.lengthOf.greaterThan(0);
            expect(response.body.data[0]).to.have.property("content", "Test controller post content");
        });
    });
      describe("GET /users/comments", () => {
        it("should return a list of comments of the user", async () => {

            const response = await request(app)
                .get("/users/comments")
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);

            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.be.an("array");
            expect(response.body.data).to.be.lengthOf.greaterThan(0);
            expect(response.body.data[0]).to.have.property("content", "Test controller comment content");
            expect(response.body.data[0]).to.have.property("userName", testUser.name);
            
        });
      });
    describe("PUT /users", () => {
        it("should updatae a user name or email", async () => {

            const response = await request(app)
                .put("/users")
                .set("Authorization", `Bearer ${authToken}`)
                .set("Content-Type", "application/json")
                .send({ updateType : "name" , name: "Updated Test Controller User" })
                .expect(200);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.property("name","Updated Test Controller User");
            
        });
    });
    describe("DELETE /users", () => {
        it("should delete the user", async () => {
            const response = await request(app)
                .delete("/users")
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
            expect(response.body).to.have.property("success", true);
            expect(response.body).to.have.property("message", "user deleted successfully.");
        });
    }
    );
    
    
});
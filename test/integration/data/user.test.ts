import { expect } from 'chai';
import userDataLayer from '../../../src/data/userDataLayer';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { Post, User } from '../../../src/model/models';
import feedDataLayer from '../../../src/data/feedDataLayer';
import { NotFoundError } from '../../../src/util/errorHandling';
import { IUser } from '../../../src/DB/userSchema';


describe('User Data Layer',  () => {
    let testUser: any; 
  before(async () => { 
      await mongoose.connect(process.env.DB_uri || '');
      testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
      });
      await  feedDataLayer.createPost('Test post content', testUser._id, testUser.name);
    
  });
 after(async () => {
     // Cleanup and disconnect
     await Post.deleteMany({});
    await User.deleteMany({});
     await mongoose.disconnect();
  });
  describe("Get user by Id", () => {
    it("should return a user when a valid user ID is proviede", async () => {
      const result = await userDataLayer.getUserById(testUser._id, ['name', 'email']);
      expect(result).to.be.an('object');
      expect(result).to.have.property('name', 'Test User');
      expect(result).to.have.property('email', 'test@example.com');
    });
    it('should return only requested fields', async () => {
      const result = await userDataLayer.getUserById(testUser._id.toString(), ['name', 'email']);
      expect(result).to.have.all.keys(['_id','name', 'email']);

    });
    it('should throw NotFoundError for non-existent user', async () => {
      const nonExistentId = testUser._id.toString().replace(/./g, 'a');
      
      try {
        await userDataLayer.getUserById(nonExistentId, []);
        expect.fail('Should have thrown NotFoundError');
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundError);
      }
    });
    
    it('should handle database errors', async () => {
      // Test invalid ID format
      try {
        await userDataLayer.getUserById('invalid-id', []);
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });

  });
  describe("get users by name", () => {
    it("should return list of users with prefix equel to userName", async () => { 
      const users: IUser[] = await userDataLayer.getUserByName(testUser.name, ["name"]); 
      expect(users).to.be.an("array");
      expect(users).to.have.lengthOf.greaterThan(0);
      
    })
  });
    describe("Update user by Id", () => {
        it("should update user name to nameUpdated by the user id", async () => {
            const updatedUser = await userDataLayer.updateUser(testUser.id, { name: "nameUpdated" });
            expect(updatedUser).to.be.an('object');
            expect(updatedUser).to.have.property('name', 'nameUpdated');
        });
        it("should throw NotFoundError for non existent user", async () => {
            const nonExistentId = testUser._id.toString().replace(/./g, 'a');
            try {
                await userDataLayer.updateUser(nonExistentId, { name: "nameUpdated" });
                expect.fail('Should have thrown NotFoundError');
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError);
            }
        });


    });
    describe("Get user Posts", () => { 
        it("user posts must be an array of posts with only requested fields", async () => {
            const result = await userDataLayer.getUserPosts(testUser._id, ['userName', 'content']);
            expect(result).to.be.an('array');
            if (result.length > 0) {
                expect(result[0]).to.have.all.keys(['_id', 'userName', 'content']);
            }
        });
        it("should throw NotFoundError for non-existent user", async () => {
            const nonExistentId = testUser._id.toString().replace(/./g, 'a');
            try {
                await userDataLayer.getUserPosts(nonExistentId, []);
                expect.fail('Should have thrown NotFoundError');
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError);
            }
        });
      
    })
  describe("Get user friends", () => {
            it("user friends must be an array of users with only requested fields", async () => {
                const friends = await userDataLayer.getUserFriends(testUser._id, ['name', 'email']);
                expect(friends).to.be.an('array');
                if (friends.length > 0) {
                    expect(friends[0]).to.have.all.keys(['_id', 'name', 'email']);
                }
            });
            it("should throw NotFoundError for non-existent user", async () => {
            const nonExistentId = testUser._id.toString().replace(/./g, 'a');
            try {
                await userDataLayer.getUserFriends(nonExistentId, []);
                expect.fail('Should have thrown NotFoundError');
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError);
            }
            });
        
        });

});
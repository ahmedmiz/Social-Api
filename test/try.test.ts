// import { expect } from 'chai';
// import userDataLayer from '../src/data/userDataLayer';
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// const DB_uri: string = process.env.DB_uri || '';  
// import { User } from '../src/model/models';
// import { NotFoundError } from '../src/util/errorHandling';


// describe('User Data Layer',  () => {
//   let testUser: any; 
//   before(async () => { 
//       await mongoose.connect(process.env.DB_uri || '');
//       testUser = await User.create({
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'password123'
//     });
//   });
//  after(async () => {
//     // Cleanup and disconnect
//    await User.deleteOne({name: 'Test User'});
//     await mongoose.disconnect();
//   });
//   describe("Get user by Id", () => {
//     it("should return a user when a valid user ID is proviede", async () => {
//       const result = await userDataLayer.getUserById(testUser._id, ['name', 'email']);
//       expect(result).to.be.an('object');
//       expect(result).to.have.property('name', 'Test User');
//       expect(result).to.have.property('email', 'test@example.com');
//     });
//     it('should return only requested fields', async () => {
//       const result = await userDataLayer.getUserById(testUser._id.toString(), ['name', 'email']);
//       expect(result).to.have.all.keys(['_id','name', 'email']);

//     });
//     it('should throw NotFoundError for non-existent user', async () => {
//       const nonExistentId = testUser._id.toString().replace(/./g, 'a');
      
//       try {
//         await userDataLayer.getUserById(nonExistentId, []);
//         expect.fail('Should have thrown NotFoundError');
//       } catch (error) {
//         expect(error).to.be.instanceOf(NotFoundError);
//       }
//     });
    
//     it('should handle database errors', async () => {
//       // Test invalid ID format
//       try {
//         await userDataLayer.getUserById('invalid-id', []);
//         expect.fail('Should have thrown error');
//       } catch (error) {
//         expect(error).to.be.instanceOf(Error);
//       }
//     });

//   });

// });
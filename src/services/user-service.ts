import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userRepository from '../repository/user-repository';

// Define types for the signup and signin methods
interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SigninData {
  email: string;
  password: string;
}

const SALT_ROUNDS = 10; // You can adjust the number of salt rounds for bcrypt

const userServices = {
  async signup(data: SignupData) {
    try {
      console.log('Entered');
      const isExists = await this.getUserByEmail(data.email);

      if (!isExists) {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Create a new user with the hashed password
        const newUser = await userRepository.create({
          ...data,
          password: hashedPassword,
        });

        console.log(`User signed up with email: ${data.email}`);
        return { message: 'User signed up successfully' };
      } else {
        throw {
          message: 'User already exists',
        };
      }
    } catch (error: any) {
      throw error;
    }
  },

  async signin(data: SigninData) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw { message: 'No user found' };
      }

      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw { message: 'Wrong password' };
      }

      const token = jwt.sign({
        email: user.email,
        name: user.name
    }, 'Revanth');

      return token;
    } catch (error) {
      throw error;
    }
  },

  // Helper function to get user by email
  async getUserByEmail(email: string) {
    try {
      return await userRepository.findBy({ email });
    } catch (error) {
      throw error;
    }
  },
};

export default userServices;

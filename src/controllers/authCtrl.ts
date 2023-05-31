import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/nosql/mongoDB_user';
import sqlUser from '../models/sql/postgres_user'
import dotenv from 'dotenv';
dotenv.config();

const authCtrl ={
    register: async(req: Request, res: Response) => {
        try {
            const { userName, password } = req.body;

            // Check if the user already exists in MongoDB
            let user = await User.findOne({ userName });
            if (user) return res.status(400).json({ message: 'UserName already exists in MongoDB.' });

            await sqlUser.sync();
            // Check if the user already exists in PostgreSQL
            let sqluser = await sqlUser.findOne({ 
                where: { userName: userName },
             });
            if (sqluser) return res.status(400).json({ message: 'UserName already exists in PostgreSQL.' });
            
            // // Create a new user
            user = new User({
                userName,
                password
            });
            sqluser = new sqlUser({ 
                userName, 
                password 
            });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            sqluser.password = await bcrypt.hash(password, salt);
            
            await user.save(); // Save the user to the mongoDB
            await sqluser.save(); // Save the user to PostgreSQL
            res.status(201).json({ message: 'User registered' });            
        } catch (error: any) {
            console.error(error.message);
            res.status(500).json({ message: 'Server error' });
        }
    },

    login: async(req: Request, res: Response) => {
        try {
            const { userName, password } = req.body

            const user = await User.findOne({userName})
            if(!user) return res.status(400).json({msg: 'This userName does not exits.'})

            // if user exists, compare the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

            // Generate and sign the JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: '1m', // Token expiration time (adjust as needed)
            });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7*24*60*60*1000 // 7 days
            })
            res.status(200).json({ token, msg: 'Login is successful' });
            } catch (err: any) {
                    return res.status(500).json({msg: err.message})
                }  
            },

    logout: async(req: Request, res: Response) => {
        try {
            res.clearCookie('token');
            res.status(200).json({ msg: 'Logout is successful.' });
          } catch (err: any) {
            console.error(err);
            res.status(500).json({ msg: 'Server error' });
          }
    },
    upload: async(req: Request, res: Response) => {
        if (req.file) {
            console.log(req.file.path)
            res.status(201).json({ message: `Upload Successful!` });
        } else {
            res.status(400).json({ message: 'Image not found' });
        }
    },
    posts: async(req: Request, res: Response) => {
        try {
            fs.readdir('./src/images', function (err, imageFiles) {
                console.log(imageFiles);
                if (err) {
                    res.status(500).json({ message: 'Failed to read images directory' });
                } else {
                    const images = imageFiles.map((fileName) => ({
                        imageUrl: `http://localhost:3000/images/${fileName}`, // Assuming the images are served from the '/images' route
                      }));
                    res.status(201).json({ images });
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Fetching images failed' });
        }
    }
}

export default authCtrl;
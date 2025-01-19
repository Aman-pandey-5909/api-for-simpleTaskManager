
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./helpers/dbConn.js";
import Useracc from "./models/UserAcc.js";

const app = express();
const origins = "*"
app.use(cors( {
    origin: origins
}));
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new Useracc({ username, email, password });
        await user.save(); 
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {  
        console.error("Unexpected error in signup:", error.name );  
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: messages });
        }
        if (error.code === 11000 || error.name === 'MongooseError') {
            // console.error("Full Mongoose error:", error);  // Log the entire error object
            // // Try logging other potential properties of the error
            // console.error("Error details:", error.message, error.code, error.errmsg, error.keyValue, error.errorResponse);
           
            if (error.keyValue) {
                const duplicateField = Object.keys(error.keyValue)[0];
                return res.status(400).json({ errors: `${duplicateField} already exists` });
            }
            else if (error.keyPattern) {
                const duplicateField = Object.keys(error.keyPattern)[0];
                return res.status(400).json({ errors: `${duplicateField} already exists` });
            } else {
                return res.status(400).json({ errors: error.message });
            }
        }
        console.error("Unexpected error in signup:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

startServer().catch((err) => {
    console.error('Error starting server:', err);
});

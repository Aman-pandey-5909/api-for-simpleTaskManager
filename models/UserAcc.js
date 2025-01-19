import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"]
    },
    pfp: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        match: [
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/,
            "Password must contain at least one letter, one number, and one special character"
        ]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    accBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Useracc = mongoose.models.Useracc || mongoose.model("Useracc", userSchema);

export default Useracc
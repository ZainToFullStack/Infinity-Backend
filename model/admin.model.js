    import bcrypt from "bcrypt"
    import mongoose from "mongoose"

    const adminSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        },
        password: {
            required: true,
            type: String,
        },
        role: {
            type: String,
            default: "admin"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }, { timestamps: true })

    adminSchema.pre("save", async function(next) {
        if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    })
    const Admin = mongoose.model("admins", adminSchema)
    export default Admin
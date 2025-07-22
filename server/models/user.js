import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        _id:{type: String, required: ture},
        name:{type: String, required: true},
        email:{type: String, required:ture},
        imageUrl:{type: String, required:true},
        enrolledCourses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'
            }
        ],
    },{timestamps: true});

    const User = mongoose.model('User',userSchema);

    export default User
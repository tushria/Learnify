import mongoose from 'mongoose'


//connect to the MongoDB database

const connetDB =async()=>{
    mongoose.connection.on('connected',()=>console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connetDB
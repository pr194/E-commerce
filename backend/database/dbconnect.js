import mongoose from "mongoose";

const ConnectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(url)
        console.log('Database is connected....')

    } catch (error) {
        console.log('something happened database not connected')
    }

}
export default ConnectDB
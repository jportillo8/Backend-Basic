import mongoose from "mongoose";

const dbConnection = async () => {

    try {
        // Conectamos a la base de datos
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })
        console.log('Base de datos online');

        
    } catch (error) {
        console.log(error.message);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }
}


export { dbConnection };
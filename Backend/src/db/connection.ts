import { connect,disconnect } from "mongoose";

async function connectToDatabase(): Promise<void> {
  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  try {
    await connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    throw new Error("Cannot connect to MongoDB");
  }
}

async function disconnectFromDatabase(): Promise<void>{
    try {
        await disconnect()
        
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

export {connectToDatabase, disconnectFromDatabase};

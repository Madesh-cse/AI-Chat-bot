import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000

app.get("/", (_, res) => {
  res.send("TS backend running");
});

connectToDatabase()
.then(()=>{
    app.listen(PORT, ()=> console.log("Server started on 5000"))
})
.catch((error)=>{
    console.log(error)
})



//mongodb+srv://madesh10cse_db_user:PjKC3qMkCp74tf07@cluster0.dnko5in.mongodb.net/
//https://platform.openai.com/apps
//https://platform.openai.com/api-keys
//https://platform.openai.com/settings/organization/general
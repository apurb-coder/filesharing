// want to import like this?: package.json me write "type":"module"
import express from 'express'; 
import router from './routes/routes.js'; // for backend wala routing importing route.js
import cors from 'cors';//to handle cors related error
import { Connection} from './database/db.js';
import dotenv from "dotenv";

dotenv.config();

const app=express();
app.use(cors())//write it before backend routing
app.use('/',router);//use route.js to handle endpoints that starts with '/'
const PORT= process.env.PORT || 8000;

//below function connecting to database
//we mention this just before app.listen()
const user=process.env.DB_USER;
const password=process.env.DB_PASSWORD
Connection(user,password);

app.listen(PORT,()=>{
    console.log(`server is running on PORT-${PORT}`)
})
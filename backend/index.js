import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import { dirname,resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname( fileURLToPath(import.meta.url));
const parentDirectory = resolve(__dirname, '..');

const app = express();
const port = 3000;
const {Pool} = pkg;

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'finance',
    password: 'Vasu@2003',
    port: 5432, // default PostgreSQL port
  });  

pool.connect();
pool.query('SELECT * FROM user_data',(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    pool.end();
});

app.use(express.static(parentDirectory+'/frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.sendFile(parentDirectory + "/frontend/index.html");
})

app.get('/signin.html',(req,res)=>{
    res.sendFile(parentDirectory + "/frontend/signin.html");
})

app.post('/login',async(req,res)=>{
   
    let {le,lp} = req.body;
    console.log({le,lp});
    
    try{
        const res = await pool.query('SELECT * FROM user_data WHERE email=$1 AND password=$2',[le,lp]);
        const user = res.rows[0];
        if(!user){
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful' });

    }catch (error) {
        console.error('Error executing login query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
   
   
});

app.post('/register',(req,res)=>{
    const {ru,re,rp} = req.body;
    });
    

app.listen(port,()=>{
    console.log("I am listening on port "+port);
})
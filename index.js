const express = require('express');
require('dotenv').config();
const app = express();
const jwt =require('jsonwebtoken');
const cors=require('cors');
const port=process.env.PORT || 5000;

const ObjectId=require('mongodb').ObjectId;
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://doctors_portal:rao8sNAv4ER4ajI4@cluster0.4s4lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run(){
  try{
   await client.connect();
   const userCollection = client.db("doctors").collection("fakeuser");
  


   app.post('/fakeuser',async(req,res) =>{
    const newDoctor =req.body;
    const result = await userCollection.insertOne(newDoctor);
   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send(result);

  });

  app.get('/fakeuser',async(req,res) => {
    const query= {} ;
    const cursor= userCollection.find(query);
    const users=await cursor.toArray();
    res.send(users)
  })


  app.delete('/fakeuser/:id', async(req,res) =>{
    const id=req.params.id;
    const query={_id:ObjectId(id)};
    const result= await userCollection.deleteOne(query);
    res.send(result);
  });


  }
  finally{
   //  awite client .close();
  }
}
run().catch(console.dir);





app.get('/',(req,res) =>{
  res.send('Node runing!!')
})

app.listen(port,() =>{
  console.log('fakedata is runing!!',port)
})
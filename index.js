const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 4000


//nazmul
//rWugJwnIFSSzlxEy



const uri = "mongodb+srv://nazmul:rWugJwnIFSSzlxEy@cluster0.94ypj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    const collection = client.db("notesTaker").collection("notes");


    console.log('connected to db');
  }
  finally{

  }
}


run().catch(console.dir);






// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   // client.close();
//   console.log('connectede');
// });





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
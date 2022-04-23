const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 4000;
const cors = require('cors');

//nazmul
//rWugJwnIFSSzlxEy

app.use(express.json());
app.use(cors());

const uri =
  'mongodb+srv://nazmul:rWugJwnIFSSzlxEy@cluster0.94ypj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const notesCollection = client.db('notesTaker').collection('notes');


  
    // get api to read all notes / read
    // http://localhost:4000/notes
    app.get('/notes', async (req, res) => {
      const q = req.query;
      const cursor = notesCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // create notesTaker
    //http://localhost:4000/note
    app.post('/note', async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await notesCollection.insertOne(data);
      res.send(result);
    });

    

    // update notesTaker
    // http://localhost:4000/note/6264389e6101999b585d38a2
    app.put('/note/:id', async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log(data);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          userName: data.userName,
          textData: data.textData,
        },
      };
      const result = await notesCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    });

    // Delete notesTaker//
    // http://localhost:4000/note/6264389e6101999b585d38a2
    app.delete('/note/:id', async(req, res) => {
      const id = req.params.id
      const filter = { _id: ObjectId(id) }
      const result = await notesCollection.deleteOne(filter)
      res.send(result)
    })




    console.log('connected to db');
  } finally {
    ////////////----------//////////
  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

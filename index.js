const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfz3k0z.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const cardCollection = client.db("carddb").collection('card');
    const productCollection = client.db("carddb").collection('products')
    const samsungCollection = client.db("carddb").collection('samsungData')
    const appleCollection = client.db("carddb").collection('appleData')
    const sonyCollection = client.db("carddb").collection('sonyData')
    const huaweiCollection = client.db("carddb").collection('huaweiData')
    const googleCollection = client.db("carddb").collection('googleData')
    const xiomiCollection = client.db("carddb").collection('xiomiData')
    const wishCollection = client.db("carddb").collection('wishList')


    app.get('/wishList' , async(req, res) => {
        const cursor = wishCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/categorydata' , async(req, res) => {
        const cursor = categoryCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    app.get('/samsungData' , async(req, res) => {
        const cursor = samsungCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/appleData' , async(req, res) => {
        const cursor = appleCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/sonyData' , async(req, res) => {
        const cursor = sonyCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/huaweiData' , async(req, res) => {
        const cursor = huaweiCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/googleData' , async(req, res) => {
        const cursor = googleCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/xiomiData' , async(req, res) => {
        const cursor = xiomiCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    app.get('/card', async(req, res) => {
        const cursor = cardCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    app.post('/wishList' , async(req, res) => {
        const newData = req.body;
        console.log(newData);
        const result = await wishCollection.insertOne(newData);
        res.send(result);
    })

    app.post('/card' , async(req, res) => {
        const newData = req.body;
        console.log(newData);
        const result = await cardCollection.insertOne(newData);
        res.send(result);
    })


    app.post('/samsungData' , async(req, res) => {
        const products = req.body;
        console.log(products);
        const result = await samsungCollection.insertOne(products);
        res.send(result);
    })

    app.post('/sonyData' , async(req, res) => {
        const products = req.body;
        console.log(products);
        const result = await sonyCollection.insertOne(products);
        res.send(result);
    })
    
    app.post('/appleData' , async(req, res) => {
        const products = req.body;
        console.log(products);
        const result = await appleCollection.insertOne(products);
        res.send(result);
    })


    

    app.post('/googleData' , async(req, res) => {
        const products = req.body;
        console.log(products);
        const result = await googleCollection.insertOne(products);
        res.send(result);
    })





    app.delete('/wishList/:id' , async(req, res) => {
        const id = req.params.id;
        const query = { _id : new ObjectId(id)};
        const result = await wishCollection.deleteOne(query)
        res.send(result);
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Running")
})

app.listen(port, () => {
    console.log(`Server is running ${port}`);
})
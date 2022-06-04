const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// username: marazzo
// pass:uXLtEdmSAKTKrHB9

const uri =
  "mongodb+srv://marazzo:uXLtEdmSAKTKrHB9@cluster0.hty68.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("connection success");

    const database = client.db("marazzo");
    const productsCollection = database.collection("products");


    // get all products api
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    //get api one Product by id
    app.get("/product/:id", async (req, res) => {
      const id = parseInt(req.params.id);
      const query = { id: id };
      const result = await productsCollection.findOne(query);

      res.send(result);
    });

    // add product 
    app.post("/addProduct", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });


    //get product by category
    app.get("/products/category/:category", async (req, res) => {
      const category = req.params.category;
      const query = { category: category };
      const result = await productsCollection.find(query).toArray();

      res.send(result);
    });










  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("marazzo api");
});

app.listen(port, () => {
  console.log("Listening port: ", port);
});

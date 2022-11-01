const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// middlewer
app.use(cors());

// user paite hole aita uase korte hobe
app.use(express.json());

/* Mongo db theke server site a data load and server site theke data client site a pathabo */
// user name : dbUser3
// user password : ZPe8vCNhEtMOmOLn

const uri =
  "mongodb+srv://dbUser3:ZPe8vCNhEtMOmOLn@cluster0.5xecsyp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");

    // Data mongodb the server site a load (Get : Read C)
    // http://localhost:5000/users
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // create a document to insert
    // Client site theke server theke mongodb the load (POST : Create R)
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // delete document
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
      // console.log("Try to delete", id);
    });
  } finally {
    // await client.close();
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello from node mongodb crud server");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});

import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

async function addTodo(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("mydb");
  const messageColl = db.collection("message");

  let inputDoc = {
    message: req.query.task ,
    description: req.query.description
  };
  await messageColl.insertOne(inputDoc);

  await client.close();


  res.json({ opr: "success" });
}

async function findAllMessage(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("mydb");
  const messageColl = db.collection("message");

  let list = await messageColl.find().toArray();

  await client.close();
  res.json(list);
}


app.get("/findAll", findAllMessage);

app.get("/addTodo", addTodo);



















app.listen(4000);

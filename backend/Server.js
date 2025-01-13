import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express(); 
app.use(cors());       

const PORT = 3000;
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';

async function startServer() {
    try {
        await client.connect(); // Wait for MongoDB connection
        console.log('Connected to MongoDB');

        // Get passwords
        app.get('/', async (req, res) => {
            const db = client.db(dbName);
            const collection = db.collection('passwords');
            const findResult = await collection.find({}).toArray();
            res.json(findResult);
        });

        // Insert password
        app.post('/', async (req, res) => {
            const password = req.body;
            const db = client.db(dbName);
            const collection = db.collection('passwords');
            const findResult = await collection.insertOne(password);
            res.send({ success: true, result: findResult });
        });

        // Delete password
        app.delete('/', async (req, res) => {
            const password = req.body;
            const db = client.db(dbName);
            const collection = db.collection('passwords');
            const findResult = await collection.deleteOne(password);
            res.send({ success: true, result: findResult });
        });

        // Start server
        app.listen(PORT, () => {
            console.log(`Server listening on Port ${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

startServer();

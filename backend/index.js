const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const uuid = require('uuid');


const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const dynamoDB = DynamoDBDocument.from(new DynamoDB());

app.get("/link", async (req, res) => {
    /* 
        Obtiene los datos a través de un id 

        Author
        ------
            - MauroloonDev

        Date
        ----
        2024.02.15
    */
    try {
    const id = 0;
    const params = {
        TableName: "links",
        Key: {
            id: id,
        },
    };

    const result = await dynamoDB.get(params);

    res.json(result);
    } catch (error) {
    console.error("Error al obtener datos de DynamoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.get("/links", async (req, res) => {
    /* 
        Obtiene todos los links registrados.

        Author
        ------
            - MauroloonDev

        Date
        ----
        2024.02.15
    */
    try {
    const params = {
        TableName: "links",
    };

    const result = await dynamoDB.scan(params);

    res.json(result);
    } catch (error) {
        console.error("Error al obtener datos de DynamoDB:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/link", async (req, res) => {
    /* 
        Registra un nuevo link

        Author
        ------
            - MauroloonDev

        Date
        ----
        2024.02.15
    */
    try {
    const { idLink, title, description, thumbnails, duration } = req.body;
    const params = {
        TableName: "links",
        Item: {
            id: uuid.v1(),
            idLink,
            title,
            description,
            thumbnails,
            duration
        },
    };

    const result = await dynamoDB.put(params);

    res.json(result);
    } catch (error) {
        console.error("Error al insertar en DynamoDB:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.delete('/link/:id', async (req, res) => {
    /* 
        Elimina un link

        Author
        ------
            - MauroloonDev

        Date
        ----
        2024.02.15
    */
    const {id} = req.params;
    try {
        const params = {
            TableName: "links",
            Key: {
                id: id,
            },
        };

        const result = await dynamoDB.delete(params);

        res.json(result);
    } catch (error) {
        console.error('Error al eliminar en DynamoDB:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`);
//});

module.exports.handler = serverless(app);

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

app.get("/api", (req, res) => {
    res.send("hello world!");
});


app.get("/link", async (req, res) => {
    try {
    const id = 0;
    // Parámetros de consulta para DynamoDB filtrando por ID
    const params = {
        TableName: "links",
        Key: {
            id: id, // Reemplaza 'tuClavePrimaria' con el nombre de tu clave primaria en la tabla
        },
    };

    // Realiza la consulta a DynamoDB
    const result = await dynamoDB.get(params);

    // Envía los resultados como respuesta
    res.json(result);
    } catch (error) {
    console.error("Error al obtener datos de DynamoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.get("/links", async (req, res) => {
    try {
    const id = 0;
    // Parámetros de consulta para DynamoDB filtrando por ID
    const params = {
        TableName: "links",
    };

    // Realiza la consulta a DynamoDB
    const result = await dynamoDB.scan(params);

    // Envía los resultados como respuesta
    res.json(result);
    } catch (error) {
        console.error("Error al obtener datos de DynamoDB:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/link", async (req, res) => {
    try {
    // Extrae la información del cuerpo de la solicitud
    const { idLink, title, description, thumbnails } = req.body;

    // Parámetros de inserción para DynamoDB
    const params = {
        TableName: "links",
        Item: {
            id: uuid.v1(),
            idLink,
            title,
            description,
            thumbnails
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

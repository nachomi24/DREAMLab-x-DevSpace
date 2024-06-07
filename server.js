// server.js
const express = require('express');
const multer = require('multer');
const mysql = require('mysql'); // O cualquier otra base de datos SQL que uses

const app = express();
const port = 3000;

// Configura Multer para almacenar los archivos en la memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mi_base_de_datos',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Endpoint para subir la imagen y actualizar la base de datos
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fotoBuffer = req.file.buffer; // El archivo en formato BLOB
    const matricula = req.body.matricula;

    // Actualiza la BLOB de la foto en la base de datos
    const query = "UPDATE estudiante SET Foto = ? WHERE Matricula = ?";
    db.query(query, [fotoBuffer, matricula], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: 'Foto actualizada exitosamente' });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

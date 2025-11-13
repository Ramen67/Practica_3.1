import express from "express";
import cors from "cors";
import connection from "./db.js";
const app = express();
app.use(cors());
app.use(express.json());

// Crear  alumno (POST)

app.post("/api/alumnos", (req, res) => {
    const { nombre, edad, curso } = req.body;
    const sql  = "INSERT INTO alumnos (nombre, edad,curso) VALUES (?, ?, ?)";
    connection.query(sql, [nombre, edad, curso],(err,result)=>{
        if(err) return res.status(500).json({error:err});
        res.json({mensaje : "Alumno agregado correctamente", id: result.insertId});    
    });
});

//Lista de Alumnos (GET)

app.get("/api/alumnos", (req, res) => {
    connection.query("SELECT * FROM alumnos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

//Configutar ruta frontend
app.use(express.static("public"));

//puerto del servidor
const PORT = 3000;
app.listen(PORT, () => console.log('servidor corriendo en http://localhost:' + PORT));
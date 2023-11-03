const express = require("express");
const app = express();
const cors = require("cors");
const noteController = require("./controller/noteController");


//middleware
app.use(cors());
app.use(express.json())

app.post("/notes", noteController.createNote);

app.get("/notes", noteController.getAllNotes);

app.get("/notes/:id", noteController.getOneNote);

app.put("/notes/:id", noteController.updateOneNote);

app.delete("/notes/:id", noteController.deleteOneNote);

app.listen(1000, () => {
    console.log("server has started on port 1000");
});
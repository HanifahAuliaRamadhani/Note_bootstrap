const pool = require("../db")

exports.createNote = async(req, res) => {
    try{
        const { title, description } = req.body;
        const newNote = await pool.query("INSERT INTO cttn (title, description) VALUES($1,$2) RETURNING *", [title, description])
        res.status(201).json({
            message: "success",
            data: newNote.rows[0]
        });   
    } catch (err) {
        console.error(err.message)
    }
    
}

//Get all Notes
exports.getAllNotes = async(req,res) => {
    try {
        const allNotes =  await pool.query("SELECT * FROM cttn");
        res.json(allNotes.rows);
        
    } catch (err) {
        console.error(err.message)
    }
}

//Get One note
exports.getOneNote = async(req,res) => {
    try {
        const { id } = req.params;
        const oneNote =  await pool.query("SELECT * FROM cttn WHERE id = $1", [id]);
        res.json(oneNote.rows[0]);
        
    } catch (err) {
        console.error(err.message)
    }
}

//Update a note
exports.updateOneNote = async(req, res) => {
    try {

        const {id} = req.params;
        const { title, description} = req.body

        const updatedNote = await pool.query("UPDATE cttn SET title = $1, description = $2 WHERE id= $3 RETURNING *", [title, description, id])
        
        res.json("Note has been updated")
    } catch (err) {
        console.error(err.message)
        
    }
};

//delete a note
exports.deleteOneNote = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query("DELETE FROM cttn WHERE id = $1", [id]);
        res.json("Note has been deleted");
    } catch (err) {
        console.error(err.message)
        
    }
}
const { Router } = require("express");

const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const { isAuthenticated } =require('../helpers/auth')

//? Crear nueva nota
router.get("/notes/add",isAuthenticated, renderNoteForm);

router.post("/notes/add",isAuthenticated, createNewNote);

//? obtener todas las notas
router.get("/notes",isAuthenticated, renderNotes);

//?Editar notas
router.get("/notes/edit/:id",isAuthenticated, renderEditForm);

router.put("/notes/edit/:id",isAuthenticated, updateNote);

//?eliminar nota
router.delete("/notes/delete/:id",isAuthenticated, deleteNote);

module.exports = router;

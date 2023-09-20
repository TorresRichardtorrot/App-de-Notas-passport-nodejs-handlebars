import { Router } from "express";
const router = Router();

import {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

import { isAuthenticated } from '../helpers/auth.js';


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

export default router;

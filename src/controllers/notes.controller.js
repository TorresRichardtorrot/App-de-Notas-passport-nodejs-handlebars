const notesCtrl = {};

const Note = require("../models/note");

//form para crear una nota
notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

//crear nota
notesCtrl.createNewNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if ((title, description)) {
      const newNote = new Note({ title, description });
      newNote.user = req.user._id;
      await newNote.save();

      req.flash("success_msg", "Note added Successfully");
      res.redirect("/notes");
    } else {
      req.flash("error_msg", "los campos no pueden estar vacios");
      res.redirect("/notes");
    }
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "error");
    res.redirect("/notes");
  }
};

//mostrar notas
notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id })
    .sort({ createdAt: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

//editar nota
notesCtrl.renderEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).lean();
    if (note.user != req.user._id) {
      req.flash("error_msg", "No valida");
      return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note });
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "error");
  }
};

//actualizar nota
notesCtrl.updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/notes");
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "error");
  }
};

//eliminar nota
notesCtrl.deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    await Note.findByIdAndDelete(id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect("/notes");
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "error");
  }
};

module.exports = notesCtrl;

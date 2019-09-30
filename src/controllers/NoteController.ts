import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { Note } from '../entity/Note';

class NoteController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    //Get users from database
    const noteRepository = getRepository(Note);
    try {
      const notes = await noteRepository.find();
      //Send the users object
      res.send(notes);
      return;
    } catch (e) {
      res.status(404).send('notes not found');
      return;
    }
  };

  static getOneById = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    //Get the user from database
    const noteRepository = getRepository(Note);
    try {
      const note = await noteRepository.findOneOrFail(id);
      res.send({ note: note });
    } catch (error) {
      res.status(404).send(`Note ${id} not found because ${error}`);
      return;
    }
  };

  static newNote = async (req: Request, res: Response): Promise<void> => {
    //Get parameters from the body
    const { title, text, user } = req.body;
    let note!: Note;
    const userRepository = getRepository(User);
    try {
      const noteUser: User | undefined = await userRepository.findOne(user);
      note = new Note({ title, text, user: noteUser });
    } catch (e) {
      res.status(400).send('invalid user');
      return;
    }

    //Validate if the parameters are ok
    const errors = await validate(note);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the name is already in use
    const noteRepository = getRepository(Note);
    try {
      await noteRepository.save(note);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(201).send('Note created');
  };

  static editNote = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { title, text, user } = req.body;
    let noteUser: User | undefined;

    //Try to find user on database
    const userRepository = getRepository(User);
    try {
      noteUser = await userRepository.findOne(user);
    } catch (e) {
      res.status(400).send('invalid user');
      return;
    }
    //Try to find note on database
    const noteRepository = getRepository(Note);
    let note;

    try {
      note = await noteRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('Note to edit not found');
      return;
    }

    //Validate the new values on model
    note.title = title;
    note.text = text;
    note.user = noteUser;
    const errors = await validate(note);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means name already in use
    try {
      await noteRepository.save(note);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteNote = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    const noteRepository = getRepository(Note);
    let note!: Note;
    try {
      note = await noteRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User to delete not found');
      return;
    }
    await noteRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send(note);
  };
}

export default NoteController;

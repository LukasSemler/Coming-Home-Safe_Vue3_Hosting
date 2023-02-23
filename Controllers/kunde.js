import {
  checkIfUserExists,
  registerUserDB,
  loginUser,
  changePasswordDB,
  sendPositionDB,
  patchUserDB,
  deleteUserDB,
  getAllUsers,
  changeRoleDB,
} from '../Models/models.js';
import validator from 'is-my-json-valid';
import postmark from 'postmark';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
const hashSalt = 5;
dotenv.config();

const dirname = path.resolve();

const emailClient = new postmark.ServerClient(process.env.postmarkToken);

const validateUser = validator({
  required: true,
  type: 'object',
  properties: {
    vorname: {
      required: true,
      type: 'string',
    },
    nachname: {
      required: true,
      type: 'string',
    },
    email: {
      required: true,
      type: 'string',
    },
    passwort: {
      required: true,
      type: 'string',
    },
    strasse: {
      required: true,
      type: 'string',
    },
    plz: {
      required: true,
      type: 'string',
    },
    ort: {
      required: true,
      type: 'string',
    },
    hobbysinteressen: {
      require: true,
      type: 'string',
    },
    geburtsdatum: {
      require: true,
      type: 'string',
    },
  },
});

//Generiert einen Code (Passwort vergessen + Auth-Code)
let makeAuthCode = (length) => {
  let code = '';
  let auswahl = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  //Auth-Code generieren wenn Kunde noch nicht vorhanden
  for (let index = 0; index < length; index++) {
    let rand = Math.round(Math.random() * (auswahl.length - 1));
    code += auswahl[rand];
  }
  return code;
};

//Authcode senden für Mitarbeiter & Registrierung
const sendCodeUser = async (req, res) => {
  console.log('Route wurde aufgerufen');
  const { email, vorname, nachname } = req.body;

  //Schauen ob der User schon in der DB vorhanden ist
  const vorhanden = await checkIfUserExists(email);
  // console.log('Vorhanden: ', vorhanden);

  // Wenn der User schon vorhanden ist 400 zurückschicken
  if (vorhanden) return res.status(400).send('Der User ist bereits vorhanden');
  // console.log('Vorhanden', vorhanden);

  // Code generieren
  const code = makeAuthCode(6);

  //Code an den User schicken
  emailClient.sendEmailWithTemplate({
    From: 'office@cominghomesafe.at',
    To: email,
    TemplateAlias: 'factor',
    TemplateModel: {
      name: vorname + ' ' + nachname,
      code: code,
      company_name: 'Coming Home Safe',
      company_address: 'Thaliastraße 125',
    },
  });

  res.status(200).send(code);
};

const register = async (req, res) => {
  console.log(req.body);
  const encrptedPW = bcrypt.hashSync(req.body.password, hashSalt);
  const result = await registerUserDB(req.body, encrptedPW);

  if (result) return res.status(200).send('Erfolgreich registriert');

  return res.status(500).send('Fehler beim Registrieren');
};

//Wenn sich User anmelden will
const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);

  const result = await loginUser(email, password);
  // console.log('result: ', result);

  //Schauen ob der User ein Admin ist, wenn ja Mail schicken, sonst normal anmelden
  if (result) {
    if (result.isadmin) {
      const code = makeAuthCode(6);

      //Code an User schicken
      emailClient.sendEmailWithTemplate({
        From: 'office@cominghomesafe.at',
        To: email,
        TemplateAlias: 'factorMit',
        TemplateModel: {
          name: result.vorname + ' ' + result.nachname,
          code: code,
          company_name: 'Coming Home Safe',
          company_address: 'Thaliastraße 125',
        },
      });
      return res.status(200).send(JSON.stringify({ foundUser: result, code: code }));
    } else if (!result.isAdmin)
      return res.status(200).send(JSON.stringify({ foundUser: result, code: 'kein Admin' }));
  }

  return res.status(500).send('Fehler beim Login');
};

//Position in DB speichern
const sendPosition = async (req, res) => {
  //Standortdaten
  const positionData = req.body;

  const result = await sendPositionDB(positionData);

  if (result) return res.status(200).send('Position successfully sent');

  res.status(500).send('Error when sending position');
};

//Wenn User sein Passwort vergessen hat
const sendNewPassword = async (req, res) => {
  //Daten holen
  const { email } = req.body;

  //Neues Passwort generieren
  const newPw = makeAuthCode(11);

  //Neues Passwort in DB schreiben
  const result = await changePasswordDB(email, newPw);

  if (result) {
    //Email an User senden + Serverfeedback zurückgeben
    emailClient.sendEmailWithTemplate({
      From: 'office@cominghomesafe.at',
      To: email,
      TemplateAlias: 'newPW',
      TemplateModel: {
        company_name: 'Coming-Home-Safe',
        company_address: 'Thaliastraße 125',
        password: newPw,
      },
    });

    res.status(200).send(newPw);
  } else {
    //ServerFeedback und Email an den User schicken
    res.status(210).send('Fehler beim Erstellen des neuen Passwortes');
  }
};

const patchUser = async (req, res) => {
  const { id } = req.params;

  const result = await patchUserDB(id, req.body);

  if (result) return res.status(200).json(result);

  return res.status(500).send('Fehler beim Ändern des User');
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  await deleteUserDB(id);

  return res.status(200).send('Account erfolgreich gelöscht');
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const result = await changePasswordDB(id, password);

  if (result) return res.status(200).json(result);

  return res.status(500).send('Fehler');
};

const getMitarbeiter = async (req, res) => {
  const result = await getAllUsers();

  if (result) return res.status(200).json(result);

  return res.status(500).send('Fehler beim Holen von den Usern');
};

const changeRole = async (req, res) => {
  const { isadmin } = req.body;
  const { id } = req.params;
  // console.log(isadmin);

  const erg = await changeRoleDB(isadmin, id);

  if (erg) return res.status(200).json(erg);

  return res.status(500).send('Fehler beim Status ändern');
};

export {
  sendCodeUser,
  register,
  login,
  sendPosition,
  sendNewPassword,
  patchUser,
  deleteAccount,
  changePassword,
  getMitarbeiter,
  changeRole,
};

import { query, pool } from '../DB/index.js';
import bcrypt from 'bcrypt';

const checkIfUserExists = async (id) => {
  const { rows } = await query('SELECT * FROM kunde WHERE email = $1', [id]);

  if (rows[0]) return true;
  return false;
};

const registerUserDB = async (user, encrptedPW) => {
  const client = await pool.connect();

  console.log(user);
  console.log(encrptedPW);

  try {
    await client.query('BEGIN');
    let rowsFull;

    if (user.usericon) {
      const { rows } = await client.query(
        `insert into kunde (vorname, nachname, email, passwort, strasse, ort, plz, hobbysinteressen, geburtsdatum, isadmin,
                   suser, usericon)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *;`,
        [
          user.vorname,
          user.nachname,
          user.email,
          encrptedPW,
          user.strasse_hnr,
          user.stadt,
          user.plz,
          'Noch einbauen',
          '2004-12-01',
          false,
          false,
          user.usericon,
        ],
      );

      rowsFull = rows;
    } else {
      const { rows } = await client.query(
        `insert into kunde (vorname, nachname, email, passwort, strasse, ort, plz, hobbysinteressen, geburtsdatum, isadmin,
                   suser)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *;`,
        [
          user.vorname,
          user.nachname,
          user.email,
          encrptedPW,
          user.strasse_hnr,
          user.stadt,
          user.plz,
          'Noch einbauen',
          '2004-12-01',
          false,
          false,
        ],
      );

      rowsFull = rows;
    }

    await client.query(
      'INSERT INTO coordinates (lat, lng, uhrzeit, fk_kunde) values ($1, $2, $3, $4)',
      [null, null, null, rowsFull[0].k_id],
    );

    await client.query('COMMIT');

    return rowsFull;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Fehler beim Registrieren');
    throw error;
  } finally {
    client.release();
  }
};

const loginUser = async (email, password) => {
  console.log('email: ' + email);
  console.log('password: ' + password);
  const { rows } = await query('SELECT * FROM kunde WHERE email = $1', [email]);

  if (bcrypt.compareSync(password, rows[0].passwort)) return rows[0];

  return false;
};

const changePasswordDB = async (id, password) => {
  const client = await pool.connect();

  //Passwort changen
  try {
    await client.query('BEGIN');

    const { rows } = await client.query('SELECT * FROM kunde WHERE email = $1', [id]);

    if (!rows[0]) false;

    const { rows: change } = await client.query(
      'UPDATE kunde SET passwort = $1 where email= $2 returning *; ',
      [password, id],
    );

    await client.query('COMMIT');
    return change[0];
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

async function sendPositionDB(positionDatenpaket) {
  try {
    const { rows } = await query(
      'UPDATE coordinates SET lat = $1, lng = $2, uhrzeit = $3 WHERE fk_kunde = $4 returning *;',
      [
        positionDatenpaket.lat,
        positionDatenpaket.lng,
        positionDatenpaket.zuletztGesichtet,
        positionDatenpaket.userID,
      ],
    );

    if (!rows[0]) return null;
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function patchUserDB(id, user) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query('SELECT * FROM kunde WHERE k_id = $1 and email = $2', [
      id,
      user.email,
    ]);

    if (!rows[0]) return false;

    const { rows: changeData } = await client.query(
      'UPDATE kunde SET vorname = $1, nachname = $2, email = $3, strasse = $4, ort = $5, plz = $6, usericon = $7 where k_id = $8 returning *; ',
      [
        user.vorname,
        user.nachname,
        user.email,
        user.strasse_hnr,
        user.stadt,
        user.plz,
        user.usericon,
        id,
      ],
    );

    await client.query('COMMIT');

    if (changeData[0]) return changeData[0];
    return false;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error beim Account ändern');
    throw error;
  } finally {
    client.release();
  }
}

const deleteUserDB = async (id) => {
  await query('DELETE FROM kunde where k_id = $1', [id]);
};

const getAllUsers = async () => {
  const { rows } = await query('SELECT * FROM kunde;');

  if (rows.length > 0) return rows;

  return false;
};

const changeRoleDB = async (status, id) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { rows } = await client.query('SELECT * FROM kunde WHERE k_id = $1', [id]);

    if (!rows[0]) false;

    const { rows: change } = await client.query(
      'UPDATE kunde SET isadmin = $1 where k_id = $2 returning *; ',
      [status, id],
    );

    await client.query('COMMIT');
    return change[0];
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

export {
  checkIfUserExists,
  registerUserDB,
  loginUser,
  changePasswordDB,
  sendPositionDB,
  patchUserDB,
  deleteUserDB,
  getAllUsers,
  changeRoleDB,
};

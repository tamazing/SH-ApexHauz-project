const { MESSAGES } = require("../libs/constants");
const db = require("../config/db.config");

class User {
  constructor(
    email,
    first_name,
    last_name,
    password,
    phone_number,
    address,
    is_admin = 0
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.phone_number = phone_number;
    this.address = address;
    this.is_admin = is_admin;
  }
  static create(newUser, result) {
    db.query(
      `INSERT INTO users(email,first_name,last_name,password,phone_number,address,is_admin) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.phone_number,
        newUser.address,
        newUser.is_admin,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("Created User: ", { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }

  static findByEmail(email, cb) {
    db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
      if (err) {
        console.log(err);
        cb(err, null);
        return;
      } else {
        // console.log(res);
        if (res.length) {
          cb(null, { ...res[0] });
          return;
        }
        cb({ message: MESSAGES.NOT_FOUND }, null);
      }
    });
  }
  static findById(id, result) {
    db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ message: MESSAGES.NOT_FOUND }, null);
    });
  }

  static getAll(result) {
    db.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("users: ", res);
      result(null, res);
    });
  }

  static updateById(id, user, result) {
    db.query(
      "UPDATE users SET id = ?, email = ?, phone_number = ? WHERE id = ?",
      [user.id, user.email, user.phone_number, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found
          result({ message: MESSAGES.NOT_FOUND }, null);
          return;
        }

        console.log("updated user: ", { ...user });
        result(null, { ...user });
      }
    );
  }

  static delete(id, result) {
    db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found
        result({ message: MESSAGES.NOT_FOUND }, null);
        return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
    });
  }
}

module.exports = User;

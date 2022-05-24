const { MESSAGES, HTTP_REQUEST_CODES } = require("../libs/constants");
const { createError } = require("../libs/error");
const db = require("../config/db.config");

class Property {
  constructor(owner, status, price, state, city, address, type, image_url) {
    this.owner = owner;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.image_url = image_url;
  }

  static db() {
    return db;
  }

  static create(newProperty, callBack) {
    console.log(newProperty);
    db.query(
      `INSERT INTO properties(owner,status,price,state,city,address,type,image_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newProperty.owner,
        newProperty.status,
        newProperty.price,
        newProperty.state,
        newProperty.city,
        newProperty.address,
        newProperty.type,
        newProperty.image_url,
      ],
      (err, res) => {
        if (err) {
          console.log(`error Inserting Property: ${err.message}`);
          callBack(err, null);
        } else {
          callBack(null, res);
        }
      }
    );
  }
  static findById(id, callBack) {
    db.query(
      `SELECT * FROM properties WHERE properties.id = ?`,
      id,
      (err, property) => {
        if (err) {
          console.log(`Property findById Error: ${err.message}`);
          callBack(err, null);
        } else if (property.length) {
          callBack(null, property[0]);
        } else {
          callBack(
            createError(MESSAGES.NOT_FOUND, HTTP_REQUEST_CODES.NOT_FOUND),
            null
          );
        }
      }
    );
  }
  static updateColumn(property, column, newValue, callBack) {
    db.query(
      `UPDATE properties SET ${column} = ? WHERE id = ?`,
      [newValue, property.id],
      (err, results) => {
        if (err) {
          console.log(`Update Property Column Error: ${err.message}`);
          callBack(err, null);
        } else if (!results.affectedRows) {
          callBack({ message: MESSAGES.NOT_FOUND }, null);
        } else {
          callBack(null, property);
        }
      }
    );
  }
  static delete(id, callBack) {
    db.query("DELETE FROM properties WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log(`Delete Property Error: ${err.message}`);
        callBack(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        callBack({ message: MESSAGES.NOT_FOUND }, null);
        return;
      }
      callBack(null, res);
    });
  }
  static getAll(callBack) {
    db.query("SELECT * FROM properties", (err, res) => {
      if (err) {
        console.log(`Get All Properties Error: ${err.message}`);
        callBack(null, err);
        return;
      }
      callBack(null, res);
    });
  }
  static query(query, callBack) {
    db.query(query.sql, query.params, (err, properties) => {
      if (err) {
        console.log(`Query Property Error: ${err.message}`);
        callBack(err, null);
      } else if (properties.length) {
        callBack(null, properties);
      } else {
        callBack(
          createError(MESSAGES.NOT_FOUND, HTTP_REQUEST_CODES.NOT_FOUND),
          null
        );
      }
    });
  }
}

module.exports = Property;

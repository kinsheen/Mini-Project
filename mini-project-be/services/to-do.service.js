
const db = require('../config/database')

module.exports.getAllToDo = async () => {
    const [records] = await db.query("SELECT * FROM todo")
    return records;
}

module.exports.getToDoById = async (id) => {
    const [record] = await db.query("SELECT * FROM todo WHERE id = ?", [id])
    return record;
}

module.exports.getToDoByField = async (field, value) => {
    const query = `SELECT * FROM todo WHERE \`${field}\` = ?`;
    const [record] = await db.query(query, [value]);

    return record;
}

module.exports.getToDoByDate = async (field, value) => {
    const query = `SELECT * FROM todo WHERE ${field} BETWEEN '${value} 00:00:00' AND '${value} 23:59:59'`;
    const [record] = await db.query(query, [value]);
    console.log(query);

    return record;
}

module.exports.createToDo = async (fields, placeholders, values) => {
    const query = `INSERT INTO todo (${fields}) VALUES (${placeholders})`;
    const [result] = await db.query(query, values);

    const [newRecord] = await db.query(`SELECT * FROM todo WHERE id = ?`, [result.insertId]);
    return newRecord
};

module.exports.updateToDo = async (id, fields, values) => {
    const query = `UPDATE todo SET ${fields} WHERE id = ?`;
    const [result] = await db.query(query, [...values, id]);

    if (result.affectedRows === 0) {
        return null;
    }

    const [updatedRecord] = await db.query(`SELECT * FROM todo WHERE id = ?`, [id]);
    return updatedRecord[0];
};

module.exports.deleteToDo = async (id) => {
   const [{affectedRows}] = await db.query("DELETE FROM todo WHERE id = ?", [id])
   return affectedRows;
}
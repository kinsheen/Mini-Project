
const Todo = require('../models/to-do.model'); // Adjust the path if needed

module.exports.getAllToDo = async (userId) => {
    // ✅ Fetch To-Dos for the authenticated user
    const records = await Todo.findAll({
        where: { userId },
    });
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

module.exports.createToDo = async (fields, placeholders, values) => {
    const query = `INSERT INTO todo (${fields}) VALUES (${placeholders})`;
    console.log(query);
    const [result] = await db.query(query, values);

    const [newRecord] = await db.query(`SELECT * FROM todo WHERE id = ?`, [result.insertId]);
    return newRecord
};

module.exports.updateToDo = async (id, fields, values) => {
    const query = `UPDATE todo SET ${fields} WHERE id = ?`;
    const [result] = await db.query(query, [...values, id]);

    console.log(result);
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
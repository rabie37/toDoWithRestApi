const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos_db'
});
class Controller {
    async getAll(table) {
        return new Promise((resolve, reject) => {
             connection.query(`SELECT * FROM ${table}`, function (err, result, fields) {
              if (err) {
                return reject(err);
              }
              resolve(result);
              });
        });
    }

    // getting a single 
    async get(table,id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} where id = ${id}`, function (err, result, fields) {
             if (err) {
               return reject(err);
             }
             resolve(result);
             });
       });
    }

    // creating 
    async create(table,data) {
        return new Promise((resolve, reject) => {
            let query  
            if (table == 'list') {
                query  = `INSERT INTO list (titre, status, description) VALUES ('${data.titre}','${data.status}','${data.description}')`
            }
            connection.query(query, function (err, result, fields) {
             if (err) {
               return reject(err);
             }
             resolve('Todo added successfully');
             });
       });
    }

    // updating 
    async update(data,table,id) {
        return new Promise((resolve, reject) => {
            let query 
            if (table == 'list') {
                query = `UPDATE list SET titre='${data.titre}', status='${data.status }', description='${data.description}' WHERE id = ${id} `
            }
            connection.query(query , function (err) {
             if (err) {
               return reject(err);
             }
             resolve('Todo updated successfully');
             });
       });
    }

    // deleting 
    async delete(table,id) {
            return new Promise((resolve, reject) => {
                connection.query(`DELETE FROM ${table} where id = ${id}`, function (err) {
                 if (err) {
                   return   reject(`No todo with id ${id} found`);
                 }
                 resolve(`Todo deleted successfully`);
                 });
           });
        
    }
}
module.exports = Controller;

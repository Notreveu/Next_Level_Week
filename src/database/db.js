//importar a dempendência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto quer irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
    // utilizar o objeto de banco de dados para nossas operações
    // db.serialize(() => {
    //     //com comandos sql
    //     // Criar uma tabela 
    //     db.run(`
    //         CREATE TABLE IF NOT EXISTS places (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             image TEXT,
    //             name TEXT,
    //             address TEXT,
    //             address2 TEXT,
    //             state TEXT,
    //             city TEXT,
    //             items TEXT
    //         );
    //     `)
    //         // inserir dados na tabela
    //     const query = `
    //     INSERT INTO places (
    //         image, 
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES ( ?,?,?,?,?,?,?);
    // `
    //     const values = [
    //         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    //         "Papersider",
    //         "Guilherme Gemballa, Jardim América ",
    //         "N° 260 ",
    //         "Santa Catarina",
    //         "Rio do Sul",
    //         "Papeis e Papelão"
    //     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     //consultar os dados da tabela
//     //db.all(`SELECT name FROM places`, function(err, rows) {
//     // if (err) {
//     //   return console.log(err)
//     //}

//     // console.log("Aqui estão os seus registros")
//     //console.log(rows)
//     //})

//     //deletar um dado da tabela
//     //db.run(`DELETE FROM places WHERE  id = ?`, [1], function(err) {
//     //  if (err) {
//     //    return console.log(err)
//     //}
//     //console.log("Registro deletado com sucesso!")

//     //})
// })
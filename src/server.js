const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")


// Configurar pasta pública
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//página inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })

})




server.get("/create_point", (req, res) => {
    //req.query: Query Strings da nossa url
    console.log(req.query)



    return res.render("create_point.html")
})

server.post("/savepoint", (req, res) => {


    const query = `
        INSERT INTO places (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES ( ?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            return res.send(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create_point.html", { saved: true })

    }

    db.run(query, values, afterInsertData)

    //console.log(req.body)
})


server.get("/search", (req, res) => {

    const search = req.query.search
    if (search == "") {

        return res.render("search-results.html", { total: 0 })

    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão os seus registros")
        console.log(rows)

        const total = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })

    })

})

// ligar o servidor
server.listen(3000)
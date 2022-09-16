module.exports = function (server, db) {

  server.get('/data/user/tickets/:id', (req, res) => {
    let query = "SELECT * FROM " + "usertickets" + " WHERE user_id = @id"
    let result = db.prepare(query).all(req.params)
    console.log(result)
    res.json(result)
  })

}
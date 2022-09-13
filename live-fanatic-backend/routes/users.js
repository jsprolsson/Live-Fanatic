const encrypt = require('../modules/encrypt.js')

module.exports = function(server, db){

  server.get('/data/users', (req, res)=>{
    let query = "SELECT id, email FROM users"
    let result = db.prepare(query).all()
    res.json(result)
  })

  server.get('/data/users/:id', (req, res)=>{
    let query = "SELECT id, email FROM users WHERE id = @id"
    let result = db.prepare(query).all(request.params)
    res.json(result[0])
  })

  // registrera en ny användare
  server.post('/data/users', (request, response) => {
    let user = request.body
    const role = "user"
    let encryptedPassword = encrypt(user.password)
    let result
    try{
      result = db.prepare('INSERT INTO users (email, password, roles) VALUES(?,?,?)').run([user.email, encryptedPassword, role])
    }catch(e){
      console.error(e)
    }
    response.json(result)
  })

  // begär ändring av lösenord för användare
  server.delete('/data/users/password', (request, response) => {
    let user = request.body
    let result
    try{
      result = db.prepare('UPDATE users SET password = NULL WHERE email = ?').run([user.email])
    }catch(e){
      console.error(e)
    }
    response.json(result)
  })


  // ändra lösenord för användare
  server.patch('/data/users/password', (request, response) => {
    let user = request.body
    let encryptedPassword = encrypt(user.password)
    let result
    try{
      result = db.prepare('UPDATE users SET password = ? WHERE password IS NULL AND email = ?').run([encryptedPassword, user.email])
    }catch(e){
      console.error(e)
    }
    response.json(result)
  })


}
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let userController = {
  signIn: (req, res) => {
    // 檢查必要資料
    if (!req.body.email || !req.body.password) {
      return res.json({ status: 'error', message: "required fields didn't exist" })
    }
    // 檢查 user 是否存在與密碼是否正確
    let username = req.body.email
    let password = req.body.password

    User.findOne({ where: { email: username } }).then(user => {
      // 若找不到 user 或 密碼不符 則回傳 401 錯誤，代表權限不足
      if (!user) return res.status(401).json({ status: 'error', message: 'no such user found' })
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ status: 'error', message: 'passwords did not match' })
      }
      // 簽發 token
      var payload = { id: user.id }
      // 把資料變成 JSON web token 的方法是 jwt.sign()，必要參數有兩個：第一個參數 payload 是想要打包的資訊；
      // 第二個參數是密鑰，JWT 會用密鑰進行雜湊，若 payload 及 header 被篡改，就與這組亂數對不起來
      var token = jwt.sign(payload, process.env.JWT_SECRET)
      // 放入 res.json 傳給客戶端
      return res.json({
        status: 'success',
        message: 'ok',
        token: token,
        user: {
          id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin
        }
      })
    })
  }
}

module.exports = userController
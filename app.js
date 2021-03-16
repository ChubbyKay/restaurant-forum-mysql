// 若現在環境非 production 就用 dotenv 這套
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000

const passport = require('./config/passport')

app.engine('handlebars', handlebars({
  defaultLayout: 'main', helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

// 傳入變數到 res.locals 裡，讓所有 view 都能存取
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})

// 引入 routes 並將 app 傳進去，讓 routes 可以用 app 這個物件來指定路由
// require('./routes')(app, passport)

// 路由器分流後， index 不再需要 passport，故單純傳入 app 即可
require('./routes')(app)
const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000

app.engine('handlebars', handlebars)
app.set('view handlebars', 'handlebars')


app.get('/', (req, res) => {
  res.send('It is WORKING')
})

app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`)
})

const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => res.send(`<h1>../</h1>`))

app.get('/test-route', (req, res) => res.send(`<h1>../test-route</h1>`))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

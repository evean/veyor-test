import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import api from './api'
import config from './config.json'
import path from 'path'

let app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
	limit : config.bodyLimit
}))

app.use(express.static(path.join(__dirname, '../client/build')))

app.use('/api', api({ config }))

app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build', 'index.html')))

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`)
})

export default app

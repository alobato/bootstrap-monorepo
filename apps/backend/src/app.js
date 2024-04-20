import express from 'express'
import { cors } from './cors.js'

import routes from './routes/index.js'

const app = express()

app.use(express.json({ limit: '50mb' }))
// app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors)
// app.use('/downloads', express.static(process.env.DOWNLOADS_PATH))
// app.use('/uploads', express.static(process.env.UPLOADS_PATH))

app.use('/', routes)

export default app

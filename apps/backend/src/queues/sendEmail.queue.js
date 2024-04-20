import Queue from 'better-queue'
import { sendEmail } from '../utils/index.js'

const sendEmailQueue = new Queue(async function ({ to, subject, body }, cb) {
  await sendEmail({ to, subject, body })
  cb(null)
})

export default sendEmailQueue

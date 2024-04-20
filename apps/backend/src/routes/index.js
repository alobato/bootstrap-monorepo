import express from 'express'

const router = express.Router()

router.get('/now', async (_, res) => {
  return res.send({ serverDateTime: new Date().toISOString() })
})

router.get('/ip', async (req, res) => {
  let ip
  try { ip = req.headers['x-forwarded-for'] } catch (err) { console.error(err) }
  return res.send({ ip })
})

export default router

import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/** 
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}

app.post('/user', async (req, res) => {
    const result = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password
        }
    })
    res.json(result)
})

app.post('/devices', async(req, res) => {
    const { name, username, device_id, key, userEmail} = req.body
    const device = await prisma.post.create({
        data: {
            name,
            username,
            device_id,
            key,
            connect: {
                email: userEmail
            }
        }
    })
    res.status(200).json(device)
})

app.get('/devices', async(req, res) => {
    const devices = await prisma.post.findMany({
        
    })
    res.json(posts)
})

app.get('/devices/:id', async(req,res) => {
    const {id} = req.params
    const device = await prisma.post.findUnique({
        where:  {
            id: Number(id)
        }
    })
    res.json(post)
})
import express from "express"
import cors from "cors"
import { v4 as uuidv4 } from 'uuid';
import morgan from "morgan"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { StreamChat } from "stream-chat"

dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("common"))


const serverClient = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET)

app.post("/api/signup", async (req, res) => {
    try {
        const { users } = await serverClient.queryUsers({ name: req.body.username })
        if (users.length) {
            return res.status(400).json("User Already exists")
        }
        const userID = uuidv4()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
        const token = serverClient.createToken(userID)
        const userDetails = req.body
        userDetails.userID = userID
        userDetails.token = token
        res.status(201).json({ userDetails })
    } catch (error) {
        res.status(500).json("Server Error")
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const { users } = await serverClient.queryUsers({ name: username })
        console.log(users);
        if (users.length === 0) {
            return res.status(400).json(`No user with username ${username}`)
        }
        const isPasswordMatch = await bcrypt.compare(password, users[0].password)


        if (isPasswordMatch) {
            const token = serverClient.createToken(users[0].id)
            return res.status(200).json({
                user: users[0],
                token: token
            })
        } else {
            return res.status(400).json("Invalid Credentials")
        }



    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

app.get("/api/getActiveUsers", async (req, res) => {
    try {
        let { users } = await serverClient.queryUsers({})
        console.log(users)
        users = users.filter(user => {
            return user.online
        });
        res.status(200).json(users)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


app.listen(process.env.PORT, () => {
    console.log(`service up on port ${process.env.PORT}`);
})
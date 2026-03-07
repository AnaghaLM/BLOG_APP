const users =require('../Models/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUserController = async (req, res) => {

  try {

    const { name, email, password } = req.body

    const userExists = await users.findOne({ email })

    if (userExists) {
      return res.status(400).json("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new users({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json(
       "User registered successfully"
    )

  } catch (error) {

    res.status(500).json(error)

  }

}



exports.loginController = async (req, res) => {
    console.log("Inside loginController")

    const { email, password } = req.body

    try {

        const existingUser = await users.findOne({ email })

        if (existingUser) {

            const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

            if (isPasswordMatch) {

                const token = jwt.sign({ id: existingUser._id }, process.env.jwt_password,)
                console.log("Generated token:", token)

                res.status(200).json({ users: existingUser, token })
            }
            else {
                res.status(401).json("Invalid password or email")
            }

        }
        else {
            res.status(404).json("Account does not exist")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
}
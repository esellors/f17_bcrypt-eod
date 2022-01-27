const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')

app.use(express.json())

let id = 2;
const users = [
    {
        "id": 1,
        "email": "bob@bob.com",
        "hash": "1iqwrhefiqhfopqhwefopqiehwfqwoeifh23",
        "name": "sam"
    }
]

app.post('/auth/register', (req, res) => {
    const { email, password, name } = req.body;

    // handle email: first confirm email not already registered
    const foundUserInd = users.findIndex(userObj => userObj.email === email )

    if (foundUserInd > -1) {
        return res.status(403).send('Please try another email')
    }

    // have pw requirements
    const specialChar = '#$&'
    let pwCharCounter = 0;

    for (let i = 0; i < password.length; i++) {
        if (specialChar.includes(password[i])) {
            pwCharCounter++;
        }
    }

    if (pwCharCounter < 2) {
        return res.status(403).send('Password must have 2 of the following: # $ &')
    }

    // handle password: hash it
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    // set up user object & add to users
    const newUser = {
        id,
        email,
        hash,
        name
    }

    id++

    users.push(newUser)

    // send a response
    res.sendStatus(200)

})

app.listen(5050, () => console.log('Server jamming on 5050'))
const fs = require('fs')
const express = require('express');
const axios = require('axios')
// const fileUpload = require('express-fileupload')
// const { v4: uuidv4 } = require('uuid');

const app = express();
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())
// app.use(fileUpload())

// const inQueue = []
// initAutoScaler(inQueue)
// const outQueue = []

app.get('/', (req, res) => {    
    res.send(`<h1>Cloud Computing Dynamic System - A Worker Node!</h1>`)
})

app.get('/test', (req, res) => {    
    res.send(`test ok`)
})

const takeJob = async () => {    
    let hasWork = true
    while(hasWork) {
        hasWork = false
        for(const ip of loadIps()) {
            console.log(ip);
            await axios
                .get(`${ip}/test`)
                .then(res => console.log(res.data))
        }         
    }
}

const loadIps = () => {        
    fs.readFileSync('../ips.txt', 'utf8' , (err, data) => {
        if (err) res.send(err)
        else {
            return data.split(',').map(ip => ip.split(':')[1])
        }             
      })
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


takeJob()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
}) 

// const fs = require('fs')
const express = require('express');
// const fileUpload = require('express-fileupload')
// const { v4: uuidv4 } = require('uuid');
// const initAutoScaler = require('./autoScaler')

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

// app.get('/ips', (req, res) => {    

//     const loadIps = async () => {        
//         fs.readFile('../ips.txt', 'utf8' , (err, data) => {
//             if (err) res.send(err)
//             else {
//                 res.send(data)
//             }             
//           })
//     }

//     loadIps()    
// })



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)  
}) 

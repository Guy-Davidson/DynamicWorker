const fs = require('fs')
const axios = require('axios')
const sha512 = require('js-sha512')
const shutDown = require('./shutDown')

// max number a workwe will fail to get a job before shutting down. 
const MAX_ATTEMPTS = 3
//number of seconds in between each worker check.
const SLEEP_DUR = 3

const takeJob = async () => {        
    let attempts = 0
    let ipsArr = fs.readFileSync('../ips.txt', 'utf8')   
            .replace('\n','')
            .trim()
            .split(',')
            .map(ip => ip.split(':')[1])
    
    while(true) {
        let hasWork = false
        
        for(const ip of ipsArr) { 
                     
            await axios
                .get(`http://${ip}:5000/dequeue`) 
                .then(async (res) => {                    
                    if(res.data !== "empty") {                        
                        hasWork = true
                        attempts = 0

                        let output = sha512(res.data.binaryDataBuffer.data)                        
                        for(let i = 0; i < parseInt(res.data.iterations); i++) output = sha512(output)                                                
                        await sendJob({ id: res.data.id, output: output}, ip)
                    }
                })
                .catch(e => console.log("error"))
        } 
        
        if(!hasWork) attempts += 1
        if(attempts >= MAX_ATTEMPTS) {                    
            shutDown()
            break
        }

        await sleep(SLEEP_DUR * 1000)
    }
}

const sendJob = async (output, ip) => {
    let confirmed = false
    while(!confirmed) {
        await axios
            .put(`http://${ip}:5000/enqueueCompleted`, output)
            .then(res => {
                if(res.data === "ok") confirmed = true
                console.log("successfully sent job!");
            })
            .catch(e => console.log(e))
        await sleep(1 * 1000)
    }
}

takeJob()

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
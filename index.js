const fs = require('fs')
const axios = require('axios')
const sha512 = require('js-sha512')

// max num a work will fail to get a job before shutting down. 
const MAX_ATTEMPTS = 5
//number of seconds in between each worker check.
const SLEEP_DUR = 10

const takeJob = async () => {        
    let ipsArr = fs.readFileSync('../ips.txt', 'utf8').split(',').map(ip => ip.split(':')[1])
    attempts = 0
    while(true) {
        
        let hasWork = false
        for(const ip of ipsArr) {            
            await axios
                .get(`http://${ip}:5000/dequeue`) 
                .then(res => {
                    
                    if(res.data !== "empty") {                        
                        hasWork = true
                        attempts = 0

                        let output = sha512(res.data.binaryDataBuffer.data)                        
                        for(let i = 0; i < parseInt(res.data.iterations); i++) output = sha512(output)                        
                        console.log(output)

                    }
                })
                .catch(e => console.log("error"))
        } 
        
        if(!hasWork) attempts += 1
        if(attempts >= MAX_ATTEMPTS) // shut down()
        await sleep(SLEEP_DUR * 1000)
    }

    // shutDown()
}

takeJob()

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
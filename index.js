const fs = require('fs')
const axios = require('axios')

const takeJob = async () => {    
    let hasWork = true
    let ipsArr = fs.readFileSync('../ips.txt', 'utf8').split(',').map(ip => ip.split(':')[1])
    while(hasWork) {
        hasWork = false
        for(const ip of ipsArr) {
            console.log(ip);
            await axios
                .get(`http://${ip}:5000/dequeue`) 
                .then(res => console.log(res.data))
                .catch(e => console.log("error"))
        }         
        await sleep(5 * 1000)
    }
}

takeJob()

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
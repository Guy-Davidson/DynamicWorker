const fs = require('fs')
const axios = require('axios')
const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1'

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const shutDown = async () => {
    let parentIp = fs.readFileSync('../parentIp.txt', 'utf8').replace('\n','').trim()
    await axios
        .post(`http://${parentIp}:5000/countDecrement`)
        .then(res => {
            let workerId = ""
            let i = 0
            while(true) {
                try {
                    workerId = fs.readFileSync(`../workerId-${i}.txt`, 'utf8').replace('\n','').trim()
                    break 
                } catch (e) {}
                i++
            }    
            
            ec2.stopInstances({InstanceIds: [workerId]}, (err, data) => {
                if (err) console.log("Error", err) 
                else if (data) console.log("Success", data.StoppingInstances);        
            }) 
        })
        .catch(e => console.log("error"))       
}

module.exports = shutDown
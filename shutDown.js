const fs = require('fs')
const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1'

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const shutDown = () => {
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
        
}

module.exports = shutDown
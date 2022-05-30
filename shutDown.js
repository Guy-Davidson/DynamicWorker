const fs = require('fs')
const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1'

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const shutDown = () => {
    let workerId = fs.readFileSync('../workerId.txt', 'utf8').replace('\n','')    
    
    ec2.stopInstances({InstanceIds: [workerId]}, (err, data) => {
        if (err) console.log("Error", err) 
        else if (data) console.log("Success", data.StoppingInstances);        
    })
        
}

module.exports = shutDown
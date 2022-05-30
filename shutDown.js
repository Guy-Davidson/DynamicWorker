const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1'

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const shutDown = () => {
    var params = {
        DryRun: false
      };
      
      // Call EC2 to retrieve policy for selected bucket
      ec2.describeInstances(params, function(err, data) {
        if (err) {
          console.log("Error", err.stack);
        } else {
          console.log("Success", JSON.stringify(data));
        }
      });
}

module.exports = shutDown
var AWS = require('aws-sdk');
var request = require('request');


AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();

function put_from_url(url, bucket, key, callback) {
    request({
	    url: url,
		encoding: null
		}, function(err, res, body) {
	    if (err)
		return callback(err, res);

	    s3.putObject({
		    Bucket: bucket,
			Key: key,
			ContentType: res.headers['content-type'],
			ContentLength: res.headers['content-length'],
			Body: body // buffer
			}, callback);
	})
	}

put_from_url('http://a0.awsstatic.com/main/images/logos/aws_logo.png', 'cip2', 'media/aws_logo.png', function(err, res) {
	if (err)
	    throw err;

	console.log('Uploaded data successfully!');
    });
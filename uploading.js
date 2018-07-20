const AWS = require("aws-sdk");


var s3 = require('s3'); // https://github.com/andrewrk/node-s3-client
//var AWS = require('aws-sdk'); // https://www.npmjs.com/package/aws-sdk

// use newest sdk to avoid: https://github.com/andrewrk/node-s3-client/issues/69
//var awsS3Client = new AWS.S3();

/*
var client = s3.createClient({
  s3Client: awsS3Client
});
*/
/*

var awsS3Client = new AWS.S3({
    //region: 'eu-central-1',
    s3Options: {
      accessKeyId: "AKIAJ3JYXJPTOXHEIOHQ",
      secretAccessKey: "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",
      region: "us-west-1",
      s3BucketEndpoint: true,
      endpoint: 's3.github-test2.amazonaws.com',

      // sslEnabled: false
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
    signatureVersion: 'v4'
});

var options = {
  s3Client: awsS3Client,
};

var client = s3.createClient(options);

*/

var client2 = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: "AKIAJ3JYXJPTOXHEIOHQ",
    secretAccessKey: "fObMkH6KFL9Xr3DeBSm6jG1P96kfNxqLfiaG5PhA",
    region: "us-west-1",
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});
/*
var s3 = require('s3');
var awsS3Client = new AWS.S3(s3Options);
var options = {
  s3Client: awsS3Client,
  // more options available. See API docs below.
};
var client3 = s3.createClient(options);
*/
//client2.shouldDisableBodySigning = () => true

var params = {
  localFile: "/Users/wstansbury/Desktop/api-test/this-is-a-test.docx",

  s3Params: {
    Bucket: "github-test2",
    Key: "test-document.docx",
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};
var uploader = client2.uploadFile(params);
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});

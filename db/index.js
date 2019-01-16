const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env['DB_ENDPOINT'];



module.exports.getTriviaQuestions = async () => {
  if (!tableName)  {
    throw { message: 'Error Table Name not found' }
  }
  const params = {
    TableName: tableName,
  }
  try {
    let res = await docClient.scan(params).promise();
    return res;
  } catch (e) {
    console.log(e);
    throw { message: 'Error scanning Database'}
  }
}
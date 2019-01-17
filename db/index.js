const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env['DB_ENDPOINT'];



module.exports.getTriviaQuestions = async () => {
  console.log(tableName);
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

module.exports.insert = async (item={}) => {
  item['triviaQuestionID'] = uuidv4();
  const params = {
    TableName: tableName,
    Item: {
      triviaQuestionID: uuidv4(),
      question: item.question,
      answer: item.answer,
      category: {
        type: item.category,
      }
    }
  };
  try {
    let res = await docClient.put(params).promise();
    return res
  } catch (e) {
    console.log(e);
    throw { message: e }
  }
}
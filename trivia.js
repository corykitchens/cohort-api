'use strict';
const db = require('./db');

const getRandomIndex = (arrLength = 1) => {
  const idx = Math.floor(Math.random() * arrLength);
  return idx >= 0 ? idx : 0
}

const getQuestion = async () => {
  try {
    const res = await db.getTriviaQuestions();
    return res['Items'][getRandomIndex(res['Items'].length)];
  } catch(err) {
    console.log('Received error message');
    console.error(err);
    return null
  }
}

module.exports.lambda_handler =  async (evt, ctx) => {
  const question = await getQuestion();
  if (question) {
    return {
      statusCode: 200,
      body: JSON.stringify([ question ])
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error no question retrieved'
      })
    }
  }
  
}

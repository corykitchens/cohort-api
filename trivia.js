'use strict';
const qs = require('querystring');
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

module.exports.get =  async (evt, ctx) => {
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

const parseBodyFromRequest = (str = "") => {
  return qs.parse(str);
}
module.exports.create = async (evt, ctx) => {
  try {
    const urlEncodedBody = parseBodyFromRequest(evt.body); 
    const res = await db.insert(urlEncodedBody);
    if (res) {
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      }
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(evt.body)
  }
}

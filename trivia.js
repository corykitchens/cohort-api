'use strict';

module.exports.lambda_handler = async (evt, ctx) => {
  const trivia = [
    {
      "question" : "Hello World",
      "airdate": null,
      "category": {
        "title": "Category Title"
      },
      "value": 100
    }
  ]
  return {
    statusCode: 200,
    body: JSON.stringify(trivia)
  }
}

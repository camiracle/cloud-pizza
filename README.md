## Getting Started

### Requirements

- Node.js 16
- AWS CDK CLI v1.204

### Local Setup

Entering the following commands in a terminal:

- `git clone https://github.com/camiracle/cloud-pizza.git`
- `cd cloud-pizza`
- `npm install`
- `npm run build`

### Deploy to AWS

- If you haven't already, [follow these steps](https://docs.aws.amazon.com/cdk/v1/guide/getting_started.html#getting_started_install) to install the AWS CDK CLI and bootstrap an AWS environment to use the CDK.
- `npm run deploy`

### Call the API

After deploying to AWS, test the api with the following command, swapping out the account id and region in the URL. The requests will fail periodically, to simulate a failure. Swapping out "bacon" for "pineapple" in the request will cause the state machine to fail. Changing "isDelivery" to false will cause the state machine to call a different lambda.

    curl -X POST \
      -d '{"isDelivery": true, "pizzas": [{"crust": "handTossed", "size": "medium", "toppings": [{"ingredient": "bacon", "location": "whole" }]}]}' \
      https://[apigateway api id].execute-api.[aws region].amazonaws.com/pizza/orders

### Run Unit Tests

- `npm test`

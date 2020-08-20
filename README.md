# Local Lockdown by LGSS Digital

* "player/" contains the frontend website used to check a post code
* "editor/" contains the backoffice for managing lockdowns and postcodes
* "api/" contains the AWS SAM project for API calls made by Local Lockdown


## Description
* Player uses VueJS and the [GOV.UK Design System](https://design-system.service.gov.uk/get-started/production/)
* Editor is created in VueJS, using the [Vuetify Material Design Framework](https://vuetifyjs.com/)
* API's are written in NodeJS and are run on [AWS Lambda](https://aws.amazon.com/lambda/)

## Configuration

`config.json` is used to setup general site configuration --currently unused

## Setup
###### You'll need the following prerequisites to get started:

 * An Amazon Web Services account and credentials set up on your machine
 * Node and NPM
 * AWS CLI and AWS SAM
 * Docker to run API's locally


###### To set up the API's - remote
* navigate to the /api directory 
* run `sam build --guided`

###### To set up the API's - locally
* navigate to the /api directory 
* create a env.json file and add the table name that was generated in the build
`{
    "Parameters": {
        "TABLE_NAME": ""
    }
  }`
*Run `sam local start-api  --env-vars env.json --region {region name}` replacing {region name} with the aws region name, such as eu-west-2

###### To set up the editor - locally
* navigate to /editor
* run `npm install`
* create a .env.local file with VUE_APP_EDITOR_API set to, either the endpoint that was created by the sam build or `http://127.0.0.1:3000` if running the api's locally
* run `npm run serve`

###### To set up the player - locally
* navigate to /player
* run `npm install`
* create a .env.local file with VUE_APP_EDITOR_API set to, either the endpoint that was created by the sam build or `http://127.0.0.1:3000` if running the api's locally
* run `npm run serve`
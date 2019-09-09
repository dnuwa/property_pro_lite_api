# property_pro_lite_api
[![Build Status](https://travis-ci.org/dnuwa/property_pro_lite_api.svg?branch=develop)](https://travis-ci.org/dnuwa/property_pro_lite_api)              [![Coverage Status](https://coveralls.io/repos/github/dnuwa/property_pro_lite_api/badge.svg?branch=develop)](https://coveralls.io/github/dnuwa/property_pro_lite_api?branch=develop)                [![Maintainability](https://api.codeclimate.com/v1/badges/9046cf3cf9bf0d6ad28a/maintainability)](https://codeclimate.com/github/dnuwa/property_pro_lite_api/maintainability)

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

#### A hosted version of the application UI can be found [here](https://dnuwa.github.io/property_lite_pro/UI/)

#### A complete interative version(developed with vanila js) of the application can be found [here](https://dnuwa.github.io/property_pro_lite_api/UI/)

### Project Overview
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

### Installation

- Clone this repository by running the command:

```bash
git clone https://github.com/dnuwa/property_pro_lite_api.git
```
- checkout into gh-pages branch

#### Starting the app

- After successfully cloning the project: `cd property_lite_pro`
- Open index.html with live server

## Features
- User can sign up.
- User can sign in.
- User (agent) can post a property advert.
- User (agent) can update the details of a property advert.
- User (agent) can mark his/her posted advert as sold.
- User (agent) can delete a property advert.
- User can view all properties adverts.
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
- User can view a specific property advert.

# Getting Started
In your terminal
1. Clone the repo locally to your machine by running `git clone https://github.com/dnuwa/property_pro_lite_api.git`
2. change your current directory (`cd`) to wherever you cloned the app in 1 above.

#### Demos
This __api__ currently  has two versions hosted on heroku;
- [v1 (In memory Data Structures)](https://property-pro1.herokuapp.com/api/v1)

- [v1 (Database with persistance data)](https://property-pro-lite-api-app.herokuapp.com/api/v1)

- [API Documentation](https://property-pro-lite-api-app.herokuapp.com/api_docs/)

#### Requirements
- [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) A general purpose programming language
- [npm](https://docs.npmjs.com/about-npm/) A tool for installing node packages
- [node](https://nodejs.org/en/docs/)  A javascript framework
- [express](https://expressjs.com/en/api.html)  A javascript framework

#### Development setup

- Install dependencies
  ```bash
  npm install
  ```
#### Run the application
```bash
    npm run dev
```

#### Running tests
```bash
#with coverage
npm run test
```

## API REST End Points
| End Point                                           | Verb |Use                                            |
| ----------------------------------------------------|------|-----------------------------------------------|
|`/api/v1/`                                         |GET   |API index                                      |
|`/api/v1/property`                                |GET   |Gets a list of properties                      |
|`/api/v1/property`                                |POST  |Stores a property advertisement                     |
|`/api/v1/property/<:property-id>`                       |GET   |Gets a property advert of a given ID         |
|`/api/v1/property/<:property-id> `                      |PATCH |Updates a property advert                    |
|`/api/v1/property/<:property-id>`                        |DELETE|Deletes a property advert                   |
|`/api/v1/property/<:property-id/sold`               |PATCH   | Marks a property as sold          |
|`/api/v1/auth/signup`                              |POST  | Creates a user account                        |
|`/api/v1/auth/signin`                               |POST  |Exchanges  user credentials with a token       |


#### Built With
- [node and express] javascript frameworkes
- [postgress sql] relational database management system


## User interfaces
[UI Faces](https://dnuwa.github.io/property_lite_pro/UI/) for providing hosted website prototype of how the finall product will look like.

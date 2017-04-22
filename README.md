# Simple RESTful API
This is an open-source RESTful API designed to give NodeJS developers a solid
starting point for creating backend applications.

## Features

**No Abstractions**  
Many other frameworks require you to install their package globally and include
many functions specific to their application. Sometimes it can take just as long
to learn a new framework as just learning how to set up your own API. This API
does not hide anything or abstract functionality away from the user. All code
is included in the project and can be modified to fit the user's needs.

**Passport**  
Authentication is performed using Passport. The default authentication strategy
is the Bearer strategy which allows basic token-based authentication. Other
Passport strategies such as Facebook or Google authentication can easily be
added if needed.

**Login and Account Recovery**  
Signup, login, and logout endpoints are provided without any configuration required.
A two-step password recovery process is also included. A user can request a password
reset which will email the user a link to enter a new password. Signup, login,
logout, and password recovery endpoints include full test coverage.

**Token-Based Authentication**  
Any route can be protected by token-based authentication. Any request to a
secured route must include a valid access token in the Authorization HTTP
header. The token will then be matched to a user and made accessible within
controllers via the *req.user* variable. Tokens expire after 30 days. Any invalid
tokens will receive a 401 Unauthorized HTTP response.

**API Documentation Generator**  
The API uses ApiDoc to generate API documentation based on in-line comments
before each API endpoint. Full documentation is included for all authentication
endpoints such as signup, login and logout. Documentation is easily updated
using a single command. Documentation also requires that a user logs in to
view the documentation, providing security for sensitive information.

**Easy Test Suite**  
Included test suite is ready to test any model or controller in your application.
Tests are performed using Mocha. All database collections are cleared before
each test to make sure that every test uses fresh data. Helper method is
included for easily testing both secured and unsecured API endpoints.

**Model and Controller Generators**  
Controllers can easily be generated from Mongoose models using a built-in generator
script. Generator will create a controller file with basic CRUD endpoints and
documentation for each of the model's attributes. A test file offering basic
test coverage will also be generated for the controller. Templates are easily
accessible and can be changed to fit your needs.

**ES6 Support**  
Most of the code is written with ES6 ensuring that coding conventions are
up-to-date. The "use-strict" directive is included in every file to catch
developer errors and enforce good coding practices.

**Docker Ready**  
A Dockerfile is included and is ready to run the application out-of-the-box.


## Quickstart

**Clone**  
```
git clone https://github.com/appellod/simple-restful-api.git
```

**Install NPM Modules**  
```
npm install
```

**Download and Run MongoDB**  
The API requires a local MongoDB instance to be running. [Download MongoDB here](https://www.mongodb.com/). The default port for MongoDB is 27017 which
is already declared in the API's configuration file.

**Run Test Suite**  
The test suite uses [Mocha](https://mochajs.org/). Install mocha globally using:
```
npm install -g mocha
```
After Mocha is installed, make sure a local MongoDB instance is running and run
the test suite using:
```
npm test
```
All tests should pass with a fresh install of the API.

**Start the API**  
```
npm start
```

**Access the Documentation**  
The default location for the API documentation is at
[http://localhost:3000](http://localhost:3000). The default credentials for the
documentation are:
```
email: test@example.com  
password: password
```
Entering the above credentials should allow you access to the documentation.

**Register for Mailgun**  
In order for the password reset process to work, you need to create a free
account at [Mailgun](https://www.mailgun.com/). Mailgun is a very easy-to-use
email service that is free up to 10,000 emails per month. Once you registered,
enter your credentials in the application's configuration file for each
environment, or at the very least, the test and local environments.

## Working on the API

**Generating a New Model**  
A new data model can be generated using the following script:
```
npm run generate-model -- [ModelName]
```
This will generate a new model file within the models/ directory and a test file
within the test/models/ directory. Data modeling is done using [Mongoose](http://mongoosejs.com/). Add any attributes, indexes, hooks or
methods that you need.

Note that a *mock()* function is generated with each model to make testing
easier. Any required attributes should be set using [Chance](https://github.com/chancejs/chancejs) if they are not supplied as
parameters to the *mock()* function. Refer to the User model to see an example.

**Generating a Controller for a Model**  
Basic CRUD endpoints can be generated for any model. Simply run:
```
npm run generate-controller -- [fileName]
```
The file name should be the model's file name without any path information. For
example, a User model defined in user.js would use the command:
```
npm run generate-controller -- user.js
```
This will generate the controller file in controllers/ and a test file in test/controllers/.

**Running the Test Suite**  
Try running the test suite to make sure everything is working correctly with:
```
npm test
```
Sometimes tests will fail due to validations on the model's attributes. If tests
fail, check to make sure all required fields are set in the model's *mock()*
function.

**Updating the API Documentation**  
In the newly generated controller file, documentation will be automatically included
above each endpoint. The only thing that should need to be modified is the
model's attribute descriptions. Replace any instance of the following text with
proper descriptions:
```
<i>Awaiting Documentation</i>
```
Once everything is ready to go, make sure [ApiDoc](http://apidocjs.com/) is
installed globally with:
```
npm install -g apidoc
```
Once ApiDoc is installed, run:
```
npm run update-docs
```
Your API documentation should now be updated to include all the new routes!
Your application may need to be restarted to see the updates.

## File Structure

**config/**  
Contains the configuration file for the application. All environment-specific
configurations are available here. Five environments are included by default:
* test: For running the test suite.
* local: For running on localhost.
* dev: For running on a remote server in a development environment.
* staging: For running on a remote server in a staging environment.
* prod: For running on a remote server in production.

Environment can be selected by setting the NODE_ENV system environment variable.
An example for running the API in production mode on Linux-based machines is:
```
NODE_ENV=prod node index.js
```

**models/**  
Contains the Mongoose models. By default only the User model is included.

**passport-strategies/**  
Contains the Passport strategies for the application's authentication.
By default only the Bearer strategy is included. The Bearer strategy allows
basic token-based authentication to any API endpoint.

**public/**  
Contains the files for the API documentation. Includes a login view so users
can authenticate themselves before viewing the documentation.

**controllers/**  
All controllers for the API are defined here.

**scripts/**  
Scripts such as the Model and Controller generator scripts are included here.

**templates/**  
Templates for the Model and Controller generator scripts are defined here.

**test/**  
All tests are included here. Mocha must be installed globally before the test
suite can be run.

## Support
Any questions or concerns, please feel free to email me at appellod@gmail.com.
If you find any issues with the application, you can either email me or submit
a pull request and I'll be sure to address the issue!

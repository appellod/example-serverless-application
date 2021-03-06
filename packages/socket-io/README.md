# Typescript RESTful API
This is an open-source RESTful API designed to give Typescript developers a solid
starting point for creating backend applications.

## Table of Contents
* [Features](#features)
* [Quickstart](#quickstart)
* [Development Guide](#development-guide)
* [File Structure](#file-structure)
* [Support](#support)

## Features

**Microservice Architecture**
Project is setup to allow development of highly-scalable microservices. API uses JWTs
for authentication so users can communicate with multiple microservices without requiring
multiple logins. Microservices can also authenticate with each other using JWTs.

**Token-Based Authentication with JWT**  
Routes can be protected by token-based authentication using JWTs. Access tokens expire
after 15 minutes and refresh tokens expire after 2 weeks by default. This setup achieves 
a balance between the security of a short-lived access token and the convenience of a long 
refresh token that allows users to stay logged in longer. JWT expiration dates can be easily
adjusted with environment variables.

**Login and Account Recovery**  
Signup, login, and logout endpoints are provided without any configuration required.
A two-step password recovery process is also included. A user can request a password
reset which will email the user a link to enter a new password. Signup, login,
logout, and password recovery endpoints include full test coverage.

**API Documentation Generator**  
The API uses ApiDoc to generate API documentation based on in-line comments
before each API endpoint. Full documentation is included for all authentication
endpoints such as signup, login and logout. Documentation is easily updated
using a single command. Documentation also requires that a user logs in to
view the documentation, providing security for sensitive information.

**Passport**  
Authentication is performed using Passport. The default authentication strategy
is the Bearer strategy which allows basic token-based authentication. Other
Passport strategies such as Facebook or Google authentication can easily be
added if needed.

**Postgres with Objection**  
All database calls are performed using Objection, an ORM for Postgres. By utilizing an ORM,
developers can see Intellisense as they're working with their data to give them more insight
into database fields and types. Objection also allows many useful features such as pre- and post-save 
hooks, and static- and instance-level functions to provide even more development efficiency!

**Socket.IO Authentication and User-based Broadcasting with Redis**  
Users can connect to Socket.IO and authenticate their connection. This allows us to send
them push notifications based on their identity. Supports multiple connection from a single user. 
Uses Redis to allow distributed communications between servers.

**Cloud-based Log Management with Loggly**  
By simply including your Loggly API key, subdomain, and tags, all console output will be sent to
Loggly to allow centralized log management and application monitoring.

**Thorough Test Suite**  
Included test suite is ready to test any model or controller in your application.
Tests are performed using Mocha. Redis and all database collections are cleared before
each test to make sure that every test uses fresh data. Helper method is
included for easily testing both secured and unsecured API endpoints.

**End-to-End API Tests**  
Included test suite performs end-to-end testing on all API routes to make sure users
experience what's intended.

**Test Coverage Reports**  
Generate test coverage reports by simply running `npm run test:coverage`.

**Docker Ready**  
A Dockerfile is included and is ready to run the application out-of-the-box.


## Quickstart

**Clone**  
```
git clone https://github.com/appellod/restful-api
```

**Install NPM Modules**  
```
npm install
```

**Run Dependencies with Docker Compose**  
You can start up any development dependencies such as Postgres using:
```
docker-compose up
```

**Setup Environment Variables**  
All variables are declared inside a root-level `settings.sh` file. You can use the existing `settings.example.sh`
as a template. Update all the variables here such as external API keys, local ports, etc.

A `settings.test.sh` can also need to be created to run your test suite. If this file doesn't exist, the test suite
will default to your `settings.sh` file.

**Run Test Suite**  
The test suite uses [Mocha](https://mochajs.org/). Make sure your application dependencies are running and start
the test suite using:
```
npm test
```
All tests should pass with a fresh install of the API.

**Start the API**  
```
npm start
```

**Setup Mailgun**  
In order for the password reset process to work, you need to create a free
account at [Mailgun](https://www.mailgun.com/). Mailgun is a very easy-to-use
email service that is free up to 10,000 emails per month. Once you registered,
enter your credentials in the application's configuration file for each
environment, or at the very least, the test and local environments.

**Setup Loggly**  
The API comes complete with [Loggly](https://www.loggly.com) support. Simply create an account and enter your
customer token, subdomain, and tags in the environment configurations you want supported.

## Development Guide

**Updating the API Documentation**  
API documentation is generated from in-line comments within the source code with [apidoc](http://apidocjs.com/).  

To generate or update your API documentation, run:
```
npm run documentation
```
Your application may need to be restarted to see the updates.

Documentation can be versioned so developers can see the changes between versions. For this reason,
documentation can be included with Git commits by removing the `src/documentation/public/apidoc*` entry in the 
.gitignore file.

**Accessing the Documentation**  
The default location for the API documentation is at
[http://localhost:3000](http://localhost:3000). The default credentials for the
documentation are:
```
email: test@example.com  
password: password
```
Entering the above credentials should allow you access to the documentation.

**Postgres Migrations**  
Migrations are performed with [knex](https://knexjs.org/). 

To create a migration file, run:
```
npm run migrations:create [migration-name]
```
This will create a migration file in the `migrations` directory.

Migrations can be run with:
```
npm run migrations
```
This will run all migrations on the database specified by your POSTGRES_URL environment variable.

**Generating Test Coverage Report**  
To generate a test coverage report, run:
```
npm run test:coverage
```
This will generate a `coverage/` folder. Open the `index.html ` inside to view the report.

## File Structure

* **migrations/** : Migrations for Postgres.
* **scripts/** : Scripts to help aid development.
* **src/** : The source code.
  * **common/** : Files used by multiple microservices.
    * **koa/** : Module to easily setup a KOA server.
    * **loggly/** : Saves console messages to Loggly.
    * **passport/** : Authentication strategies.
    * **postgres/** : Models for interacting with Postgres.
    * **redis/** : Creates connections to Redis.
    * **socket-io/** : Base for using websockets.\
  * **microservices/** : Applications for each microservice.
    * **authentication/** : API that issues tokens to users.
    * **rest/** : RESTful API with basic CRUD operations.
* **test/** : Tests for the source code.

## Support
Any questions or concerns, please feel free to email me at appellod@gmail.com.
If you find any issues with the application, you can either email me or submit
a pull request and I'll be sure to address the issue!

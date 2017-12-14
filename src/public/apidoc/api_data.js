define({ "api": [
  {
    "type": "get",
    "url": "/authentication/availability",
    "title": "Availability",
    "name": "Availability",
    "group": "Authentication",
    "description": "<p>Checks if an email address is available.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email address.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAvailable",
            "description": "<p>True if the email is available, false otherwise.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/authentication.ts",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/authentication/login",
    "title": "Log In",
    "name": "LogIn",
    "group": "Authentication",
    "description": "<p>Logs in a user with given email address and password and returns an access token.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The user's access token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/authentication.ts",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/authentication/logout",
    "title": "Log Out",
    "name": "LogOut",
    "group": "Authentication",
    "description": "<p>Logs a user out.</p>",
    "version": "0.0.0",
    "filename": "src/controllers/authentication.ts",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/authentication/request-password-reset",
    "title": "Request Password Reset",
    "name": "RequestPasswordReset",
    "group": "Authentication",
    "description": "<p>Sends password reset email to the user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/authentication.ts",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/authentication/reset-password",
    "title": "Reset Password",
    "name": "ResetPassword",
    "group": "Authentication",
    "description": "<p>Resets a user's password.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resetHash",
            "description": "<p>The reset password hash.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The new password.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/authentication.ts",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/authentication/signup",
    "title": "Sign Up",
    "name": "SignUp",
    "group": "Authentication",
    "description": "<p>Creates a user with given email address and password and returns an access token.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The created user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The user's access token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/authentication.ts",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "name": "CreateUser",
    "group": "Users",
    "description": "<p>Creates and returns a new user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>The authorization level of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password. It will be hashed.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The new user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/users.ts",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "name": "GetUser",
    "group": "Users",
    "description": "<p>Returns a user by ID.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>The ID of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user matching the given ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/users.ts",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get Users",
    "name": "GetUsers",
    "group": "Users",
    "description": "<p>Returns an array of users.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Number of records to return.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "select",
            "description": "<p>A string of fields to select separated by spaces.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Number of records to skip.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>The sorting of the records.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "where",
            "description": "<p>The where clause for the query.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Array of users matching the criteria.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/users.ts",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Remove User",
    "name": "RemoveUser",
    "group": "Users",
    "description": "<p>Removes a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>The ID of the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/users.ts",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "Users",
    "description": "<p>Updates and returns a user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>The authorization level of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password. It will be hashed.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The updated user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controllers/users.ts",
    "groupTitle": "Users"
  }
] });

"use strict";

module.exports = {
  test: {
    environment: "test",
    mongo: {
      host: "127.0.0.1",
      port: "27017",
      database: "api_test",
    },
    server: {
      host: "127.0.0.1",
      port: "3000"
    },
    mailgun: {
      company: "Example Team",
      domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
      key: "b4bf483017fc43b2e1146d76a66932eb",
      noreply: "no-reply@example.com"
    }
  },
  local: {
    environment: "local",
    mongo: {
      host: "127.0.0.1",
      port: "27017",
      database: "api_local",
    },
    server: {
      host: "127.0.0.1",
      port: "3000"
    },
    mailgun: {
      company: "Example Team",
      domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
      key: "b4bf483017fc43b2e1146d76a66932eb",
      noreply: "no-reply@example.com"
    }
  },
  dev: {
    environment: "dev",
    mongo: {
      host: "127.0.0.1",
      port: "27017",
      database: "api_dev",
    },
    server: {
      host: "127.0.0.1",
      port: "3000"
    },
    mailgun: {
      company: "Example Team",
      domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
      key: "b4bf483017fc43b2e1146d76a66932eb",
      noreply: "no-reply@example.com"
    }
  },
  staging: {
    environment: "staging",
    mongo: {
      host: "127.0.0.1",
      port: "27017",
      database: "api_staging",
    },
    server: {
      host: "127.0.0.1",
      port: "3000"
    },
    mailgun: {
      company: "Example Team",
      domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
      key: "b4bf483017fc43b2e1146d76a66932eb",
      noreply: "no-reply@example.com"
    }
  },
  prod: {
    environment: "prod",
    mongo: {
      host: "127.0.0.1",
      port: "27017",
      database: "api_prod",
    },
    server: {
      host: "127.0.0.1",
      port: "3000"
    },
    mailgun: {
      company: "Example Team",
      domain: "sandboxf70278866c584b1980bc071d8029e646.mailgun.org",
      key: "b4bf483017fc43b2e1146d76a66932eb",
      noreply: "no-reply@example.com"
    }
  }
};

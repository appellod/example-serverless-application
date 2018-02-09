export interface IConfig {
  aws: {
    accessKeyId: string,
    region: string,
    secretAccessKey: string
  };
  environment: string;
  loggly?: {
    inputToken: string,
    level?: string,
    subdomain: string,
    tags: string[]
  };
  mailgun: {
    domain: string,
    key: string
  };
  mongo: {
    host: string,
    port: string,
    database: string
  };
  passwordReset: {
    company: string,
    from: string,
    url: string
  };
  server: {
    host: string,
    port: string
  };
}

export class Config {
  public aws: {
    accessKeyId: string,
    region: string,
    secretAccessKey: string
  };
  public environment: string;
  public loggly: {
    inputToken: string,
    level?: string,
    subdomain: string,
    tags: string[]
  };
  public mailgun: {
    domain: string,
    key: string
  };
  public mongo: {
    host: string,
    port: string,
    database: string
  };
  public passwordReset: {
    company: string,
    from: string,
    url: string
  };
  public server: {
    host: string,
    port: string
  };

  constructor(env?: string) {
    env = env || process.env.NODE_ENV;
    const config: IConfig = this.getConfiguration(env);

    this.aws = config.aws;
    this.environment = config.environment;
    this.loggly = config.loggly;
    this.mailgun = config.mailgun;
    this.mongo = config.mongo;
    this.passwordReset = config.passwordReset;
    this.server = config.server;
  }

  private getConfiguration(env: string): IConfig {
    const configurations: { [s: string]: IConfig } = {
      test: {
        aws: {
          accessKeyId: "",
          region: "",
          secretAccessKey: ""
        },
        environment: "test",
        mailgun: {
          domain: "sandboxf70783866c584b1980bc071d8029e646.mailgun.org",
          key: "key-b4bf483017fc43b2e1146d76a66932eb"
        },
        mongo: {
          database: "api_test",
          host: "127.0.0.1",
          port: "27017"
        },
        passwordReset: {
          company: "Example Team",
          from: "no-reply@example.com",
          url: "http://127.0.0.1:3001/reset-password.html"
        },
        server: {
          host: "127.0.0.1",
          port: "3001"
        }
      },
      local: {
        aws: {
          accessKeyId: "",
          region: "",
          secretAccessKey: ""
        },
        environment: "local",
        mailgun: {
          domain: "sandboxf70783866c584b1980bc071d8029e646.mailgun.org",
          key: "key-b4bf483017fc43b2e1146a4c866932eb",
        },
        mongo: {
          database: "api_local",
          host: "127.0.0.1",
          port: "27017"
        },
        passwordReset: {
          company: "Example Team",
          from: "no-reply@example.com",
          url: "http://127.0.0.1:3000/reset-password.html"
        },
        server: {
          host: "127.0.0.1",
          port: "3000"
        }
      },
      dev: {
        aws: {
          accessKeyId: "",
          region: "",
          secretAccessKey: ""
        },
        environment: "dev",
        mailgun: {
          domain: "sandboxf70783866c584b1980bc071d8029e646.mailgun.org",
          key: "key-b4bf483017fc43b2e1146d76a66932eb"
        },
        mongo: {
          database: "api_dev",
          host: "127.0.0.1",
          port: "27017"
        },
        passwordReset: {
          company: "Example Team",
          from: "no-reply@example.com",
          url: "http://127.0.0.1:3000/reset-password.html"
        },
        server: {
          host: "127.0.0.1",
          port: "3000"
        }
      },
      staging: {
        aws: {
          accessKeyId: "",
          region: "",
          secretAccessKey: ""
        },
        environment: "staging",
        mailgun: {
          domain: "sandboxf70783866c584b1980bc071d8029e646.mailgun.org",
          key: "key-b4bf483017fc43b2e1146d76a66932eb"
        },
        mongo: {
          database: "api_staging",
          host: "127.0.0.1",
          port: "27017"
        },
        passwordReset: {
          company: "Example Team",
          from: "no-reply@example.com",
          url: "http://127.0.0.1:3000/reset-password.html"
        },
        server: {
          host: "127.0.0.1",
          port: "3000"
        }
      },
      prod: {
        aws: {
          accessKeyId: "",
          region: "",
          secretAccessKey: ""
        },
        environment: "prod",
        mailgun: {
          domain: "sandboxf70783866c584b1980bc071d8029e646.mailgun.org",
          key: "key-b4bf483017fc43b2e1146d76a66932eb"
        },
        mongo: {
          database: "api_prod",
          host: "127.0.0.1",
          port: "27017"
        },
        passwordReset: {
          company: "Example Team",
          from: "no-reply@example.com",
          url: "http://127.0.0.1:3000/reset-password.html"
        },
        server: {
          host: "127.0.0.1",
          port: "3000"
        }
      }
    };

    return configurations[env];
  }
}

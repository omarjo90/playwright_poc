// config/config.ts
interface Config {
    baseUrl: string;
    groomingUrl: string;
    credentials: {
        email: string;
        password: string;
    };
}

const config: { [key: string]: Config } = {
    development: {
        baseUrl: '',
        groomingUrl: '',
        credentials: {
            email: 'dev@example.com',
            password: 'devpassword',
        },
    },
    staging: {
        baseUrl: '',
        groomingUrl: '',
        credentials: {
            email: 'staging@example.com',
            password: 'stagingpassword',
        },
    },
    production: {
        baseUrl: '',
        groomingUrl: '',
        credentials: {
            email: 'user@example.com',
            password: 'userpassword',
        },
    },
    qa: {
        baseUrl: 'https://services-staging.petsmart.com/',
        groomingUrl: 'https://services-staging.petsmart.com/grooming',
        credentials: {
            email: 'oguzman@petsmart.com',
            password: 'Qaz!23wsx',
        },
    },
};

const environment = process.env.NODE_ENV || 'qa';
export default config[environment];
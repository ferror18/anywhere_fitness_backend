require('dotenv').config()
const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/anywhereFitness";

const pgConnectionTesting = process.env.HEROKU_POSTGRESQL_CHARCOAL_URL;
module.exports = {
    development: {
        client: "pg",
        connection: pgConnection,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    testing: {
        client: "pg",
        connection: pgConnectionTesting,
        pool: {
            min: 2,
            max: 100,
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    // for Heroku
    production: {
        client: "pg",
        connection: pgConnection,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },
};
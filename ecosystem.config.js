module.exports = {
    apps: [
        {
            name: 'PrintOk',
            script: './server.js',
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};

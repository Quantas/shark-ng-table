module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            {pattern: 'base.spec.ts'},
            {pattern: 'src/**/**.ts'}
        ],

        preprocessors: {
            '**/**.ts': ['karma-typescript', 'coverage']
        },

        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require('karma-typescript-angular2-transform')
                ]
            },
            compilerOptions: {
                lib: ['ES2015', 'DOM']
            }
        },

        coverageReporter: {
            type: 'lcov',
            dir: './coverage/'
        },

        reporters: ['progress', 'karma-typescript', 'coverage'],

        browsers: ['PhantomJS']
    });
};
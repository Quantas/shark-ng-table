module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            {pattern: 'base.spec.ts'},
            {pattern: 'src/**/**.ts'}
        ],

        preprocessors: {
            '**/!(*.spec).ts': ['karma-typescript', 'coverage'],
            '**/**.spec.ts': ['karma-typescript']
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
            type: 'lcovonly',
            dir: './coverage/'
        },

        reporters: ['progress', 'karma-typescript', 'coverage', 'junit'],

        junitReporter: {
            outputDir: 'coverage/junit',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },

        browsers: ['PhantomJS']
    });
};
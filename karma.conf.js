module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            {pattern: 'base.spec.ts'},
            {pattern: 'src/**/**.ts'},
            {pattern: 'test/**/**.ts'}
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript']
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
            },
            reports: {
                "text-summary": "",
                "lcovonly": {
                    "directory": "coverage",
                    "filename": "lcov.info"
                }
            }
        },

        reporters: ['progress', 'karma-typescript', 'coverage', 'coveralls', 'junit'],

        junitReporter: {
            outputDir: 'coverage/junit',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },

        browsers: ['PhantomJS'],
        browserNoActivityTimeout: 1000000
    });
};

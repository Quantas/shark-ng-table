export default {
    entry: 'dist/src/index.js',
    dest: 'dist/bundles/sharktable.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.sharktable',
    globals: {
        '@angular/common': 'ng.common',
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms',
        '@angular/router': 'ng.router',
        'rxjs/Observable': 'Rx',
        'rxjs/Subscription': 'Rx'
    }
}
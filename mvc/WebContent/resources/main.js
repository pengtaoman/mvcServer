require.config({
    baseUrl: jsContextPath,

    paths: {
        "application-configuration": "resources/application-configuration",
        //"jquery":"bower_components/jquery/dist/jquery.min",
        "angular": "bower_components/angular/angular.min",
        "angular-locale": "bower_components/angular/i18n/angular-locale_zh-cn",
        "angular-animate": "bower_components/angular/angular-animate.min",
        "angular-touch": "bower_components/angular/angular-touch.min",
        "angular-route": "bower_components/angular/angular-route.min",
        "angularAMD": "bower_components/angularAMD/angularAMD.min",
        "angular-sanitize": "bower_components/angular/angular-sanitize.min",
        "ui-router": "bower_components/angular-ui-router/release/angular-ui-router.min",
        "ui-bootstrap" : "bower_components/ui-bootstrap/ui-bootstrap-tpls-0.14.3.min",
        "blockUI": "bower_components/angular-block-ui/dist/angular-block-ui.min",
        "ngload": "bower_components/angularAMD/ngload.min",
        //"ngFileUploadshim": "bower_components/ng-file-upload-master/dist/ng-file-upload-shim",
        //"ngFileUpload": "bower_components/ng-file-upload-master/dist/ng-file-upload-all",
        "angularFileUpload": "bower_components/angular-file-upload/dist/angular-file-upload.min",

        //"bootstrap":"bower_components/bootstrap/dist/js/bootstrap.min",
        //"fast-click":"bower_components/fastclick/lib/fastclick",
        "framework-service": "resources/framework/framework-service",
        "framework-directive": "resources/framework/framework-directive",
        "framework-filter": "resources/framework/framework-filter",
        "main-page-app": "resources/framework/main-page-index"

    },

    shim: {

        //'angular': ['jquery'],
        "angularAMD": ["angular"],
        "angular-locale":["angular"],
        "angular-animate":["angular"],
        "angular-touch":["angular"],
        "angular-route": ["angular"],
        //"ngFileUploadshim":  ["angular"],
        //"ngFileUpload":  ["angular"],
        "angularFileUpload":  ["angular"],
        "blockUI": ["angular"],
        "angular-sanitize": ["angular"],
        "ui-bootstrap": ["angular"],
        "ui-router": ["angular"],
        //"jquery":["angular"],
        //"fast-click":["angular"],
        //"bootstrap":["angular"],
        "framework-service":["angular"],
        "framework-directive":["angular"],
        "framework-filter":["angular"],
        "main-page-app":["angular"]
    },

    deps: ["application-configuration"]
});
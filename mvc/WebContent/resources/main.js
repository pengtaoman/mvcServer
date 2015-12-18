var jsContextPath = "/mvc/";
require.config({
    baseUrl: jsContextPath,

    paths: {
        "application-configuration": "resources/application-configuration",
        "angular": "bower_components/angular/angular",
        "angular-locale": "bower_components/angular/i18n/angular-locale_zh-cn",
        "angular-animate": "bower_components/angular/angular-animate",
        "angular-touch": "bower_components/angular/angular-touch",
        "angular-route": "bower_components/angular/angular-route",
        "angularAMD": "bower_components/angularAMD/angularAMD",
        "angular-sanitize": "bower_components/angular/angular-sanitize",
        "ui-router": "bower_components/ui-router/release/angular-ui-router.min",
        "ui-grid": "bower_components/ui-grid/release/ui-grid.min",
        "ui-bootstrap" : "bower_components/ui-bootstrap/ui-bootstrap-tpls-0.14.3",
        //"ngDialog" : "bower_components/ngDialog/js/ngDialog",
        "blockUI": "bower_components/angular-block-ui/dist/angular-block-ui",
        "ngload": "bower_components/angularAMD/ngload",
        "jquery":"bower_components/jquery/dist/jquery.min",
        "bootstrap":"bower_components/bootstrap/dist/js/bootstrap.min",
        "jquery-ui-bootstrap":"bower_components/jquery-ui-bootstrap/js/jquery-ui-1.9.2.custom.min",
        "fast-click":"bower_components/fastclick/lib/fastclick",
        "inputmask":"bower_components/jquery.inputmask/dist/min/jquery.inputmask.bundle.min",
        "framework-service": "resources/framework/framework-service",
        "framework-directive": "resources/framework/framework-directive",
        "framework-filter": "resources/framework/framework-filter",
        "main-page-app": "resources/mainPage/dist/js/app",
        "main-page-demo": "resources/mainPage/dist/js/demo"

        /*,
         "ngload": "scripts/ngload",
         "mainService": "services/mainServices",
         "ajaxService": "services/ajaxServices",
         "alertsService": "services/alertsServices",
         "accountsService": "services/accountsServices",
         "customersService": "services/customersServices",
         "ordersService": "services/ordersServices",
         "productsService": "services/productsServices",
         "dataGridService": "services/dataGridService",

         "customersController": "Views/Shared/CustomersController",
         "productLookupModalController": "Views/Shared/ProductLookupModalController"
         */

    },

    shim: {
        "angularAMD": ["angular"],
        "angular-locale":["angular"],
        "angular-animate":["angular"],
        "angular-touch":["angular"],
        "angular-route": ["angular"],
        "blockUI": ["angular"],
        "angular-sanitize": ["angular"],
        "ui-bootstrap": ["angular"],
        "ui-router": ["angular"],
        "ui-grid": ["angular"],
        //"ngDialog": ["angular"],
        "jquery":["angular"],
        "fast-click":["jquery"],
        "inputmask":["jquery"],
        "bootstrap":["jquery"],
        "jquery-ui-bootstrap":["bootstrap"],
        "framework-service":["angular"],
        "framework-directive":["angular"],
        "framework-filter":["angular"],
        "main-page-app":["bootstrap"],
        "main-page-demo":["bootstrap"]
    },

    deps: ["application-configuration"]
});
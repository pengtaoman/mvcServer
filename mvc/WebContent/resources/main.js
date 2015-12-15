var jsContextPath = "/mvc/";
require.config({
    baseUrl: jsContextPath,

    paths: {
        "application-configuration": "resources/application-configuration",
        "angular": "bower_components/angular/angular",
        "angular-route": "bower_components/angular-route/angular-route",
        "angularAMD": "bower_components/angularAMD/angularAMD",
        "ui-bootstrap" : "bower_components/ui-bootstrap/ui-bootstrap-tpls-0.14.2",
        "blockUI": "bower_components/angular-block-ui/dist/angular-block-ui",
        "angular-sanitize": "bower_components/angular-sanitize/angular-sanitize",
        "ui-router": "bower_components/ui-router/release/angular-ui-router.min",
        "ui-grid": "bower_components/ui-grid/release/ui-grid.min",
        "ngload": "bower_components/angularAMD/ngload",
        "jquery":"bower_components/jquery/dist/jquery.min",
        "bootstrap":"bower_components/bootstrap/dist/js/bootstrap.min",
        "jquery-ui-bootstrap":"bower_components/jquery-ui-bootstrap/js/jquery-ui-1.9.2.custom.min",
        "framework-service": "resources/framework/framework-service",
        "framework-directive": "resources/framework/framework-directive",
        "framework-filter": "resources/framework/framework-filter",
        "main-page-app": "resources/mainPage/dist/js/app"


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
        "angular-route": ["angular"],
        "blockUI": ["angular"],
        "angular-sanitize": ["angular"],
        "ui-bootstrap": ["angular"],
        "ui-router": ["angular"],
        "ui-grid": ["angular"],
        "jquery":["angular"],
        "bootstrap":["jquery"],
        "jquery-ui-bootstrap":["bootstrap"],
        "framework-service":["angular"],
        "framework-directive":["angular"],
        "framework-filter":["angular"],
        "main-page-app":["bootstrap"]
    },

    deps: ["application-configuration"]
});
(function () {
    'use strict';

    var config = {

    };

    var app = angular.module('builder');

    //Collect the routes
    app.constant('routes', getRoutes());


    app.value('config', config);

    //Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    //Define the routes
    function getRoutes() {
        return [
			{
			    url: '/',
			    config: {
			        templateUrl: 'app/dashboard/dashboard.html',
			        title: 'dashboard',
			        controller: 'dashboard',
			        controllerAs: 'vm'
			        }
			  }
		];
    }
})();
(function () {
    'use strict';

    var controllerId = 'shell';
    angular.module('builder').controller(controllerId,
        ['$rootScope', 'config', shell]);

    function shell($rootScope, common, config) {
        var vm = this;

        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#FBB018'
        };

        $rootScope.activeComponent = {
            id: '',
            type: '',
            name: '',
            properties: []
        };
        $rootScope.$on('$routeChangeStart',
            function (event, next, current) { toggleSpinner(true); }
        );

        $rootScope.$on('$routeChangeSuccess',
            function (event, next, current) { toggleSpinner(false); }
        );

        function toggleSpinner(on) { vm.isBusy = on; }


    };
})();
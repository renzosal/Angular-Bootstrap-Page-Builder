(function () {
    'use strict';

    var controllerId = 'sidebar';
    angular.module('builder').controller(controllerId,
        ['$rootScope', 'config', 'components', sidebar]);

    function sidebar($rootScope, config, components) {
        var vm = this;

        vm.title = 'Components';
        vm.components = components.all();

        return vm;
    };
})();
(function () {
    'use strict';

    var controllerId = 'dashboard';
    angular.module('builder').controller(controllerId, ['$rootScope', 'components', dashboard]);

    function dashboard($rootScope, components) {

        var vm = this;
        vm.title = "Dashboard";
        vm.components = {};
        vm.activeComponents = [];
        vm.addComponentToCanvas = addComponentToCanvas;
        vm.removeComponentFromCanvas = removeComponentFromCanvas;
        vm.loadComponentProperties = loadComponentProperties;

        return vm;

        function loadComponentProperties(componentRefId, type) {
            var result = _.find(vm.activeComponents, { 'id': componentRefId });
            if (typeof result === 'undefined')
                return;

            $rootScope.activeComponent = result;
        };

        function addComponentToCanvas(componentRefId, type) {
            var component = components.get(type);

            var componentObj = {
                id: componentRefId,
                type: type,
                name: component.name,
                properties: angular.copy(component.properties)
            };

            console.log(component.properties);
            var result = _.find(vm.activeComponents, { 'id': componentRefId });

            if (typeof result === 'undefined')
                vm.activeComponents.push(componentObj);

            console.log(vm.activeComponents);
            componentObj = null;
        };

        function removeComponentFromCanvas(componentRefId) {

        };
    }

})();
(function () {
    'use strict';

    var app = angular.module('builder');

    // override the default input to update on blur
    app.directive('ngModelOnblur', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 1,
            link: function (scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox') return;

                elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
            }
        };
    });

    app.directive('pbInputWidget', ['$compile', function ($compile) {
        // Opens and clsoes the sidebar menu.
        // Usage:
        // <div data-pb-drag-components>
        var directive = {
            controller: controller,
            link: link,
            restrict: 'A',
            replace: true,
            scope: {
                property: '='
            }
        };
        return directive;

        function controller($scope, $element) {


            $scope.updateProperty = function () {
                //Get Target Element
                if (typeof $scope.property.targetElement === 'undefined') {
                    var $activeComponent = $('[data-component-ref="' + $scope.$parent.component.id + '"]');
                } else {
                    var $activeComponent = $('[data-component-ref="' + $scope.$parent.component.id + '"]').find($scope.property.targetElement);
                }

                if ($scope.property.html_attr === 'class') {

                } else if ($scope.property.html_attr === 'node') {

                } else {
                    $activeComponent.attr($scope.property.html_attr, $scope.property.val);
                }

            };
        }

        function link(scope, element, attrs) {

            var html = '<div class="form-group">' +
                           '<label>{{property.name}}</label>' +
                           '<input type="text" ng-blur="updateProperty()" ng-model="property.val" ng-model-onblur class="form-control">' +
                       '</div>';

            element.append(html);
            $compile(element.contents())(scope);
        }
    } ]);


    app.directive('pbSelectWidget', ['$compile', function ($compile) {
        // Opens and clsoes the sidebar menu.
        // Usage:
        // <div data-pb-drag-components>
        var directive = {
            controller: controller,
            link: link,
            restrict: 'A',
            replace: true,
            scope: {
                property: '='
            }
        };
        return directive;

        function controller($scope, $element) {


            $scope.updateProperty = function () {
                //Get Target Element
                if (typeof $scope.property.targetElement === 'undefined') {
                    var $activeComponent = $('[data-component-ref="' + $scope.$parent.component.id + '"]');
                } else {
                    var $activeComponent = $('[data-component-ref="' + $scope.$parent.component.id + '"]').find($scope.property.targetElement);
                }

                if ($scope.property.html_attr === 'class') {

                    $activeComponent.removeClass($scope.property.possibleValues.join(" "));
                    $activeComponent.addClass($scope.property.val);

                } else if ($scope.property.html_attr === 'node') {

                    var newNode = document.createElement($scope.property.val);
                    var attrs = {};
                    var attrMap = $activeComponent[0].attributes;
                    $.each(attrMap, function (i, e) { attrs[e.nodeName] = e.nodeValue; });
                    console.log($activeComponent.contents()[0]);
                    $(newNode).html($activeComponent.contents()[0]);
                    $.each(attrs, function (key) { $(newNode).attr(key, this); });
                    $activeComponent.replaceWith(newNode);
                    console.log($(newNode));
                    $compile($(newNode))($scope.$parent);
                } else {
                    $activeComponent.attr($scope.property.html_attr, $scope.property.val);
                }

            };
        }

        function link(scope, element, attrs) {

            var html = '<div class="form-group">' +
                           '<label>{{property.name}}</label>' +
                           '<select class="form-control" ng-change="updateProperty()" ng-model="property.val" ng-options="type.value as type.text for type in property.widgetdata.items"></select>' +
                       '</div>';

            element.append(html);
            $compile(element.contents())(scope);
        }
    } ]);

    app.directive('pbProperties', ['$compile', function ($compile) {
        // Opens and clsoes the sidebar menu.
        // Usage:
        // <div data-pb-drag-components>
        var directive = {
            link: link,
            controller: controller,
            restrict: 'A',
            scope: {
                component: '='
            }
        };
        return directive;

        function controller($scope) {

        }

        function link(scope, element, attrs) {

            scope.$watch("component", function (newValue, oldValue) {
                var html = '<h5>{{component.name}} Properties</h5><div class="properties-box"><form role="form">';

                var property = null;

                for (var k in scope.component.properties) {
                    property = scope.component.properties[k];
                    html += '<div pb-' + property.widgettype + '-widget property="component.properties[' + k + ']"></div>';
                }

                html += '</form></div>';

                element.html(html);
                $compile(element.contents())(scope);

            },
                true // Object equality (not just reference).
            );
        }
    } ]);

    app.directive('pbComponentsDrawer', [function () {
        // Opens and clsoes the sidebar menu.
        // Usage:
        // <div data-pb-drag-components>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.click(function (event) {
                event.preventDefault();
                $("#components-drawer-box").toggleClass("opencan");
            });
        }
    } ]);

    app.directive('pbDroppable', ['components', '$compile', '$rootScope', function (components, $compile, $rootScope) {
        // Opens and clsoes the sidebar menu.
        // Usage:
        // <div data-pb-drag-components>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

            element.droppable({
                greedy: true,
                tolerance: "pointer",
                accept: ".ui-draggable",
                activate: function (event, ui) {
                    return console.log("Droppable activate");
                },
                deactivate: function (event, ui) { },
                over: function (event, ui) {
                },
                out: function (event, ui) {
                    return console.log("Droppable out");
                },
                drop: function (event, ui) {
                    if (!$(ui.draggable).hasClass('component-item')) {
                        $(ui.draggable).remove();
                    }

                    var type = $(ui.helper).data("ctype");
                    var $temp = ui.helper.clone().removeAttr("style").removeClass('ui-draggable-dragging');
                    var component = components.get(type);

                    var droppables = $temp.attr("data-ctype", type).appendTo(element);
                    scope.resizeSelectedInspector();
                    $temp.parent().find('> .placeholder').remove();

                    if (typeof component.disableHoverOn !== 'undefined' && $(ui.draggable).hasClass('component-item'))
                        droppables.find(component.disableHoverOn.join(", ")).attr('data-goto-component', $temp.attr('data-component-ref'));

                    if (typeof component !== 'undefined' && component != null) {
                        scope.vm.addComponentToCanvas($temp.attr('data-component-ref'), type);
                        scope.vm.loadComponentProperties($temp.attr('data-component-ref'), type);
                    }

                    droppables.attr('pb-draggable', true);
                    scope.lastClicked = droppables;
                    scope.setSelectedElement(droppables, scope.currentSelectorElements, true);
                    $compile(droppables)(scope)
                    if (component.isDroppable) {
                        droppables = droppables.find(component.droppables.join(", "));
                        droppables.attr('pb-droppable', true);
                        $compile(droppables)(scope);
                    }

                }
            });


        }
    } ]);

    app.directive('pbDraggable', ['components', function (components) {
        // Opens and clsoes the sidebar menu.
        // Usage:
        // <div data-pb-drag-components>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

            element.draggable({
                appendTo: "body",
                cursor: "hand",
                helper: function (e) {
                    var component, el, helper, insertable, text, type;
                    type = $(this).data("ctype");
                    //self.clearSelection();
                    if (!$(e.currentTarget).hasClass('component-item'))
                        return $(this).css({ position: "relative" });

                    component = components.get(type);
                    el = $(component.html);
                    helper = el;
                    helper.attr("data-ctype", type);
                    helper.css({
                        position: "absolute"
                    });
                    if ($(e.currentTarget).hasClass('component-item'))
                        helper.attr("data-component-ref", Date.now());

                    return helper
                },
                start: function (event, ui) {
                    var type;
                    type = $(ui.helper).data("ctype");
                },
                stop: function () {
                },
                revert: "invalid"
            })

        }
    } ]);


    app.directive('pbDomSelectors', ['components', function (components) {
        // Generates the DOM inspector tool for highlighting and editing.
        // Usage:
        // <div data-pb-domselector>
        var directive = {
            controller: controller,
            link: link,
            restrict: 'A',
            transclude: true,
            template: '<div id="selector"><div id="selector-info"><span id="selector-title">{{hoverElement.title}}</span><span id="selector-description"></span></div><div id="selector-top"></div><div id="selector-left"></div><div id="selector-right"></div><div id="selector-bottom"></div></div>' +
                      '<div id="selector-current"><div id="selector-current-info"><span id="selector-current-title">{{selectedElement.title}}</span><span id="selector-current-description"><span class="selector-name"></span class="selector-size"></span><span class="inspector-actions"><a><i class="icon-edit-sign"></i> Edit</a><a ng-click="deleteSelected()"><i class="icon-trash"></i> Delete</a>  <span ng-show="selectedElement.isComponent">|  <a ng-click="moveUp()"><i class="icon-arrow-up"></i> Move Up</a><a ng-click="moveDown()"><i class="icon-arrow-down"></i> Move Down</a></span></span></span></div><div id="selector-current-top"></div><div id="selector-current-left"></div><div id="selector-current-right"></div><div id="selector-current-bottom"></div></div>'
        };
        return directive;

        function controller($scope, $element) {

            $scope.selectorElements = {
                info: $('#selector-info'),
                title: $('#selector-title'),
                description: $('#selector-description'),
                top: $('#selector-top'),
                left: $('#selector-left'),
                right: $('#selector-right'),
                bottom: $('#selector-bottom')
            };

            $scope.currentSelectorElements = {
                inspector: $('#selector-current'),
                info: $('#selector-current-info'),
                title: $('#selector-current-title'),
                description: $('#selector-current-description'),
                top: $('#selector-current-top'),
                left: $('#selector-current-left'),
                right: $('#selector-current-right'),
                bottom: $('#selector-current-bottom')
            };

            $scope.selectedElement = {
                title: '',
                description: '',
                isComponent: false
            };

            $scope.hoverElement = {
                title: '',
                description: ''
            };

            $scope.selectedTarget = '';

            $scope.deleteSelected = function () {
                $($scope.selectedTarget).remove();
                $scope.currentSelectorElements.inspector.hide();
            }

            $scope.moveUp = function () {
                $scope.selectedTarget.insertBefore($scope.selectedTarget.prev());
                $scope.resizeSelectedInspector();
            }

            $scope.moveDown = function () {
                $scope.selectedTarget.insertAfter($scope.selectedTarget.next());
                $scope.resizeSelectedInspector();
            }
        }

        function link(scope, element, attrs) {

        }

    } ]);


    app.directive('pbDomArea', ['components', function (components) {
        // Generates the DOM inspector tool for highlighting and editing.
        // Usage:
        // <div data-pb-domselector>
        var directive = {
            controller: controller,
            link: link,
            restrict: 'A'
        };
        return directive;

        function controller($scope, $element) {

            $scope.componentRef = '';

            $scope.lastClicked = null;

            $scope.setSelectedElement = function ($target, inspector, isSelected) {
                var goToAttr = $target.attr('data-goto-component');
                if (typeof goToAttr !== 'undefined' && goToAttr !== false) {
                    var $newTarget = $target.closest('[data-component-ref="' + goToAttr + '"]');
                    return $scope.setSelectedElement($newTarget, inspector, isSelected);
                }

                //scope.componentRef = $target.attr("data-component-ref");
                var canvasOffset = $('#builder-view')[0].getBoundingClientRect();
                var targetOffset = $target[0].getBoundingClientRect();
                var targetHeight = targetOffset.height;
                var targetWidth = targetOffset.width;
                var component = null;

                if (typeof $target.data("ctype") !== 'undefined')
                    component = components.get($target.data("ctype"));

                if (component !== null) {
                    var label = component.name + " ";
                }

                var infoText = (label || " ") + targetOffset.width + ' x ' + targetOffset.height;
                var applyInspectorLabel = function () {
                    if (isSelected) {
                        $scope.selectedElement.title = infoText;
                        $scope.selectedTarget = $target;
                        if (component !== null)
                            $scope.vm.loadComponentProperties($target.attr('data-component-ref'), $target.data("ctype"));

                        $scope.selectedElement.isComponent = (component === null) ? false : true;
                    } else {
                        $scope.hoverElement.title = infoText;
                    }
                };
                var phase = $scope.$root.$$phase;

                if (phase == '$apply' || phase == '$digest') {
                    applyInspectorLabel();
                } else {
                    $scope.$apply(applyInspectorLabel);
                }


                inspector.info.css({ left: (targetOffset.left - canvasOffset.left - 4), top: (targetOffset.top - canvasOffset.top - 26) });
                inspector.top.css({ left: (targetOffset.left - canvasOffset.left - 4), top: (targetOffset.top - canvasOffset.top - 4), width: (targetWidth + 8) });
                inspector.bottom.css({ top: (targetOffset.top - canvasOffset.top + targetHeight + 4), left: (targetOffset.left - canvasOffset.left - 4), width: (targetWidth + 8) });
                inspector.left.css({ left: (targetOffset.left - canvasOffset.left - 4), top: (targetOffset.top - canvasOffset.top - 4), height: (targetHeight + 8) });
                inspector.right.css({ left: (targetOffset.left - canvasOffset.left + targetWidth + 4), top: (targetOffset.top - canvasOffset.top - 4), height: (targetHeight + 8) });
            }

            console.log($scope);
            $scope.resizeSelectedInspector = function () {
                if ($scope.lastClicked == null) return;
                $scope.setSelectedElement($scope.lastClicked, $scope.currentSelectorElements, false);
            };
        }

        function link(scope, element, attrs) {

            var elements = scope.selectorElements;
            var current = scope.currentSelectorElements;

            element.mouseover(function (event) {
                if (event.target.id.indexOf('selector') !== -1) return;
                var $target = $(event.target);
                scope.setSelectedElement($target, elements, false);

            });

            var DELAY = 500, clicks = 0, timer = null, editing = false, lastClicked = null;

            element.on('keydown', 'div[contenteditable="true"]', function (e) {
                // trap the return key being pressed
                if (e.keyCode == 13) {
                    // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
                    document.execCommand('insertHTML', false, '<br/><br/>');
                    // prevent the default behaviour of return key pressed
                    return false;
                }
            });

            element.on("click", function (event) {
                if (event.target.id.indexOf('selector') !== -1) return;

                clicks++;
                var $target = $(event.target);
                scope.lastClicked = $target;

                if (clicks === 1) {

                    timer = setTimeout(function () {
                        current.inspector.show();
                        scope.setSelectedElement($target, current, true);  //perform single-click action    
                        if (editing && typeof $target.attr('contenteditable') == 'undefined') { cleanNodes(); }
                        clicks = 0;             //after action performed, reset counter

                    }, DELAY);

                } else {

                    clearTimeout(timer);    //prevent single-click action
                    if (editing && typeof $target.attr('contenteditable') == 'undefined') {
                        cleanNodes();
                        setContentEditable($target);
                    } else if (editing) {

                    } else {
                        setContentEditable($target);
                    }
                    clicks = 0;             //after action performed, reset counter
                }

            }).on("dblclick", function (event) {
                event.preventDefault();  //cancel system double-click event
            });


            window.onresize = scope.resizeSelectedInspector;

            function setContentEditable($target) {
                $('.ui-draggable').draggable('disable');
                $target.attr('contenteditable', "true").focus();
                $target.addClass('ce');
                current.inspector.hide();
                editing = true;
                //clearSelection();
            }

            function hideSelectedElement() {
                current.inspector.hide();
            }

            function cleanNodes() {
                element.find("*").removeAttr("contenteditable");
                $('.ui-draggable').draggable('enable');
                current.inspector.show();
            }

            function clearSelection() {
                if (document.selection && document.selection.empty) {
                    document.selection.empty();
                } else if (window.getSelection) {
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                }
            }

        }
    } ]);

})();

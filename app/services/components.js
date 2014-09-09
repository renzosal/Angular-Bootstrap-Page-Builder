(function () {
    'use strict';

    var serviceId = 'components';
    angular.module('builder').factory(serviceId, [components]);

    function components() {

        var _components = {};

        add("bs-panel", { name: 'Panel', id: 'c-panel', isDroppable: true, droppables: ['.panel-body'], disableHoverOn: ['.panel-body'], html: '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h3 class="panel-title">Panel title</h3>\n  </div>\n  <div class="panel-body"></div>\n</div>' });
        add("bs-list-group", { name: 'List Group', id: 'c-list-group', html: '<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>' });
        add("bs-progress-bar", { name: 'Progress Bar', id: 'c-progress-bar', isDroppable: false, disableHoverOn: ['.progress-bar', 'span'], html: '<div class="progress">  <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">    <span class="sr-only">45% Complete</span>  </div></div>' });
        add("bs-page-header", { name: 'Page Header', id: 'c-page-header', html: '<div class="page-header"><h1>Page Title<small>Subtext for header</small></h1></div>' });
        add("bs-pager", { name: 'Pager', id: 'c-pager', html: '' });
        add("bs-breadcrumbs", { name: 'Breadcrumbs', id: 'c-breadcrumbs', html: '' });
        add("bs-tabs", { name: 'Tabs', id: 'c-tabs', isDroppable: true, droppables: ['.panel-body > div'], disableHoverOn: ['.panel-body'], html: '<div class="panel panel-tabs panel-default">                            <!-- Nav tabs -->    <ul class="nav nav-tabs">        <li class="active" ><a href="#Tab1">Tab 1</a></li>			         <li><a href="#profile">Tab 2</a></li>                                </ul>                                  <!-- Tab panes -->    <div class="panel-body tab-content">      <div class="active" id="Tab2">Content 1</div>      <div class="" id="profile">Content 2</div>    </div></div>' });
        add("bs-input-group", { name: 'Input Group', id: 'c-input-group', html: '' });
        add("bs-input", { name: 'Input', id: 'c-input', disableHoverOn: ['input'], html: '  <div class="form-group">    <label class="col-sm-2 control-label">Label</label>    <div class="col-sm-10">      <input type="text" class="form-control" placeholder="placeholder">    </div> <div class="clearfix"></div> </div>',
            properties: [{
                name: "Type",
                key: "type",
                html_attr: "type",
                targetElement: 'input',
                possibleValues: ['text', 'password', 'email'],
                val: 'text',
                widgettype: 'select',
                widgetdata: {
                    items: [{
                        value: "text",
                        text: "Text"
                    }, {
                        value: "password",
                        text: "Password"
                    }, {
                        value: "email",
                        text: "Email"
                    }]
                }
            }, {
                name: "Placeholder",
                key: "placeholder",
                html_attr: "placeholder",
                targetElement: 'input',
                val: 'placeholder',
                widgettype: 'input'
            }]
        });
        add("bs-btn-group", { name: 'Button Group', id: 'c-btn-group', html: '<div class="btn-group"><a href="#" class="btn btn-default">Button 1</a><a href="#" class="btn btn-default">Button 2</a><a href="#" class="btn btn-default">Button 3</a></div>' });
        add("bs-dropdown", { name: 'Dropdown', id: 'c-dropdown', html: '' });
        add("bs-img", { name: 'Image', id: 'c-img', html: '<img src="https://s3.amazonaws.com/jetstrap-site/images/website/index/what_icon.png">' });
        add("bs-select", { name: 'Select', id: 'c-select', disableHoverOn: ['select', '.clearfix'], html: '  <div class="form-group">    <label class="col-sm-2 control-label">Label</label>    <div class="col-sm-10">      <select class="form-control"><option>Select</option></select>    </div> <div class="clearfix"></div> </div>' });
        add("bs-btn", { name: 'Button', id: 'c-btn', isDroppable: false, html: '<a class="btn">Button Input</a>',
            properties: [{
                name: "Type",
                key: "type",
                html_attr: "class",
                possibleValues: ['btn-default', 'btn-primary'],
                val: 'btn-default',
                widgettype: 'select',
                widgetdata: {
                    items: [{
                        value: "btn-default",
                        text: "Default"
                    }, {
                        value: "btn-primary",
                        text: "Primary"
                    }]
                }
            },{
                name: "Size",
                key: "size",
                html_attr: "class",
                possibleValues: ['btn-lg', 'btn-sm', 'btn-xs'],
                val: "",
                widgettype: 'select',
                widgetdata: {
                    items: [{
                        value: "",
                        text: "Default"
                    }, {
                        value: "btn-lg",
                        text: "Large"
                    },{
                        value: "btn-sm",
                        text: "Small"
                    },{
                        value: "btn-xs",
                        text: "Extra Small"
                    }]
                }
            }]
        });
        add("bs-form", { name: 'Form', id: 'c-form', html: '' });
        add("bs-table", { name: 'Table', id: 'c-table', isDroppable: true, droppables: ['td'], disableHoverOn: ['td'], html: '<table class="table table-striped"><thead><tr><th>Column 1</th><th>Column 2</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>' });
        add("bs-list", { name: 'List', id: 'c-list', html: '' });
        add("bs-alert", { name: 'Alert', id: 'c-alert', disableHoverOn: ['.close', '.close > span'], html: '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><strong>Well done!</strong> You successfully read this important alert message.</div>',
            properties: [{
                name: "Type",
                key: "type",
                html_attr: "class",
                possibleValues: ['alert-success', 'alert-info', 'alert-warning', 'alert-danger'],
                val: 'alert-success',
                widgettype: 'select',
                widgetdata: {
                    items: [{
                        value: "alert-success",
                        text: "Success"
                    }, {
                        value: "alert-info",
                        text: "Info"
                    }, {
                        value: "alert-warning",
                        text: "Warning"
                    }, {
                        value: "alert-danger",
                        text: "Error"
                    }]
                }
            }]
        });
        add("bs-p", { name: 'Paragraph', id: 'c-p', html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' });
        add("bs-grid-row", { name: 'Grid Row', id: 'c-grid-row', isDroppable: true, droppables: ['.row-col'], disableHoverOn: ['.row-col', '.placeholder'], html: '<div class="row"><div class="col-md-6 row-col"></div><div class="col-md-6 row-col"></div></div>',
            properties: [{
                name: "Grid",
                key: "grid",
                html_attr: "custom",
                val: '6-6',
                widgettype: 'select',
                widgetdata: {
                    items: [{
                        value: "6-6",
                        text: "6-6"
                    }, {
                        value: "4-4-4",
                        text: "4-4-4"
                    }, {
                        value: "3-3-3-3",
                        text: "3-3-3-3"
                    }, {
                        value: "8-4",
                        text: "8-4"
                    }, {
                        value: "4-8",
                        text: "4-8"
                    }, {
                        value: "9-3",
                        text: "9-3"
                    }, {
                        value: "3-9",
                        text: "3-9"
                    }, {
                        value: "10-2",
                        text: "10-2"
                    }, {
                        value: "2-10",
                        text: "2-10"
                    }]
                }
            }]
         });
        add("bs-heading", { name: 'Heading', id: 'c-heading', html: '<h1>Heading</h1>',
            properties: [{
                name: "Size",
                key: "size",
                html_attr: "node",
                val: 'h1',
                widgettype: 'select',
                widgetdata: {
                    items: [{
                        value: "h1",
                        text: "H1"
                    }, {
                        value: "h2",
                        text: "H2"
                    }, {
                        value: "h3",
                        text: "H3"
                    }, {
                        value: "h4",
                        text: "H4"
                    }, {
                        value: "h5",
                        text: "H5"
                    }, {
                        value: "h6",
                        text: "H6"
                    }]
                }
            }] });


        var service = {
            add: add,
            get: get,
            all: all
        };

        return service;


        function add(type, obj) {
            _components[type] = obj;
        };

        function get(type) {
            return _components[type];
        }

        function all() {
            return _components;
        }
    }
})();
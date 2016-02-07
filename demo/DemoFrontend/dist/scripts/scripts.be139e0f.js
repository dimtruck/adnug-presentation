"use strict";angular.module("studentApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","checklist-model","ui.bootstrap-slider"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$logProvider",function(a,b,c,d,e){var f=angular.injector(["ng"]).get("$log");f.info("In bootstrap config ","state provider: ",a,"url router: ",b,"location provider: ",c,"http provider: ",d),c.html5Mode(!0)}]).run(["$rootScope","$location","$log",function(a,b,c){c.info("in run method for bootstrap",b,a,b.$$path),a.$on("$stateChangeStart",function(a,d){c.info("run::executed state change check.",a,d),b.path(b.$$path)})}]),angular.module("studentApp").config(["$stateProvider","$logProvider",function(a,b){var c=angular.injector(["ng"]).get("$log");c.info("in main router (part of config bootstrap)",a),a.state("main",{url:"/",views:{"":{templateUrl:"views/main.html"},"content@main":{templateUrl:"views/content.html",controller:"MainCtrl"},"secondary-nav@main":{templateUrl:"views/secondaryNav.html"},"main-nav@main":{templateUrl:"views/mainNav.html"}}})}]),angular.module("studentApp").factory("StudentService",["$location","$rootScope","$http","$q","$log",function(a,b,c,d,e){return e.info("In StudentService factory"),{getStudents:function(a){e.info("In StudentService.getStudents().  Try to retrieve.");var b=a||angular.noop,f=d.defer();return c.get("api/students").success(function(a){return e.info('StudentService.getStudents()::Got back a "successful" response with: ',a),f.resolve(a),b()}).error(function(a){return e.error('StudentService.getStudents()::Got back a "failed" response with: ',a),f.reject(a),b(a)}.bind(this)),f.promise},addStudent:function(a,b){},addGradeForStudent:function(a,b,c,d){},getClasses:function(a,b){},createInstance:function(a,b,f){e.info("In ReposeService.createInstance().  Try to insert for: ",a,b);var g=f||angular.noop,h=d.defer();return c.post("/app/versions/"+a,b).success(function(a){return e.info('ReposeService.createInstance()::Got back a "successful" response with: ',a),h.resolve(a),g()}).error(function(a){return e.error('ReposeService.createInstance()::Got back a "failed" response with: ',a),h.reject(a),g(a)}.bind(this)),h.promise},stopInstance:function(a,b){e.info("In ReposeService.stopInstance().  Try to remove: ",a);var f=b||angular.noop,g=d.defer();return c.get("/app/repose/stop/"+a).success(function(a){return e.info('ReposeService.stopInstance()::Got back a "successful" response with: ',a),g.resolve(a),f()}).error(function(a){return e.error('ReposeService.stopInstance()::Got back a "failed" response with: ',a),g.reject(a),f(a)}.bind(this)),g.promise},startInstance:function(a,b){e.info("In ReposeService.startInstance().  Try to start: ",a);var f=b||angular.noop,g=d.defer();return c.get("/app/repose/start/"+a).success(function(a){return e.info('ReposeService.startInstance()::Got back a "successful" response with: ',a),g.resolve(a),f()}).error(function(a){return e.error('ReposeService.startInstance()::Got back a "failed" response with: ',a),g.reject(a),f(a)}.bind(this)),g.promise},makeRequest:function(a,b,f){e.info("In ReposeService.makeRequest().  Try to insert for: ",a,b);var g=f||angular.noop,h=d.defer();return c.post("/app/repose/test/"+a,b).success(function(a){return e.info('ReposeService.makeRequest()::Got back a "successful" response with: ',a),h.resolve(a),g()}).error(function(a){return e.error('ReposeService.makeRequest()::Got back a "failed" response with: ',a),h.reject(a),g(a)}.bind(this)),h.promise}}}]),angular.module("studentApp").directive("students",["StudentService","$location","$log",function(a,b,c){return{templateUrl:"views/students.html",restrict:"E",link:function(b,d,e){console.log("students:",b,d,e),b.showClasses=function(d){c.info("showClasses called: ",d),a.getClasses(d.id).then(function(a){console.log("students:",b.students),c.info("students StudentService.showClasses::got back classes: ",b.students)})["catch"](function(a){c.error("students StudentService.showClasses::Got an error: ",a)})}}}}]),angular.module("studentApp").controller("MainCtrl",["$scope","$log","StudentService",function(a,b,c){b.info("In Main Ctrl"),a.ui={waitingForLoad:!0,studentFetchError:!1},c.getStudents().then(function(c){a.ui.waitingForLoad=!1,a.students=c,b.info("MainCtrl StudentService.getStudents::got back students: ",c)})["catch"](function(c){a.ui.waitingForLoad=!1,a.ui.studentFetchError=!0,b.error("MainCtrl StudentService.getStudents::Got an error: ",c)})}]),angular.module("studentApp").run(["$templateCache",function(a){a.put("views/content.html",'<div class="rs-container"> <div class="rs-main rs-panel"> <div class="rs-content rs-panel"> <div class="rs-inner"> <h2 class="rs-page-title">Students</h2> <students></students> <div class="rs-table-overlay rs-table-overlay-loading" data-ng-if="ui.waitingForLoad"> <div class="rs-table-overlay-content"> <div class="rs-table-overlay-message"> Loading Students&hellip; </div> </div> </div> <div class="rs-table-overlay" data-ng-if="ui.studentFetchError"> <div class="rs-table-overlay-content"> <div class="rs-table-overlay-title"><h3>Sorry, something went wrong when trying to list your students.</h3></div> <div class="rs-table-overlay-message"> <p>You can try to list them again, but you may need to contact support if the problem persists.</p> <p class="table-overlay-btn-group"> <button class="rs-btn" data-ng-click="clusters.forceFetchStudents()">Try Again</button> </p> </div> </div> </div> </div> </div> </div> </div>'),a.put("views/create.html",'<div class="rs-wrapper"> <div data-ui-view="main-nav"></div> <div data-ui-view="secondary-nav"></div> <div data-ui-view="content"></div> </div> <div data-ui-view="footer"></div>'),a.put("views/createRepose.html",'<div class="rs-detail-section-header"> <h2 class="rs-page-title">Create Instance</h2> </div> <div class="rs-detail-section-body"> <div class="rs-control-group error" data-ng-show="create.errorMessage !== \'\'"> <strong class="rs-help-block">{{ ui.errorMessage }}</strong> </div> <div class="rs-control-group" data-ng-class="{\'error\': createForm.$submitted && createForm.name.$invalid}"> <label for="version" class="rs-control-label">Repose Version</label> <div class="rs-controls"> <select class="rs-input-medium" name="version" id="version" required data-ng-model="newInstance.version" data-ng-change="getFilters()"> <option data-ng-repeat="version in repose.availableVersions" value="{{version}}">{{version}}</option> </select> </div> </div> </div>'),a.put("views/create_content.html",'<div class="rs-container"> <div class="rs-back-link"> <a data-ui-sref="main" data-ng-show="ui.isChildState">Back to Instances</a> </div> <div class="rs-main rs-panel"> <div class="rs-sidebar rs-pull-right"> <div class="rs-inner"> <h3>Creating an Instance</h3> <h4>Repose Test Instance</h4> <p>To evaluate Repose, you can select the filters you\'d like to evaluate, plug in some data (a lot of required elements are filled in by default but you can update it as needed), and run requests against your configuration set. You can also then run performance tests to validate that the performance is up to your liking. Finally, you\'re able to download the configurations to plug them into your own Repose instance.</p> <p><a href="https://repose.atlassian.net/wiki/">Repose wiki</a></p> </div> </div> <div class="rs-content rs-panel"> <form name="createForm" data-ng-submit="createForm.$valid && createInstance()" class="rs-form-horizontal" novalidate> <div class="rs-detail-section"> <create-repose></create-repose> <get-filters></get-filters> <component></component> </div> <div class="rs-detail-section"> <div class="rs-detail-section-header rs-btn-group"> <button type="submit" class="save rs-btn rs-btn-primary">Create Instance</button> <button class="rs-btn rs-btn-link" data-ui-sref="^">Cancel</button> </div> </div> </form> </div> </div> </div>'),a.put("views/create_file_modal.html",'<div class="modal-header"> </div> <h3 class="modal-title">Repose Progress!</h3> <div class="modal-body"> <div ng-switch="status"> <span class="rs-status rs-status-error" ng-switch-when="error">Error</span> <span class="rs-status rs-status-processing" ng-switch-when="building">Building</span> <span class="rs-status rs-status-ok" ng-switch-when="success">Active</span> </div> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="ok()" data-ng-if="status==\'success\'">Go to Detail</button> <button class="btn btn-warning" type="button" ng-click="cancel()" data-ng-if="status!==\'success\'">Cancel</button> </div>'),a.put("views/getReposeFilters.html",'<div class="rs-control-group" data-ng-show="ui.versionSelected"> <div class="rs-control-group"> <label class="rs-control-label">Filters</label> <div class="rs-controls"> <label class="rs-checkbox" data-ng-repeat="filter in repose.availableFilters"> <input type="checkbox" checklist-model="newInstance.selectedFilters" checklist-value="filter"> {{ filter }} </label> <button class="rs-btn rs-btn-primary" type="button" data-ng-click="getComponent()">Load filters</button> </div> </div> </div>'),a.put("views/internal.html",'<repose-cards></repose-cards> <div class="rs-table-overlay rs-table-overlay-loading" data-ng-if="ui.waitingForLoad"> <div class="rs-table-overlay-content"> <div class="rs-table-overlay-message">Loading&hellip;</div> </div> </div> <div class="rs-table-overlay" data-ng-if="ui.reposeFetchError"> <div class="rs-table-overlay-content"> <div class="rs-table-overlay-title"><h3>Sorry, something went wrong when trying to list your Repose instances.</h3></div> <div class="rs-table-overlay-message"> <p>You can try to list them again, but you may need to contact support if the problem persists.</p> <p class="table-overlay-btn-group"> <button class="rs-btn" data-ng-click="forceFetchReposes()">Try Again</button> </p> </div> </div> </div>'),a.put("views/intra_filter_modal.html",'<div class="modal-header"> </div> <h3 class="modal-title">Intra Filter Logs!</h3> <div class="modal-body"> <div class="rs-control-group rs-embedded-list-table-wrapper rs-embedded-medium"> <table class="rs-list-table rs-embedded-list-table"> <thead> <tr> <th><span class="rs-table-sort-text">Filter Direction</span></th> <th><span class="rs-table-sort-text">Timestamp</span></th> <th><span class="rs-table-sort-text">Current Filter</span></th> <th><span class="rs-table-sort-text">Request Method</span></th> <th><span class="rs-table-sort-text">Request URI</span></th> <th><span class="rs-table-sort-text">Request Body</span></th> <th><span class="rs-table-sort-text">Response Code</span></th> <th><span class="rs-table-sort-text">Response Body</span></th> <th><span class="rs-table-sort-text">Headers</span></th> </tr> </thead> <tbody> <tr data-ng-repeat="filter in filters"> <td class="rs-table-text"><p ng-bind-html="filter[\'preamble\'] | filterDirection"></p></td> <td class="rs-table-text">{{filter[\'timestamp\']}}</td> <td class="rs-table-text">{{filter[\'currentFilter\']}}</td> <td class="rs-table-text">{{filter[\'httpMethod\']}}</td> <td class="rs-table-text">{{filter[\'requestURI\']}}</td> <td class="rs-table-text">{{filter[\'requestBody\']}}</td> <td class="rs-table-text">{{filter[\'httpResponseCode\']}}</td> <td class="rs-table-text">{{filter[\'responseBody\']}}</td> <td class="rs-table-text"><p ng-bind-html="filter[\'headers\'] | responseHeaders "></p></td> </tr> </tbody> </table> </div> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="dismiss()">Dismiss</button> </div>'),a.put("views/log_modal.html",'<div class="modal-header"> </div> <h3 class="modal-title">{{ header }}</h3> <div class="modal-body" data-ng-repeat="log_entry in data track by $index"> <p>{{ log_entry }}</p> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="dismiss()">Dismiss</button> </div>'),a.put("views/login.html",'<div class="container-fluid"> <div class="row"> <div class="col-xs-6 col-xs-offset-3 vertical-align"> <div id="login_wrapper"> <div class="row"> <div class="col-md-6" id="rackspace_logo_container"></div> <div class="col-md-6" id="auth_login_block"> <form ng-submit="login(form)" class="form" name="form" novalidate> <div class="rs-control-group error" ng-if="result"> <span class="rs-validation-block">{{ result }}</span> </div> <div class="form-group"> <label for="username">Username:</label> <input type="text" class="form-control" ng-model="user.username" ng-required placeholder="Please enter your Rax cloud user id."> </div> <div class="form-group"> <label for="password">Password:</label> <input type="password" class="form-control" ng-model="user.password" ng-required placeholder="Please enter your Rax cloud password."> </div> <div class="form-group has-error"> <p class="help-block" ng-show="form.username.$error.required && form.password.$error.required && submitted">Please enter your username and password.</p> <p class="help-block" ng-show="form.username.$error.username && submitted">Please enter a valid username.</p> <p class="help-block" ng-repeat="err in errors.other">{{ err }}</p> </div> <div> <button type="submit" class="btn btn-danger">Submit</button> </div> </form> </div> </div> </div> </div> </div> </div>'),a.put("views/main.html",'<div class="rs-wrapper"> <div data-ui-view="main-nav"></div> <div data-ui-view="secondary-nav"></div> <div data-ui-view="content"></div> </div> <div data-ui-view="footer"></div>'),a.put("views/mainMenu.html",'<nav class="navbar navbar-inverse navbar-fixed-top"> <div class="container-fluid"> <!-- Brand and toggle get grouped for better mobile display --> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <!-- Collect the nav links, forms, and other content for toggling --> <div class="collapse navbar-collapse" id="main-navbar"> <ul class="nav navbar-nav"> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Cloud Control Panel <span class="caret"></span></a> <ul class="dropdown-menu dropdown-inverse" role="menu"> <li><a href="#">Action</a></li> <li><a href="#">Another action</a></li> <li><a href="#">Something else here</a></li> <li class="divider"></li> <li><a href="#">Separated link</a></li> <li class="divider"></li> <li><a href="#">One more separated link</a></li> </ul> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li><a href="#">Feedback</a></li> <li><a href="#"><i class="fa fa-life-ring"></i>&nbsp;Support</a></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Account: {{ username }} <span class="caret"></span></a> <ul class="dropdown-menu dropdown-inverse" role="menu"> <li><a href="#">Account #{{ tenant }}</a></li> <li class="divider"></li> <li><a href="#">Help</a></li> <li class="divider"></li> <li><a href="#" ng-click="logout()">Logout</a></li> </ul> </li> </ul> </div><!-- /.navbar-collapse --> </div><!-- /.container-fluid --> </nav>'),a.put("views/mainNav.html",'<div class="rs-nav-utility"> <nav class="navbar navbar-inverse navbar-fixed-top"> <div class="container-fluid"> <!-- Brand and toggle get grouped for better mobile display --> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <!-- Collect the nav links, forms, and other content for toggling --> <div class="collapse navbar-collapse" id="main-navbar"> <ul class="nav navbar-nav"> <li> <a href="/"><span>Austin .NET User Group Demo</span></a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li><a href="#">Feedback</a></li> <li><a href="#"><i class="fa fa-life-ring"></i>&nbsp;Help</a></li> </ul> </div><!-- /.navbar-collapse --> </div><!-- /.container-fluid --> </nav> </div>'),a.put("views/makeRequest.html",'<div class="rs-detail-section-header"> <h2 class="rs-page-title">Request</h2> </div> <div class="rs-detail-section-body"> <div class="rs-control-group"> <label class="rs-control-label">URI</label> <div class="rs-controls"> <input type="url" name="url" id="url" value="/"> <span class="rs-validation-inline">Example, /v2/servers to make a request to v2/servers URI (don\'t worry about the domain)!</span> </div> </div> <div class="rs-control-group"> <label class="rs-control-label">Method</label> <div class="rs-controls"> <select class="rs-input-medium" name="method" id="method" required> <option data-ng-repeat="method in methods" value="{{method}}">{{method}}</option> </select> </div> </div> <div class="rs-control-group"> <label class="rs-control-label">Headers</label> <div class="rs-controls" data-ng-repeat="header in headers"> <input type="text" placeholder="header name" name="header_names[{{ $index }}]"> <input type="text" placeholder="header value" name="header_values[{{ $index }}]"> <button class="rs-btn rs-btn-primary" data-ng-click="addOneToList(headers)" ng-if="$last">Add another</button> <button class="rs-btn" data-ng-click="removeOneFromList(headers, $index)" ng-if="!$first">Remove</button> </div> </div> <div class="rs-control-group"> <label class="rs-control-label">Body</label> <div class="rs-controls"> <textarea type="url" name="body" id="body" value="/"></textarea> </div> </div> </div>'),a.put("views/reposeCards.html",'<div class="repose-cards" data-ng-show="!ui.reposeFetchError && !ui.waitingForLoad"> <div class="repose-card add-new" data-ui-sref="create"> Add Repose Instance&hellip; </div> <div class="repose-card" data-ng-repeat="repose in reposes track by repose.repose_name"> <div class="card-header"> <div class="card-subtitle">Repose Instance</div> <h3 class="card-title">{{ repose.repose_name }}</h3> </div> <div class="card-body"> <div class="details-trio"> <div class="repose-configs"> <div class="details-header">Version</div> <span>{{ repose.version }}</span> </div> <div class="repose-autoscale"> <div class="details-header">Status</div> <span class="rs-status rs-status-ok" data-ng-show="repose.status==\'Running\'">{{ repose.status }}</span> <span class="rs-status rs-status-error" data-ng-show="repose.status!==\'Running\'">{{ repose.status }}</span> </div> <div class="repose-metrics"> <div class="details-header">Data</div> <span>{{ repose.message }}</span> </div> </div> </div> <div class="card-footer rs-btn-group"> <div class="button-wrap"> <!-- TODO: add ui route for configuration --> <button class="rs-btn btn-footer rs-btn-primary" data-ng-class="{\'disabled\': repose.status!==\'Running\'}" data-ng-click="viewConfiguration()">Configuration</button> <!-- TODO: add button function for start --> <button class="rs-btn btn-footer rs-btn-login" data-ng-show="repose.status==\'Running\'" data-ng-click="stop(repose)">Stop</button> <button class="rs-btn btn-footer rs-btn-login" data-ng-show="repose.status!==\'Running\'" data-ng-click="start(repose)">Start</button> <button class="rs-btn btn-footer" data-ng-class="{\'disabled\': repose.status!==\'Running\'}" data-ui-sref="test({repose_id: repose.id})">Test</button> <!-- TODO: add ui route for benchmark --> <button class="rs-btn btn-footer" data-ng-class="{\'disabled\': repose.status!==\'Running\'}" data-ng-click="benchmark()">Benchmark</button> </div>  </div> </div> </div>'),a.put("views/reposeFilter.html",'<div class="rs-control-group"><!-- repose filter --> </div>'),a.put("views/reposeItem.html",'<div class="rs-control-group" style="position:relative; margin-left:2em"> <!-- reposeItem --> </div>'),a.put("views/reposeLabel.html",'<label class="rs-control-label" ng-class="{\'rs-detail-section-title\': reposetitle === \'true\' }"> <!-- repose label --> {{ value }} <span style="color:red" ng-if="required == \'true\'">*</span> <i ng-if="doc && doc !== \'undefined\'" class="rs-icon-help" title="{{ doc }}"></i> </label>'),a.put("views/reposeTable.html",'<div class="rs-control-group" style="position:relative; margin-left:2em"> <!-- repose-list --> <table class="rs-list-table"> <thead> <tr> <th ng-repeat="item in fields"> <span class="rs-table-sort-text"> <repose-label value="{{ item.name }}" required doc="{{ item.doc }}"> </span> </th> <th> <span class="rs-table-sort-text">Actions</span> </th> </tr> </thead> <tbody> <tr ng-repeat="element in list track by $index"> <td class="rs-table-text" ng-repeat="field in fields" ng-switch="field.type"> <input type="text" ng-switch-when="string" filter-name="{{ filterName }}" xsd-type="{{ element[field.name][\'xsd-type\'] }}" name="{{ prefix }}{{ element[field.name].name }}[{{ $parent.$parent.$index }}]" value=""> <slider ng-switch-when="double" filter-name="filterName" xsd-type="element[field.name][\'xsd-type\']" ng-model="list[\'index_\' + $parent.$parent.$index]" name="{{ prefix }}{{ element[field.name].name }}[{{ $parent.$parent.$index }}]" min="element[field.name].minInclusive" step="0.1" max="element[field.name].maxInclusive" value="element[field.name].default"></slider> <input ng-switch-when="boolean" filter-name="{{ filterName }}" xsd-type="{{ element[field.name][\'xsd-type\'] }}" type="checkbox" name="{{ prefix }}{{ element[field.name].name }}[{{ $parent.$parent.$index }}]"> <input ng-switch-when="anyURI" filter-name="{{ filterName }}" xsd-type="{{ element[field.name][\'xsd-type\'] }}" type="url" name="{{ prefix }}{{ element[field.name].name }}[{{ $parent.$parent.$index }}]" value=""> <select ng-switch-when="select" filter-name="{{ filterName }}" xsd-type="{{ element[field.name][\'xsd-type\'] }}" class="rs-input-medium" name="{{ prefix }}{{ element[field.name].name }}[{{ $parent.$parent.$index }}]"> <option data-ng-repeat="option in field.enumeration" value="{{option}}">{{option}}</option> </select> <select multiple ng-switch-when="multi-select" filter-name="{{ filterName }}" xsd-type="{{ element[field.name][\'xsd-type\'] }}" class="rs-input-medium" name="{{ prefix }}{{ element[field.name].name }}[{{ $parent.$parent.$index }}]"> <option data-ng-repeat="option in field.enumeration" value="{{option}}">{{option}}</option> </select> </td> <td class="rs-table-text"> <button class="rs-btn rs-btn-primary" data-ng-click="addOneToList(list)" ng-if="$last">Add another</button> <button class="rs-btn" data-ng-click="removeOneFromList(list, $index)" ng-if="!$first">Remove</button> </td> </tr> </tbody> </table> </div>'),a.put("views/secondaryNav.html",'<div class="rs-nav-primary"> <div class="rs-container"> <div class="rs-nav-brand"> <img height="50px" src="https://pbs.twimg.com/profile_images/2205464963/atxdnug_400x400.png" alt="ADNUG Logo"> </div> <ul class="rs-nav"> <li class="rs-nav-item"> <a data-ui-sref="main" class="rs-nav-link">Students</a> </li> </ul> </div> </div>'),a.put("views/students.html",'<div class="rs-control-group" data-ng-show="!ui.studentFetchError && !ui.waitingForLoad"> <table class="rs-list-table"> <thead> <tr> <th> <span class="rs-table-sort-text">Student ID</span> </th> <th> <span class="rs-table-sort-text">Name</span> </th> <th> <span class="rs-table-sort-text">GPA</span> </th> <th> <span class="rs-table-sort-text">Classes</span> </th> </tr> </thead> <tbody> <tr ng-repeat="student in students track by $index"> <td class="rs-table-text">{{ id }}</td> <td class="rs-table-text">{{ name }}</td> <td class="rs-table-text">{{ gpa }}</td> <td class="rs-table-text"> <button class="rs-btn rs-btn-primary" data-ng-click="showClasses(student)">Show</button> </td> </tr> </tbody> </table> </div>'),a.put("views/test.html",'<div class="rs-wrapper"> <div data-ui-view="main-nav"></div> <div data-ui-view="secondary-nav"></div> <div data-ui-view="content"></div> </div> <div data-ui-view="footer"></div>'),a.put("views/testResponse.html",'<div class="rs-control-group"> <div class="rs-control-group"> <label class="rs-control-label">Responses</label> </div> <div class="rs-control-group" data-ng-repeat="response in responses"> <label class="rs-control-label">{{ response }}</label> </div> </div>'),a.put("views/test_content.html",'<div class="rs-container"> <div class="rs-back-link"> <a data-ui-sref="main" data-ng-show="ui.isChildState">Back to Instances</a> </div> <div class="rs-main rs-panel"> <div class="rs-sidebar rs-pull-right"> <div class="rs-inner"> <h3>Test your Instance</h3> <h4>Repose Test Instance</h4> <p>To evaluate your Repose instance, you can put in a request and view what Repose does inside!</p> <p><a href="https://repose.atlassian.net/wiki/">Repose wiki</a></p> </div> </div> <div class="rs-content rs-panel"> <form name="testReposeForm" id="testReposeForm" data-ng-submit="testReposeForm.$valid && testReposeInstance()" class="rs-form-horizontal" novalidate> <div class="rs-detail-section"> <!-- make request --> <make-request></make-request> <div class="rs-detail-section-header rs-btn-group"> <button type="submit" class="save rs-btn rs-btn-primary">Test</button> </div> </div> </form> <!-- response list --> <div class="rs-control-group"> <div class="rs-control-group"> <label class="rs-control-label">Responses</label> </div> <div class="rs-control-group rs-embedded-list-table-wrapper rs-embedded-medium"> <table class="rs-list-table rs-embedded-list-table"> <thead> <tr> <th><span class="rs-table-sort-text">Request Id</span></th> <th><span class="rs-table-sort-text">Request Method</span></th> <th><span class="rs-table-sort-text">Request URL</span></th> <th><span class="rs-table-sort-text">Request Headers</span></th> <th><span class="rs-table-sort-text">Request Body</span></th> <th><span class="rs-table-sort-text">Response Code</span></th> <th><span class="rs-table-sort-text">Response Body</span></th> <th><span class="rs-table-sort-text">Response Headers</span></th> <th><span class="rs-table-sort-text">Intra Filter</span></th> <th><span class="rs-table-sort-text">Inter service</span></th> <th><span class="rs-table-sort-text">Errors</span></th> <th> <span class="rs-table-sort-text">Actions</span> </th> </tr> </thead> <tbody> <tr data-ng-repeat="response in responses"> <td class="rs-table-text">{{$index }}</td> <td class="rs-table-text">{{response[\'request\'][\'method\']}}</td> <td class="rs-table-text">{{response[\'request\'][\'url\']}}</td> <td class="rs-table-text">{{response[\'request\'][\'headers\'] | requestHeaders }}</td> <td class="rs-table-text">{{response[\'request\'][\'body\']}}</td> <td class="rs-table-text">{{response[\'response\'][\'responseStatus\']}}</td> <td class="rs-table-text">{{response[\'response\'][\'responseBody\']}}</td> <td class="rs-table-text"><p ng-bind-html="response[\'response\'][\'responseHeaders\'] | responseHeaders "></p></td> <td class="rs-table-text"> <button class="rs-btn" data-ng-click="showIntraFilter(response)">Show</button> </td> <td class="rs-table-text"> <button class="rs-btn" data-ng-click="showHttp(response)">Show</button> </td> <td class="rs-table-text"> <button class="rs-btn" data-ng-click="showErrors(response)">Show</button> </td> <td class="rs-table-text"> <button class="rs-btn" data-ng-click="removeOneFromList(responses, $index)">Remove</button> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>')}]);
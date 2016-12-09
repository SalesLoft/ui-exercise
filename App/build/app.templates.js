angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('js/components/cadenceList/cadenceList.template.html',
    "<h1>{{vm.tableData}}</h1>"
  );

}]);

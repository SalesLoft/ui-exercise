angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('js/components/cadenceList/cadenceList.template.html',
    "<div class=\"cadence-list\">\n" +
    "	<header>\n" +
    "		<h1>Cadences</h1>\n" +
    "\n" +
    "	</header>\n" +
    "	<a data-ng-click=\"vm.triggerAddCadence()\">Add Cadence</a>\n" +
    "	<fieldset class=\"add-cadence\" data-ng-if=\"vm.addingCadence\">\n" +
    "		<form action=\"#\" data-ng-submit=\"vm.addNewCadence()\">\n" +
    "			<input type=\"text\" placeholder=\"Cadence Name\" data-ng-model=\"vm.newCadence.name\"/>\n" +
    "			<input type=\"text\" placeholder=\"Cadence Owner\" data-ng-model=\"vm.newCadence.owner\"/>\n" +
    "			<input class=\"float-right\" type=\"submit\" />\n" +
    "		</form>\n" +
    "	</fieldset>\n" +
    "	<table>\n" +
    "		<thead>\n" +
    "		<tr>\n" +
    "			<th>Cadence Name</th>\n" +
    "			<th>Owner</th>\n" +
    "			<th>Tags</th>\n" +
    "			<th>Stats</th>\n" +
    "		</tr>\n" +
    "		</thead>\n" +
    "		<tbody>\n" +
    "		<tr data-ng-repeat=\"c in vm.cadences\">\n" +
    "			<td>{{c.name}}</td>\n" +
    "			<td>{{c.owner}}</td>\n" +
    "			<td>\n" +
    "				<span class=\"tag\" data-ng-repeat=\"t in c.tags\">{{t}}</span>\n" +
    "			</td>\n" +
    "			<td>\n" +
    "				<span class=\"stat\" data-stat-name=\"Total\">{{c.stats.total}}</span>\n" +
    "				<span class=\"stat\" data-stat-name=\"Completed\">{{c.stats.completed}}</span>\n" +
    "				<span class=\"stat\" data-stat-name=\"Removed\">{{c.stats.removed}}</span>\n" +
    "			</td>\n" +
    "		</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "\n" +
    "</div>\n"
  );

}]);

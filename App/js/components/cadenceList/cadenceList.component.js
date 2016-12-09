/**
 * Created by drewpfundstein on 12/8/16.
 */
(function () {
	'use strict';

	angular.module('app')
		.component('cadenceList', {
			controller: CadenceListController,
			templateUrl: 'js/components/cadenceList/cadenceList.template.html',
			controllerAs: 'vm'
		});

	
	function CadenceListController() {
		var vm = this;
		
		
		activate();
		
		
		function activate() {
			vm.tableData = 'hello world';
		}
	}
})();

(function () {
	'use strict';

	angular.module('app')
		.component('cadenceList', {
			controller: CadenceListController,
			templateUrl: 'js/components/cadenceList/cadenceList.template.html',
			controllerAs: 'vm'
		});


	CadenceListController.$inject = ['dataservice'];

	
	function CadenceListController(dataservice) {
		var vm = this;
		vm.cadences = {};
		vm.addingCadence = false;
		vm.triggerAddCadence = triggerAddCadence;
		vm.addNewCadence = addNewCadence;
		vm.deleteCadence = deleteCadence;
		
		
		activate();
		
		
		function activate() {
			// dataservice.getCadences().then(function (data) {
			// 	vm.cadences = data;
			// });

			vm.cadences = [{
				name: "Some Cadence",
				owner: "Drew Pfundstein",
				tags: ['stuff', 'things'],
				stats: {
					total: 2,
					completed: 2,
					removed: 2
				}
			}];
		}

		function triggerAddCadence() {
			vm.addingCadence = !vm.addingCadence;
		}

		function addNewCadence() {
			//dataservice.saveCadence(vm.newCadence);

			vm.cadences.push(vm.newCadence);
			vm.newCadence = {};
			vm.addingCadence = false;
		}

		function deleteCadence(index) {
			//dataservice.deleteCadence(index);

			vm.cadences.splice(index, 1);
		}
	}
})();

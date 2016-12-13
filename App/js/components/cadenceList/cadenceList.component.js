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
		vm.select = select;
		vm.selectedRow = false;
		vm.isSelected = isSelected;
		vm.menuOpen = false;
		vm.toggleMenu = toggleMenu;
		vm.copyCadence = copyCadence;
		
		
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
			vm.cadences.push(vm.newCadence);
			vm.newCadence = {};
			vm.addingCadence = false;
		}

		function deleteCadence(index) {
			vm.cadences.splice(index, 1);
			vm.menuOpen = false;
		}

		function copyCadence(index) {
			vm.newCadence = angular.copy(vm.cadences[index]);
			vm.addNewCadence();
			vm.menuOpen = false;
		}




		function select(item, index) {

			if (vm.selectedRow !== index) {
				vm.selectedRow = index;
			} else {
				vm.selectedRow = false;
			}

		}
		function isSelected(index) {
			return vm.selectedRow === index;
		}
		function toggleMenu() {
			vm.menuOpen = !vm.menuOpen;
		}
	}
})();

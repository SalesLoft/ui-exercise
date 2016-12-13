(function () {
	'use strict';

	angular.module('app')
		.component('cadenceList', {
			controller: CadenceListController,
			templateUrl: 'js/components/cadenceList/cadenceList.template.html',
			controllerAs: 'vm'
		});


	CadenceListController.$inject = [];

	
	function CadenceListController() {
		var vm = this;
		vm.cadences = {};
		vm.addingCadence = false;
		vm.selectedRow = false;
		vm.menuOpen = false;

		vm.triggerAddCadence = triggerAddCadence;
		vm.addNewCadence = addNewCadence;
		vm.deleteCadence = deleteCadence;
		vm.select = select;
		vm.isSelected = isSelected;
		vm.toggleMenu = toggleMenu;
		vm.copyCadence = copyCadence;
		
		
		activate();
		
		
		function activate() {
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

		/**
		 *
		 * @param index
		 */
		function deleteCadence(index) {
			vm.cadences.splice(index, 1);
			vm.menuOpen = false;
		}

		/**
		 *
		 * @param index
		 */
		function copyCadence(index) {
			vm.newCadence = angular.copy(vm.cadences[index]);
			vm.addNewCadence();
			vm.menuOpen = false;
		}

		/**
		 *
		 * @param item
		 * @param index
		 */
		function select(item, index) {

			if (vm.selectedRow !== index) {
				vm.selectedRow = index;
			} else {
				vm.selectedRow = false;
			}

		}

		/**
		 *
		 * @param index
		 * @returns {boolean}
		 */
		function isSelected(index) {
			return vm.selectedRow === index;
		}

		function toggleMenu() {
			vm.menuOpen = !vm.menuOpen;
		}
	}
})();

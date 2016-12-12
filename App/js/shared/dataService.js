angular
	.module('app')
	.factory('dataservice', dataservice);

dataservice.$inject = ['$q'];

function dataservice($q) {
	var memData = [{
		name: "Some Cadence",
		owner: "Drew Pfundstein",
		tags: ['stuff', 'things'],
		stats: {
			total: 2,
			completed: 2,
			removed: 2
		}
	}];
	return {
		getCadences: getCadences,
		saveCadence: saveCadence
	};

	function getCadences() {
		var deferred = $q.defer();
		//faking deferred action for api compatibility
		deferred.resolve(memData);
		return deferred.promise;
	}
	function saveCadence(cadence) {
		memData.push(cadence);
	}
	function deleteCadence(index) {
		memData.splice(index, 1);
	}
}
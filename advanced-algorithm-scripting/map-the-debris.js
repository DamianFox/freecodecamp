function transform(orbit, earthRadius, GM) {
	return Math.round((2 * Math.PI) * Math.sqrt(Math.pow(orbit + earthRadius, 3) / GM));
}

function orbitalPeriod(arr) {
  	var GM = 398600.4418;
	var earthRadius = 6367.4447;
	
	return arr.map(function(space) {
		space.orbitalPeriod = transform(space.avgAlt, earthRadius, GM);
		delete space.avgAlt;
		return space;
	});
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
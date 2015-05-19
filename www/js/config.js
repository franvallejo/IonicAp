var myApp = angular.module("starter.config", []);
myApp.constant('RESOURCES', (function() {
	// Define your variable
	var resource = 'http://www.planificaciondeportiva.es/bmoll-app';
	var activeApi = '/api/web/v1';
	// Use the variable in your constants
	return {
		USERS_DOMAIN : resource,
		USERS_API : resource + activeApi,
		COUNTRIES : resource + activeApi + '/countries',
		CATEGORIES : resource + activeApi + '/categories',
		ITEMS : resource + activeApi + '/items',
		IMAGES : resource + activeApi + '/images'
	};
})());

myApp.factory("Category", function(RESOURCES, $resource) {
	//return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/countries/:id");
	return $resource(RESOURCES.CATEGORIES + "/:id", null, {
		query : {
			method : 'GET',
			isArray : true
		},
		get : {
			method : 'GET',
			isArray : true
		},
		add : {
			method : 'POST'
		},
		delete : {
			method : 'DELETE'
		},
		update : {
			method : 'PUT'
		} /*,params:{id:'@code'}*/
	});
});

myApp.factory("Item", function(RESOURCES, $resource) {
	//return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/countries/:id");
	return $resource(RESOURCES.ITEMS + "/:id", null, {
		query : {
			method : 'GET',
			isArray : true
		},
		get : {
			method : 'GET',
			isArray : true
		},
		add : {
			method : 'POST'
		},
		delete : {
			method : 'DELETE'
		},
		update : {
			method : 'PUT'
		} /*,params:{id:'@code'}*/
	});
});

myApp.factory("Images", function(RESOURCES, $resource) {
	//return $resource("http://www.planificaciondeportiva.es/bmoll-app/api/web/v1/countries/:id");
	return $resource(RESOURCES.IMAGES + "/:id", null, {
		query : {
			method : 'GET',
			isArray : true
		},
		get : {
			method : 'GET',
			isArray : true
		},
		add : {
			method : 'POST'
		},
		delete : {
			method : 'DELETE'
		},
		update : {
			method : 'PUT'
		} /*,params:{id:'@code'}*/
	});
});


/*
myApp.factory('FilmsService', function() {
	var films = [{
		title : "Captain Phillips",
		details : "In telling the story of Capt. Richard Phillips (Tom Hanks), " + "whose cargo ship was boarded by Somali pirates in 2009, " + "director Paul Greengrass doesn't stop at gripping docudrama. " + "With Hanks digging deep into the origins of an everyman's courage, " + "the film raises the bar on action thrillers."
	}, {
		title : "American Hustle",
		details : "Only that scrappy virtuoso David O. Russell could morph a film about " + "the Abscam political scandals of the late 1970s into a rollicking, " + "emotionally raw human drama. Russell regulars – Christian Bale and Amy Adams from The Fighter, " + "Jennifer Lawrence and Bradley Cooper from Silver Linings Playbook – " + "help him turn the toxic mess of life on the edge into an exhilarating gift."
	}, {
		title : "Her",
		details : "Director Spike Jonze (Being John Malkovich, Adaptation) creates movies that " + "help us see the world in startlingly funny and touching new ways. And in Her, " + "set in the near future, Theodore (a sublime, soulful Joaquin Phoenix) falls hard " + "for his computer operating system (voiced with humor, heat and heart by Scarlett Johansson) " + "and makes us believe it. This is personal filmmaking at its glorious, groundbreaking peak."
	}, {
		title : "Before Midnight",
		details : "Nothing happens as two lovers, Jesse (Ethan Hawke) and Celine (Julie Delpy), " + "continue to climb the Mount Everest of their relationship. In this story's third part, " + "after 1995's Before Sunrise and 2004's Before Sunset, director Richard Linklater and " + "pitch-perfect co-writers Hawke and Delpy create the defining love story of a generation."
	}, {
		title : "The Wolf of Wall Street",
		details : "This three-hour bolt of polarizing brilliance from Martin Scorsese, with a killer script " + "by The Sopranos' Terence Winter, details the true tale of Jordan Belfort " + "(Leonardo DiCaprio flares like a five-alarm fire in full blaze), who lived hoggishly high on securities " + "fraud in the 1990s. Jordan and his co-scumbags (Jonah Hill crushes it as his wingman)" + " numb moral qualms with coke, 'ludes and hookers. Scorsese's high-wire act of bravura " + "filmmaking is a lethally hilarious take on white-collar crime. No one dies, but Wall Street victims" + " will scream bloody murder."
	}];

	return {
		films : films,
		getFilm : function(index) {
			return films[index];
		}
	};

});
*/

myApp.factory('Camera', ['$q',
function($q) {

	return {
		getPicture : function(options) {
			var q = $q.defer();

			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);

			return q.promise;
		}
	};
}]);

/**
 * Definimos soporte de formularios para objetos JSON
 http://cacodaemon.de/index.php?id=44
 */
angular.module('starter').config(function($httpProvider) {
	$httpProvider.defaults.transformRequest = function(data) {
		var str = [];
		for (var p in data) {
			data[p] !== undefined && str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
		}
		return str.join('&');
	};
	$httpProvider.defaults.headers.put['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.config', 'ngCordova', 'ngResource', 'ui.router']).run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	
  $stateProvider.state('homelogin', {
		url : "/homelogin",
		templateUrl : "templates/homelogin.html",
		controller : "AppCtrl"
	})

  .state('app', {
		url : "/app",
		abstract : true,
		templateUrl : "templates/menu.html",
		controller : 'homeCtrl'
	})

  .state('app.home', {
		url : "/home",
		views : {
			'menuContent' : {
				templateUrl : "templates/home.html"
			}
		}
	})

  .state('app.categories', {
		url : "/categories",
		views : {
			menuContent : {
				templateUrl : "templates/categories.html",
				controller : 'CategoryListCtrl'
			}
		}
	})

  .state('app.items', {
		url : "/:category_id/:category_name",
		views : {
			'menuContent' : {
				templateUrl : "templates/items.html",
				controller : 'ItemDetailCtrl'
			}
		}
	})

  .state('app.itemsList', {
		url : "/:category_id/:category_name",
		views : {
			'menuContent' : {
				templateUrl : "templates/items_list.html",
				controller : 'ItemDetailCtrl'
			}
		}
	})

  .state('app.images', {
		url : "/:item_id/:item_name/:item_description",
		views : {
			'menuContent' : {
				templateUrl : "templates/images.html",
				controller : 'ImageDetailCtrl'
			}
		}
	})

  .state('app.edit', {
		url : "/edit",
		views : {
			'menuContent' : {
				templateUrl : "templates/edit.html",
				controller : 'SelectTabCtrl'
			}
		}
	})

  .state('app.editCategories', {
		url : '/categories/edit',
    views : {
      'menuContent' : {
        templateUrl : "templates/editCategoriesIndex.html",
        controller : 'CategoryListCtrl'
      }
    }
	})

  .state('app.editCategoriesAdd', {
		url : '/categories/add',
    views: {
      'menuContent': {
        templateUrl : "templates/addCategory.html",
        controller: 'AddCategoryCtrl'
      }
    }
	})

  .state('app.editCategoriesUpdate', {
    url : '/:id',
    views: {
      'menuContent': {
        templateUrl : "templates/updateCategory.html",
        controller: 'UpdateCategoryCtrl'
      }
    }
  })

  .state('app.editItems', {
    url : '/items/edit',
    views : {
      'menuContent' : {
        templateUrl : "templates/editItemsIndex.html",
        controller : 'ItemDetailCtrl'
      }
    }
  })

  .state('app.editItemsAdd', {
    url : '/items/add',
    views: {
      'menuContent': {
        templateUrl : "templates/addItem.html",
        controller: 'AddItemCtrl'
      }
    }
  })

	/*
	 .state('editCategories', {
	 abstract: true,
	 templateUrl: "templates/editCategories.html"
	 })

	 .state('editCategories.index', {
	 templateUrl: "templates/editCategoriesIndex.html",
	 controller: 'CategoryListCtrl'
	 })

	 .state('editCategories.add', {
	 templateUrl: "templates/editCategoriesAdd.html"
	 })

	 
  .state('home', {
		url : '/',
		views : {
			home : {
				templateUrl : 'home.html'
			}
		}
	}).state('info', {
		url : '/info',
		views : {
			info : {
				templateUrl : 'info.html'
			}
		}
	}).state('films', {
		abstract : true,
		url : '/films',
		views : {
			films : {
				template : '<ion-nav-view></ion-nav-view>'
			}
		}
	}).state('films.index', {
		url : '',
		templateUrl : 'films.html',
		controller : 'FilmsCtrl'
	}).state('films.detail', {
		url : '/:film',
		templateUrl : 'film.html',
		controller : 'FilmCtrl',
		resolve : {
			film : function($stateParams, FilmsService) {
				return FilmsService.getFilm($stateParams.film)
			}
		}
	});
*/
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/homelogin');
});

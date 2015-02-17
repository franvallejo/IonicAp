// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.categories', 'starter.config', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform) {
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
  $stateProvider
  
  .state('homelogin', {
    url: "/homelogin",
        templateUrl: "templates/homelogin.html",
        controller: "AppCtrl"
  })
  
  .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "loginCtrl"
    })
    
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'homeCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html"
      }
    }
  })

/*
  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
*/  

  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'CategoryListCtrl'
      }
    }
  })
    
  .state('app.single', {
    url: "/playlist/:category_id",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'ItemDetailCtrl'
      }
    }
  })
   
  .state('app.images', {
    url: "/images/:item_id",
    views: {
      'menuContent': {
        templateUrl: "templates/images.html",
        controller: 'ImageDetailCtrl'
      }
    }
  })
  
  
   
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/homelogin');
});
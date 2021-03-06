function createMainAppRoute($stateProvider, $urlRouterProvider) {
  // if none of the states are matched, use this as the fallback

  $urlRouterProvider.otherwise( function($injector) {
    var $state = $injector.get("$state");
    $state.go("app.workorder");
  });

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      resolve: {
        // profileData: function(userClient) {
        //   return userClient.getProfile();
        // },
        // workorderManager: function(syncManagers) {
        //   return syncManagers.workorders;
        // },
        // workflowManager: function(syncManagers) {
        //   return syncManagers.workflows;
        // }
      },
      controller: function($rootScope, $scope, $state, $mdSidenav) {
        $scope.toggleSidenav = function(event, menuId) {
          $mdSidenav(menuId).toggle();
          event.stopPropagation();
        };
        $scope.navigateTo = function(state, params) {
          if (state) {
            $state.go(state, params);
          }
        };
      }
    });
}


angular.module('wfm-mobile').config(['$stateProvider', '$urlRouterProvider', createMainAppRoute]);

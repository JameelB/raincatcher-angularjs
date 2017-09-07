function createMainAppRoute($stateProvider, $urlRouterProvider) {
  // if none of the states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get("$state");
    $state.go("app.login");
  });
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      controller: 'mainController'
    });
}

angular.module('wfm-mobile').config(['$stateProvider', '$urlRouterProvider', createMainAppRoute]).controller('mainController', [
  '$scope', '$state', '$mdSidenav', 'userService', 'syncGlobalManager', 'workflowService', 'workorderService', 'resultService',
  function($scope, $state, $mdSidenav, userService, syncGlobalManager, workflowService, workoderService, resultService) {
    userService.readUser().then(function(profileData) {
      if (profileData) {
        $scope.profileData = profileData;
      }
    }).catch(function(err) {
      console.info('Failed to retrieve profile data');
      userService.login();
    });

    $scope.toggleSidenav = function(event, menuId) {
      $mdSidenav(menuId).toggle();
      event.stopPropagation();
    };

    $scope.navigateTo = function(state, params) {
      if (state) {
        $state.go(state, params);
      }
    };

    $scope.hasResourceRole = function(role) {
      return userService.hasResourceRole(role);
    };

    $scope.logout = function() {
      userService.logout();
    };
  }]);
angular.module('ocWebGui.navbar', ['ui.router', 'ocWebGui.login', 'FBAngular'])
  .controller('NavbarController', function ($scope, $http, User, Fullscreen) {
    var vm = this;

    vm.isAuthenticated = User.isAuthenticated;
    vm.username = User.getUsername;
    vm.logout = User.logout;

    vm.isFullscreen = Fullscreen.isEnabled();

    vm.goFullscreen = function () {
      if (Fullscreen.isEnabled()) {
        Fullscreen.cancel();
      } else {
        Fullscreen.all();
      }
    };

    Fullscreen.$on('FBFullscreen.change', function (event, isEnabled) {
      vm.isFullscreen = isEnabled;
      $scope.$apply();
    });
  });
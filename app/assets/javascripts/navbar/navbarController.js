angular.module('ocWebGui.navbar', ['ui.router', 'ocWebGui.login', 'FBAngular'])
  .controller('NavbarController', function ($scope, $http, User, Fullscreen) {
    var vm = this;

    vm.isAuthenticated = User.isAuthenticated;
    User.getUsername().then(function (username) {
      vm.username = username;
    });
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

    vm.openPersonalView = function () {
      window.open('#/personal', 'Oma näkymä', 'height=300, width=225, menubar=no, toolbar=no, location=no, personalbar=no, status=no');
    };
  });

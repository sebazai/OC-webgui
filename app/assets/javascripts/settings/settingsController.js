angular.module('ocWebGui.settings', ['ui.router', 'ocWebGui.settings.filters',
    'ocWebGui.settings.general', 'ocWebGui.settings.colors',
    'ocWebGui.settings.users', 'ocWebGui.shared.user'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.settings', {
        abstract: true,
        url: '/settings',
        views: {
          nav: {
            templateUrl: 'navbar/navbar_others.html'
          },
          content: {
            templateUrl: 'settings/_settings.html',
            controller: 'SettingsController',
            controllerAs: 'settings'
          }
        }
      });
  })
  .controller('SettingsController', function (User) {
    var vm = this;
    vm.isAdmin = User.isAdmin;
  });

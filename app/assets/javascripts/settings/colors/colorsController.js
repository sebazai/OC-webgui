angular.module('ocWebGui.settings.colors', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.colors', {
        url: '/colors',
        templateUrl: 'settings/colors/_colors.html',
        controller: 'ColorsController',
        controllerAs: 'colors'
      });
  })
  .controller('ColorsController', function ($interval, Settings) {
    var vm = this;

    function clearMessage() {
      vm.message = '';
    }

    vm.message = 'Ladataan...';
    Settings.getColors().then(function (colors) {
      vm.colors = colors;
      clearMessage();
    });
    vm.save = function () {
      Settings.setColors(vm.colors).then(function () {
        vm.message = 'Kivat valinnat! Ne on nyt tallennettu!';
        $interval(clearMessage, 5000, 1);
      });
    };
  });
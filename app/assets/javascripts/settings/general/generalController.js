angular.module('ocWebGui.settings.general', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.settings.general', {
        url: '/general',
        templateUrl: 'settings/general/_general.html',
        controller: 'GeneralController',
        controllerAs: 'general'
      });
  })
  .controller('GeneralController', function ($interval, Settings) {
    var vm = this;

    function clearMessage() {
      vm.message = '';
    }

    Settings.getOthers().then(function (others) {
      vm.others = others;
    });
    vm.save = function () {
      Settings.setOthers(vm.others).then(function () {
        vm.message = 'Kivat valinnat! Ne on nyt tallennettu!';
        $interval(clearMessage, 5000, 1);
      });
    };
  });

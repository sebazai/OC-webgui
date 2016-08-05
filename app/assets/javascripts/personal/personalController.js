angular.module('ocWebGui.personal', ['ui.router', 'ocWebGui.screen.service', 'ocWebGui.queue.service', 'ocWebGui.personal.service', 'ocWebGui.login', 'ocWebGui.shared.trimName.service'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('personal', {
        url: '/personal',
        views: {
          content: {
            templateUrl: 'personal/_personal.html',
            controller: 'PersonalController',
            controllerAs: 'personal'
          }
        },
        navbarOverlay: true
      });
  })
  .controller('PersonalController', function ($q, TrimName, Agents, Queue, User, Personal, $interval, $scope) {
    var vm = this;

    vm.trimName = TrimName.trim;

    function fetchData() {
      $q.all({ agents: Agents.query(), userData: User.getUserData() }).then(function (values) {
        vm.agents = values.agents;
        var myAgent = values.agents.find(function (agent) {
          return values.userData.agent_id === agent.id;
        });

        if (myAgent === undefined) {
          vm.myColor = 'grey';
          vm.myStatus = 'Offline';
        } else {
          vm.myColor = myAgent.color;
          vm.myStatus = myAgent.status;
          values.agents.splice(values.agents.indexOf(myAgent), 1);
        }
      });

      Queue.query(function (queue) {
        vm.queue = queue;
      });

      Personal.get(function (data) {
        vm.data = data;
      });
    }

    var fetchDataInterval = $interval(fetchData, 5000);
    $scope.$on('$destroy', function () {
      $interval.cancel(fetchDataInterval);
    });

    fetchData();
  });

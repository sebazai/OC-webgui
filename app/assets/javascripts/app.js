angular.module('ocWebGui', ['templates', 'ocWebGui.home', 'ocWebGui.screen',
  'ocWebGui.queue', 'ocWebGui.filterpanel', 'ocWebGui.stats', 'ocWebGui.login',
  'ocWebGui.navbar', 'ocWebGui.personal'])
  .run(function ($rootScope, $state, User, $interval) {
    $rootScope.returnToState = 'home';
    $rootScope.returnToParams = {};
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'stats' && !User.isAuthenticated()) {
        $rootScope.returnToState = toState;
        $rootScope.returnToParams = toParams;
        event.preventDefault();
        $state.go('login');
      }
    });

    var $body = $(document.body);

    function createHideMouseTimeout() {
      return $interval(function () {
        $body.addClass('hide-mouse');
      }, 2000, 1);
    }

    var mouseHideTimeout = createHideMouseTimeout();
    $body.on('mousemove', function () {
      $body.removeClass('hide-mouse');
      $interval.cancel(mouseHideTimeout);
      mouseHideTimeout = createHideMouseTimeout();
    });
  });

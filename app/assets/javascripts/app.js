angular.module('ocWebGui', ['templates', 'ocWebGui.home', 'ocWebGui.screens.status',
    'ocWebGui.screens.queue', 'ocWebGui.stats', 'ocWebGui.login', 'ocWebGui.navbar',
    'ocWebGui.personal', 'ocWebGui.shared.color', 'ocWebGui.shared.settings', 'ocWebGui.settings',
    '720kb.datepicker', 'ngSanitize', 'ngCsv', 'tmh.dynamicLocale'])
  .run(function ($rootScope, $state, User, $interval, Settings, tmhDynamicLocale) {
tmhDynamicLocale.set('it');
    var $body = $(document.body);
    var $navbar = $('.navbar');
    var mouseHideTimeout;

    $rootScope.$on('settings:colors:update', function () {
      Settings.getColor('font').then(function (color) {
        $body.css('color', color);
      });
    });

    function createHideMouseTimeout() {
      return $interval(function () {
        $body.addClass('hide-mouse');
      }, 2000, 1);
    }

    function activateNavbarOverlay() {
      $interval.cancel(mouseHideTimeout);
      mouseHideTimeout = createHideMouseTimeout();
      $body.addClass('body-screen');

      $body.on('mousemove', function () {
        $body.removeClass('hide-mouse');
        $interval.cancel(mouseHideTimeout);
        mouseHideTimeout = createHideMouseTimeout();
      });
    }

    function disableNavbarOverlay() {
      $interval.cancel(mouseHideTimeout);

      $body.removeClass('hide-mouse').off('mousemove');
      $body.removeClass('body-screen');
    }

    $rootScope.returnToState = 'home';
    $rootScope.returnToParams = {};

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.navbarOverlay === true) {
        activateNavbarOverlay();
      } else {
        disableNavbarOverlay();
      }

      if (toState.name.indexOf('stats') === 0 && !User.isAuthenticated()) {
        $rootScope.returnToState = toState;
        $rootScope.returnToParams = toParams;
        event.preventDefault();
        $state.go('login');
      }
    });
  });

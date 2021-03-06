angular.module('ocWebGui.stats.status.service', ['ngResource'])
  .factory('AgentStatusStats', function ($q, $http, Settings) {
    return {
      stats: function (startDate, endDate, reportType) {
        // swap dates other way around if startDate is after endDate
        var startDateParts = startDate.split(".");
        var startDateObject = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);

        var endDateParts = endDate.split(".");
        var endDateObject = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

        if (startDateObject > endDateObject) {
          var temp = startDate;
          startDate = endDate;
          endDate = temp;
        }

        return $q.all({
          otherSettings: Settings.getOthers(),
          response: $http.post('api/agent_statuses/stats', {
            report_type: reportType,
            team_name: 'Helpdesk',
            start_date: startDate,
            end_date: endDate
          })
        }).then(function (values) {
          return values;
        });
      }
    };
  });

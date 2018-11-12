$(document).ready(function() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(loadData);
});

function loadData() {
  $.getJSON('config.json', function(data) {
    var host = data.host
    $("div.dynamic").each(function() {
      var self = $(this);
      var url = host + "/" +  self.data('task');
      // var data = self.data();
      // if ("arg" in data) {
      //   var myarg = data.arg
      //   var args = {};
      //   args[data.arg] = "2016";
      //   var params = $.param(args);
      //   url += "?" + params;
      // }
      $.getJSON(url, function(data) {
        var self_data = self.data();
        var viz_type = self_data['type'];

        if (viz_type == "table") {
          self.children("table").html(arrayToTable(data));
        }

        else if (viz_type == "chart") {
          var chart_id = self.attr('id')
          var chart_type = self_data['chart'];

          if (chart_type == 'line') {
            createLineGraph(chart_id, data);
          }
          else if (chart_type == 'scatter') {
            createScatterPlot(chart_id, data);
          }
          else if (chart_type == 'histogram') {
            createHistgram(chart_id, data);
          }
        }
      });
    });
  });
}

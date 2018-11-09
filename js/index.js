$(document).ready(function() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(loadData);
});

function loadData() {
  $.getJSON('config.json', function(data) {
    var host = data.host
    console.log("starting to load...");
    $("div.dynamic").each(function() {
      console.log("in a div");
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
        console.log(url);
        
        var str_data = JSON.stringify(data);
        var json_data = JSON.parse(str_data);
        var self_data = self.data();
        var viz_type = self_data['type'];
        console.log('start');
        console.log(data);
        console.log(self_data);
        console.log('fin');

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

        }
      });
    });
  });
}

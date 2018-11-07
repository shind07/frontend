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

      $.getJSON(url, function(data) {
        var str_data = JSON.stringify(data);
        var json_data = JSON.parse(str_data);
        console.log(data);
        console.log(str_data);
        console.log(json_data);

        if (self.data('type') == "table") {
          self.children("table").html(arrayToTable(data));
        }
        else if (self.data('type') == "chart") {
          var chart_data = google.visualization.arrayToDataTable(json_data, false);
          var chart = new google.visualization.LineChart(document.getElementById(self.attr('id')));
          var options = {
            backgroundColor: {
            //   fill:"#a2a3aa",
              stroke:"#a2a3aa",
            //   strokeWidth:2
            },
            chartArea: {
              backgroundColor:"#a2a3aa"
            },
            hAxis: {
              direction: -1
            },

          };
          chart.draw(chart_data, options);
        }
      });
    });
  });
}

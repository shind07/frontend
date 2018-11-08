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
        var str_data = JSON.stringify(data);
        var json_data = JSON.parse(str_data);
        console.log(data);
        console.log(str_data);
        console.log(json_data);

        if (self.data('type') == "table") {
          self.children("table").html(arrayToTable(data));
        }
        else if (self.data('type') == "chart") {
          createLineGraph(self.attr('id'), json_data);
        }
      });
    });
  });
}

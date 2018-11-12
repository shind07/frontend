$(document).ready(function() {
  $(".page-item").on("click", pageHandler);
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(loadData);

});

function loadData() {
  $.getJSON('config.json', function(data) {
    var host = data.host
    var current_page = $('#currentpage').data()['page'];
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
        var page = self_data['page'];
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

function pageHandler() {
  $('.page-item').each( function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    }
  })
  $(this).addClass('active');
  var page = $(this).data()['page'];
  $("div.dynamic").each( function() {
    if ($(this).data()['page'] == page) {
      $(this).show();
    }
    else {
      $(this).hide();
    }
  })
};

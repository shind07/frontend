var host = '';

$(document).ready(function() {
  $(".page-item").on("click", pageHandler);
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(loadData);

});

function loadData() {
  $.getJSON('config.json', function(data) {
    host = data.host;
    var current_page = $('#currentpage').data()['page'];
    $("div.dynamic").each(function() {
      var self = $(this);
      var url = host + "/" +  self.data('task') + "/func";

      initViz($(this));

      $.getJSON(url, function(data) {
        var self_data = self.data();
        var page = self_data['page'];
        var viz_type = self_data['type'];

        if (viz_type == "table") {
          self.children("table").html(arrayToTable(data));
        }

        else if (viz_type == "chart") {
          var chart_id = self.attr('id') + '-viz';
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

function initViz(obj) {
  var selects = obj.children("select");
  selects.each(loadSelect);
}

function loadSelect() {
  var self = $(this);
  var task = self.parent().data()['task'];
  var select_url = host + "/" + task + "/select"

  $.getJSON(select_url, function(data) {
    var options = ''
    $.each(data, function(index, value) {
      options += createOption(value, value);
    });
    console.log(options);
    self.html(options);
  });
}

function loadViz() {

}

function createOption(value, text) {
  return `<option value='${value}'>${text}</option>`;
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

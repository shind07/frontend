var host = '';

$(document).ready(function() {
  $(".page-item").on("click", pageHandler);
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(initialize);

});

function initialize() {
  $.getJSON('config.json', function(data) {
    host = data.host;
    var current_page = $('#currentpage').data()['page'];
    $("div.dynamic").each(function() {
      var self = $(this);
      var url = host + "/" +  self.data('task') + "/func";
      initViz($(this));
    });
  });
}

function initViz(obj) {
  // Load select buttons
  var selects = obj.children("select");
  selects.each(loadSelect);
  loadViz(obj);
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
    self.html(options);
  });
}

function loadViz(obj) {
  var obj_data = obj.data();
  var url = host + "/" +  obj_data['task'] + "/func";
  $.getJSON(url, function(data) {
    var page = obj_data['page'];
    var viz_type = obj_data['type'];
    if (viz_type == "table") {
      obj.children("table").html(arrayToTable(data));
    }

    else if (viz_type == "chart") {
      var chart_id = obj.attr('id') + '-viz';
      var chart_type = obj_data['chart'];
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

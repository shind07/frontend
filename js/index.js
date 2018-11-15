var host = '';

$(document).ready(function() {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(initialize);
  $(".page-item").on("click", pageHandler);
  $(".submit-button").on('click', submitHandler);
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
  var selects = obj.children('select');
  selects.each(loadSelect);
  loadViz(obj);
}

function loadSelect() {
  var self = $(this);
  var task = self.parent().data()['task'];
  var select_url = host + "/" + task + "/select"
  $.getJSON(select_url, function(data) {
    var options = ''
    var selected = false;
    var select_num = self.attr('id').substr(-1);
    $.each(data, function(index, value) {
      selected = (index == 1 & select_num == '2') ? true : false;
      options += createOption(value, value, selected);
    });
    self.html(options);
  });
}

function loadViz(obj) {
  var obj_data = obj.data();
  var url = host + "/" +  obj_data['task'] + "/func";
  $.getJSON(url, function(data) {
    var viz_type = obj_data['type'];
    var chart_id = obj.attr('id');
    if (viz_type != "table") {
      chart_id += '-viz';
    }
    drawViz(obj, chart_id, viz_type, data)
  });
}

function drawViz(obj, id, viz_type, data) {
  if (viz_type == "table") {
    obj.children("table").html(arrayToTable(data));
  }
  else if (viz_type == "chart") {
    var chart_type = obj.data('chart');
    if (chart_type == 'line') {
      createLineGraph(id, data);
    }
    else if (chart_type == 'scatter') {
      createScatterPlot(id, data);
    }
    else if (chart_type == 'histogram') {
      createHistgram(id, data);
    }
  }
}

function createOption(value, text, selected=false) {
  var add_select = (selected) ? "selected='selected' " : "";
  return `<option ${add_select}value='${value}'>${text}</option>`;
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

function submitHandler() {
  var cols = []
  $(this).siblings("select").each(function() {
    cols.push(this.value);
  })
  params = $.param({'cols':cols}, true);
  var viz_div = $(this).siblings('.viz');
  var parent = $(this).parent();
  var task = parent.data('task');
  var url = host + '/' + task + '/func?' + params
  $.getJSON(url, function(data) {
    var viz_id = viz_div.attr('id');
    var viz_type = parent.data('type');
    drawViz(parent, viz_id, viz_type, data);
  })
}

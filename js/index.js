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
  var multiple = (self.attr('multiple')) ? true : false;
  var task = self.parent().data()['task'];
  var select_option = self.data('task');
  var select_url = host + "/" + task + "/" + select_option
  $.getJSON(select_url, function(data) {
    var options = ''
    var selected = false;
    var select_num = self.attr('id').substr(-1);
    $.each(data, function(index, value) {
      selected = ((index == 1 & select_num == '2') || multiple) ? true : false;
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
    var chart_id = obj.attr('id') + '-viz';
    // if (viz_type != "table") {
    //   chart_id += '-viz';
    // }
    drawViz(obj, chart_id, viz_type, data)
  });
}

function drawViz(obj, id, viz_type, data) {
  if (viz_type == "table") {
    $(`#${id}`).html(arrayToTable(data));
    $(`#${id}`).DataTable()
  }
  else if (viz_type == "chart") {
    var chart_type = obj.data('chart');
    var chart_title = obj.data('title');
    if (chart_type == 'line') {
      createLineGraph(id, data, chart_title);
    }
    else if (chart_type == 'scatter') {
      createScatterPlot(id, data, chart_title);
    }
    else if (chart_type == 'histogram') {
      createHistgram(id, data, chart_title);
    }
    else if (chart_type == 'bar') {
      createBarChart(id, data, chart_title);
    }
    else if (chart_type == 'area') {
      createAreaChart(id, data, chart_title);
    }
  }
}

function createOption(value, text, selected=false) {
  var add_select = (selected) ? "selected='selected' " : "";
  return `<option ${add_select}value='${value}'>${text}</option>`;
}

function pageHandler() {
  // Take active class off current active page
  $('.page-item').each( function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    }
  })

  // add active class to current active page,
  // hide the current active page's div,
  // then show div for active page
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
  var args = {};
  var arg;

  // For each select menu next to this div,
  // get the selected value
  $(this).siblings("select").each(function(index, value) {
    arg = $(value).data('param');
    if (args[arg]) {
      args[arg].push(getSelectedValues(value));
    }
    else {
      args[arg] = getSelectedValues(value);
    }
  });

  // Check if the radio button is selected or not
  var radio_param;
  $(this).siblings('.radio').each(function(index, value) {
    radio_param = $(this).data('param');
    $(this).children().each(function(index, value) {
      if (value.checked) {
        args[radio_param] = $(this).data('grouped');
      }
    });
  });

  // Format url with params, then send data to DrawViz
  var params = $.param(args, true);
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

function getSelectedValues(select_tag){
  // get the selected values for the given multiselect dropdown
  var result = []
  var options = select_tag.options;
  $.each(options, function(index, option) {
    if (option.selected) {
      result.push(option.value);
    }
  });
  return result;
}

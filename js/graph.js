var defaultWidth = 800;
var defaultHeight = 800;

function createLineGraph(chartID, data, title) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.LineChart(document.getElementById(chartID));
  var options = {
    title: title,
    width: defaultWidth + 100,
    height: defaultHeight - 100,
    hAxis: {
     title: chart_data.getColumnLabel(0),
    },
    vAxis: {
     title: 'Value',
    },
    //curveType: 'function',
    series: {
      0: { color: '#d82d2d', lineWidth: 2.5},
      1: { color: '#41f7a8' ,lineWidth: 2.5},
      2: { color: '#8b2dd8' ,lineWidth: 2.5},
      3: { color: '#41edf7' ,lineWidth: 2.5},
      4: { color: '#f7c041' ,lineWidth: 2.5},
      5: { color: '#41a2f7' ,lineWidth: 2.5},
    },
  };
  chart.draw(chart_data, options);
}

function createAreaChart(chartID, data, title) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.AreaChart(document.getElementById(chartID));
  var options = {
    title: title,
    width: defaultWidth + 100,
    chartArea: {
      height:'80%',
      width:'80%'
    },
    height: defaultHeight - 100,
    legend: {position: 'none'},
    hAxis: {
     //title: chart_data.getColumnLabel(0),
     direction: -1,
     title: 'Time Remaining on Shot Clock'
    },
    vAxis: {
      labels: [.5, .7, .9, 1.1, 1.3, 1.5, 1.7, 1.9],
      title: 'Points Per Shot',
      textPosition: 'in'
     //title: 'Value',
    },
    //curveType: 'function',

  };
  chart.draw(chart_data, options);
}

function createBarChart(chartID, data, title) {
  console.log(data);
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.ColumnChart(document.getElementById(chartID));
  var options = {
    series: {
      0: { color: '#41a2f7'},
      1: { color: '#41edf7' },

    },
    title: title,
    width: defaultWidth + 300,
    height: defaultHeight - 100,
    trendlines: { 0: {
      visibleInLegend: false,
      }
    },
    hAxis: {
      direction: -1,
      title: chart_data.getColumnLabel(0)
    },
    vAxis: {
      format: '0',
      textPosition: 'in'
     //title: chart_data.getColumnLabel(1),
    },
  }
  chart.draw(chart_data, options);
}

function createScatterPlot(chartID, data, title) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.ScatterChart(document.getElementById(chartID));
  var options = {
    title:title,
    dataOpacity: 0.5,
    width: defaultWidth,
    height: defaultHeight,
    //legend: {position: 'none'},
    chartArea: {
      height:'70%',
      width:'70%'
    },
    trendlines: { 0: {
      showR2: true,
      visibleInLegend: true,
      }
    },
    hAxis: {
     title: chart_data.getColumnLabel(0),
    },
    vAxis: {
     title: chart_data.getColumnLabel(1),
    },
  }
  chart.draw(chart_data, options);
}

function createHistgram(chartID, data, title) {
    var chart_data = google.visualization.arrayToDataTable(data, false);
    var chart = new google.visualization.Histogram(document.getElementById(chartID));
    var options = {
      title: title,
      //colors: ['green'],
      chartArea: {
        height:'60%',
        width:'80%'
      },
      legend: {position: 'none'},
      histogram: { maxNumBuckets: 20},
      width: defaultWidth,
      height: defaultHeight,
      hAxis: {
       title: chart_data.getColumnLabel(0),
      },
     };
    chart.draw(chart_data, options);
}

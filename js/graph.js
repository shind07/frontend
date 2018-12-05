var defaultWidth = 800;
var defaultHeight = 800;

function createLineGraph(chartID, data) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.LineChart(document.getElementById(chartID));
  var options = {
    width: defaultWidth + 100,
    height: defaultHeight - 100,
    hAxis: {
     title: chart_data.getColumnLabel(0),
    },
    vAxis: {
     title: chart_data.getColumnLabel(1),
    },

  };
  chart.draw(chart_data, options);
}

function createBarChart(chartID, data) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.ColumnChart(document.getElementById(chartID));
  var options = {
    chart: {
      title: "bar chart"
    },
    width: defaultWidth + 300,
    height: defaultHeight - 100,
    trendlines: { 0: {
      visibleInLegend: true,
      }
    },
    hAxis: {
      direction: -1,
    }
  }
  chart.draw(chart_data, options);
}

function createScatterPlot(chartID, data) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.ScatterChart(document.getElementById(chartID));
  var options = {
  //  title:title,
    dataOpacity: 0.5,
    width: defaultWidth,
    height: defaultHeight,
    //legend: {position: 'none'},
    // chartArea: {
    //   height:'80%',
    //   width:'80%'
    // },
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

function createHistgram(chartID, data) {
    var chart_data = google.visualization.arrayToDataTable(data, false);
    var chart = new google.visualization.Histogram(document.getElementById(chartID));
    var options = {
      legend: {position: 'none'},
      histogram: { maxNumBuckets: 10},
      width: defaultWidth,
      height: defaultHeight,
     };
    chart.draw(chart_data, options);
}

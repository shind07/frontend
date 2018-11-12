var defaultWidth = 800;
var defaultHeight = 400;

function createLineGraph(chartID, data) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.LineChart(document.getElementById(chartID));
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
    width: defaultWidth,
    height: defaultHeight,

  };
  chart.draw(chart_data, options);
}

function createScatterPlot(chartID, data) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.ScatterChart(document.getElementById(chartID));
  var options = {
    width: defaultWidth,
    height: defaultHeight,
  }
  chart.draw(chart_data, options);
}

function createHistgram(chartID, data) {
    var chart_data = google.visualization.arrayToDataTable(data, false);
    var chart = new google.visualization.Histogram(document.getElementById(chartID));
    var options = {
       histogram: { bucketSize: .05 },
       width: defaultWidth,
       height: defaultHeight,
     };
    chart.draw(chart_data, options);
}

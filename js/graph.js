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
    width: '100%',

  };
  chart.draw(chart_data, options);
}

function createScatterPlot(chartID, data) {
  var chart_data = google.visualization.arrayToDataTable(data, false);
  var chart = new google.visualization.ScatterChart(document.getElementById(chartID));
  chart.draw(chart_data);
}

function createHistgram(chartID, data) {
    var chart_data = google.visualization.arrayToDataTable(data, false);
    var chart = new google.visualization.Histogram(document.getElementById(chartID));
    var options = {
       histogram: { bucketSize: .05 },
       width: '100%',
     };
    chart.draw(chart_data, options);
}

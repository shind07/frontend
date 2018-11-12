function arrayToTable(data) {
  var table = "<tr>";

  // Create header
  var header = data[0];
  for (var i=0; i < header.length; i++) {
    var cell = header[i];
    table += "<th>" + cell + "</th>";
  }
  table += "</tr>";

  // Populate table
  for (i = 1; i < data.length; i++){
    var row = "<tr>";
    for (j = 0; j < data[i].length; j++) {
      row += "<td>"+data[i][j]+"</td>"
    }
    row += "</tr>"
    table += row;
  }
  return table;
};

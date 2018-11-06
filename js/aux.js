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
}
// <table style="width:100%">
//   <tr>
//     <th>Firstname</th>
//     <th>Lastname</th>
//     <th>Age</th>
//   </tr>
//   <tr>
//     <td>Jill</td>
//     <td>Smith</td>
//     <td>50</td>
//   </tr>
//   <tr>
//     <td>Eve</td>
//     <td>Jackson</td>
//     <td>94</td>
//   </tr>
// </table>
//
// function makeTableHTML(myArray) {
//     var result = "<table border=1>";
//     for(var i=0; i<myArray.length; i++) {
//         result += "<tr>";
//         for(var j=0; j<myArray[i].length; j++){
//             result += "<td>"+myArray[i][j]+"</td>";
//         }
//         result += "</tr>";
//     }
//     result += "</table>";
//
//     return result;
// }

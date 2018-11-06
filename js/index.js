$(document).ready(function() {
  var host;
  var login_url;

  // Load config, update dynamic figures
  $.getJSON("config.json", function(data) {
    host = data.host

    $("div.dynamic").each(function() {
      var self = $(this);
      var url = host + "/" +  self.data('task');

      $.getJSON(url, function(data) {
        var str_data = JSON.stringify(data);
        var obj = JSON.parse(str_data);

        if (self.data('type') == "table") {
          self.children("table").html(arrayToTable(data));
        }
      });
    });
  });
});

$(document).ready(function() {
  var host;
  var login_url;

  // Load config, update dynamic figures
  $.getJSON("config.json", function(data) {
    host = data.host


    $(".dynamic").each(function() {
        var url = host + "/" +  $(this).data('task')
        var self = $(this);
        $.getJSON(url, function(data) {
          self.text(JSON.stringify(data));
          console.log(JSON.stringify(data));
        })
    })
  });


});

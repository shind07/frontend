$(document).ready(function() {
  alert("working");

  $.getJSON("config.json", function(data) {
    var host = data.host
    console.log(host);

    $(".dynamic").each(function() {
        var url = host + "/" +  $(this).data('task')
        console.log(url);
        var self = $(this);
        $.getJSON(url, function(data) {
          console.log(self.text() + "asgd")
          self.text(JSON.stringify(data));
          console.log(JSON.stringify(data));
        })

    })

  });

});

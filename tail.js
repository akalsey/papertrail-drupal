function pdu(url) {
  (function ($) {$.ajax({
    type: "GET", url: url,
    success: function (data) {
      $("#papertrail-wrapper").append(data);
      if (scrolled == false) {
        $("#papertrail-wrapper").scrollTop(
          $("#papertrail-wrapper").attr("scrollHeight") - $('#papertrail-wrapper').height() 
           );        
      }
      setTimeout("pdu(url)", 2000);
    },
    error: function() {
      setTimeout("pdu(url)", 2000);
    }
  });}(jQuery));
}
var scrolled = false;
jQuery("#papertrail-wrapper").scroll(function(){scrolled = true; jQuery("#papertrail-wrapper").queue([]).stop()});

setTimeout("pdu(url)", 2000);

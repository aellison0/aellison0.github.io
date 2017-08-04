$(document).ready (function() {
$("#legendhide").click(function(){
  $(".legendblock").toggle();
  $("#show").toggle();
  $("#hide").toggle();
  $("#legendhide").toggleClass("btn-primary btn-danger");
});
});
$("#togglequarterfinalists").click(function() {
    $("#hideteams, #showteams").toggle();
    var series = chart.series[1];
    if(series.visible) {
      series.hide();
    } else {
      series.show();
    }
    $("#togglequarterfinalists").toggleClass("btn-danger");
  });
});

$(document).ready (function() {
$("#legendhide").click(function(){
  $(".legendblock").toggle();
  $("#show").toggle();
  $("#hide").toggle();
  $("#legendhide").toggleClass("btn-primary btn-danger");
});
});

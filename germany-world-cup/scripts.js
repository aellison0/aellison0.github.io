$(document).ready(function(){
	$("#legendhide").click(function(){
		$(".legendblock").toggle();
		$("#show,#hide").toggle();
		$("#legendhide").toggleClass("btn-prmary btn-danger");
	});
$("#togglequarterfinalist").click(function(){
	$("#hideteams,#showteams").toggle();
	var series=chart.series[1];
	if (series.visibl){
		series.hide();
	}
	else {
		series.show();
	}
	$("#togglequarterfinalist").toggleClass("btn-prmary btn-danger");
});
});

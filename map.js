$(document).ready(function(){

//Hack to avoid error message in ff console for local json file
$.ajaxSetup({beforeSend: function(xhr)  {
	if (xhr.overrideMimeType) {
		xhr.overrideMimeType("application/json");
		}
	}
});

//GET visited countries only
var cdata = {}; var vdata = {}; 
// var notvdata = {};
$.getJSON('country.json', function(data) {
	$.each(data.info, function(){
			$.each(this, function() {
				if(this.visited) {					
					//create JSON object with countries visited
					cdata[this.code] = 1;
					vdata[this.code] = this.name;
				}
				else {
					// notvdata[this.code] = this.name;
				}
			})
	})
	// console.log(cdata);
	// console.log(vdata);
	// console.log(Object.keys(notvdata).length);

//Add Visited countries to div
var list = $('.visited').append('<ul></ul>').find('ul');
$.each(vdata, function(i,obj){
	list.append('<li><a href = ' + '"' + '#' + i + '"' + ' class="country">' + obj + '</a></li>');
})

//Count number of countries
$(function() {
	$('.count').text(Object.keys(vdata).length);
});

//Draw world map
$(function(){
	$('.world-map').vectorMap({
		map:'world_mill_en',
		// zoomButtons: false,
		regionsSelectable: true,
		regionsSelectableOne: true,

		series: {
			regions: [{
				scale: ['#f5f5f5', '#33a1de'],
				normalizeFunction: 'linear',
				attribute: 'fill',
				values: cdata
			}]
		}
	})
});

//Select country on map when clicked in list
$('.country').on('click',function(){
		var country = $(this).attr('href');
		console.log(country.slice(1,3));

		var map = $('.world-map').vectorMap('get', 'mapObject');
		map.clearSelectedRegions();
		map.setSelectedRegions(country.slice(1,3));
});

})
});
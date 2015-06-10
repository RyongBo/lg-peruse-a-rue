define(
['config', 'bigl', 'stapes', 'jquery', 'googlemaps'],
function(config, L, Stapes, $, GMaps) {

  var InfoModule = Stapes.subclass({
    constructor: function() {
	  this.$info_box = $('<div></div>')
					   .attr('id', 'info-box');

	  this.$pano_info = $('<div></div>')
						.attr('id', 'pano_info');
						
	  this.sv_svc = new GMaps.StreetViewService();

	},

	updateBox: function(panoid) {
	  var self = this;
	  this.sv_svc.getPanoramaById(panoid, 
	  	function process(data, stat) {
	  	  if (stat == GMaps.StreetViewStatus.OK) {

	  	  	description = data.location.description;
	  		copyright = data.copyright;
	  		lat = String(data.location.latLng.lat());
	  		lng = String(data.location.latLng.lng());

    		if(lat.charAt(0) == "-") {
    		  lat = lat.substr(1, 6 ) + " South";
    		} else {
    		  lat = lat.substr(0,6) + " North";
    		}

   	    	if(lng.charAt(0) == "-") {
    		  lng = lng.substr(1,6) + " West";
    		} else {
    		  lng = lng.substr(0,6) + " East";
    		}

	  		self.$pano_info.html(description + '<br>' + lat + '<br>' + lng + "<br>" + copyright);
	  		self.$info_box.append(self.$pano_info);
	  		$('body').append(self.$info_box);
	  	  }
	  		
	  	});

	  
	},

  });

  return InfoModule;
});
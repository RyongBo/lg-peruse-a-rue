define(
['config', 'bigl', 'stapes', 'jquery', 'googlemaps'],
function(config, L, Stapes, $, GMaps) {

  var RandomModule = Stapes.subclass({
    constructor: function() {
      var self = this;

      this.sv_svc = new GMaps.StreetViewService();

	    this.$random_box = $('<div></div>')
					   .attr('id', 'random-box');

	    this.$random_button = $('<div></div>')
						.attr('id', 'random-button')
						.html('Random Panorama');
						
	    this.$random_box.append(this.$random_button);
      $('body').append(this.$random_box);

      this.$random_button.click(function() {
        if(config.touchscreen.random_mode == "POI") {
          //pick a random point of interest

          var rand = Math.floor(Math.random() * poiArray.length);
          var loc = poiArray[rand];

          //send off id and heading
          self.emit('select_location', loc['panoid']);
          if (loc['heading'] != null) {
            var hdg = Number(loc['heading']);
            self.emit('location_heading', hdg);
          }

        } else {
          //pick a random location
          var lat = ((Math.random() * 360) - 180).toFixed(3);
          var lng = ((Math.random() * 360) - 180).toFixed(3);
          var latLng = new google.maps.LatLng(lat ,lng);
          self.sv_svc.getPanoramaByLocation(latLng, 1000, function(data, status) {
              self.processLocSearch(self, data, status);
          });
        }

      });
	  },
    processLocSearch: function(self, data, status) {
      this.sv_svc = new GMaps.StreetViewService();
      if(status == google.maps.StreetViewStatus.OK) {
        self.emit('select_location', data.location.pano);
      }
      else {
        var lat = ((Math.random() * 360) - 180).toFixed(3);
        var lng = ((Math.random() * 360) - 180).toFixed(3);
        latLng = new google.maps.LatLng(lat ,lng);
        self.sv_svc.getPanoramaByLocation(latLng, 1000, function(data, status) {
              self.processLocSearch(self, data, status);
          });
      }
    }
  });

  return RandomModule;
});
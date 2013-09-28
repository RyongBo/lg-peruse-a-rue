/*
** Copyright 2013 Google Inc.
**
** Licensed under the Apache License, Version 2.0 (the "License");
** you may not use this file except in compliance with the License.
** You may obtain a copy of the License at
**
**    http://www.apache.org/licenses/LICENSE-2.0
**
** Unless required by applicable law or agreed to in writing, software
** distributed under the License is distributed on an "AS IS" BASIS,
** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
** See the License for the specific language governing permissions and
** limitations under the License.
*/

define(
['config', 'bigl', 'stapes', 'zepto', 'doT'],
function(config, L, Stapes, $, doT) {

  var ActivitiesModule = Stapes.subclass({
    constructor: function($template) {
      this.iface = config.lg_iface_base;
      this.template = doT.template($template.innerHTML);
    },

    init: function() {
      console.debug('Activities: init');

      var activities = config.touchscreen.activities;

      if (activities == null) {
        console.debug('Activities: null or undefined');
        return;
      }

      if (!activities instanceof Array) {
        L.error('Activities: not an array');
        return;
      }

      var activity_div = this.template(activities);

      $(activity_div).appendTo('body');

      $('.activities-item').on('click', function(e) {
        this._clicked(e.target);
      }.bind(this));
    },

    _clicked: function(activity) {
      var $activity = $(activity);
      var name = $activity.html();
      var app  = $activity.attr('app');

      L.info('switching to', name);
      var url = this.iface+'/change.php?query=relaunch-'+app+'&name='+name;
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.send(null);
    }
  });

  return ActivitiesModule;
});

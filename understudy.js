
function understudy(target) {
	/*
	 *   PERSONAL CONFIGURATION - START
	 */
	 	var debug_output = 'alert';

	/*
	 *   PERSONAL CONFIGURATION - END
	 */

	var status = {};
	return {
		"init": function() {
			status.hasMouseMoved = false;
			status.hasUserScrolled = false;
			status.isMobile = false;
			status.elapsedTime = 0;

			var date = new Date();
			status.year = date.getFullYear();
			status.month = date.getMonth();
			status.date = date.getDate();
			status.timeStarted = date.getTime(); 

			understudy.debug();
			understudy.monitor();
		},
		"monitor": function() {
			//hasMouseMoved
			$(window).mousemove(function(event) {
				understudy.report('hasMouseMoved', true); 
				understudy.debug();	
				return true;
			});

			//hasUserScrolled
			$(window).scroll(function() {
				understudy.report('hasUserScrolled', true);
				return $(window).scrollTop();
			});

			//isMobile
			if( navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) ) {
				understudy.report('isMobile', true);
			}

			//getDevice
			var UA = navigator.userAgent || navigator.vendor || window.opera;
			if( UA.match( /iPad/i ) || UA.match( /iPhone/i ) || UA.match( /iPod/i ) ) {
				understudy.report('isIOS',true);
			}
			else if( UA.match( /Android/i ) ) {
			    understudy.report('isAndroid',true);
			}

			//elapsedTime
			var seconds = 0;
			setInterval(function() {
				seconds++;
				understudy.report('elapsedTime', seconds);
				$('#debugWindow').html( JSON.stringify(status, null, 4) );
			},1000);

			//getLocation
			function monitorPosition(pos) {
				var lat = pos.coords.latitude;
				var lng = pos.coords.longitude;
				var alt = pos.coords.altitude;
				understudy.report('position', lat+', '+lng);
				understudy.report('latitude', lat);
				understudy.report('longitude', lng);
				understudy.report('altitude', alt);		    		
		    }

			if (navigator.geolocation) {
		        navigator.geolocation.watchPosition(monitorPosition);
		    } else {
		        understudy.report('location',false);
		    }


			
		},
		"report": function(k,v) {
			if( status.hasOwnProperty(k) && status[k] == v ) return false;
			status[k] = v;
		},
		"debug": function() {
			console.log(status);
			$('#debugWindow').html( JSON.stringify(status, null, 4) );
		},
		"captureBeforeClose": function () {
			var date = new Date();
			status.timeEnded = date.getTime();
			switch(debug_output) {
				default:
					var e = window.event;
				    e.returnValue = JSON.stringify(status);
				break;    
			}
			

		    
		}
	}
	
}


var understudy = understudy(window);

understudy.init();

window.onbeforeunload = understudy.captureBeforeClose;

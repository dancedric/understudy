
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

			//elapsedTime
			var seconds = 0;
			setInterval(function() {
				seconds++;
				understudy.report('elapsedTime', seconds);
			},1000);
			
		},
		"report": function(k,v) {
			if( status.hasOwnProperty(k) && status[k] == v ) return false;
			status[k] = v;
		},
		"debug": function() {
			console.log(status);
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

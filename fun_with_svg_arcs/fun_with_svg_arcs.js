(function ($) {
	// this function is a shortcut for creating new elements in jQuery
	$.ce = function(t){
		return $(document.createElement(t));
	};
	// this function draws SVG circle arcs on top of a SVG circle
	$.fn.drawCircle = function(a){
		var t = this;
		
		// theese are the default arguments of the svg drawings, you can use all of them to invoke your own paths.
		
		var args = $.extend({
			startAng:0, 							// the start angle of the arc in degrees
			endAng:360, 							// the end angle of the arc in degrees
			r:90, 									// the radius of the circles
			railHighlightColor:'rgba(0, 0, 0, 0)', 	// the color of the rail
			railFill:'none', 						// the fill color of the rail
			railStrokeColor:'#e4e4e4', 				// the stroke color of the rail
			railStrokeWidth:1, 						// the stroke width of the rail
			pathHiglightColor:'rgba(0, 0, 0, 0.4)',	// the path's hightlight color
			pathFill:'none',						// the path' fill color
			pathStrokeColor:'#16a6b6',				// the path's stroke color
			pathStrokeWidth:1						// the path's stroke width
		},a);
		
		
		args.diam = args.r*2;
		
		var stroke = args.railStrokeWidth;
		if (args.pathStrokeWidth > args.railStrokeWidth) stroke = args.pathStrokeWidth;
		var hs = stroke/2;
		var center = args.r+hs;
		
		// this creates the base object for the circle
		$.fn.createSvg = function(){
			var w = $.ce('div').css({
				width:(args.diam + stroke),
				height:(args.diam + stroke),
			});
			t.append(w);
			var o = ''+
			'<svg class="zeSvg" width="'+(args.diam+stroke)+'" width="'+(args.diam+stroke)+'" viewbox="0 0 '+(args.diam+stroke)+' '+(args.diam+stroke)+'" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
			'<circle class="zeCircle" style="-webkit-tap-highlight-color: '+args.railHighlightColor+';" cx="'+center+'" cy="'+center+'" r="'+args.r+'" fill="'+args.railFill+'" stroke="'+args.railStrokeColor+'" stroke-width="'+args.railStrokeWidth+'"></circle>'+
			'<path class="zePath" style="-webkit-tap-highlight-color:'+args.pathHiglightColor+';" fill="'+args.pathFill+'" stroke="'+args.pathStrokeColor+'" stroke-width="'+args.pathStrokeWidth+'"></path>'+
			'</svg>';
			w.append(o);
		};
		
		// this converts polar coordinates to Cartesian... basic trigonometry stuff
		$.fn.drawCircle.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
			var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

			return {
				x: centerX + (radius * Math.cos(angleInRadians)),
				y: centerY + (radius * Math.sin(angleInRadians))
			};
		};
		// this function creates the SVG arc description argument we are to draw with
		$.fn.drawCircle.describeArc =function(x, y, radius, startAngle, endAngle) {

			var start = $.fn.drawCircle.polarToCartesian(x, y, radius, endAngle);
			var end = $.fn.drawCircle.polarToCartesian(x, y, radius, startAngle);

			var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

			var d = [
				"M", start.x, start.y,
				"A", radius, radius, 0, arcSweep, 0, end.x, end.y
			].join(" ");

			return d;
		};
		
		// this function updates the arc attribute in the SVG element
		$.fn.drawCircle.draw = function() {
			var d = $.fn.drawCircle.describeArc(center,center,args.r,args.startAng,args.endAng);
			var svg = t.find('.zePath')[0];
			svg.setAttribute('d', d);
		};
		
		// here we find out if the SVG exists to change it, otherwise, we draw it
		if(t.find('.zeSvg').length>0){
			$.fn.drawCircle.draw(args.pct);
		} else {
			$.fn.createSvg();
			$.fn.drawCircle.draw(args.pct);
		}
		
	};
	
	// this function is a shortcut to handle the jQuery elements data function
	$.d = function(key,val){
		if (typeof(val)=='undefined'){
			return $(self).data(key);
		} else {
			$(self).data(key,val);
		}
	};
})(jQuery);
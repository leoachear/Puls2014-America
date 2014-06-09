var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	var query = "SELECT * FROM geo.placefinder WHERE text='"+lat+", "+lon+"'";
	query += "AND gflags='R'";
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url + "q=" + query,
		dataType: 'jsonp',
		jsonpCallback: 'geocallback',
		data: {
			format: 'json'
		}
	});
}

function geocallback(datos){
	var info 	= datos.query.results.Result;
	var pais 	= info.country;
	var ciudad 	= info.city;
	var barrio	= info.neighborhood;
	var woeid	= info.woeid;

	var tmp = '<p><strong>'+barrio+'</strong><br>'+ciudad+', '+pais+' ('+woeid+')</p>';
	$('#geo').prepend(tmp);

	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var query = "SELECT * FROM weather.forecast WHERE woeid='"+woeid+"'";
	query += " AND u='c'"
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url + "q=" + query,
		dataType: 'jsonp',
		jsonpCallback: 'climacallback',
		data: {
			format: 'json'
		}
	});
}

function climacallback(datos){
	var clima 	= datos.query.results.channel;
	var temp 	= clima.item.condition.temp;
	var code	= clima.item.condition.code;
	var unit 	= clima.units.temperature;
	var img 	= new Image();
	img.src		= "http://l.yimg.com/a/i/us/we/52/"+code+".gif"

	$('#clima')
		.html('<strong>'+temp+'</strong> '+unit+'º')
		.prepend(img);
}

function loadLogos(){
	$.get('ajax_html.html', function(html){
		$('footer').append(html);
	});
}

function loadUser(){
	$.get('ajax_json.json', function(datos){
		var avatar = new Image();
		avatar.src = datos.avatar;
		avatar.title = datos.nombre+" "+datos.apellido;
		$('#avatar').append(avatar);
	})
}
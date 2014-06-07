var $form 		= $('#formulario'),
	$titulo 	= $('#titulo'),
	$url 		= $('#link'),
	$primerPost = $('.item').first()
	$lista 		= $('#contenido'),
	ss 			= sessionStorage;
	ls 			= localStorage;

if (ls.getItem('autosave')) {
	$titulo.val(ss.getItem('titulo'));
	$url.val(ss.getItem('url'));
}

var id = setInterval(function(){
	ss.setItem('titulo', $titulo.val());
	ss.setItem('url', $url.val());
}, 1000);

function mostrarOcultarFormulario(){
	$form.slideToggle();
	$lista.slideToggle();
	return false;
}

function agregarPost(e){
	e.preventDefault(); //reemplaza el return false que no se usa más.

	var titulo = $titulo.val(),
		url = $url.val(),
		$clone = $primerPost.clone();

	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href',url);
		
	$clone.hide(); //esto lo hago para ocultar el post, más abajo agregarlo y despues mostrarlo.
	
	$lista.prepend($clone);

	mostrarOcultarFormulario();
	$titulo.val("");
	$url.val("");
	// este no se ve porque el primer <article> tiene el attributo de CSS min-height: 128px;
	// sacándole este atributo desde CSS funciona.  Este es uno de los atributos que no se puede tocar mucho con JavaScript.
	$clone.fadeIn();
	//$clone.fadeIn(); //este es otro efecto.

/*	
	Esto lo sacamos porque no se usa más, lo reemplaza el e.preventDefault()
return false; //esto sirve para que no recargue la página, las funciones que están escuchando "mas arriba" van a recibir false.*/


	// Esta instrucción la detecta la consola, y se frema acá cuando se esté ejecutando
	// debugger;
}

function grabarInformacion(e){
	e.preventDefault();

	var titulo 	= $titulo.val(),
		url 	= $url.val(),
		ls 		= localStorage,
		ss 		= sessionStorage;

	ls.setItem('titulo', titulo);
	ls.setItem('url', url);

	ss.setItem('titulo', titulo);
	ss.setItem('url', url);

	mostrarOcultarFormulario();
	$titulo.val("");
	$url.val("");

}

$('#publicar_nav a').click(mostrarOcultarFormulario);
/*$form.on('submit',grabarInformacion);*/
$form.on('submit',agregarPost);
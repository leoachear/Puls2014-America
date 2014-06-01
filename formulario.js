var $form = $('#formulario'),
	$titulo = $('#titulo'),
	$url = $('#link'),
	$primerPost = $('.item').first()
	$lista = $('#contenido');

function mostrarOcultarFormulario(){
	$form.slideToggle();
	return false;
}

function agregarPost(){
	var titulo = $titulo.val(),
		url = $url.val(),
		$clone = $primerPost.clone();

	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href',url);
		
	$clone.hide(); //esto lo hago para ocultar el post, más abajo agregarlo y despues mostrarlo.
	
	$lista.prepend($clone);

	// este no se ve porque el primer <article> tiene el attributo de CSS min-height: 128px;
	// sacándole este atributo desde CSS funciona.  Este es uno de los atributos que no se puede tocar mucho con JavaScript.
	$clone.slideDown();
	//$clone.fadeIn(); //este es otro efecto.

	return false; //esto sirve para que no recargue la página, las funciones que están escuchando "mas arriba" van a recibir false.

	// Esta instrucción la detecta la consola, y se frema acá cuando se esté ejecutando
	// debugger;
}

$('#publicar_nav a').click(mostrarOcultarFormulario);
$form.on('submit',agregarPost)
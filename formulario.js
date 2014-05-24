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
		clone = $primerPost.clone();

	clone.find('.titulo_item a')
		.text(titulo)
		.attr('href',url)
		
	clone.hide()

	$lista.prepend(clone)

	// este no se ve porque el primer <article> tiene el attributo de CSS min-height: 128px;
	// sacándole este atributo desde CSS funciona.  Este es uno de los atributos que no se puede tocar mucho con JavaScript.
	clone.slideDown()

	// Esta instrucción la detecta la consola, y se frema acá cuando se esté ejecutando
	// debugger;
}

$('#publicar_nav a').click(mostrarOcultarFormulario);
$('#formulario').on('submit',agregarPost)
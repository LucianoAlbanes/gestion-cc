// jQuery
$(document).ready(function () {
	$('select').formSelect() //Selección de tipos
	$('.datepicker').datepicker(); // Selección de fechas
})

//Variables de informacion
var texto_identificacion = document.getElementById('txt_identificacion')
var texto_nombre = document.getElementById('txt_nombre')
var texto_nombre2 = document.getElementById('txt_nombre2')
var texto_apellido = document.getElementById('txt_apellido')

var texto_tipo_de_cuenta = document.getElementById('type_cuenta')
var texto_cuenta_moneda = document.getElementById('type_cuenta_moneda')
var texto_cuenta_id = document.getElementById('txt_cuenta_id')
var texto_tna_descubierto = document.getElementById('txt_tna_descubierto')
var texto_tna_positiva = document.getElementById('txt_tna_positiva')

var texto_monto = document.getElementById('txt_monto')
var texto_descripcion = document.getElementById('txt_descripcion')
var texto_tipo_de_operación = document.getElementById('type_operation')
var texto_canal = document.getElementById('type_canal')



var boton_crear = document.getElementById('btn_crear')
boton_crear.addEventListener('click', crearCuenta)

var cuenta_actual



// CLASES Y FUNCIONES
class Cuenta {
	constructor(nombre, nombre2, apellido, id, cuenta_type, cuenta_id, cuenta_moneda, tna_descubierto, tna_positiva) {
		this.cuenta_type = cuenta_type
		this.cuenta_id = cuenta_id
		this.cuenta_moneda = cuenta_moneda
		this.tna_descubierto = tna_descubierto
		this.tna_positiva = tna_positiva

		this.nombre = nombre
		this.nombre2 = nombre2
		this.apellido = apellido
		this.identificacion = id
		this.operaciones = []
	}
}

class Operacion {
	constructor(operation_type, description, canal, amount) {
		//Identificadores
		this.operation_type = operation_type
		this.description = description
		this.canal = canal
		//Fecha
		this.date = new Date()
		this.day = this.date.getDate()
		this.month = this.date.getMonth()
		this.year = this.date.getFullYear()
		//Dinero
		this.amount = amount
		this.balance = this.amount
		this.uncovered = (this.balance > INTERESES_DESDE)
	}
}


function exportarCuenta() { //Exportar y descargar la cuenta
	var dataStr = JSON.stringify(cuenta_actual);
	var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

	var exportFileDefaultName = `${CUENTAS_TYPE[cuenta_actual.cuenta_type].name}-${cuenta_actual.cuenta_moneda}-${cuenta_actual.cuenta_id}.json` //'data.json';

	var linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
}

function crearCuenta() {
	cuenta_actual = new Cuenta(texto_nombre.value, texto_nombre2.value, texto_apellido.value, texto_identificacion.value, texto_tipo_de_cuenta.value, texto_cuenta_id.value, MONEDAS[texto_cuenta_moneda.value], texto_tna_descubierto.value, texto_tna_positiva.value)
	nuevoRegistro()
	exportarCuenta()
}

function nuevoRegistro() {
	var op_id = texto_tipo_de_operación.value
	var op_cn = texto_canal.value
	if (OPERACIONES[op_id].type === OPERACIONES_TYPE[0] && texto_descripcion.value != '' && texto_monto.value != 0) {
		registrarOperación(OPERACIONES[op_id].name, texto_descripcion.value, CANALES[op_cn], (0 - texto_monto.value))
	} else if (OPERACIONES[op_id].type === OPERACIONES_TYPE[1] && texto_descripcion.value != '' && texto_monto.value != 0) {
		registrarOperación(OPERACIONES[op_id].name, texto_descripcion.value, CANALES[op_cn], texto_monto.value)
	}
}

function registrarOperación(a, b, c, d) {
	cuenta_actual.operaciones.push(new Operacion(a, b, c, parseFloat(d)))
}
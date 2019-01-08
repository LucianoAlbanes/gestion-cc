// jQuery
$(document).ready(function(){
	$('select').formSelect() //Selección de tipos
})

//Importar cuenta
var boton_importar_cuenta = document.getElementById('btn_importar') //define boton import
var cuenta_importada = document.getElementById('txt_cuenta_importada') //define cuadro de texto import
boton_importar_cuenta.addEventListener('click', importarCuenta) // añade listener boton import

function importarCuenta() { //Importar y reemplazar
	cuenta_actual = JSON.parse(cuenta_importada.value) 
	mostrarDatos()
}


var cuenta_actual //Define la cuenta a trabajar

//Mostrar datos
var texto_datos_cuenta = document.getElementById('txt_datos_cuenta')
var titulo = document.getElementById('txt_title')

function mostrarDatos() {
	titulo.innerHTML = `Gestion de cuenta corriente | ${cuenta_actual.nombre} ${cuenta_actual.nombre2.charAt(0)}. ${cuenta_actual.apellido} | Saldo: $ ${(calcularBalance() + calcularIntereses()).toFixed(2)}`
	texto_datos_cuenta.innerHTML = `Nombre: <strong>${cuenta_actual.nombre} ${cuenta_actual.nombre2.charAt(0)}. ${cuenta_actual.apellido}</strong><br />
	Cuenta: <strong>${CUENTAS_TYPE[cuenta_actual.cuenta_type].name}-${cuenta_actual.cuenta_moneda}-${cuenta_actual.cuenta_id}</strong><br />
	Saldo: <strong>${cuenta_actual.cuenta_moneda}  ${(calcularBalance() + calcularIntereses()).toFixed(2)}</strong><br /><br />
	DNI/CUIT: <strong>${cuenta_actual.identificacion}</strong><br />
	TNA Descubierto: <strong>${cuenta_actual.tna_descubierto}%</strong> | TNA Positiva: <strong>${cuenta_actual.tna_positiva}%</strong><br />`
}

//Registrar operaciones


var texto_monto = document.getElementById('txt_monto')
var texto_descripcion = document.getElementById('txt_descripcion')
var texto_tipo_de_operación = document.getElementById('type_operation')
var texto_canal = document.getElementById('type_canal')
var boton_registrar = document.getElementById('btn_registrar')
var boton_registrar_intereses = document.getElementById('btn_registrar_intereses')

boton_registrar.addEventListener('click', nuevoRegistro)
boton_registrar_intereses.addEventListener('click', registarIntereses)



//Exportar
var boton_exportar_cuenta = document.getElementById('btn_exportar') //define boton export
var texto_exportado = document.getElementById('txt_cuenta_exportada') // define cuadro de texto para export
boton_exportar_cuenta.addEventListener('click', exportarCuenta)  // añade listener boton export


function exportarCuenta() {  //Exportar y descargar la cuenta
	var dataStr = JSON.stringify(cuenta_actual);
	var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
	
	var exportFileDefaultName = `${CUENTAS_TYPE[cuenta_actual.cuenta_type].name}-${cuenta_actual.cuenta_moneda}-${cuenta_actual.cuenta_id}.json` //'data.json';
	
	var linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
}

//Mostrar ultimos movimientos
var boton_mostrar_ultimos_movimientos = document.getElementById('btn_mostrar_ultimos_movimientos')
boton_mostrar_ultimos_movimientos.addEventListener('click', mostrarUltimosMovimientos)
var texto_ultimos_movimientos = document.getElementById('txt_ultimos_movimientos')
var switch_mostrar_intereses = document.getElementById('switch_mostrar_intereses')


function mostrarUltimosMovimientos() {
	var cantidad_de_movimientos = cuenta_actual.operaciones.length	
	texto_ultimos_movimientos.innerHTML = ''
	console.log('				Cantidad de movimientos: ' + cantidad_de_movimientos)

	for (var index = cantidad_de_movimientos - 1; index >= cantidad_de_movimientos - CANTIDAD_DE_MOVIMIENTOS_A_MOSTRAR && index >= 0; index -= 1) {
		var op_actual = cuenta_actual.operaciones[index]
		if (switch_mostrar_intereses.checked == true || op_actual.operation_type != OPERACIONES[7].name) {
		console.log('Operación Nº: ' + index)
		texto_ultimos_movimientos.innerHTML +=  `Operación Nº ${index} | Fecha: ${op_actual.day}/${op_actual.month + 1}/${op_actual.year} <br />
		Tipo de operación: <strong>${op_actual.operation_type}</strong>  |  Descripción: ${op_actual.description}  |  Metodo: ${op_actual.canal} <br />
		<strong>Monto:</strong> $  ${op_actual.amount.toFixed(2)}  |  <strong>Saldo:</strong> $  ${op_actual.balance.toFixed(2)}`
		texto_ultimos_movimientos.innerHTML += '<br /><hr />'
		}
	}
}


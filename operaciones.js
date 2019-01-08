// Clase Operación
class Operacion {
	constructor(operation_type, description, canal, amount){
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
		this.balance = calcularBalance() + this.amount
		this.uncovered = (this.balance > INTERESES_DESDE)
	}
}

function nuevoRegistro() {
	var op_id = texto_tipo_de_operación.value
	var op_cn = texto_canal.value
	calcularIntereses()
	if (OPERACIONES[op_id].type === OPERACIONES_TYPE[0] && texto_descripcion.value != '' && texto_monto.value != 0){
		registrarOperación(OPERACIONES[op_id].name, texto_descripcion.value, CANALES[op_cn], (0 - texto_monto.value))
	}
	else if (OPERACIONES[op_id].type === OPERACIONES_TYPE[1] && texto_descripcion.value != '' && texto_monto.value != 0) {
		registrarOperación(OPERACIONES[op_id].name, texto_descripcion.value, CANALES[op_cn], texto_monto.value)
	}
}	

// Funciones Auxiliares
function calcularBalance() {
	return cuenta_actual.operaciones.reduce(function(acumulador, currentvalue, index) {
		return acumulador + cuenta_actual.operaciones[index].amount}, 0)
}


function calcularIntereses() {
	var ultima_op = cuenta_actual.operaciones.length - 1 
	var intereses = 0
	if (cuenta_actual.operaciones[ultima_op].uncovered && cuenta_actual.operaciones[ultima_op].balance >= INTERESES_DESDE) { //Descubierto
		var dias_en_descubierto = calcularDiferenciaDias(ultima_op)
		intereses = ((calcularBalance() * (1 + cuenta_actual.tna_descubierto/100/365)** dias_en_descubierto) - calcularBalance())
		console.log('Intereses en descubierto :' + intereses)
	}
	else if (cuenta_actual.operaciones[ultima_op].balance < 0 - INTERESES_DESDE && CUENTAS_TYPE[cuenta_actual.cuenta_type].profit) {
		var dias_en_saldo_positivo = calcularDiferenciaDias(ultima_op)
		intereses = ((calcularBalance() * (1 + cuenta_actual.tna_positiva/100/365)** dias_en_saldo_positivo) - calcularBalance())
		console.log('Intereses a favor: ' + intereses)
	}
	else {
		console.log('A esta operación no le corresponde intereses de ningún tipo')
	}
	return intereses
}


function calcularDiferenciaDias(desde_operacion) {
	//Set the two dates
	var fecha_ultima_operación = new Date(cuenta_actual.operaciones[desde_operacion].year, cuenta_actual.operaciones[desde_operacion].month, cuenta_actual.operaciones[desde_operacion].day)
	var hoy = new Date()
	// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
  var datepart = 'd'
  var diff = hoy - fecha_ultima_operación
  var divideBy = { w:604800000, 
		d:86400000, 
		h:3600000, 
		n:60000, 
		s:1000 }
	return Math.floor(diff/divideBy[datepart])
}

function registrarOperación(a, b, c, d) {
	registarIntereses()
	cuenta_actual.operaciones.push(new Operacion(a, b, c, parseFloat(d)))
	mostrarDatos()
}

function registarIntereses() {
	if (cuenta_actual.operaciones[cuenta_actual.operaciones.length - 1].uncovered && calcularIntereses() >= INTERESES_DESDE) {
		cuenta_actual.operaciones.push(new Operacion(OPERACIONES[7].name, (`Descubierto TNA: ${cuenta_actual.tna_descubierto}%`), 'Automático', calcularIntereses()))
	}
	else if (cuenta_actual.operaciones[cuenta_actual.operaciones.length - 1].balance < 0 - INTERESES_DESDE && CUENTAS_TYPE[cuenta_actual.cuenta_type].profit && calcularIntereses() <= 0 -INTERESES_DESDE) {
		cuenta_actual.operaciones.push(new Operacion(OPERACIONES[9].name, (`Ganancias TNA: ${cuenta_actual.tna_positiva}%`), 'Automático', calcularIntereses()))
	}
	mostrarDatos()
}


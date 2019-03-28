const INTERESES_DESDE = 0.005
const CANTIDAD_DE_MOVIMIENTOS_A_MOSTRAR = 110

const OPERACIONES = [
	{'name': 'Ingreso de dinero', 'type': 'crédito'}, //0
	{'name': 'Pago de servicios', 'type': 'débito'},  //1
	{'name': 'Pago de expensas', 'type': 'débito'},   //2
	{'name': 'Pagos varios', 'type': 'débito'},       //3
	{'name': 'Prestamo', 'type': 'débito'},           //4
	{'name': 'Ajuste crédito', 'type': 'crédito'},    //5
	{'name': 'Ajuste débito', 'type': 'débito'},      //6
	{'name': 'Intereses', 'type': 'débito'},          //7
	{'name': 'Extracción', 'type': 'débito'},         //8
	{'name': 'Intereses positivos', 'type': 'crédito'}  //9
]

const OPERACIONES_TYPE = [
	'crédito', //0
	'débito'   //1
]

const CANALES = [
	'Efectivo',          //0
	'Ualá 7754',         //1
	'Ualá 4696',         //2
	'Wilobank 0008',     //3
	'Wilobank 1003',     //4
	'BNA 6600',          //5
	'BNA 2015',          //6
	'BNA 4190',          //7
	'Manual'             //8
]

const MONEDAS = [
	'ARS',     //0
	'USD'      //1
]

const CUENTAS_TYPE = [
	{'name': 'CC', 'profit': false}, //0
	{'name': 'CA', 'profit': true}, //1
	{'name': 'PF', 'profit': true}, //2
]

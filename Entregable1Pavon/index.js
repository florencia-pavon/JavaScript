//Funciones
const menu = () => {
    console.log(`MENU
                1. Sumar
                2. Restar
                3. Multiplicar
                4. Dividir
                5. Saber si es par
                6. Mostrar historial
                7. Salir del menu`);
    let opcion = Number(prompt("Eliga una opcion: "));
    return opcion;
}

function cargarNumero(){
    let nro;
    do {
        nro = Number(prompt("Ingrese un numero: "))
    }
    while(isNaN(nro));
    return nro;
}

function calcular(opcion, nro1, nro2 = 0){
    switch(opcion){
        case 1: resultado = nro1 + nro2; break;
        case 2: resultado = nro1 - nro2; break;
        case 3: resultado = nro1 * nro2; break;
        case 4: resultado = nro2 !== 0 ? nro1/nro2 : "Division por cero"; break;
        case 5: resultado = nro1 % 2 === 0 ? "Par" : "Impar"; break;
        default: resultado = "Opción inválida"; break;
    }
    return resultado;
}

function agregarAlHistorial(resultado){
    operaciones.push(resultado);
}

function mostrarHistorial(){
    if (operaciones.length > 0){
        console.log(operaciones);
    }
    else {
        console.log("No se ha realizado ninguna operacion todavia")
    }
    
}

function mostrarResultado(resultado){
    console.log(resultado);
}

//Variables
let operaciones = [];
let resultado;
let nro1, nro2;



//Procesamiento
let opcion = menu();
function iniciarCalculadora(){
    while (opcion !== 7){
        if (opcion !== 6){
            nro1 = cargarNumero();
            if (opcion !== 5){
                nro2 = cargarNumero();
                }
            resultado = calcular(opcion, nro1, nro2);
            agregarAlHistorial(resultado);
            mostrarResultado(resultado);    
            }
        else{
            mostrarHistorial();
            }

            opcion = menu();
        
    }  
    alert("Ha salido de la calculadora")      
}


//Ejecucion
iniciarCalculadora();

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
        nro = Number(prompt("Ingrese un número: "));
        if (isNaN(nro)){
            alert("Debe ingresar un caracter numérico")
        }
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
    if (resultado !== "Opción inválida" && resultado !== "Division por cero"){
        operaciones.push(resultado);
    }
}

function mostrarHistorial(){
    let longitud = operaciones.length;
    if (longitud > 0){
        for (let i = 0; i < longitud; i++){
            console.log(`Resultado operacion Nº ${i+1}: ${operaciones[i]}`);
        }      
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
let opcion;
function iniciarCalculadora(){
    do {
        opcion = menu();
        if (opcion === 7){
            let confirma = confirm("Esta seguro que desea salir?");
            if (!confirma){
                opcion = 0;
                continue;
            }
        }

        if (opcion >= 1 && opcion <= 5){
            nro1 = cargarNumero();
            if (opcion !== 5){
                nro2 = cargarNumero();
                }
            resultado = calcular(opcion, nro1, nro2);
            agregarAlHistorial(resultado);
            mostrarResultado(resultado);    
            }
        else if (opcion === 6){
            mostrarHistorial();
        }
        else if (opcion!== 7){
            alert("Opcion invalida intente nuevamente")
        }
    } while ((opcion !== 7));
    alert("Ha salido de la calculadora") ;     
}


//Ejecucion
iniciarCalculadora();

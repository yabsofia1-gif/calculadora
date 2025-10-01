const botonNumero = document.getElementsByName('data-number');
const botonOpera = document.getElementsByName('data-opera');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];
const botonDeleteLast = document.getElementsByName('data-delete-last')[0];

let result = document.getElementById('result');
let opeActual = '';
let opeAnterior = '';
let operación = undefined;

botonNumero.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerText);
    });
});

botonOpera.forEach(function(boton){
    boton.addEventListener('click', function(){
        selectOperacion(boton.innerText);
    });
});

botonIgual.addEventListener('click',function(){
    calcular();
    actualizarDispley();
});

botonDelete.addEventListener('click',function(){
    clear();
    actualizarDispley();
});

botonDeleteLast.addEventListener('click',function(){
    deleteLast();
    actualizarDispley();
});

function agregarNumero(num){
    opeActual = opeActual.toString() + num.toString();
    actualizarDispley();
}

function actualizarDispley(){
    result.value = opeActual;
}


function selectOperacion(op){
     if (opeActual === '') return;
     if(opeAnterior !== ''){
        calcular();
     }
     operación = op.toString();
     opeAnterior = opeActual;
     opeActual = '';
}

function calcular(){
    let calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat (opeActual);
    if(isNaN(anterior) || (isNaN(actual) && !['√', '!', 'log', 'sin', 'cos', 'tan', 'exp', 'x²', 'x³'].includes(operación))) return;
    switch(operación){
     case '+':
            calculo =  anterior + actual;
            break;

     case '-':
           calculo = anterior - actual
            break;

     case 'x':
           calculo = anterior * actual;
            break;

     case '/':
                calculo = anterior / actual;
                break;
     case '%':
                calculo = anterior % actual;
                break;
     case '^':
                calculo = Math.pow(anterior, actual);
                break;
     case '√':
                calculo = Math.sqrt(anterior);
                break;
     case '/':
                if (anterior < 0) calculo = undefined;
                else if (anterior === 0 || anterior === 1) calculo = 1;
                else {
                    calculo = 1;
                    for (let i = 2; i <= anterior; i++) {
                        calculo *= i;
                    }
                }
                break;
     case 'log':
                calculo = Math.log(anterior);
                break;
     case 'sin':
                calculo = Math.sin(anterior);
                break;
     case 'cos':
                calculo = Math.cos(anterior);
                break;
     case 'tan':
                calculo = Math.tan(anterior);
                break;
     case 'exp':
                calculo = Math.exp(anterior);
                break;
     case 'x²':
                calculo = anterior ** 2;
                break;
     case 'x³':
                calculo = anterior ** 3;
                break;

     
      default:
                return;

    }
    opeActual = calculo;
    operación = undefined;
    opeAnterior = '';
}

function deleteLast(){
    opeActual = opeActual.slice(0, -1);
}

function clear(){
    opeActual = '';
    opeAnterior = '';
    operación = undefined;
}

clear();


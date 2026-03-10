// let = pode ser alterado, mas não declarado novamente
let nome = "Anthonny";

// const = o valor da variável não muda
const sobrenome = "Vitoriano";

// a crase ` é utilizada para formatar as strings e passar as variáveis
let templateString = `O meu nome é ${nome} ${sobrenome}`;

console.log(templateString);



// Number não difeencia por ponto flutuante 
let A = 2;
let B = 5.56;
let C = -3.14;
let PI = 3.14;

let potencia = A ** C; 
console.log(typeof A);
console.log(typeof B);
console.log(`${A} ^ ${C} = ${potencia}`);


// typeof serve para verificar o tipo da variavel

// Boolean
let verdadeiro = true;
let falso = false;
console.log(typeof verdadeiro);

// Operadores Logicos
let E = verdadeiro && falso;
let Ou = verdadeiro || falso;

console.log(E);
console.log(Ou);

let maior_que = B > A;   // Outros: <= , >=, *, !
console.log(`${B} > ${A} = ${maior_que}`);


// Arrays 

let numeros = [1, 3.14, -7, 99, 505.67];
console.log(`numeros[0] = ${numeros[0]}`);
console.log(`numeros[3] = ${numeros[3]}`);
console.log(typeof numeros);

// Object 
// podem ser compostos por atributos de todos os tipos
let pessoa =  {
    nome: 'João',
    cpf: 123,
    telefone: 61999999999
};

console.log(pessoa);
console.log(`pessoa.nome = ${pessoa.nome}`);


// verificar se um numero é par ou ímpar
function verificarNumero(A){
    if (A % 2 === 0){
        console.log(`${A} é par`);
    }else{
        console.log(`${A} é ímpar`);
    }
}


verificarNumero(4);
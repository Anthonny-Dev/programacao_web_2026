function transporMatriz(A){

    console.log("Matriz original:");
    console.log(A);

    let linhas = A.length;
    let colunas = A[0].length;

    let transposta = [];

    for(let j = 0; j < colunas; j++){
        transposta[j] = [];

        for(let i = 0; i < linhas; i++){
            transposta[j][i] = A[i][j];
        }
    }

    console.log("Matriz transposta:");
    console.log(transposta);
}

let A = [
    [1,2],
    [3,4],
    [5,6]
];

transporMatriz(A);
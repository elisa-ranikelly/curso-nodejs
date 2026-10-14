var divisao = function(a, b){
    if(a === 0 || a < b){
        return "Divisão inválida: 0";
    }

    return a / b;
}

export default divisao;
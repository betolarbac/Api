'use strict';

const limparForm = (endereco) => {
    //limpar formulario toda vez que uma nova pesquisa for feita 
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';

}


//recebimento dos dados no formulario e preenchimento 
const preencherForm = (endereco) => {
    //retorna os dados da Api retornando e preenchendo no html 
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;

}


// verificação se é um numero e validar so caracteres de numeros 
const eNumero = (numero) => /^[0-9]+$/.test(numero);

//limitação de 8 numeros no cep 
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

//função para pequisar o cep
const pesquisarCep = async() => {
    limparForm()
    //pegar o valor digitado no id cep 
    const cep = document.getElementById('cep').value;
    // url da Api do cep para ser consultado ao executar a função 
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    // await aguandando a função retorna os dados 

    //validação do cep 
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
    
        //tratamento de erro caso o cep não seja encontrado 
        //hasOwnProperty devolve um booleano pesquisado no objeto 
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado';
        }else {
            preencherForm(endereco);
        }
    }else {
        document.getElementById('endereco').value = 'CEP não encontrado';
    }

    
}

//pegar Id do html cep 
// assistir o evento da ide e quando perde o foco acionar a função 
document.getElementById('cep').addEventListener('focusout', pesquisarCep);


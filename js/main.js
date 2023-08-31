let logout = document.querySelector("#logout");


// SELÇOÕES DE ELEMENTOS DE FORMULARIO
let bntDeCadastroDeValor = document.querySelector("#cadastroValor");
let popupDeCadastroDeValor = document.querySelector("#popupDeCadastroValor");
let cadastrarValor = document.querySelector("#cadastraValor");
let popupCadastro = document.querySelector(".popup_cadastro");
let corpoDaTabela = document.querySelector("#corpoDaTabela");
let informacoesDoForm = [];

// Desloga o usuario
function deslogar() {
  logout.addEventListener("click", () => {
    console.log("clicou");
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "/login.html";
      })
      .catch(() => {
        const popup = document.getElementById("popup");
        popup.style.display = "flex";
        txtDoPopUp.textContent = "Erro ao tentar deslogar";
      });
  });
}

// Bloqueia o acesso de usuarios que tentem acessar a main estando sem autenticação no firebase
function bloquearAcesso() {
  //Vai ficar buscando de tempos em tempos o status da validação do usuario
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (!user) {
      window.location.href = "/login.html";
    }
  });
}

// Criação do grafico
function grafico() {
  const ctx = document.getElementById("myChart");
  let valoresEntrantes = [120, 1900, 20, 0, 0, 1000];
  let valoresSaintes = [200, 300, 700, 600, 200, 106];
  let resultadosSubtracao = "";
  let colorSaldo = "";

  // Calcula o saldo
  function caculaMediaSaldo() {
    // Criar um novo array para guardar os resultados da subtração
    resultadosSubtracao = valoresEntrantes.map((vs, i) => {
      let valorSainte = valoresSaintes[i]; // Obter o valor correspondente em valoresSaintes
      return vs - valorSainte; // Subtrair os valores e retornar o resultado
    });

    let saldo = resultadosSubtracao.reduce((ac, number) => ac + number);
    if (saldo < 0) {
      colorSaldo = "#f21505";
    } else {
      colorSaldo = "#0a02f0";
    }
  }

  caculaMediaSaldo();

  // Gera grafico
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"],
      datasets: [
        {
          label: "#Entradas",
          data: valoresEntrantes,
          borderWidth: 2,
          borderColor: "#05f0dc",
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "#Saídas",
          data: valoresSaintes,
          borderWidth: 2,
          borderColor: "#45d606",
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "#Saldo",
          data: resultadosSubtracao,
          borderWidth: 2,
          borderColor: colorSaldo,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Vai cadastra a entrada ou a saida do valor por pessoa
function cadastroDeEntradaOuSaida(){
  //Abre o Popup para cadastro de valor
  bntDeCadastroDeValor.addEventListener("click", () => {
    popupDeCadastroDeValor.style.display = "flex"

    // Verifica se o popup esta aberto
    if(popupDeCadastroDeValor.style.display == "flex"){
      //Pega o evento de click dentro do modal, se for dentro ele pausa a propação
      popupCadastro.addEventListener("click", (e) => {
        e.stopPropagation()
      })

      // Caso o click seja fora fecha o popup
      popupDeCadastroDeValor.addEventListener("click", () =>{ 
        popupDeCadastroDeValor. style.display = "none"
      })
    }

  })


  // Cadastra e fecha a Popup para cadastro de valor
  cadastrarValor.addEventListener("click", () => {
    popupDeCadastroDeValor.style.display = "none"
  })
}

cadastroDeEntradaOuSaida()


function cadastroDeEntradaOuSaida() {
  //Abre o Popup para cadastro de valor
  bntDeCadastroDeValor.addEventListener("click", () => {
    popupDeCadastroDeValor.style.display = "flex";

    // Verifica se o popup esta aberto
    if (popupDeCadastroDeValor.style.display == "flex") {
      //Pega o evento de click dentro do modal, se for dentro ele pausa a propação
      popupCadastro.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      // Caso o click seja fora fecha o popup
      popupDeCadastroDeValor.addEventListener("click", () => {
        popupDeCadastroDeValor.style.display = "none";
      });
    }
  });

  // Cadastra e fecha a Popup para cadastro de valor
  cadastrarValor.addEventListener("click", () => {
    popupDeCadastroDeValor.style.display = "none";
  });
}

cadastroDeEntradaOuSaida();

function createLinhaTabela() {}

function cadastraTransacao() {
  let botaoGerarCadastro = document.querySelector("#cadastraValor");
  let count = 0;

  function erroCadastro(){
    window.alert("Verifique as informações Cadastradas")
  }
  botaoGerarCadastro.addEventListener("click", () => {
    // Pega os campos que o popup possui
    let titulo = document.querySelector("#titleCadatro");
    let campoSelecionavel = document.querySelector("#selectCadastro");
    let valor = document.querySelector("#valueCadastro");
    let categoria = document.querySelector("#categoryCadastro");
    
    
    const paragraphs = document.querySelectorAll('.form_DE p');

    //Sequencia de validações para saber se exite algum campo vazio dentro do Popup    
    if (titulo.value == "") {
      titulo.style.border = "2px solid red";
      popupDeCadastroDeValor.style.display = "flex";
      paragraphs[0].style.color = 'red'
      return erroCadastro()
      
    } else {
      titulo.style.border = "transparent";
    }

    if (campoSelecionavel.value == "") {
      campoSelecionavel.style.border = "2px solid red";
      popupDeCadastroDeValor.style.display = "flex";
      paragraphs[1].style.color = 'red'
      return erroCadastro()
    } else {
      titulo.style.border = "transparent";
    }

    if (valor.value == "") {
      valor.style.border = "2px solid red";
      popupDeCadastroDeValor.style.display = "flex";
      paragraphs[2].style.color = 'red'

      return erroCadastro()
    } else {
      titulo.style.border = "transparent";
    }

    if (categoria.value == "") {
      categoria.style.border = "2px solid red";
      popupDeCadastroDeValor.style.display = "flex";
      paragraphs[3].style.color = 'red'
      return erroCadastro()
    } else {
      titulo.style.border = "transparent";
    }
    //  -------------------------------------------------------------------------------

    // Pega a data atual e formata 
    function pegarDataDoCadastro() {
      let date = new Date();
      let dia = date.getDate();
      let mes = date.getMonth() + 1;
      let ano = date.getFullYear();

      if (dia < 10) {
        dia = `0${dia}`;
      }

      if (mes < 10) {
        mes = `0${mes}`;
      }

      return `${dia}/${mes}/${ano}`;
    }


    // Cria objeto com as informações passadas pelo usuario
    let row = {
      descricao: titulo.value,
      valor: valor.value,
      categoria: categoria.value,
      date: pegarDataDoCadastro(),
    };

    // Salva o objeto dentro do array
    informacoesDoForm.push(row);

    // Cria linha na tabela com as informações aicionadas no popup
    function criarLinhaNaTabela() {
      let tr = document.createElement("tr");
      tr.className = "contentValue";

      corpoDaTabela.appendChild(tr);

      let thDesc = document.createElement("th");
      thDesc.id = "descricao";
      thDesc.textContent = informacoesDoForm[count].descricao;

      let thCategory = document.createElement("th");
      thCategory.id = "categoria";
      thCategory.textContent = informacoesDoForm[count].categoria;

      let thValor = document.createElement("th");
      thValor.id = "valor";
      thValor.textContent = informacoesDoForm[count].valor;

      let thData = document.createElement("th");
      thData.id = "data";
      thData.textContent = informacoesDoForm[count].date;

      tr.appendChild(thDesc);
      tr.appendChild(thCategory);
      tr.appendChild(thValor);
      tr.appendChild(thData);

      count = count + 1;
    }
    criarLinhaNaTabela();


    // Limpa dados do campo de popup para cadastro de entrada / saida
    function limparCampos(){
      titulo.value = ""
      campoSelecionavel.value = ""
      valor.value = ""
      categoria.value = ""
    }

    limparCampos()
  });
}

cadastraTransacao();

grafico();

bloquearAcesso();
deslogar();

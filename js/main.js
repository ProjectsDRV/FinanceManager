let logout = document.querySelector("#logout");
let bntDeCadastroDeValor = document.querySelector("#cadastroValor")
let popupDeCadastroDeValor = document.querySelector("#popupDeCadastroValor")
let cadastrarValor = document.querySelector("#cadastraValor")
let popupCadastro = document.querySelector('.popup_cadastro');


// Desloga o usuario
function deslogar() {
  logout.addEventListener("click", () => {
    console.log("clicou");
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "/FinanceManager/login.html";
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
      window.location.href = "/FinanceManager/login.html";
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
        popupDeCadastroDeValor.style.display = "none"
      })
    }
    
  })





  // Cadastra e fecha a Popup para cadastro de valor
  cadastrarValor.addEventListener("click", () => {
    popupDeCadastroDeValor.style.display = "none"
  })
}
cadastroDeEntradaOuSaida()












grafico();

bloquearAcesso();
deslogar();

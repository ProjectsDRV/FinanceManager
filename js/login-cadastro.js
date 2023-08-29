let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let erroDeLogin = document.querySelector("#erro");
let recuperaSenha = document.querySelector("#recuperar_senha");
let botao = document.querySelector("#btn");
let popup = document.querySelector("#popup");
let imgPop = document.querySelector("#img")

// Quando o campo não existir vai passar o valor de false para a variavel
let dataDeNascimento = document.querySelector("#date") || false;
let txtDoPopUp = document.querySelector("#txtDoPopUp");

let btnFecharPopup = document.querySelector("#btnFecharPopup");
let problemaEmail = "";
let problemasSenha = "";

// Verifica se os campos de inputs estão vazios
function verificaCamposInput() {
  //Valida email em tempo real
  email.addEventListener("input", () => {
    const emails = email.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(emails)) {
      email.style.color = "#049dd9";
      email.style.border = "2px solid #049dd9";
      erroDeLogin.innerHTML = "";
      problemaEmail = "";
    } else {
      email.style.color = "red";
      email.style.border = "2px solid red";

      // //Caso o email esteja incorreto, adionar o valor verdadeiro para verificar quando o cliente clicar em logar/cadastrar
      problemaEmail = true;
    }
  });

  //Valida se a senha tem quantidade minima de caracteres permitidas em tempo real
  senha.addEventListener("input", () => {
    if (senha.value.length < 6) {
      senha.style.color = "red";
      senha.style.border = "2px solid red";
      erroDeLogin.innerHTML = "";

      //Caso senha esteja incorreta, adionar o valor verdadeiro para verificar quando o cliente clicar em logar/cadastrar
      problemasSenha = true;
    } else {
      senha.style.color = "#049dd9";
      senha.style.border = "2px solid #049dd9";
      problemasSenha = "";
    }
  });

  // Quando é clicado no botão de login/cadastro verifica os campos
  botao.addEventListener("click", () => {
    //Para não da o refresh na aba
    event.preventDefault();

    //Verifica se possui inputs vazios
    if (email.value != "" && senha.value != "") {
      //Verifica se o email informado foi validado
      if (problemaEmail == true) {
        popup.style.display = "flex";
        txtDoPopUp.textContent = "O email informado não é válido";

        //Verifica se a senha informada foi validada
      } else if (problemasSenha == true) {
        popup.style.display = "flex";
        txtDoPopUp.textContent = "A senha informada é menor que o permitido!";

        // Verifica se a data de nascimento foi informada
      } else if (dataDeNascimento.value == "") {
        popup.style.display = "flex";
        txtDoPopUp.textContent = "Por favor! Informe a sua data de nascimento";

        //se estiver tudo OK vai seguir com a logica do banco que vai ser adicionada abaixo
      } else {
        if (botao.value == "logar") {
          //Auntentica o usuario
          auth(email, senha);
        } else {
          //Cadastrar
          register(email, senha);
        }
      }
    } else {
      //Se possuir campos vazios passa a mensagem para preencher todos os campos
      popup.style.display = "flex";
      txtDoPopUp.textContent = "Preencha todos os campos!";
    }
  });
}

// Recuperar senha do usuario
function recuperarSenha() {
  recuperaSenha.addEventListener("click", () =>{
    showLoading();
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        hideLoading();
        popup.style.display = "flex";
        imgPop.src = "assets/check.png"
        txtDoPopUp.textContent = "Email para recuperação de senha enviado com sucesso!";
      }).catch((err) => {
        hideLoading();
        alert("erroo")
      })
  })

}

recuperarSenha()
// Fecha o popup
function fecharPoup() {
  btnFecharPopup.addEventListener("click", () => {
    event.preventDefault();
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  });
}

//Matem o usuario logado, quando ele tentar acessar login sem deslogar antes
function manterUsuarioLogado() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "/main.html";
    }
  });
}
manterUsuarioLogado();

fecharPoup();
verificaCamposInput();

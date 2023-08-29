function register(email, senha) {
  // Exibe atela de carregamento
  showLoading();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, senha.value)
    .then(() => {
      //Fecha tela de carregamento
      hideLoading();
      //Direciona para Pagina principal
      window.location.href = "/main.html";

      //Aqui vai ser chamada a função
    })
    .catch((error) => {
        hideLoading();
      //Usuario e senha incorretos
      if (error.code == "auth/email-already-in-use") {
        //Fecha tela de carregamento
        erroDeLogin.innerHTML = "Email já esta cadastrado";
        erroDeLogin.style.fontSize = "14px";

        email.style.color = "red";
        email.style.border = "2px solid red";

        //Erro desconhecido
      } else if (error.code == "auth/network-request-failed") {
        erroDeLogin.innerHTML = "Erro na conexão! Verifique sua rede.";
        erroDeLogin.style.fontSize = "14px";

        // Caso dê erro desconhecido
      } else {
        erroDeLogin.innerHTML = "Erro desconheido " + error.message;
        erroDeLogin.style.fontSize = "14px";
      }
    });
}

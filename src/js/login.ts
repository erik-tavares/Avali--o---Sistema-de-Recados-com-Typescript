const body = document.querySelector("body") as HTMLElement;
const btnCriarConta = document.getElementById("btnCriarConta") as HTMLElement;
const formLogin = document.getElementById("form-login") as HTMLFormElement;
const checkbox = document.getElementById("quadrado") as HTMLInputElement;
const olhoSenha = document.getElementById("olho-senha") as HTMLElement;
const usuariosCadastrados = JSON.parse(
  localStorage.getItem("usuarios") || "[]"
);

function logar(event: any) {
  event.preventDefault();
  const campoUsuario = formLogin.usuario.value;
  const campoSenha = formLogin.senha.value;
  const usuarioEncontrado = usuariosCadastrados.find((usuario: any) => {
    return usuario.usuario === campoUsuario && usuario.senha === campoSenha;
  });

  if (!usuarioEncontrado) {
    showAlert("Usuário ou senha inválidos!", "danger", 1500);
    return;
  }

  window.location.href = "recados.html";

  localStorage.setItem("ultimoLogin", JSON.stringify(usuarioEncontrado));
}

function showAlert(message: string, color?: string, timeOut?: number) {
  if (!message) {
    return;
  }

  const alertBox = document.getElementById("alert-box");
  const containerAlert = document.getElementById("alert-container");
  const alertTextContent = document.getElementById("alert-text-content");
  const btnClose = document.getElementById("btn-close");

  alertBox?.classList.remove("d-none");
  alertTextContent!.textContent = message;

  btnClose?.addEventListener("click", () => {
    alertBox?.classList.add("d-none");
    containerAlert?.classList.remove(`alert-${color}`);
  });

  if (!color) {
    containerAlert?.classList.add(`alert-secondary`);
    console.log("chegou aqui");
  } else {
    containerAlert?.classList.add(`alert-${color}`);
  }

  if (timeOut) {
    btnClose?.classList.add("d-none");
    setTimeout(() => {
      alertBox?.classList.add("d-none");
      containerAlert?.classList.remove(`alert-${color}`);
    }, timeOut);
  }
}

function manterLogado() {
  if (checkbox.checked) {
    localStorage.setItem("manterLogado", "true");
  } else {
    localStorage.setItem("manterLogado", "false");
  }
}

function pageReload() {
  const keepLoggedIn = JSON.parse(localStorage.getItem("manterLogado") || "");

  if (keepLoggedIn) {
    preencherCampos();
    checkbox.setAttribute("checked", "true");
  } else {
    checkbox.getAttribute("checked");
  }
}

function preencherCampos() {
  const ultimoLogin = JSON.parse(localStorage.getItem("ultimoLogin") || "[]");

  if (!ultimoLogin.usuario) {
    return;
  }

  formLogin.usuario.value = ultimoLogin.usuario;
  formLogin.senha.value = ultimoLogin.senha;
}

function mostrarSenha() {
  formLogin.senha.type =
    formLogin.senha.type === "password" ? "text" : "password";
}

body.setAttribute("onload", "pageReload()");
olhoSenha.addEventListener("click", mostrarSenha);
formLogin.addEventListener("submit", logar);
btnCriarConta.addEventListener("click", () => {
  window.location.href = "criarConta.html";
});
checkbox.addEventListener("click", manterLogado);

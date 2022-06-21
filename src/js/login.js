"use strict";
const body = document.querySelector("body");
const btnCriarConta = document.getElementById("btnCriarConta");
const formLogin = document.getElementById("form-login");
const checkbox = document.getElementById("quadrado");
const olhoSenha = document.getElementById("olho-senha");
const usuariosCadastrados = JSON.parse(
  localStorage.getItem("usuarios") || "[]"
);
function logar(event) {
  event.preventDefault();
  const campoUsuario = formLogin.usuario.value;
  const campoSenha = formLogin.senha.value;
  const usuarioEncontrado = usuariosCadastrados.find((usuario) => {
    return usuario.usuario === campoUsuario && usuario.senha === campoSenha;
  });
  if (!usuarioEncontrado) {
    showAlert("Usuário ou senha inválidos!", "warning", 1500);
    return;
  }
  window.location.href = "recados.html";
  localStorage.setItem("ultimoLogin", JSON.stringify(usuarioEncontrado));
}
function showAlert(message, color, timeOut) {
  if (!message) {
    return;
  }
  const alertBox = document.getElementById("alert-box");
  const containerAlert = document.getElementById("alert-container");
  const alertTextContent = document.getElementById("alert-text-content");
  const btnClose = document.getElementById("btn-close");
  alertBox === null || alertBox === void 0
    ? void 0
    : alertBox.classList.remove("d-none");
  alertTextContent.textContent = message;
  btnClose === null || btnClose === void 0
    ? void 0
    : btnClose.addEventListener("click", () => {
        alertBox === null || alertBox === void 0
          ? void 0
          : alertBox.classList.add("d-none");
        containerAlert === null || containerAlert === void 0
          ? void 0
          : containerAlert.classList.remove(`alert-${color}`);
      });
  if (!color) {
    containerAlert === null || containerAlert === void 0
      ? void 0
      : containerAlert.classList.add(`alert-secondary`);
  } else {
    containerAlert === null || containerAlert === void 0
      ? void 0
      : containerAlert.classList.add(`alert-${color}`);
  }
  if (timeOut) {
    btnClose === null || btnClose === void 0
      ? void 0
      : btnClose.classList.add("d-none");
    setTimeout(() => {
      alertBox === null || alertBox === void 0
        ? void 0
        : alertBox.classList.add("d-none");
      containerAlert === null || containerAlert === void 0
        ? void 0
        : containerAlert.classList.remove(`alert-${color}`);
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

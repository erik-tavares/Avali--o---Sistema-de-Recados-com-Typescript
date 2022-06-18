"use strict";
const formRegister = document.getElementById("form-register");
formRegister.addEventListener("submit", registrar);
let usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");
function myAlert(message, color, timeOut) {
    if (!message) {
        return;
    }
    const alertBox = document.getElementById("alert-box");
    const containerAlert = document.getElementById("alert-container");
    const alertTextContent = document.getElementById("alert-text-content");
    const btnClose = document.getElementById("btn-close");
    alertBox === null || alertBox === void 0 ? void 0 : alertBox.classList.remove("d-none");
    alertTextContent.textContent = message;
    btnClose === null || btnClose === void 0 ? void 0 : btnClose.addEventListener("click", () => {
        alertBox === null || alertBox === void 0 ? void 0 : alertBox.classList.add("d-none");
        containerAlert === null || containerAlert === void 0 ? void 0 : containerAlert.classList.remove(`alert-${color}`);
    });
    if (!color) {
        containerAlert === null || containerAlert === void 0 ? void 0 : containerAlert.classList.add(`alert-secondary`);
    }
    else {
        containerAlert === null || containerAlert === void 0 ? void 0 : containerAlert.classList.add(`alert-${color}`);
    }
    if (timeOut) {
        btnClose === null || btnClose === void 0 ? void 0 : btnClose.classList.add("d-none");
        setTimeout(() => {
            alertBox === null || alertBox === void 0 ? void 0 : alertBox.classList.add("d-none");
            containerAlert === null || containerAlert === void 0 ? void 0 : containerAlert.classList.remove(`alert-${color}`);
        }, timeOut);
    }
}
function registrar(event) {
    event.preventDefault();
    const campoUsuario = formRegister.usuario.value;
    const campoSenha = formRegister.senha.value;
    const campoSenhaConfirmacao = formRegister.senha_confirmacao.value;
    if (campoSenha !== campoSenhaConfirmacao) {
        myAlert("As senhas são diferentes!", "danger", 1500);
        return;
    }
    if (campoSenha.value.length <= 5) {
        formRegister.innerHTML = "Insira no minimo 6 caracteres!";
        campoSenha.setAttribute("style", "border-color: red");
        return false;
    }
    else {
        formRegister.setAttribute("style", "color: green");
        formRegister.innerHTML = "Senha";
        campoSenha.setAttribute("style", "border-color: green");
        return true;
    }
    const usuarioJaCadastrado = usuariosBD.some((usuarios) => {
        return usuarios.usuario === campoUsuario;
    });
    if (usuarioJaCadastrado) {
        myAlert("Usuario já cadastrado!", "danger", 1500);
        return;
    }
    const usuarioCadastrado = {
        id: idUser(),
        usuario: campoUsuario,
        senha: campoSenha,
    };
    usuariosBD.push(usuarioCadastrado);
    localStorage.setItem("usuarios", JSON.stringify(usuariosBD));
    myAlert("Usuario cadastrado com sucesso!", "success", 1000);
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}
function idUser() {
    var _a, _b;
    const usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let max = (_b = (_a = usuariosBD[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0;
    usuariosBD.forEach((usuario) => {
        var _a;
        if ((_a = usuario.id) !== null && _a !== void 0 ? _a : 0 > max) {
            max = usuario.id;
        }
    });
    return max + 1;
}

const formRegister = document.getElementById(
  "form-register"
) as HTMLFormElement;
formRegister.addEventListener("submit", registrar);

let usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");

function myAlert(message: string, color?: string, timeOut?: number) {
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

function registrar(event: any) {
  event.preventDefault();

  const campoUsuario = formRegister.usuario.value;
  const campoSenha = formRegister.senha.value;
  const campoSenhaConfirmacao = formRegister.senha_confirmacao.value;

  if (campoSenha !== campoSenhaConfirmacao) {
    myAlert("As senhas são diferentes!", "danger", 1500);
    return;
  }

  const usuarioJaCadastrado = usuariosBD.some((usuarios: any) => {
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

function idUser(): any {
  const usuariosBD = JSON.parse(localStorage.getItem("usuarios") || "[]");
  let max = usuariosBD[0]?.id ?? 0;

  usuariosBD.forEach((usuario: any) => {
    if (usuario.id ?? 0 > max) {
      max = usuario.id;
    }
  });

  return max + 1;
}

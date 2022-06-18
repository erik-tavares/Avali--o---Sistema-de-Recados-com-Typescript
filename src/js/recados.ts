const usuario = JSON.parse(localStorage.getItem("ultimoLogin") || "[]");
const idUsuario = usuario.id;
const nomeUsuario = usuario.usuario;
const bodyHome = document.querySelector("body") as HTMLElement;

const tabela = document.getElementById("tabela") as HTMLElement;
const descricao = document.getElementById("addDescricao") as HTMLInputElement;
const detalhamento = document.getElementById(
  "addDetalhamento"
) as HTMLInputElement;
const formInformacoes = document.querySelector("form") as HTMLFormElement;
const confirmSpace = document.getElementById("confirmSpace") as HTMLElement;

let idElemento = 0;

if (usuario.length === 0) {
  alert("Nenhum ususario encontrado");
  window.location.href = "login.html";
}

function getLocalStorage() {
  let infosBD = JSON.parse(localStorage.getItem(`infos${nomeUsuario}`) || "[]");

  return infosBD;
}

function setLocalStorage(infosBD: Array<any>) {
  localStorage.setItem(`infos${nomeUsuario}`, JSON.stringify(infosBD));
}

function alertShow(message: string, color?: string, timeOut?: number) {
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

function salvar(event: any) {
  event.preventDefault();
  if (!descricao.value && !detalhamento.value) {
    alertShow("Preencha ao menos um dos campos abaixo!", "warning", 1000);
    return;
  }

  if (!descricao.value) {
    descricao.value = "Sem Descrição";
  }

  if (!detalhamento.value) {
    detalhamento.value = "Sem Detalhamento";
  }
  const infos = getLocalStorage();
  const informacoes = {
    id: definirID(),
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  };
  infos.push(informacoes);

  setLocalStorage(infos);

  descricao.value = "";
  detalhamento.value = "";
  carregarHTMLTabela();
}

function carregarHTMLTabela() {
  tabela.innerHTML = `  
      <thead class="table-fist-line " >
        <tr class="linha" id="linha_1">
            <td >#</td>
            <td >Descrição</td>
            <td class="table-fist-line-detalhamento">Detalhamento</td>

            <td class="table-fist-line-mais-info text-center">Mais informações</td>
            <td class="text-center table-fist-line-acao">Ação</td>
        </tr>
    </thead>
    <br>`;

  getLocalStorage().forEach((linha: any, index: number) => {
    tabela.innerHTML += `
    <tbody>
    <tr class="linha">
      <td>${index + 1}</td>
      <td>
            <input
            type="text"
            name ="${linha.id}"
           
            class="input"
            value= "${linha.descricao}"
            disabled/>
        </td>
        <td class="detalhamento_input">
          <input
          name ="${linha.id}"
         
          type="text"
          class="input"
          value="${linha.detalhamento}"
          disabled
        />
        </td>

      <td class="buttons-td text-center">
        <button
          class="btn editar"
          id="btnEditar"
          style="background-color: #198754; color: white";
          name="${linha.id}"
        >Editar</button>

        <button
          class="btn apagar"
          style="background-color: #dc3545; color: white"
          name="${linha.id}"
        >Apagar
        </button>
      </td>

      <td class="more-info-button">
        <button 
        class="btn bg-light info-btn" 
        id="${linha.id}"
        name = "info-btn"
        onclick = "moreInfo(${linha.id})"
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
        style="min-width: 75px">
          <span class="button-span">Mais informações</span>
          <i class="bi bi-info-circle"></i>
        </button>
      </td>
    </tr>
     
    `;
  });

  const linhas = document.querySelectorAll(".linha");
  linhas.forEach((linha) => linha.addEventListener("click", apagarOuEditar));
}

function apagarOuEditar(click: any) {
  const linhaElementos = document.getElementsByName(click.target.name);
  idElemento = click.target.name;

  const infosBD = getLocalStorage();

  const indexElement = infosBD.findIndex(
    (elemento: any) => elemento.id == idElemento
  );

  if (click.target.className === "btn editar") {
    if (click.target.textContent === "Editar") {
      estiloInputHabilitado(linhaElementos[0]);
      estiloInputHabilitado(linhaElementos[1]);

      linhaElementos[2].textContent = "Salvar";
      linhaElementos[3].textContent = "Descartar";
      return;
    }

    if (click.target.textContent === "Salvar") {
      estiloPadrao(linhaElementos[0]);
      salvarDescricao(linhaElementos[0], indexElement);

      estiloPadrao(linhaElementos[1]);
      salvarDestalhamento(linhaElementos[1], indexElement);

      linhaElementos[2].textContent = "Editar";
      linhaElementos[3].textContent = "Apagar";
    }
  }

  function salvarDescricao(elemento: any, indexElement: number) {
    const infosBD = getLocalStorage();
    infosBD[indexElement].descricao = `${elemento.value}`;
    setLocalStorage(infosBD);
  }
  function salvarDestalhamento(elemento: any, indexElement: number) {
    const infosBD = getLocalStorage();
    infosBD[indexElement].detalhamento = `${elemento.value}`;
    setLocalStorage(infosBD);
  }

  function estiloPadrao(elemento: any) {
    elemento.setAttribute("disabled", "true");
    elemento.setAttribute("class", "input");
  }

  function estiloInputHabilitado(elemento: any) {
    elemento.removeAttribute("disabled");
    elemento.setAttribute("class", "input input_habilitado ");
  }

  if (click.target.textContent === "Descartar") {
    estiloPadrao(linhaElementos[0]);
    estiloPadrao(linhaElementos[1]);
    carregarHTMLTabela();
  }

  if (click.target.textContent !== "Descartar") {
    if (click.target.className === "btn apagar") {
      adicionarHTMLConfirmacao();
    }
  }
}

function adicionarHTMLConfirmacao() {
  const HTMLConfirmacao = document.createElement("div");
  HTMLConfirmacao.setAttribute("class", "confirmacao");
  HTMLConfirmacao.setAttribute("id", "confirmacao-modal");
  HTMLConfirmacao.innerHTML = ` 
  
  <div class="container-confirmacao">
    <div class="container-texto-confirmacao">
      <h1 style="color: white">Tem certeza de que quer fazer isso?</h1>
    </div>
    <button id="btnSimConfirmacao" class="botao botao-confirmacao bg-light"> SIM </button>
    <button id="btnNaoConfirmacao" class="botao botao-confirmacao bg-warning"> NÃO </button>
  </div>
  `;

  confirmSpace.appendChild(HTMLConfirmacao);
  confirmacao();
}

function confirmacao() {
  const btnSim = document.getElementById("btnSimConfirmacao") as HTMLElement;
  btnSim.addEventListener("click", () => {
    confirmSpace.removeChild(HTMLConfirmacao);

    const infosBD = getLocalStorage();

    const indexElement = infosBD.findIndex(
      (elemento: any) => elemento.id == idElemento
    );

    infosBD.splice(indexElement, 1);
    setLocalStorage(infosBD);
    carregarHTMLTabela();
  });

  const btnNao = document.getElementById("btnNaoConfirmacao") as HTMLElement;
  btnNao.addEventListener("click", () =>
    confirmSpace.removeChild(HTMLConfirmacao)
  );

  const HTMLConfirmacao = document.getElementById(
    "confirmacao-modal"
  ) as HTMLElement;
}

function definirID() {
  const infosBD = getLocalStorage();

  let max = 0;
  infosBD.forEach((info: any) => {
    if (info.id > max) {
      max = info.id;
    }
  });
  return max + 1;
}

function infoEdit() {
  const infosBD = getLocalStorage();
}

const loadModal = (description: String, details: String) => {
  const modalSpace = document.getElementById("modalSpace") as HTMLElement;
  const modal = `
  
 
  <div
  class="modal fade"
  id="myModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-secondary-trasnparent">
      <div class="modal-header">  
        <h5 class="modal-title" id="exampleModalLabel">Mais informações da tarefa</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form id="modal-form">
          <div class="mb-3">
            <label for="recipient-desc" class="col-form-label"
              >Descrição:</label
            >
            <input
              type="text"
              class="form-control bg-secondary text-light"
              id="recipient-desc"
              value="${description}"
            />
          </div>
          <div class="mb-3">
            <label for="recipient-details" class="col-form-label"
              >Detalhamento</label
            >
            <textarea class="form-control bg-secondary text-light" id="recipient-details">${details}</textarea
            >
          </div>
          <div class="modal-footer">
        <button
          type="button"
          class="btn bg-warning"
          data-bs-dismiss="modal"
          onclick="apagarRecado('${description}')"
        >
          Apagar
        </button>
        <button type="button" data-bs-dismiss="modal" class="btn bg-light" onclick="salvarRecado('${description}')">
          Salvar
        </button>
       
      </div>
          </form>
      </div>
      
    </div>
  </div>
</div>
  `;
  modalSpace.innerHTML = modal;
};

function moreInfo(buttonId: Number) {
  const infoButtons = document.getElementsByName("info-btn");
  const infosLinha = document.getElementsByName(buttonId.toString());
  const descriptionElement = infosLinha[0] as HTMLFormElement;
  const detailsElement = infosLinha[1] as HTMLFormElement;

  const selectedButton = Array.from(infoButtons).find(
    (button) => buttonId === Number(button.id)
  );
}

function apagarRecado(description: String) {
  console.log("apagou");
  const infosBD = getLocalStorage();
  const indexRecado = infosBD.findIndex(
    (info: any) => info.descricao === description
  );

  infosBD.splice(indexRecado, 1);
  setLocalStorage(infosBD);
  carregarHTMLTabela();
}

function salvarRecado(description: String) {
  const infosBD = getLocalStorage();
  const recipientDesc = document.getElementById(
    "recipient-desc"
  ) as HTMLFormElement;
  const recipientDetails = document.getElementById(
    "recipient-details"
  ) as HTMLFormElement;

  const indexRecado = infosBD.findIndex(
    (info: any) => info.descricao === description
  );
  infosBD[indexRecado].descricao = recipientDesc.value;
  infosBD[indexRecado].detalhamento = recipientDetails.value;

  console.log(indexRecado);

  setLocalStorage(infosBD);
  carregarHTMLTabela();
}

function logout() {
  window.location.href = "login.html";
}

carregarHTMLTabela();
formInformacoes.addEventListener("submit", salvar);
bodyHome.onload = () => {};

function adicionarUC() {
    const novaUC = prompt("Digite o nome da nova UC:");
    if (novaUC) {
        const listaUCs = document.getElementById("ucs");
        const novaLi = document.createElement("li");
        novaLi.textContent = novaUC;
        listaUCs.appendChild(novaLi);
    }
}
function moverItem(item, direcao) {
    const lista = item.parentNode;
    const index = Array.from(lista.children).indexOf(item);
    if ((direcao === "cima" && index > 0) || (direcao === "baixo" && index < lista.children.length - 1)) {
        const outroItem = lista.children[index + direcao];
        lista.insertBefore(item, outroItem);
    }
}
function validarCPF(cpf) {
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function salvarDescricao() {
    const descricao = document.getElementById("descricaoPerfil").value;
}
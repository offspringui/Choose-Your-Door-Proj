// Inicio da lógica após DOM carregado
document.addEventListener("DOMContentLoaded", function () {
    // Variáveis globais
    const inicioDiv = document.getElementById("inicio"); // Div inicial
    const porta0Div = document.getElementById("porta0"); // Div Porta 0
    const doorsContainer = document.querySelector(".doors"); // Contêiner das portas
    let nivelAtual = 1; // Rastreia o nível do jogo (começa no 1)
    const nivelMaximo = 3; // Número máximo de níveis

    // Evento para iniciar o jogo
    document.getElementById("start-btn").addEventListener("click", function (event) {
        event.preventDefault(); // Evitar comportamento padrão do link

        // Transita para a tela "Choose Your Destiny"
        inicioDiv.style.display = "none"; // Ocultar a tela inicial
        porta0Div.style.display = "block"; // Mostrar tela das portas
    });

    // Evento para manipular cliques nas portas
    doorsContainer.addEventListener("click", function (event) {
        // Verifique se o clique foi em uma porta (não no contêiner vazio)
        if (event.target.classList.contains("door")) {
            if (nivelAtual < nivelMaximo) {
                // Substituir opções por novas opções (Porta X1, X2, X3, X4)
                atualizarPortas(nivelAtual); // Atualiza as portas com base no nível atual
                nivelAtual++; // Avança para o próximo nível
            } else {
                // Caso atinja o nível máximo, mostrar mensagem ou encerrar
                porta0Div.innerHTML = "<h1>Parabéns! Você chegou ao final!</h1>";
            }
        }
    });

    // Função que atualiza as portas dinamicamente
    function atualizarPortas(nivel) {
        // Limpa o container das portas e cria novas opções
        doorsContainer.innerHTML = ""; // Limpar as portas anteriores
        for (let i = 1; i <= 4; i++) {
            const novaPorta = document.createElement("a"); // Criar elemento de link
            novaPorta.href = "#"; // Evitar comportamento padrão do link
            novaPorta.className = "door"; // Adicionar classe .door
            novaPorta.textContent = `Porta ${nivel}-${i}`; // Nomear a porta (ex: Porta 1-1, Porta 2-3)
            doorsContainer.appendChild(novaPorta); // Adicionar a nova porta ao container
        }
    }
});
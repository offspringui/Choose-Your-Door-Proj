document.addEventListener("DOMContentLoaded", function () {
    const inicioDiv = document.getElementById("inicio");
    const porta0Div = document.getElementById("porta0");
    const voltarBtn = document.getElementById("voltar-btn");
    let doorsContainer;
    let nivelAtual = 1;
    const nivelMaximo = 4;

    let portaCorreta; // Porta correta definida aleatoriamente
    const todasAsImagens = [ // Lista de imagens disponíveis
        "img/image1.jpg",
        "img/image2.jpg",
        "img/image3.jpg",
        "img/image4.jpg",
        "img/image5.jpg",
        "img/image6.jpg",
        "img/image7.jpg",
        "img/image8.jpg",
        "img/image9.jpg",
        "img/image10.jpg",
        "img/image11.jpg",
        "img/image12.jpg",
        "img/image13.jpg",
        "img/image14.jpg",
        "img/image15.jpg",
        "img/image16.jpg",
        "img/image17.jpg",
        "img/image18.jpg",
        "img/image19.jpg",
        "img/image20.jpg",
        "img/image21.jpg",
        "img/image22.jpg",
        "img/image23.jpg",
        "img/image24.jpg",
        "img/image25.jpg",
        "img/image26.jpg",
        "img/image27.jpg",
        "img/image28.jpg",
        "img/image29.jpg",
        "img/image30.jpg",
        "img/image31.jpg",
        "img/image32.jpg"
    ];

    let imagensDisponiveis = []; // Array para armazenar as imagens embaralhadas do nível atual

    // Função para embaralhar e copiar imagens disponíveis no nível
    function configurarImagens() {
        imagensDisponiveis = [...todasAsImagens]; // Copia o array original
        imagensDisponiveis.sort(() => Math.random() - 0.5); // Embaralha imagens
    }

    // Função para criar as portas dinamicamente com imagens únicas
    function atualizarPortas(nivel) {
        const quantidadeDePortas = Math.pow(2, nivel); // Calcula 2^n portas
        doorsContainer.innerHTML = ""; // Limpa o contêiner
        portaCorreta = Math.floor(Math.random() * quantidadeDePortas) + 1; // Seleciona a porta correta
        configurarImagens(); // Configura as imagens para o nível

        for (let i = 1; i <= quantidadeDePortas; i++) {
            const porta = document.createElement("div");
            porta.classList.add("door");
            porta.dataset.numero = i; // Identifica a porta
            porta.innerHTML = `<div class="door-content"></div>`; // Conteúdo interno da porta

            // Garante que as portas tenham imagens únicas enquanto houver imagens disponíveis
            if (imagensDisponiveis.length > 0) {
                const img = document.createElement("img");
                img.src = imagensDisponiveis.pop(); // Usa a última imagem do array e remove
                img.alt = `Imagem da Porta ${i}`;
                img.classList.add("door-image", "door-content-img");
                // Classe para estilização no CSS
                porta.querySelector(".door-content").appendChild(img);
            }

            // Adiciona a porta ao contêiner
            doorsContainer.appendChild(porta);
        }
    }

    // Função para resetar o jogo
    function resetarEstado() {
        nivelAtual = 1; // Reseta o nível
        portaCorreta = null; // Reseta a porta correta
        doorsContainer = null;
        porta0Div.innerHTML = `
            <h1>Choose Your Destiny!</h1>
            <div class="doors"></div>
        `;
        doorsContainer = document.querySelector(".doors");
        porta0Div.appendChild(voltarBtn);
        voltarBtn.style.display = "flex";
    }

    // Evento para começar o jogo
    document.getElementById("start-btn").addEventListener("click", (event) => {
        event.preventDefault();
        resetarEstado();
        inicioDiv.style.display = "none";
        porta0Div.style.display = "block";
        atualizarPortas(nivelAtual);
    });

    // Evento para lidar com o clique nas portas
    porta0Div.addEventListener("click", (event) => {
        const portaSelecionada = event.target.closest(".door");

        if (portaSelecionada) {
            const numeroPorta = parseInt(portaSelecionada.dataset.numero);

            if (numeroPorta === portaCorreta) {
                if (nivelAtual < nivelMaximo) {
                    nivelAtual++;
                    atualizarPortas(nivelAtual);
                } else {
                    porta0Div.innerHTML = "<h1>Parabéns, você venceu!</h1>";
                    porta0Div.appendChild(voltarBtn);
                }
            } else {
                porta0Div.innerHTML = "<h1>You Lose!</h1>";
                porta0Div.appendChild(voltarBtn);
            }
        }
    });

    // Evento para voltar à tela inicial
    voltarBtn.addEventListener("click", function () {
        porta0Div.style.display = "none";
        inicioDiv.style.display = "block";
        resetarEstado();
    });
});
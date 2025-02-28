document.addEventListener("DOMContentLoaded", function () {
    const inicioDiv = document.getElementById("inicio");
    const porta0Div = document.getElementById("porta0");
    const voltarBtn = document.getElementById("voltar-btn");

    let doorsContainer;
    let nivelAtual = 1;
    const nivelMaximo = 4;
    let pontuacao = 0;
    let portaCorreta;
    let imagensPontuadas = []; // Lista para registrar as imagens corretas

    const todasAsImagens = [
        "img/image1.jpg", "img/image2.jpg", "img/image3.jpg", "img/image4.jpg",
        "img/image5.jpg", "img/image6.jpg", "img/image7.jpg", "img/image8.jpg",
        "img/image9.jpg", "img/image10.jpg", "img/image11.jpg", "img/image12.jpg",
        "img/image13.jpg", "img/image14.jpg", "img/image15.jpg", "img/image16.jpg",
        "img/image17.jpg", "img/image18.jpg", "img/image19.jpg", "img/image20.jpg",
        "img/image21.jpg", "img/image22.jpg", "img/image23.jpg", "img/image24.jpg",
        "img/image25.jpg", "img/image26.jpg", "img/image27.jpg", "img/image28.jpg",
        "img/image29.jpg", "img/image30.jpg", "img/image31.jpg", "img/image32.jpg"
    ];
    let imagensDisponiveis = []; // Imagens embaralhadas para o nível atual

    const pontuacaoDiv = document.createElement("div");
    pontuacaoDiv.id = "pontuacao";
    pontuacaoDiv.style.position = "absolute";
    pontuacaoDiv.style.top = "10px";
    pontuacaoDiv.style.right = "10px";
    pontuacaoDiv.style.backgroundColor = "rgba(204, 255, 255, 0.8)";
    pontuacaoDiv.style.padding = "10px 20px";
    pontuacaoDiv.style.borderRadius = "8px";
    pontuacaoDiv.style.fontSize = "20px";
    pontuacaoDiv.style.display = "none"; // Oculta a pontuação inicialmente
    document.body.appendChild(pontuacaoDiv);

    function atualizarPontuacao() {
        pontuacaoDiv.textContent = `Score: ${pontuacao}`;
    }

    function configurarImagens() {
        imagensDisponiveis = [...todasAsImagens];
        imagensDisponiveis.sort(() => Math.random() - 0.5);
    }

    function atualizarPortas(nivel) {
        const quantidadeDePortas = Math.pow(2, nivel);
        doorsContainer.innerHTML = "";
        portaCorreta = Math.floor(Math.random() * quantidadeDePortas) + 1;
        configurarImagens();

        for (let i = 1; i <= quantidadeDePortas; i++) {
            const porta = document.createElement("div");
            porta.classList.add("door");
            porta.dataset.numero = i.toString();
            porta.innerHTML = `<div class="door-content"></div>`;

            if (imagensDisponiveis.length > 0) {
                const img = document.createElement("img");
                img.src = imagensDisponiveis.pop();
                img.alt = `Imagem da Porta ${i}`;
                img.classList.add("door-image", "door-content-img");
                porta.querySelector(".door-content").appendChild(img);
            }
            doorsContainer.appendChild(porta);
        }
    }

    function mostrarResultados() {
        let resultadoHtml = "<h1>Parabéns, você venceu!</h1>";
        resultadoHtml += "<h2>Imagens pontuadas:</h2><ul>";
        imagensPontuadas.forEach((img) => {
            resultadoHtml += `<li>${img.replace(".jpg", "")}</li>`;
        });
        resultadoHtml += "</ul>";

        porta0Div.innerHTML = resultadoHtml;
        porta0Div.appendChild(voltarBtn);
    }

    function resetarEstado() {
        nivelAtual = 1;
        pontuacao = 0;
        imagensPontuadas = [];
        portaCorreta = null;
        doorsContainer = null;
        atualizarPontuacao();
        porta0Div.innerHTML = `
            <h1>Choose Your Destiny!</h1>
            <div class="doors"></div>
        `;
        doorsContainer = document.querySelector(".doors");
        porta0Div.appendChild(voltarBtn);
        voltarBtn.style.display = "flex";
    }

    document.getElementById("start-btn").addEventListener("click", (event) => {
        event.preventDefault();
        pontuacaoDiv.style.display = "block"; // Torna a pontuação visível
        resetarEstado();
        inicioDiv.style.display = "none";
        porta0Div.style.display = "block";
        atualizarPortas(nivelAtual);
    });

    porta0Div.addEventListener("click", (event) => {
        const portaSelecionada = event.target.closest(".door");
        if (portaSelecionada) {
            const numeroPorta = parseInt(portaSelecionada.dataset.numero);

            if (numeroPorta === portaCorreta) {
                pontuacao++;
                const portaCorretaImg = portaSelecionada.querySelector("img").src.split("/").pop();
                imagensPontuadas.push(portaCorretaImg);

                atualizarPontuacao();
                if (nivelAtual < nivelMaximo) {
                    nivelAtual++;
                    atualizarPortas(nivelAtual);
                } else {
                    mostrarResultados();
                    pontuacao = 0;
                    atualizarPontuacao();
                }
            } else {
                porta0Div.innerHTML = "<h1>You Lose!</h1>";
                porta0Div.appendChild(voltarBtn);
                pontuacao = 0;
                atualizarPontuacao();
            }
        }
    });

    voltarBtn.addEventListener("click", function () {
        porta0Div.style.display = "none";
        inicioDiv.style.display = "block";
        pontuacaoDiv.style.display = "none"; // Oculta a pontuação ao voltar
        resetarEstado();
    });
});
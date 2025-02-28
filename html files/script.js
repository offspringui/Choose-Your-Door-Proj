// Obtém os elementos principais para controlar a exibição
const inicioDiv = document.getElementById('inicio');
const porta0Div = document.getElementById('porta0');
const startBtn = document.getElementById('start-btn');

// Ao clicar no botão "Iniciar", exibe a página da Porta 0 e oculta a inicial
startBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Evita comportamento padrão do link
    inicioDiv.style.display = 'none'; // Oculta a página inicial
    porta0Div.style.display = 'block'; // Mostra a seção da Porta 0
});
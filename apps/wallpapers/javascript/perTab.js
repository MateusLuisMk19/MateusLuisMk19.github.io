document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os inputs que abrem o detalhe
    const inputs = document.querySelectorAll('.element .activate');

    inputs.forEach(input => {
        input.addEventListener('change', async (e) => {
            if (e.target.checked) {
                // Navegação precisa: sobe para o .element e procura os dados
                const elementDiv = e.target.closest('.element');
                const symbol = elementDiv.querySelector('.symbol').innerText;
                const name = elementDiv.querySelector('.name').innerText;
                const overlay = elementDiv.querySelector('.overlay');

                // Garante que o painel lateral (content) existe dentro do overlay
                let content = overlay.querySelector('.content');
                if (!content) {
                    content = document.createElement('div');
                    content.className = 'content';
                    overlay.appendChild(content);
                }

                content.innerHTML = `<h2>${name} (${symbol})</h2><p>A procurar dados...</p>`;

                try {
                    // Busca na API usando o Símbolo (mais fiável que o nome traduzido)
                    const response = await fetch(`https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${symbol}`);
                    const data = await response.json();

                    content.innerHTML = `
                        <div class="api-data">
                            <h1>${data.symbol}</h1>
                            <h2>${data.name}</h2>
                            <hr>
                            <p><strong>Massa:</strong> ${data.atomicMass}</p>
                            <p><strong>Descoberta:</strong> ${data.yearDiscovered}</p>
                            <p><strong>Configuração:</strong> ${data.electronConfiguration}</p>
                            <p style="margin-top:15px; font-size: 0.9em;">${data.summary}</p>
                        </div>
                    `;
                } catch (err) {
                    content.innerHTML = `<h2>${name}</h2><p>Erro ao carregar dados externos.</p>`;
                }
            }
        });
    });
});

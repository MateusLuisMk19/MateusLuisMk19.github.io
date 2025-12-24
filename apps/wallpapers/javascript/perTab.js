document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.element .activate');

    inputs.forEach(input => {
        input.addEventListener('change', async (e) => {
            if (e.target.checked) {
                const elementDiv = e.target.closest('.element');
                const symbol = elementDiv.querySelector('.symbol').innerText.trim();
                const name = elementDiv.querySelector('.name').innerText.trim();
                const overlay = elementDiv.querySelector('.overlay');

                // Garante que o painel lateral (content) existe
                let content = overlay.querySelector('.content');
                if (!content) {
                    content = document.createElement('div');
                    content.className = 'content';
                    overlay.appendChild(content);
                }

                // Estado de carregamento
                content.innerHTML = `<h2>${name} (${symbol})</h2><p>A procurar informações detalhadas...</p>`;
		// Criamos uma variável para o termo de pesquisa da Wiki
		let wikiSearchTerm = name;

		// Se o elemento for o Rádio, forçamos o termo correto para a Wikipédia
		if (symbol === 'Ra' || symbol === 'Ta' || symbol === 'Hg' || symbol === 'In') {
		    wikiSearchTerm = `${name} (elemento químico)`;
		}

		if (symbol === 'Np') {
		    wikiSearchTerm = `Neptúnio`;
		}

                try {
                    // Faz as duas chamadas em paralelo para ser mais rápido
                    const [pubChemRes, wikiRes] = await Promise.all([
                        fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${symbol}/JSON`),
                        fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiSearchTerm)}`)
                    ]);

                    const pubData = await pubChemRes.json();
                    const wikiData = await  wikiRes.json();
                    
                    // Processa dados do PubChem (Técnicos)
                    let weight = 'N/A';
                    if (pubData.PC_Compounds) {
                        const props = pubData.PC_Compounds[0].props;
                        const found = props.find(p => p.urn.label === "Molecular Weight");
                        weight = found ? found.value.fval : 'N/A';
                    }

                    // Processa dados da Wikipedia (Descrição)
                    const descricao = wikiData.extract || "Descrição não encontrada.";
                    const imagem = wikiData.thumbnail ? wikiData.thumbnail.source : '';

                    // Monta o layout final estilo "Enciclopédia"
                    content.innerHTML = `
                        <div class="api-data" style="text-align: left; animation: fadeIn 0.5s; font-family: sans-serif;">
                            <h1 style="font-size: 4vw; margin-bottom: 0; color: ${elementDiv.style.color || '#fff'}">${symbol}</h1>
                            <h2 style="margin-top: 0; opacity: 0.9;">${name}</h2>
                            
                            ${imagem ? `<img src="${imagem}" style="width: 100%; border-radius: 8px; margin: 15px 0; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">` : ''}

                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p><strong>Massa Atómica:</strong> ${weight} u</p>
                                <p><strong>Natureza:</strong> Informação via Wiki/PubChem</p>
                            </div>

                            <div style="line-height: 1.6; font-size: 0.95em;">
                                <p>${descricao}</p>
                            </div>

                            <hr style="margin: 20px 0; opacity: 0.2;">
                            <div style="font-size: 0.75em; opacity: 0.6;">
                                <p>Fontes: Wikipedia (PT) & National Library of Medicine (PubChem)</p>
                            </div>
                        </div>
                    `;

                } catch (err) {
                    console.error("Erro ao procurar dados:", err);
                    content.innerHTML = `<h2>${name}</h2><p>Erro ao ligar às bases de dados externas.</p>`;
                }
            }
        });
    });
});

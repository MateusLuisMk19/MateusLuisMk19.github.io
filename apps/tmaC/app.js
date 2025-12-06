const input = document.getElementById("input"),
	calc = document.getElementById("calc"),
	clear = document.getElementById("clear"),
	results = document.getElementById("results"),
	countEl = document.getElementById("count"),
	npsPercent = document.getElementById("npsPercent"),
	totalMinEl = document.getElementById("totalMin"),
	totalMinSecEl = document.getElementById("totalMinSec"),
	tmaSecEl = document.getElementById("tmaSec"),
	formulaEl = document.getElementById("formula"),
	copyBtn = document.getElementById("copy"),
	saveBtn = document.getElementById("save"),
	npsVal = document.getElementById("npsVal"),
	tmsSecEl = document.querySelector("#tmaSec"),
	divBtns = document.querySelector("#divBtns"),
	usercode = document.querySelector("#usercode");

      document.addEventListener("DOMContentLoaded", async () => {
        if (window.pywebview) {
          try {
            const dados = await window.pywebview.api.carregar();
            if (dados.tma_input) input.value = dados.tma_input;
            if (dados.nps_val !== undefined) npsVal.textContent = dados.nps_val;
          } catch (e) {
            console.error("Erro ao carregar dados:", e);
          }
        }
      });

      function changeInfoContente(v) {
        const hold = document.getElementById("informHold");
        const cont = document.getElementById("informCont");
        if (v === 0) {
          hold.style.display = "none";
          cont.style.display = "block";
        } else {
          hold.style.display = "block";
          cont.style.display = "none";
        }
      }

      async function npsDud(val) {
        let oldVal = parseInt(npsVal.textContent) || 0;
        let newVal = oldVal + val;
        if (newVal < 0) {
          alert("Não pode ser inferior a 0");
          newVal = 0;
        }
        npsVal.textContent = newVal;

        if (window.pywebview) {
          await window.pywebview.api.guardar({
            tma_input: input.value,
            nps_val: newVal,
          });
        }
      }

      /* ============================================================
         PARSE COM SUPORTE AO ASTERISCO "*"
         ============================================================ */
      function parseInput(text) {
        if (!text) return [];
        const raw = text
          .split(/[\n,;]+/)
          .map((s) => s.trim())
          .filter(Boolean);

        const values = [];

        raw.forEach((chunk) => {
          const parts = chunk.split(/\s+/).filter(Boolean);

          parts.forEach((p) => {
            const ignoreIQS = p.endsWith("*");

            let cleaned = p
              .replace(/\*/g, "")
              .replace(/min(?:ute)?s?/i, "")
              .replace(/m\b/i, "")
              .replace(/,/g, ".")
              .replace(/[^0-9.\-]/g, "");

            if (cleaned === "") return;

            let num = Number(cleaned);
            if (isNaN(num)) return;

            if (num % 1 !== 0) {
              const integerPart = Math.floor(num);
              const assumedSeconds = Math.round((num - integerPart) * 100);
              num = integerPart + assumedSeconds / 60;
            }

            values.push({
              value: num,
              ignoreIQS: ignoreIQS,
            });
          });
        });

        return values;
      }

      /* ============================================================
         TMA COM LIST.value
         ============================================================ */
      function computeTMA(list) {
        if (!list.length) return null;

        const nums = list.map((x) => x.value);

        const totalMin = nums.reduce((a, b) => a + b, 0);
        const avgMin = totalMin / nums.length;
        const tmaSec = Math.round(avgMin * 60);

        return { totalMin, avgMin, tmaSec };
      }

      /* ============================================================
         MOSTRAR RESULTADOS + IQS AJUSTADO
         ============================================================ */
      function showResult(list, res) {
        results.hidden = false;

        countEl.textContent = list.length;
        totalMinEl.textContent = res.totalMin.toFixed(2);
        totalMinSecEl.textContent = Math.round(res.totalMin * 60);
        tmaSecEl.textContent = res.tmaSec;

        const nps = parseInt(npsVal.textContent) || 0;
        const validForIQS = list.filter((x) => !x.ignoreIQS).length;

        const percent = validForIQS
          ? ((nps / validForIQS) * 100).toFixed(1)
          : 0;

        npsPercent.textContent = percent;

        formulaEl.textContent = `(${res.totalMin.toFixed(2)} min ÷ ${list.length} chamadas) × 60 = ${res.tmaSec} segundos`;
      }

      /* Cor dinâmica */
      const observer = new MutationObserver(() => {
        let num = parseInt(tmsSecEl.textContent);
        const box = document.querySelector("#tmaSecBox");

        if (num < 550) box.style.backgroundColor = "darkgreen";
        else if (num <= 700) box.style.backgroundColor = "#b33d18";
        else box.style.backgroundColor = "darkred";
      });

      observer.observe(tmsSecEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      /* Eventos */
      calc.addEventListener("click", () => {
        const list = parseInput(input.value);

        if (list.length === 0) {
          alert("Nenhum tempo válido encontrado.");
          return;
        }

        const res = computeTMA(list);
        showResult(list, res);
      });

      clear.addEventListener("click", async () => {
        input.value = "";
        npsVal.textContent = "0";
        results.hidden = true;

        if (window.pywebview) {
          await window.pywebview.api.guardar({
            tma_input: "",
            nps_val: 0,
          });
        }
      });

      copyBtn.addEventListener("click", async () => {
        if (results.hidden) {
          alert("Nada para copiar.");
          return;
        }
        const text = `TMA: ${tmaSecEl.textContent} segundos. ${formulaEl.textContent}`;
        try {
          await navigator.clipboard.writeText(text);
          alert("Resultado copiado.");
        } catch (e) {
          alert("Erro ao copiar.");
        }
      });

      function saveFunc (getDailyDoc, saveTodayFromUI) {
		//Validation
		if (!usercode.value || usercode.value.length < 5) {
			alert("Sem user");
			return;
		}else if (!front.classList.contains("hide")) {
			alert("Salve o user antes");
			return;
		}

		if (confirm("Tens a certeza?")) {
	        // usuário confirmou
	    	saveTodayFromUI();
	    } else {
	        // cancelou
	        
		}	
		
		
		alert("Guardado localmente!");
      });

      input.addEventListener("paste", () => {
        setTimeout(() => calc.click(), 100);
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          calc.click();
        }
      });

      usercode.addEventListener("input", (e) => {
	    let code = e.target.value.trim();

	    if (code.length >= 6) {
	        divBtns.classList.remove("hide");
	    } else {
	        divBtns.classList.add("hide");
	    }
      });

	 // JS opcional: alterna qual botão fica por cima ao clicar
	  const front = document.getElementById('front');
	  const back = document.getElementById('back');

	  front.addEventListener('click', () => {
	    // exemplo de ação
	    //alert('Clicaste em Ação 2');
	    // adicionar logica de disabled input
	    usercode.classList.add("disabled");
	    front.classList.add("hide");
	  });

	  back.addEventListener('click', () => {
	    //alert('Clicaste em Ação 1');
	    usercode.classList.remove("disabled");
	    front.classList.remove("hide");
	  });

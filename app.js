(function () {
  const mail = "martire.stefano@gmail.com";
  const siteHeader = document.querySelector(".site-header");
  const chartCanvas = document.querySelector("#performance-chart");
  const chartTooltip = document.querySelector("[data-chart-tooltip]");
  const legendNode = document.querySelector("[data-chart-legend]");
  const resultsTableWrap = document.querySelector("[data-results-table-wrap]");
  const resultsTableNode = document.querySelector("[data-results-table]");
  const languageToggle = document.querySelector("[data-language-toggle]");
  const seriesDisplayOrder = { strategy: 0, ftse: 1, sx5e: 2, sp: 3, nasdaq: 4 };
  const yAxisMin = -40;
  const yAxisMax = 70;
  const yAxisStep = 20;
  const yAxisTicks = Array.from(
    { length: Math.floor((yAxisMax - yAxisMin) / yAxisStep) + 1 },
    (_, index) => yAxisMin + index * yAxisStep,
  );

  const translations = {
    en: {
      documentTitle: "Portfolio | Architecture of Tomorrow",
      navStrategy: "Strategy",
      navResults: "Results",
      navAbout: "About",
      heroEyebrow: "Investment Philosophy",
      heroTitle: "Investing in the<br>Architecture of Tomorrow",
      heroCopy:
        "A principled strategy at the intersection of technological acceleration, financial rigor, and universal human progress.",
      scienceTitle: "Science & Technology",
      scienceBody: `
        <p>The first question I ask before any investment decision is deceptively simple yet cosmically ambitious: <em>is the technology developed by this company poised to constitute a foundational layer of the civilization of the future?</em></p>
        <p>We are living through the most consequential period of technological acceleration in human history. The great filter of progress is not ideological but thermodynamic: it is energy, compute, intelligence, matter, and substrate. I seek companies building the substrate of tomorrow: the infrastructure upon which entire civilizations will run, the protocols that will govern how humanity interfaces with intelligence, matter, and energy.</p>
        <p>This is not speculation. It is the long arc of technological determinism made legible. Acceleration is not a risk to be hedged; it is the prime mover. The question is never whether technology will reshape society, but which organizations will lay the bedrock upon which that reshaping occurs.</p>
      `,
      architectureTitle: "The Architecture of Progress",
      architectureBody: `
        <p>Having identified a transformative technology, the second question becomes equally essential: <em>can this company actually build it?</em></p>
        <p>The most visionary technology is worth nothing if the organization behind it cannot survive long enough to deliver it. A brilliant blueprint for a cathedral remains rubble without discipline of construction. I examine the financial architecture of each candidate company with the same rigor I would apply to a structural theorem: looking not for growth at all costs, but for <em>intelligent design</em>, a defensible path to sustainability, and leadership that understands that without fiscal fortitude, no future can be reached.</p>
        <p>The business architecture is not a concession to commerce; it is the <em>load-bearing wall</em> of every technological vision.</p>
      `,
      ethicsTitle: "Ethics",
      ethicsBody: `
        <p>Technology accelerates toward a future that is neither inevitable nor uniformly beneficial by default. The third pillar of my philosophy reflects a conviction I hold with institutional gravity: <em>progress must be universal.</em></p>
        <p>Acceleration without distribution is not civilization; it is a new form of feudalism encoded in silicon. I invest exclusively in companies whose technological trajectory I believe will compound into a world where <em>every human being</em>, regardless of origin, geography, or circumstance, stands to benefit.</p>
        <p>The technologies that ultimately triumph are those that expand the commons of human capability: they lower the cost of intelligence, health, energy, or connection. A rising tide, when that tide is technology, can and must lift all boats.</p>
      `,
      resultsEyebrow: "Strategy Performance vs. Major Indices",
      resultsTitle: "Results",
      resultsPeriod: "Annual gains · 2022 — 2025",
      aboutEyebrow: "About",
      aboutTitle: "Stefano Martire",
      aboutCredential: "Ph.D. in Data Science and Computation",
      aboutInstitute:
        '<a href="https://www.iit.it/" rel="noreferrer" target="_blank">Italian Institute of Technology</a>',
      aboutBody: `
        <p>I am an Italian mathematician, holder of a Ph.D. in Data Science and Computation from the <a href="https://www.iit.it/" rel="noreferrer" target="_blank"><em>Italian Institute of Technology</em></a>. My academic background, built at the intersection of abstract mathematics and applied data science, forms the methodological bedrock of my investment practice.</p>
        <p>I approach markets not as a trader seeking arbitrage, but as a scientist seeking <em>signal</em>: the deep structural patterns that betray which technologies will become load-bearing elements of the civilization to come.</p>
      `,
      requestAccess: "Request access",
      mailSubject: "Request access",
      chartAlt: "Annual percentage gains of MFIN compared with FTSE MIB, Euro Stoxx 50, S&P 500, and Nasdaq 100.",
      strategyLabel: "MFIN",
      ftseLabel: "FTSE MIB",
      sx5eLabel: "Euro Stoxx 50",
      spLabel: "S&P 500",
      nasdaqLabel: "Nasdaq 100",
      legendLabel: "Chart legend",
      resultsTableLabel: "Table of compounded returns and CAGR by fund",
      resultsTableFund: "Fund",
      resultsTableCumulative: "Cumulative return",
      resultsTableCagr: "CAGR",
      xAxisLabel: "Year",
      yAxisLabel: "Annual return (%)",
    },
    it: {
      documentTitle: "Portfolio | Architettura del Domani",
      navStrategy: "Strategia",
      navResults: "Risultati",
      navAbout: "Chi sono",
      heroEyebrow: "Filosofia di investimento",
      heroTitle: "Investire nell'<br>Architettura del Domani",
      heroCopy:
        "Una strategia fondata sull'intersezione tra accelerazione tecnologica, rigore finanziario e progresso umano universale.",
      scienceTitle: "Scienza e Tecnologia",
      scienceBody: `
        <p>La prima domanda che mi pongo prima di ogni decisione di investimento è apparentemente semplice ma cosmicamente ambiziosa: <em>la tecnologia sviluppata da questa azienda può costituire uno strato fondazionale della civiltà del futuro?</em></p>
        <p>Viviamo il periodo più decisivo di accelerazione tecnologica nella storia umana. Il grande filtro del progresso non è ideologico ma termodinamico: energia, calcolo, intelligenza, materia e substrato. Cerco aziende che costruiscono il substrato del domani: l'infrastruttura su cui correranno intere civiltà, i protocolli che governeranno il modo in cui l'umanità interagirà con intelligenza, materia ed energia.</p>
        <p>Questa non è speculazione. È il lungo arco del determinismo tecnologico reso leggibile. L'accelerazione non è un rischio da coprire: è il motore primo. La domanda non è se la tecnologia rimodellerà la società, ma quali organizzazioni poseranno il fondamento su cui quel rimodellamento avverrà.</p>
      `,
      architectureTitle: "L'Architettura del Progresso",
      architectureBody: `
        <p>Identificata una tecnologia trasformativa, la seconda domanda diventa altrettanto essenziale: <em>questa azienda può davvero costruirla?</em></p>
        <p>La tecnologia più visionaria non vale nulla se l'organizzazione che la sviluppa non può sopravvivere abbastanza a lungo da consegnarla al mondo. Il progetto brillante di una cattedrale resta maceria senza disciplina di costruzione. Analizzo l'architettura finanziaria di ogni azienda candidata con lo stesso rigore che applicherei a un teorema strutturale: non cerco crescita a qualunque costo, ma <em>disegno intelligente</em>, un percorso difendibile verso la sostenibilità e una leadership che comprenda che senza solidità fiscale nessun futuro, per quanto magnifico, può essere raggiunto.</p>
        <p>L'architettura d'impresa non è una concessione al commercio: è il <em>muro portante</em> di ogni visione tecnologica.</p>
      `,
      ethicsTitle: "Etica",
      ethicsBody: `
        <p>La tecnologia accelera verso un futuro che non è inevitabile né automaticamente benefico per tutti. Il terzo pilastro della mia filosofia riflette una convinzione che considero con gravità istituzionale: <em>il progresso deve essere universale.</em></p>
        <p>Accelerazione senza distribuzione non è civiltà; è una nuova forma di feudalesimo codificata nel silicio. Investo esclusivamente in aziende la cui traiettoria tecnologica possa, a mio giudizio, comporsi in un mondo in cui <em>ogni essere umano</em>, indipendentemente da origine, geografia o circostanza, possa beneficiarne.</p>
        <p>Le tecnologie destinate a prevalere sono quelle che espandono i beni comuni della capacità umana: abbassano il costo dell'intelligenza, della salute, dell'energia o della connessione. Una marea che sale, quando quella marea è tecnologia, può e deve sollevare tutte le barche.</p>
      `,
      resultsEyebrow: "Performance della strategia vs. indici principali",
      resultsTitle: "Risultati",
      resultsPeriod: "Rendimenti annuali · 2022 — 2025",
      aboutEyebrow: "Chi sono",
      aboutTitle: "Stefano Martire",
      aboutCredential: "Ph.D. in Data Science and Computation",
      aboutInstitute:
        '<a href="https://www.iit.it/" rel="noreferrer" target="_blank">Italian Institute of Technology</a>',
      aboutBody: `
        <p>Sono un matematico italiano, con un Ph.D. in Data Science and Computation ottenuto presso l'<a href="https://www.iit.it/" rel="noreferrer" target="_blank"><em>Italian Institute of Technology</em></a>. Il mio percorso accademico, costruito all'intersezione tra matematica astratta e scienza dei dati applicata, costituisce il fondamento metodologico della mia pratica di investimento.</p>
        <p>Mi avvicino ai mercati non come un trader in cerca di arbitraggio, ma come uno scienziato in cerca di <em>segnale</em>: i pattern strutturali profondi che rivelano quali tecnologie diventeranno elementi portanti della civiltà a venire.</p>
      `,
      requestAccess: "Richiedi accesso",
      mailSubject: "Richiesta di accesso",
      chartAlt: "Rendimenti percentuali annuali di MFIN a confronto con FTSE MIB, Euro Stoxx 50, S&P 500 e Nasdaq 100.",
      strategyLabel: "MFIN",
      ftseLabel: "FTSE MIB",
      sx5eLabel: "Euro Stoxx 50",
      spLabel: "S&P 500",
      nasdaqLabel: "Nasdaq 100",
      legendLabel: "Legenda del grafico",
      resultsTableLabel: "Tabella dei rendimenti composti e del CAGR per fondo",
      resultsTableFund: "Fondo",
      resultsTableCumulative: "Rendimento cumulato",
      resultsTableCagr: "CAGR",
      xAxisLabel: "Anno",
      yAxisLabel: "Rendimento annuale (%)",
    },
  };

  let currentLanguage = getInitialLanguage();
  let chartData = null;
  let activeIndex = null;
  let chartState = null;
  let resizeFrame = null;

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function getInitialLanguage() {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "it") return saved;
    const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    return languages.some((language) => String(language).toLowerCase().startsWith("it")) ? "it" : "en";
  }

  function translate() {
    const dictionary = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = dictionary.documentTitle;
    languageToggle.setAttribute("aria-label", currentLanguage === "en" ? "Passa all'italiano" : "Switch to English");
    languageToggle.querySelectorAll("[data-lang-option]").forEach((option) => {
      option.classList.toggle("is-active", option.getAttribute("data-lang-option") === currentLanguage);
    });

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.innerHTML = dictionary[key] || "";
    });

    document.querySelectorAll("[data-i18n-html]").forEach((node) => {
      const key = node.getAttribute("data-i18n-html");
      node.innerHTML = dictionary[key] || "";
    });

    document.querySelectorAll(".request-link").forEach((link) => {
      const subject = encodeURIComponent(dictionary.mailSubject);
      link.setAttribute("href", `mailto:${mail}?subject=${subject}`);
    });

    if (chartCanvas) {
      chartCanvas.setAttribute("aria-label", dictionary.chartAlt);
    }

    renderLegend();
    renderResultsTable();
    drawChart();
    renderTooltip();
  }

  function parseCsv(text) {
    const rows = text
      .trim()
      .split(/\r?\n/)
      .map((row) => row.split(",").map((cell) => cell.trim()));
    const years = rows[0].slice(1);

    return rows.slice(1).map((row) => {
      const name = row[0];
      const values = row.slice(1).map((cell) => Number.parseFloat(cell.replace("%", "")));

      return {
        key: getFundKey(name),
        rawName: name,
        labels: years,
        values,
      };
    });
  }

  function getFundKey(name) {
    const normalized = name.toLowerCase();
    if (normalized.includes("mfin")) return "strategy";
    if (normalized.includes("ftse")) return "ftse";
    if (normalized.includes("sx5e") || normalized.includes("stoxx")) return "sx5e";
    if (normalized.includes("s&p")) return "sp";
    if (normalized.includes("nasdaq")) return "nasdaq";
    return normalized.replace(/[^a-z0-9]+/g, "-");
  }

  function getSeriesLabel(series) {
    const dictionary = translations[currentLanguage];
    if (series.key === "strategy") return dictionary.strategyLabel;
    if (series.key === "ftse") return dictionary.ftseLabel;
    if (series.key === "sx5e") return dictionary.sx5eLabel;
    if (series.key === "sp") return dictionary.spLabel;
    if (series.key === "nasdaq") return dictionary.nasdaqLabel;
    return series.rawName;
  }

  function getOrderedSeries(data) {
    return [...data].sort((a, b) => (seriesDisplayOrder[a.key] ?? 99) - (seriesDisplayOrder[b.key] ?? 99));
  }

  function getSeriesReturns(series) {
    return series.values.filter(Number.isFinite);
  }

  function getGrowthMultiple(returns) {
    return returns.reduce((multiple, value) => multiple * (1 + value / 100), 1);
  }

  function getSeriesCumulativeReturn(series) {
    return (getGrowthMultiple(getSeriesReturns(series)) - 1) * 100;
  }

  function getSeriesCagr(series) {
    const returns = getSeriesReturns(series);
    if (!returns.length) return 0;
    return (getGrowthMultiple(returns) ** (1 / returns.length) - 1) * 100;
  }

  function formatPercent(value) {
    const rounded = Math.round(value * 10) / 10;
    const safeValue = Object.is(rounded, -0) ? 0 : rounded;
    return `${Number.isInteger(safeValue) ? safeValue.toFixed(0) : safeValue.toFixed(1)}%`;
  }

  function getSeriesAppearance(series, colors) {
    const appearance = {
      color: colors[series.key] || colors.fallback,
      lineWidth: 1.9,
      pointRadius: 3.2,
      dash: [],
    };

    if (series.key === "strategy") {
      appearance.lineWidth = 3;
      appearance.pointRadius = 4.2;
    } else if (series.key === "sp") {
      appearance.lineWidth = 2;
      appearance.pointRadius = 3.1;
      appearance.dash = [8, 4, 2, 4];
    } else if (series.key === "ftse") {
      appearance.lineWidth = 2.1;
      appearance.pointRadius = 3.3;
      appearance.dash = [6, 4];
    } else if (series.key === "sx5e") {
      appearance.pointRadius = 3;
      appearance.dash = [1.5, 5];
    } else if (series.key === "nasdaq") {
      appearance.lineWidth = 2.2;
      appearance.pointRadius = 3.4;
      appearance.dash = [12, 5];
    }

    return appearance;
  }

  function renderLegend() {
    if (!legendNode) return;
    const dictionary = translations[currentLanguage];
    legendNode.setAttribute("aria-label", dictionary.legendLabel);

    if (!chartData) {
      legendNode.hidden = true;
      legendNode.innerHTML = "";
      return;
    }

    const ordered = getOrderedSeries(chartData);

    legendNode.hidden = false;
    legendNode.innerHTML = ordered
      .map((series) => {
        return `
          <span class="chart-legend-item">
            <span class="chart-legend-swatch" data-series="${series.key}" aria-hidden="true"></span>
            <span>${getSeriesLabel(series)}</span>
          </span>
        `;
      })
      .join("");
  }

  function renderResultsTable() {
    if (!resultsTableWrap || !resultsTableNode) return;
    const dictionary = translations[currentLanguage];
    resultsTableNode.setAttribute("aria-label", dictionary.resultsTableLabel);

    if (!chartData) {
      resultsTableWrap.hidden = true;
      resultsTableNode.innerHTML = "";
      return;
    }

    const ordered = [...chartData].sort((a, b) => {
      const cumulativeDelta = getSeriesCumulativeReturn(b) - getSeriesCumulativeReturn(a);
      if (cumulativeDelta !== 0) return cumulativeDelta;
      return (seriesDisplayOrder[a.key] ?? 99) - (seriesDisplayOrder[b.key] ?? 99);
    });
    resultsTableWrap.hidden = false;
    resultsTableNode.innerHTML = `
      <thead>
        <tr>
          <th scope="col">${dictionary.resultsTableFund}</th>
          <th scope="col">${dictionary.resultsTableCumulative}</th>
          <th scope="col">${dictionary.resultsTableCagr}</th>
        </tr>
      </thead>
      <tbody>
        ${ordered
          .map((series) => {
            const cumulativeReturn = getSeriesCumulativeReturn(series);
            const cagr = getSeriesCagr(series);

            return `
              <tr data-series="${series.key}">
                <th scope="row">
                  <span class="results-table-series">
                    <span class="chart-legend-swatch" data-series="${series.key}" aria-hidden="true"></span>
                    <span>${getSeriesLabel(series)}</span>
                  </span>
                </th>
                <td>${formatPercent(cumulativeReturn)}</td>
                <td>${formatPercent(cagr)}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    `;
  }

  function drawChart() {
    if (!chartCanvas || !chartData) return;

    const rect = chartCanvas.getBoundingClientRect();
    const width = Math.max(320, Math.round(rect.width));
    const height = Math.max(240, Math.round(width * 0.48));
    const scale = window.devicePixelRatio || 1;
    chartCanvas.width = Math.round(width * scale);
    chartCanvas.height = Math.round(height * scale);
    chartCanvas.style.height = `${height}px`;

    const ctx = chartCanvas.getContext("2d");
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const margin = { top: 24, right: 24, bottom: 66, left: 74 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const yMin = yAxisMin;
    const yMax = yAxisMax;
    const labels = chartData[0].labels;
    const colors = {
      strategy: cssVar("--strategy"),
      sp: cssVar("--sp"),
      ftse: cssVar("--ftse"),
      sx5e: cssVar("--sx5e"),
      nasdaq: cssVar("--nasdaq"),
      fallback: cssVar("--muted"),
      grid: cssVar("--gold"),
      label: cssVar("--muted"),
      axis: cssVar("--ink"),
      guide: cssVar("--ink"),
      paper: cssVar("--paper"),
    };
    chartState = { width, height, margin, plotWidth, plotHeight, yMin, yMax, labels };

    ctx.font = "12px Georgia, 'Times New Roman', serif";
    ctx.textBaseline = "middle";

    drawGrid(ctx, labels, margin, plotWidth, plotHeight, yMin, yMax, colors);

    const ordered = [...chartData].sort((a, b) => (a.key === "strategy" ? 1 : b.key === "strategy" ? -1 : 0));
    ordered.forEach((series) => {
      drawLine(ctx, series, labels, margin, plotWidth, plotHeight, yMin, yMax, colors);
    });

    if (activeIndex !== null) {
      drawInteraction(ctx, activeIndex, margin, plotWidth, plotHeight, yMin, yMax, labels, colors);
    }

    drawAxisLabels(ctx, width, height, margin, plotWidth, plotHeight, colors);
  }

  function drawGrid(ctx, labels, margin, plotWidth, plotHeight, yMin, yMax, colors) {
    const yRange = yMax - yMin || 1;

    ctx.save();
    ctx.strokeStyle = colors.grid;
    ctx.fillStyle = colors.label;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 7]);
    ctx.textAlign = "right";

    yAxisTicks.forEach((value) => {
      const y = margin.top + plotHeight - ((value - yMin) / yRange) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + plotWidth, y);
      ctx.globalAlpha = 0.18;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillText(`${Math.round(value)}%`, margin.left - 12, y);
    });

    ctx.textAlign = "center";
    labels.forEach((label, index) => {
      const x = margin.left + (plotWidth / (labels.length - 1)) * index;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + plotHeight);
      ctx.globalAlpha = 0.18;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillText(label, x, margin.top + plotHeight + 26);
    });

    ctx.setLineDash([]);
    if (yMin <= 0 && yMax >= 0) {
      const zeroY = margin.top + plotHeight - ((0 - yMin) / yRange) * plotHeight;
      ctx.strokeStyle = colors.axis;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(margin.left, zeroY);
      ctx.lineTo(margin.left + plotWidth, zeroY);
      ctx.stroke();
    }

    ctx.strokeStyle = colors.axis;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotHeight);
    ctx.moveTo(margin.left, margin.top + plotHeight);
    ctx.lineTo(margin.left + plotWidth, margin.top + plotHeight);
    ctx.stroke();
    ctx.restore();
  }

  function drawAxisLabels(ctx, width, height, margin, plotWidth, plotHeight, colors) {
    const dictionary = translations[currentLanguage];

    ctx.save();
    ctx.fillStyle = colors.axis;
    ctx.globalAlpha = 0.7;
    ctx.font = "12px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(dictionary.xAxisLabel, margin.left + plotWidth / 2, height - 18);

    ctx.translate(18, margin.top + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(dictionary.yAxisLabel, 0, 0);
    ctx.restore();
  }

  function drawLine(ctx, series, labels, margin, plotWidth, plotHeight, yMin, yMax, colors) {
    const yRange = yMax - yMin || 1;
    const appearance = getSeriesAppearance(series, colors);
    const points = series.values.map((value, index) => ({
      x: margin.left + (plotWidth / (labels.length - 1)) * index,
      y: margin.top + plotHeight - ((value - yMin) / yRange) * plotHeight,
    }));

    ctx.save();
    ctx.strokeStyle = appearance.color;
    ctx.lineWidth = appearance.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (appearance.dash.length) ctx.setLineDash(appearance.dash);

    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
        return;
      }

      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle = appearance.color;
    ctx.strokeStyle = colors.paper;
    ctx.lineWidth = 1.4;
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, appearance.pointRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawInteraction(ctx, index, margin, plotWidth, plotHeight, yMin, yMax, labels, colors) {
    const yRange = yMax - yMin || 1;
    const x = margin.left + (plotWidth / (labels.length - 1)) * index;

    ctx.save();
    ctx.strokeStyle = colors.guide;
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(x, margin.top);
    ctx.lineTo(x, margin.top + plotHeight);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);

    chartData.forEach((series) => {
      const value = series.values[index];
      const y = margin.top + plotHeight - ((value - yMin) / yRange) * plotHeight;
      const appearance = getSeriesAppearance(series, colors);
      ctx.fillStyle = appearance.color;
      ctx.beginPath();
      ctx.arc(x, y, appearance.pointRadius + 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = colors.paper;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    ctx.restore();
  }

  function updateHeaderState() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 4);
  }

  function initReveals() {
    const revealNodes = document.querySelectorAll(
      ".hero .eyebrow, .hero h1, .short-rule, .hero-copy, .section-shell, main > .divider, .results-section > .eyebrow, .results-section h2, .period, .chart-legend, .chart-wrap, .results-section > .request-link, .about-grid",
    );

    revealNodes.forEach((node) => node.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealNodes.forEach((node) => observer.observe(node));
  }

  function updateActiveIndex(clientX) {
    if (!chartCanvas || !chartState) return;
    const rect = chartCanvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const { margin, plotWidth, labels } = chartState;
    const step = plotWidth / (labels.length - 1);
    const index = Math.max(0, Math.min(labels.length - 1, Math.round((x - margin.left) / step)));

    activeIndex = index;
    drawChart();
    renderTooltip();
  }

  function renderTooltip() {
    if (!chartTooltip || !chartState || !chartData || activeIndex === null) {
      if (chartTooltip) chartTooltip.hidden = true;
      return;
    }

    const { margin, plotWidth, plotHeight, yMin, yMax, labels } = chartState;
    const yRange = yMax - yMin || 1;
    const x = margin.left + (plotWidth / (labels.length - 1)) * activeIndex;
    const topPoint = Math.min(
      ...chartData.map((series) => margin.top + plotHeight - ((series.values[activeIndex] - yMin) / yRange) * plotHeight),
    );
    const y = Math.max(86, topPoint);
    const ordered = [...chartData].sort((a, b) => {
      if (a.key === "strategy") return -1;
      if (b.key === "strategy") return 1;
      return b.values[activeIndex] - a.values[activeIndex];
    });

    chartTooltip.innerHTML = `
      <strong>${labels[activeIndex]}</strong>
      ${ordered
        .map((series) => `<span><em>${getSeriesLabel(series)}</em><b>${Math.round(series.values[activeIndex])}%</b></span>`)
        .join("")}
    `;
    chartTooltip.hidden = false;
    chartTooltip.style.left = `${x}px`;
    chartTooltip.style.top = `${y}px`;
  }

  function clearActiveIndex() {
    activeIndex = null;
    drawChart();
    renderTooltip();
  }

  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "it" : "en";
    window.localStorage.setItem("portfolio-language", currentLanguage);
    translate();
  });

  window.addEventListener("scroll", updateHeaderState, { passive: true });

  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      drawChart();
      renderTooltip();
    });
  });

  if (chartCanvas) {
    chartCanvas.addEventListener("mousemove", (event) => updateActiveIndex(event.clientX));
    chartCanvas.addEventListener("mouseleave", clearActiveIndex);
    chartCanvas.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches[0]) updateActiveIndex(event.touches[0].clientX);
      },
      { passive: true },
    );
    chartCanvas.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches[0]) updateActiveIndex(event.touches[0].clientX);
      },
      { passive: true },
    );
  }

  fetch("data/gains.csv")
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load gains.csv");
      return response.text();
    })
    .then((text) => {
      chartData = parseCsv(text);
      translate();
    })
    .catch(() => {
      chartData = parseCsv("fund,2022,2023,2024,2025\nftse mib,10.00%,10.00%,10.00%,10.00%\ns&p 500,20.00%,20.00%,20.00%,30.00%\nmfin (ours),30.00%,30.00%,40.00%,40.00%");
      translate();
    });

  updateHeaderState();
  initReveals();
  translate();
})();

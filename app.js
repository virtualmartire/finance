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
      documentTitle: "MFIN",
      navStrategy: "Plan",
      navResults: "Results",
      navAbout: "About",
      heroEyebrow: "Martire Investment Fund",
      heroTitle: "The Architecture of the Future",
      heroCopy:
        "Manifesto of an investment strategy based on technological acceleration and universal human progress.",
      scienceTitle: "Science and Technology",
      scienceBody: `
        <p>Science and Technology are the two pillars on which the structure of civilization stands. From the way we sustain ourselves to the regulation of social interactions, everything derives from the tools we have at our disposal to live in the world and overcome the problems that nature places before us. For this reason, recognizing in advance the importance of scientific discoveries and technological inventions in relation to the future dynamics of human life represents a major economic advantage, namely one of the most profitable and innovative investment opportunities of all.</p>
        <p>MFIN operates by constantly and deeply analyzing the contemporary socio-technological landscape, identifying the north stars by which the human species is being guided and building thematic portfolios around the most promising ones to finance companies in the respective sectors.</p>
      `,
      architectureTitle: "Business Plans",
      architectureBody: `
        <p>Every major technological development needs a rigorous financial plan in order to be executed properly. Good ideas and intelligence are undoubtedly the hardest kind of resource to find, but once a project is underway it is equally necessary to manage finances well and complete each stage of the plan with sound judgment.</p>
        <p>Indeed, every company considered by MFIN is also subjected to financial evaluations to determine whether the proposed concepts are materially feasible, with an output from us that is not binary but instead reflects the asset's percentage of risk, thereby contributing to the balancing and optimization of the fund's performance.</p>
      `,
      ethicsTitle: "Ethics",
      ethicsBody: `
        <p>Technology accelerates toward a future that is neither inevitable nor automatically beneficial for everyone. Acceleration without distribution is not civilization: it is a new form of feudalism encoded in matter. Progress must be universal, and the technologies destined to prevail are those that expand the commons of human capability: they lower the cost of intelligence, health, energy, and connection.</p>
        <p>MFIN invests exclusively in companies whose technological trajectory can ultimately help build a world in which every human being is elevated, ruling out from the outset those that increase disparities among individuals.</p>
      `,
      resultsEyebrow: "MFIN vs. the Market",
      resultsTitle: "Results",
      resultsPeriod: "Annual returns",
      aboutEyebrow: "About",
      aboutTitle: "Stefano Martire",
      aboutCredential: "Ph.D. in Data Science and Computation",
      aboutInstitute:
        '<a href="https://www.iit.it/" rel="noreferrer" target="_blank">Italian Institute of Technology</a>',
      aboutWebsite: "Personal website",
      aboutBody: `
        <p>My passion for science, technology, and invention has been with me since I was a child. I partially satisfied that curiosity with a degree in Mathematics from the Catholic University of the Sacred Heart and a doctorate in Data Science from the Italian Institute of Technology, before continuing my career in academic and industrial research and development.</p>
        <p>I approach markets not in search of arbitrage, but like a scientist in search of signal: deep structural patterns that reveal which technologies will become foundational elements for the human beings of the future.</p>
      `,
      requestAccess: "Request access",
      mailSubject: "Request access",
      chartAlt: "Annual percentage returns of MFIN compared with FTSE MIB, Euro Stoxx 50, S&P 500, and Nasdaq 100.",
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
      documentTitle: "MFIN",
      navStrategy: "Piano",
      navResults: "Risultati",
      navAbout: "Info",
      heroEyebrow: "Fondo di Investimento Martire",
      heroTitle: "L'Architettura del Futuro",
      heroCopy:
        "Manifesto di una strategia di investimento basata su accelerazione tecnologica e progresso umano universale.",
      scienceTitle: "Scienza e Tecnologia",
      scienceBody: `
        <p>Scienza e Tecnologia sono le due colonne su cui si erge la struttura della civiltà. Dal modo in cui ci sostentiamo al regolamento delle interazioni sociali, tutto deriva dagli strumenti che abbiamo a disposizione per stare al mondo e superare i problemi che la natura ci pone davanti. Per questo motivo, percepire in anticipo l'importanza l'importanza delle scoperte scientifiche e delle invenzioni tecnologiche relativamente alle dinamiche umane del futuro rappresenta un grande vantaggio economico, ovvero una tra le opportunità di investimento più profittevoli e innovative di tutte.</p>
        <p>MFIN opera tenendo costantemente e profondamente analizzato il panorama social-tecnologico contemporaneo, individuando le stelle polari da cui la specie umana si sta facendo guidare e costruendo sulle più promettenti dei portafogli tematici che finanziano le aziende dei relativi settori.</p>
      `,
      architectureTitle: "Piani Aziendali",
      architectureBody: `
        <p>Ogni grande sviluppo tecnologico ha bisogno di un rigoroso piano finanziario per poter essere correttamente eseguito. Le buone idee e l'intelligenza sono senza dubbio il tipo di risorsa più difficile da reperire, ma una volta partiti è altresì necessario amministrare bene le finanze e completare i vari punti del piano con criterio.</p>
        <p>Infatti, ogni azienda candidata in MFIN è anche sottoposta a delle valutazioni finanziarie per capire se i concetti proposti sono materialmente realizzabili, con un output da parte nostra che non è binario bensì riflettente la percentuale di rischio dell'asset, contribuendo in questo modo al bilanciamento e all'ottimizzazione della performance del fondo.</p>
      `,
      ethicsTitle: "Etica",
      ethicsBody: `
        <p>La tecnologia accelera verso un futuro che non è né inevitabile né automaticamente benefico per tutti. Accelerazione senza distribuzione non è civiltà: è una nuova forma di feudalesimo codificata nella materia. Il progresso deve essere universale e le tecnologie destinate a prevalere sono quelle che espandono i beni comuni della capacità umana: abbassano il costo dell'intelligenza, della salute, dell'energia e della connessione.</p>
        <p>MFIN investe esclusivamente in aziende la cui traiettoria tecnologica possa comporsi, in ultima analisi, in un mondo in cui ogni essere umano risulta evoluto, scartando a priori quelle che aumentano le disparità fra gli individui.</p>
      `,
      resultsEyebrow: "MFIN contro Il Mercato",
      resultsTitle: "Risultati",
      resultsPeriod: "Rendimenti annuali",
      aboutEyebrow: "Info",
      aboutTitle: "Stefano Martire",
      aboutCredential: "Ph.D. in Data Science and Computation",
      aboutInstitute:
        '<a href="https://www.iit.it/" rel="noreferrer" target="_blank">Istituto Italiano di Tecnologia</a>',
      aboutWebsite: "Sito personale",
      aboutBody: `
        <p>La passione per la scienza, la tecnica e le invenzioni mi accompagna fin da quando ero bambino. Sono parzialmente riuscito a colmare la mia curiosità con una laurea in Matematica presso l'Università Cattolica del Sacro Cuore e un dottorato in Data Science per l'Istituto Italiano di Tecnologia, per poi continuare la mia carriera negli ambiti della ricerca e sviluppo accademica e industriale.</p>
        <p>Mi avvicino ai mercati non in cerca di arbitraggio, ma come uno scienziato in cerca di segnale: pattern strutturali profondi che rivelano quali tecnologie diventeranno elementi portanti per gli esseri umani del futuro.</p>
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

/* ============ WORLD WAR II DOSSIER — behaviour ============
   Shared: header/footer, page curtain, parallax, blood drips, Wikipedia images
   Per page: three.js globe (home), d3 timeline, d3 bar chart, cards, quiz     */
(() => {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D = window.WW2;
  const page = document.body.dataset.page;

  /* ---------- header, footer ---------- */
  const NAV = [
    ["index.html", "Front page", "home"],
    ["story.html", "The story", "story"],
    ["timeline.html", "Timeline", "timeline"],
    ["battles.html", "Battles", "battles"],
    ["facts.html", "Facts", "facts"]
  ];

  function buildChrome() {
    const h = $("#site-header");
    h.className = "site";
    h.innerHTML =
      `<div class="wrap bar">
         <a class="brand" href="index.html"><span class="brand-mark">WW2</span><span class="brand-sub">1939 – 1945</span></a>
         <button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button>
         <nav id="nav" aria-label="Main">${NAV.map(n => `<a href="${n[0]}"${n[2] === page ? ' aria-current="page"' : ""}>${n[1]}</a>`).join("")}</nav>
       </div>
       <div class="progress"><i></i></div>`;
    const b = $(".burger", h);
    b.addEventListener("click", () => {
      const open = h.classList.toggle("open");
      b.setAttribute("aria-expanded", open);
    });

    const f = $("#site-footer");
    f.className = "foot";
    f.innerHTML =
      `<div class="wrap">
         <div><b>World War II dossier</b>A study site on the Second World War, 1939 to 1945. Numbers are commonly cited estimates and sources differ.</div>
         <div>Photographs are loaded live from <a href="https://en.wikipedia.org" target="_blank" rel="noopener">Wikipedia</a> and Wikimedia Commons; each caption links to its source page and licence.</div>
       </div>`;
  }

  /* ---------- page curtain (smooth transitions) ---------- */
  function curtain() {
    const c = $(".curtain");
    if (!c) return;
    requestAnimationFrame(() => requestAnimationFrame(() => c.classList.remove("cover")));
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href]");
      if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin) return;
      if (u.pathname === location.pathname && u.hash) return;
      e.preventDefault();
      c.classList.add("cover");
      setTimeout(() => { location.href = a.href; }, reduce ? 0 : 560);
    });
    addEventListener("pageshow", e => { if (e.persisted) c.classList.remove("cover"); });
  }

  /* ---------- scroll: progress bar + parallax ---------- */
  function scrollFx() {
    const bar = $(".progress i");
    let ticking = false;
    const run = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (!reduce) {
        $$("[data-speed]").forEach(el => {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -200 || r.top > innerHeight + 200) return;
          const c = r.top + r.height / 2 - innerHeight / 2;
          el.style.transform = `translate3d(0,${(c * parseFloat(el.dataset.speed)).toFixed(1)}px,0)`;
        });
      }
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    addEventListener("resize", run);
    run();
  }

  /* ---------- blood drips ---------- */
  function drips() {
    $$("[data-drips]").forEach(box => {
      const n = +box.dataset.drips, tall = box.dataset.tall ? 260 : 140;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const w = 8 + Math.random() * 20, h = 30 + Math.random() * tall;
        s.style.cssText =
          `left:${((i + Math.random() * .8) / n * 100).toFixed(1)}%;--w:${w.toFixed(0)}px;--h:${h.toFixed(0)}px;` +
          `--d:${(.6 + Math.random() * 1.6).toFixed(2)}s;--t:${(2.4 + Math.random() * 2.6).toFixed(2)}s`;
        box.appendChild(s);
      }
    });
  }

  /* ---------- images from Wikipedia ---------- */
  const imgCache = {};
  function wikiImage(title) {
    if (imgCache[title]) return imgCache[title];
    return (imgCache[title] = fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title))
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => {
        let src = j.thumbnail && j.thumbnail.source;
        if (src) src = src.replace(/\/\d+px-/, "/960px-");
        return { src, thumb: j.thumbnail && j.thumbnail.source, page: j.content_urls && j.content_urls.desktop.page };
      })
      .catch(() => ({})));
  }
  function fillFigures(root = document) {
    $$("[data-wiki]", root).forEach(fig => {
      const title = fig.dataset.wiki;
      const img = $("img", fig), credit = $(".credit", fig);
      wikiImage(title).then(o => {
        if (credit) credit.href = o.page || "https://en.wikipedia.org/wiki/" + encodeURIComponent(title);
        if (!o.src) { fig.classList.add("noimg"); return; }
        let retried = false;
        img.onload = () => fig.classList.add("loaded");
        img.onerror = () => {
          if (!retried && o.thumb && o.thumb !== img.src) { retried = true; img.src = o.thumb; }
          else fig.classList.add("noimg");
        };
        img.src = o.src;
      });
    });
  }
  function wipes(root = document) {
    const els = $$(".wipe", root);
    if (!("IntersectionObserver" in window) || reduce) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .2 });
    els.forEach(e => io.observe(e));
  }
  const figure = (title, alt, cap, cls = "") =>
    `<figure class="fig wipe ${cls}" data-wiki="${title}">
       <div class="frame"><img alt="${alt}" decoding="async"><div class="fallback"><span>The photo could not load. See it on <a href="https://en.wikipedia.org/wiki/${title}" target="_blank" rel="noopener" style="color:inherit">Wikipedia</a>.</span></div></div>
       <figcaption>${cap} <a class="credit" target="_blank" rel="noopener">Source and licence</a></figcaption>
     </figure>`;

  /* ============================================================
     HOME
     ============================================================ */
  function counters() {
    const fmt = d3.format(",.0f");
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, v = +el.dataset.count, suf = el.dataset.suffix || "";
      if (reduce) { el.textContent = fmt(v) + suf; return; }
      d3.select(el).transition().duration(1800).ease(d3.easeCubicOut)
        .tween("n", () => { const i = d3.interpolateNumber(0, v); return t => { el.textContent = fmt(i(t)) + suf; }; });
    }), { threshold: .6 });
    $$("[data-count]").forEach(el => io.observe(el));
  }

  function globe() {
    const el = $("#globe");
    if (!el || !window.THREE) return;
    const tip = $("#globe-tip");
    const SITES = [
      ["Warsaw, 1939", "Germany invades Poland.", 52.23, 21.01],
      ["Dunkirk, 1940", "338,000 soldiers evacuated.", 51.03, 2.37],
      ["London, 1940", "The Blitz.", 51.5, -0.12],
      ["Leningrad, 1941", "872-day siege begins.", 59.93, 30.33],
      ["Pearl Harbor, 1941", "Japan attacks the US fleet.", 21.36, -157.97],
      ["Midway, 1942", "Japan loses four carriers.", 28.2, -177.35],
      ["El Alamein, 1942", "Axis advance halted in Egypt.", 30.83, 28.95],
      ["Stalingrad, 1943", "Turning point in the East.", 48.71, 44.51],
      ["Normandy, 1944", "D-Day landings.", 49.34, -0.85],
      ["Berlin, 1945", "The Reich falls.", 52.52, 13.4],
      ["Iwo Jima, 1945", "Marines take the island.", 24.78, 141.32],
      ["Hiroshima, 1945", "First atomic bomb.", 34.39, 132.45],
      ["Nagasaki, 1945", "Second atomic bomb.", 32.75, 129.87],
      ["Nanjing, 1937", "Japanese army takes the capital.", 32.06, 118.8]
    ];
    const R = 2;
    const ll = (lat, lon, r) => {
      const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180;
      return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    camera.position.z = 6.4;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const g = new THREE.Group();
    scene.add(g);
    const base = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 32), new THREE.MeshBasicMaterial({ color: 0xe6dfc9 }));
    g.add(base);
    g.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(R + .004, 24, 16)),
      new THREE.LineBasicMaterial({ color: 0x17130f, transparent: true, opacity: .55 })));
    const ring = (r, rx, rz, col, op) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, .012, 6, 120),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op }));
      m.rotation.x = rx; m.rotation.z = rz; scene.add(m); return m;
    };
    const rings = [ring(2.7, 1.2, .3, 0xa3110f, .9), ring(3.05, .5, -.6, 0x17130f, .8)];

    const markers = SITES.map(s => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(.055, 12, 12), new THREE.MeshBasicMaterial({ color: 0xa3110f }));
      m.position.copy(ll(s[2], s[3], R + .02));
      m.userData = s;
      const halo = new THREE.Mesh(new THREE.RingGeometry(.07, .095, 24), new THREE.MeshBasicMaterial({ color: 0xa3110f, transparent: true, side: THREE.DoubleSide }));
      halo.position.copy(m.position);
      halo.lookAt(m.position.clone().multiplyScalar(2));
      g.add(m); g.add(halo);
      m.userData.halo = halo;
      return m;
    });

    g.rotation.y = -1.9; g.rotation.x = .28;
    let vy = reduce ? 0 : .0025, drag = false, lx = 0, ly = 0, px = 0, py = 0, visible = true;
    const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();

    function size() {
      const w = el.clientWidth;
      renderer.setSize(w, w);
      camera.aspect = 1; camera.updateProjectionMatrix();
    }
    size(); addEventListener("resize", size);

    el.addEventListener("pointerdown", e => { drag = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener("pointerup", () => { drag = false; });
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      px = mouse.x; py = mouse.y;
      if (drag) {
        g.rotation.y += (e.clientX - lx) * .008;
        g.rotation.x = Math.max(-1.1, Math.min(1.1, g.rotation.x + (e.clientY - ly) * .006));
        lx = e.clientX; ly = e.clientY; vy = 0;
      }
      ray.setFromCamera(mouse, camera);
      const hit = ray.intersectObjects([...markers, base])[0];
      if (hit && hit.object.userData[0]) {
        const u = hit.object.userData;
        tip.innerHTML = `<b>${u[0]}</b>${u[1]}`;
        tip.style.left = (e.clientX - r.left) + "px";
        tip.style.top = (e.clientY - r.top) + "px";
        tip.classList.add("show");
      } else tip.classList.remove("show");
    });
    el.addEventListener("pointerleave", () => tip.classList.remove("show"));
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(el);

    let t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      if (!visible) return;
      t += .03;
      if (!drag) g.rotation.y += vy;
      rings[0].rotation.z += .002; rings[1].rotation.z -= .0014;
      scene.rotation.y += ((px * .25) - scene.rotation.y) * .05;
      markers.forEach((m, i) => {
        const k = (t * .6 + i * .37) % 1;
        m.userData.halo.scale.setScalar(1 + k * 2.2);
        m.userData.halo.material.opacity = 1 - k;
      });
      renderer.render(scene, camera);
    })();
  }

  /* ============================================================
     STORY
     ============================================================ */
  function story() {
    const root = $("#chapters");
    root.innerHTML = D.chapters.map((c, i) =>
      `<section class="chapter${i % 2 ? " dark" : ""}" id="${c.id}">
         <div class="wrap">
           <div class="yr" data-speed="-0.05" aria-hidden="true">${c.years}</div>
           <div class="cols">
             <div class="txt">
               <h2>${c.title}</h2>
               ${c.paras.map(p => `<p>${p}</p>`).join("")}
               <div class="callout"><b class="big">${c.stat.n}</b><span>${c.stat.l}</span></div>
             </div>
             ${figure(c.wiki, c.alt, c.cap)}
           </div>
         </div>
       </section>`).join("");
    $("#chapnav .wrap").innerHTML = D.chapters.map(c => `<a href="#${c.id}">${c.years}</a>`).join("");
    fillFigures(root); wipes(root);

    const links = $$("#chapnav a");
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle("on", l.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-40% 0px -55% 0px" });
    $$(".chapter").forEach(s => io.observe(s));
  }

  /* ============================================================
     TIMELINE (d3, zoom + pan)
     ============================================================ */
  function timeline() {
    const host = $("#tl"), info = $("#tl-info"), chipBox = $("#chips");
    const parse = d3.timeParse("%Y-%m-%d");
    const fmtLong = d3.timeFormat("%-d %B %Y");
    const events = D.events.map(e => ({ ...e, date: parse(e.d) }));
    const lanes = Object.keys(D.theatres);
    const on = new Set(lanes);
    let selected = null, zk = 1, zt = null;

    chipBox.innerHTML = lanes.map(k =>
      `<button class="chip" style="--c:${D.theatres[k].color}" data-k="${k}" aria-pressed="true">${D.theatres[k].name}</button>`).join("");
    chipBox.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      const k = b.dataset.k, p = b.getAttribute("aria-pressed") === "true";
      b.setAttribute("aria-pressed", !p);
      p ? on.delete(k) : on.add(k);
      draw();
    });

    function show(ev) {
      selected = ev;
      info.innerHTML =
        `<div class="date">${fmtLong(ev.date)}</div>
         <div><span class="th" style="background:${D.theatres[ev.th].color};${ev.th === "world" ? "" : ""}">${D.theatres[ev.th].name}</span>
         <h3>${ev.t}</h3><p>${ev.x}</p></div>`;
    }

    function draw() {
      host.innerHTML = "";
      const W = Math.max(host.clientWidth, 320), H = 470, m = { l: 118, r: 20, t: 56, b: 16 };
      const svg = d3.select(host).append("svg").attr("viewBox", `0 0 ${W} ${H}`)
        .attr("role", "group").attr("aria-label", "Interactive timeline of World War II. Drag to pan, scroll or pinch to zoom.");
      const x0 = d3.scaleTime().domain([parse("1939-01-01"), parse("1946-01-01")]).range([m.l, W - m.r]);
      const laneY = d3.scaleBand().domain(lanes).range([m.t, H - m.b]).paddingInner(.06);

      svg.append("defs").append("clipPath").attr("id", "clip").append("rect")
        .attr("x", m.l).attr("y", 0).attr("width", W - m.l - m.r).attr("height", H);

      // lane backgrounds + labels (fixed)
      const lg = svg.append("g");
      lanes.forEach((k, i) => {
        lg.append("rect").attr("x", 0).attr("y", laneY(k)).attr("width", W).attr("height", laneY.bandwidth())
          .attr("fill", i % 2 ? "rgba(23,19,15,.05)" : "rgba(23,19,15,.11)");
        lg.append("rect").attr("x", 0).attr("y", laneY(k)).attr("width", m.l - 8).attr("height", laneY.bandwidth())
          .attr("fill", D.theatres[k].color);
        const words = D.theatres[k].name.split(" & ");
        const tx = lg.append("text").attr("class", "tl-lane").attr("x", 10).attr("y", laneY(k) + laneY.bandwidth() / 2 - (words.length - 1) * 11 + 7);
        words.forEach((w, j) => tx.append("tspan").attr("x", 10).attr("dy", j ? 24 : 0).text(w));
      });

      const plot = svg.append("g").attr("clip-path", "url(#clip)");
      const bands = plot.append("g"), axisG = svg.append("g").attr("class", "tl-axis").attr("transform", `translate(0,${m.t})`);
      const evG = plot.append("g");

      const years = d3.range(1939, 1946);
      const yb = bands.selectAll("g").data(years).join("g");
      yb.append("rect").attr("y", m.t).attr("height", H - m.t - m.b);
      yb.append("text").attr("class", "tl-year").attr("y", H - m.b - 14).text(d => d);

      const nodes = evG.selectAll("g").data(events, d => d.d + d.t).join("g")
        .attr("class", "tl-ev").attr("tabindex", 0).attr("role", "button")
        .attr("aria-label", d => `${fmtLong(d.date)}: ${d.t}`)
        .on("click", (e, d) => { show(d); place(); })
        .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(d); place(); } });
      nodes.append("rect").attr("x", -8).attr("y", -8).attr("width", 16).attr("height", 16)

        .attr("fill", d => D.theatres[d.th].color);
      nodes.append("text").attr("y", -14).attr("text-anchor", "middle").text(d => d.t);

      // vertical stagger inside lane so close events don't overlap
      const stag = new Map(); const counts = {};
      events.filter(e => true).forEach(e => { counts[e.th] = (counts[e.th] || 0); stag.set(e, (counts[e.th]++ % 3) - 1); });

      let x = x0;
      function place() {
        const dom = x.domain(), span = (dom[1] - dom[0]) / 864e5 / 365;
        yb.select("rect").attr("x", d => x(parse(d + "-01-01")))
          .attr("width", d => x(parse((d + 1) + "-01-01")) - x(parse(d + "-01-01")))
          .attr("fill", d => d % 2 ? "rgba(23,19,15,.05)" : "rgba(163,17,15,.06)");
        yb.select("text").attr("x", d => Math.max(x(parse(d + "-01-01")) + 10, m.l + 8));
        axisG.call(d3.axisTop(x).ticks(span < 3 ? d3.timeMonth.every(span < 1.5 ? 1 : 3) : d3.timeYear.every(1))
          .tickFormat(span < 3 ? d3.timeFormat("%b %y") : d3.timeFormat("%Y")).tickSize(-(H - m.t - m.b)));
        axisG.select(".domain").remove();
        axisG.selectAll("line").attr("stroke-opacity", .18);
        nodes.attr("class", d => "tl-ev" + (d === selected ? " sel" : ""))
          .attr("display", d => on.has(d.th) ? null : "none")
          .attr("transform", d => {
            const cy = laneY(d.th) + laneY.bandwidth() / 2 + stag.get(d) * (laneY.bandwidth() / 4.2);
            return `translate(${x(d.date)},${cy})`;
          });
      }

      const zoom = d3.zoom().scaleExtent([1, 12])
        .translateExtent([[m.l, 0], [W - m.r, H]]).extent([[m.l, 0], [W - m.r, H]])
        .on("zoom", e => { x = e.transform.rescaleX(x0); zt = e.transform; place(); });
      svg.call(zoom);
      // wheel zooms only with ctrl/meta so the page still scrolls
      svg.on("wheel.zoom", function (e) {
        if (e.ctrlKey || e.metaKey) { e.preventDefault(); zoom.scaleBy(svg, e.deltaY < 0 ? 1.25 : .8); }
      }, { passive: false });
      // initial state (keep the user's zoom on redraw, else zoom in on narrow screens)
      if (zt) svg.call(zoom.transform, zt);
      else if (W < 700) svg.call(zoom.transform, d3.zoomIdentity.translate(-2 * m.l, 0).scale(3));
      else place();

      $("#tl-zoom-in").onclick  = () => svg.transition().duration(350).call(zoom.scaleBy, 1.6);
      $("#tl-zoom-out").onclick = () => svg.transition().duration(350).call(zoom.scaleBy, 1 / 1.6);
      $("#tl-reset").onclick    = () => svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
    }

    show(events.find(e => e.t === "Pearl Harbor"));
    draw();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(draw, 200); });
  }

  /* ============================================================
     BATTLES: bar chart + cards
     ============================================================ */
  function bars() {
    const host = $("#bars-svg"), note = $("#bar-note");
    const data = D.deaths;
    const W = 900, rowH = 52, m = { l: 190, r: 90, t: 8, b: 8 }, H = data.length * rowH + m.t + m.b;
    const svg = d3.select(host).append("svg").attr("viewBox", `0 0 ${W} ${H}`)
      .attr("role", "img").attr("aria-label", "Bar chart of estimated deaths by country, in millions");
    const x = d3.scaleLinear().domain([0, 28]).range([0, W - m.l - m.r]);
    const y = d3.scaleBand().domain(data.map(d => d.c)).range([m.t, H - m.b]).padding(.22);
    const g = svg.selectAll("g").data(data).join("g");
    g.append("text").attr("class", "bar-lab").attr("x", m.l - 14).attr("y", d => y(d.c) + y.bandwidth() / 2 + 7).attr("text-anchor", "end").text(d => d.c);
    const rects = g.append("rect").attr("class", "bar-rect").attr("x", m.l).attr("y", d => y(d.c)).attr("height", y.bandwidth()).attr("width", 0)
      .attr("tabindex", 0).attr("stroke", "#17130f").attr("stroke-width", 3);
    const vals = g.append("text").attr("class", "bar-val").attr("y", d => y(d.c) + y.bandwidth() / 2 + 6).attr("x", m.l + 8).attr("opacity", 0)
      .text(d => (d.v >= 1 ? d.v : d.v.toFixed(2)) + " M");
    const say = d => { note.innerHTML = `<b>${d.c}:</b> ${d.note}`; };
    rects.on("mouseenter focus", (e, d) => say(d));
    say(data[0]);

    new IntersectionObserver((es, io) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      rects.transition().duration(reduce ? 0 : 1300).delay((d, i) => reduce ? 0 : i * 90).ease(d3.easeCubicOut).attr("width", d => x(d.v));
      vals.transition().duration(reduce ? 0 : 1300).delay((d, i) => reduce ? 0 : i * 90).ease(d3.easeCubicOut)
        .attr("x", d => m.l + x(d.v) + 10).attr("opacity", 1);
    }, { threshold: .3 }).observe(host);
  }

  function battles() {
    const grid = $("#battle-grid"), chips = $("#front-chips");
    const fronts = [["all", "All fronts"], ["europe", "Europe"], ["med", "Africa & Med"], ["pacific", "Pacific"]];
    chips.innerHTML = fronts.map((f, i) => `<button class="chip" style="--c:${f[0] === "all" ? "#e6dfc9" : D.theatres[f[0]].color}" data-f="${f[0]}" aria-pressed="${i === 0}">${f[1]}</button>`).join("");
    grid.innerHTML = D.battles.map(b =>
      `<article class="battle" data-front="${b.front}" data-wiki="${b.wiki}">
         <div class="fig" data-wiki="${b.wiki}"><div class="frame"><img alt="${b.name}" loading="lazy" decoding="async"><div class="fallback"><span>Photo unavailable</span></div></div>
           <figcaption><a class="credit" target="_blank" rel="noopener" style="color:inherit">Source and licence</a></figcaption></div>
         <div class="body">
           <span class="when">${b.when}</span>
           <h3>${b.name}</h3>
           <p><b>${b.sides}.</b> ${b.out}</p>
           <p class="toll"><b>Cost:</b> ${b.toll}</p>
         </div>
       </article>`).join("");
    // article carries no image itself; remove stray data-wiki so it isn't filled twice
    $$("article.battle", grid).forEach(a => a.removeAttribute("data-wiki"));
    fillFigures(grid);
    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", chips).forEach(c => c.setAttribute("aria-pressed", c === b));
      $$(".battle", grid).forEach(a => { a.hidden = b.dataset.f !== "all" && a.dataset.front !== b.dataset.f; });
    });
  }

  /* ============================================================
     FACTS: flip cards + quiz
     ============================================================ */
  function facts() {
    $("#cards").innerHTML = D.facts.map(f =>
      `<button class="flip" aria-pressed="false" aria-label="${f.q}. Press to flip.">
         <span class="in">
           <span class="face front"><span class="num">${f.n}</span><span><h3>${f.q}</h3><small>Tap to flip</small></span></span>
           <span class="face back">${f.a}</span>
         </span>
       </button>`).join("");
    $("#cards").addEventListener("click", e => {
      const b = e.target.closest(".flip"); if (!b) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true");
    });

    const box = $("#quiz");
    let i = 0, score = 0;
    const render = () => {
      if (i >= D.quiz.length) {
        box.innerHTML =
          `<p class="qn">Finished</p><h3>You scored ${score} out of ${D.quiz.length}.</h3>
           <p>${score === D.quiz.length ? "A perfect score. Read the timeline to test yourself on dates." : "Read the story or timeline and try again."}</p>
           <button class="btn" id="again">Play again</button>`;
        $("#again").onclick = () => { i = 0; score = 0; render(); };
        return;
      }
      const q = D.quiz[i];
      box.innerHTML =
        `<p class="qn">Question ${i + 1} of ${D.quiz.length}</p><h3>${q.q}</h3>
         <div class="opts">${q.o.map((o, k) => `<button class="opt" data-k="${k}">${o}</button>`).join("")}</div>
         <p class="why" aria-live="polite"></p>`;
      $$(".opt", box).forEach(b => b.onclick = () => {
        const k = +b.dataset.k;
        $$(".opt", box).forEach(o => o.disabled = true);
        $$(".opt", box)[q.a].classList.add("right");
        if (k === q.a) score++; else b.classList.add("wrong");
        $(".why", box).textContent = (k === q.a ? "Correct. " : "Not quite. ") + q.w;
        const n = document.createElement("button");
        n.className = "btn next"; n.textContent = i + 1 < D.quiz.length ? "Next question" : "See score";
        n.onclick = () => { i++; render(); };
        box.appendChild(n); n.focus();
      });
    };
    render();
  }

  /* ---------- boot ---------- */
  buildChrome();
  curtain();
  drips();
  scrollFx();
  if (page === "home")     { counters(); globe(); }
  if (page === "story")    story();
  if (page === "timeline") timeline();
  if (page === "battles")  { bars(); battles(); }
  if (page === "facts")    facts();
})();

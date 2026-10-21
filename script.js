// Legenda dos mapas: # parede · . chão · P início · B caixa · O memória · D porta
const cientistas = [
  { nome: "Ada Lovelace", area: "Matemática · 1815–1852", cor: "#7b3fa0", curto: "Ada",
    texto: "Em 1843, escreveu notas sobre a Máquina Analítica de Charles Babbage que incluíam um algoritmo para calcular números de Bernoulli. Por isso é lembrada como a primeira programadora.[...]",
    fun: "Ela já imaginava que máquinas poderiam fazer mais que contas: criar música, por exemplo." },
  { nome: "Grace Hopper", area: "Computação · 1906–1992", cor: "#1f7a8c", curto: "Grace",
    texto: "Criou um dos primeiros compiladores, programa que traduz código escrito por pessoas para a linguagem da máquina, e ajudou a popularizar linguagens mais próximas do inglês, como o CO[...]",
    fun: "Era almirante da Marinha dos Estados Unidos." },
  { nome: "Marie Curie", area: "Física e Química · 1867–1934", cor: "#c2410c", curto: "Marie",
    texto: "Pesquisou a radioatividade e descobriu os elementos polônio e rádio. Ganhou o Nobel de Física em 1903 e o de Química em 1911.",
    fun: "Foi a primeira pessoa a ganhar dois prêmios Nobel, em áreas diferentes." },
  { nome: "Katherine Johnson", area: "Matemática · 1918–2020", cor: "#b5338a", curto: "Katherine",
    texto: "Matemática da NASA, calculou trajetórias de voos espaciais na mão. Em 1962, os astronautas pediram que ela conferisse os cálculos do computador para a órbita de John Glenn.",
    fun: "Seus cálculos também ajudaram nas missões do programa Apollo." },
  { nome: "Nise da Silveira", area: "Psiquiatria · 1905–1999", cor: "#2e7d4f", curto: "Nise",
    texto: "Psiquiatra brasileira que criticou tratamentos agressivos e apostou na arte e no afeto como cuidado. Em 1952 fundou o Museu de Imagens do Inconsciente, no Rio de Janeiro.",
    fun: "Nasceu em Maceió, Alagoas." },
  { nome: "Sônia Guimarães", area: "Física · brasileira", cor: "#3856b8", curto: "Sônia",
    texto: "Foi a primeira mulher negra brasileira a se doutorar em Física. É professora do ITA e pesquisa materiais para sensores de infravermelho.",
    fun: "Também incentiva meninas e jovens negros a seguirem carreiras científicas." }
];

const vazio = "#..................#";
const HUB = ["##D##D##D##D##D##D##", ...Array(7).fill(vazio), "#.........P........#", vazio, "#".repeat(20)];

const LEVELS = [
 ["####################",
  "####################",
  "#####.........######",
  "#####..#####..######",
  "######....O#.B######",
  "############.#######",
  "#####.B......#######",
  "#####.P#..#...######",
  "####################",
  "####################",
  "####################"],
 ["####################",
  "####################",
  "#####...#.#..#######",
  "#####B.........#####",
  "#####.B#.####..#####",
  "######.##..O#.######",
  "#####..#.#..#.######",
  "#####......##BP#####",
  "#####.##...#...#####",
  "####################",
  "####################"],
 ["####################",
  "####################",
  "####...#..#.#P.#####",
  "#####........B.#####",
  "####..##############",
  "####..#........#####",
  "#####.#O.#..#..#####",
  "####..B##.##.B######",
  "####...........#####",
  "####################",
  "####################"],
 ["####################",
  "#####.......##..####",
  "####...##.#.B...####",
  "####.#..#.#.#.#.####",
  "####...#O.#.##..####",
  "####.#.####BP#B.####",
  "######..B.#..#.#####",
  "####....#..###..####",
  "####..#.........####",
  "####################",
  "####################"],
 ["####################",
  "###.P#...#..##..####",
  "###.B...........####",
  "###.#.#.#####.B.####",
  "########.#...##.####",
  "###..........O#.####",
  "###..#..#.#..##.####",
  "####B.##.####...####",
  "###..........B..####",
  "####################",
  "####################"],
 ["####################",
  "###....#..B......###",
  "###B##P#..###....###",
  "###...##.#...#.O.###",
  "###.#B#..##...#B####",
  "###.#..#.........###",
  "###.#.##..##.##..###",
  "#####..#..###.#.####",
  "###...#.##.B....####",
  "###..........#...###",
  "####################"]
];


// ---------- estado ----------
const T = 48, FW = 47.5, FH = 95, MS = 260;   // MS = tempo de cada passo (ms): maior = mais lento
const $ = id => document.getElementById(id);
const map = $("map"), player = $("player"), card = $("card"), intro = $("intro");
let grid, boxes, doors, px, py, sala = -1, linha = 0, coluna = 0, moving = false, play = false, depois = null;
const feitas = new Set(), held = [];
const dirs = { w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
const teclas = { w: "w", arrowup: "w", a: "a", arrowleft: "a", s: "s", arrowdown: "s", d: "d", arrowright: "d" };

player.style.backgroundImage = "url('img/abigailWalk.png')";
player.style.transitionDuration = MS + "ms";

// classes Tailwind dos elementos criados aqui
const CLS = {
  parede: "bg-plum shadow-[inset_0_0_0_2px_#3f2a63]",
  caixa: "z-2 border-[3px] border-wood-d bg-wood box-cross transition-[left,top] ease-linear",
  porta: "grid place-items-center rounded-t-3xl border-[3px] border-night bg-(--c) text-[22px] font-bold text-white",
  portaOk: "saturate-[.4] brightness-[1.15]",
  rotulo: "absolute z-1 w-30 text-center text-[13px] font-bold text-plum",
  bolinha: "z-1 grid place-items-center",
  bolinhaI: "grid size-10 place-items-center rounded-full bg-(--c) text-xl font-bold text-white not-italic shadow-[0_0_0_4px_#ffd23f,0_0_18px_6px_rgba(255,210,63,.7)] animate-pulso motion-reduce:[...]",
};

function tile(cls, x, y, cor) {
  const el = document.createElement("div");
  el.className = "absolute size-12 " + cls;
  el.style.left = x * T + "px"; el.style.top = y * T + "px";
  if (cor) el.style.setProperty("--c", cor);
  map.appendChild(el); return el;
}
function posPlayer() {
  player.style.left = px * T + 0.25 + "px";
  player.style.top = 48 + py * T + T - FH + "px";
  player.style.zIndex = 10 + py;
  player.style.backgroundPosition = `${-coluna * FW}px ${-linha * FH}px`;
}

// ---------- salas ----------
function carregar(i, daPorta) {
  sala = i; map.innerHTML = ""; boxes = []; doors = [];
  let start = [1, 1];
  grid = (i < 0 ? HUB : LEVELS[i]).map((r, y) => [...r].map((c, x) => {
    if (c === "#") tile(CLS.parede, x, y);
    else if (c === "P") start = [x, y];
    else if (c === "B") {
      const el = tile(CLS.caixa, x, y); el.style.transitionDuration = MS + "ms"; boxes.push({ x, y, el });
    } else if (c === "D") {
      const k = doors.length, s = cientistas[k], ok = feitas.has(k);
      const el = tile(CLS.porta + (ok ? " " + CLS.portaOk : ""), x, y, s.cor);
      el.textContent = ok ? "✓" : s.curto[0];
      const l = document.createElement("div"); l.className = CLS.rotulo; l.textContent = s.curto;
      l.style.left = x * T - 36 + "px"; l.style.top = (y + 1) * T + 4 + "px"; map.appendChild(l);
      doors.push({ x, y });
    } else if (c === "O") {
      tile(CLS.bolinha, x, y, cientistas[i].cor).innerHTML = `<i class="${CLS.bolinhaI}">${cientistas[i].curto[0]}</i>`;
    }
    return "#DO".includes(c) ? c : ".";
  }));
  if (i < 0 && daPorta !== undefined) start = [doors[daPorta].x, 1];
  [px, py] = start; linha = coluna = 0; moving = false; posPlayer();
  $("room").textContent = i < 0 ? "Sala inicial" : "Sala de " + cientistas[i].nome;
  $("hint").textContent = i < 0 ? "Entre em uma porta para procurar a memória de uma cientista" : "Empurre as caixas até a bolinha · R reinicia · Esc volta";
}

// ---------- movimento ----------
function passo(dx, dy) {
  linha = dy > 0 ? 0 : dy < 0 ? 1 : dx > 0 ? 2 : 3;
  const nx = px + dx, ny = py + dy, c = grid[ny]?.[nx];
  if (c === undefined || c === "#") return posPlayer();
  const b = boxes.find(b => b.x === nx && b.y === ny);
  if (b) {
    const bx = nx + dx, by = ny + dy;
    if (grid[by]?.[bx] !== "." || boxes.some(o => o.x === bx && o.y === by)) return posPlayer();
    b.x = bx; b.y = by; b.el.style.left = bx * T + "px"; b.el.style.top = by * T + "px";
  }
  px = nx; py = ny; coluna = (coluna + 1) % 4; moving = true; posPlayer();
  setTimeout(chegou, MS);
}
function chegou() {
  moving = false;
  if (!held.length) { coluna = 0; posPlayer(); }
  const c = grid[py][px];
  if (c === "D") carregar(doors.findIndex(d => d.x === px && d.y === py));
  else if (c === "O") {
    const k = sala; feitas.add(k); $("count").textContent = feitas.size + " / 6";
    mostrar({ tag: "Memória recuperada", ...cientistas[k] }, () => {
      if (feitas.size < 6) return carregar(-1, k);
      mostrar({ tag: "Fim de jogo", nome: "Você recuperou todas as memórias!", area: "Ciência Delas · SNCT 2026", cor: "#2e1a4a",
        texto: "Obrigado por jogar! Ada, Grace, Marie, Katherine, Nise e Sônia mostram que a ciência também é delas.",
        botao: "Fechar (E)" }, () => carregar(-1));
    });
  }
}
setInterval(() => { if (play && !moving && held.length && !aberto()) passo(...dirs[held.at(-1)]); }, 16);

// ---------- modal ----------
const aberto = () => !card.classList.contains("hidden");
function mostrar(s, fn) {
  card.style.setProperty("--c", s.cor);
  $("cTag").textContent = s.tag; $("cNome").textContent = s.nome; $("cArea").textContent = s.area;
  $("cTexto").textContent = s.texto; $("cFun").textContent = s.fun || ""; $("cFun").classList.toggle("hidden", !s.fun);
  $("cFechar").textContent = s.botao || "Continuar (E)";
  card.classList.replace("hidden", "grid"); depois = fn; $("cFechar").focus();
}
function fechar() { card.classList.replace("grid", "hidden"); const f = depois; depois = null; f?.(); }
$("cFechar").onclick = fechar;

// ---------- teclado ----------
addEventListener("keydown", e => {
  const k = e.key.toLowerCase();
  if (!play) return k === "enter" || k === " " ? comecar() : 0;
  if (aberto()) return k === "e" || k === "escape" ? fechar() : 0;
  if (k === "r" && sala >= 0) return carregar(sala);
  if (k === "escape" && sala >= 0) return carregar(-1, sala);
  const d = teclas[k]; if (d) { e.preventDefault(); if (!held.includes(d)) held.push(d); }
});
addEventListener("keyup", e => { const i = held.indexOf(teclas[e.key.toLowerCase()]); if (i >= 0) held.splice(i, 1); });
addEventListener("blur", () => held.length = 0);

// ---------- abertura (tela preta + mensagem) ----------
const mostrarLinha = (id, ms) => setTimeout(() => $(id).classList.replace("opacity-0", "opacity-100"), ms);
mostrarLinha("l1", 900); mostrarLinha("l2", 3200);
const auto = setTimeout(comecar, 7000);
function comecar() { clearTimeout(auto); intro.classList.add("opacity-0", "pointer-events-none"); play = true; }
intro.onclick = comecar;

// ---------- ajuste de tela ----------
const ajustar = () => $("stage").style.transform = `scale(${Math.min(innerWidth / 960, innerHeight / 576, 1.4)})`;
addEventListener("resize", ajustar); ajustar();
carregar(-1);

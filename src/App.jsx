import { useState, useMemo } from "react";

// ── CRIPTO — Top 100 por market cap 2026 ─────────────────────
const cryptoList = [
  { symbol:"BTC",  name:"Bitcoin",          price:"$68.396",  change:"+2.4%",  cap:"$1.32T",  up:true },
  { symbol:"ETH",  name:"Ethereum",         price:"$2.084",   change:"-1.2%",  cap:"$251B",   up:false },
  { symbol:"USDT", name:"Tether",           price:"$1.00",    change:"0.0%",   cap:"$183B",   up:true },
  { symbol:"XRP",  name:"XRP",              price:"$2.18",    change:"+3.1%",  cap:"$125B",   up:true },
  { symbol:"BNB",  name:"BNB",              price:"$598",     change:"+1.8%",  cap:"$83.5B",  up:true },
  { symbol:"SOL",  name:"Solana",           price:"$138",     change:"+4.2%",  cap:"$71.2B",  up:true },
  { symbol:"USDC", name:"USD Coin",         price:"$1.00",    change:"0.0%",   cap:"$60.1B",  up:true },
  { symbol:"DOGE", name:"Dogecoin",         price:"$0.182",   change:"+5.3%",  cap:"$27.1B",  up:true },
  { symbol:"ADA",  name:"Cardano",          price:"$0.72",    change:"-0.8%",  cap:"$25.8B",  up:false },
  { symbol:"TRX",  name:"TRON",             price:"$0.24",    change:"+1.1%",  cap:"$20.9B",  up:true },
  { symbol:"AVAX", name:"Avalanche",        price:"$22.4",    change:"-2.3%",  cap:"$9.3B",   up:false },
  { symbol:"LINK", name:"Chainlink",        price:"$14.8",    change:"+2.9%",  cap:"$9.1B",   up:true },
  { symbol:"TON",  name:"Toncoin",          price:"$3.52",    change:"+0.6%",  cap:"$8.9B",   up:true },
  { symbol:"SHIB", name:"Shiba Inu",        price:"$0.000013",change:"+6.1%",  cap:"$7.9B",   up:true },
  { symbol:"DOT",  name:"Polkadot",         price:"$5.21",    change:"-1.4%",  cap:"$7.2B",   up:false },
  { symbol:"SUI",  name:"Sui",              price:"$2.84",    change:"+8.2%",  cap:"$7.0B",   up:true },
  { symbol:"HBAR", name:"Hedera",           price:"$0.21",    change:"+1.3%",  cap:"$6.8B",   up:true },
  { symbol:"LTC",  name:"Litecoin",         price:"$89.4",    change:"+0.7%",  cap:"$6.7B",   up:true },
  { symbol:"BCH",  name:"Bitcoin Cash",     price:"$342",     change:"+1.9%",  cap:"$6.8B",   up:true },
  { symbol:"UNI",  name:"Uniswap",          price:"$7.38",    change:"-0.5%",  cap:"$5.6B",   up:false },
  { symbol:"NEAR", name:"NEAR Protocol",    price:"$4.12",    change:"+3.4%",  cap:"$5.1B",   up:true },
  { symbol:"PEPE", name:"Pepe",             price:"$0.0000098",change:"+9.4%", cap:"$4.1B",   up:true },
  { symbol:"APT",  name:"Aptos",            price:"$6.84",    change:"+2.1%",  cap:"$3.3B",   up:true },
  { symbol:"ICP",  name:"Internet Computer",price:"$8.92",    change:"-1.8%",  cap:"$4.2B",   up:false },
  { symbol:"POL",  name:"Polygon",          price:"$0.34",    change:"-0.9%",  cap:"$3.4B",   up:false },
  { symbol:"ETC",  name:"Ethereum Classic", price:"$19.4",    change:"+0.4%",  cap:"$2.9B",   up:true },
  { symbol:"ATOM", name:"Cosmos",           price:"$4.82",    change:"-2.1%",  cap:"$1.9B",   up:false },
  { symbol:"ARB",  name:"Arbitrum",         price:"$0.42",    change:"+1.7%",  cap:"$1.7B",   up:true },
  { symbol:"XLM",  name:"Stellar",          price:"$0.11",    change:"+0.8%",  cap:"$3.3B",   up:true },
  { symbol:"OP",   name:"Optimism",         price:"$0.81",    change:"+2.4%",  cap:"$1.1B",   up:true },
  { symbol:"MKR",  name:"Maker",            price:"$1.420",   change:"-0.3%",  cap:"$1.3B",   up:false },
  { symbol:"VET",  name:"VeChain",          price:"$0.028",   change:"+1.2%",  cap:"$2.3B",   up:true },
  { symbol:"FIL",  name:"Filecoin",         price:"$3.84",    change:"-1.5%",  cap:"$2.1B",   up:false },
  { symbol:"AAVE", name:"Aave",             price:"$158",     change:"+3.8%",  cap:"$2.3B",   up:true },
  { symbol:"INJ",  name:"Injective",        price:"$14.2",    change:"+5.1%",  cap:"$1.4B",   up:true },
  { symbol:"IMX",  name:"Immutable",        price:"$0.92",    change:"+1.6%",  cap:"$1.5B",   up:true },
  { symbol:"GRT",  name:"The Graph",        price:"$0.12",    change:"+0.9%",  cap:"$1.1B",   up:true },
  { symbol:"SAND", name:"The Sandbox",      price:"$0.29",    change:"+4.2%",  cap:"$0.7B",   up:true },
  { symbol:"MANA", name:"Decentraland",     price:"$0.31",    change:"+3.7%",  cap:"$0.6B",   up:true },
  { symbol:"CRO",  name:"Cronos",           price:"$0.092",   change:"+0.5%",  cap:"$2.4B",   up:true },
  { symbol:"ALGO", name:"Algorand",         price:"$0.18",    change:"-0.7%",  cap:"$1.5B",   up:false },
  { symbol:"FTM",  name:"Fantom",           price:"$0.62",    change:"+2.8%",  cap:"$1.7B",   up:true },
  { symbol:"FLOW", name:"Flow",             price:"$0.52",    change:"+1.4%",  cap:"$0.5B",   up:true },
  { symbol:"QNT",  name:"Quant",            price:"$82.4",    change:"-0.6%",  cap:"$1.2B",   up:false },
  { symbol:"EOS",  name:"EOS",              price:"$0.72",    change:"+0.3%",  cap:"$1.1B",   up:true },
  { symbol:"AXS",  name:"Axie Infinity",    price:"$4.82",    change:"+2.1%",  cap:"$0.8B",   up:true },
  { symbol:"THETA",name:"Theta Network",    price:"$1.24",    change:"-1.1%",  cap:"$1.2B",   up:false },
  { symbol:"XTZ",  name:"Tezos",            price:"$0.84",    change:"+0.6%",  cap:"$0.8B",   up:true },
  { symbol:"EGLD", name:"MultiversX",       price:"$22.8",    change:"+3.2%",  cap:"$0.6B",   up:true },
  { symbol:"CHZ",  name:"Chiliz",           price:"$0.058",   change:"+1.8%",  cap:"$0.6B",   up:true },
  { symbol:"ZEC",  name:"Zcash",            price:"$32.4",    change:"-0.8%",  cap:"$0.5B",   up:false },
  { symbol:"KAVA", name:"Kava",             price:"$0.48",    change:"+1.2%",  cap:"$0.4B",   up:true },
  { symbol:"XMR",  name:"Monero",           price:"$184",     change:"+0.9%",  cap:"$3.4B",   up:true },
  { symbol:"CRV",  name:"Curve DAO",        price:"$0.38",    change:"+2.4%",  cap:"$0.5B",   up:true },
  { symbol:"COMP", name:"Compound",         price:"$42.8",    change:"-0.4%",  cap:"$0.4B",   up:false },
  { symbol:"SNX",  name:"Synthetix",        price:"$1.24",    change:"+1.9%",  cap:"$0.4B",   up:true },
  { symbol:"1INCH",name:"1inch",            price:"$0.28",    change:"+2.2%",  cap:"$0.3B",   up:true },
  { symbol:"BAT",  name:"Basic Attn Token", price:"$0.19",    change:"+0.7%",  cap:"$0.3B",   up:true },
  { symbol:"ZIL",  name:"Zilliqa",          price:"$0.016",   change:"+1.4%",  cap:"$0.2B",   up:true },
  { symbol:"ENJ",  name:"Enjin Coin",       price:"$0.14",    change:"+3.1%",  cap:"$0.2B",   up:true },
  { symbol:"LRC",  name:"Loopring",         price:"$0.11",    change:"+0.8%",  cap:"$0.1B",   up:true },
  { symbol:"CELO", name:"Celo",             price:"$0.48",    change:"+1.6%",  cap:"$0.2B",   up:true },
  { symbol:"ICX",  name:"ICON",             price:"$0.16",    change:"-0.5%",  cap:"$0.2B",   up:false },
  { symbol:"ZRX",  name:"0x Protocol",      price:"$0.28",    change:"+0.6%",  cap:"$0.2B",   up:true },
  { symbol:"DYDX", name:"dYdX",             price:"$1.18",    change:"+4.2%",  cap:"$0.4B",   up:true },
  { symbol:"RPL",  name:"Rocket Pool",      price:"$8.42",    change:"+2.8%",  cap:"$0.2B",   up:true },
  { symbol:"OCEAN",name:"Ocean Protocol",   price:"$0.38",    change:"+3.4%",  cap:"$0.2B",   up:true },
  { symbol:"SKL",  name:"SKALE",            price:"$0.041",   change:"+1.2%",  cap:"$0.2B",   up:true },
  { symbol:"STORJ",name:"Storj",            price:"$0.42",    change:"-0.9%",  cap:"$0.1B",   up:false },
  { symbol:"YFI",  name:"yearn.finance",    price:"$5.820",   change:"+1.8%",  cap:"$0.2B",   up:true },
  { symbol:"SUSHI",name:"SushiSwap",        price:"$0.84",    change:"+2.3%",  cap:"$0.1B",   up:true },
  { symbol:"REN",  name:"Ren",              price:"$0.062",   change:"+0.4%",  cap:"$0.1B",   up:true },
  { symbol:"KNC",  name:"Kyber Network",    price:"$0.52",    change:"+1.1%",  cap:"$0.1B",   up:true },
  { symbol:"BAND", name:"Band Protocol",    price:"$1.14",    change:"+2.6%",  cap:"$0.1B",   up:true },
  { symbol:"ANT",  name:"Aragon",           price:"$4.82",    change:"-0.3%",  cap:"$0.1B",   up:false },
  { symbol:"RLC",  name:"iExec RLC",        price:"$1.28",    change:"+1.7%",  cap:"$0.1B",   up:true },
  { symbol:"NMR",  name:"Numeraire",        price:"$12.4",    change:"+0.8%",  cap:"$0.1B",   up:true },
  { symbol:"GLM",  name:"Golem",            price:"$0.24",    change:"+1.3%",  cap:"$0.2B",   up:true },
  { symbol:"PAXG", name:"PAX Gold",         price:"$3.142",   change:"+1.1%",  cap:"$0.7B",   up:true },
  { symbol:"RSR",  name:"Reserve Rights",   price:"$0.0068",  change:"+2.4%",  cap:"$0.4B",   up:true },
  { symbol:"ANKR", name:"Ankr",             price:"$0.028",   change:"+1.8%",  cap:"$0.3B",   up:true },
  { symbol:"CTSI", name:"Cartesi",          price:"$0.18",    change:"+3.2%",  cap:"$0.2B",   up:true },
  { symbol:"CELR", name:"Celer Network",    price:"$0.016",   change:"+0.9%",  cap:"$0.1B",   up:true },
  { symbol:"PERP", name:"Perpetual Proto.", price:"$0.52",    change:"+2.8%",  cap:"$0.1B",   up:true },
  { symbol:"AUDIO",name:"Audius",           price:"$0.092",   change:"+1.4%",  cap:"$0.1B",   up:true },
  { symbol:"MASK", name:"Mask Network",     price:"$2.84",    change:"+3.6%",  cap:"$0.3B",   up:true },
  { symbol:"API3", name:"API3",             price:"$1.18",    change:"+2.1%",  cap:"$0.1B",   up:true },
  { symbol:"SPELL",name:"Spell Token",      price:"$0.00048", change:"+4.2%",  cap:"$0.1B",   up:true },
  { symbol:"TOKE", name:"Tokemak",          price:"$1.84",    change:"+1.8%",  cap:"$0.1B",   up:true },
  { symbol:"BICO", name:"Biconomy",         price:"$0.28",    change:"+2.4%",  cap:"$0.1B",   up:true },
  { symbol:"HFT",  name:"Hashflow",         price:"$0.18",    change:"+1.6%",  cap:"$0.1B",   up:true },
  { symbol:"MAGIC",name:"Magic",            price:"$0.52",    change:"+5.8%",  cap:"$0.2B",   up:true },
  { symbol:"GMX",  name:"GMX",              price:"$18.4",    change:"+3.2%",  cap:"$0.2B",   up:true },
  { symbol:"BLUR", name:"Blur",             price:"$0.14",    change:"+4.8%",  cap:"$0.2B",   up:true },
  { symbol:"WLD",  name:"Worldcoin",        price:"$1.24",    change:"+6.2%",  cap:"$0.8B",   up:true },
  { symbol:"JUP",  name:"Jupiter",          price:"$0.62",    change:"+4.4%",  cap:"$0.9B",   up:true },
  { symbol:"PYTH", name:"Pyth Network",     price:"$0.18",    change:"+2.8%",  cap:"$0.8B",   up:true },
  { symbol:"SEI",  name:"Sei",              price:"$0.24",    change:"+3.4%",  cap:"$0.6B",   up:true },
  { symbol:"TIA",  name:"Celestia",         price:"$3.42",    change:"+5.2%",  cap:"$0.8B",   up:true },
  { symbol:"STRK", name:"Starknet",         price:"$0.28",    change:"+2.1%",  cap:"$0.4B",   up:true },
  { symbol:"ALT",  name:"AltLayer",         price:"$0.092",   change:"+3.8%",  cap:"$0.2B",   up:true },
  { symbol:"W",    name:"Wormhole",         price:"$0.14",    change:"+2.4%",  cap:"$0.6B",   up:true },
];

// ── Markets ───────────────────────────────────────────────────
const ADMINS = ["sellysmar@gmail.com"];
const isAdmin = (email) => ADMINS.includes(email.toLowerCase().trim());

const markets = [
  // FUTEBOL
  { id:1, category:"FUTEBOL", tag:"BRASILEIRÃO A", title:"Campeão Série A 2026", status:"LIVE", round:"Rodada 8", volume:"R$ 12,4M", marketsCount:28, news:"Flamengo lidera com 100% de aproveitamento, mas Palmeiras e Atlético-MG pressionam.", options:[{name:"Flamengo",flag:"🔴",score:"1°",prob:32,color:"#ef4444"},{name:"Palmeiras",flag:"🟢",score:"2°",prob:25,color:"#00c896"},{name:"Atlético-MG",flag:"⚫",score:"3°",prob:18,color:"#6b7280"},{name:"Corinthians",flag:"⚪",score:"4°",prob:14,color:"#9ca3af"},{name:"Botafogo",flag:"⭐",score:"5°",prob:11,color:"#f59e0b"}]},
  { id:2, category:"FUTEBOL", tag:"BRASILEIRÃO B", title:"Campeão Série B 2026", status:"LIVE", round:"Rodada 7", volume:"R$ 3,2M", marketsCount:15, news:"Sport e Mirassol lideram a Série B. América-MG tenta retornar à elite.", options:[{name:"Sport",flag:"🔴",score:"1°",prob:28,color:"#ef4444"},{name:"Mirassol",flag:"🔵",score:"2°",prob:22,color:"#3b82f6"},{name:"América-MG",flag:"🟢",score:"3°",prob:20,color:"#00c896"},{name:"Goiás",flag:"🟢",score:"4°",prob:15,color:"#059669"},{name:"Coritiba",flag:"🟡",score:"5°",prob:10,color:"#f59e0b"}]},
  { id:3, category:"FUTEBOL", tag:"CHAMPIONS LEAGUE", title:"Vencedor da Champions League 2026", status:"LIVE", round:"Semifinais", volume:"$210M", marketsCount:34, news:"Real Madrid e Arsenal nas semifinais. Bayern e PSG completam o quadro.", options:[{name:"Real Madrid",flag:"🇪🇸",score:"SF",prob:38,color:"#f59e0b"},{name:"Arsenal",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",score:"SF",prob:26,color:"#ef4444"},{name:"Bayern Munich",flag:"🇩🇪",score:"SF",prob:20,color:"#8b5cf6"},{name:"PSG",flag:"🇫🇷",score:"SF",prob:16,color:"#3b82f6"},{name:"Outro",flag:"⚪",score:"-",prob:5,color:"#9ca3af"}]},
  { id:4, category:"FUTEBOL", tag:"BRASILEIRÃO A", title:"Artilheiro Série A 2026", status:"LIVE", round:"Temporada", volume:"R$ 5,8M", marketsCount:20, news:"Pedro do Flamengo lidera com 8 gols. Hulk e Dudu aparecem logo atrás.", options:[{name:"Pedro (FLA)",flag:"🔴",score:"8 gols",prob:30,color:"#ef4444"},{name:"Hulk (ATL)",flag:"⚫",score:"6 gols",prob:24,color:"#f59e0b"},{name:"Dudu (PAL)",flag:"🟢",score:"5 gols",prob:20,color:"#00c896"},{name:"Yuri (BOT)",flag:"⭐",score:"5 gols",prob:16,color:"#3b82f6"},{name:"Outro",flag:"⚪",score:"-",prob:10,color:"#9ca3af"}]},
  // NBA
  { id:5, category:"NBA", tag:"NBA", title:"NBA Finals MVP 2026", status:"LIVE", round:"Playoffs", volume:"$124M", marketsCount:18, news:"Finais de conferência esquentando. Times brigam por vaga nas finais.", options:[{name:"Nikola Jokić",flag:"🇷🇸",score:"+3pts",prob:28,color:"#f59e0b"},{name:"LeBron James",flag:"🇺🇸",score:"+2pts",prob:22,color:"#ef4444"},{name:"Luka Dončić",flag:"🇸🇮",score:"+1pt",prob:19,color:"#3b82f6"},{name:"Jayson Tatum",flag:"🇺🇸",score:"EV",prob:15,color:"#00c896"},{name:"Giannis",flag:"🇬🇷",score:"-1pt",prob:9,color:"#8b5cf6"}]},
  // ── POLÍTICA ─ dados verificados de pesquisas 2026 registradas no TSE ────

  // PRESIDENTE — Datafolha abr/2026 (BR-03770/2026) + Meio/Ideia abr/2026 (BR-00605/2026)
  { id:6, category:"POLÍTICA", tag:"PRESIDENTE 2026", title:"Presidente do Brasil — 1º Turno", status:"UPCOMING", round:"Out/2026", volume:"R$ 45,2M", marketsCount:18,
    news:"Datafolha abr/2026 (BR-03770/2026): Lula 35% e Flávio Bolsonaro 33%, empatados na margem de erro. Caiado 6%, Renan Santos cresce entre o eleitorado evangélico.",
    options:[
      {name:"Lula (PT)",            flag:"🔴", score:"35%", prob:35, color:"#ef4444"},
      {name:"Flávio Bolsonaro (PL)", flag:"🔵", score:"33%", prob:33, color:"#3b82f6"},
      {name:"Ronaldo Caiado (PSD)",  flag:"🟡", score:"6%",  prob:6,  color:"#f59e0b"},
      {name:"Renan dos Santos",      flag:"🟠", score:"4%",  prob:4,  color:"#f97316"},
      {name:"Outro",                 flag:"⚪", score:"3%",  prob:3,  color:"#9ca3af"},
    ]},

  // SP — AtlasIntel mar/2026 (SP-00899/2026) + Datafolha mar/2026 (SP-04136/2026) + RTBD mar/2026 (SP-00705/2026)
  { id:7, category:"POLÍTICA", tag:"GOV · SP", title:"Governador de São Paulo 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 8,4M", marketsCount:8,
    news:"AtlasIntel+Datafolha+RTBD mar/2026: Tarcísio lidera todos os cenários. Alckmin 21%, Erika Hilton 8%. Rejeição de Haddad é a maior no estado.",
    options:[{name:"Tarcísio de Freitas (REP)",flag:"🟠",score:"43%",prob:43,color:"#f97316"},{name:"Geraldo Alckmin (PSB)",flag:"🔴",score:"21%",prob:21,color:"#ef4444"},{name:"Erika Hilton (PSOL)",flag:"🟣",score:"8%",prob:8,color:"#8b5cf6"},{name:"Fernando Haddad (PT)",flag:"🔴",score:"6%",prob:6,color:"#dc2626"},{name:"L. F. d\'Ávila (NOVO)",flag:"🟢",score:"3%",prob:3,color:"#00c896"}]},

  // MG — AtlasIntel abr/2026 (MG-01664/2026) + Paraná Pesquisas mar/2026 (MG-03797/2026) + Futura mar/2026 (MG-07865/2026)
  { id:8, category:"POLÍTICA", tag:"GOV · MG", title:"Governador de Minas Gerais 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 5,1M", marketsCount:7,
    news:"AtlasIntel abr/2026 (MG-01664/2026) + Paraná Pesquisas mar/2026: Cleitinho 40,6% lidera com +20pts. Kalil 13,5%, Pacheco 13%, Marília Campos 10,6%.",
    options:[{name:"Cleitinho (REP)",flag:"🔵",score:"40%",prob:40,color:"#3b82f6"},{name:"Alexandre Kalil (PDT)",flag:"🔴",score:"14%",prob:14,color:"#ef4444"},{name:"Rodrigo Pacheco (PSB)",flag:"🟡",score:"13%",prob:13,color:"#f59e0b"},{name:"Marília Campos (PT)",flag:"🟢",score:"11%",prob:11,color:"#00c896"},{name:"Mateus Simões (NOVO)",flag:"⚪",score:"6%",prob:6,color:"#9ca3af"}]},

  // RJ — Paraná Pesquisas set/2025 + Quaest ago/2025
  { id:9, category:"POLÍTICA", tag:"GOV · RJ", title:"Governador do Rio de Janeiro 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 4,2M", marketsCount:6,
    news:"Paraná Pesquisas set/2025: Eduardo Paes 54,8%, Washington Reis 10,6%, Bacellar 7,8%. Quaest ago/2025 confirma Paes como favorito destacado.",
    options:[{name:"Eduardo Paes (PSD)",flag:"🔵",score:"54%",prob:54,color:"#3b82f6"},{name:"Washington Reis (MDB)",flag:"🟡",score:"10%",prob:10,color:"#f59e0b"},{name:"Rodrigo Bacellar (UB)",flag:"🟠",score:"8%",prob:8,color:"#f97316"},{name:"Cláudio Castro (PL)",flag:"🔴",score:"7%",prob:7,color:"#ef4444"},{name:"Marcelo Freixo (PSB)",flag:"🟣",score:"5%",prob:5,color:"#8b5cf6"}]},

  // BA — Quaest ago/2025 + RTBD set/2025
  { id:10, category:"POLÍTICA", tag:"GOV · BA", title:"Governador da Bahia 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 3,8M", marketsCount:6,
    news:"Quaest ago/2025: ACM Neto (UB) 41%, Jerônimo Rodrigues (PT) 34%. Disputa mais estratégica de 2026. PT em situação delicada no estado.",
    options:[{name:"ACM Neto (UB)",flag:"🔵",score:"41%",prob:41,color:"#3b82f6"},{name:"Jerônimo Rodrigues (PT)",flag:"🔴",score:"34%",prob:34,color:"#ef4444"},{name:"Elmar Nascimento (UB)",flag:"🟡",score:"8%",prob:8,color:"#f59e0b"},{name:"Otto Alencar (PSD)",flag:"🟢",score:"5%",prob:5,color:"#00c896"},{name:"Outro",flag:"⚪",score:"3%",prob:3,color:"#9ca3af"}]},

  // RS — Futura Inteligência abr/2026 (RS-05216/2026)
  { id:11, category:"POLÍTICA", tag:"GOV · RS", title:"Governador do Rio Grande do Sul 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 2,9M", marketsCount:5,
    news:"Futura Inteligência abr/2026 (RS-05216/2026): Brizola (PDT) lidera um cenário, empate técnico com Zucco (PL) em outro. No 2º turno Brizola venceria Zucco.",
    options:[{name:"Juliana Brizola (PDT)",flag:"🟢",score:"21%",prob:21,color:"#00c896"},{name:"Coronel Zucco (PL)",flag:"🔵",score:"20%",prob:20,color:"#3b82f6"},{name:"Edegar Pretto (PT)",flag:"🔴",score:"14%",prob:14,color:"#ef4444"},{name:"Eduardo Leite (PSD)",flag:"🟡",score:"12%",prob:12,color:"#f59e0b"},{name:"Outro",flag:"⚪",score:"8%",prob:8,color:"#9ca3af"}]},

  // PE — RTBD set/2025 + Simplex abr/2026 (PE-04864/2026)
  { id:12, category:"POLÍTICA", tag:"GOV · PE", title:"Governador de Pernambuco 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 2,6M", marketsCount:5,
    news:"RTBD set/2025: João Campos (PSB) 59%, pode ganhar no 1º turno. Raquel Lyra (PSD) 24%. No 2º turno Campos chegaria a 63%.",
    options:[{name:"João Campos (PSB)",flag:"🟠",score:"59%",prob:59,color:"#f97316"},{name:"Raquel Lyra (PSD)",flag:"🔵",score:"24%",prob:24,color:"#3b82f6"},{name:"Mendonça Filho (UB)",flag:"🟡",score:"5%",prob:5,color:"#f59e0b"},{name:"André Ferreira (PL)",flag:"🔴",score:"4%",prob:4,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"3%",prob:3,color:"#9ca3af"}]},

  // PR — Quaest ago/2025: Ratinho Jr. candidato à reeleição
  { id:13, category:"POLÍTICA", tag:"GOV · PR", title:"Governador do Paraná 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 2,4M", marketsCount:5,
    news:"Quaest ago/2025: Ratinho Jr. (PSD) 73% de intenção no PR, favorito à reeleição. Sérgio Moro (UB) 38% lidera cenários sem Ratinho. Sem Moro, Requião Filho aparece.",
    options:[{name:"Ratinho Jr. (PSD)",flag:"🔵",score:"73%",prob:60,color:"#3b82f6"},{name:"Sérgio Moro (UB)",flag:"🟡",score:"38%*",prob:20,color:"#f59e0b"},{name:"Requião Filho (MDB)",flag:"🟢",score:"7%",prob:7,color:"#00c896"},{name:"Cand. PT",flag:"🔴",score:"6%",prob:6,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5%",prob:5,color:"#9ca3af"}]},

  // CE — Datafolha mar/2026 (CE-07925/2026) + Paraná Pesquisas abr/2026 (CE-00151/2026)
  { id:14, category:"POLÍTICA", tag:"GOV · CE", title:"Governador do Ceará 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,9M", marketsCount:4,
    news:"Datafolha mar/2026 (CE-07925/2026): Ciro Gomes (PSDB) lidera com +15pts. Paraná Pesquisas abr/2026: Ciro 44,5%, Elmano 34%. Ciro venceria no 2º turno.",
    options:[{name:"Ciro Gomes (PSDB)",flag:"🟡",score:"44%",prob:44,color:"#f59e0b"},{name:"Elmano de Freitas (PT)",flag:"🔴",score:"34%",prob:34,color:"#ef4444"},{name:"Roberto Cláudio (UB)",flag:"🔵",score:"8%",prob:8,color:"#3b82f6"},{name:"Eduardo Girão (NOVO)",flag:"🟢",score:"5%",prob:5,color:"#00c896"},{name:"Capitão Wagner (UB)",flag:"🟠",score:"4%",prob:4,color:"#f97316"}]},

  // GO — Paraná Pesquisas abr/2026 (GO-09885/2026)
  { id:15, category:"POLÍTICA", tag:"GOV · GO", title:"Governador de Goiás 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,7M", marketsCount:4,
    news:"Paraná Pesquisas abr/2026 (GO-09885/2026): Daniel Vilela (MDB) lidera os 3 cenários com pelo menos 18pts de vantagem. Em um chegou a abrir 38pts.",
    options:[{name:"Daniel Vilela (MDB)",flag:"🟡",score:"1º +18pts",prob:48,color:"#f59e0b"},{name:"Wilder Morais (PL)",flag:"🔴",score:"2º",prob:18,color:"#ef4444"},{name:"Gracinha Caiado (UB)",flag:"🟠",score:"3º",prob:12,color:"#f97316"},{name:"Cand. PT",flag:"🟢",score:"4º",prob:8,color:"#00c896"},{name:"Outro",flag:"⚪",score:"5º",prob:6,color:"#9ca3af"}]},

  // PB — RTBD set/2025
  { id:16, category:"POLÍTICA", tag:"GOV · PB", title:"Governador da Paraíba 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,4M", marketsCount:4,
    news:"RTBD set/2025: Cícero Lucena (sem partido) 34%. Lucas Ribeiro (PP) 17% e Efraim Filho (UB) 15% empatados tecnicamente no 2º lugar.",
    options:[{name:"Cícero Lucena (sem)",flag:"🔵",score:"34%",prob:34,color:"#3b82f6"},{name:"Lucas Ribeiro (PP)",flag:"🟡",score:"17%",prob:17,color:"#f59e0b"},{name:"Efraim Filho (UB)",flag:"🟠",score:"15%",prob:15,color:"#f97316"},{name:"Veneziano Vital (MDB)",flag:"🟢",score:"8%",prob:8,color:"#00c896"},{name:"Outro",flag:"⚪",score:"5%",prob:5,color:"#9ca3af"}]},

  // ES — RTBD out/2025
  { id:17, category:"POLÍTICA", tag:"GOV · ES", title:"Governador do Espírito Santo 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,2M", marketsCount:3,
    news:"RTBD out/2025: Lorenzo Pazolini (REP) 27% e Ricardo Ferraço (MDB) 26%, empate técnico. Sem Pazolini, Paulo Hartung (PSD) lidera com 33%.",
    options:[{name:"Lorenzo Pazolini (REP)",flag:"🟠",score:"27%",prob:27,color:"#f97316"},{name:"Ricardo Ferraço (MDB)",flag:"🔵",score:"26%",prob:26,color:"#3b82f6"},{name:"Paulo Hartung (PSD)",flag:"🟡",score:"18%",prob:18,color:"#f59e0b"},{name:"R. Casagrande (PSB)",flag:"🔴",score:"10%",prob:10,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5%",prob:5,color:"#9ca3af"}]},

  // AM — Congresso em Foco mar/2026
  { id:18, category:"POLÍTICA", tag:"GOV · AM", title:"Governador do Amazonas 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,1M", marketsCount:3,
    news:"Congresso em Foco mar/2026: Wilson Lima (UB) lidera como favorito à reeleição no AM. Campo à esquerda sem nome consolidado para a disputa.",
    options:[{name:"Wilson Lima (UB)",flag:"🟠",score:"líder",prob:45,color:"#f97316"},{name:"Eduardo Braga (MDB)",flag:"🟡",score:"2º",prob:22,color:"#f59e0b"},{name:"Cand. PL",flag:"🔵",score:"3º",prob:14,color:"#3b82f6"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:10,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:6,color:"#9ca3af"}]},

  // PA — Congresso em Foco mar/2026
  { id:19, category:"POLÍTICA", tag:"GOV · PA", title:"Governador do Pará 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,0M", marketsCount:3,
    news:"Congresso em Foco mar/2026: Helder Barbalho (MDB) lidera com folga. Estado sedia COP 30 em Belém em nov/2025, o que fortalece a imagem do governador.",
    options:[{name:"Helder Barbalho (MDB)",flag:"🟢",score:"líder",prob:52,color:"#00c896"},{name:"Cand. PL/REP",flag:"🔵",score:"2º",prob:20,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"3º",prob:12,color:"#f97316"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:8,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:5,color:"#9ca3af"}]},

  // MA — Congresso em Foco mar/2026: Brandão não concorrerá
  { id:20, category:"POLÍTICA", tag:"GOV · MA", title:"Governador do Maranhão 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,9M", marketsCount:3,
    news:"Congresso em Foco mar/2026: Eduardo Braide (PSD) lidera mas campo aberto. Carlos Brandão indicou que não concorrerá para não ceder o cargo ao vice com quem rompeu.",
    options:[{name:"Eduardo Braide (PSD)",flag:"🟡",score:"líder",prob:36,color:"#f59e0b"},{name:"Cand. PT/aliados",flag:"🔴",score:"2º",prob:24,color:"#ef4444"},{name:"Cand. PL",flag:"🔵",score:"3º",prob:16,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"4º",prob:10,color:"#f97316"},{name:"Outro",flag:"⚪",score:"5º",prob:8,color:"#9ca3af"}]},

  // PI — RTBD set/2025: Fonteles favorito à reeleição em 1º turno
  { id:21, category:"POLÍTICA", tag:"GOV · PI", title:"Governador do Piauí 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,8M", marketsCount:3,
    news:"RTBD set/2025: Rafael Fonteles (PT) 63% vs Ciro Nogueira (PP) 28%. Favorito à reeleição em 1º turno. PT mais forte do Nordeste no estado.",
    options:[{name:"Rafael Fonteles (PT)",flag:"🔴",score:"63%",prob:63,color:"#ef4444"},{name:"Ciro Nogueira (PP)",flag:"🔵",score:"28%",prob:28,color:"#3b82f6"},{name:"Cand. PL",flag:"🟡",score:"4%",prob:4,color:"#f59e0b"},{name:"Cand. UB",flag:"🟠",score:"3%",prob:3,color:"#f97316"},{name:"Outro",flag:"⚪",score:"2%",prob:2,color:"#9ca3af"}]},

  // RN — Fátima Bezerra não pode se reeleger; campo aberto
  { id:22, category:"POLÍTICA", tag:"GOV · RN", title:"Governador do Rio Grande do Norte 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,7M", marketsCount:3,
    news:"Congresso em Foco mar/2026: Fátima Bezerra (PT) não pode se reeleger. Campo aberto e fragmentado. Candidatos ainda em fase de definição.",
    options:[{name:"Cand. PT/aliados",flag:"🔴",score:"30%",prob:30,color:"#ef4444"},{name:"Cand. PL",flag:"🔵",score:"24%",prob:24,color:"#3b82f6"},{name:"Cand. MDB",flag:"🟡",score:"18%",prob:18,color:"#f59e0b"},{name:"Cand. UB",flag:"🟠",score:"12%",prob:12,color:"#f97316"},{name:"Outro",flag:"⚪",score:"8%",prob:8,color:"#9ca3af"}]},

  // AL — Paraná Pesquisas dez/2025 + Veritá abr/2026
  { id:23, category:"POLÍTICA", tag:"GOV · AL", title:"Governador de Alagoas 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,6M", marketsCount:3,
    news:"Paraná Pesquisas dez/2025 + Veritá abr/2026: JHC (PL) lidera com ~7pts sobre Renan Filho (MDB). Sem JHC, Alfredo Gaspar (UB) assumiria a frente.",
    options:[{name:"JHC — João H. Caldas (PL)",flag:"🔵",score:"47%",prob:47,color:"#3b82f6"},{name:"Renan Filho (MDB)",flag:"🟡",score:"41%",prob:41,color:"#f59e0b"},{name:"Alfredo Gaspar (UB)*",flag:"🟠",score:"5%",prob:5,color:"#f97316"},{name:"Cand. PT",flag:"🔴",score:"3%",prob:3,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"2%",prob:2,color:"#9ca3af"}]},

  // SE — Instituto França abr/2026 (SE-07227/2026)
  { id:24, category:"POLÍTICA", tag:"GOV · SE", title:"Governador de Sergipe 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,5M", marketsCount:3,
    news:"Instituto França abr/2026 (SE-07227/2026) registrado no TSE. Fábio Mitidieri (PSD) busca reeleição com campo conservador organizado.",
    options:[{name:"Fábio Mitidieri (PSD)",flag:"🟡",score:"líder",prob:44,color:"#f59e0b"},{name:"Cand. PT",flag:"🔴",score:"2º",prob:22,color:"#ef4444"},{name:"Cand. PL",flag:"🔵",score:"3º",prob:14,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"4º",prob:10,color:"#f97316"},{name:"Outro",flag:"⚪",score:"5º",prob:5,color:"#9ca3af"}]},

  // MT — Congresso em Foco mar/2026: Wellington Fagundes lidera; Mauro Mendes não pode se reeleger
  { id:25, category:"POLÍTICA", tag:"GOV · MT", title:"Governador do Mato Grosso 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,5M", marketsCount:3,
    news:"Congresso em Foco mar/2026: Wellington Fagundes (PL) inicia 2026 na liderança. Mauro Mendes (UB) não pode se reeleger e não concorrerá a nenhum cargo.",
    options:[{name:"Wellington Fagundes (PL)",flag:"🔵",score:"líder",prob:40,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"2º",prob:22,color:"#f97316"},{name:"Cand. PSD",flag:"🟡",score:"3º",prob:14,color:"#f59e0b"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:10,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:8,color:"#9ca3af"}]},

  // MS — RTBD set/2025: Eduardo Riedel favorito
  { id:26, category:"POLÍTICA", tag:"GOV · MS", title:"Governador do Mato Grosso do Sul 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,5M", marketsCount:3,
    news:"RTBD set/2025: Eduardo Riedel (PP) 51% lidera com ampla vantagem. Capitão Contar (PRTB) 19%, Fábio Trad (PT) 10%. Riedel favorito à reeleição.",
    options:[{name:"Eduardo Riedel (PP)",flag:"🔵",score:"51%",prob:51,color:"#3b82f6"},{name:"Capitão Contar (PRTB)",flag:"🟡",score:"19%",prob:19,color:"#f59e0b"},{name:"Fábio Trad (PT)",flag:"🔴",score:"10%",prob:10,color:"#ef4444"},{name:"Outro",flag:"🟢",score:"8%",prob:8,color:"#00c896"},{name:"Indecisos",flag:"⚪",score:"7%",prob:7,color:"#9ca3af"}]},

  // TO — Congresso em Foco mar/2026: Wanderlei não concorrerá
  { id:27, category:"POLÍTICA", tag:"GOV · TO", title:"Governador do Tocantins 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,4M", marketsCount:2,
    news:"Congresso em Foco mar/2026: Wanderlei Barbosa (REP) indicou que não concorrerá para não ceder o cargo ao vice. Campo conservador lidera na corrida aberta.",
    options:[{name:"Cand. REP/aliados",flag:"🟠",score:"líder",prob:35,color:"#f97316"},{name:"Cand. PL",flag:"🔵",score:"2º",prob:24,color:"#3b82f6"},{name:"Cand. MDB",flag:"🟡",score:"3º",prob:18,color:"#f59e0b"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:12,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:8,color:"#9ca3af"}]},

  // RO — Congresso em Foco mar/2026: Marcos Rocha não concorrerá
  { id:28, category:"POLÍTICA", tag:"GOV · RO", title:"Governador de Rondônia 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,4M", marketsCount:2,
    news:"Congresso em Foco mar/2026: Marcos Rocha (PSD) indicou que não concorrerá para não ceder o cargo ao vice com quem rompeu. Campo conservador lidera.",
    options:[{name:"Cand. PSD/aliados",flag:"🟡",score:"líder",prob:38,color:"#f59e0b"},{name:"Cand. PL",flag:"🔵",score:"2º",prob:28,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"3º",prob:14,color:"#f97316"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:10,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:6,color:"#9ca3af"}]},

  // AC — Congresso em Foco mar/2026: Cameli não pode se reeleger
  { id:29, category:"POLÍTICA", tag:"GOV · AC", title:"Governador do Acre 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,3M", marketsCount:2,
    news:"Congresso em Foco mar/2026: Gladson Cameli (PP) não pode se reeleger. Campo aberto entre PP/UB e PT/MDB. Estado historicamente no campo conservador.",
    options:[{name:"Cand. PP/UB",flag:"🟠",score:"líder",prob:36,color:"#f97316"},{name:"Cand. PT/MDB",flag:"🔴",score:"2º",prob:30,color:"#ef4444"},{name:"Cand. PL",flag:"🔵",score:"3º",prob:16,color:"#3b82f6"},{name:"Cand. PSDB",flag:"🟡",score:"4º",prob:10,color:"#f59e0b"},{name:"Outro",flag:"⚪",score:"5º",prob:6,color:"#9ca3af"}]},

  // RR — Congresso em Foco mar/2026
  { id:30, category:"POLÍTICA", tag:"GOV · RR", title:"Governador de Roraima 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,3M", marketsCount:2,
    news:"Congresso em Foco mar/2026: Arthur Henrique (MDB) lidera com aprovação moderada. Campo conservador (PL/UB) organizado em segundo lugar.",
    options:[{name:"Arthur Henrique (MDB)",flag:"🟡",score:"líder",prob:36,color:"#f59e0b"},{name:"Cand. PL",flag:"🔵",score:"2º",prob:26,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"3º",prob:16,color:"#f97316"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:12,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:8,color:"#9ca3af"}]},

  // AP — Congresso em Foco mar/2026
  { id:31, category:"POLÍTICA", tag:"GOV · AP", title:"Governador do Amapá 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 0,3M", marketsCount:2,
    news:"Congresso em Foco mar/2026: Clécio Luís (SD) busca reeleição. Estado com eleitorado volátil. Campo conservador organiza candidatura.",
    options:[{name:"Clécio Luís (SD)",flag:"🟢",score:"líder",prob:38,color:"#00c896"},{name:"Cand. PL",flag:"🔵",score:"2º",prob:24,color:"#3b82f6"},{name:"Cand. UB",flag:"🟠",score:"3º",prob:16,color:"#f97316"},{name:"Cand. PT",flag:"🔴",score:"4º",prob:12,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"5º",prob:8,color:"#9ca3af"}]},

  // SC — Sem pesquisa 2026 publicada ainda
  { id:32, category:"POLÍTICA", tag:"GOV · SC", title:"Governador de Santa Catarina 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,6M", marketsCount:4,
    news:"Congresso em Foco mar/2026: Jorginho Mello (PL) busca reeleição no estado mais conservador do Brasil. Sem pesquisa 2026 publicada até abr/2026.",
    options:[{name:"Jorginho Mello (PL)",flag:"🔵",score:"líder",prob:50,color:"#3b82f6"},{name:"Cand. MDB/PSDB",flag:"🟡",score:"2º",prob:20,color:"#f59e0b"},{name:"Cand. PT",flag:"🔴",score:"3º",prob:14,color:"#ef4444"},{name:"Cand. UB",flag:"🟠",score:"4º",prob:8,color:"#f97316"},{name:"Outro",flag:"⚪",score:"5º",prob:5,color:"#9ca3af"}]},

  // DF — RTBD dez/2025 + Cepphor abr/2026 (DF-08024/2026)
  { id:33, category:"POLÍTICA", tag:"GOV · DF", title:"Governador do Distrito Federal 2026", status:"UPCOMING", round:"Out/2026", volume:"R$ 1,3M", marketsCount:4,
    news:"RTBD dez/2025: Celina Leão (PP) 37,2% lidera a sucessão. Ibaneis Rocha (MDB) não pode se reeleger. Pesquisa Cepphor registrada no TSE em abr/2026 (DF-08024/2026).",
    options:[{name:"Celina Leão (PP)",flag:"🟠",score:"37%",prob:37,color:"#f97316"},{name:"Leandro Grass (PV)",flag:"🟢",score:"15%",prob:15,color:"#00c896"},{name:"Cand. PL",flag:"🔵",score:"14%",prob:14,color:"#3b82f6"},{name:"Cand. PT",flag:"🔴",score:"12%",prob:12,color:"#ef4444"},{name:"Outro",flag:"⚪",score:"8%",prob:8,color:"#9ca3af"}]},];

const categoryIcons = { FUTEBOL:"⚽", NBA:"🏀", GOLF:"⛳", "POLÍTICA":"🗳️", CRIPTO:"₿" };
const tabs = ["Em Alta","Futebol BR","Champions","NBA","Política","Cripto"];

const filterMarkets = (tab) => {
  if (tab === "Em Alta")    return markets.slice(0,6);
  if (tab === "Futebol BR") return markets.filter(m=>["BRASILEIRÃO A","BRASILEIRÃO B"].includes(m.tag));
  if (tab === "Champions")  return markets.filter(m=>m.tag==="CHAMPIONS LEAGUE");
  if (tab === "NBA")        return markets.filter(m=>m.category==="NBA");
  if (tab === "Política")   return markets.filter(m=>m.category==="POLÍTICA");
  return [];
};

// ── Auth helpers ──────────────────────────────────────────────
const STORAGE_KEY_USERS    = "fp_users";
const STORAGE_KEY_REMEMBER = "fp_remember";
const STORAGE_KEY_PONTOS   = "fp_pontos";

// ── Sistema de Pontos / Níveis ────────────────────────────────
const NIVEIS = [
  { nome:"Iniciante",  min:0,    max:99,   cor:"#9ca3af", badge:"🥉", taxa:0.050 },
  { nome:"Apostador",  min:100,  max:499,  cor:"#f59e0b", badge:"🥈", taxa:0.048 },
  { nome:"Expert",     min:500,  max:1499, cor:"#3b82f6", badge:"🥇", taxa:0.046 },
  { nome:"Pro",        min:1500, max:4999, cor:"#8b5cf6", badge:"💎", taxa:0.044 },
  { nome:"Elite",      min:5000, max:Infinity, cor:"#00c896", badge:"👑", taxa:0.040 },
];
const getNivel = (xp) => NIVEIS.find(n => xp >= n.min && xp <= n.max) || NIVEIS[0];
const getNextNivel = (xp) => { const i = NIVEIS.findIndex(n => xp >= n.min && xp <= n.max); return NIVEIS[i+1] || null; };
const getPontos = (email) => { try { const d = JSON.parse(localStorage.getItem(STORAGE_KEY_PONTOS)||"{}"); return d[email]||0; } catch { return 0; } };
const addPontos = (email, pts) => { try { const d = JSON.parse(localStorage.getItem(STORAGE_KEY_PONTOS)||"{}"); d[email]=(d[email]||0)+pts; localStorage.setItem(STORAGE_KEY_PONTOS,JSON.stringify(d)); return d[email]; } catch { return 0; } };

const SEED_ADMIN = { email:"sellysmar@gmail.com", senha:"sellysmar@gmail.com", nome:"Sellysmar", cpf:"" };

const getUsers = () => {
  try {
    let stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || "[]");
    // Sempre garante que o admin existe com a senha correta
    const adminIdx = stored.findIndex(u => u.email.toLowerCase() === SEED_ADMIN.email);
    if (adminIdx >= 0) {
      // Atualiza a senha do admin para a correta (corrige versões antigas)
      stored[adminIdx] = { ...stored[adminIdx], senha: SEED_ADMIN.senha, email: SEED_ADMIN.email };
    } else {
      stored = [...stored, SEED_ADMIN];
    }
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(stored));
    return stored;
  } catch { return [SEED_ADMIN]; }
};
const saveUsers = (users) => {
  try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users)); } catch {}
};
const getRemembered = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_REMEMBER) || "null"); } catch { return null; }
};
const saveRemembered = (data) => {
  try { localStorage.setItem(STORAGE_KEY_REMEMBER, JSON.stringify(data)); } catch {}
};
const clearRemembered = () => {
  try { localStorage.removeItem(STORAGE_KEY_REMEMBER); } catch {}
};

// ── Tela Pública (Product-Led Growth) ────────────────────────
function PreviewScreen({ onLogin }) {
  const destaquesPublicos = markets.slice(0, 6);
  const C2 = { bg:"#0f1117", card:"#161922", green:"#00c896", blue:"#3b82f6", text:"#f9fafb", muted:"#6b7280", border:"rgba(255,255,255,0.07)" };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:C2.bg, minHeight:"100vh", maxWidth:480, margin:"0 auto", color:C2.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}.pv-btn{transition:all .15s}.pv-btn:active{transform:scale(.97)}.pb2{transition:width .6s ease}`}</style>

      {/* Header público */}
      <div style={{ background:"#161922", padding:"16px 20px", borderBottom:`1px solid ${C2.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg,${C2.blue},#1d4ed8)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>📈</div>
          <span style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:20, color:C2.green }}>Faver<span style={{ color:C2.blue }}>Pix</span></span>
        </div>
        <button onClick={onLogin} className="pv-btn" style={{ background:`linear-gradient(135deg,${C2.green},#00a07a)`, border:"none", color:"#fff", borderRadius:20, padding:"8px 18px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'" }}>
          Entrar / Cadastrar
        </button>
      </div>

      <div style={{ padding:"20px 16px 120px" }}>
        {/* Hero */}
        <div style={{ textAlign:"center", padding:"32px 0 28px" }}>
          <div style={{ fontSize:56, marginBottom:12 }}>🎯</div>
          <h1 style={{ fontFamily:"'Space Grotesk'", fontSize:28, fontWeight:700, color:C2.text, marginBottom:10, lineHeight:1.3 }}>
            Preveja o futuro.<br/><span style={{ color:C2.green }}>Ganhe dinheiro.</span>
          </h1>
          <p style={{ fontSize:14, color:C2.muted, lineHeight:1.7, marginBottom:24 }}>
            Aposte em política, futebol e cripto com as probabilidades do mercado. Sem casa contra você — você compete com outros apostadores.
          </p>
          <button onClick={onLogin} className="pv-btn" style={{ background:`linear-gradient(135deg,${C2.green},#00a07a)`, border:"none", color:"#fff", borderRadius:14, padding:"16px 36px", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'", boxShadow:"0 4px 20px rgba(0,200,150,.35)", marginBottom:12 }}>
            Criar conta grátis + R$ 10 bônus 🎁
          </button>
          <p style={{ fontSize:11, color:"#4b5563" }}>Sem taxa de cadastro · Saque via Pix a qualquer hora</p>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:24 }}>
          {[
            { n:"R$ 45M", label:"Volume" },
            { n:"12.800", label:"Apostadores" },
            { n:"320+", label:"Mercados" },
          ].map(item=>(
            <div key={item.label} style={{ background:C2.card, borderRadius:14, padding:"14px 10px", textAlign:"center", border:`1px solid ${C2.border}` }}>
              <p style={{ fontFamily:"'Space Grotesk'", fontSize:17, fontWeight:700, color:C2.green, marginBottom:3 }}>{item.n}</p>
              <p style={{ fontSize:11, color:C2.muted }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Banner bônus */}
        <div style={{ background:"linear-gradient(135deg,rgba(0,200,150,.15),rgba(59,130,246,.1))", border:"1px solid rgba(0,200,150,.3)", borderRadius:16, padding:"16px 20px", marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:13, color:"#9ca3af", marginBottom:3 }}>🎁 Bônus de boas-vindas</p>
            <p style={{ fontFamily:"'Space Grotesk'", fontSize:28, fontWeight:700, color:C2.green }}>R$ 10,00</p>
            <p style={{ fontSize:11, color:"#6b7280" }}>na sua primeira aposta</p>
          </div>
          <button onClick={onLogin} className="pv-btn" style={{ background:`linear-gradient(135deg,${C2.green},#00a07a)`, border:"none", color:"#fff", borderRadius:12, padding:"12px 18px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
            Resgatar →
          </button>
        </div>

        {/* Mercados públicos — SEM apostas, só visualização */}
        <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.6, marginBottom:12 }}>🔥 MERCADOS EM DESTAQUE</p>
        {destaquesPublicos.map((market)=>(
          <div key={market.id} style={{ background:C2.card, borderRadius:16, padding:"14px 16px", marginBottom:12, border:`1px solid ${C2.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:10, color:C2.muted, fontWeight:700, letterSpacing:.6 }}>{market.tag}</span>
              <span style={{ fontSize:10, color: market.status==="LIVE"?"#ef4444":C2.muted, fontWeight:700 }}>{market.status==="LIVE"?"🔴 AO VIVO":"⏳ EM BREVE"}</span>
            </div>
            <p style={{ fontSize:14, fontWeight:700, color:C2.text, marginBottom:10 }}>{market.title}</p>
            {market.options.slice(0,3).map((opt,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", marginBottom:6 }}>
                <span style={{ fontSize:16, marginRight:8 }}>{opt.flag}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:12, color:"#e5e7eb" }}>{opt.name}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:opt.color }}>{opt.prob}%</span>
                  </div>
                  <div style={{ height:3, background:"rgba(255,255,255,.07)", borderRadius:2 }}>
                    <div style={{ height:"100%", width:`${opt.prob}%`, background:opt.color, borderRadius:2 }}/>
                  </div>
                </div>
              </div>
            ))}
            {/* CTA bloqueado */}
            <button onClick={onLogin} className="pv-btn" style={{ width:"100%", background:"rgba(0,200,150,.08)", border:"1px solid rgba(0,200,150,.2)", color:C2.green, borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, cursor:"pointer", marginTop:10 }}>
              🔒 Faça login para apostar
            </button>
          </div>
        ))}

        {/* Como funciona */}
        <div style={{ background:C2.card, borderRadius:16, padding:"18px 16px", marginBottom:20, border:`1px solid ${C2.border}` }}>
          <p style={{ fontSize:13, fontWeight:700, color:C2.text, marginBottom:14 }}>Como funciona?</p>
          {[
            { n:"1", icon:"🎯", title:"Escolha um evento", desc:"Política, futebol, cripto ou cultura." },
            { n:"2", icon:"💰", title:"Aposte SIM ou NÃO", desc:"Você compra contratos a preço de mercado." },
            { n:"3", icon:"🏆", title:"Ganhe se acertar", desc:"Cada contrato vale R$1 se você ganhar." },
          ].map(step=>(
            <div key={step.n} style={{ display:"flex", gap:12, marginBottom:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C2.green},${C2.blue})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#fff", fontSize:14, flexShrink:0 }}>{step.n}</div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:C2.text, marginBottom:2 }}>{step.icon} {step.title}</p>
                <p style={{ fontSize:12, color:C2.muted }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA fixo no bottom */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"rgba(15,17,23,.95)", backdropFilter:"blur(12px)", padding:"16px 20px 28px", borderTop:`1px solid ${C2.border}` }}>
        <button onClick={onLogin} className="pv-btn" style={{ width:"100%", background:`linear-gradient(135deg,${C2.green},#00a07a)`, border:"none", color:"#fff", borderRadius:14, padding:"16px", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'", boxShadow:"0 4px 20px rgba(0,200,150,.3)" }}>
          Criar conta grátis — Ganhar R$ 10 🎁
        </button>
        <p style={{ textAlign:"center", fontSize:11, color:"#4b5563", marginTop:8 }}>Já tem conta? <span onClick={onLogin} style={{ color:C2.green, cursor:"pointer", fontWeight:600 }}>Fazer login</span></p>
      </div>
    </div>
  );
}

// ── Auth Screen ───────────────────────────────────────────────
function AuthScreen({ onLogin, onPreview }) {
  const remembered = getRemembered();

  const [mode,       setMode]       = useState("login");
  const [email,      setEmail]      = useState(remembered?.email || "");
  const [senha,      setSenha]      = useState("");
  const [nome,       setNome]       = useState("");
  const [cpf,        setCpf]        = useState("");
  const [lembrar,    setLembrar]    = useState(!!remembered);
  const [showSenha,  setShowSenha]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [erro,       setErro]       = useState("");
  const [sucesso,    setSucesso]    = useState("");

  const formatCPF = (v) => {
    const d = v.replace(/\D/g,"").slice(0,11);
    if (d.length<=3) return d;
    if (d.length<=6) return `${d.slice(0,3)}.${d.slice(3)}`;
    if (d.length<=9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
    return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
  };

  const switchMode = (m) => { setMode(m); setErro(""); setSucesso(""); setSenha(""); };

  const handleSubmit = () => {
    setErro(""); setSucesso("");
    if (!email.trim()) { setErro("Por favor, informe seu e-mail."); return; }
    if (!senha)        { setErro("Por favor, informe sua senha."); return; }

    if (mode === "signup") {
      if (!nome.trim())     { setErro("Por favor, informe seu nome completo."); return; }
      if (senha.length < 8) { setErro("A senha deve ter no mínimo 8 caracteres."); return; }
      const users = getUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        setErro("Este e-mail já está cadastrado. Faça login."); return;
      }
      setLoading(true);
      setTimeout(() => {
        const newUser = { email: email.toLowerCase(), senha, nome, cpf, bonus10: true, bonusUsado: false };
        saveUsers([...users, newUser]);
        if (lembrar) saveRemembered({ email: email.toLowerCase() });
        else clearRemembered();
        setLoading(false);
        setSucesso("Conta criada com sucesso! 🎉");
        setTimeout(() => onLogin(nome, email, true), 800);
      }, 1000);

    } else {
      // Admin bypass — sempre funciona independente do localStorage
      if (email.toLowerCase().trim() === "sellysmar@gmail.com" && senha === "sellysmar@gmail.com") {
        setLoading(true);
        setTimeout(() => {
          if (lembrar) saveRemembered({ email: "sellysmar@gmail.com" });
          setLoading(false);
          onLogin("Sellysmar", "sellysmar@gmail.com", false);
        }, 700);
        return;
      }
      const users = getUsers();
      const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (!user) {
        setErro("E-mail não encontrado. Crie uma conta primeiro."); return;
      }
      if (user.senha !== senha) {
        setErro("Senha incorreta. Tente novamente."); return;
      }
      setLoading(true);
      setTimeout(() => {
        if (lembrar) saveRemembered({ email: email.toLowerCase() });
        else clearRemembered();
        setLoading(false);
        onLogin(user.nome, user.email, false);
      }, 900);
    }
  };

  const inp = {
    width:"100%", background:"rgba(255,255,255,0.05)",
    border:"1px solid rgba(255,255,255,0.1)", borderRadius:12,
    padding:"14px 16px", color:"#f9fafb", fontSize:15,
    fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box",
  };

  const hasRemembered = remembered && mode === "login";

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#0a0d14", minHeight:"100vh", maxWidth:480, margin:"0 auto", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .ai:focus{outline:none;border-color:#00c896!important;box-shadow:0 0 0 3px rgba(0,200,150,.15)}
        .ai-err:focus{outline:none;border-color:#ef4444!important;box-shadow:0 0 0 3px rgba(239,68,68,.15)}
        .ab{transition:all .15s}.ab:active{transform:scale(.97)}
        @keyframes shimmer{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .shake{animation:shake .35s ease}
        .slide-down{animation:slideDown .25s ease}
        .chip-btn{transition:all .15s;cursor:pointer}
        .chip-btn:hover{background:rgba(0,200,150,.15)!important;border-color:rgba(0,200,150,.4)!important}
      `}</style>

      {/* BG glow */}
      <div style={{ position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,200,150,.1) 0%,transparent 70%)",pointerEvents:"none" }}/>

      {/* Logo */}
      <div style={{ padding:"48px 28px 24px",textAlign:"center" }}>
        <div style={{ width:68,height:68,borderRadius:20,background:"linear-gradient(135deg,#00c896,#1d4ed8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 14px",boxShadow:"0 8px 32px rgba(0,200,150,.3)" }}>📈</div>
        <h1 style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:30,color:"#f9fafb",letterSpacing:-.5 }}>Faver<span style={{ color:"#3b82f6" }}>Pix</span></h1>
        <p style={{ fontSize:13,color:"#6b7280",marginTop:6 }}>Preveja. Ganhe. Repita.</p>
      </div>

      <div style={{ padding:"0 28px 48px" }}>
        {/* Toggle */}
        <div style={{ display:"flex",background:"rgba(255,255,255,.05)",borderRadius:14,padding:4,marginBottom:24,border:"1px solid rgba(255,255,255,.07)" }}>
          {[["login","Entrar"],["signup","Criar conta"]].map(([m,label])=>(
            <button key={m} onClick={()=>switchMode(m)} style={{ flex:1,padding:"12px",border:"none",borderRadius:11,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"'DM Sans'",background:mode===m?"linear-gradient(135deg,#00c896,#00a07a)":"transparent",color:mode===m?"#fff":"#6b7280",transition:"all .2s" }}>{label}</button>
          ))}
        </div>

        {/* Remembered user chip */}
        {hasRemembered && (
          <div className="slide-down" style={{ marginBottom:16,display:"flex",alignItems:"center",gap:10,background:"rgba(0,200,150,.08)",border:"1px solid rgba(0,200,150,.2)",borderRadius:12,padding:"10px 14px" }}>
            <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#00c896,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",flexShrink:0 }}>
              {remembered.email.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <p style={{ fontSize:11,color:"#6b7280",marginBottom:2 }}>Bem-vindo de volta!</p>
              <p style={{ fontSize:13,fontWeight:700,color:"#00c896",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{remembered.email}</p>
            </div>
            <button onClick={()=>{ clearRemembered(); setEmail(""); }} style={{ background:"rgba(255,255,255,.08)",border:"none",color:"#6b7280",fontSize:11,padding:"4px 8px",borderRadius:6,cursor:"pointer" }}>Trocar</button>
          </div>
        )}

        {/* Campos */}
        {mode==="signup" && (
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11,color:"#9ca3af",fontWeight:700,display:"block",marginBottom:6,letterSpacing:.6 }}>NOME COMPLETO</label>
            <input className="ai" value={nome} onChange={e=>{setNome(e.target.value);setErro("");}} placeholder="João da Silva" type="text" style={inp}/>
          </div>
        )}

        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11,color:"#9ca3af",fontWeight:700,display:"block",marginBottom:6,letterSpacing:.6 }}>E-MAIL</label>
          <input className={erro.includes("mail")||erro.includes("E-mail")?"ai-err":"ai"} value={email}
            onChange={e=>{setEmail(e.target.value);setErro("");}}
            placeholder="joao@email.com" type="email" style={{
              ...inp,
              borderColor: erro.includes("mail")||erro.includes("E-mail") ? "#ef4444" : "rgba(255,255,255,0.1)",
            }}/>
        </div>

        {mode==="signup" && (
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11,color:"#9ca3af",fontWeight:700,display:"block",marginBottom:6,letterSpacing:.6 }}>CPF</label>
            <input className="ai" value={cpf} onChange={e=>setCpf(formatCPF(e.target.value))} placeholder="000.000.000-00" style={inp}/>
          </div>
        )}

        <div style={{ marginBottom:8 }}>
          <label style={{ fontSize:11,color:"#9ca3af",fontWeight:700,display:"block",marginBottom:6,letterSpacing:.6 }}>SENHA</label>
          <div style={{ position:"relative" }}>
            <input className={erro.includes("senha")||erro.includes("Senha")||erro.includes("incorreta")?"ai-err":"ai"}
              value={senha} onChange={e=>{setSenha(e.target.value);setErro("");}}
              placeholder={mode==="signup"?"Mínimo 8 caracteres":"Sua senha"}
              type={showSenha?"text":"password"}
              style={{
                ...inp, paddingRight:48,
                borderColor: erro.includes("senha")||erro.includes("Senha")||erro.includes("incorreta") ? "#ef4444" : "rgba(255,255,255,0.1)",
              }}
              onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
            />
            <button onClick={()=>setShowSenha(!showSenha)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:18 }}>{showSenha?"🙈":"👁️"}</button>
          </div>
          {/* Força da senha no cadastro */}
          {mode==="signup" && senha.length>0 && (
            <div style={{ marginTop:8 }}>
              <div style={{ display:"flex",gap:4,marginBottom:4 }}>
                {[1,2,3,4].map(n=>{
                  const force = senha.length>=12&&/[A-Z]/.test(senha)&&/[0-9]/.test(senha)&&/[^A-Za-z0-9]/.test(senha)?4:senha.length>=8&&/[A-Z]/.test(senha)&&/[0-9]/.test(senha)?3:senha.length>=8?2:1;
                  const colors=["#ef4444","#f59e0b","#3b82f6","#00c896"];
                  return <div key={n} style={{ flex:1,height:3,borderRadius:2,background:n<=force?colors[force-1]:"rgba(255,255,255,.1)",transition:"background .3s" }}/>;
                })}
              </div>
              <p style={{ fontSize:11,color:senha.length>=8?"#00c896":"#f59e0b" }}>
                {senha.length<8?"Muito curta — mínimo 8 caracteres":senha.length>=12&&/[A-Z]/.test(senha)&&/[0-9]/.test(senha)?"Senha forte 💪":"Senha boa"}
              </p>
            </div>
          )}
        </div>

        {/* Lembrar e-mail + Esqueci senha */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
          <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer" }}>
            <div onClick={()=>setLembrar(!lembrar)} style={{ width:20,height:20,borderRadius:6,border:`2px solid ${lembrar?"#00c896":"rgba(255,255,255,.2)"}`,background:lembrar?"#00c896":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s",cursor:"pointer" }}>
              {lembrar && <span style={{ color:"#fff",fontSize:12,fontWeight:700 }}>✓</span>}
            </div>
            <span style={{ fontSize:13,color:"#9ca3af",userSelect:"none" }}>Lembrar meu e-mail</span>
          </label>
          {mode==="login" && (
            <button style={{ background:"none",border:"none",color:"#00c896",fontSize:13,fontWeight:600,cursor:"pointer" }}>
              Esqueci a senha
            </button>
          )}
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="slide-down shake" style={{ background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:16 }}>⚠️</span>
            <p style={{ fontSize:13,color:"#fca5a5",fontWeight:500 }}>{erro}</p>
          </div>
        )}

        {/* Mensagem de sucesso */}
        {sucesso && (
          <div className="slide-down" style={{ background:"rgba(0,200,150,.1)",border:"1px solid rgba(0,200,150,.3)",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:16 }}>✅</span>
            <p style={{ fontSize:13,color:"#6ee7b7",fontWeight:500 }}>{sucesso}</p>
          </div>
        )}

        {/* CTA */}
        <button className="ab" onClick={handleSubmit} disabled={loading} style={{ width:"100%",background:loading?"rgba(0,200,150,.4)":"linear-gradient(135deg,#00c896,#00a07a)",border:"none",color:"#fff",borderRadius:14,padding:"16px",fontSize:16,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"'Space Grotesk'",letterSpacing:.3,boxShadow:loading?"none":"0 4px 20px rgba(0,200,150,.3)",animation:loading?"shimmer 1s infinite":"none",marginBottom:20 }}>
          {loading?"Verificando...":mode==="login"?"Entrar na conta":"Criar minha conta"}
        </button>

        {/* Acesso rápido admin — faz login direto */}
        {mode==="login" && (
          <button className="ab" onClick={()=>{
            setErro("");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              onLogin("Sellysmar", "sellysmar@gmail.com", false);
            }, 700);
          }} style={{ width:"100%",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.25)",color:"#f59e0b",borderRadius:12,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
            👑 Entrar como Administrador
          </button>
        )}

        {/* Divider */}
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <div style={{ flex:1,height:1,background:"rgba(255,255,255,.08)" }}/>
          <span style={{ fontSize:12,color:"#4b5563" }}>ou continue com</span>
          <div style={{ flex:1,height:1,background:"rgba(255,255,255,.08)" }}/>
        </div>

        {/* Social */}
        <div style={{ display:"flex",gap:10,marginBottom:20 }}>
          {[["G","Google"],["🍎","Apple"]].map(([icon,label])=>(
            <button key={label} className="ab" style={{ flex:1,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"13px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,color:"#e5e7eb",fontSize:14,fontWeight:600,fontFamily:"'DM Sans'" }}>
              <span style={{ fontSize:18 }}>{icon}</span>{label}
            </button>
          ))}
        </div>

        {mode==="signup" && (
          <p style={{ fontSize:11,color:"#4b5563",textAlign:"center",lineHeight:1.6 }}>
            Ao criar uma conta você concorda com nossos <span style={{ color:"#00c896" }}>Termos de Uso</span> e <span style={{ color:"#00c896" }}>Política de Privacidade</span>
          </p>
        )}

        {/* Ver mercados sem login */}
        {onPreview && (
          <button onClick={onPreview} style={{ width:"100%",background:"none",border:"none",color:"#4b5563",fontSize:12,cursor:"pointer",marginTop:12,textDecoration:"underline",fontFamily:"'DM Sans'" }}>
            👀 Ver mercados sem se cadastrar
          </button>
        )}
      </div>
    </div>
  );
}

// ── Payments ──────────────────────────────────────────────────
function PaymentsScreen({ onBack, saldo, setSaldo }) {
  const [tab,setTab]=useState("deposito"); const [method,setMethod]=useState("pix"); const [amount,setAmount]=useState(""); const [cardNum,setCardNum]=useState(""); const [cardName,setCardName]=useState(""); const [cardExp,setCardExp]=useState(""); const [cardCvv,setCardCvv]=useState(""); const [crypto,setCrypto]=useState("BTC"); const [pixKey,setPixKey]=useState(""); const [loading,setLoading]=useState(false); const [done,setDone]=useState(false);
  const fCard=(v)=>v.replace(/\D/g,"").slice(0,16).replace(/(\d{4})(?=\d)/g,"$1 ");
  const fExp=(v)=>{const d=v.replace(/\D/g,"").slice(0,4);return d.length>2?`${d.slice(0,2)}/${d.slice(2)}`:d;};
  const cryptoAddr={BTC:"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",ETH:"0x71C7656EC7ab88b098defB751B7401B5f6d8976F",USDT:"TN3W4H6rK2ce4vX9YnFQHwKx6Le9AaRiF4"};
  const handlePay=()=>{
    if(!amount)return;setLoading(true);
    setTimeout(()=>{
      setLoading(false);setDone(true);
      if(setSaldo){
        const v=parseFloat(amount)||0;
        setSaldo(s => tab==="deposito" ? s+v : Math.max(0,s-v));
      }
    },1800);
  };
  const inp2={width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"13px 16px",color:"#f9fafb",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"};

  if(done) return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:"#0a0d14",minHeight:"100vh",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32 }}>
      <div style={{ fontSize:80,marginBottom:24 }}>✅</div>
      <h2 style={{ fontFamily:"'Space Grotesk'",fontSize:24,fontWeight:700,color:"#f9fafb",marginBottom:8,textAlign:"center" }}>{tab==="deposito"?"Depósito realizado!":"Saque solicitado!"}</h2>
      <p style={{ color:"#6b7280",fontSize:14,textAlign:"center",marginBottom:6 }}>{tab==="deposito"?`R$ ${amount} adicionado à sua conta`:`Saque de R$ ${amount} em processamento`}</p>
      <p style={{ color:"#4b5563",fontSize:12,marginBottom:32 }}>{tab==="deposito"?"Disponível em instantes":"Prazo: até 1 dia útil"}</p>
      <button onClick={()=>{setDone(false);setAmount("");onBack();}} style={{ background:"linear-gradient(135deg,#00c896,#00a07a)",border:"none",color:"#fff",borderRadius:14,padding:"14px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk'" }}>Voltar ao início</button>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:"#0f1117",minHeight:"100vh",maxWidth:480,margin:"0 auto",color:"#f0f2f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}.pi:focus{outline:none;border-color:#00c896!important;box-shadow:0 0 0 3px rgba(0,200,150,.15)}.pb2{transition:all .15s}.pb2:active{transform:scale(.97)}@keyframes shimmer{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      <div style={{ background:"#161922",padding:"16px 20px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:16,position:"sticky",top:0,zIndex:10 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.08)",border:"none",color:"#9ca3af",width:38,height:38,borderRadius:"50%",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center" }}>←</button>
        <div><h2 style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:18,color:"#f9fafb" }}>Carteira</h2><p style={{ fontSize:12,color:"#6b7280" }}>Gerencie seus fundos</p></div>
      </div>
      <div style={{ margin:"20px 16px",background:"linear-gradient(135deg,#00c896,#1d4ed8)",borderRadius:20,padding:"24px",overflow:"hidden",position:"relative" }}>
        <div style={{ position:"absolute",top:-20,right:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.1)" }}/>
        <p style={{ fontSize:12,color:"rgba(255,255,255,.7)",fontWeight:700,letterSpacing:.8,marginBottom:8 }}>SALDO DISPONÍVEL</p>
        <h1 style={{ fontFamily:"'Space Grotesk'",fontSize:36,fontWeight:700,color:"#fff",letterSpacing:-1 }}>R$ {(saldo||500).toFixed(2)}</h1>
      </div>
      <div style={{ padding:"0 16px 100px" }}>
        <div style={{ display:"flex",background:"rgba(255,255,255,.05)",borderRadius:14,padding:4,marginBottom:20,border:"1px solid rgba(255,255,255,.07)" }}>
          {[["deposito","⬇️ Depositar"],["saque","⬆️ Sacar"]].map(([t,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1,padding:"12px",border:"none",borderRadius:11,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"'DM Sans'",background:tab===t?"linear-gradient(135deg,#00c896,#00a07a)":"transparent",color:tab===t?"#fff":"#6b7280",transition:"all .2s" }}>{label}</button>
          ))}
        </div>
        <p style={{ fontSize:11,color:"#6b7280",fontWeight:700,letterSpacing:.5,marginBottom:10 }}>MÉTODO DE PAGAMENTO</p>
        <div style={{ display:"flex",gap:10,marginBottom:20 }}>
          {[["pix","⚡ Pix"],["cartao","💳 Cartão"],["crypto","₿ Crypto"]].map(([m,label])=>(
            <button key={m} onClick={()=>setMethod(m)} style={{ flex:1,padding:"12px 8px",border:method===m?"1px solid #00c896":"1px solid rgba(255,255,255,.1)",borderRadius:12,cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:"'DM Sans'",background:method===m?"rgba(0,200,150,.1)":"rgba(255,255,255,.04)",color:method===m?"#00c896":"#6b7280",transition:"all .2s" }}>{label}</button>
          ))}
        </div>
        <p style={{ fontSize:11,color:"#6b7280",fontWeight:700,letterSpacing:.5,marginBottom:8 }}>VALOR</p>
        <div style={{ display:"flex",alignItems:"center",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:12,padding:"12px 16px",marginBottom:10 }}>
          <span style={{ fontSize:16,color:"#6b7280",marginRight:8,fontWeight:700 }}>R$</span>
          <input type="number" placeholder="0,00" value={amount} onChange={e=>setAmount(e.target.value)} style={{ background:"none",border:"none",color:"#f9fafb",fontSize:22,fontWeight:700,flex:1,outline:"none",fontFamily:"'Space Grotesk'" }}/>
        </div>
        <div style={{ display:"flex",gap:8,marginBottom:20 }}>
          {[50,100,200,500].map(a=>(
            <button key={a} onClick={()=>setAmount(String(a))} className="pb2" style={{ flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"#9ca3af",borderRadius:8,padding:"7px 0",fontSize:12,fontWeight:600,cursor:"pointer" }}>R${a}</button>
          ))}
        </div>
        {method==="pix" && <div style={{ background:"#161922",borderRadius:16,padding:18,border:"1px solid rgba(255,255,255,.07)",marginBottom:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}><div style={{ width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#00c896,#00a07a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>⚡</div><div><p style={{ fontWeight:700,color:"#f9fafb",fontSize:14 }}>Pix Instantâneo</p><p style={{ fontSize:12,color:"#6b7280" }}>Aprovação em segundos</p></div></div>
          {tab==="deposito"?<><div style={{ background:"rgba(0,200,150,.08)",border:"1px dashed rgba(0,200,150,.3)",borderRadius:12,padding:14,textAlign:"center",marginBottom:10 }}><p style={{ fontSize:11,color:"#6b7280",marginBottom:4 }}>CHAVE PIX</p><p style={{ fontFamily:"'Space Grotesk'",fontWeight:700,color:"#00c896",fontSize:14 }}>faverpix@pagamentos.com.br</p><p style={{ fontSize:11,color:"#4b5563",marginTop:4 }}>CNPJ: 00.000.000/0001-00</p></div><p style={{ fontSize:11,color:"#4b5563",textAlign:"center" }}>Após pagamento, envie comprovante pelo chat</p></>:<><p style={{ fontSize:11,color:"#6b7280",fontWeight:700,marginBottom:8 }}>SUA CHAVE PIX</p><input className="pi" value={pixKey} onChange={e=>setPixKey(e.target.value)} placeholder="CPF, e-mail ou telefone" style={inp2}/></>}
        </div>}
        {method==="cartao" && <div style={{ background:"#161922",borderRadius:16,padding:18,border:"1px solid rgba(255,255,255,.07)",marginBottom:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}><div style={{ width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>💳</div><div><p style={{ fontWeight:700,color:"#f9fafb",fontSize:14 }}>Cartão de Crédito/Débito</p><p style={{ fontSize:12,color:"#6b7280" }}>Visa, Mastercard, Elo, Hipercard</p></div></div>
          <div style={{ background:"linear-gradient(135deg,#1e3a5f,#1d4ed8)",borderRadius:14,padding:"18px 20px",marginBottom:14 }}>
            <p style={{ fontSize:11,color:"rgba(255,255,255,.5)",letterSpacing:1,marginBottom:12 }}>FAVER<span style={{ color:"#60a5fa" }}>PIX</span></p>
            <p style={{ fontFamily:"'Space Grotesk'",fontSize:17,color:"#fff",letterSpacing:2,marginBottom:12 }}>{cardNum||"•••• •••• •••• ••••"}</p>
            <div style={{ display:"flex",justifyContent:"space-between" }}><div><p style={{ fontSize:9,color:"rgba(255,255,255,.5)" }}>TITULAR</p><p style={{ fontSize:12,color:"#fff",fontWeight:600 }}>{cardName||"SEU NOME"}</p></div><div><p style={{ fontSize:9,color:"rgba(255,255,255,.5)" }}>VALIDADE</p><p style={{ fontSize:12,color:"#fff",fontWeight:600 }}>{cardExp||"MM/AA"}</p></div></div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <input className="pi" value={cardNum} onChange={e=>setCardNum(fCard(e.target.value))} placeholder="Número do cartão" style={{ ...inp2,letterSpacing:1 }}/>
            <input className="pi" value={cardName} onChange={e=>setCardName(e.target.value.toUpperCase())} placeholder="Nome impresso no cartão" style={inp2}/>
            <div style={{ display:"flex",gap:10 }}><input className="pi" value={cardExp} onChange={e=>setCardExp(fExp(e.target.value))} placeholder="MM/AA" style={{ ...inp2,flex:1 }}/><input className="pi" value={cardCvv} onChange={e=>setCardCvv(e.target.value.slice(0,4))} placeholder="CVV" type="password" style={{ ...inp2,flex:1 }}/></div>
          </div>
        </div>}
        {method==="crypto" && <div style={{ background:"#161922",borderRadius:16,padding:18,border:"1px solid rgba(255,255,255,.07)",marginBottom:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}><div style={{ width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#f59e0b,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>₿</div><div><p style={{ fontWeight:700,color:"#f9fafb",fontSize:14 }}>Criptomoedas</p><p style={{ fontSize:12,color:"#6b7280" }}>Bitcoin, Ethereum, USDT</p></div></div>
          <div style={{ display:"flex",gap:8,marginBottom:14 }}>{["BTC","ETH","USDT"].map(c=><button key={c} onClick={()=>setCrypto(c)} style={{ flex:1,padding:"10px",border:crypto===c?"1px solid #f59e0b":"1px solid rgba(255,255,255,.1)",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13,background:crypto===c?"rgba(245,158,11,.1)":"rgba(255,255,255,.04)",color:crypto===c?"#f59e0b":"#6b7280",transition:"all .2s" }}>{c}</button>)}</div>
          <div style={{ background:"rgba(245,158,11,.08)",border:"1px dashed rgba(245,158,11,.3)",borderRadius:12,padding:14 }}><p style={{ fontSize:11,color:"#6b7280",marginBottom:6 }}>ENDEREÇO {crypto}</p><p style={{ fontFamily:"'Space Grotesk'",fontSize:11,color:"#f59e0b",wordBreak:"break-all",lineHeight:1.6 }}>{cryptoAddr[crypto]}</p><button className="pb2" style={{ marginTop:10,width:"100%",background:"rgba(245,158,11,.15)",border:"1px solid rgba(245,158,11,.3)",borderRadius:8,padding:"8px",color:"#f59e0b",fontSize:12,fontWeight:600,cursor:"pointer" }}>📋 Copiar endereço</button></div>
        </div>}
        <button className="pb2" onClick={handlePay} style={{ width:"100%",background:loading?"rgba(0,200,150,.4)":"linear-gradient(135deg,#00c896,#00a07a)",border:"none",color:"#fff",borderRadius:14,padding:"16px",fontSize:16,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"'Space Grotesk'",letterSpacing:.3,animation:loading?"shimmer 1s infinite":"none" }}>
          {loading?"Processando...":`${tab==="deposito"?"Depositar":"Sacar"} R$ ${amount||"0,00"}`}
        </button>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:14 }}><span>🔒</span><span style={{ fontSize:12,color:"#4b5563" }}>Pagamento seguro — SSL 256-bit</span></div>
      </div>
    </div>
  );
}

// ── Crypto Bet Modal ──────────────────────────────────────────
function CryptoBetModal({ crypto, onClose }) {
  const [direcao,  setDirecao]  = useState(null);   // "SOBE" | "CAI"
  const [periodo,  setPeriodo]  = useState(null);   // "1D" | "7D" | "1M" | "1A"
  const [amount,   setAmount]   = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const periodos = [
    { key:"1D", label:"1 Dia",  desc:"Resultado em 24h" },
    { key:"7D", label:"7 Dias", desc:"Resultado em 1 semana" },
    { key:"1M", label:"1 Mês",  desc:"Resultado em 30 dias" },
    { key:"1A", label:"1 Ano",  desc:"Resultado em 12 meses" },
  ];

  // Odds simuladas baseadas na volatilidade
  const odds = { "1D":1.85, "7D":1.95, "1M":2.10, "1A":2.80 };
  const retorno = amount && periodo ? (parseFloat(amount) * odds[periodo]).toFixed(2) : "0.00";
  const pronto = direcao && periodo && parseFloat(amount) > 0;

  const confirmar = () => {
    if (!pronto) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  if (done) return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.8)",backdropFilter:"blur(4px)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ background:"#1a1f2e",borderRadius:24,padding:32,textAlign:"center",width:"100%",maxWidth:380,border:"1px solid rgba(255,255,255,.1)" }}>
        <div style={{ fontSize:64,marginBottom:16 }}>{direcao==="SOBE"?"🚀":"📉"}</div>
        <h3 style={{ fontFamily:"'Space Grotesk'",fontSize:22,fontWeight:700,color:"#f9fafb",marginBottom:8 }}>Aposta confirmada!</h3>
        <p style={{ fontSize:14,color:"#9ca3af",marginBottom:6 }}>
          {crypto.symbol} {direcao==="SOBE"?"vai subir":"vai cair"} em {periodos.find(p=>p.key===periodo)?.label}
        </p>
        <p style={{ fontSize:13,color:"#6b7280",marginBottom:24 }}>
          Retorno potencial: <span style={{ color:"#00c896",fontWeight:700 }}>R$ {retorno}</span>
        </p>
        <button onClick={onClose} style={{ background:"linear-gradient(135deg,#00c896,#00a07a)",border:"none",color:"#fff",borderRadius:12,padding:"13px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk'" }}>
          Fechar
        </button>
      </div>
    </div>
  );

  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(4px)",zIndex:60,display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#1a1f2e",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,padding:"24px 20px 40px",border:"1px solid rgba(255,255,255,.1)",maxHeight:"92vh",overflowY:"auto" }}>
        <div style={{ width:40,height:4,background:"rgba(255,255,255,.2)",borderRadius:2,margin:"0 auto 20px" }}/>

        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,rgba(0,200,150,.25),rgba(59,130,246,.25))",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:13,color:"#f9fafb" }}>{crypto.symbol.slice(0,3)}</span>
            </div>
            <div>
              <p style={{ fontSize:11,color:"#6b7280",fontWeight:700,letterSpacing:.6 }}>APOSTAR EM</p>
              <h3 style={{ fontSize:19,fontWeight:700,fontFamily:"'Space Grotesk'",color:"#f9fafb" }}>{crypto.symbol} — {crypto.name}</h3>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.08)",border:"none",color:"#9ca3af",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16 }}>×</button>
        </div>

        {/* Preço atual */}
        <div style={{ background:"rgba(255,255,255,.04)",borderRadius:12,padding:"12px 16px",marginBottom:22,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <p style={{ fontSize:11,color:"#6b7280",marginBottom:3 }}>PREÇO ATUAL</p>
            <p style={{ fontFamily:"'Space Grotesk'",fontSize:18,fontWeight:700,color:"#f9fafb" }}>{crypto.price}</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontSize:11,color:"#6b7280",marginBottom:3 }}>24H</p>
            <p style={{ fontSize:14,fontWeight:700,color:crypto.up?"#00c896":"#ef4444" }}>{crypto.change}</p>
          </div>
        </div>

        {/* Passo 1 — Direção */}
        <p style={{ fontSize:11,color:"#9ca3af",fontWeight:700,letterSpacing:.6,marginBottom:10 }}>1. ESCOLHA A DIREÇÃO</p>
        <div style={{ display:"flex",gap:10,marginBottom:22 }}>
          <button onClick={()=>setDirecao("SOBE")} style={{
            flex:1,padding:"16px 10px",borderRadius:14,cursor:"pointer",border:"none",
            background:direcao==="SOBE"?"linear-gradient(135deg,#00c896,#00a07a)":"rgba(0,200,150,.08)",
            border:direcao==="SOBE"?"none":"1px solid rgba(0,200,150,.25)",
            transition:"all .2s",
          }}>
            <div style={{ fontSize:28,marginBottom:6 }}>🚀</div>
            <p style={{ fontSize:15,fontWeight:700,color:direcao==="SOBE"?"#fff":"#00c896",fontFamily:"'Space Grotesk'" }}>VAI SUBIR</p>
            <p style={{ fontSize:11,color:direcao==="SOBE"?"rgba(255,255,255,.7)":"#4b5563",marginTop:2 }}>Aposta na alta</p>
          </button>
          <button onClick={()=>setDirecao("CAI")} style={{
            flex:1,padding:"16px 10px",borderRadius:14,cursor:"pointer",
            background:direcao==="CAI"?"linear-gradient(135deg,#ef4444,#dc2626)":"rgba(239,68,68,.08)",
            border:direcao==="CAI"?"none":"1px solid rgba(239,68,68,.25)",
            transition:"all .2s",
          }}>
            <div style={{ fontSize:28,marginBottom:6 }}>📉</div>
            <p style={{ fontSize:15,fontWeight:700,color:direcao==="CAI"?"#fff":"#ef4444",fontFamily:"'Space Grotesk'" }}>VAI CAIR</p>
            <p style={{ fontSize:11,color:direcao==="CAI"?"rgba(255,255,255,.7)":"#4b5563",marginTop:2 }}>Aposta na baixa</p>
          </button>
        </div>

        {/* Passo 2 — Período */}
        <p style={{ fontSize:11,color:"#9ca3af",fontWeight:700,letterSpacing:.6,marginBottom:10 }}>2. ESCOLHA O PERÍODO</p>
        <div style={{ display:"flex",gap:8,marginBottom:22 }}>
          {periodos.map(p=>(
            <button key={p.key} onClick={()=>setPeriodo(p.key)} style={{
              flex:1,padding:"10px 4px",borderRadius:12,cursor:"pointer",textAlign:"center",
              background:periodo===p.key?"linear-gradient(135deg,#3b82f6,#1d4ed8)":"rgba(59,130,246,.08)",
              border:periodo===p.key?"none":"1px solid rgba(59,130,246,.25)",
              transition:"all .2s",
            }}>
              <p style={{ fontSize:14,fontWeight:700,color:periodo===p.key?"#fff":"#3b82f6",fontFamily:"'Space Grotesk'" }}>{p.label}</p>
              <p style={{ fontSize:9,color:periodo===p.key?"rgba(255,255,255,.7)":"#4b5563",marginTop:3 }}>{p.desc}</p>
              {periodo===p.key && <p style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,.85)",marginTop:4 }}>×{odds[p.key]}</p>}
              {periodo!==p.key && <p style={{ fontSize:10,color:"#4b5563",marginTop:4 }}>×{odds[p.key]}</p>}
            </button>
          ))}
        </div>

        {/* Passo 3 — Valor */}
        <p style={{ fontSize:11,color:"#9ca3af",fontWeight:700,letterSpacing:.6,marginBottom:10 }}>3. VALOR DA APOSTA</p>
        <div style={{ display:"flex",alignItems:"center",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:12,padding:"12px 16px",marginBottom:10 }}>
          <span style={{ fontSize:16,color:"#6b7280",marginRight:8,fontWeight:700 }}>R$</span>
          <input type="number" placeholder="0,00" value={amount} onChange={e=>setAmount(e.target.value)}
            style={{ background:"none",border:"none",color:"#f9fafb",fontSize:22,fontWeight:700,flex:1,outline:"none",fontFamily:"'Space Grotesk'" }}/>
        </div>
        <div style={{ display:"flex",gap:8,marginBottom:20 }}>
          {[10,25,50,100].map(a=>(
            <button key={a} onClick={()=>setAmount(String(a))} style={{ flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"#9ca3af",borderRadius:8,padding:"7px 0",fontSize:12,fontWeight:600,cursor:"pointer" }}>R${a}</button>
          ))}
        </div>

        {/* Retorno potencial */}
        {periodo && (
          <div style={{ background:"rgba(0,200,150,.08)",border:"1px solid rgba(0,200,150,.2)",borderRadius:12,padding:"14px 16px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <p style={{ fontSize:11,color:"#6b7280",marginBottom:2 }}>Retorno potencial (×{odds[periodo]})</p>
              <p style={{ fontSize:11,color:"#4b5563" }}>{periodos.find(p=>p.key===periodo)?.desc}</p>
            </div>
            <p style={{ fontSize:18,fontWeight:700,color:"#00c896",fontFamily:"'Space Grotesk'" }}>R$ {retorno}</p>
          </div>
        )}

        {/* Resumo */}
        {direcao && periodo && (
          <div style={{ background:"rgba(255,255,255,.03)",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ fontSize:20 }}>{direcao==="SOBE"?"🚀":"📉"}</span>
            <p style={{ fontSize:13,color:"#9ca3af",flex:1 }}>
              <span style={{ color:"#f9fafb",fontWeight:700 }}>{crypto.symbol}</span> {direcao==="SOBE"?"vai subir":"vai cair"} em{" "}
              <span style={{ color:"#3b82f6",fontWeight:700 }}>{periodos.find(p=>p.key===periodo)?.label}</span>
            </p>
          </div>
        )}

        {/* Botão confirmar */}
        <button onClick={confirmar} disabled={!pronto||loading} style={{
          width:"100%",
          background:!pronto?"rgba(255,255,255,.06)":loading?"rgba(0,200,150,.4)":direcao==="SOBE"?"linear-gradient(135deg,#00c896,#00a07a)":"linear-gradient(135deg,#ef4444,#dc2626)",
          border:"none",color:!pronto?"#4b5563":"#fff",borderRadius:14,padding:"16px",
          fontSize:16,fontWeight:700,cursor:!pronto?"not-allowed":"pointer",
          fontFamily:"'Space Grotesk'",letterSpacing:.3,
          boxShadow:pronto&&!loading?`0 4px 20px ${direcao==="SOBE"?"rgba(0,200,150,.3)":"rgba(239,68,68,.3)"}`:"none",
          animation:loading?"shimmer 1s infinite":"none",
          transition:"all .2s",
        }}>
          {loading ? "Confirmando..." : !direcao ? "Escolha a direção" : !periodo ? "Escolha o período" : !parseFloat(amount) ? "Informe o valor" : `Apostar ${direcao==="SOBE"?"🚀 SOBE":"📉 CAI"} — ${periodos.find(p=>p.key===periodo)?.label}`}
        </button>
      </div>
    </div>
  );
}

// ── Crypto Tab ────────────────────────────────────────────────
function CryptoTab({ searchQuery }) {
  const [betCrypto, setBetCrypto] = useState(null);

  const filtered = useMemo(() =>
    cryptoList.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  return (
    <>
      <div style={{ padding:"12px 16px 100px" }}>
        {/* Header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
          <p style={{ fontSize:13,color:"#6b7280" }}>Top <span style={{ color:"#00c896",fontWeight:700 }}>{filtered.length}</span> criptomoedas</p>
          <p style={{ fontSize:11,color:"#4b5563" }}>Toque para apostar</p>
        </div>

        {/* Info banner */}
        <div style={{ background:"linear-gradient(135deg,rgba(245,158,11,.1),rgba(59,130,246,.1))",border:"1px solid rgba(245,158,11,.2)",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:18 }}>💡</span>
          <p style={{ fontSize:12,color:"#9ca3af",lineHeight:1.5 }}>
            Aposte se a cripto vai <span style={{ color:"#00c896",fontWeight:700 }}>subir 🚀</span> ou <span style={{ color:"#ef4444",fontWeight:700 }}>cair 📉</span> em 1 dia, 7 dias, 1 mês ou 1 ano.
          </p>
        </div>

        {filtered.map((c, i) => (
          <div key={c.symbol} onClick={()=>setBetCrypto(c)} style={{ display:"flex",alignItems:"center",background:"#161922",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid rgba(255,255,255,.06)",cursor:"pointer",transition:"transform .15s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >
            {/* Ranking */}
            <div style={{ width:26,height:26,borderRadius:"50%",background:"rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,flexShrink:0 }}>
              <span style={{ fontSize:9,fontWeight:700,color:"#6b7280" }}>{i+1}</span>
            </div>
            {/* Icon */}
            <div style={{ width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,rgba(0,200,150,.18),rgba(59,130,246,.18))",display:"flex",alignItems:"center",justifyContent:"center",marginRight:12,flexShrink:0 }}>
              <span style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:11,color:"#f9fafb" }}>{c.symbol.slice(0,3)}</span>
            </div>
            {/* Name */}
            <div style={{ flex:1,minWidth:0 }}>
              <p style={{ fontSize:14,fontWeight:700,color:"#f9fafb",marginBottom:2 }}>{c.symbol}</p>
              <p style={{ fontSize:11,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{c.name}</p>
            </div>
            {/* Price + change */}
            <div style={{ textAlign:"right",flexShrink:0,marginRight:10 }}>
              <p style={{ fontSize:13,fontWeight:700,color:"#f9fafb",marginBottom:2 }}>{c.price}</p>
              <p style={{ fontSize:11,fontWeight:600,color:c.up?"#00c896":"#ef4444" }}>{c.change}</p>
            </div>
            {/* Bet buttons */}
            <div style={{ display:"flex",flexDirection:"column",gap:4,flexShrink:0 }}>
              <div style={{ background:"rgba(0,200,150,.15)",border:"1px solid rgba(0,200,150,.3)",borderRadius:7,padding:"3px 8px",textAlign:"center" }}>
                <span style={{ fontSize:11,fontWeight:700,color:"#00c896" }}>🚀</span>
              </div>
              <div style={{ background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",borderRadius:7,padding:"3px 8px",textAlign:"center" }}>
                <span style={{ fontSize:11,fontWeight:700,color:"#ef4444" }}>📉</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length===0 && (
          <div style={{ textAlign:"center",padding:"40px 0",color:"#6b7280" }}>Nenhuma cripto encontrada 🔍</div>
        )}
      </div>

      {betCrypto && <CryptoBetModal crypto={betCrypto} onClose={()=>setBetCrypto(null)}/>}
    </>
  );
}

// ── Profile Screen ────────────────────────────────────────────
function ProfileScreen({ usuario, userEmail, adminMode, onBack, onUpdate, onLogout, onGoAfiliados, onGoMargem }) {
  const [editando,    setEditando]    = useState(null); // "nome" | "email" | "senha"
  const [novoNome,    setNovoNome]    = useState(usuario || "");
  const [novoEmail,   setNovoEmail]   = useState(userEmail || "");
  const [senhaAtual,  setSenhaAtual]  = useState("");
  const [novaSenha,   setNovaSenha]   = useState("");
  const [confirma,    setConfirma]    = useState("");
  const [showSenhas,  setShowSenhas]  = useState(false);
  const [erro,        setErro]        = useState("");
  const [sucesso,     setSucesso]     = useState("");
  const [loading,     setLoading]     = useState(false);
  const [showLogout,  setShowLogout]  = useState(false);

  const inp = {
    width:"100%", background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.12)", borderRadius:12,
    padding:"13px 16px", color:"#f9fafb", fontSize:15,
    fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box",
  };

  const salvarNome = () => {
    setErro(""); setSucesso("");
    if (!novoNome.trim()) { setErro("Nome não pode ser vazio."); return; }
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      const idx = users.findIndex(u => u.email.toLowerCase() === userEmail.toLowerCase());
      if (idx >= 0) { users[idx].nome = novoNome.trim(); saveUsers(users); }
      setLoading(false);
      setSucesso("Nome atualizado com sucesso! ✅");
      onUpdate(novoNome.trim(), userEmail);
      setEditando(null);
    }, 700);
  };

  const salvarEmail = () => {
    setErro(""); setSucesso("");
    if (!novoEmail.trim() || !novoEmail.includes("@")) { setErro("Informe um e-mail válido."); return; }
    const users = getUsers();
    const jaExiste = users.find(u => u.email.toLowerCase() === novoEmail.toLowerCase() && u.email.toLowerCase() !== userEmail.toLowerCase());
    if (jaExiste) { setErro("Este e-mail já está sendo usado por outra conta."); return; }
    setLoading(true);
    setTimeout(() => {
      const idx = users.findIndex(u => u.email.toLowerCase() === userEmail.toLowerCase());
      if (idx >= 0) { users[idx].email = novoEmail.toLowerCase().trim(); saveUsers(users); }
      setLoading(false);
      setSucesso("E-mail atualizado com sucesso! ✅");
      onUpdate(usuario, novoEmail.toLowerCase().trim());
      setEditando(null);
    }, 700);
  };

  const salvarSenha = () => {
    setErro(""); setSucesso("");
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
    if (!user) { setErro("Usuário não encontrado."); return; }
    if (user.senha !== senhaAtual) { setErro("Senha atual incorreta."); return; }
    if (novaSenha.length < 8) { setErro("Nova senha deve ter no mínimo 8 caracteres."); return; }
    if (novaSenha !== confirma) { setErro("As senhas não coincidem."); return; }
    setLoading(true);
    setTimeout(() => {
      const idx = users.findIndex(u => u.email.toLowerCase() === userEmail.toLowerCase());
      if (idx >= 0) { users[idx].senha = novaSenha; saveUsers(users); }
      setLoading(false);
      setSucesso("Senha alterada com sucesso! ✅");
      setSenhaAtual(""); setNovaSenha(""); setConfirma("");
      setEditando(null);
    }, 700);
  };

  const cancelar = () => { setEditando(null); setErro(""); setSucesso(""); setNovoNome(usuario); setNovoEmail(userEmail); setSenhaAtual(""); setNovaSenha(""); setConfirma(""); };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#0f1117", minHeight:"100vh", maxWidth:480, margin:"0 auto", color:"#f0f2f5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .pf-inp:focus{outline:none;border-color:#00c896!important;box-shadow:0 0 0 3px rgba(0,200,150,.15)}
        .pf-btn{transition:all .15s}.pf-btn:active{transform:scale(.97)}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .sd{animation:slideDown .2s ease}
        @keyframes shimmer{0%,100%{opacity:1}50%{opacity:.5}}
      `}</style>

      {/* Header */}
      <div style={{ background:"#161922", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:16, position:"sticky", top:0, zIndex:10 }}>
        <button onClick={onBack} className="pf-btn" style={{ background:"rgba(255,255,255,.08)", border:"none", color:"#9ca3af", width:38, height:38, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div>
          <h2 style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:18, color:"#f9fafb" }}>Meu Perfil</h2>
          <p style={{ fontSize:12, color:"#6b7280" }}>Gerencie suas informações</p>
        </div>
      </div>

      <div style={{ padding:"20px 16px 100px" }}>

        {/* Avatar card */}
        <div style={{ background:"linear-gradient(135deg,#161922,#1a1f2e)", borderRadius:20, padding:"28px 20px", marginBottom:20, textAlign:"center", border:"1px solid rgba(255,255,255,.07)", position:"relative" }}>
          <div style={{ width:76, height:76, borderRadius:"50%", background:"linear-gradient(135deg,#00c896,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, fontWeight:700, color:"#fff", margin:"0 auto 14px", boxShadow:"0 4px 20px rgba(0,200,150,.3)" }}>
            {usuario?.charAt(0).toUpperCase()}
          </div>
          <h3 style={{ fontFamily:"'Space Grotesk'", fontSize:20, fontWeight:700, color:"#f9fafb", marginBottom:4 }}>{usuario}</h3>
          <p style={{ fontSize:13, color:"#6b7280", marginBottom:adminMode ? 10 : 0 }}>{userEmail}</p>
          {adminMode && (
            <span style={{ display:"inline-block", fontSize:11, fontWeight:700, color:"#f59e0b", background:"rgba(245,158,11,.15)", border:"1px solid rgba(245,158,11,.3)", borderRadius:20, padding:"3px 10px" }}>👑 Administrador</span>
          )}
        </div>

        {/* Mensagens */}
        {erro && (
          <div className="sd" style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.3)", borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
            <span>⚠️</span><p style={{ fontSize:13, color:"#fca5a5" }}>{erro}</p>
          </div>
        )}
        {sucesso && (
          <div className="sd" style={{ background:"rgba(0,200,150,.1)", border:"1px solid rgba(0,200,150,.3)", borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
            <span>✅</span><p style={{ fontSize:13, color:"#6ee7b7" }}>{sucesso}</p>
          </div>
        )}

        {/* ── EDITAR NOME ─────────────────────────────────── */}
        <div style={{ background:"#161922", borderRadius:16, marginBottom:10, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden" }}>
          <div onClick={()=>{ if(editando==="nome") cancelar(); else { setEditando("nome"); setErro(""); setSucesso(""); }}} style={{ padding:"16px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(0,200,150,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>👤</div>
              <div>
                <p style={{ fontSize:11, color:"#6b7280", marginBottom:2, fontWeight:600, letterSpacing:.4 }}>NOME</p>
                <p style={{ fontSize:14, fontWeight:600, color:"#f9fafb" }}>{usuario}</p>
              </div>
            </div>
            <span style={{ color:"#00c896", fontSize:13, fontWeight:600 }}>{editando==="nome" ? "Cancelar" : "Editar"}</span>
          </div>
          {editando==="nome" && (
            <div className="sd" style={{ padding:"0 18px 18px" }}>
              <label style={{ fontSize:11, color:"#9ca3af", fontWeight:700, display:"block", marginBottom:6, letterSpacing:.5 }}>NOVO NOME</label>
              <input className="pf-inp" value={novoNome} onChange={e=>{ setNovoNome(e.target.value); setErro(""); }} placeholder="Seu nome completo" style={{ ...inp, marginBottom:12 }} autoFocus/>
              <button className="pf-btn" onClick={salvarNome} disabled={loading} style={{ width:"100%", background:loading?"rgba(0,200,150,.4)":"linear-gradient(135deg,#00c896,#00a07a)", border:"none", color:"#fff", borderRadius:12, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'", animation:loading?"shimmer 1s infinite":"none" }}>
                {loading ? "Salvando..." : "Salvar nome"}
              </button>
            </div>
          )}
        </div>

        {/* ── EDITAR E-MAIL ────────────────────────────────── */}
        <div style={{ background:"#161922", borderRadius:16, marginBottom:10, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden" }}>
          <div onClick={()=>{ if(editando==="email") cancelar(); else { setEditando("email"); setErro(""); setSucesso(""); }}} style={{ padding:"16px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(59,130,246,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>✉️</div>
              <div>
                <p style={{ fontSize:11, color:"#6b7280", marginBottom:2, fontWeight:600, letterSpacing:.4 }}>E-MAIL</p>
                <p style={{ fontSize:14, fontWeight:600, color:"#f9fafb" }}>{userEmail}</p>
              </div>
            </div>
            <span style={{ color:"#00c896", fontSize:13, fontWeight:600 }}>{editando==="email" ? "Cancelar" : "Editar"}</span>
          </div>
          {editando==="email" && (
            <div className="sd" style={{ padding:"0 18px 18px" }}>
              <label style={{ fontSize:11, color:"#9ca3af", fontWeight:700, display:"block", marginBottom:6, letterSpacing:.5 }}>NOVO E-MAIL</label>
              <input className="pf-inp" type="email" value={novoEmail} onChange={e=>{ setNovoEmail(e.target.value); setErro(""); }} placeholder="seu@email.com" style={{ ...inp, marginBottom:12 }} autoFocus/>
              <button className="pf-btn" onClick={salvarEmail} disabled={loading} style={{ width:"100%", background:loading?"rgba(0,200,150,.4)":"linear-gradient(135deg,#00c896,#00a07a)", border:"none", color:"#fff", borderRadius:12, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'", animation:loading?"shimmer 1s infinite":"none" }}>
                {loading ? "Salvando..." : "Salvar e-mail"}
              </button>
            </div>
          )}
        </div>

        {/* ── PROGRAMA DE AFILIADOS ───────────────────── */}
        <div style={{ background:"#161922", borderRadius:16, marginBottom:10, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden" }}>
          <div onClick={()=>{ setErro(""); setSucesso(""); onGoAfiliados(); }} style={{ padding:"16px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,rgba(0,200,150,.2),rgba(59,130,246,.2))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤝</div>
              <div>
                <p style={{ fontSize:14, fontWeight:700, color:"#f9fafb" }}>Programa de Afiliados</p>
                <p style={{ fontSize:12, color:"#6b7280" }}>Ganhe 15% sobre depósitos dos indicados</p>
              </div>
            </div>
            <span style={{ color:"#00c896", fontSize:16 }}>›</span>
          </div>
        </div>

        {/* ── CALCULADORA MARGEM (só admin) ─────────── */}
        {adminMode && (
          <div style={{ background:"#161922", borderRadius:16, marginBottom:20, border:"1px solid rgba(245,158,11,.2)", overflow:"hidden" }}>
            <div onClick={onGoMargem} style={{ padding:"16px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:"rgba(245,158,11,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📐</div>
                <div>
                  <p style={{ fontSize:14, fontWeight:700, color:"#f9fafb" }}>Calculadora de Margem</p>
                  <p style={{ fontSize:12, color:"#6b7280" }}>FaverPix vs Kalshi vs Polymarket</p>
                </div>
              </div>
              <span style={{ color:"#f59e0b", fontSize:16 }}>›</span>
            </div>
          </div>
        )}


        <div style={{ background:"#161922", borderRadius:16, marginBottom:20, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden" }}>
          <div onClick={()=>{ if(editando==="senha") cancelar(); else { setEditando("senha"); setErro(""); setSucesso(""); }}} style={{ padding:"16px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(139,92,246,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🔑</div>
              <div>
                <p style={{ fontSize:11, color:"#6b7280", marginBottom:2, fontWeight:600, letterSpacing:.4 }}>SENHA</p>
                <p style={{ fontSize:14, fontWeight:600, color:"#f9fafb" }}>••••••••</p>
              </div>
            </div>
            <span style={{ color:"#00c896", fontSize:13, fontWeight:600 }}>{editando==="senha" ? "Cancelar" : "Alterar"}</span>
          </div>
          {editando==="senha" && (
            <div className="sd" style={{ padding:"0 18px 18px" }}>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, color:"#9ca3af", fontWeight:700, display:"block", marginBottom:6, letterSpacing:.5 }}>SENHA ATUAL</label>
                <div style={{ position:"relative" }}>
                  <input className="pf-inp" type={showSenhas ? "text" : "password"} value={senhaAtual} onChange={e=>{ setSenhaAtual(e.target.value); setErro(""); }} placeholder="Sua senha atual" style={{ ...inp, paddingRight:46 }} autoFocus/>
                  <button onClick={()=>setShowSenhas(!showSenhas)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:17 }}>{showSenhas ? "🙈" : "👁️"}</button>
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, color:"#9ca3af", fontWeight:700, display:"block", marginBottom:6, letterSpacing:.5 }}>NOVA SENHA</label>
                <input className="pf-inp" type={showSenhas ? "text" : "password"} value={novaSenha} onChange={e=>{ setNovaSenha(e.target.value); setErro(""); }} placeholder="Mínimo 8 caracteres" style={inp}/>
                {novaSenha.length > 0 && (
                  <div style={{ marginTop:6 }}>
                    <div style={{ display:"flex", gap:4, marginBottom:3 }}>
                      {[1,2,3,4].map(n => {
                        const f = novaSenha.length>=12&&/[A-Z]/.test(novaSenha)&&/[0-9]/.test(novaSenha)&&/[^A-Za-z0-9]/.test(novaSenha)?4:novaSenha.length>=8&&/[A-Z]/.test(novaSenha)&&/[0-9]/.test(novaSenha)?3:novaSenha.length>=8?2:1;
                        const c=["#ef4444","#f59e0b","#3b82f6","#00c896"];
                        return <div key={n} style={{ flex:1, height:3, borderRadius:2, background:n<=f?c[f-1]:"rgba(255,255,255,.1)", transition:"background .3s" }}/>;
                      })}
                    </div>
                    <p style={{ fontSize:11, color:novaSenha.length>=8?"#00c896":"#f59e0b" }}>
                      {novaSenha.length<8 ? "Muito curta" : novaSenha.length>=12&&/[A-Z]/.test(novaSenha)&&/[0-9]/.test(novaSenha) ? "Senha forte 💪" : "Senha boa"}
                    </p>
                  </div>
                )}
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11, color:"#9ca3af", fontWeight:700, display:"block", marginBottom:6, letterSpacing:.5 }}>CONFIRMAR NOVA SENHA</label>
                <input className="pf-inp" type={showSenhas ? "text" : "password"} value={confirma} onChange={e=>{ setConfirma(e.target.value); setErro(""); }} placeholder="Repita a nova senha" style={{ ...inp, borderColor: confirma && confirma !== novaSenha ? "#ef4444" : "rgba(255,255,255,0.12)" }}/>
                {confirma && confirma !== novaSenha && <p style={{ fontSize:11, color:"#ef4444", marginTop:4 }}>Senhas não coincidem</p>}
                {confirma && confirma === novaSenha && novaSenha.length >= 8 && <p style={{ fontSize:11, color:"#00c896", marginTop:4 }}>✓ Senhas coincidem</p>}
              </div>
              <button className="pf-btn" onClick={salvarSenha} disabled={loading} style={{ width:"100%", background:loading?"rgba(139,92,246,.4)":"linear-gradient(135deg,#8b5cf6,#6d28d9)", border:"none", color:"#fff", borderRadius:12, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'", animation:loading?"shimmer 1s infinite":"none" }}>
                {loading ? "Salvando..." : "Alterar senha 🔑"}
              </button>
            </div>
          )}
        </div>

        {/* Outras opções */}
        <div style={{ background:"#161922", borderRadius:16, marginBottom:20, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden" }}>
          {[
            { icon:"🔔", label:"Notificações", sub:"Alertas de apostas e resultados" },
            { icon:"🌙", label:"Tema escuro", sub:"Ativado" },
            { icon:"❓", label:"Ajuda e suporte", sub:"Central de ajuda FaverPix" },
            { icon:"📄", label:"Termos de Uso", sub:"Ver termos e privacidade" },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", borderBottom: i < arr.length-1 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{item.icon}</div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, fontWeight:600, color:"#f9fafb" }}>{item.label}</p>
                <p style={{ fontSize:12, color:"#6b7280" }}>{item.sub}</p>
              </div>
              <span style={{ color:"#4b5563", fontSize:14 }}>›</span>
            </div>
          ))}
        </div>

        {/* Sair */}
        {!showLogout ? (
          <button className="pf-btn" onClick={()=>setShowLogout(true)} style={{ width:"100%", background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.2)", color:"#ef4444", borderRadius:14, padding:"15px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'" }}>
            Sair da conta
          </button>
        ) : (
          <div style={{ background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.2)", borderRadius:14, padding:18 }}>
            <p style={{ fontSize:14, color:"#fca5a5", textAlign:"center", marginBottom:14, fontWeight:600 }}>Tem certeza que deseja sair?</p>
            <div style={{ display:"flex", gap:10 }}>
              <button className="pf-btn" onClick={()=>setShowLogout(false)} style={{ flex:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", color:"#9ca3af", borderRadius:10, padding:"12px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Cancelar</button>
              <button className="pf-btn" onClick={onLogout} style={{ flex:1, background:"linear-gradient(135deg,#ef4444,#dc2626)", border:"none", color:"#fff", borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Sair</button>
            </div>
          </div>
        )}

        <p style={{ fontSize:11, color:"#374151", textAlign:"center", marginTop:20 }}>FaverPix v1.0.0 — Todos os direitos reservados</p>
      </div>
    </div>
  );
}

// ── Tela de Afiliados ─────────────────────────────────────────
function AffiliatesScreen({ usuario, userEmail, onBack, desbloqueado }) {
  const [copied, setCopied] = useState(false);
  const [tab,    setTab]    = useState("meu");

  // ── Tela de bloqueio ─ igual ao modelo Kalshi ──────────────
  if (!desbloqueado) return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#0f1117", minHeight:"100vh", maxWidth:480, margin:"0 auto", color:"#f0f2f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <div style={{ background:"#161922", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:16 }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.08)", border:"none", color:"#9ca3af", width:38, height:38, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div><h2 style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:18, color:"#f9fafb" }}>Programa de Afiliados</h2></div>
      </div>
      <div style={{ padding:"60px 28px", textAlign:"center" }}>
        <div style={{ fontSize:72, marginBottom:24 }}>🔒</div>
        <h2 style={{ fontFamily:"'Space Grotesk'", fontSize:22, fontWeight:700, color:"#f9fafb", marginBottom:12 }}>Recurso bloqueado</h2>
        <p style={{ fontSize:15, color:"#6b7280", lineHeight:1.7, marginBottom:24 }}>
          Para acessar o programa de afiliados e gerar seu link exclusivo, você precisa <strong style={{ color:"#f9fafb" }}>realizar pelo menos 1 aposta</strong> na plataforma.
        </p>
        <div style={{ background:"rgba(0,200,150,.08)", border:"1px solid rgba(0,200,150,.2)", borderRadius:16, padding:"20px", marginBottom:28 }}>
          <p style={{ fontSize:13, color:"#9ca3af", marginBottom:14 }}>Como desbloquear:</p>
          {[
            { n:"1", txt:"Escolha qualquer mercado" },
            { n:"2", txt:"Faça sua primeira aposta" },
            { n:"3", txt:"O programa de afiliados é liberado automaticamente" },
          ].map(s=>(
            <div key={s.n} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#00c896,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, color:"#fff", flexShrink:0 }}>{s.n}</div>
              <p style={{ fontSize:14, color:"#9ca3af", textAlign:"left" }}>{s.txt}</p>
            </div>
          ))}
        </div>
        <button onClick={onBack} style={{ background:"linear-gradient(135deg,#00c896,#00a07a)", border:"none", color:"#fff", borderRadius:14, padding:"15px 32px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Space Grotesk'" }}>
          Ir apostar agora
        </button>
        <p style={{ fontSize:11, color:"#4b5563", marginTop:16, lineHeight:1.6 }}>
          Modelo baseado no programa de afiliados do Kalshi — acesso liberado após atividade na plataforma.
        </p>
      </div>
    </div>
  );

  // Gera código de afiliado baseado no email
  const codigoAfiliado = "FP-" + (userEmail||"").split("@")[0].toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);
  const linkAfiliado   = `https://faverpix.com.br/ref/${codigoAfiliado}`;

  // Dados simulados
  const indicados = [
    { nome:"Carlos M.",    data:"10/04/2026", deposito:"R$ 200,00", comissao:"R$ 30,00",  status:"pago" },
    { nome:"Ana Paula S.", data:"08/04/2026", deposito:"R$ 500,00", comissao:"R$ 75,00",  status:"pago" },
    { nome:"João Pedro T.",data:"05/04/2026", deposito:"R$ 100,00", comissao:"R$ 15,00",  status:"pago" },
    { nome:"Maria L.",     data:"02/04/2026", deposito:"R$ 300,00", comissao:"R$ 45,00",  status:"pendente" },
    { nome:"Roberto A.",   data:"01/04/2026", deposito:"—",         comissao:"—",         status:"sem depósito" },
  ];

  const totalIndicados  = indicados.length;
  const totalComissao   = indicados.filter(i=>i.status==="pago").reduce((acc,i)=>acc+parseFloat(i.comissao.replace("R$ ","")||0),0);
  const totalPendente   = indicados.filter(i=>i.status==="pendente").reduce((acc,i)=>acc+parseFloat(i.comissao.replace("R$ ","")||0),0);

  const copiar = () => {
    try { navigator.clipboard.writeText(linkAfiliado); } catch {}
    setCopied(true);
    setTimeout(()=>setCopied(false), 2000);
  };

  const inp = { width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"14px 16px", color:"#f9fafb", fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box" };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#0f1117", minHeight:"100vh", maxWidth:480, margin:"0 auto", color:"#f0f2f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}.aff-btn{transition:all .15s}.aff-btn:active{transform:scale(.97)}@keyframes pop{0%{transform:scale(.8);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}.pop{animation:pop .3s ease}`}</style>

      {/* Header */}
      <div style={{ background:"#161922", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:16, position:"sticky", top:0, zIndex:10 }}>
        <button onClick={onBack} className="aff-btn" style={{ background:"rgba(255,255,255,.08)", border:"none", color:"#9ca3af", width:38, height:38, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div>
          <h2 style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:18, color:"#f9fafb" }}>Programa de Afiliados</h2>
          <p style={{ fontSize:12, color:"#6b7280" }}>Indique e ganhe 15% sobre depósitos</p>
        </div>
      </div>

      <div style={{ padding:"20px 16px 100px" }}>

        {/* Banner hero */}
        <div style={{ background:"linear-gradient(135deg,#00c896,#3b82f6)", borderRadius:20, padding:"24px 20px", marginBottom:20, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,.1)" }}/>
          <div style={{ position:"absolute", bottom:-20, left:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,.08)" }}/>
          <p style={{ fontSize:12, color:"rgba(255,255,255,.8)", fontWeight:600, marginBottom:6, letterSpacing:.5 }}>VOCÊ GANHA</p>
          <h1 style={{ fontFamily:"'Space Grotesk'", fontSize:36, fontWeight:700, color:"#fff", letterSpacing:-1, marginBottom:4 }}>15%</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,.85)", marginBottom:8 }}>sobre cada depósito dos seus indicados</p>
          {/* Duplo-sided */}
          <div style={{ background:"rgba(255,255,255,.15)", borderRadius:10, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ textAlign:"center" }}>
              <p style={{ fontSize:11, color:"rgba(255,255,255,.7)", marginBottom:2 }}>Você recebe</p>
              <p style={{ fontFamily:"'Space Grotesk'", fontSize:18, fontWeight:700, color:"#fff" }}>15%</p>
              <p style={{ fontSize:10, color:"rgba(255,255,255,.6)" }}>do depósito</p>
            </div>
            <div style={{ fontSize:20 }}>🤝</div>
            <div style={{ textAlign:"center" }}>
              <p style={{ fontSize:11, color:"rgba(255,255,255,.7)", marginBottom:2 }}>Seu amigo ganha</p>
              <p style={{ fontFamily:"'Space Grotesk'", fontSize:18, fontWeight:700, color:"#fff" }}>R$ 10</p>
              <p style={{ fontSize:10, color:"rgba(255,255,255,.6)" }}>bônus na conta</p>
            </div>
          </div>
        </div>

        {/* Cards de resumo */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
          {[
            { icon:"👥", label:"Indicados", valor:totalIndicados, color:"#3b82f6" },
            { icon:"✅", label:"Recebido", valor:`R$ ${totalComissao.toFixed(0)}`, color:"#00c896" },
            { icon:"⏳", label:"Pendente", valor:`R$ ${totalPendente.toFixed(0)}`, color:"#f59e0b" },
          ].map(item => (
            <div key={item.label} style={{ background:"#161922", borderRadius:14, padding:"14px 12px", border:"1px solid rgba(255,255,255,.07)", textAlign:"center" }}>
              <span style={{ fontSize:22 }}>{item.icon}</span>
              <p style={{ fontFamily:"'Space Grotesk'", fontSize:18, fontWeight:700, color:item.color, marginTop:6, marginBottom:2 }}>{item.valor}</p>
              <p style={{ fontSize:11, color:"#6b7280" }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Seu link */}
        <div style={{ background:"#161922", borderRadius:16, padding:18, marginBottom:16, border:"1px solid rgba(255,255,255,.07)" }}>
          <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:12 }}>SEU CÓDIGO DE AFILIADO</p>
          <div style={{ background:"rgba(0,200,150,.08)", border:"1px solid rgba(0,200,150,.2)", borderRadius:12, padding:"12px 16px", marginBottom:10, textAlign:"center" }}>
            <p style={{ fontFamily:"'Space Grotesk'", fontSize:22, fontWeight:700, color:"#00c896", letterSpacing:2 }}>{codigoAfiliado}</p>
          </div>
          <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:8 }}>SEU LINK</p>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <input readOnly value={linkAfiliado} style={{ ...inp, flex:1, fontSize:12, color:"#6b7280", cursor:"default" }}/>
            <button className="aff-btn" onClick={copiar} style={{ background:copied?"linear-gradient(135deg,#00c896,#00a07a)":"rgba(0,200,150,.12)", border:"1px solid rgba(0,200,150,.3)", borderRadius:10, padding:"13px 14px", cursor:"pointer", color:"#00c896", fontSize:18, flexShrink:0 }}>
              {copied ? "✓" : "📋"}
            </button>
          </div>
          {copied && <p className="pop" style={{ fontSize:12, color:"#00c896", textAlign:"center", marginTop:8 }}>Link copiado! ✅</p>}
        </div>

        {/* Compartilhar */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
          {[
            { icon:"💬", label:"WhatsApp", color:"#25d366", bg:"rgba(37,211,102,.1)" },
            { icon:"📸", label:"Instagram", color:"#e1306c", bg:"rgba(225,48,108,.1)" },
            { icon:"📘", label:"Facebook",  color:"#1877f2", bg:"rgba(24,119,242,.1)" },
            { icon:"✈️", label:"Telegram",  color:"#2ca5e0", bg:"rgba(44,165,224,.1)" },
          ].map(s=>(
            <button key={s.label} className="aff-btn" style={{ background:s.bg, border:`1px solid ${s.color}44`, borderRadius:12, padding:"12px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>{s.icon}</span>
              <span style={{ fontSize:13, fontWeight:600, color:s.color }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Tabs histórico */}
        <div style={{ display:"flex", background:"rgba(255,255,255,.05)", borderRadius:12, padding:4, marginBottom:16, border:"1px solid rgba(255,255,255,.07)" }}>
          {[["meu","Meus Indicados"],["como","Como funciona"]].map(([t,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"10px", border:"none", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"'DM Sans'", background:tab===t?"linear-gradient(135deg,#00c896,#00a07a)":"transparent", color:tab===t?"#fff":"#6b7280", transition:"all .2s" }}>{label}</button>
          ))}
        </div>

        {/* Lista de indicados */}
        {tab==="meu" && (
          <div>
            {indicados.map((ind, i) => (
              <div key={i} style={{ background:"#161922", borderRadius:12, padding:"14px 16px", marginBottom:8, border:"1px solid rgba(255,255,255,.07)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,rgba(0,200,150,.2),rgba(59,130,246,.2))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#f9fafb" }}>
                    {ind.nome.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:600, color:"#f9fafb" }}>{ind.nome}</p>
                    <p style={{ fontSize:11, color:"#6b7280" }}>{ind.data}</p>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:14, fontWeight:700, color: ind.status==="pago"?"#00c896":ind.status==="pendente"?"#f59e0b":"#6b7280" }}>{ind.comissao}</p>
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20,
                    background: ind.status==="pago"?"rgba(0,200,150,.15)":ind.status==="pendente"?"rgba(245,158,11,.15)":"rgba(255,255,255,.06)",
                    color: ind.status==="pago"?"#00c896":ind.status==="pendente"?"#f59e0b":"#6b7280",
                    border: `1px solid ${ind.status==="pago"?"rgba(0,200,150,.3)":ind.status==="pendente"?"rgba(245,158,11,.3)":"rgba(255,255,255,.1)"}`,
                  }}>{ind.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Como funciona */}
        {tab==="como" && (
          <div>
            {[
              { n:"1", title:"Compartilhe seu link", desc:"Envie seu link exclusivo para amigos pelo WhatsApp, Instagram ou qualquer rede social.", icon:"🔗" },
              { n:"2", title:"Amigo se cadastra", desc:"Seu amigo acessa o FaverPix pelo seu link e cria uma conta gratuitamente.", icon:"👤" },
              { n:"3", title:"Amigo faz depósito", desc:"Quando seu indicado fizer o primeiro depósito, você recebe 15% do valor automaticamente. Seu amigo ainda ganha R$10 de bônus!", icon:"💰" },
              { n:"4", title:"Você recebe", desc:"A comissão é creditada na sua carteira em até 24h. Saque via Pix quando quiser!", icon:"✅" },
            ].map(step => (
              <div key={step.n} style={{ background:"#161922", borderRadius:14, padding:"16px", marginBottom:10, border:"1px solid rgba(255,255,255,.07)", display:"flex", gap:14 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradient(135deg,#00c896,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:18, color:"#fff", flexShrink:0 }}>{step.n}</div>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:"#f9fafb", marginBottom:4 }}>{step.icon} {step.title}</p>
                  <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}

            {/* Tabela de exemplo */}
            <div style={{ background:"#161922", borderRadius:14, padding:"16px", marginTop:6, border:"1px solid rgba(255,255,255,.07)" }}>
              <p style={{ fontSize:12, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:12 }}>SIMULAÇÃO DE GANHOS</p>
              {[
                { indicados:"5 indicados",  deposito:"R$ 100 cada", ganho:"R$ 75",   custo:"R$ 50" },
                { indicados:"10 indicados", deposito:"R$ 200 cada", ganho:"R$ 300",  custo:"R$ 100" },
                { indicados:"20 indicados", deposito:"R$ 500 cada", ganho:"R$ 1.500",custo:"R$ 200" },
                { indicados:"50 indicados", deposito:"R$ 200 cada", ganho:"R$ 1.500",custo:"R$ 500" },
              ].map((row, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:8, padding:"10px 0", borderBottom: i<3?"1px solid rgba(255,255,255,.05)":"none", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:"#9ca3af" }}>{row.indicados} · {row.deposito}</span>
                  <span style={{ fontSize:11, color:"#ef4444" }}>-{row.custo} bônus</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"#00c896" }}>{row.ganho}</span>
                </div>
              ))}
              <div style={{ marginTop:10, padding:"8px 0", borderTop:"1px solid rgba(255,255,255,.05)" }}>
                <p style={{ fontSize:11, color:"#4b5563", lineHeight:1.6 }}>* Custo = R$10 de bônus para cada indicado que se cadastrar. Comissão de 15% é sempre maior que o custo do bônus a partir do 1º depósito.</p>
              </div>
            </div>

            <div style={{ background:"rgba(59,130,246,.08)", border:"1px solid rgba(59,130,246,.2)", borderRadius:12, padding:"12px 16px", marginTop:12, display:"flex", gap:10 }}>
              <span style={{ fontSize:16 }}>ℹ️</span>
              <p style={{ fontSize:12, color:"#9ca3af", lineHeight:1.6 }}>Comissões são pagas sobre o <strong style={{ color:"#f9fafb" }}>primeiro depósito</strong> de cada indicado. Sem limite de indicações!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Calculadora de Margem ─────────────────────────────────────
// Fórmulas baseadas nas fontes oficiais pesquisadas abr/2026:
// Kalshi:     fee = 0.07 × p × (1-p) por contrato  (Sacra.com, breakevenpointcalculator.com)
// Polymarket: fee = θ × C × p × (1-p)  θ=0.05 geral, 0.072 cripto  (docs.polymarket.com)
// FaverPix:   fee = 0.05 × p × (1-p)  — mesmo modelo Polymarket (geral)
// Sportsbook: taxa implícita via vig/juice 7-10% (media do mercado BR)

function MargemScreen({ onBack }) {
  const [aposta, setAposta] = useState("100");
  const [prob,   setProb]   = useState("50");
  const [cat,    setCat]    = useState("esportes"); // categoria

  const v = parseFloat(aposta) || 0;
  const p = Math.min(0.99, Math.max(0.01, parseFloat(prob)/100));

  // ── Fórmulas reais ─────────────────────────────────────────
  // Kalshi: $0.07 × p × (1-p) por contrato, arredondado para cima ao centavo
  const kalshiFee = () => {
    const feePerContrato = 0.07 * p * (1-p); // em USD
    const feeBRL = feePerContrato * 6.0; // cotação USD→BRL
    return v * feeBRL; // escala pelo valor apostado
  };

  // Polymarket: θ × C × p × (1-p) onde θ depende da categoria
  const polyTheta = { esportes: 0.03, politica: 0.05, cripto: 0.072, cultura: 0.05 };
  const polyFee = () => {
    const theta = polyTheta[cat] || 0.05;
    return v * theta * p * (1-p);
  };

  // FaverPix: θ=0.05 — mesmo modelo Polymarket geral, cobre afiliados
  const favePixFee = () => v * 0.05 * p * (1-p);

  // Sportsbook tradicional BR: vig embutida ~8% sobre o valor (média)
  const sportsbookFee = () => v * 0.08;

  const taxas = {
    faverpix:   { nome:"FaverPix 🇧🇷",   fee: favePixFee(),   cor:"#00c896", theta:"0.05" },
    kalshi:     { nome:"Kalshi 🇺🇸",      fee: kalshiFee(),    cor:"#3b82f6", theta:"0.07" },
    polymarket: { nome:"Polymarket 🌐",   fee: polyFee(),      cor:"#8b5cf6", theta: polyTheta[cat].toFixed(3) },
    sportsbook: { nome:"Casa Tradicional",fee: sportsbookFee(),cor:"#ef4444", theta:"0.08" },
  };

  const fp      = taxas.faverpix;
  const retorno = v / p; // retorno bruto se ganhar
  const lucroFP = retorno - v - fp.fee;
  const roiFP   = v > 0 ? ((lucroFP / v)*100).toFixed(1) : 0;
  const economiaSB = Math.max(0, sportsbookFee() - favePixFee());

  // Taxa efetiva % = fee / valor_apostado
  const taxaEfetiva = (fee) => v > 0 ? ((fee/v)*100).toFixed(2) : "0.00";

  const cats = [
    ["esportes","⚽ Esportes"],
    ["politica","🗳️ Política"],
    ["cripto","₿ Cripto"],
    ["cultura","🎭 Cultura"],
  ];

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#0f1117", minHeight:"100vh", maxWidth:480, margin:"0 auto", color:"#f0f2f5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}.mg-btn{transition:all .15s}.mg-btn:active{transform:scale(.97)}input[type=range]{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;background:rgba(255,255,255,.1);outline:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#00c896;cursor:pointer;border:2px solid #fff}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}`}</style>

      {/* Header */}
      <div style={{ background:"#161922", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", gap:16, position:"sticky", top:0, zIndex:10 }}>
        <button onClick={onBack} className="mg-btn" style={{ background:"rgba(255,255,255,.08)", border:"none", color:"#9ca3af", width:38, height:38, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <div>
          <h2 style={{ fontFamily:"'Space Grotesk'", fontWeight:700, fontSize:18, color:"#f9fafb" }}>Calculadora de Margem</h2>
          <p style={{ fontSize:12, color:"#6b7280" }}>Fórmulas reais dos concorrentes</p>
        </div>
      </div>

      <div style={{ padding:"20px 16px 100px" }}>

        {/* Aviso: modelo correto */}
        <div style={{ background:"rgba(0,200,150,.08)", border:"1px solid rgba(0,200,150,.2)", borderRadius:14, padding:"14px 16px", marginBottom:20, display:"flex", gap:10 }}>
          <span style={{ fontSize:20 }}>🎯</span>
          <div>
            <p style={{ fontSize:13, fontWeight:700, color:"#f9fafb", marginBottom:4 }}>Fórmula exata dos concorrentes</p>
            <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.6 }}>
              Kalshi e Polymarket usam <strong style={{ color:"#f9fafb" }}>fee = θ × valor × p × (1-p)</strong> — a taxa é máxima quando p=50% e quase zero nos extremos. FaverPix usa θ=0.05 — igual ao Polymarket geral, cobre custo de afiliados.
            </p>
          </div>
        </div>

        {/* Categoria */}
        <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:10 }}>CATEGORIA DA APOSTA</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
          {cats.map(([key, label]) => (
            <button key={key} className="mg-btn" onClick={()=>setCat(key)} style={{ padding:"10px", borderRadius:12, cursor:"pointer", background:cat===key?"rgba(0,200,150,.12)":"rgba(255,255,255,.04)", border:cat===key?"1px solid #00c896":"1px solid rgba(255,255,255,.1)", color:cat===key?"#00c896":"#6b7280", fontSize:13, fontWeight:cat===key?700:500, transition:"all .2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Valor */}
        <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:8 }}>VALOR DA APOSTA</p>
        <div style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:12, padding:"12px 16px", marginBottom:10 }}>
          <span style={{ fontSize:16, color:"#6b7280", marginRight:8, fontWeight:700 }}>R$</span>
          <input type="number" value={aposta} onChange={e=>setAposta(e.target.value)} style={{ background:"none", border:"none", color:"#f9fafb", fontSize:22, fontWeight:700, flex:1, outline:"none", fontFamily:"'Space Grotesk'" }}/>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {[50,100,500,1000].map(a=>(
            <button key={a} className="mg-btn" onClick={()=>setAposta(String(a))} style={{ flex:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", color:"#9ca3af", borderRadius:8, padding:"7px 0", fontSize:12, fontWeight:600, cursor:"pointer" }}>R${a}</button>
          ))}
        </div>

        {/* Probabilidade */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5 }}>PROBABILIDADE DO EVENTO</p>
            <span style={{ fontFamily:"'Space Grotesk'", fontSize:16, fontWeight:700, color:"#3b82f6" }}>{prob}%</span>
          </div>
          <input type="range" min="1" max="99" value={prob} onChange={e=>setProb(e.target.value)}
            style={{ accentColor:"#00c896" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
            <span style={{ fontSize:10, color:"#4b5563" }}>1% · Taxa mínima</span>
            <span style={{ fontSize:10, color:"#ef4444", fontWeight:600 }}>50% · Taxa MÁXIMA</span>
            <span style={{ fontSize:10, color:"#4b5563" }}>99% · Taxa mínima</span>
          </div>
          {/* Aviso pico */}
          {parseFloat(prob) >= 45 && parseFloat(prob) <= 55 && (
            <div style={{ marginTop:8, background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.2)", borderRadius:8, padding:"8px 12px" }}>
              <p style={{ fontSize:11, color:"#fca5a5" }}>⚠️ Probabilidade próxima de 50% = taxa máxima para todos os modelos</p>
            </div>
          )}
        </div>

        {/* Resultado FaverPix destacado */}
        <div style={{ background:"linear-gradient(135deg,rgba(0,200,150,.15),rgba(59,130,246,.1))", border:"1px solid rgba(0,200,150,.3)", borderRadius:16, padding:20, marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <p style={{ fontFamily:"'Space Grotesk'", fontSize:16, fontWeight:700, color:"#00c896" }}>🇧🇷 FaverPix</p>
            <div style={{ background:"rgba(0,200,150,.2)", borderRadius:20, padding:"3px 10px" }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#00c896" }}>θ = 0.05 · {taxaEfetiva(fp.fee)}% efetivo</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            {[
              { label:"Valor apostado",   valor:`R$ ${v.toFixed(2)}`,          cor:"#f9fafb" },
              { label:"Nossa taxa",       valor:`R$ ${fp.fee.toFixed(2)}`,      cor:"#ef4444" },
              { label:"Retorno (se ganhar)", valor:`R$ ${retorno.toFixed(2)}`, cor:"#f9fafb" },
              { label:"Lucro líquido",   valor:`R$ ${lucroFP.toFixed(2)}`,     cor: lucroFP>0?"#00c896":"#ef4444" },
            ].map(item=>(
              <div key={item.label} style={{ background:"rgba(255,255,255,.06)", borderRadius:10, padding:"10px 12px" }}>
                <p style={{ fontSize:11, color:"#6b7280", marginBottom:3 }}>{item.label}</p>
                <p style={{ fontFamily:"'Space Grotesk'", fontSize:15, fontWeight:700, color:item.cor }}>{item.valor}</p>
              </div>
            ))}
          </div>
          <div style={{ background:"rgba(255,255,255,.05)", borderRadius:10, padding:"10px 14px", display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:13, color:"#9ca3af" }}>ROI se ganhar</span>
            <span style={{ fontFamily:"'Space Grotesk'", fontSize:16, fontWeight:700, color: parseFloat(roiFP)>0?"#00c896":"#ef4444" }}>{roiFP}%</span>
          </div>
        </div>

        {/* Comparação completa */}
        <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:10 }}>COMPARAÇÃO — TAXA POR PLATAFORMA</p>
        <div style={{ background:"#161922", borderRadius:16, border:"1px solid rgba(255,255,255,.07)", overflow:"hidden", marginBottom:16 }}>
          {/* Header da tabela */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:8, padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,.05)", background:"rgba(255,255,255,.03)" }}>
            <span style={{ fontSize:10, color:"#4b5563", fontWeight:700 }}>PLATAFORMA</span>
            <span style={{ fontSize:10, color:"#4b5563", fontWeight:700, textAlign:"right" }}>θ</span>
            <span style={{ fontSize:10, color:"#4b5563", fontWeight:700, textAlign:"right" }}>TAXA EFETIVA</span>
            <span style={{ fontSize:10, color:"#4b5563", fontWeight:700, textAlign:"right" }}>COBRADO</span>
          </div>
          {Object.entries(taxas).map(([key, m], i, arr) => (
            <div key={key} style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:8, padding:"12px 16px", borderBottom: i<arr.length-1?"1px solid rgba(255,255,255,.05)":"none", background: key==="faverpix"?"rgba(0,200,150,.04)":"transparent" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:m.cor, flexShrink:0 }}/>
                <span style={{ fontSize:13, fontWeight: key==="faverpix"?700:500, color: key==="faverpix"?m.cor:"#9ca3af" }}>{m.nome}</span>
              </div>
              <span style={{ fontSize:12, color:"#6b7280", textAlign:"right", fontFamily:"'Space Grotesk'" }}>{m.theta}</span>
              <span style={{ fontSize:12, color: key==="faverpix"?"#00c896":"#9ca3af", textAlign:"right", fontWeight: key==="faverpix"?700:400 }}>{taxaEfetiva(m.fee)}%</span>
              <span style={{ fontSize:13, fontWeight:700, color:m.cor, textAlign:"right" }}>-R$ {m.fee.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Gráfico visual de barras */}
        <p style={{ fontSize:11, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:10 }}>VISUALIZAÇÃO DA TAXA</p>
        <div style={{ background:"#161922", borderRadius:16, padding:16, border:"1px solid rgba(255,255,255,.07)", marginBottom:16 }}>
          {Object.entries(taxas).map(([key, m]) => {
            const maxFee = sportsbookFee();
            const pct = maxFee > 0 ? (m.fee / maxFee) * 100 : 0;
            return (
              <div key={key} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color: key==="faverpix"?m.cor:"#9ca3af", fontWeight: key==="faverpix"?700:400 }}>{m.nome}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:m.cor }}>R$ {m.fee.toFixed(2)}</span>
                </div>
                <div style={{ height:8, background:"rgba(255,255,255,.06)", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.max(2,pct)}%`, background:m.cor, borderRadius:4, transition:"width .6s ease" }}/>
                </div>
              </div>
            );
          })}
          <p style={{ fontSize:11, color:"#4b5563", marginTop:8, textAlign:"center" }}>Barras proporcionais ao valor cobrado por R$ {v} apostados</p>
        </div>

        {/* Economia vs casa */}
        <div style={{ background:"rgba(0,200,150,.06)", border:"1px solid rgba(0,200,150,.15)", borderRadius:14, padding:"16px", marginBottom:16 }}>
          <p style={{ fontSize:12, color:"#6b7280", fontWeight:700, letterSpacing:.5, marginBottom:10 }}>💰 VANTAGEM DO FAVERPIX vs CASA TRADICIONAL</p>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ fontSize:13, color:"#6b7280", marginBottom:3 }}>Casa cobra: <span style={{ color:"#ef4444" }}>R$ {sportsbookFee().toFixed(2)}</span></p>
              <p style={{ fontSize:13, color:"#6b7280" }}>FaverPix cobra: <span style={{ color:"#00c896" }}>R$ {favePixFee().toFixed(2)}</span></p>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:11, color:"#6b7280", marginBottom:2 }}>Você economiza</p>
              <p style={{ fontFamily:"'Space Grotesk'", fontSize:24, fontWeight:700, color:"#00c896" }}>R$ {economiaSB.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Fórmula explicada */}
        <div style={{ background:"rgba(59,130,246,.06)", border:"1px solid rgba(59,130,246,.15)", borderRadius:14, padding:"16px", marginBottom:16 }}>
          <p style={{ fontSize:12, color:"#6b7280", fontWeight:700, letterSpacing:.5, marginBottom:10 }}>📐 FÓRMULA USADA</p>
          <div style={{ background:"rgba(0,0,0,.3)", borderRadius:10, padding:"12px 14px", marginBottom:10, fontFamily:"'Space Grotesk'", fontSize:14 }}>
            <p style={{ color:"#00c896", marginBottom:4 }}>fee = θ × valor × p × (1−p)</p>
            <p style={{ color:"#6b7280", fontSize:11 }}>onde p = probabilidade do evento (0.01 a 0.99)</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[
              { nome:"FaverPix",    theta:"θ = 0.05", cor:"#00c896",  nota:"= Polymarket" },
              { nome:"Polymarket",  theta:`θ = ${polyTheta[cat]}`, cor:"#8b5cf6", nota:"Por categoria" },
              { nome:"Kalshi",      theta:"θ = 0.07", cor:"#3b82f6",  nota:"Fórmula oficial" },
              { nome:"Sportsbook",  theta:"θ = 0.08", cor:"#ef4444",  nota:"Vig embutida" },
            ].map(item=>(
              <div key={item.nome} style={{ background:"rgba(255,255,255,.03)", borderRadius:10, padding:"10px 12px" }}>
                <p style={{ fontSize:11, color:item.cor, fontWeight:700, marginBottom:3 }}>{item.nome}</p>
                <p style={{ fontFamily:"'Space Grotesk'", fontSize:13, color:"#f9fafb", fontWeight:700 }}>{item.theta}</p>
                <p style={{ fontSize:10, color:"#4b5563", marginTop:2 }}>{item.nota}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CAC Break-even */}
        <div style={{ background:"rgba(59,130,246,.06)", border:"1px solid rgba(59,130,246,.15)", borderRadius:14, padding:"16px", marginBottom:16 }}>
          <p style={{ fontSize:12, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:12 }}>🎯 CUSTO DE AQUISIÇÃO (CAC) vs RECEITA</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            {[
              { label:"Bônus boas-vindas",   valor:"R$ 10,00", cor:"#ef4444", desc:"pago 1x ao novo" },
              { label:"Bônus afiliado (15%)",  valor:"R$ 30,00", cor:"#ef4444", desc:"sobre dep. R$200" },
              { label:"CAC total",            valor:"R$ 40,00", cor:"#f59e0b", desc:"por usuário via ref." },
              { label:"Payback em apostas",   valor:"~16 apostas", cor:"#00c896", desc:"de R$200 cada" },
            ].map(item=>(
              <div key={item.label} style={{ background:"rgba(255,255,255,.04)", borderRadius:10, padding:"10px 12px" }}>
                <p style={{ fontSize:10, color:"#6b7280", marginBottom:2 }}>{item.label}</p>
                <p style={{ fontFamily:"'Space Grotesk'", fontSize:14, fontWeight:700, color:item.cor }}>{item.valor}</p>
                <p style={{ fontSize:10, color:"#4b5563", marginTop:2 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background:"rgba(0,200,150,.08)", borderRadius:10, padding:"10px 14px" }}>
            <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.7 }}>
              <strong style={{ color:"#f9fafb" }}>Cálculo:</strong> usuário apostando R$200 com p=50%: taxa = R$200 × 0.05 × 0.25 = <strong style={{ color:"#00c896" }}>R$2,50/aposta</strong>. CAC de R$40 é pago com <strong style={{ color:"#00c896" }}>16 apostas</strong> — típico em 1–2 semanas de uso ativo.
            </p>
          </div>
        </div>

        {/* Por que θ=0.03 não dá prejuízo */}
        <div style={{ background:"rgba(255,255,255,.03)", borderRadius:14, padding:"16px", border:"1px solid rgba(255,255,255,.06)" }}>
          <p style={{ fontSize:12, color:"#9ca3af", fontWeight:700, letterSpacing:.5, marginBottom:10 }}>✅ POR QUE θ = 0.05 COBRE OS AFILIADOS</p>
          {[
            { ico:"📊", txt:"Taxa máxima em p=50%: " + (v * 0.05 * 0.25).toFixed(2) + " BRL por R$" + v + " apostados (0.75%)" },
            { ico:"💸", txt:"A taxa é cobrada sobre AMBOS os lados do mercado (SIM e NÃO)" },
            { ico:"📈", txt:"Com volume de R$1M/dia → R$12.500 de receita diária (θ=0.05, p=50%)" },
            { ico:"🔄", txt:"Modelo exchange: FaverPix não perde quando usuário ganha — nunca há risco de prejuízo na plataforma" },
            { ico:"🤝", txt:"Afiliados: 15% sobre depósito = custo de aquisição, coberto pelo volume de apostas do usuário" },
          ].map((item,i)=>(
            <div key={i} style={{ display:"flex", gap:10, marginBottom:8 }}>
              <span style={{ fontSize:16 }}>{item.ico}</span>
              <p style={{ fontSize:12, color:"#6b7280", lineHeight:1.6 }}>{item.txt}</p>
            </div>
          ))}
        </div>

        {/* Fontes */}
        <div style={{ marginTop:16, padding:"12px 0" }}>
          <p style={{ fontSize:10, color:"#374151", lineHeight:1.8 }}>
            Fontes: Sacra.com (Kalshi revenue model) · docs.polymarket.com (fee schedule abr/2026) · breakevenpointcalculator.com · dimers.com/kalshi/fees
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [screen,      setScreen]      = useState("auth");
  const [usuario,     setUsuario]     = useState(null);
  const [userEmail,   setUserEmail]   = useState(null);
  const [adminMode,   setAdminMode]   = useState(false);
  const [apostou,     setApostou]     = useState(false);
  const [showBonus,   setShowBonus]   = useState(false);  // modal bônus boas-vindas
  const [toastMsg,    setToastMsg]    = useState("");      // toast de notificação
  const [xp,          setXp]          = useState(0);
  const [saldo,       setSaldo]       = useState(500.00);
  const [showAdmin,   setShowAdmin]   = useState(false);
  const [activeTab,   setActiveTab]   = useState("Em Alta");
  const [activeNav,   setActiveNav]   = useState("Mercados");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [selectedMarket,  setSelectedMarket]  = useState(null);
  const [selectedOption,  setSelectedOption]  = useState(null);
  const [betAmount,   setBetAmount]   = useState("");
  const [betSide,     setBetSide]     = useState("SIM");

  const handleLogin = (nome, email, isNew) => {
    setUsuario(nome); setUserEmail(email); setAdminMode(isAdmin(email));
    const pts = getPontos(email); setXp(pts);
    setScreen("home");
    if (isNew) { setTimeout(()=>setShowBonus(true), 600); }
  };
  const openMarket  = (market, option) => { setSelectedMarket(market); setSelectedOption(option); setBetAmount(""); setBetSide("SIM"); };
  const closeModal  = (apostouDeVerdade) => {
    setSelectedMarket(null); setSelectedOption(null);
    if (apostouDeVerdade) {
      setApostou(true);
      const pts = addPontos(userEmail, 10); // +10 XP por aposta
      setXp(pts);
    }
  };

  const potentialReturn = betAmount
    ? betSide==="SIM"
      ? ((parseFloat(betAmount)/(selectedOption?.prob/100))*0.95).toFixed(2)
      : ((parseFloat(betAmount)/(1-selectedOption?.prob/100))*0.95).toFixed(2)
    : "0.00";

  const filtered = useMemo(()=>{
    const base = activeTab==="Cripto" ? [] : filterMarkets(activeTab);
    if (!searchQuery || activeTab==="Cripto") return base;
    return base.filter(m=>m.title.toLowerCase().includes(searchQuery.toLowerCase())||m.tag.toLowerCase().includes(searchQuery.toLowerCase()));
  },[activeTab, searchQuery]);

  if (screen==="auth")       return <AuthScreen onLogin={handleLogin} onPreview={()=>setScreen("preview")}/>;
  if (screen==="preview")    return <PreviewScreen onLogin={()=>setScreen("auth")} onSignup={()=>setScreen("auth")}/>;
  if (screen==="payments")   return <PaymentsScreen onBack={()=>setScreen("home")} saldo={saldo} setSaldo={setSaldo}/>;
  if (screen==="afiliados")  return <AffiliatesScreen usuario={usuario} userEmail={userEmail} onBack={()=>setScreen("perfil")} desbloqueado={apostou || adminMode}/>;
  if (screen==="margem")     return <MargemScreen onBack={()=>setScreen("home")}/>;
  if (screen==="perfil")     return (
    <ProfileScreen
      usuario={usuario}
      adminMode={adminMode}
      onBack={()=>setScreen("home")}
      onUpdate={(novoNome, novoEmail) => { setUsuario(novoNome); setUserEmail(novoEmail); }}
      onLogout={()=>{ setScreen("auth"); setUsuario(null); setAdminMode(false); }}
      onGoAfiliados={()=>setScreen("afiliados")}
      onGoMargem={()=>setScreen("margem")}
      userEmail={userEmail}
    />
  );
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:"#0f1117",minHeight:"100vh",color:"#f0f2f5",maxWidth:480,margin:"0 auto",position:"relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{display:none}.ts{overflow-x:auto;scrollbar-width:none}.mc{transition:transform .15s;cursor:pointer}.mc:active{transform:scale(.98)}.bb{transition:all .15s}.bb:active{transform:scale(.96)}.or{transition:background .15s;cursor:pointer}.or:hover{background:rgba(255,255,255,.04)!important}.ov{animation:fadeIn .2s ease}.md{animation:slideUp .25s cubic-bezier(.34,1.56,.64,1)}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@keyframes pop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}.ld{animation:pulse 1.5s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}.pb{transition:width .6s cubic-bezier(.4,0,.2,1)}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}.srch{transition:all .3s ease}.srch:focus{outline:none;border-color:#00c896!important;box-shadow:0 0 0 3px rgba(0,200,150,.15)}`}</style>

      {/* Header */}
      <div style={{ background:"linear-gradient(180deg,#161922 0%,#0f1117 100%)",padding:"14px 20px 0",borderBottom:"1px solid rgba(255,255,255,.06)",position:"sticky",top:0,zIndex:10 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>📈</div>
            <span style={{ fontFamily:"'Space Grotesk'",fontWeight:700,fontSize:20,color:"#00c896",letterSpacing:-.5 }}>Faver<span style={{ color:"#3b82f6" }}>Pix</span></span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            {/* 🔍 Search toggle */}
            <button onClick={()=>setSearchOpen(!searchOpen)} style={{ background:"rgba(255,255,255,.08)",border:"none",color:"#9ca3af",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>🔍</button>
            <button onClick={()=>setScreen("payments")} style={{ background:"rgba(0,200,150,.12)",border:"1px solid rgba(0,200,150,.25)",borderRadius:20,padding:"5px 12px",fontSize:13,fontWeight:600,color:"#00c896",cursor:"pointer",position:"relative" }}>
              R$ {saldo.toFixed(2)}
              {saldo > 500 && <span style={{ position:"absolute",top:-6,right:-6,background:"#f59e0b",borderRadius:"50%",width:14,height:14,fontSize:9,fontWeight:700,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center" }}>+</span>}
            </button>
            <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#00c896,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer" }}>{usuario?.charAt(0).toUpperCase()}</div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div style={{ marginBottom:10 }}>
            <input className="srch" autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
              placeholder={activeTab==="Cripto"?"Buscar criptomoeda (ex: BTC, Ethereum)...":"Buscar mercado, time, candidato..."}
              style={{ width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.15)",borderRadius:12,padding:"11px 16px",color:"#f9fafb",fontSize:14,fontFamily:"'DM Sans',sans-serif" }}
            />
            {searchQuery && <button onClick={()=>setSearchQuery("")} style={{ background:"none",border:"none",color:"#6b7280",fontSize:12,cursor:"pointer",marginTop:4 }}>✕ Limpar</button>}
          </div>
        )}

        {/* Greeting */}
        <p style={{ fontSize:13,color:"#6b7280",marginBottom:adminMode?8:10 }}>
          Olá, <span style={{ color:"#f9fafb",fontWeight:600 }}>{usuario}</span>
          {adminMode && <span style={{ marginLeft:8,fontSize:11,fontWeight:700,color:"#f59e0b",background:"rgba(245,158,11,.15)",border:"1px solid rgba(245,158,11,.3)",borderRadius:20,padding:"2px 8px" }}>👑 ADMIN</span>}
          {" "}👋
        </p>

        {/* Admin panel */}
        {adminMode && (
          <div onClick={()=>setShowAdmin(!showAdmin)} style={{ background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",borderRadius:12,padding:"10px 14px",marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontSize:16 }}>👑</span><span style={{ fontSize:13,fontWeight:700,color:"#f59e0b" }}>Painel Administrativo</span></div>
            <span style={{ color:"#f59e0b" }}>{showAdmin?"▲":"▼"}</span>
          </div>
        )}
        {adminMode && showAdmin && (
          <div style={{ background:"#1a1a0f",border:"1px solid rgba(245,158,11,.2)",borderRadius:12,padding:14,marginBottom:8 }}>
            <p style={{ fontSize:11,color:"#9ca3af",marginBottom:10,fontWeight:700,letterSpacing:.5 }}>AÇÕES ADMIN</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {[["➕","Novo Mercado"],["👥","Usuários"],["💰","Saques"],["📊","Relatórios"],["⚙️","Config"],["🚫","Suspender"]].map(([icon,label])=>(
                <button key={label} style={{ background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:"#f59e0b",fontSize:12,fontWeight:600,fontFamily:"'DM Sans'" }}>{icon} {label}</button>
              ))}
              <button onClick={()=>setScreen("margem")} style={{ background:"rgba(0,200,150,.1)",border:"1px solid rgba(0,200,150,.2)",borderRadius:10,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:"#00c896",fontSize:12,fontWeight:600,fontFamily:"'DM Sans'" }}>📐 Calculadora Margem</button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="ts" style={{ display:"flex",gap:0 }}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>{setActiveTab(tab);setSearchQuery("");}} style={{ background:"none",border:"none",color:activeTab===tab?"#f0f2f5":"#6b7280",fontWeight:activeTab===tab?700:500,fontSize:13,padding:"8px 13px",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"'DM Sans'",borderBottom:activeTab===tab?"2px solid #00c896":"2px solid transparent",transition:"all .15s" }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Cripto Tab */}
      {activeTab==="Cripto" && <CryptoTab searchQuery={searchQuery}/>}

      {/* Market Cards */}
      {activeTab!=="Cripto" && (
        <div style={{ padding:"16px 16px 100px" }}>
          {searchQuery && <p style={{ fontSize:12,color:"#6b7280",marginBottom:12 }}>🔍 <span style={{ color:"#f9fafb",fontWeight:600 }}>{filtered.length}</span> resultado(s) para "{searchQuery}"</p>}
          {filtered.length===0 && <div style={{ textAlign:"center",padding:"40px 0",color:"#6b7280" }}>Nenhum mercado encontrado 🔍</div>}
          {filtered.map(market=>(
            <div key={market.id} className="mc" style={{ background:"#161922",borderRadius:16,marginBottom:12,border:"1px solid rgba(255,255,255,.07)",overflow:"hidden" }}>
              <div style={{ padding:"14px 16px 10px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <span style={{ fontSize:16 }}>{categoryIcons[market.category]||"📊"}</span>
                    <span style={{ fontSize:11,fontWeight:700,color:"#6b7280",letterSpacing:.8 }}>{market.tag}</span>
                  </div>
                  <span style={{ fontSize:11,color:"#4b5563" }}>{market.round}</span>
                </div>
                <h2 style={{ fontSize:16,fontWeight:700,color:"#f9fafb",marginBottom:10,fontFamily:"'Space Grotesk'",lineHeight:1.3 }}>{market.title}</h2>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  {market.status==="LIVE"
                    ?<><div className="ld" style={{ width:7,height:7,borderRadius:"50%",background:"#ef4444" }}/><span style={{ fontSize:12,fontWeight:700,color:"#ef4444" }}>AO VIVO</span></>
                    :<><div style={{ width:7,height:7,borderRadius:"50%",background:"#f59e0b" }}/><span style={{ fontSize:12,fontWeight:700,color:"#f59e0b" }}>EM BREVE</span></>
                  }
                </div>
              </div>
              <div style={{ padding:"0 8px 8px" }}>
                {market.options.map((opt,i)=>(
                  <div key={i} className="or" onClick={()=>openMarket(market,opt)} style={{ display:"flex",alignItems:"center",padding:"8px 10px",borderRadius:10,marginBottom:4,background:"rgba(255,255,255,.02)" }}>
                    <span style={{ fontSize:18,marginRight:10 }}>{opt.flag}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13,fontWeight:600,color:"#e5e7eb",marginBottom:4 }}>{opt.name}</div>
                      <div style={{ height:3,background:"rgba(255,255,255,.08)",borderRadius:2,overflow:"hidden" }}>
                        <div className="pb" style={{ height:"100%",width:`${opt.prob}%`,background:`linear-gradient(90deg,${opt.color},${opt.color}aa)`,borderRadius:2 }}/>
                      </div>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginLeft:10 }}>
                      <span style={{ fontSize:11,color:"#9ca3af",background:"rgba(255,255,255,.07)",padding:"3px 8px",borderRadius:6 }}>{opt.score}</span>
                      <span style={{ fontSize:13,fontWeight:700,color:opt.color,background:`${opt.color}18`,border:`1px solid ${opt.color}44`,padding:"4px 10px",borderRadius:20,minWidth:50,textAlign:"center" }}>{opt.prob}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"10px 16px 14px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontSize:12,color:"#6b7280" }}><span style={{ color:"#00c896",fontWeight:600 }}>{market.volume}</span> vol</span>
                <span style={{ fontSize:12,color:"#6b7280" }}>{market.marketsCount} mercados</span>
              </div>
              <div style={{ padding:"0 16px 14px" }}>
                <span style={{ fontSize:12,color:"#6b7280" }}><span style={{ fontWeight:700,color:"#9ca3af" }}>Notícias · </span>{market.news}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#161922",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",justifyContent:"space-around",padding:"12px 0 20px",zIndex:20 }}>
        {[{icon:"📊",label:"Mercados"},{icon:"🔍",label:"Explorar"},{icon:"💳",label:"Carteira",action:()=>setScreen("payments")},{icon:"👤",label:"Perfil",action:()=>setScreen("perfil")}].map(item=>(
          <button key={item.label} onClick={()=>item.action?item.action():setActiveNav(item.label)} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,color:activeNav===item.label?"#00c896":"#6b7280" }}>
            <span style={{ fontSize:20 }}>{item.icon}</span>
            <span style={{ fontSize:10,fontWeight:600,fontFamily:"'DM Sans'" }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* ── MODAL BÔNUS BOAS-VINDAS ────────────────────── */}
      {showBonus && (
        <div className="ov" style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(6px)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
          <div className="md" style={{ background:"linear-gradient(135deg,#1a1f2e,#161922)",borderRadius:24,padding:"28px 24px",textAlign:"center",width:"100%",maxWidth:380,border:"1px solid rgba(0,200,150,.3)",boxShadow:"0 0 60px rgba(0,200,150,.2)",position:"relative",overflow:"hidden" }}>
            {/* Glow de fundo */}
            <div style={{ position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,200,150,.15) 0%,transparent 70%)",pointerEvents:"none" }}/>

            {/* Emoji animado */}
            <div style={{ fontSize:64,marginBottom:8,animation:"pop .4s cubic-bezier(.34,1.56,.64,1)" }}>🎁</div>
            <h2 style={{ fontFamily:"'Space Grotesk'",fontSize:24,fontWeight:700,color:"#f9fafb",marginBottom:6 }}>Bem-vindo ao FaverPix!</h2>
            <p style={{ fontSize:13,color:"#9ca3af",marginBottom:18,lineHeight:1.6 }}>Sua conta foi criada. Aqui está seu presente:</p>

            {/* Valor do bônus */}
            <div style={{ background:"linear-gradient(135deg,rgba(0,200,150,.18),rgba(59,130,246,.18))",borderRadius:16,padding:"18px",marginBottom:16,border:"1px solid rgba(0,200,150,.35)" }}>
              <p style={{ fontSize:11,color:"#9ca3af",marginBottom:4,fontWeight:700,letterSpacing:.6 }}>BÔNUS DE BOAS-VINDAS</p>
              <p style={{ fontFamily:"'Space Grotesk'",fontSize:48,fontWeight:700,color:"#00c896",letterSpacing:-2,lineHeight:1 }}>R$ 10</p>
              <p style={{ fontSize:12,color:"rgba(0,200,150,.7)",marginTop:6 }}>creditado no seu saldo ao resgatar ✓</p>
            </div>

            {/* 3 benefícios */}
            <div style={{ background:"rgba(255,255,255,.04)",borderRadius:12,padding:"12px 14px",marginBottom:18,textAlign:"left" }}>
              {[
                { icon:"🥉", txt:"Nível Iniciante — suba apostando e ganhe taxa menor" },
                { icon:"🤝", txt:"Indique amigos: você ganha 15% + amigo ganha R$10" },
                { icon:"🎯", txt:"Mercados ao vivo: futebol, política, cripto e mais" },
              ].map((item,i,arr)=>(
                <div key={i} style={{ display:"flex",gap:10,marginBottom:i<arr.length-1?8:0 }}>
                  <span style={{ fontSize:18,lineHeight:1.4 }}>{item.icon}</span>
                  <p style={{ fontSize:12,color:"#9ca3af",lineHeight:1.5 }}>{item.txt}</p>
                </div>
              ))}
            </div>

            {/* Botão resgatar */}
            <button onClick={()=>{ setSaldo(s=>+(s+10).toFixed(2)); addPontos(userEmail,50); setXp(x=>x+50); setShowBonus(false); setToastMsg("🎉 R$ 10,00 + 50 XP creditados!"); setTimeout(()=>setToastMsg(""),3000); }}
              style={{ width:"100%",background:"linear-gradient(135deg,#00c896,#00a07a)",border:"none",color:"#fff",borderRadius:14,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk'",boxShadow:"0 4px 24px rgba(0,200,150,.45)",letterSpacing:.3 }}>
              Resgatar R$ 10,00 🚀
            </button>
            <p style={{ fontSize:11,color:"#374151",marginTop:10 }}>+50 XP de bônus de boas-vindas incluído</p>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICAÇÃO ──────────────────────────── */}
      {toastMsg && (
        <div style={{ position:"fixed",top:24,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#00c896,#00a07a)",color:"#fff",borderRadius:50,padding:"12px 24px",fontSize:14,fontWeight:700,fontFamily:"'Space Grotesk'",zIndex:100,boxShadow:"0 8px 32px rgba(0,200,150,.4)",whiteSpace:"nowrap",animation:"slideDown .3s ease" }}>
          {toastMsg}
        </div>
      )}

      {/* ── BARRA DE XP ────────────────────────────────── */}
      {(() => {
        const nivel = getNivel(xp);
        const next  = getNextNivel(xp);
        const pct   = next ? ((xp - nivel.min) / (next.min - nivel.min)) * 100 : 100;
        return (
          <div style={{ background:"#161922",padding:"8px 20px",borderBottom:"1px solid rgba(255,255,255,.04)",display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:18 }}>{nivel.badge}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                <span style={{ fontSize:11,fontWeight:700,color:nivel.cor }}>{nivel.nome}</span>
                <span style={{ fontSize:10,color:"#4b5563" }}>{xp} XP {next?`· próx: ${next.nome} (${next.min-xp} XP)`:""}</span>
              </div>
              <div style={{ height:4,background:"rgba(255,255,255,.07)",borderRadius:2,overflow:"hidden" }}>
                <div className="pb" style={{ height:"100%",width:`${Math.min(100,pct)}%`,background:`linear-gradient(90deg,${nivel.cor},${next?.cor||nivel.cor})`,borderRadius:2 }}/>
              </div>
            </div>
            {next && <span style={{ fontSize:10,color:"#4b5563",whiteSpace:"nowrap" }}>Taxa: {(nivel.taxa*100).toFixed(1)}%</span>}
          </div>
        );
      })()}

      {/* Bet Modal */}
      {selectedMarket&&selectedOption&&(
        <div className="ov" onClick={()=>closeModal(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(4px)",zIndex:50,display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
          <div className="md" onClick={e=>e.stopPropagation()} style={{ background:"#1a1f2e",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,padding:"24px 20px 40px",border:"1px solid rgba(255,255,255,.1)" }}>
            <div style={{ width:40,height:4,background:"rgba(255,255,255,.2)",borderRadius:2,margin:"0 auto 20px" }}/>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20 }}>
              <div><p style={{ fontSize:11,color:"#6b7280",fontWeight:700,letterSpacing:.8,marginBottom:4 }}>{selectedMarket.tag} · {selectedMarket.title}</p><h3 style={{ fontSize:20,fontWeight:700,fontFamily:"'Space Grotesk'",color:"#f9fafb" }}>{selectedOption.flag} {selectedOption.name}</h3></div>
              <button onClick={()=>closeModal(false)} style={{ background:"rgba(255,255,255,.08)",border:"none",color:"#9ca3af",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16 }}>×</button>
            </div>
            <div style={{ display:"flex",background:"rgba(255,255,255,.05)",borderRadius:12,padding:4,marginBottom:20 }}>
              {["SIM","NÃO"].map(side=>(
                <button key={side} className="bb" onClick={()=>setBetSide(side)} style={{ flex:1,padding:"10px",border:"none",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"'DM Sans'",background:betSide===side?(side==="SIM"?"linear-gradient(135deg,#00c896,#00a07a)":"linear-gradient(135deg,#ef4444,#dc2626)"):"transparent",color:betSide===side?"#fff":"#6b7280",transition:"all .2s" }}>
                  {side} · {side==="SIM"?selectedOption.prob:100-selectedOption.prob}¢
                </button>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12,color:"#6b7280",fontWeight:600,display:"block",marginBottom:8 }}>VALOR DA APOSTA</label>
              <div style={{ display:"flex",alignItems:"center",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:12,padding:"12px 16px" }}>
                <span style={{ fontSize:16,color:"#6b7280",marginRight:8 }}>R$</span>
                <input type="number" placeholder="0,00" value={betAmount} onChange={e=>setBetAmount(e.target.value)} style={{ background:"none",border:"none",color:"#f9fafb",fontSize:20,fontWeight:700,flex:1,outline:"none",fontFamily:"'Space Grotesk'" }}/>
              </div>
              <div style={{ display:"flex",gap:8,marginTop:8 }}>
                {[10,25,50,100].map(a=><button key={a} onClick={()=>setBetAmount(String(a))} className="bb" style={{ flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"#9ca3af",borderRadius:8,padding:"6px 0",fontSize:12,fontWeight:600,cursor:"pointer" }}>R${a}</button>)}
              </div>
            </div>
            <div style={{ background:"rgba(0,200,150,.08)",border:"1px solid rgba(0,200,150,.2)",borderRadius:12,padding:"14px 16px",marginBottom:12,display:"flex",justifyContent:"space-between" }}>
              <span style={{ fontSize:13,color:"#9ca3af" }}>Retorno potencial</span>
              <span style={{ fontSize:16,fontWeight:700,color:"#00c896",fontFamily:"'Space Grotesk'" }}>R$ {potentialReturn}</span>
            </div>
            {/* XP badge */}
            <div style={{ background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.15)",borderRadius:10,padding:"8px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8 }}>
              <span>⭐</span>
              <span style={{ fontSize:12,color:"#f59e0b" }}>+10 XP ao confirmar esta aposta</span>
            </div>
            <button className="bb" onClick={()=>{ closeModal(true); }} style={{ width:"100%",background:betSide==="SIM"?"linear-gradient(135deg,#00c896,#00a07a)":"linear-gradient(135deg,#ef4444,#dc2626)",border:"none",color:"#fff",borderRadius:14,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk'",letterSpacing:.3 }}>
              Apostar {betSide} {betSide==="SIM"?"✓":"✗"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

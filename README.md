# FaverPix 🎯

> Mercado de Previsões Brasileiro — Preveja. Ganhe. Repita.

## 🚀 Deploy no Vercel (passo a passo)

### Pré-requisitos
- Conta no [GitHub](https://github.com) (grátis)
- Conta no [Vercel](https://vercel.com) (grátis)

---

### Passo 1 — Subir no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `faverpix`
3. Marque **Private** (recomendado)
4. Clique em **Create repository**
5. No terminal da sua máquina:

```bash
cd faverpix-vercel
git init
git add .
git commit -m "FaverPix v1.0 🚀"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/faverpix.git
git push -u origin main
```

---

### Passo 2 — Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `faverpix`
4. Configurações (já detecta automaticamente):
   - **Framework:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Clique em **Deploy**
6. Aguarde ~2 minutos ✅

### Seu app estará em:
```
https://faverpix.vercel.app
```

---

### Passo 3 — Domínio próprio (opcional)

1. Compre `faverpix.com.br` no [Registro.br](https://registro.br) (~R$40/ano)
2. No Vercel: Settings → Domains → Add Domain
3. Configure o DNS conforme instruções do Vercel

---

## 📱 Instalar como app no celular (PWA)

Após o deploy, o FaverPix funciona como app instalável:

**Android (Chrome):**
1. Abra o site no Chrome
2. Toque nos 3 pontinhos → "Adicionar à tela inicial"

**iPhone (Safari):**
1. Abra o site no Safari
2. Toque no botão compartilhar → "Adicionar à Tela de Início"

---

## 🏗️ Estrutura do projeto

```
faverpix-vercel/
├── public/
│   ├── index.html      # HTML base com meta tags e PWA
│   └── manifest.json   # Configuração PWA
├── src/
│   ├── index.js        # Entry point React
│   └── App.jsx         # App completo FaverPix
├── vercel.json         # Configuração Vercel
└── package.json        # Dependências
```

---

## 👑 Admin

- **E-mail:** sellysmar@gmail.com
- **Senha:** sellysmar@gmail.com
- Ou use o botão dourado na tela de login

---

## 📊 Features

- ✅ Login/cadastro com validação real
- ✅ Mercados públicos sem login (Product-Led Growth)
- ✅ Futebol BR, Champions, NBA
- ✅ Política: Presidente + 27 estados (pesquisas 2026)
- ✅ Cripto: 100 moedas com apostas SOBE/CAI
- ✅ Sistema de pontos e níveis (Iniciante → Elite)
- ✅ Bônus R$10 de boas-vindas
- ✅ Programa de afiliados (15% + R$10 para indicado)
- ✅ Calculadora de margem (Kalshi vs Polymarket)
- ✅ Pagamentos: Pix, Cartão, Crypto
- ✅ Painel Admin 👑

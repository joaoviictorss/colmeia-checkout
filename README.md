# 🛒 Colmeia Checkout

Uma aplicação de e-commerce moderna e responsiva construída com Next.js 16, oferecendo uma experiência completa de compra online com múltiplos métodos de pagamento.

## ✨ Funcionalidades

### 🛍️ **E-commerce Completo**

- **Catálogo de Produtos**: Exibição de produtos com imagens, preços e avaliações
- **Carrinho de Compras**: Gerenciamento completo de itens com controle de quantidade
- **Checkout Inteligente**: Processo de finalização de compra otimizado

### 💳 **Múltiplos Métodos de Pagamento**

- **PIX**: Pagamento instantâneo com QR Code
- **Cartão de Crédito**: Formulário seguro para dados do cartão
- **Boleto Bancário**: Geração de código de barras para pagamento

### 🔐 **Sistema de Autenticação**

- Login e cadastro de usuários
- Integração com Google (preparado)
- Gerenciamento de sessão com localStorage
- Validação de formulários com Zod

### 🎨 **Interface Moderna**

- Design responsivo e mobile-first
- Componentes reutilizáveis com Radix UI
- Animações suaves e transições
- Tema personalizado com Tailwind CSS

## 🚀 Tecnologias Utilizadas

### **Frontend**

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework de estilos
- **Radix UI** - Componentes acessíveis

### **Formulários & Validação**

- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### **Utilitários**

- **Lucide React** - Ícones modernos
- **QRCode** - Geração de códigos QR para PIX
- **Swiper** - Carrossel de imagens
- **Class Variance Authority** - Variantes de componentes

### **Desenvolvimento**

- **Biome** - Linter e formatador
- **TypeScript** - Tipagem estática
- **PostCSS** - Processamento de CSS

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── sign-in/       # Página de login
│   │   └── sign-up/       # Página de cadastro
│   └── (root)/            # Rotas principais
│       ├── products/      # Catálogo de produtos
│       ├── cart/          # Carrinho de compras
│       └── checkout/      # Finalização de compra
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Radix UI)
│   ├── product-card/     # Card de produto
│   ├── header/           # Cabeçalho da aplicação
│   └── input/            # Campo de entrada customizado
├── contexts/             # Contextos React
│   ├── user-context.tsx  # Gerenciamento de usuário
│   └── cart-context.ts   # Gerenciamento do carrinho
├── hooks/                # Hooks customizados
│   ├── use-cart/         # Hook do carrinho
│   └── use-payment/      # Hook de pagamento
├── utils/                # Utilitários
│   ├── types/           # Definições de tipos
│   ├── validations/     # Schemas de validação
│   ├── functions/      # Funções auxiliares
│   └── mockData/       # Dados de exemplo
└── providers/           # Provedores de contexto
```

## 🛠️ Instalação e Execução

### **Pré-requisitos**

- Node.js 18+
- npm, yarn, pnpm ou bun

### **Instalação**

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd colmeia-checkout

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### **Execução**

```bash
# Modo desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev

# Acesse http://localhost:3000
```

### **Scripts Disponíveis**

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código (Biome)
npm run format   # Formatação de código (Biome)
```

## 🎯 Funcionalidades Detalhadas

### **Sistema de Produtos**

- Listagem com skeleton loading
- Cards responsivos com imagens
- Sistema de avaliações
- Preços formatados em BRL

### **Carrinho de Compras**

- Adição/remoção de produtos
- Controle de quantidade
- Cálculo automático de totais
- Persistência no localStorage

### **Checkout**

- Validação de dados do comprador
- Seleção de método de pagamento
- Formulário de cartão com validação
- Geração de QR Code para PIX
- Código de barras para boleto
- Confirmação e resultado de pagamento

### **Autenticação**

- Login com email/senha
- Cadastro de novos usuários
- Integração preparada para Google OAuth
- Validação de formulários
- Gerenciamento de sessão

## 🔧 Configuração

### **Imagens**

O projeto está configurado para carregar imagens do Unsplash. Para produção, configure suas próprias imagens ou atualize o `next.config.ts`.

## 🚀 Deploy

### **Vercel (Recomendado)**

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### **Outras Plataformas**

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

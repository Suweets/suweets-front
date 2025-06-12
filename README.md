# Suweets - Plataforma de Vendas de Bolos Artesanais

Suweets é uma plataforma web moderna para vendas de bolos, tortas e fatias artesanais, desenvolvida com React + TypeScript. O projeto oferece uma experiência completa de e-commerce para doçaria, com integração via WhatsApp para finalização de pedidos.

## 🍰 Funcionalidades Principais

### Para Clientes

- **Catálogo de Produtos**: Navegação completa com filtros por categoria e ingredientes
- **Sistema de Carrinho**: Adicionar, remover e gerenciar quantidades de produtos
- **Autenticação**: Registro e login de usuários com perfil editável
- **Finalização via WhatsApp**: Checkout integrado com envio direto para WhatsApp
- **Carrossel de Produtos**: Destaques e recomendações personalizadas
- **Design Responsivo**: Interface otimizada para desktop, tablet e mobile

### Para Administradores

- **Painel Admin**: Interface para cadastro de novos produtos
- **Gestão de Fatias**: Registro completo com ingredientes, preços e características
- **Visualização de Produtos**: Lista de todos os produtos cadastrados

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização utilitária
- **Vite** - Build tool e dev server

### Bibliotecas e Dependências

- **React Router 7** - Roteamento
- **TanStack Query** - Gerenciamento de estado servidor
- **React Hook Form + Zod** - Formulários e validação
- **Axios** - Cliente HTTP
- **Swiper** - Carrossel de produtos
- **Lucide React** - Ícones
- **Sonner** - Notificações toast
- **Radix UI** - Componentes acessíveis

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Button/         # Botão customizado
│   ├── Cake/           # Card de produto
│   ├── CartItemCard/   # Item do carrinho
│   ├── Header/         # Cabeçalho e navegação
│   ├── FormInput/      # Input de formulário
│   └── ...
├── contexts/           # Contextos React
│   ├── userContext.tsx # Autenticação do usuário
│   └── cartContext.tsx # Gerenciamento do carrinho
├── pages/              # Páginas principais
│   ├── Main.tsx        # Homepage
│   ├── Catalogo.tsx    # Catálogo de produtos
│   ├── Login.tsx       # Autenticação
│   ├── Register.tsx    # Registro
│   ├── Carrinho.tsx    # Carrinho de compras
│   ├── UserPage.tsx    # Perfil do usuário
│   └── Admin.tsx       # Painel administrativo
├── services/           # Integrações API
├── types/              # Definições TypeScript
├── router/             # Configuração de rotas
└── assets/             # Imagens e recursos estáticos
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Navegue até o diretório
cd suweets-front

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Configuração de Ambiente

```env
VITE_API_URL=http://localhost:5010
VITE_FATIAS_URL=http://localhost:5011
```

### Executar em Desenvolvimento

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📊 APIs e Endpoints

O projeto consome APIs REST para:

### Usuários (`VITE_API_URL`)

- `POST /usuario` - Registro de usuário
- `POST /usuario/login` - Login
- `PUT /usuario/{id}` - Atualização de perfil

### Produtos (`VITE_FATIAS_URL`)

- `GET /fatias` - Listar produtos
- `POST /fatias` - Cadastrar produto (admin)

## 🛒 Fluxo de Compra

1. **Navegação**: Cliente explora o catálogo
2. **Seleção**: Adiciona produtos ao carrinho
3. **Autenticação**: Login/registro se necessário
4. **Revisão**: Revisa itens no carrinho
5. **Pagamento**: Seleciona forma de pagamento (PIX/Dinheiro)
6. **WhatsApp**: Finaliza via mensagem automática no WhatsApp

## 🎨 Design System

### Cores Principais

- **Chocolate Brown**: `#5e2c15` - Cor principal
- **Light Brown**: `#c89f77` - Secundária
- **Cream**: `#f7e6d2` - Background
- **Terracota**: `#e27a48` - Accent/CTA
- **Base Gray**: `#766a63` - Texto secundário

### Tipografia

- **Montserrat** - Font principal
- **Pacifico** - Logo e títulos especiais

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado

- **Contexto de Usuário**: Autenticação e perfil
- **Contexto de Carrinho**: Estado do carrinho com localStorage
- **TanStack Query**: Cache e sincronização de dados servidor

### Formulários

- **React Hook Form**: Gerenciamento otimizado
- **Zod**: Validação de esquemas TypeScript-first
- **Feedback Visual**: Mensagens de erro em tempo real

### Responsividade

- **Mobile First**: Design otimizado para móvel
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Interações otimizadas para touch

### Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Imagens**: Fallbacks e tratamento de erro
- **Bundle Splitting**: Código dividido automaticamente

## 📱 Recursos Mobile

- Menu hamburguer responsivo
- Carrossel touch-friendly
- Interface otimizada para telas pequenas
- Botões com tamanho adequado para touch
- Navegação por gestos

## 🔐 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Autenticação via contexto React
- Proteção contra XSS básica
- Validação de tipos com TypeScript

## 📞 Integração WhatsApp

A finalização de pedidos é realizada via WhatsApp com:

- Mensagem formatada automaticamente
- Detalhes do pedido incluídos
- Forma de pagamento selecionada
- Dados do cliente
- Link direto para conversa

## 🚧 Desenvolvimento Futuro

### Melhorias Planejadas

- Sistema de pagamento online
- Gestão de estoque
- Histórico de pedidos
- Sistema de avaliações
- Push notifications
- PWA (Progressive Web App)
- Dashboard de vendas
- Sistema de cupons

## 📝 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build
npm run lint         # Verificação de código
```

## 🔧 Configuração ESLint

Para desenvolvimento em produção, recomenda-se atualizar a configuração do ESLint:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

Você pode também instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) e [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para regras de lint específicas do React:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## 📄 Licença

Este projeto é privado e de propriedade da Suweets.

## 👥 Equipe

Desenvolvido com ❤️ para adoçar momentos especiais.

---

**Suweets - Sabores que marcam, momentos que ficam.**

# Syntax Wear 👟

A **Syntax Wear** é uma aplicação de e-commerce moderna desenvolvida para a venda de calçados e vestuário. O projeto foca em uma experiência de usuário fluida, com navegação rápida, design responsivo e funcionalidades essenciais de uma loja virtual.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

- **[React 19](https://react.dev/)**: Biblioteca JavaScript para construção de interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Superconjunto de JavaScript que adiciona tipagem estática.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build extremamente rápida para projetos front-end.
- **[TanStack Router](https://tanstack.com/router/latest)**: Gerenciamento de rotas robusto e tipado para React.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e moderna.
- **[React Hook Form](https://react-hook-form.com/)**: Gerenciamento de formulários performático.
- **[Zod](https://zod.dev/)**: Validação de esquemas baseada em TypeScript.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Biblioteca de ícones populares.

## ✨ Funcionalidades

- **Catálogo de Produtos**: Visualização de diversos produtos com filtros por categoria.
- **Detalhes do Produto**: Página dedicada para cada item, exibindo informações detalhadas.
- **Carrinho de Compras**: Adição, remoção e visualização de itens no carrinho (via Context API).
- **Autenticação**: Telas de Login e Cadastro com validação de campos.
- **Localizador de Lojas**: Informações sobre as unidades físicas da Syntax Wear.
- **Design Responsivo**: Adaptado para dispositivos móveis, tablets e desktops.
- **Cálculo de Frete**: Simulação de frete através de formulário de CEP.

## 📁 Estrutura de Pastas

```text
src/
├── assets/         # Imagens, fontes e arquivos estáticos
├── components/     # Componentes reutilizáveis da interface
├── contexts/       # Contextos da aplicação (Ex: CartContext)
├── interfaces/     # Definições de tipos e interfaces TypeScript
├── mocks/          # Dados fictícios para simulação de API
├── pages/          # Páginas da aplicação e rotas (TanStack Router)
├── styles/         # Estilos globais
└── utils/          # Funções utilitárias (Ex: formatadores, validadores)
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/syntax-wear-app.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd syntax-wear-app
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:5173`.

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
- `npm run build`: Gera a build de produção do projeto.
- `npm run lint`: Executa o ESLint para verificar erros de padronização no código.
- `npm run preview`: Visualiza a build de produção localmente.

---
Desenvolvido por [Evandro Passaia](https://github.com/EvandroBaraka) como parte do aprendizado no curso DevQuest.

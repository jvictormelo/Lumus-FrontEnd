# Lumus - Frontend

## Sobre
Interface web do sistema de gestão de leitura pessoal Lumus,
desenvolvida em React + Vite.

## Objetivo
Projeto desenvolvido com foco em:

* Visualizar e gerenciar livros da estante pessoal
* Acompanhar progresso de leitura em tempo real
* Avaliar livros concluídos
* Exportar relatório de leituras em PDF
* Interface responsiva e multilíngue

## Tecnologias

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [React Router DOM](https://reactrouter.com/)
* [Axios](https://axios-http.com/)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [i18next](https://www.i18next.com/)

## ⚙ Funcionalidades

### 👤 Autenticação
* Tela de login e cadastro
* Sessão mantida via cookie seguro
* Detecção automática de idioma pelo navegador
* Rotas privadas protegidas

### 📚 Estante
* Visualização de livros dividida em abas:
  * Lendo
  * Quero Ler
  * Lidos
* Cards com barra de progresso de leitura

### 📖 Detalhe da Leitura
* Progresso atual e percentual calculado
* Ritmo de leitura (páginas/dia)
* Previsão de conclusão
* Atualização de página atual
* Avaliação com nota e opinião (livros concluídos)

### 📝 Livros
* Cadastrar novo livro
* Editar livro existente
* Remover livro
* Adicionar livro à estante

### 📄 Relatório
* Resumo de estatísticas de leitura
* Exportação em PDF via API

### 🌍 Internacionalização
* Detecção automática do idioma pelo navegador
* Suporte a português, inglês e espanhol
* Sem necessidade de configuração pelo usuário

## Instalação

1. Clonar o projeto:
```bash
git clone https://github.com/jvictormelo/Lumus-FrontEnd.git
```

2. Acessar diretório:
```bash
cd Lumus-FrontEnd
```

3. Instalar dependências:
```bash
npm install
```

4. Iniciar o projeto:
```bash
npm run dev
```

Acesse em `http://localhost:5173`

> ⚠️ O backend precisa estar rodando em `http://localhost:3000` antes de iniciar o frontend.

##  Arquitetura do projeto

* **pages/** → telas da aplicação
* **components/** → componentes reutilizáveis (Header, PrivateRoute)
* **context/** → AuthContext para gerenciar autenticação global
* **services/** → api.js com axios configurado

* Adicionar gráficos de progresso e histórico de leitura
* Validação de exclusão de livros com leituras vinculadas
* Testes automatizados

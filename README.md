# Lumus — Frontend 📚

Interface web do sistema de gestão de leitura pessoal Lumus, desenvolvida em React + Vite.

## Como instalar

```bash
git clone <url-do-repo>
cd Lumus-FrontEnd
npm install
npm run dev
```

Acesse em `http://localhost:5173`

> O backend precisa estar rodando em `http://localhost:3000` antes de iniciar o frontend.

## Funcionalidades

- Tela de login e cadastro de usuário
- Dashboard com visão geral das leituras em andamento
- Estante pessoal dividida em: Lendo, Quero Ler e Lidos
- Detalhe de leitura com atualização de página e progresso automático
- Avaliação (nota e opinião) de livros concluídos
- Cadastro e edição de livros
- Relatório com estatísticas e exportação em PDF
- Idioma detectado automaticamente pelo navegador (pt, en, es)

## ToDo

- Adicionar gráficos de progresso e histórico de leitura
- Validação de exclusão de livros com leituras vinculadas
- Testes automatizados

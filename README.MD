# Task Master

## Sobre o Projeto

Este é um projeto acadêmico desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas. O Task Master é uma aplicação web para gerenciamento de tarefas, demonstrando habilidades em desenvolvimento front-end e back-end.

## Como Contribuir

### 1. Fork do Repositório

1. Acesse [https://github.com/Wallauerr/todo-web-app](https://github.com/Wallauerr/todo-web-app)
2. No canto superior direito, clique no botão "Fork"
3. Selecione sua conta para criar uma cópia do repositório

### 2. Clonar o Fork

```
git clone https://github.com/SEU_USUARIO/todo-web-app.git
cd todo-web-app
```

### 3. Criar uma Nova Branch

```
git checkout -b nome-da-sua-branch
```

### 4. Fazer Alterações e Commit

Faça suas alterações no código e então:

```
git add .
git commit -m "Descrição das suas alterações"
```

### 5. Push da Branch

```
git push origin nome-da-sua-branch
```

### 6. Criar um Pull Request (PR)

1. Vá para o seu fork no GitHub
2. Clique em "Compare & pull request"
3. Revise suas alterações e clique em "Create pull request"

### 7. Sincronizar seu Fork (após o PR ser mesclado)

```
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

## Executando o Projeto Localmente

### Instalando Dependências

```
npm install
```

### Iniciando o Servidor de Desenvolvimento

```
npm run dev
```

Após executar este comando, o aplicativo estará disponível em `http://localhost:5173` (ou na porta especificada no console).
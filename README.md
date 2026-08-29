# PLD Investigation Platform

Plataforma full-stack para demonstrar um fluxo de Prevencao a Lavagem de Dinheiro (PLD), desde a triagem do alerta ate a conclusao auditavel da investigacao. O projeto combina uma API NestJS, uma interface Next.js e dados inteiramente mockados para permitir execucao local sem infraestrutura externa.

> Projeto academico e demonstrativo. Nenhum dado pessoal ou transacional real e utilizado.

## Visao geral

A aplicacao foi desenhada para apoiar a analise de alertas PLD e demonstrar regras de dominio que normalmente estariam distribuidas entre sistemas bancarios, mecanismos antifraude e ferramentas de compliance.

Principais recursos:

- fila de alertas com classificacao de risco e status operacional;
- visualizacao de cliente, transacoes e evidencias relacionadas;
- mascaramento de CPF e conta bancaria nas respostas da API;
- atualizacao de status com justificativa e registro de auditoria;
- encerramento de investigacoes sujeito a papel, evidencias e revisao do relatorio;
- assistente mockado com sugestao de risco, justificativa, evidencias e fontes;
- geracao de relatorio e historico auditavel das operacoes;
- fallback local no frontend para demonstracao visual sem a API.

## Arquitetura

```text
Navegador
    |
    v
Frontend Next.js :3001
    |
    v
API NestJS :3000
    |
    +-- Alerts
    +-- Investigations
    +-- Chatbot
    +-- Reports
    +-- Audit
    `-- Repositories em memoria
```

O backend segue uma organizacao modular. Controllers definem os endpoints, services aplicam as regras de negocio, presenters protegem o formato de saida e repositories isolam o acesso aos dados mockados. O frontend separa contratos de dominio, acesso a API, estado remoto, estado de interface e componentes visuais.

## Tecnologias

| Camada      | Tecnologias                                                 |
| ----------- | ----------------------------------------------------------- |
| Backend     | Node.js 22+, TypeScript 5, NestJS 11, Class Validator       |
| Frontend    | React 19, Next.js 16, Tailwind CSS, TanStack Query, Zustand |
| Componentes | Radix Slot, Lucide React, Class Variance Authority          |
| Qualidade   | Jest, Supertest, ESLint, Prettier                           |
| Dados       | Repositories em memoria com fixtures TypeScript             |

As versoes e bibliotecas permitidas estao detalhadas em [`.ai/tech-stack.md`](.ai/tech-stack.md).

## Estrutura do repositorio

```text
PLD/
|-- .ai/                         # Padroes, ADRs, stack e regras de negocio
|-- src/
|   |-- modules/                 # Modulos funcionais da API
|   `-- shared/                  # Dominio, HTTP, seguranca e dados mockados
|-- test/                        # Testes de ponta a ponta
|-- frontend/
|   |-- src/app/                 # App Router e estilos globais
|   |-- src/components/          # Interface e componentes reutilizaveis
|   |-- src/lib/                 # API, dominio, formatadores e mocks
|   `-- src/store/               # Estado local com Zustand
|-- DOCUMENTACAO.md              # Documentacao concisa da entrega
|-- package.json                 # Scripts e dependencias do backend
`-- README.md
```

## Pre-requisitos

- Node.js 22 ou superior;
- npm 10 ou superior;
- portas `3000` e `3001` disponiveis.

## Instalacao

Instale as dependencias do backend na raiz:

```bash
npm install
```

Instale as dependencias do frontend:

```bash
cd frontend
npm install
```

No Windows, caso `node` ou `npm` nao estejam no `PATH`:

```powershell
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
```

## Execucao local

Inicie o backend em um terminal:

```bash
npm run start:dev
```

A API ficara disponivel em [http://localhost:3000](http://localhost:3000). O health check pode ser consultado em [http://localhost:3000/health](http://localhost:3000/health).

Em outro terminal, inicie o frontend:

```bash
cd frontend
npm run dev
```

A interface ficara disponivel em [http://localhost:3001](http://localhost:3001).

## Roteiro de demonstracao

1. Selecione `ALT-1001` e consulte cliente, transacoes e evidencias na aba `Caso`.
2. Na aba `Demo`, altere o status do alerta e informe uma justificativa.
3. Encerre `INV-5001`; o caso possui evidencias, papel autorizado e relatorio revisado.
4. Selecione `ALT-1002` e tente encerrar `INV-5002`; a API deve responder com `REPORT_NOT_REVIEWED`.
5. Na aba `Assistente`, envie uma pergunta e confira evidencias, justificativa e fontes.
6. Gere o relatorio da investigacao e consulte os eventos na aba `Auditoria`.

As alteracoes ficam em memoria enquanto a API estiver ativa. Ao reiniciar o backend, os dados retornam ao estado inicial.

## API

| Metodo  | Endpoint                                 | Finalidade                                        |
| ------- | ---------------------------------------- | ------------------------------------------------- |
| `GET`   | `/health`                                | Verificar disponibilidade e uso de dados mockados |
| `GET`   | `/alerts`                                | Listar alertas com dados sensiveis mascarados     |
| `GET`   | `/alerts/:alertId`                       | Consultar um alerta e registrar a consulta        |
| `PATCH` | `/alerts/:alertId/status`                | Atualizar status com justificativa e auditoria    |
| `GET`   | `/investigations`                        | Listar investigacoes                              |
| `GET`   | `/investigations/:investigationId`       | Consultar uma investigacao completa               |
| `POST`  | `/investigations/:investigationId/close` | Encerrar uma investigacao elegivel                |
| `POST`  | `/chatbot/query`                         | Consultar o assistente de apoio                   |
| `GET`   | `/reports/:investigationId`              | Gerar o relatorio mockado                         |
| `GET`   | `/audit`                                 | Consultar o historico de auditoria                |

Respostas de sucesso seguem o contrato:

```json
{
  "success": true,
  "data": {}
}
```

Erros possuem mensagem legivel e codigo estavel:

```json
{
  "success": false,
  "message": "Report must be reviewed before closing the investigation",
  "code": "REPORT_NOT_REVIEWED"
}
```

## Testes e qualidade

O projeto possui quatro testes unitarios e cinco testes de ponta a ponta. A suite integrada sobe uma instancia isolada da aplicacao para cada cenario e cobre disponibilidade, mascaramento, regras de encerramento, transparencia do assistente e auditoria.

Backend:

```bash
npm run lint
npm run test:all
npm run build
```

Para executar as suites separadamente:

```bash
npm test
npm run test:e2e
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Regras de negocio demonstradas

- CPF e conta bancaria nunca sao expostos sem mascaramento.
- O assistente sugere uma classificacao, mas nao toma a decisao final.
- Respostas do assistente incluem evidencias, justificativa e origem.
- Uma investigacao exige papel autorizado, evidencias e relatorio revisado para ser encerrada.
- Consultas e alteracoes relevantes geram eventos de auditoria.

## Documentacao tecnica

- [`DOCUMENTACAO.md`](DOCUMENTACAO.md): descricao concisa do projeto e da entrega;
- [`.ai/architecture-decisions.md`](.ai/architecture-decisions.md): decisoes de arquitetura;
- [`.ai/business-rules.md`](.ai/business-rules.md): regras do dominio PLD;
- [`.ai/standards.md`](.ai/standards.md): convencoes de codigo, testes e seguranca;
- [`.ai/tech-stack.md`](.ai/tech-stack.md): tecnologias e versoes permitidas.

## Limitacoes conhecidas

- os dados sao volateis e reiniciados com o processo do backend;
- o assistente usa respostas deterministicas, sem integracao com um modelo externo;
- autenticacao, autorizacao persistente e banco de dados nao fazem parte deste prototipo;
- o frontend possui fallback mockado para manter a demonstracao navegavel sem a API.

## Repositorio

<https://github.com/CaioVMoraes/PlataformaPrevensaoLavagemDinheiro>

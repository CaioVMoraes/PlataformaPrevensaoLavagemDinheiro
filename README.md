# PLD

Projeto local para demonstrar um fluxo de investigacao PLD com backend NestJS, frontend Next.js e dados mockados. A aplicacao cobre alertas, investigacoes, consulta assistida, relatorios e auditoria.

## Estrutura

```txt
PLD/
|-- .ai/
|   |-- architecture-decisions.md
|   |-- business-rules.md
|   |-- standards.md
|   `-- tech-stack.md
|-- src/
|   |-- modules/
|   `-- shared/
|-- test/
|-- frontend/
|   |-- src/
|   `-- scripts/
|-- package.json
`-- README.md
```

## Documentacao

Os arquivos em `.ai/` sao a referencia do projeto:

- `.ai/standards.md`: convencoes de codigo, API, logs, testes e seguranca.
- `.ai/architecture-decisions.md`: decisoes de arquitetura e ADRs.
- `.ai/tech-stack.md`: stack permitida para backend, frontend, IA, banco e observabilidade.
- `.ai/business-rules.md`: regras de negocio do dominio PLD.

## Stack

Backend:

- Node.js 22+
- TypeScript 5+
- NestJS 11+
- Class Validator
- Jest e Supertest

Frontend:

- React 19+
- Next.js 16.2.9, dentro da regra `Next.js 15+`
- TailwindCSS
- Componentes no estilo Shadcn/UI
- TanStack Query
- Zustand

## Instalar

Na raiz do projeto:

```bash
npm install
```

No frontend:

```bash
cd frontend
npm install
```

No Windows, se o terminal nao encontrar `npm` ou `node`, use antes:

```powershell
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
```

## Executar Localmente

Terminal 1, backend:

```bash
npm run start:dev
```

API: `http://localhost:3000`

Terminal 2, frontend:

```bash
cd frontend
npm run dev
```

Interface: `http://localhost:3001`

## Validar Build

Backend:

```bash
npm run build
npm test
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

## Como Testar Pelo Frontend

Abra `http://localhost:3001`.

1. Selecione `ALT-1001` na fila de alertas.
2. Abra a aba `Caso` para ver cliente, CPF/conta mascarados, transacoes e evidencias.
3. Abra a aba `Demo` e altere o status para `COMPLETED`, `FALSE_POSITIVE` ou `REGULATORY_ESCALATION`.
4. Ainda em `Demo`, clique em `Encerrar caso` com `ALT-1001` selecionado. Esse caso deve fechar porque possui evidencias e relatorio revisado.
5. Selecione `ALT-1002` e tente `Encerrar caso`. Esse fluxo deve mostrar erro `REPORT_NOT_REVIEWED`, demonstrando a regra de negocio.
6. Abra a aba `Assistente`, envie uma pergunta e confira evidencias, justificativa e fontes.
7. Abra a aba `Relatorio` para gerar o relatorio mockado da investigacao selecionada.
8. Abra a aba `Auditoria` para conferir eventos gerados por consultas e alteracoes.

Observacao: o frontend possui fallback mockado para visualizacao quando o backend nao esta rodando. Para demonstrar persistencia, auditoria e regras reais da API, rode o backend em `http://localhost:3000`.

## Como Testar Pela API

Health check:

```bash
curl http://localhost:3000/health
```

Listar alertas:

```bash
curl http://localhost:3000/alerts
```

Atualizar status de alerta:

```bash
curl -X PATCH http://localhost:3000/alerts/ALT-1001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"COMPLETED","user":"Camila Rocha","reason":"Analise finalizada"}'
```

Listar investigacoes:

```bash
curl http://localhost:3000/investigations
```

Fechar investigacao com sucesso:

```bash
curl -X POST http://localhost:3000/investigations/INV-5001/close \
  -H "Content-Type: application/json" \
  -d '{"user":"Camila Rocha","userRole":"Analista PLD","conclusion":"Indicios documentados e relatorio revisado."}'
```

Testar bloqueio por relatorio nao revisado:

```bash
curl -X POST http://localhost:3000/investigations/INV-5002/close \
  -H "Content-Type: application/json" \
  -d '{"user":"Bruno Martins","userRole":"Coordenador PLD","conclusion":"Tentativa de fechamento para demonstracao."}'
```

Resposta esperada para o bloqueio:

```json
{
  "success": false,
  "message": "Report must be reviewed before closing the investigation",
  "code": "REPORT_NOT_REVIEWED"
}
```

Consultar assistente:

```bash
curl -X POST http://localhost:3000/chatbot/query \
  -H "Content-Type: application/json" \
  -d '{"user":"Camila Rocha","investigationId":"INV-5001","question":"Quais evidencias sustentam o risco?"}'
```

Gerar relatorio mockado:

```bash
curl http://localhost:3000/reports/INV-5001
```

Consultar auditoria:

```bash
curl http://localhost:3000/audit
```

## Endpoints

- `GET /health`
- `GET /alerts`
- `GET /alerts/:alertId`
- `PATCH /alerts/:alertId/status`
- `GET /investigations`
- `GET /investigations/:investigationId`
- `POST /investigations/:investigationId/close`
- `POST /chatbot/query`
- `GET /reports/:investigationId`
- `GET /audit`

## Padrao de Resposta

Sucesso:

```json
{
  "success": true,
  "data": {}
}
```

Erro:

```json
{
  "success": false,
  "message": "Alert not found",
  "code": "ALERT_NOT_FOUND"
}
```

## Dados Mockados

O backend usa repositorios em memoria em `src/shared/database/mock-data.ts`. Ao reiniciar a API, os dados voltam ao estado inicial.

Regras demonstradas:

- CPF e conta sempre mascarados.
- A IA sugere risco, mas nao decide.
- Toda resposta do assistente contem evidencias, justificativa e origem.
- Investigacao so fecha com evidencia, relatorio revisado e papel autorizado.
- Auditoria registra consultas, status e fechamento.

## Git

O `.gitignore` remove dependencias, builds, caches, logs, arquivos `.env` e artefatos locais. Os documentos `.md` dentro de `.ai/` ficam versionados porque fazem parte da especificacao do projeto.

Quando o workspace do Codex for fechado, a pasta raiz pode ser renomeada de `.ai` para `PLD`. A configuracao Git continua junto porque a pasta `.git` esta dentro da raiz do projeto.

# PLD Investigation API

API NestJS local com dados mockados para apoiar fluxos de PLD: alertas, investigacoes, chatbot explicavel, relatorios e auditoria.

## Executar localmente

```bash
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000`.

## Endpoints principais

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

## Exemplo

```bash
curl http://localhost:3000/alerts
```

Atualizar status de alerta:

```bash
curl -X PATCH http://localhost:3000/alerts/ALT-1001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"COMPLETED","user":"Camila Rocha","reason":"Analise finalizada"}'
```

Consultar o chatbot mockado:

```bash
curl -X POST http://localhost:3000/chatbot/query \
  -H "Content-Type: application/json" \
  -d '{"user":"Camila Rocha","investigationId":"INV-5001","question":"Qual o risco do caso?"}'
```

Gerar relatorio mockado:

```bash
curl http://localhost:3000/reports/INV-5001
```

Todas as respostas seguem o padrao:

```json
{
  "success": true,
  "data": {}
}
```

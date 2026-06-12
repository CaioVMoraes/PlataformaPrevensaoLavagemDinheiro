# Standards

## Objetivo

Definir padrões obrigatórios de desenvolvimento para todo o projeto.

---

## Linguagem

- TypeScript obrigatório
- strict: true
- noImplicitAny: true
- sem uso de any
- ESLint obrigatório
- Prettier obrigatório

---

## Nomenclatura

### Classes

```ts
class AlertService {}
class InvestigationRepository {}
```

### Interfaces

```ts
interface AlertRepository {}
interface RiskAnalyzer {}
```

### Funções

```ts
calculateRiskScore()
generateInvestigationReport()
findSuspiciousTransactions()
```

### Variáveis

```ts
customerId
alertStatus
riskClassification
```

---

## Estrutura de Pastas

```txt
src/
├── modules/
│   ├── alerts/
│   ├── investigations/
│   ├── chatbot/
│   ├── reports/
│   └── audit/
│
├── shared/
│   ├── database/
│   ├── auth/
│   ├── logger/
│   └── integrations/
│
├── infrastructure/
│   ├── llm/
│   ├── vector-db/
│   ├── messaging/
│   └── storage/
│
└── main.ts
```

---

## Arquitetura

Seguir Clean Architecture:

```txt
Controller
↓
UseCase
↓
Domain
↓
Repository
↓
Database
```

Dependências sempre apontam para dentro.

---

## API

### REST

```txt
GET
POST
PATCH
DELETE
```

### Padrão de Resposta

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

---

## Logs

Toda operação crítica deve registrar:

- usuário
- data/hora
- ação
- recurso
- resultado

---

## Testes

Cobertura mínima:

- Services: 90%
- UseCases: 90%
- Controllers: 80%

Frameworks:

- Jest
- Supertest

---

## Segurança

- Nunca expor CPF completo
- Nunca expor conta completa
- OAuth2 obrigatório
- JWT obrigatório
- Auditoria obrigatória
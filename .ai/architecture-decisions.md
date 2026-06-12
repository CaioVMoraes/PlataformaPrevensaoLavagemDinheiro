# Architecture Decisions

## ADR-001 — Arquitetura

### Decisão

Modular Monolith.

### Motivo

- Menor complexidade
- Fácil manutenção
- Evolução futura para microsserviços

---

## ADR-002 — Backend

### Decisão

NestJS

### Motivo

- Modularização
- DI nativa
- Excelente suporte enterprise

---

## ADR-003 — Banco de Dados

### Decisão

PostgreSQL

### Motivo

- ACID
- JSON nativo
- Compatível com pgvector

---

## ADR-004 — IA

### Decisão

Arquitetura RAG

Fluxo:

1. Recupera contexto
2. Recupera dados
3. Recupera documentos
4. Envia ao LLM

### Objetivo

Reduzir alucinações e garantir rastreabilidade.

---

## ADR-005 — Vetorização

### Decisão

pgvector

### Motivo

Redução de custo operacional.

---

## ADR-006 — Mensageria

### Decisão

Kafka

Eventos:

```txt
AlertCreated
AlertAssigned
InvestigationStarted
InvestigationClosed
ReportGenerated
RiskSuggested
```

---

## ADR-007 — Auditoria

Toda ação relevante deve gerar log imutável.

Eventos auditáveis:

```txt
CHATBOT_QUERY
ALERT_CREATED
ALERT_CLOSED
REPORT_APPROVED
INVESTIGATION_FINISHED
```

---

## ADR-008 — IA não decide

A IA:

- sugere risco
- resume casos
- identifica evidências

A decisão final sempre pertence ao analista.

---

## ADR-009 — Comunicação

```txt
Frontend
 ↓
API Gateway
 ↓
Application Layer
 ↓
Domain Layer
 ↓
Infrastructure Layer
```

---

## ADR-010 — Escalabilidade

Componentes que podem virar microsserviços:

- Chatbot
- Relatórios
- Auditoria
- Alertas
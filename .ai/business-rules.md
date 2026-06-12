# Business Rules

## BR-001

Toda investigação deve possuir um alerta.

```txt
Alert -> Investigation
```

---

## BR-002

Perfis autorizados para investigação:

- Analista PLD
- Coordenador PLD

---

## BR-003

A IA não pode:

- Encerrar investigações
- Aprovar relatórios
- Comunicar órgãos reguladores

---

## BR-004

Classificação de risco:

```txt
LOW
MEDIUM
HIGH
CRITICAL
```

Fatores avaliados:

- Volume financeiro
- Frequência de operações
- Perfil do cliente
- Histórico
- Alertas recorrentes

---

## BR-005

Investigação deve possuir ao menos uma evidência.

```txt
minimumEvidenceCount = 1
```

---

## BR-006

Para encerrar uma investigação:

1. Gerar relatório
2. Revisar relatório
3. Registrar conclusão

---

## BR-007

Devem ser auditados:

- Login
- Logout
- Consulta cliente
- Consulta transação
- Consulta chatbot
- Alteração de status
- Encerramento de investigação

---

## BR-008

Toda resposta da IA deve conter:

- Evidências
- Justificativa
- Origem dos dados

---

## BR-009

Mascaramento obrigatório

CPF:

```txt
123.***.***-45
```

Conta:

```txt
****1234
```

---

## BR-010

Somente casos:

```txt
HIGH
CRITICAL
```

podem seguir para avaliação regulatória.

---

## BR-011

Após conclusão:

- Não excluir investigação
- Não excluir relatório
- Não alterar auditoria

---

## BR-012

Prioridade de contexto do chatbot:

```txt
Investigação
↓
Cliente
↓
Transações
↓
Normas internas
↓
Regulamentação
```

---

## BR-013

Toda resposta da IA deve ser explicável.

Proibido:

- Respostas sem fonte
- Conclusões sem evidências
- Recomendações sem justificativa

---

## BR-014

Toda alteração de status deve registrar:

- usuário
- data
- motivo
- status anterior
- novo status

---

## BR-015

Status permitidos para alertas:

```txt
PENDING
IN_ANALYSIS
COMPLETED
FALSE_POSITIVE
REGULATORY_ESCALATION
```

---

## BR-016

Status permitidos para investigações:

```txt
OPEN
UNDER_REVIEW
CLOSED
```
'use client';

import { useMutation } from '@tanstack/react-query';
import { Bot, SendHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { queryChatbot } from '@/lib/api';
import { ChatbotAnswer, InvestigationView } from '@/lib/domain';
import { getRiskTone } from '@/lib/badge-tones';
import { translateRisk } from '@/lib/formatters';

export function AssistantPanel({ investigation }: { investigation: InvestigationView | null }) {
  const [question, setQuestion] = useState('Quais evidencias sustentam o risco sugerido?');
  const [answer, setAnswer] = useState<ChatbotAnswer | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!investigation) {
        throw new Error('Investigation is required');
      }

      return queryChatbot(investigation.id, question);
    },
    onSuccess: (data) => {
      setAnswer(data);
    },
  });

  return (
    <section className="rounded-md border border-border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold">Assistente de analise</h2>
            <p className="text-sm text-muted-foreground">
              {investigation ? investigation.id : 'Nenhuma investigacao selecionada'}
            </p>
          </div>
        </div>
        <Badge tone="neutral">Decisao humana obrigatoria</Badge>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <Textarea
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
          value={question}
          aria-label="Pergunta ao assistente"
        />
        <Button
          className="md:self-start"
          disabled={!investigation || question.trim().length === 0 || mutation.isPending}
          onClick={() => {
            mutation.mutate();
          }}
          type="button"
        >
          <SendHorizontal className="h-4 w-4" />
          Consultar
        </Button>
      </div>

      {answer ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-md border border-border p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={getRiskTone(answer.suggestedRisk)}>
                {translateRisk(answer.suggestedRisk)}
              </Badge>
              <Badge tone="info">Explicavel</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{answer.answer}</p>
            <p className="mt-3 rounded-md bg-muted p-3 text-sm text-slate-700">
              {answer.justification}
            </p>
          </div>

          <div className="rounded-md border border-border p-4">
            <h3 className="text-sm font-semibold">Fontes</h3>
            <div className="mt-3 space-y-2">
              {answer.sources.map((source) => (
                <div className="rounded bg-slate-50 px-3 py-2" key={`${source.name}-${source.origin}`}>
                  <span className="block text-sm font-medium">{source.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{source.origin}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

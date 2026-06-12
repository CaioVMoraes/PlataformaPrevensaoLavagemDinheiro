import { Evidence } from '../../shared/domain/evidence';
import { RiskClassification } from '../../shared/domain/risk-classification';
export interface ChatbotSource {
    name: string;
    origin: string;
}
export interface ChatbotAnswer {
    investigationId: string;
    question: string;
    answer: string;
    suggestedRisk: RiskClassification;
    evidences: Evidence[];
    justification: string;
    sources: ChatbotSource[];
    humanDecisionRequired: true;
}

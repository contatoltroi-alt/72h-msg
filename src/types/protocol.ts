export type PhaseNumber = 1 | 2 | 3;
export type AccessLevel = 'completo' | 'basico';

export interface DecisionBranch {
  id: string;
  conditionLabel: string; // e.g. "A) Responde amigable / curiosa"
  recommendation: string; // e.g. "Espera 15-30 min (escasez calibrada) y usa el Script 2.1 del Paquete 2."
  targetScriptId?: string;
  badge?: string; // e.g. "Escasez Calibrada" | "Escudo" | "Cierre Alto Valor"
}

export interface ScriptMessage {
  id: string;
  packageId: string;
  title: string;
  objective: string;
  context: string;
  message: string;
  whyItWorks: string;
  temperature: 'Fría' | 'Tibia' | 'Receptiva';
  isFreePreview: boolean;
  filterTag?: string; // used for filtering within package
  timingInstruction?: string; // e.g. "⏱️ Espera 45 min antes de responder."
  calmDownRequired?: boolean; // Paquete 4 calm-down prompt
  postureChecklist?: string[]; // Paquete 3 date rules
  highlightNote?: string; // e.g. "Esta respuesta retira la presión..."
  audioGuidanceText: string; // SpeechSynthesis vocal intent & psychological tone
  decisionBranches?: DecisionBranch[];
}

export interface ScriptPackage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  phase: string;
  filterQuestion: string; // e.g. "¿Cuánto tiempo llevan sin hablar?"
  filterOptions: { value: string; label: string }[];
  scripts: ScriptMessage[];
}

export interface PhaseDetailedInfo {
  number: PhaseNumber;
  title: string;
  hoursRange: string;
  minHours: number;
  maxHours: number;
  colorName: 'red' | 'orange' | 'green';
  colorHex: string;
  accentBg: string;
  borderColor: string;
  headline: string;
  paragraphs: string[];
  keyTakeaway: string;
  nextStepCard: {
    statusText: string;
    actionText: string;
    buttonLabel: string;
  };
}

export interface MessagingPrinciple {
  number: number;
  title: string;
  description: string;
  exampleDo: string;
  exampleDont: string;
}

export interface PhaseFramework {
  phase: PhaseNumber;
  title: string;
  subtitle: string;
  whyImprovisationFails: string;
  principles: MessagingPrinciple[];
  accelerationBridge: {
    text: string;
    ctaLabel: string;
  };
}

export interface ChecklistItem {
  id: string;
  phase: PhaseNumber;
  label: string;
  category: string;
  points: number;
}

export interface ImpulseLog {
  id: string;
  timestamp: number;
  intensity: number; // 1 to 10
  trigger: string;
  note?: string;
}

export interface EducationalLesson {
  id: string;
  number: number;
  title: string;
  readTime: string;
  summary: string;
  content: {
    intro: string;
    points: { title: string; explanation: string }[];
    conclusion: string;
  };
}

export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
  frequency: string;
  description: string;
  spokenGuidance?: string;
}

export interface TimeTriggeredNotification {
  id: string;
  triggerHour: number; // e.g. 4, 12, 24, 36, 48, 66
  icon: string;
  title: string;
  message: string;
  actionText: string;
  targetTab: 'inicio' | 'checklist' | 'herramientas';
  targetScriptPackageId?: string;
}

export interface SentScriptLogEntry {
  id: string;
  scriptId: string;
  scriptTitle: string;
  packageNumber: number;
  dateTimestamp: number;
  herResponse: 'pendiente' | 'curiosa' | 'neutra' | 'fria' | 'visto' | 'positiva';
  notes?: string;
}

export interface MiniTrainingStep {
  step: number;
  title: string;
  subtitle: string;
  keyRule: string;
  description: string;
  checklistItems: string[];
  diagramSummary?: string;
}

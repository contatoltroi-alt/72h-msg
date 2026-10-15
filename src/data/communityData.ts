export interface CommunityActivityEntry {
  id: string;
  userLabel: string;
  initials: string;
  avatarBg: string; // Tailwind color class or hex
  action: string;
  timestampText: string;
  isProtocolRelated?: boolean;
}

export const COMMUNITY_ACTIVITIES: CommunityActivityEntry[] = [
  {
    id: "act_1",
    userLabel: "Diego M.",
    initials: "DM",
    avatarBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    action: "completó su Fase 1 sin errores",
    timestampText: "hace 2h",
    isProtocolRelated: false,
  },
  {
    id: "act_2",
    userLabel: "Un miembro",
    initials: "UM",
    avatarBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    action: "copió el Script de Reacercamiento",
    timestampText: "hace 4h",
    isProtocolRelated: true,
  },
  {
    id: "act_3",
    userLabel: "Andrés S.",
    initials: "AS",
    avatarBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    action: "superó el impulso de escribirle con el ejercicio de respiración",
    timestampText: "ayer",
    isProtocolRelated: false,
  },
  {
    id: "act_4",
    userLabel: "Un miembro",
    initials: "UM",
    avatarBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    action: "desbloqueó el Protocolo de Mensajes",
    timestampText: "hace 35 min",
    isProtocolRelated: true,
  },
  {
    id: "act_5",
    userLabel: "Mateo R.",
    initials: "MR",
    avatarBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    action: "anotó su 3er impulso en el diario en lugar de escribir",
    timestampText: "hace 3h",
    isProtocolRelated: false,
  },
  {
    id: "act_6",
    userLabel: "Carlos V.",
    initials: "CV",
    avatarBg: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    action: "completó el ciclo de respiración de 60s",
    timestampText: "hace 5h",
    isProtocolRelated: false,
  },
  {
    id: "act_7",
    userLabel: "Un miembro",
    initials: "UM",
    avatarBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    action: "consultó el Script de Invitación Estratégica",
    timestampText: "ayer",
    isProtocolRelated: true,
  },
  {
    id: "act_8",
    userLabel: "Fabián G.",
    initials: "FG",
    avatarBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    action: "mantuvo el silencio al cruzar las primeras 24 horas",
    timestampText: "hace 6h",
    isProtocolRelated: false,
  }
];

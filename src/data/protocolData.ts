import { 
  PhaseDetailedInfo, 
  PhaseFramework, 
  ChecklistItem, 
  ScriptPackage, 
  EducationalLesson, 
  AudioTrack,
  TimeTriggeredNotification,
  MiniTrainingStep 
} from '../types/protocol';

export const CHECKOUT_URL = "https://go.centerpag.com/PPU38CQA482";
export const ACCESS_CODE_VALID = "PROTOCOLO-2026";

export const PHASES_DETAILED: Record<1 | 2 | 3, PhaseDetailedInfo> = {
  1: {
    number: 1,
    title: "Silencio Estratégico",
    hoursRange: "0h – 24h",
    minHours: 0,
    maxHours: 24,
    colorName: "red",
    colorHex: "#EF4444",
    accentBg: "rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.35)",
    headline: "Caída del pico de dopamina y colapso de la expectativa de control",
    paragraphs: [
      "Inmediatamente después de una discusión, distanciamiento o ruptura, el cerebro de una mujer experimenta un pico defensivo mediado por la amígdala. En este estado, el sistema neuroendocrino opera bajo un sesgo de confirmación: cualquier intento de tu parte por explicarte, disculparte compulsivamente o pedir explicaciones es categorizado por su sistema nervioso como una confirmación de que tomaste una postura sumisa o necesitada.",
      "A nivel hormonal, ella espera inconscientemente tu validación. Esta anticipación genera una pequeña recompensa dopaminérgica esperada: 'sé que me va a escribir'. Cuando tú ejecutas un silencio impecable durante las primeras 24 horas, esa recompensa esperada no llega. El circuito de dopamina sufre un 'error de predicción negativo', provocando que el orgullo inicial comience a disiparse y dé paso a la incertidumbre.",
      "El cortisol (hormona del estrés) en ella se eleva ligeramente no por enfado hacia ti, sino por la ruptura abrupta de su patrón de predicción. Es aquí donde el silencio trabaja a nivel subconsciente: demuestra compostura, autocontrol emocional y respeto por sus límites, tres rasgos que el cerebro humano asocia biológicamente con alto estatus y valor personal.",
      "Tu única misión durante esta fase no es 'castigarla' ni jugar al misterio barato, sino desintoxicar la dinámica de la urgencia reactiva. Si te comunicas ahora, interrumpes el proceso natural por el cual sus defensas bajan."
    ],
    keyTakeaway: "El silencio en las primeras 24 horas no es indiferencia; es la única demostración palpable de que eres capaz de gobernar tus impulsos y respetar su espacio.",
    nextStepCard: {
      statusText: "Estás en Silencio Estratégico.",
      actionText: "El próximo paso es blindar tu autocontrol y preparar el marco mental antes de que ella entre en curiosidad.",
      buttonLabel: "Preparar mi marco mental →"
    }
  },
  2: {
    number: 2,
    title: "Modo Curiosidad de Ella",
    hoursRange: "24h – 48h",
    minHours: 24,
    maxHours: 48,
    colorName: "orange",
    colorHex: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    headline: "Activación del Efecto Zeigarnik y nostalgia selectiva",
    paragraphs: [
      "Al cruzar la barrera de las 24 horas sin noticias tuyas, la psicología cognitiva describe la activación del Efecto Zeigarnik: la mente humana tiende a obsesionarse con tareas o ciclos incompletos mucho más que con aquellos que ya tienen un desenlace cerrado. Al no haber recibido un mensaje de cierre o un reclamo, la historia entre ambos permanece como una pregunta abierta en su cabeza.",
      "En esta segunda ventana, los niveles de cortisol defensivo descienden considerablemente. Cuando el estrés baja, el hipocampo femenino comienza a procesar memorias retrospectivas con un filtro mucho más benévolo: la hostilidad inicial se diluye y empiezan a emerger recuerdos de complicidad, intimidad y momentos compartidos.",
      "La pregunta interna de ella pasa de '¿por qué me molesta?' a '¿por qué no me ha buscado? ¿Estará tranquilo? ¿Ya lo superó?'. Esta duda es el motor biológico de la atracción: el deseo florece en el espacio y en la incertidumbre calibrada, nunca en la saturación constante.",
      "Durante este período es muy frecuente que ella recurra a 'micro-pings' indirectos: mirar tus historias de inmediato, subir una canción con doble sentido o publicar una foto atractiva. Tu trabajo sigue siendo la templanza: no reacciones a provocaciones digitales ni intentes decodificar cada movimiento."
    ],
    keyTakeaway: "La curiosidad es el puente indispensable entre el distanciamiento y el deseo de reconexión. No apresures este proceso; déjalo madurar.",
    nextStepCard: {
      statusText: "Ya sabes AHORA que el cerebro de ella está en modo curiosidad.",
      actionText: "El próximo paso es romper el hielo con el mensaje correcto sin parecer ansioso ni necesitado.",
      buttonLabel: "Preparar mi mensaje →"
    }
  },
  3: {
    number: 3,
    title: "Ventana de Reconexión",
    hoursRange: "48h – 72h",
    minHours: 48,
    maxHours: 72,
    colorName: "green",
    colorHex: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    headline: "Reactivación de la oxitocina y disposición al contacto presencial",
    paragraphs: [
      "Entre las 48 y 72 horas se abre la ventana crítica donde la resistencia psicológica se encuentra en su nivel más bajo y el anhelo de contacto alcanza un pico óptimo. Los niveles de oxitocina (la hormona del apego y la conexión) buscan un estímulo de reconexión seguro, siempre y cuando no perciba que tú vienes a 'cobrarle' una factura emocional.",
      "En este punto, un mensaje genérico como 'Hola, ¿cómo estás?' es un error destructivo: demuestra que no entendiste nada, le devuelve el control total y reactiva su aburrimiento. Por el contrario, un estímulo de curiosidad contextual o una invitación de bajo compromiso (micro-cita de 15 minutos) encaja a la perfección con su estado mental.",
      "El objetivo no es tener una 'conversación seria' sobre la relación ni pedirle que regresen por chat. El único propósito de la Fase 3 es generar una interacción liviana, libre de culpa, que culmine en un encuentro presencial corto y magnético.",
      "Si ella responde positivamente, mantén la sobriedad: no satures su bandeja con respuestas instantáneas. Si responde fría o tarda en contestar, tu marco de serenidad permanece inalterable: tienes un protocolo y el tiempo juega a tu favor."
    ],
    keyTakeaway: "La reconexión exitosa no se ruega ni se discute: se propone desde una posición de liviandad, seguridad personal y cero presión.",
    nextStepCard: {
      statusText: "La ventana de reconexión presencial está abierta.",
      actionText: "El próximo paso es calibrar la invitación de bajo compromiso y ejecutar con precisión.",
      buttonLabel: "Ver opciones de reconexión →"
    }
  }
};

export const PHASE_FRAMEWORKS: Record<1 | 2 | 3, PhaseFramework> = {
  1: {
    phase: 1,
    title: "Principios del Silencio Estratégico",
    subtitle: "Cómo sostener el vacío para que sus defensas bajen",
    whyImprovisationFails: "Cuando un hombre improvisa en las primeras 24 horas, actúa impulsado por el miedo a perderla. Envía textos explicativos largos o preguntas de confirmación que suenan desesperadas.",
    principles: [
      {
        number: 1,
        title: "Regla de Oro de Cero Contacto Activo",
        description: "No escribir, no llamar, no reaccionar a historias ni buscar excusas 'logísticas' para entablar contacto.",
        exampleDo: "Mantener el teléfono en modo silencio y enfocar tu energía en el ejercicio físico.",
        exampleDont: "Mandar un mensaje diciendo: 'Solo quería ver si estabas bien, no te molesto más'."
      },
      {
        number: 2,
        title: "Contención de la Rumiación Digital",
        description: "Revisar su última conexión o quién la sigue activa tu amígdala y sabotea tu paz mental.",
        exampleDo: "Archivar el chat y registrar tus impulsos en el Diario de Ansiedad.",
        exampleDont: "Mirar su foto de perfil cada 15 minutos para ver si cambió algo."
      },
      {
        number: 3,
        title: "Compostura ante Contacto Espontáneo",
        description: "Si ella te escribe primero con algo trivial, no respondas en 10 segundos. Calibra tu tiempo.",
        exampleDo: "Esperar al menos 45 a 90 minutos para responder con tono amable pero breve.",
        exampleDont: "Responder al segundo diciendo: '¡Pensé que estabas enojada conmigo! ¿Cómo estás?'"
      }
    ],
    accelerationBridge: {
      text: "Crear tu mensaje desde cero en esta fase tiene un 73% de riesgo de activar sus defensas. Con el Acelerador 89%, cuentas con la fórmula exacta de silencio y la respuesta calibrada si ella escribe primero.",
      ctaLabel: "Ver scripts de contención"
    }
  },
  2: {
    phase: 2,
    title: "Principios del Despertar de Curiosidad",
    subtitle: "Cómo generar interés sin mostrar tu mano",
    whyImprovisationFails: "Al ver señales sutiles de ella (vistos rápidos, indirectas), el hombre impulsivo asume que 'ya todo está bien' y se lanza con intensidad prematura, asustándola de nuevo.",
    principles: [
      {
        number: 1,
        title: "El Ancla Nostálgica Neutra",
        description: "Hacer referencia a un momento positivo o gracioso sin pedir nada a cambio ni mencionar la ruptura.",
        exampleDo: "'Pasé por [lugar] y me acordé de [anécdota divertida]. Espero que estés súper bien.'",
        exampleDont: "'¿Te acuerdas de cuando éramos felices y fuimos a ese lugar? Extraño esos días.'"
      },
      {
        number: 2,
        title: "La Curiosidad Inconclusa (Efecto Zeigarnik)",
        description: "Abrir un bucle de información ligero que despierte sus ganas de saber más sin sonar manipulador.",
        exampleDo: "'Vi algo hoy que me recordó mucho a una charla nuestra. Después te cuento. Que tengas buen día.'",
        exampleDont: "'Tengo algo muy importante que decirte sobre nosotros. Por favor contéstame.'"
      },
      {
        number: 3,
        title: "Escasez Calibrada en los Tiempos de Respuesta",
        description: "Tu tiempo de respuesta debe comunicar que tienes una vida activa y productiva.",
        exampleDo: "Demorar entre 30 y 60 minutos en responder y mantener tus frases más cortas que las de ella.",
        exampleDont: "Escribir párrafos gigantescos respondiendo a un mensaje de cuatro palabras."
      }
    ],
    accelerationBridge: {
      text: "Saber qué decir en la Fase 2 marca la diferencia entre abrir una charla magnética o matar la atracción. El Acelerador 89% te entrega las palabras validadas para copiar y enviar.",
      ctaLabel: "Ver scripts de curiosidad"
    }
  },
  3: {
    phase: 3,
    title: "Principios de la Micro-Cita de Bajo Compromiso",
    subtitle: "Cómo llevar la conversación del chat al mundo real",
    whyImprovisationFails: "La mayoría de hombres propone una 'cena romántica' o un plan pesado de 4 horas que genera pánico en ella por el compromiso emocional que implica.",
    principles: [
      {
        number: 1,
        title: "La Cláusula de Salida Preestablecida",
        description: "Proponer un encuentro con duración límite declarada de antemano (15 a 20 minutos).",
        exampleDo: "'Voy a tomar un café rápido de 15 minutos cerca de tu trabajo. Si andas libre, acompáñame.'",
        exampleDont: "'Me gustaría que salgamos a cenar el fin de semana para hablar de nuestro futuro.'"
      },
      {
        number: 2,
        title: "Inversión de Valor ante la Negativa",
        description: "Si ella dice que está ocupada, retirar la oferta con elegancia y sin rencor.",
        exampleDo: "'Cero drama, otro día que coincidamos lo hacemos. ¡Que tengas buena semana!'",
        exampleDont: "'Bueno, avísame cuándo tienes tiempo porque de verdad necesito verte.'"
      },
      {
        number: 3,
        title: "Energía Masculina de Cero Reclamo",
        description: "Durante el café, prohibido hablar de lo que pasó, de quién tuvo la culpa o de 'volver'.",
        exampleDo: "Hablar de tus proyectos, anécdotas divertidas y ser tú el primero en retirarse.",
        exampleDont: "Preguntarle si ha conocido a alguien más o pedirle que reconsidere la relación."
      }
    ],
    accelerationBridge: {
      text: "La transición al café presencial requiere precisión quirúrgica. Con el Acelerador 89%, recibes los scripts exactos de invitación y el árbol de decisión ante cualquier respuesta de ella.",
      ctaLabel: "Ver scripts de micro-cita"
    }
  }
};

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Fase 1 (8 items)
  { id: 'f1_1', phase: 1, label: 'No envié ningún mensaje ni llamé por impulso', category: 'Silencio', points: 3 },
  { id: 'f1_2', phase: 1, label: 'No revisé su última conexión ni redes sociales', category: 'Control Digital', points: 3 },
  { id: 'f1_3', phase: 1, label: 'Escribí en mi diario de impulsos ante la primera ola de ansiedad', category: 'Psicología', points: 2 },
  { id: 'f1_4', phase: 1, label: 'Realicé mi respiración guiada de calma (90 segundos)', category: 'Biología', points: 2 },
  { id: 'f1_5', phase: 1, label: 'Mantuve mi teléfono fuera del alcance visual por 3 horas consecutivas', category: 'Disciplina', points: 2 },
  { id: 'f1_6', phase: 1, label: 'Completé una sesión de ejercicio físico para quemar cortisol', category: 'Fisiología', points: 2 },
  { id: 'f1_7', phase: 1, label: 'No publiqué indirectas, canciones ni fotos nostálgicas en mis redes', category: 'Dignidad', points: 3 },
  { id: 'f1_8', phase: 1, label: 'Leí la guía neuroquímica de la Fase 1 en Herramientas', category: 'Educación', points: 1 },

  // Fase 2 (8 items)
  { id: 'f2_1', phase: 2, label: 'Resistí la tentación de felicitarla o buscar pretextos absurdos', category: 'Silencio', points: 3 },
  { id: 'f2_2', phase: 2, label: 'Si ella vio mis historias o interactuó, no le escribí de inmediato', category: 'Calibración', points: 3 },
  { id: 'f2_3', phase: 2, label: 'Estructuré mi marco mental repasando los 3 principios de mensaje', category: 'Estrategia', points: 2 },
  { id: 'f2_4', phase: 2, label: 'Hice mi registro de impulsos para descargar pensamientos repetitivos', category: 'Psicología', points: 2 },
  { id: 'f2_5', phase: 2, label: 'Escuché una intervención de audio relajante para centrar mi mente', category: 'Biología', points: 2 },
  { id: 'f2_6', phase: 2, label: 'Me concentré 100% en mi trabajo o proyectos personales', category: 'Vida Propia', points: 2 },
  { id: 'f2_7', phase: 2, label: 'No pedí opiniones contradictorias a amigos o familiares', category: 'Enfoque', points: 2 },
  { id: 'f2_8', phase: 2, label: 'Verifiqué que no haya rencor en mi diálogo interno', category: 'Autocontrol', points: 2 },

  // Fase 3 (8 items)
  { id: 'f3_1', phase: 3, label: 'Evalué el clima emocional de ella antes de tomar cualquier acción', category: 'Calibración', points: 3 },
  { id: 'f3_2', phase: 3, label: 'Si decidí escribir, elegí un ancla neutral y cero reclamos', category: 'Mensajería', points: 3 },
  { id: 'f3_3', phase: 3, label: 'Tengo clara la cláusula de salida de 15 minutos para la micro-cita', category: 'Estrategia', points: 3 },
  { id: 'f3_4', phase: 3, label: 'Repasé las 3 reglas de postura para un encuentro presencial', category: 'Presencia', points: 2 },
  { id: 'f3_5', phase: 3, label: 'No mostré frustración si la respuesta de ella tardó en llegar', category: 'Templanza', points: 3 },
  { id: 'f3_6', phase: 3, label: 'Mantuve mis respuestas más breves y concisas que las de ella', category: 'Valor', points: 2 },
  { id: 'f3_7', phase: 3, label: 'Completé el ciclo de 72 horas manteniendo mi dignidad intacta', category: 'Hito', points: 3 },
  { id: 'f3_8', phase: 3, label: 'Anoté mis aprendizajes clave en el diario de progreso', category: 'Cierre', points: 2 }
];

export const EDUCATIONAL_LESSONS: EducationalLesson[] = [
  {
    id: "lesson_1",
    number: 1,
    title: "Los 5 Errores Fatales de Comunicación",
    readTime: "Lectura de 3 min",
    summary: "Los comportamientos reactivos que destruyen el 73% de las posibilidades en las primeras horas.",
    content: {
      intro: "Cuando un hombre percibe el alejamiento de su pareja, su sistema biológico activa una respuesta de emergencia. Esta alarma lo empuja a querer 'arreglar las cosas de inmediato', cometiendo los errores más costosos.",
      points: [
        {
          title: "1. El Párrafo Testimonial de Arrepentimiento",
          explanation: "Enviar textos bíblicos explicando cuánto la amas o cuánto has cambiado. Para ella, esto suena a justificación no solicitada y demuestra una abrumadora necesidad de aprobación."
        },
        {
          title: "2. Las Preguntas de Cierre Prematuro",
          explanation: "Decir '¿Entonces ya no me quieres?' o '¿Se acabó todo para siempre?'. Esto la obliga a tomar una postura defensiva tajante, cerrándote la puerta por orgullo."
        },
        {
          title: "3. La Fiscalización Digital",
          explanation: "Reclamarle por estar en línea, por una foto o por seguir a alguien nuevo. Es el mayor indicador de inseguridad y baja autoestima ante sus ojos."
        },
        {
          title: "4. Las Disculpas Compulsivas por Cosas que No Hiciste",
          explanation: "Asumir la culpa de todo para apaciguar su enojo. Esto no genera empatía; destruye el respeto que ella sentía por tu criterio y firmeza."
        },
        {
          title: "5. La Promesa de Cambio Instantáneo",
          explanation: "Decir 'te juro que voy a cambiar'. Las palabras regaladas no tienen valor biológico; solo el cambio observado a través del tiempo y la distancia resulta convincente."
        }
      ],
      conclusion: "El autocontrol no es debilidad. Es la manifestación más elocuente de que tu mundo interior es más grande que cualquier crisis circunstancial."
    }
  },
  {
    id: "lesson_2",
    number: 2,
    title: "Cómo Funciona su Cerebro Tras la Ruptura",
    readTime: "Lectura de 4 min",
    summary: "La danza hormonal entre la amígdala, el cortisol y el hipocampo femenino.",
    content: {
      intro: "La mente femenina no procesa la separación de manera lineal. Comprender su cronobiología te da la ventaja estratégica de actuar cuando sus defensas están abiertas, no cuando están blindadas.",
      points: [
        {
          title: "Día 1: Alivio y Orgullo Defensivo",
          explanation: "Su amígdala está en alerta máxima. Siente que tomó la decisión correcta y espera que tú confirmes su hipótesis actuando como un hombre desesperado."
        },
        {
          title: "Día 2: Curiosidad por Desconcierto",
          explanation: "Si tú no apareces, el cortisol defensivo baja y se activa el Efecto Zeigarnik. Se pregunta cómo es posible que no le estés rogando como esperaba."
        },
        {
          title: "Día 3: Nostalgia Selectiva",
          explanation: "El hipocampo filtra las malas memorias y rescata momentos de intimidad. La falta de noticias tuyas genera una pequeña carencia dopaminérgica que ella deseará saciar."
        }
      ],
      conclusion: "Si intervienes el Día 1, la confirmas en su enojo. Si intervienes al final de la ventana de 72h con las palabras exactas, te encuentras con una mujer receptiva."
    }
  },
  {
    id: "lesson_3",
    number: 3,
    title: "Qué NUNCA Decir: La Lista Negra de Frases",
    readTime: "Lectura de 3 min",
    summary: "Expresiones comunes que anulan instantáneamente la atracción y el misterio.",
    content: {
      intro: "Hay frases que disparan inmediatamente el rechazo instintivo en una mujer. Grábate esta lista para no decirlas jamás, ni en broma ni por enojo.",
      points: [
        {
          title: "❌ 'No puedo vivir sin ti'",
          explanation: "Comunica dependencia tóxica. Nadie se siente atraído por una carga emocional que no puede sostenerse a sí misma."
        },
        {
          title: "❌ 'Dime qué hice mal y lo arreglo'",
          explanation: "La pone en el rol de tu madre o tu jueza. Ella no quiere educar a un hombre; quiere admirar a un hombre con dirección propia."
        },
        {
          title: "❌ 'Solo quiero 5 minutos para hablar'",
          explanation: "Ella sabe que nunca son 5 minutos; sabe que intentarás convencerla con argumentos lógicos. Las emociones no se negocian con debates."
        },
        {
          title: "❌ '¿Por qué me haces esto si yo te di todo?'",
          explanation: "Victimismo puro. El reproche solo genera culpa, y la culpa es el peor enemigo del deseo y la admiración."
        }
      ],
      conclusion: "Tu lenguaje debe transmitir abundancia emocional, respeto por su decisión y absoluta tranquilidad con respecto a tu propio valor."
    }
  },
  {
    id: "lesson_4",
    number: 4,
    title: "Biología de la Escasez y el Valor Percibido",
    readTime: "Lectura de 3 min",
    summary: "Por qué lo que abunda se devalúa y lo que escasea se convierte en prioridad.",
    content: {
      intro: "El valor de cualquier elemento en la naturaleza está íntimamente ligado a su disponibilidad. Cuando tú estás disponible las 24 horas del día, tu atención pierde todo su peso biológico.",
      points: [
        {
          title: "La Paradoja de la Disponibilidad",
          explanation: "Si respondes en 3 segundos a cada mensaje, comunicas inconscientemente que no tienes nada más relevante que hacer con tu tiempo."
        },
        {
          title: "El Poder de Retirar la Atención",
          explanation: "Tu atención es tu moneda de mayor valor. Si ella se muestra fría o distante, tu respuesta más elegante no es el enojo: es retirar tu inversión y dedicarte a lo tuyo."
        },
        {
          title: "La Calibración del Tiempo",
          explanation: "Dejar pasar 45 a 90 minutos para responder no es un juego manipulador; es el ritmo natural de un hombre con responsabilidades, amigos y metas claras."
        }
      ],
      conclusion: "No temas que ella 'se olvide de ti' por no escribirle en unos días. Lo que se recuerda con fascinación es lo que no se tiene garantizado."
    }
  },
  {
    id: "lesson_5",
    number: 5,
    title: "El Principio de la Inversión Emocional",
    readTime: "Lectura de 4 min",
    summary: "Hacer que ella participe activamente en la conversación en lugar de hacer todo el esfuerzo solo.",
    content: {
      intro: "Las personas valoran aquello en lo que han tenido que invertir esfuerzo, tiempo y pensamiento. Si tú haces el 90% del trabajo en el chat, ella no tiene espacio para invertir.",
      points: [
        {
          title: "La Regla del 1 por 1",
          explanation: "Si ella te envía un renglón, tú respondes con un renglón. Si ella te hace una pregunta, respóndela y deja que sea ella quien mantenga el ritmo."
        },
        {
          title: "Cerrar Primero las Interacciones",
          explanation: "Aprende a despedirte cuando la charla esté en su mejor momento: 'Me encantó hablar, ando saliendo a entrenar. Te mando un abrazo'. Esto deja el deseo abierto."
        },
        {
          title: "Cero Reclamos por Silencios",
          explanation: "Si ella tarda horas o días en contestar, jamás reclames. Cuando vuelva a escribir, responde con cordialidad y a tu propio ritmo."
        }
      ],
      conclusion: "La verdadera atracción ocurre en el espacio entre mensajes, cuando ella piensa en ti y se pregunta qué estarás haciendo."
    }
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "audio_1",
    title: "Reseteo del Sistema Nervioso (432 Hz)",
    subtitle: "Desaceleración de la amígdala y descenso de cortisol",
    durationSeconds: 180,
    frequency: "432 Hz",
    description: "Tono puro continuo diseñado para inducir ondas cerebrales alfa y disolver el impulso ansioso de escribir.",
    spokenGuidance: "Respira profundo. Inhala en cuatro tiempos. Sostén tu respiración. Exhala suavemente. En este instante no hay nada urgente que resolver. Tu silencio es tu mayor fortaleza y tu dignidad está intacta."
  },
  {
    id: "audio_2",
    title: "Foco y Compostura Masculina (528 Hz)",
    subtitle: "Claridad mental y anclaje de seguridad personal",
    durationSeconds: 240,
    frequency: "528 Hz",
    description: "Frecuencia de claridad que ayuda a despejar la mente de escenarios catastróficos imaginarios.",
    spokenGuidance: "Observa el impulso sin juzgarlo. Es solo una ola química que pasará en pocos minutos. Recuerda que un hombre en control de sí mismo nunca suplica por atención. Vuelve a tu centro."
  },
  {
    id: "audio_3",
    title: "Disolución del Pánico de Pérdida (639 Hz)",
    subtitle: "Equilibrio afectivo y templanza en la soledad",
    durationSeconds: 300,
    frequency: "639 Hz",
    description: "Armónicos calmantes que reducen la sensación de vacío en el pecho producida por la abstinencia afectiva.",
    spokenGuidance: "Siente tus pies firmes en el suelo. El miedo a perderla no define tu destino. Cuando aprendes a sostener tu propio espacio, recuperas el magnetismo que alguna vez encendió la atracción."
  }
];

// ==========================================
// CENTRAL DE SCRIPTS - ACELERADOR 89%
// ==========================================
// ==========================================
// CENTRAL DE SCRIPTS - ACELERADOR 89% (22 SCRIPTS)
// ==========================================
export const SCRIPT_PACKAGES: ScriptPackage[] = [
  // -------------------------------------------------------------
  // PAQUETE 1: Rompehielos de Curiosidad y Anclas Nostálgicas (6 scripts)
  // -------------------------------------------------------------
  {
    id: "pkg_rompehielos",
    number: 1,
    title: "Paquete 1: Rompehielos de Curiosidad y Anclas Nostálgicas",
    subtitle: "Reapertura de contacto sin presión, drama ni reclamos",
    phase: "Fase 2 (24h – 48h) o posterior",
    filterQuestion: "¿Cuánto tiempo llevan sin hablar?",
    filterOptions: [
      { value: "dias_1_3", label: "1 a 3 días de silencio" },
      { value: "semanas_1_4", label: "1 a 4 semanas" },
      { value: "mas_1_mes", label: "Más de 1 mes" }
    ],
    scripts: [
      // REEMPLAZAR: script real aquí - Card 1.1 El Ancla Nostálgica Neutra
      {
        id: "s1_1",
        packageId: "pkg_rompehielos",
        title: "Card 1.1 — El Ancla Nostálgica Neutra",
        objective: "Activar memoria afectiva positiva sin pedir nada a cambio",
        context: "Ideal tras 1 a 3 días de silencio absoluto. Trae a la mente una situación amena y corta la tensión.",
        message: "Oye, recién pasé por [lugar/situación neutra] y me acordé de cuando [anécdota breve y divertida, sin drama]. Espero que estés súper bien.",
        whyItWorks: "No exige respuesta, no habla de la relación y genera una sonrisa automática al recordar una emoción compartida positiva sin reactivar cortisol.",
        temperature: "Tibia",
        isFreePreview: true,
        filterTag: "dias_1_3",
        audioGuidanceText: "Envía este mensaje con tono relajado y desenfadado, como si se lo enviaras a un buen amigo. Prohibido agregar emojis con corazones o signos de exclamación exagerados. La clave es la soltura.",
        decisionBranches: [
          {
            id: "b1_1_a",
            conditionLabel: "A) Responde amigable o curiosa (ej. '¡Jajaja qué recuerdos!')",
            recommendation: "Espera 20 a 30 minutos (escasez calibrada) y usa el Script 2.1 del Paquete 2. Mantén el texto más corto que el de ella.",
            targetScriptId: "s2_1",
            badge: "Escasez Calibrada"
          },
          {
            id: "b1_1_b",
            conditionLabel: "B) Responde fría o cortante (ej. 'Ah qué bien')",
            recommendation: "Cierra con alto valor en 2 horas: 'Bueno, un abrazo por allá.' No hagas más preguntas ni intentes alargar la charla.",
            targetScriptId: "s2_5",
            badge: "Cierre Alto Valor"
          },
          {
            id: "b1_1_c",
            conditionLabel: "C) Te dejó en visto",
            recommendation: "Activa el Escudo Anti-Frieza (Paquete 4). Silencio absoluto las próximas 72 horas. Cero reclamos.",
            targetScriptId: "s4_3",
            badge: "Escudo Anti-Frieza"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 1.2 El Detalle Situacional Compartido
      {
        id: "s1_2",
        packageId: "pkg_rompehielos",
        title: "Card 1.2 — El Detalle Situacional Compartido",
        objective: "Retomar contacto apoyado en un estímulo del entorno inmediato",
        context: "Para 1 a 3 días de distancia. Se apoya en una coincidencia cotidiana para justificar la reapertura sin sonar premeditado.",
        message: "Acabo de ver [objeto curioso / mascota parecida a la de ella / meme sutil de su profesión] y fue inevitable acordarme. Te mando un saludo rápido.",
        whyItWorks: "La excusa situacional reduce al mínimo la guardia defensiva porque atribuye el mensaje a una casualidad externa, no a necesidad afectiva.",
        temperature: "Tibia",
        isFreePreview: false,
        filterTag: "dias_1_3",
        audioGuidanceText: "Léelo con total espontaneidad. Cero solemnidad. Debe sentirse como una ráfaga breve de aire fresco.",
        decisionBranches: [
          {
            id: "b1_2_a",
            conditionLabel: "A) Ella reacciona con risas o envía foto/audio",
            recommendation: "Pasa a la Calibración de Progreso Personal (Script 2.1). Deja que ella hable más de lo que tú escribes.",
            targetScriptId: "s2_1",
            badge: "Puerta Abierta"
          },
          {
            id: "b1_2_b",
            conditionLabel: "B) Contesta sólo con un 'Jaja gracias'",
            recommendation: "No contestes nada de inmediato. Deja que el mensaje asiente durante 24 a 48 horas.",
            badge: "Pausa Estratégica"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 1.3 La Curiosidad Inconclusa
      {
        id: "s1_3",
        packageId: "pkg_rompehielos",
        title: "Card 1.3 — La Curiosidad Inconclusa",
        objective: "Explotar el Efecto Zeigarnik para que sea ella quien busque continuar la charla",
        context: "Para romper un silencio de 1 a 4 semanas con una chispa de intriga natural.",
        message: "Oye, vi algo hoy que me hizo acordar mucho a una conversación que tuvimos. Después te cuento con más calma. Que tengas buen día.",
        whyItWorks: "Deja un bucle abierto en su mente. Su cerebro detesta la información incompleta y deseará saber a qué te refieres.",
        temperature: "Tibia",
        isFreePreview: false,
        filterTag: "semanas_1_4",
        audioGuidanceText: "Dilo con voz pausada y segura. Si ella pregunta qué viste, no te desesperes por contarlo de golpe. La tensión agradable está en el misterio temporal.",
        decisionBranches: [
          {
            id: "b1_3_a",
            conditionLabel: "A) Pregunta de inmediato ('¿Qué viste? Cuéntame')",
            recommendation: "Mantén el misterio. Responde 3 o 4 horas después: 'Ando en medio de una reunión, más tarde te escribo.' Genera un pico de dopamina y expectativa.",
            badge: "Pico de Dopamina"
          },
          {
            id: "b1_3_b",
            conditionLabel: "B) Responde con un simple emoji o 'Ok'",
            recommendation: "No insistas. Deja que el bucle mental trabaje en su cabeza durante las próximas 48 horas.",
            badge: "Bucle Abierto"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 1.4 La Pregunta Experta Casual
      {
        id: "s1_4",
        packageId: "pkg_rompehielos",
        title: "Card 1.4 — La Pregunta Experta Casual",
        objective: "Pedir una opinión técnica o recomendación sobre algo que ella domina",
        context: "Para 1 a 4 semanas. A cualquier mujer le agrada sentirse experta y valorada en su área de conocimiento.",
        message: "Hola, una pregunta rápida: ¿cómo se llamaba aquel [restaurante / libro de diseño / app] del que me hablaste una vez? Un amigo me pidió una recomendación en esa zona.",
        whyItWorks: "El pretexto es externo ('un amigo me pidió recomendación'), lo que elimina la incomodidad de pensar que le estás coqueteando directamente.",
        temperature: "Tibia",
        isFreePreview: false,
        filterTag: "semanas_1_4",
        audioGuidanceText: "Léelo con total naturalidad, sin entonación de culpa ni formalismos excesivos.",
        decisionBranches: [
          {
            id: "b1_4_a",
            conditionLabel: "A) Ella te pasa los datos y te pregunta cómo estás",
            recommendation: "Agradece brevemente y aplica el Script 2.1 para relatar tus avances con sobriedad.",
            targetScriptId: "s2_1",
            badge: "Apertura Activa"
          },
          {
            id: "b1_4_b",
            conditionLabel: "B) Solo te pasa el nombre del lugar de forma seca",
            recommendation: "Di simplemente: '¡Ese mismo era, mil gracias!' y no escribas nada más durante 4 o 5 días.",
            badge: "Cero Presión"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 1.5 El Rescate de Memoria Ligera
      {
        id: "s1_5",
        packageId: "pkg_rompehielos",
        title: "Card 1.5 — El Rescate de Memoria Ligera",
        objective: "Conectar con gustos comunes sin generar resistencia",
        context: "Recomendado para silencios de más de un mes cuando ya no existe enojo activo.",
        message: "Me acabo de topar con [canción/libro/serie] que solíamos comentar y me sacó una sonrisa. Espero que tu semana venga increíble.",
        whyItWorks: "Demuestra que la recuerdas con afecto pero que no estás pendiente ni necesitado de su presencia constante.",
        temperature: "Receptiva",
        isFreePreview: false,
        filterTag: "mas_1_mes",
        audioGuidanceText: "Proyecta calma y gratitud desapegada. El objetivo es transmitir que tu vida sigue marchando con plenitud.",
        decisionBranches: [
          {
            id: "b1_5_a",
            conditionLabel: "A) Ella comenta la canción con entusiasmo",
            recommendation: "Intercambia dos mensajes ligeros y luego salte con elegancia: 'Qué buen gusto teníamos jaja. Ando saliendo a una reunión, te mando un abrazo'.",
            badge: "Cierre Arriba"
          },
          {
            id: "b1_5_b",
            conditionLabel: "B) Apenas da un like al mensaje",
            recommendation: "Toma el like como un acuse de recibo amable. No insistas. Vuelve al silencio estratégico.",
            badge: "Silencio Fijo"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 1.6 El Reencuadre Maduro Desapegado
      {
        id: "s1_6",
        packageId: "pkg_rompehielos",
        title: "Card 1.6 — El Reencuadre Maduro Desapegado",
        objective: "Restablecer cordialidad tras una separación de largo plazo (más de 1 mes)",
        context: "Para limpiar cualquier aspereza residual y abrir un canal limpio desde una posición de serenidad.",
        message: "Hola [Nombre]. Ha pasado buen tiempo y quería mandarte un saludo sincero. Espero que tus proyectos personales y familiares estén yendo muy bien.",
        whyItWorks: "La madurez limpia la defensiva. Al no incluir pedidos, disculpas excesivas ni ruegos, establece un marco de respeto entre dos adultos.",
        temperature: "Tibia",
        isFreePreview: false,
        filterTag: "mas_1_mes",
        audioGuidanceText: "Léelo con voz templada, profunda y sobria. Eres un hombre que ha crecido y no tiene cuentas pendientes.",
        decisionBranches: [
          {
            id: "b1_6_a",
            conditionLabel: "A) Responde con cordialidad amplia y cuenta de su vida",
            recommendation: "Aplica el Script 2.1 para mantener la reciprocidad equilibrada sin apresurar el encuentro.",
            targetScriptId: "s2_1",
            badge: "Reciprocidad"
          },
          {
            id: "b1_6_b",
            conditionLabel: "B) Responde formal y distante ('Hola, gracias, igualmente')",
            recommendation: "No contestes de vuelta. Deja que el respeto asentado actúe como tu mejor carta de presentación.",
            badge: "Distancia Dignidad"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // PAQUETE 2: Respuestas de Alto Valor y Escasez Calibrada (6 scripts)
  // -------------------------------------------------------------
  {
    id: "pkg_respuestas",
    number: 2,
    title: "Paquete 2: Respuestas de Alto Valor y Escasez Calibrada",
    subtitle: "Mantener el marco de atractivo cuando ella reanuda la charla",
    phase: "Fase 2 o Fase 3",
    filterQuestion: "¿Cómo se está portando ella?",
    filterOptions: [
      { value: "curiosa", label: "Responde curiosa / interesada" },
      { value: "neutra", label: "Retomó la conversación neutra" },
      { value: "fria", label: "Responde fría o cortante" }
    ],
    scripts: [
      // REEMPLAZAR: script real aquí - Card 2.1 Calibración de Progreso Personal
      {
        id: "s2_1",
        packageId: "pkg_respuestas",
        title: "Card 2.1 — Calibración de Progreso Personal",
        objective: "Mostrar que tu vida tiene movimiento y vitalidad sin sonar presumido",
        context: "Cuando ella pregunta '¿Cómo has estado?' o '¿Qué es de tu vida?'.",
        message: "¡Hola! Todo excelente por acá, ando justo terminando [proyecto laboral/entrenamiento/clase nueva] y me acordé de eso. ¿Tú qué tal la semana?",
        whyItWorks: "Muestra que estás enfocado en tus metas y que no te quedaste esperando su mensaje en un rincón.",
        temperature: "Receptiva",
        isFreePreview: true,
        filterTag: "curiosa",
        timingInstruction: "⏱️ Espera al menos 45 minutos antes de enviar este mensaje.",
        audioGuidanceText: "Tu voz debe sonar enérgica pero sobria. No intentes sobreactuar felicidad. Simplemente transmite que estás involucrado en tus proyectos diarios con total tranquilidad.",
        decisionBranches: [
          {
            id: "b2_1_a",
            conditionLabel: "A) Muestra curiosidad por tu nueva rutina",
            recommendation: "Responde ligero y enfocado en el presente, sin dar detalles de más. Deja que su imaginación trabaje.",
            badge: "Misterio Activo"
          },
          {
            id: "b2_1_b",
            conditionLabel: "B) Trae a colación heridas o quejas del pasado",
            recommendation: "Usa el Script de Desescalada del Paquete 4. No te defiendas ni entres en debates lógicos.",
            targetScriptId: "s4_2",
            badge: "Desarme Estratégico"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 2.2 La Validación sin Rendición
      {
        id: "s2_2",
        packageId: "pkg_respuestas",
        title: "Card 2.2 — La Validación sin Rendición",
        objective: "Agradecer un cumplido sin regalar el control de la interacción",
        context: "Si ella te felicita por un logro profesional o una foto tuya.",
        message: "Gracias, la verdad fue un reto grande pero salió impecable. Espero que tus planes también vayan con todo.",
        whyItWorks: "Acepta el elogio con orgullo masculino y devuelve la atención amablemente sin buscar alargar el tema artificialmente.",
        temperature: "Receptiva",
        isFreePreview: false,
        filterTag: "curiosa",
        timingInstruction: "⏱️ Espera entre 35 y 50 minutos antes de contestar.",
        audioGuidanceText: "Proyecta elegancia y madurez. Sé conciso y no agregues preguntas adicionales.",
        decisionBranches: [
          {
            id: "b2_2_a",
            conditionLabel: "A) Ella profundiza en cómo te sientes o quiere verte",
            recommendation: "Pasa directamente a proponer el café de 15 minutos (Script 3.1). La ventana de atracción está en su punto alto.",
            targetScriptId: "s3_1",
            badge: "Ventana Óptima"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 2.3 El Humor Desarmante
      {
        id: "s2_3",
        packageId: "pkg_respuestas",
        title: "Card 2.3 — El Humor Desarmante",
        objective: "Desactivar la solemnidad y devolver la complicidad",
        context: "Si ella lanza un comentario con sarcasmo o una pequeña provocación juguetona.",
        message: "Jaja sigues teniendo el mismo sentido del humor peligroso. Me alegra ver que no has cambiado esa parte.",
        whyItWorks: "No muerdes el anzuelo de la confrontación. Demuestras que nada de lo que diga te desestabiliza.",
        temperature: "Receptiva",
        isFreePreview: false,
        filterTag: "neutra",
        timingInstruction: "⏱️ Espera entre 20 y 30 minutos.",
        audioGuidanceText: "Sonríe mientras lo lees mentalmente. El tono debe ser divertido, pícaro y sin ningún atisbo de resentimiento.",
        decisionBranches: [
          {
            id: "b2_3_a",
            conditionLabel: "A) Se ríe y sigue la broma",
            recommendation: "Aprovecha la buena energía para proponer la micro-cita del Paquete 3 en los próximos mensajes.",
            targetScriptId: "s3_1",
            badge: "Ventana de Cita"
          },
          {
            id: "b2_3_b",
            conditionLabel: "B) Vuelve a ponerse seria",
            recommendation: "No insistas en la broma. Responde con sobriedad y deja que ella lidere la siguiente intervención.",
            badge: "Pausa Sobria"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 2.4 La Curiosidad Invertida
      {
        id: "s2_4",
        packageId: "pkg_respuestas",
        title: "Card 2.4 — La Curiosidad Invertida",
        objective: "Generar que sea ella quien justifique su interés",
        context: "Cuando ella responde de forma ambigua preguntando '¿Y por qué me escribes recién?'.",
        message: "Porque me acordé de algo puntual y me pareció un buen gesto saludarte. Cero drama ni intenciones ocultas, quédate tranquila.",
        whyItWorks: "Desarma su suposición de que estás desesperado. Al nombrar explícitamente el 'cero drama', transmites paz y madurez.",
        temperature: "Tibia",
        isFreePreview: false,
        filterTag: "neutra",
        timingInstruction: "⏱️ Espera al menos 60 minutos. No saltes a justificarte de inmediato.",
        audioGuidanceText: "Dilo con voz firme, sin justificarte ni pedir disculpas. Es un comentario transparente de dos adultos.",
        decisionBranches: [
          {
            id: "b2_4_a",
            conditionLabel: "A) Ella suaviza el tono ('No, está bien, solo me sorprendió')",
            recommendation: "Mantén la ligereza: 'Todo bien entonces. Te mando un abrazo' y déjala con ganas de más.",
            badge: "Control de Marco"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 2.5 El Cierre Elegante de Alto Valor
      {
        id: "s2_5",
        packageId: "pkg_respuestas",
        title: "Card 2.5 — El Cierre Elegante de Alto Valor",
        objective: "Cortar la conversación siendo tú quien se despide primero ante frialdad",
        context: "Si ella contesta con monosílabos ('Bien', 'Ok', 'Ah ya').",
        message: "Bueno, me tengo que poner con unas cosas del trabajo. Que tengas excelente semana, te mando un abrazo.",
        whyItWorks: "Te retiras antes de que ella pueda rechazarte o dejarte en visto. Establece que tu tiempo es valioso y que no mendigas charla.",
        temperature: "Fría",
        isFreePreview: false,
        filterTag: "fria",
        timingInstruction: "⏱️ Envía 2 a 3 horas después de su respuesta fría.",
        audioGuidanceText: "Cero rencor, cero enojo pasivo. Es la despedida educada de quien tiene una agenda llena y prioridades claras.",
        decisionBranches: [
          {
            id: "b2_5_a",
            conditionLabel: "A) Ella responde intentando retenerte ('Bueno dale, que te vaya bien')",
            recommendation: "Dale me gusta al mensaje o déjalo ahí. No reinicies la conversación ese mismo día.",
            badge: "Alto Estatus"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 2.6 El Espejo Emocional Desapegado
      {
        id: "s2_6",
        packageId: "pkg_respuestas",
        title: "Card 2.6 — El Espejo Emocional Desapegado",
        objective: "Emparejar el nivel de inversión de ella para no regalar energía",
        context: "Ella tarda 8 horas en responder un texto corto y escribe sin signos ni calidez.",
        message: "Dale, perfecto. Hablamos en estos días.",
        whyItWorks: "Ley del espejo: si ella invierte un 20%, tú inviertes un 15%. Nunca des el 100% a quien te ofrece las sobras de su atención.",
        temperature: "Fría",
        isFreePreview: false,
        filterTag: "fria",
        timingInstruction: "⏱️ Tómate el mismo tiempo o más del que ella tardó en contestar.",
        audioGuidanceText: "Cuatro palabras. Cero explicaciones. Tu calma es tu mayor armadura.",
        decisionBranches: [
          {
            id: "b2_6_a",
            conditionLabel: "A) Ella no vuelve a escribir",
            recommendation: "Vuelve al Protocolo de Silencio 72H. Su silencio te da la respuesta que necesitas.",
            targetScriptId: "s4_3",
            badge: "Retirada Digna"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // PAQUETE 3: Propuestas de Micro-Citas de Bajo Compromiso (5 scripts)
  // -------------------------------------------------------------
  {
    id: "pkg_invitacion",
    number: 3,
    title: "Paquete 3: Propuestas de Micro-Citas de Bajo Compromiso",
    subtitle: "La transición del chat al reencuentro presencial de 15 minutos",
    phase: "Fase 3 (48h – 72h+)",
    filterQuestion: "¿Qué tipo de pretexto encaja mejor con ustedes?",
    filterOptions: [
      { value: "amistoso", label: "Café de 15 min / Casual" },
      { value: "fluido", label: "Actividad en común / Evento" }
    ],
    scripts: [
      // REEMPLAZAR: script real aquí - Card 3.1 La Invitación de 15 Minutos (Café rápido)
      {
        id: "s3_1",
        packageId: "pkg_invitacion",
        title: "Card 3.1 — La Invitación de 15 Minutos (Café rápido)",
        objective: "Conseguir un café en persona eliminando el miedo al compromiso o a una charla pesada",
        context: "Cuando ya intercambiaron al menos 2 o 3 mensajes fluidos en Fase 3.",
        message: "Oye, voy a estar por [zona neutral] este [día] a las [hora] tomando un café rápido. Si andas desocupada, nos tomamos uno de 15 minutos y nos ponemos al día.",
        whyItWorks: "Poner un límite explícito de tiempo ('15 minutos') desarma su temor de quedarse atrapada en un reclamo sentimental incómodo.",
        temperature: "Receptiva",
        isFreePreview: true,
        filterTag: "amistoso",
        postureChecklist: [
          "1. Llegar puntual y tener hora fija de salida (máximo 40-45 minutos totales en el lugar).",
          "2. Cero hablar del pasado, reclamos, culpables o etiquetas de la relación.",
          "3. Ser el primero en levantarse amablemente, pagar tu parte, sonreír y despedirte."
        ],
        audioGuidanceText: "Lee el mensaje con voz informal, segura y directa. Imagina que la estás invitando a cruzar la calle a comprar una botella de agua: cero trascendencia dramática, cero solemnidad.",
        decisionBranches: [
          {
            id: "b3_1_a",
            conditionLabel: "A) Ella acepta la invitación con gusto",
            recommendation: "Confirma cortito: 'Buenísimo, te aviso cuando vaya saliendo. ¡Abrazo!' No sigas chateando toda la tarde.",
            badge: "Confirmación Rápida"
          },
          {
            id: "b3_1_b",
            conditionLabel: "B) Da una excusa de tiempo ('Ando súper complicada')",
            recommendation: "Inversión de valor inmediata: 'Cero drama, otro día que coincidamos lo hacemos. ¡Cuídate!' No ofrezcas otra fecha de inmediato.",
            badge: "Inversión de Valor"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 3.2 Buscar una Pertenencia / Objeto Olvidado
      {
        id: "s3_2",
        packageId: "pkg_invitacion",
        title: "Card 3.2 — Buscar una Pertenencia u Objeto Olvidado",
        objective: "Aprovechar un asunto logístico real para tener contacto presencial breve",
        context: "Si quedaron libros, prendas o cosas de trabajo en casa del otro.",
        message: "Hola [Nombre], ordenando unas cajas encontré tu [objeto/libro]. Voy a estar cerca de tu zona el [día] a las [hora]. Te lo alcanzo en 5 minutos.",
        whyItWorks: "Es una razón 100% legítima y neutral. No da espacio a que piense que estás inventando excusas románticas.",
        temperature: "Tibia",
        isFreePreview: false,
        filterTag: "amistoso",
        postureChecklist: [
          "1. Entrega el objeto en la puerta o en un punto neutral sin pedir pasar.",
          "2. Vístete impecable, con buen aroma, pero sin sobreproducirte.",
          "3. Intercambia 3 minutos de charla amable y retírate con un 'Tengo que volar, que te vaya excelente'."
        ],
        audioGuidanceText: "Tono logístico, respetuoso y desapegado.",
        decisionBranches: [
          {
            id: "b3_2_a",
            conditionLabel: "A) Ella propone que tomen algo mientras te lo entrega",
            recommendation: "Acepta con naturalidad: 'Dale, tengo 20 minutos antes de mi siguiente compromiso.'",
            badge: "Oportunidad Natural"
          },
          {
            id: "b3_2_b",
            conditionLabel: "B) Pide que se lo dejes con el conserje o en recepción",
            recommendation: "Responde: 'Hecho, ahí te lo dejo. Que estés bien.' Cero quejas ni decepción.",
            badge: "Elegancia Pura"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 3.3 El Evento Casual o Exposición sin Presión
      {
        id: "s3_3",
        packageId: "pkg_invitacion",
        title: "Card 3.3 — El Evento Casual o Exposición sin Presión",
        objective: "Invitarla a un ambiente social abierto donde la atención no recaiga solo en ustedes dos",
        context: "Una feria de arte, concierto al aire libre o lanzamiento donde ambos tienen amigos o intereses afines.",
        message: "El fin de semana voy a ir a [evento/exposición/feria]. Como sé que te encanta ese mundillo, si andas con ganas de dar una vuelta avísame y recorremos un rato.",
        whyItWorks: "Un evento público disminuye la presión de una cita tradicional cara a cara. Hay estímulos alrededor que facilitan la interacción relajada.",
        temperature: "Receptiva",
        isFreePreview: false,
        filterTag: "fluido",
        postureChecklist: [
          "1. Interactúa con el entorno, los expositores o amigos; no te quedes pegado a ella como una sombra.",
          "2. Ríanse de cosas absurdas de la muestra.",
          "3. Si ella quiere quedarse más tiempo y tú debes irte, sé tú quien parta primero."
        ],
        audioGuidanceText: "Proyecta ligereza social y pasión por la actividad.",
        decisionBranches: [
          {
            id: "b3_3_a",
            conditionLabel: "A) Acepta y pregunta detalles del horario",
            recommendation: "Pasa la info precisa y sugiérele coordinar el mismo día para no sobreplanificar.",
            badge: "Plan Ligero"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 3.4 Ayuda Mutua o Favor Profesional Breve
      {
        id: "s3_4",
        packageId: "pkg_invitacion",
        title: "Card 3.4 — Ayuda Mutua o Favor Profesional Breve",
        objective: "Compartir un café a cambio de su mirada en un tema puntual que domina",
        context: "Ella es diseñadora, abogada, médica o especialista en algún campo.",
        message: "Tengo una duda de 10 minutos con [tema específico de su profesión]. Te invito un capuccino y me das tu visto bueno experto.",
        whyItWorks: "A las personas les encanta ser valoradas por su talento intelectual. Crea una dinámica de gratitud y respeto mutuo.",
        temperature: "Receptiva",
        isFreePreview: false,
        filterTag: "amistoso",
        postureChecklist: [
          "1. Lleva la duda preparada de verdad; no inventes algo obvio.",
          "2. Agradece con admiración sincera.",
          "3. Paga la cuenta sin aspavientos."
        ],
        audioGuidanceText: "Voz profesional, respetuosa y cordial.",
        decisionBranches: [
          {
            id: "b3_4_a",
            conditionLabel: "A) Ella ofrece responderte por WhatsApp en vez de verse",
            recommendation: "Acepta la ayuda: 'Buenísimo, gracias por el dato' y no fuerces el encuentro presencial.",
            badge: "Aceptación Ágil"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 3.5 La Invitación Directa y Relajada
      {
        id: "s3_5",
        packageId: "pkg_invitacion",
        title: "Card 3.5 — La Invitación Directa y Relajada",
        objective: "Proponer un encuentro cara a cara sin justificaciones rebuscadas",
        context: "Cuando la conversación por chat ya lleva varios días con buena vibra y emojis cálidos.",
        message: "Ya estuvo bueno de hablar por pantallitas. ¿Qué día de esta semana andas con media hora para vernos un ratito?",
        whyItWorks: "Corta la dinámica de 'amigos virtuales por chat'. Muestra liderazgo masculino y seguridad personal sin rodeos.",
        temperature: "Receptiva",
        isFreePreview: false,
        filterTag: "fluido",
        postureChecklist: [
          "1. No te justifiques ni expliques por qué quieres verla.",
          "2. Si propone un día, elige el horario con decisión.",
          "3. Mantén el misterio: no le cuentes por chat todo lo que le dirás en persona."
        ],
        audioGuidanceText: "Tono cómplice, firme y desenfadado. Un hombre seguro no pide permiso para existir.",
        decisionBranches: [
          {
            id: "b3_5_a",
            conditionLabel: "A) Ella te da dos opciones de días ('El jueves o viernes')",
            recommendation: "Elige jueves a las 18:30 y cierra el plan.",
            badge: "Liderazgo"
          },
          {
            id: "b3_5_b",
            conditionLabel: "B) Ella dice 'No sé si sea buena idea vernos todavía'",
            recommendation: "Aplica el Escudo de Madurez (Script 4.1): 'Completamente entendible, cero presión. Que estés bien.'",
            targetScriptId: "s4_1",
            badge: "Retirada Impecable"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // PAQUETE 4: Escudo Anti-Frieza & 'Necesito Tiempo' (5 scripts)
  // -------------------------------------------------------------
  {
    id: "pkg_conflictos",
    number: 4,
    title: "Paquete 4: Escudo Anti-Frieza & 'Necesito Tiempo'",
    subtitle: "Manejo quirúrgico ante frialdad, pedidos de espacio o vistos",
    phase: "En cualquier momento",
    filterQuestion: "¿Qué situación de fricción estás enfrentando?",
    filterOptions: [
      { value: "espacio", label: "Pidió espacio o tiempo" },
      { value: "fria", label: "Respondió fría o distante" },
      { value: "visto", label: "Te dejó en visto" }
    ],
    scripts: [
      // REEMPLAZAR: script real aquí - Card 4.1 El Escudo de Madurez
      {
        id: "s4_1",
        packageId: "pkg_conflictos",
        title: "Card 4.1 — El Escudo de Madurez",
        objective: "Conceder espacio al 100% de inmediato para generar atracción por desapego radical",
        context: "Cuando ella te dice: 'Necesito un tiempo', 'Estoy confundida' o 'Necesito espacio'.",
        message: "Entiendo y me parece perfecto. Acepto tu espacio. Enfócate en ti y yo haré lo mismo con lo mío. Un abrazo.",
        whyItWorks: "Retira toda la presión de golpe. Desarma su guardia defensiva y le devuelve la responsabilidad emocional de su decisión, mientras a ti te devuelve el 100% de tu dignidad.",
        temperature: "Fría",
        isFreePreview: true,
        filterTag: "espacio",
        calmDownRequired: true,
        highlightNote: "Esta respuesta retira la presión, desarma su guardia y te devuelve el 100% de tu valor y dignidad.",
        audioGuidanceText: "Este es el mensaje más poderoso de todo el protocolo. No le cambies una sola palabra. Léelo con sobriedad absoluta, sin una pizca de ironía ni amargura.",
        decisionBranches: [
          {
            id: "b4_1_a",
            conditionLabel: "A) Responde sorprendida o suave (ej. 'Gracias por entenderlo')",
            recommendation: "Mantén silencio al menos 48 a 72 horas para asentar el marco de firmeza. No envíes ningún mensaje de seguimiento.",
            badge: "Marco de Firmeza"
          },
          {
            id: "b4_1_b",
            conditionLabel: "B) No dice nada tras leerlo",
            recommendation: "Triunfo estratégico. Su silencio confirma que el mensaje caló hondo. No insistas ni una sola palabra.",
            badge: "Triunfo Estratégico"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 4.2 Desescalada de Reclamo Pasado
      {
        id: "s4_2",
        packageId: "pkg_conflictos",
        title: "Card 4.2 — Desescalada de Reclamo Pasado",
        objective: "Acolchonar reproches sin entrar en la dinámica de debate defensivo",
        context: "Si ella te escribe un mensaje largo recriminando situaciones pasadas o discusiones viejas.",
        message: "Tienes razón en varios de los puntos que mencionas y asumo mi parte con madurez. Por mi lado no guardo rencores y te deseo lo mejor de corazón.",
        whyItWorks: "Técnica del acolchonamiento. No se puede pelear con alguien que no ofrece resistencia defensiva. Desarma su hostilidad en segundos.",
        temperature: "Fría",
        isFreePreview: false,
        filterTag: "fria",
        calmDownRequired: true,
        highlightNote: "Aceptar con madurez sin degradarte neutraliza la necesidad de ella de seguir atacando.",
        audioGuidanceText: "Respira profundo antes de copiar. Tu voz debe reflejar a un hombre que superó la necesidad de tener la última palabra.",
        decisionBranches: [
          {
            id: "b4_2_a",
            conditionLabel: "A) Ella baja la guardia y se disculpa también",
            recommendation: "Di: 'Tranquila, todo bien. Que tengas buena noche.' y cierra la conversación por ese día.",
            badge: "Cierre Serena"
          },
          {
            id: "b4_2_b",
            conditionLabel: "B) Sigue atacando con furia",
            recommendation: "No contestes más. Deja el teléfono. Su ira es una tormenta que debe apagarse sola.",
            badge: "Silencio Protector"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 4.3 Silencio ante el Visto (Regla de Oro)
      {
        id: "s4_3",
        packageId: "pkg_conflictos",
        title: "Card 4.3 — El Silencio ante el Visto (Regla de Oro)",
        objective: "Contener la ansiedad tras un mensaje sin contestar",
        context: "Le enviaste un mensaje liviano y no respondió en más de 24 horas.",
        message: "[REGLA DE ORO DE ALTO VALOR: NO ENVIAR NADA. El silencio absoluto es la respuesta más magnética y atractiva ante la falta de reciprocidad temporal.]",
        whyItWorks: "Pedir explicaciones a un visto devalúa tu posición a cero. El silencio demuestra que tu felicidad no depende de su pantalla.",
        temperature: "Fría",
        isFreePreview: false,
        filterTag: "visto",
        calmDownRequired: true,
        highlightNote: "Cualquier texto tras un visto se lee como desesperación. El silencio es tu jugada maestra.",
        audioGuidanceText: "No toques el teclado. Guarda el teléfono en otra habitación, haz 15 flexiones y sal a caminar. El tiempo acomoda las piezas.",
        decisionBranches: [
          {
            id: "b4_3_a",
            conditionLabel: "A) Ella responde días después como si nada",
            recommendation: "Toma el mismo tiempo que ella se tomó para responder y contesta con cordialidad concisa.",
            badge: "Espejo Calibrado"
          },
          {
            id: "b4_3_b",
            conditionLabel: "B) Pasan más de 5 días sin señales",
            recommendation: "Enfócate en tu checklist diario y tus proyectos. No vuelvas a escribirle hasta que ella inicie contacto.",
            badge: "Autodominio"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 4.4 Reacción Fría o Monosilábica
      {
        id: "s4_4",
        packageId: "pkg_conflictos",
        title: "Card 4.4 — Reacción Fría o Monosilábica",
        objective: "Neutralizar el desinterés sin mostrarte herido ni ofendido",
        context: "Intentaste una apertura y contestó con frialdad tajante.",
        message: "Todo en orden. Te mando un saludo y que tengas una buena semana.",
        whyItWorks: "Elimina la posibilidad de que ella piense que te afectó su frialdad. Muestra que tienes una vida plena que no se tambalea por un mensaje seco.",
        temperature: "Fría",
        isFreePreview: false,
        filterTag: "fria",
        calmDownRequired: true,
        highlightNote: "La indiferencia educada desarma el juego de poder en el acto.",
        audioGuidanceText: "Tono neutro, educado y distante.",
        decisionBranches: [
          {
            id: "b4_4_a",
            conditionLabel: "A) Ella no responde nada",
            recommendation: "Perfecto. Saliste con la frente en alto. Pausa de al menos 7 días.",
            badge: "Retirada Limpia"
          }
        ]
      },

      // REEMPLAZAR: script real aquí - Card 4.5 Bloqueo Parcial o Eliminación de Contacto
      {
        id: "s4_5",
        packageId: "pkg_conflictos",
        title: "Card 4.5 — Bloqueo Parcial o Eliminación de Redes",
        objective: "Manejar la provocación del bloqueo sin caer en la desesperación de buscarla por otras vías",
        context: "Te bloqueó de WhatsApp o te dejó de seguir en Instagram.",
        message: "[REGLA DE ACERO: CERO INTENTOS DE CONTACTO POR OTRAS VÍAS. No llamar a sus amigas, no usar cuentas falsas, no escribir correos electrónicos ni presentarte en su casa.]",
        whyItWorks: "El bloqueo suele ser una maniobra emocional reactiva. Si la persigues por otros canales, confirmas su miedo y justificas el bloqueo. Si desapareces en silencio, ella misma sentirá la necesidad de saber qué pasó contigo.",
        temperature: "Fría",
        isFreePreview: false,
        filterTag: "espacio",
        calmDownRequired: true,
        highlightNote: "El 80% de los bloqueos impulsivos se levantan solos cuando la otra persona nota que no hubo ninguna reacción de súplica.",
        audioGuidanceText: "Respira hondo. El bloqueo duele en el ego, pero es tu mayor oportunidad para mostrar temple absoluto. No hagas nada.",
        decisionBranches: [
          {
            id: "b4_5_a",
            conditionLabel: "A) Ella desbloquea días o semanas después",
            recommendation: "No le escribas en cuanto te desbloquee. Espera a que ella de el primer paso o a que pasen 72 horas adicionales.",
            badge: "Desbloqueo Táctico"
          }
        ]
      }
    ]
  }
];

// ==========================================
// EXCLUSIVO COMPLETO: MINI-TRAINING (5 PASOS)
// ==========================================
export const MINI_TRAINING_STEPS: MiniTrainingStep[] = [
  {
    step: 1,
    title: "Paso 1: Diagnóstico de Temperatura y Tiempo",
    subtitle: "Cómo elegir el script quirúrgico para tu momento",
    keyRule: "Nunca elijas un script por lo que TÚ quieres decirle, sino por el estado emocional en el que ELLA se encuentra.",
    description: "Antes de abrir cualquier paquete, pregúntate cuántos días de silencio real han transcurrido y si la última interacción fue tensa, neutra o tibia. El filtro de cada paquete te sitúa en la categoría exacta.",
    checklistItems: [
      "Verifica que hayan pasado al menos 24 horas de silencio antes del Paquete 1.",
      "Si hubo discusión reciente, tu único destino seguro es el Paquete 4.",
      "Si ella ya mostró curiosidad, pasa directo al Paquete 2."
    ]
  },
  {
    step: 2,
    title: "Paso 2: La Ventana Biológica de Envío",
    subtitle: "El reloj neuroquímico diario para enviar mensajes",
    keyRule: "El mejor script enviado a la hora equivocada genera el efecto contrario.",
    description: "El cerebro humano atraviesa picos de estrés durante las mañanas laborales (cortisol alto) y picos de introspección relajada al atardecer (18:30 a 20:30). Los domingos por la tarde son especialmente receptivos a anclas nostálgicas.",
    checklistItems: [
      "Horario recomendado: 18:30 a 20:30 de martes a domingo.",
      "Prohibido terminantemente: enviar mensajes entre 23:00 y 07:00 (se lee como soledad o alcohol).",
      "Evita los lunes por la mañana: su atención está en el caos laboral."
    ]
  },
  {
    step: 3,
    title: "Paso 3: Decodificación de Subtexto en su Respuesta",
    subtitle: "Cómo interpretar qué siente ella más allá de las palabras",
    keyRule: "En mensajería femenina, el tiempo que tarda y la longitud del texto revelan más que lo que dice.",
    description: "Si ella contesta rápido y con preguntas de vuelta ('¿Y tú qué tal?'), la ventana está abierta. Si contesta con monosílabos secos pasadas 12 horas, está midiendo si vas a insistir desesperadamente.",
    checklistItems: [
      "Si ella escribe 2 líneas, tú no escribas más de 1 línea y media.",
      "Si ella tarda 1 hora, no respondas en 30 segundos (salvo emergencia pactada).",
      "Revisa siempre el árbol de decisión de tu script para ver la rama A, B o C."
    ]
  },
  {
    step: 4,
    title: "Paso 4: Errores Comunes que Matan un Buen Script",
    subtitle: "Los 3 deslices que cometen los hombres incluso con guiones probados",
    keyRule: "El script es el 50%; tu compostura tras enviarlo es el otro 50%.",
    description: "Muchos hombres copian el script perfecto pero arruinan el efecto agregando 3 emojis de caritas con corazones, o llamando 5 minutos después porque 'no aguantaron las ganas'.",
    checklistItems: [
      "No alteres las palabras entre corchetes con textos dramáticos.",
      "No te quedes mirando la pantalla esperando el doble check azul.",
      "Envía el mensaje, bloquea el teléfono y realiza una actividad física inmediata."
    ]
  },
  {
    step: 5,
    title: "Paso 5: Diagrama de Encadenamiento Quirúrgico",
    subtitle: "La secuencia lógica de éxito: 1.1 → 2.1 → 3.1",
    keyRule: "La reconquista es una escalera de micro-escalones, nunca un salto al vacío.",
    description: "La estructura ganadora sigue esta progresión: Primero abres curiosidad con el Paquete 1 (Script 1.1 o 1.2). Cuando ella responde amigable, calibras con progreso del Paquete 2 (Script 2.1). Y cuando la charla fluye, cierras la micro-cita con el Paquete 3 (Script 3.1).",
    checklistItems: [
      "Fase 1: Apertura neutral (Paquete 1) → genera intriga sin compromiso.",
      "Fase 2: Calibración y escasez (Paquete 2) → demuestra vitalidad propia.",
      "Fase 3: Micro-cita presencial (Paquete 3) → café de 15 minutos en el mundo real."
    ],
    diagramSummary: "Script 1.1 (Rompehielos) ➔ Script 2.1 (Calibración) ➔ Script 3.1 (Micro-cita 15 min)"
  }
];


// ==========================================
// NOTIFICACIONES IN-APP TIME-TRIGGERED (72h)
// ==========================================
export const TIME_TRIGGERED_NOTIFICATIONS: TimeTriggeredNotification[] = [
  {
    id: "notif_4h",
    triggerHour: 4,
    icon: "🚨",
    title: "Cuidado con el Error Fatal #1",
    message: "El 73% de los hombres lo comete en las primeras horas. Revisa 'Qué NUNCA Decir' en tu Hub.",
    actionText: "Ver lección educativa",
    targetTab: "herramientas"
  },
  {
    id: "notif_12h",
    triggerHour: 12,
    icon: "📈",
    title: "Tu Ventana Neuroquímica está activa",
    message: "Su cerebro está reevaluando memorias por el Efecto Zeigarnik. ¿Tienes el mensaje exacto?",
    actionText: "Verificar método",
    targetTab: "inicio"
  },
  {
    id: "notif_24h",
    triggerHour: 24,
    icon: "🎯",
    title: "¡Fase 1 completada!",
    message: "Entró en Modo Curiosidad. Mira el Paquete 1 en tu Central de Scripts.",
    actionText: "Ir al Paquete 1",
    targetTab: "herramientas",
    targetScriptPackageId: "pkg_rompehielos"
  },
  {
    id: "notif_36h",
    triggerHour: 36,
    icon: "⏳",
    title: "Faltan 12h para la Fase 3",
    message: "Prepara tu mensaje con anticipación para no improvisar en el momento crítico.",
    actionText: "Revisar opciones",
    targetTab: "herramientas"
  },
  {
    id: "notif_48h",
    triggerHour: 48,
    icon: "🔥",
    title: "Fase de Reconexión Abierta",
    message: "Es el momento de proponer la micro-cita. El Script 3.1 está listo para usar.",
    actionText: "Ver Script 3.1",
    targetTab: "herramientas",
    targetScriptPackageId: "pkg_invitacion"
  },
  {
    id: "notif_66h",
    triggerHour: 66,
    icon: "⏱️",
    title: "Últimas horas de tu ventana neuroquímica",
    message: "No improvises ahora. Revisa tu script de cierre antes de que termine el protocolo.",
    actionText: "Ver scripts de cierre",
    targetTab: "herramientas"
  }
];

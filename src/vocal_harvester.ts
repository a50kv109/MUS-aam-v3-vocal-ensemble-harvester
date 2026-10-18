/**
 * 🎤 AAM-V3 Vocal Ensemble Harvester — Core Production Logic & Engine
 * Архитектор: Арцибашев Андрій Олексійович (Kharkiv, UA)
 * Идентификатор: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
 */

export interface ComposerCore {
  id: string;
  name: string;
  type: string;
  version: string;
  evrid: { function: number; tension: number; density: number; gravity: number };
  nadi: { ida: string; pingala: string; sushumna: string };
  acoustic: { freq: number; timbre: string; reverb: string };
  tdi: number;
  gravity_mod: number;
  default_mode: string;
  color: string;
  activeColor: string;
  delta?: number;
}

function calculate_delta(evrid: { function: number; tension: number; density: number; gravity: number }): number {
  return Number((evrid.function * 1.618 - evrid.tension * 0.5 + evrid.density * 0.3).toFixed(3));
}

export const COMPOSER_CORES: Record<string, ComposerCore> = {
  "KUKUZEL": {
    id: "KUKUZEL",
    name: "Іоан Кукузель",
    type: "Візантійський неоновий розспів",
    version: "v3.0",
    evrid: { function: 0.98, tension: 0.15, density: 0.55, gravity: 0.96 },
    nadi: { ida: "Ніема", pingala: "Ісон", sushumna: "Плеханема" },
    acoustic: { freq: 432, timbre: "Візантійський хор", reverb: "Печерний храм 6.0s" },
    tdi: 0.10,
    gravity_mod: 0.96,
    default_mode: "liturgical",
    color: "border-purple-500 text-purple-400 bg-purple-950/30",
    activeColor: "bg-purple-900/60 border-purple-400"
  },
  "RACHMANINOFF": {
    id: "RACHMANINOFF",
    name: "С. Рахманінов",
    type: "Романтичний поліфонічний ситез",
    version: "v3.0",
    evrid: { function: 0.95, tension: 0.25, density: 0.60, gravity: 0.95 },
    nadi: { ida: "Глибокий бас", pingala: "Ангельський сопран", sushumna: "Всеношна" },
    acoustic: { freq: 432, timbre: "Хорова капела", reverb: "Собор 5.0s" },
    tdi: 0.15,
    gravity_mod: 0.95,
    default_mode: "liturgical",
    color: "border-amber-500 text-amber-400 bg-amber-950/30",
    activeColor: "bg-amber-900/60 border-amber-400"
  },
  "ARKHANGELSKY": {
    id: "ARKHANGELSKY",
    name: "А. Архангельский",
    type: "Православное хоровое пение",
    version: "v1.0",
    evrid: { function: 0.89, tension: 0.18, density: 0.48, gravity: 0.91 },
    nadi: { ida: "Мягкий бас", pingala: "Лирический напев", sushumna: "Молитва" },
    acoustic: { freq: 432, timbre: "A Cappella Choir", reverb: "Храм 4.0s" },
    tdi: 0.18,
    gravity_mod: 0.91,
    default_mode: "liturgical",
    color: "border-sky-500 text-sky-400 bg-sky-950/30",
    activeColor: "bg-sky-900/60 border-sky-400"
  },
  "BORTNYANSKY": {
    id: "BORTNYANSKY",
    name: "Д. Бортнянский",
    type: "Хоровой концерт",
    version: "v1.2",
    evrid: { function: 0.92, tension: 0.12, density: 0.45, gravity: 0.88 },
    nadi: { ida: "Cantus firmus", pingala: "Хорова кантилена", sushumna: "Соборний резонанс" },
    acoustic: { freq: 432, timbre: "Мішаний хор", reverb: "Собор 4.5s" },
    tdi: 0.12,
    gravity_mod: 0.88,
    default_mode: "liturgical",
    color: "border-emerald-600 text-emerald-500 bg-emerald-950/30",
    activeColor: "bg-emerald-900/60 border-emerald-500"
  },
  "GRECHANINOV": {
    id: "GRECHANINOV",
    name: "А. Гречанинов",
    type: "Духовная экспрессия",
    version: "v1.0",
    evrid: { function: 0.88, tension: 0.30, density: 0.50, gravity: 0.92 },
    nadi: { ida: "Драматичний бас", pingala: "Експресивний розспів", sushumna: "Катарсис" },
    acoustic: { freq: 432, timbre: "Хор + соло", reverb: "Великий собор" },
    tdi: 0.30,
    gravity_mod: 0.92,
    default_mode: "dramatic",
    color: "border-rose-700 text-rose-500 bg-rose-950/30",
    activeColor: "bg-rose-900/60 border-rose-500"
  },
  "BACH": {
    id: "BACH",
    name: "И. С. Бах",
    type: "Полифония / Протестантский хорал",
    version: "v2.1",
    evrid: { function: 0.98, tension: 0.40, density: 0.70, gravity: 0.92 },
    nadi: { ida: "Continuo", pingala: "Тема Фуги", sushumna: "Контрапункт" },
    acoustic: { freq: 256, timbre: "Орган", reverb: "Собор 4.5s" },
    tdi: 0.12,
    gravity_mod: 0.92,
    default_mode: "chamber",
    color: "border-blue-500 text-blue-400 bg-blue-950/30",
    activeColor: "bg-blue-900/60 border-blue-400"
  },
  "MOZART": {
    id: "MOZART",
    name: "В. А. Моцарт",
    type: "Венский классицизм",
    version: "v3.0",
    evrid: { function: 0.97, tension: 0.35, density: 0.55, gravity: 0.85 },
    nadi: { ida: "Alberti Bass", pingala: "Мелодия", sushumna: "Ясность" },
    acoustic: { freq: 432, timbre: "Струнные", reverb: "Зал 2.5s" },
    tdi: 0.08,
    gravity_mod: 0.85,
    default_mode: "chamber",
    color: "border-violet-500 text-violet-400 bg-violet-950/30",
    activeColor: "bg-violet-900/60 border-violet-400"
  },
  "PALESTRINA": {
    id: "PALESTRINA",
    name: "Джованні Палестрина",
    type: "Ренесансна поліфонія a cappella",
    version: "v2.0",
    evrid: { function: 0.96, tension: 0.10, density: 0.50, gravity: 0.89 },
    nadi: { ida: "Cantus firmus", pingala: "Рівновага голосів", sushumna: "Чиста модальність" },
    acoustic: { freq: 432, timbre: "Renaissance Choir", reverb: "Базиліка 5.0s" },
    tdi: 0.10,
    gravity_mod: 0.89,
    default_mode: "liturgical",
    color: "border-teal-500 text-teal-400 bg-teal-950/30",
    activeColor: "bg-teal-900/60 border-teal-400"
  },
  "TCHAIKOVSKY": {
    id: "TCHAIKOVSKY",
    name: "П. Чайковський",
    type: "Романтичний драматичний ситез",
    version: "v2.5",
    evrid: { function: 0.91, tension: 0.35, density: 0.65, gravity: 0.90 },
    nadi: { ida: "Драматичний тенор", pingala: "Експресивне вібрато", sushumna: "Трагічний катарсис" },
    acoustic: { freq: 432, timbre: "Симфонічний хор", reverb: "Оперний театр 3.5s" },
    tdi: 0.28,
    gravity_mod: 0.90,
    default_mode: "dramatic",
    color: "border-orange-500 text-orange-400 bg-orange-950/30",
    activeColor: "bg-orange-900/60 border-orange-400"
  }
};

Object.values(COMPOSER_CORES).forEach(core => {
  core.delta = calculate_delta(core.evrid);
});

export const VOCAL_CORES: Record<string, any> = {
  "basso_profundo": { id: "basso_profundo", name: "Basso Profundo", range: "C2-C4", gravity: 1.00, tdi: 0.40, guna: "tamas", element: "earth", nadi: "ida", sacredness: 0.95, emotion: "awe/solemnity" },
  "bass": { id: "bass", name: "Bass", range: "E2-E4", gravity: 0.90, tdi: 0.35, guna: "tamas", element: "earth/water", nadi: "ida", sacredness: 0.85, emotion: "stability/power" },
  "baritone": { id: "baritone", name: "Baritone", range: "G2-G4", gravity: 0.70, tdi: 0.30, guna: "tamas-rajas", element: "water", nadi: "ida-pingala", sacredness: 0.70, emotion: "warmth/drama" },
  "tenor": { id: "tenor", name: "Tenor", range: "C3-C5", gravity: 0.60, tdi: 0.30, guna: "rajas", element: "fire", nadi: "pingala", sacredness: 0.75, emotion: "passion/heroism" },
  "alto": { id: "alto", name: "Alto", range: "F3-F5", gravity: 0.55, tdi: 0.20, guna: "rajas-sattva", element: "air", nadi: "sushumna", sacredness: 0.80, emotion: "depth/sorrow" },
  "mezzo": { id: "mezzo", name: "Mezzo", range: "A3-A5", gravity: 0.50, tdi: 0.15, guna: "sattva", element: "air/ether", nadi: "sushumna", sacredness: 0.85, emotion: "lyricism/grace" },
  "soprano": { id: "soprano", name: "Soprano", range: "C4-C6", gravity: 0.40, tdi: 0.15, guna: "sattva", element: "ether", nadi: "sushumna", sacredness: 0.90, emotion: "light/transcendence" }
};

export interface SkillSettings {
  mode: string;
  tempo: number;
  key: string;
  rubato: number;
}

export interface EnsembleMetrics {
  tdi: number;
  gravity: number;
  q_resonance: number;
  delta_peak: number;
  s_core: number;
  coherence: number;
}

export function computeEnsembleResult(
  composerId: string,
  voiceCounts: Record<string, number>,
  settings: SkillSettings
) {
  const compData = COMPOSER_CORES[composerId];
  if (!compData) {
    throw new Error(`Composer core not found: ${composerId}`);
  }

  for (const [vId, count] of Object.entries(voiceCounts)) {
    if (!VOCAL_CORES[vId]) {
      throw new Error(`Unknown voice ID: ${vId}`);
    }
    if (typeof count !== "number" || count < 0 || !Number.isInteger(count)) {
      throw new Error(`Invalid voice count for ${vId}: ${count}`);
    }
  }

  const activeVoices: string[] = [];
  Object.entries(voiceCounts).forEach(([id, count]) => {
    for (let i = 0; i < (count as number); i++) activeVoices.push(id);
  });

  if (activeVoices.length === 0) {
    return {
      activeVoices,
      compData,
      metrics: {
        tdi: 0.0,
        gravity: 0.0,
        q_resonance: 0.0,
        delta_peak: 0.0,
        s_core: 0.0,
        coherence: 1.0
      },
      validationLog: [
        "[ВРАТА АЛЬОШІ] Ансамбль порожній.",
        "[СТАТУС] ДОСТУП ЗАБОРОНЕНО."
      ],
      passed: false
    };
  }

  const voicesTdi = activeVoices.map(v => VOCAL_CORES[v].tdi);
  const avgVoiceTdi = voicesTdi.reduce((a, b) => a + b, 0) / voicesTdi.length;
  const voicesGrav = activeVoices.map(v => VOCAL_CORES[v].gravity);
  const avgVoiceGrav = voicesGrav.reduce((a, b) => a + b, 0) / voicesGrav.length;

  const hybridTdi = (compData.tdi + avgVoiceTdi) / 2;
  const hybridGravity = Math.min(avgVoiceGrav * compData.gravity_mod, 1.0);
  const qResonance = (hybridGravity * 50) / (hybridTdi + 0.1);
  const hybridDelta = (compData.delta ?? 0.8) * hybridGravity;

  const voicesSacred = activeVoices.map(v => VOCAL_CORES[v].sacredness);
  let sCore = voicesSacred.reduce((a, b) => a + b, 0) / voicesSacred.length;
  if (settings.mode === "liturgical") {
    sCore = Math.min(sCore * 1.15, 1.0);
  }

  const passed = hybridTdi < 0.45;

  return {
    activeVoices,
    compData,
    metrics: {
      tdi: Number(hybridTdi.toFixed(3)),
      gravity: Number(hybridGravity.toFixed(3)),
      q_resonance: Number(qResonance.toFixed(1)),
      delta_peak: Number(hybridDelta.toFixed(3)),
      s_core: Number(sCore.toFixed(3)),
      coherence: Number((1.0 - hybridTdi).toFixed(2))
    },
    validationLog: [
      "[ВРАТА АЛЬОШІ] Ініціалізація перевірки...",
      `[TDI-СЕНСОР] Поточний TDI: ${hybridTdi.toFixed(3)}`,
      "[δ-ОПЕРАТОР] Фіксація δ-піка",
      "720° Синхронізація завершена",
      passed ? "[СТАТУС] ДОСТУП ДОЗВОЛЕНО. TDI в межах норми." : "[СТАТУС] ДОСТУП ЗАБОРОНЕНО. Критичний рівень TDI."
    ],
    passed
  };
}

export function generateSkillPassport(
  composerId: string,
  voiceCounts: Record<string, number>,
  settings: SkillSettings
) {
  const result = computeEnsembleResult(composerId, voiceCounts, settings);
  const compData = result.compData;

  return {
    schema_version: "3.0.0",
    skill_name: `${compData.name}_HYBRID_SKILL_v1.0`,
    type: "musical_generation",
    components: {
      composer_core: composerId,
      voice_counts: voiceCounts,
      voice_list: result.activeVoices
    },
    parameters: {
      mode: settings.mode,
      tempo: settings.tempo,
      key: settings.key,
      rubato: settings.rubato,
      reverb: compData.acoustic.reverb,
      frequency: compData.acoustic.freq
    },
    metrics: result.metrics,
    signature: "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS",
    validation_log: result.validationLog,
    ready_for_lyria: result.passed
  };
}

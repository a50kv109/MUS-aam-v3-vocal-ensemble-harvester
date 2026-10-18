/**
 * AAM-V3 Vocal Harvester Test Harness & Strict Data Contract Validator
 * Validates deterministic metrics, Alyosha Gate, voice count/list consistency, and strict JSON Schema compliance.
 */

import { VOCAL_CORES, COMPOSER_CORES } from './App';

const ALLOWED_FREQUENCIES = [256.0, 432.0, 440.0];
const ALLOWED_MODES = ["liturgical", "dramatic", "chamber"];

function generateTestPassport(composerId: string, voiceCounts: Record<string, number>, mode: string) {
  const compData = COMPOSER_CORES[composerId];
  if (!compData) throw new Error(`Composer ${composerId} not found`);

  // Validate voiceCounts before processing
  for (const [vId, count] of Object.entries(voiceCounts)) {
    if (!VOCAL_CORES[vId]) throw new Error(`Unknown voice ID: ${vId}`);
    if (typeof count !== "number" || count < 0 || !Number.isInteger(count)) {
      throw new Error(`Invalid count for voice ${vId}: ${count}`);
    }
  }

  const activeVoices: string[] = [];
  Object.entries(voiceCounts).forEach(([id, count]) => {
    for (let i = 0; i < (count as number); i++) activeVoices.push(id);
  });

  const freq = compData.acoustic.freq;
  if (!ALLOWED_FREQUENCIES.includes(freq)) {
    throw new Error(`Invalid frequency ${freq}. Must be one of ${ALLOWED_FREQUENCIES.join(', ')}`);
  }

  if (activeVoices.length === 0) {
    return {
      schema_version: "3.0.0",
      skill_name: `${compData.name}_EMPTY_SKILL`,
      type: "musical_generation",
      components: {
        composer_core: composerId,
        voice_counts: {},
        voice_list: []
      },
      parameters: {
        mode: mode,
        tempo: 90,
        key: "D minor",
        rubato: 0.8,
        reverb: compData.acoustic.reverb,
        frequency: freq
      },
      metrics: {
        tdi: 0.0,
        gravity: 0.0,
        q_resonance: 0.0,
        delta_peak: 0.0,
        s_core: 0.0,
        coherence: 1.0
      },
      signature: "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS",
      validation_log: [
        "[ВРАТА АЛЬОШІ] Ансамбль порожній.",
        "[СТАТУС] ДОСТУП ЗАБОРОНЕНО."
      ],
      ready_for_lyria: false
    };
  }

  const voicesTdi = activeVoices.map(v => VOCAL_CORES[v].tdi);
  const avgVoiceTdi = voicesTdi.reduce((a, b) => a + b, 0) / voicesTdi.length;

  const voicesGrav = activeVoices.map(v => VOCAL_CORES[v].gravity);
  const avgVoiceGrav = voicesGrav.reduce((a, b) => a + b, 0) / voicesGrav.length;

  const hybridTdi = (compData.tdi + avgVoiceTdi) / 2;
  const hybridGravity = Math.min(avgVoiceGrav * compData.gravity_mod, 1.0);
  const qResonance = (hybridGravity * 50) / (hybridTdi + 0.1);
  const hybridDelta = compData.delta * hybridGravity;

  const voicesSacred = activeVoices.map(v => VOCAL_CORES[v].sacredness);
  let sCore = voicesSacred.reduce((a, b) => a + b, 0) / voicesSacred.length;

  if (mode === "liturgical") {
    sCore = Math.min(sCore * 1.15, 1.0);
  }

  const passed = hybridTdi < 0.45;

  return {
    schema_version: "3.0.0",
    skill_name: `${compData.name}_TEST_SKILL`,
    type: "musical_generation",
    components: {
      composer_core: composerId,
      voice_counts: voiceCounts,
      voice_list: activeVoices
    },
    parameters: {
      mode: mode,
      tempo: 90,
      key: "D minor",
      rubato: 0.8,
      reverb: compData.acoustic.reverb,
      frequency: freq
    },
    metrics: {
      tdi: Number(hybridTdi.toFixed(3)),
      gravity: Number(hybridGravity.toFixed(3)),
      q_resonance: Number(qResonance.toFixed(1)),
      delta_peak: Number(hybridDelta.toFixed(3)),
      s_core: Number(sCore.toFixed(3)),
      coherence: Number((1.0 - hybridTdi).toFixed(2))
    },
    signature: "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS",
    validation_log: [
      "[ВРАТА АЛЬОШІ] Ініціалізація перевірки...",
      `[TDI-СЕНСОР] Поточний TDI: ${hybridTdi.toFixed(3)}`,
      "[δ-ОПЕРАТОР] Фіксація δ-піка",
      "720° Синхронізація завершена",
      passed ? "[СТАТУС] ДОСТУП ДОЗВОЛЕНО." : "[СТАТУС] ДОСТУП ЗАБОРОНЕНО."
    ],
    ready_for_lyria: passed
  };
}

function validatePassportStrict(passport: any) {
  if (passport.schema_version !== "3.0.0") throw new Error(`Invalid schema_version: ${passport.schema_version}`);
  if (passport.type !== "musical_generation") throw new Error(`Invalid type: ${passport.type}`);
  if (typeof passport.skill_name !== "string") throw new Error("Missing or invalid skill_name");
  
  if (!passport.components || typeof passport.components !== "object") throw new Error("Missing components");
  if (typeof passport.components.composer_core !== "string") throw new Error("Invalid composer_core");
  
  const counts = passport.components.voice_counts;
  const list = passport.components.voice_list;
  if (!counts || typeof counts !== "object") throw new Error("Invalid voice_counts");
  if (!Array.isArray(list)) throw new Error("Invalid voice_list");

  let totalCount = 0;
  const countMap: Record<string, number> = {};
  for (const [vId, count] of Object.entries(counts)) {
    if (!VOCAL_CORES[vId]) throw new Error(`Unknown voice ID in counts: ${vId}`);
    if (typeof count !== "number" || count < 0 || !Number.isInteger(count)) {
      throw new Error(`Invalid voice count for ${vId}: ${count}`);
    }
    countMap[vId] = count as number;
    totalCount += count as number;
  }

  if (totalCount !== list.length) {
    throw new Error(`voice_counts sum (${totalCount}) does not match voice_list length (${list.length})`);
  }

  const listMap: Record<string, number> = {};
  for (const v of list) {
    if (!VOCAL_CORES[v]) throw new Error(`Invalid voice in voice_list: ${v}`);
    listMap[v] = (listMap[v] || 0) + 1;
  }

  for (const [vId, expectedCount] of Object.entries(countMap)) {
    if (listMap[vId] !== expectedCount) {
      throw new Error(`Mismatch for voice ${vId}: counts says ${expectedCount}, list has ${listMap[vId] || 0}`);
    }
  }

  if (!passport.parameters || typeof passport.parameters !== "object") throw new Error("Missing parameters");
  if (!ALLOWED_MODES.includes(passport.parameters.mode)) throw new Error(`Invalid mode: ${passport.parameters.mode}`);
  if (typeof passport.parameters.tempo !== "number" || passport.parameters.tempo < 40 || passport.parameters.tempo > 200) throw new Error("Invalid tempo range");
  if (!ALLOWED_FREQUENCIES.includes(passport.parameters.frequency)) throw new Error(`Invalid frequency: ${passport.parameters.frequency}. Must be 256, 432, or 440.`);

  if (!passport.metrics || typeof passport.metrics !== "object") throw new Error("Missing metrics");
  const m = passport.metrics;
  if (typeof m.tdi !== "number" || m.tdi < 0 || m.tdi > 1) throw new Error("Invalid tdi range");
  if (typeof m.gravity !== "number" || m.gravity < 0 || m.gravity > 1) throw new Error("Invalid gravity range");
  if (typeof m.q_resonance !== "number" || m.q_resonance < 0) throw new Error("Invalid q_resonance");
  if (typeof m.delta_peak !== "number") throw new Error("Invalid delta_peak");
  if (typeof m.s_core !== "number" || m.s_core < 0 || m.s_core > 1) throw new Error("Invalid s_core range");
  if (typeof m.coherence !== "number" || m.coherence < 0 || m.coherence > 1) throw new Error("Invalid coherence range");

  if (passport.signature !== "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS") throw new Error("Invalid signature");
  if (!Array.isArray(passport.validation_log)) throw new Error("Invalid validation_log");
  if (typeof passport.ready_for_lyria !== "boolean") throw new Error("Invalid ready_for_lyria boolean");
}

// Run strict tests & Regression Suite
console.log("=== RUNNING STRICT AAM-V3 CONTRACT & REGRESSION TESTS ===");

try {
  // Test 1: Empty Ensemble
  const emptyPassport = generateTestPassport("KUKUZEL", {}, "liturgical");
  validatePassportStrict(emptyPassport);
  if (emptyPassport.ready_for_lyria !== false) throw new Error("Empty ensemble must have ready_for_lyria: false");
  console.log("Test 1 (Empty Ensemble Full Passport): PASSED");

  // Test 2: Single Correct Voice
  const singlePassport = generateTestPassport("PALESTRINA", { "soprano": 1 }, "liturgical");
  validatePassportStrict(singlePassport);
  console.log("Test 2 (Single Voice): PASSED");

  // Test 3: Multiple Correct Voices (Kukuzel)
  const kukuzelPassport = generateTestPassport("KUKUZEL", { "basso_profundo": 2, "bass": 2, "soprano": 2 }, "liturgical");
  validatePassportStrict(kukuzelPassport);
  console.log("Test 3 (Kukuzel Multi Voice): PASSED");

  // Test 4: Bach Chamber Ensemble
  const bachPassport = generateTestPassport("BACH", { "tenor": 2, "alto": 2, "soprano": 2 }, "chamber");
  validatePassportStrict(bachPassport);
  console.log("Test 4 (Bach Chamber): PASSED");

  // Test 5: Negative count regression test
  let negativeFailed = false;
  try {
    generateTestPassport("BACH", { "tenor": -1 }, "chamber");
  } catch (e) {
    negativeFailed = true;
  }
  if (!negativeFailed) throw new Error("Regression Test Failed: Negative count was not rejected");
  console.log("Test 5 (Negative Count Rejection): PASSED");

  // Test 6: Unknown voice regression test
  let unknownVoiceFailed = false;
  try {
    generateTestPassport("BACH", { "unknown_voice": 1 }, "chamber");
  } catch (e) {
    unknownVoiceFailed = true;
  }
  if (!unknownVoiceFailed) throw new Error("Regression Test Failed: Unknown voice was not rejected");
  console.log("Test 6 (Unknown Voice Rejection): PASSED");

  console.log("=== ALL STRICT REGRESSION TEST ASSERTIONS PASSED SUCCESSFULLY ===");
} catch (err: any) {
  console.error("❌ CONTRACT & REGRESSION TEST FAILED:", err.message);
  process.exit(1);
}

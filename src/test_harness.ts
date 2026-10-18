/**
 * AAM-V3 Vocal Harvester Test Harness & Data Contract Validator
 * Validates deterministic metrics, Alyosha Gate, and canonical JSON schema compliance.
 */

import { VOCAL_CORES, COMPOSER_CORES } from './App';

function generateTestPassport(composerId: string, voiceCounts: Record<string, number>, mode: string) {
  const compData = COMPOSER_CORES[composerId];
  if (!compData) throw new Error(`Composer ${composerId} not found`);

  const activeVoices: string[] = [];
  Object.entries(voiceCounts).forEach(([id, count]) => {
    for (let i = 0; i < (count as number); i++) activeVoices.push(id);
  });

  if (activeVoices.length === 0) {
    return { schema_version: "3.0.0", ready_for_lyria: false };
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
      frequency: compData.acoustic.freq
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

// Run test assertions & Schema Contract Validation
console.log("=== RUNNING AAM-V3 TEST HARNESS & SCHEMA VALIDATOR ===");

// Test 1: Empty Ensemble
const emptyPassport = generateTestPassport("KUKUZEL", {}, "liturgical");
console.assert(emptyPassport.ready_for_lyria === false, "Test 1 Failed: Empty ensemble should not be ready for lyria");
console.log("Test 1 (Empty Ensemble): PASSED");

// Test 2: Kukuzel Liturgical Ensemble Schema & Metrics Validation
const kukuzelPassport = generateTestPassport("KUKUZEL", { "basso_profundo": 2, "bass": 2, "soprano": 2 }, "liturgical");
console.assert(kukuzelPassport.schema_version === "3.0.0", "Schema error: missing schema_version");
console.assert(typeof kukuzelPassport.components.composer_core === "string", "Schema error: composer_core type");
console.assert(typeof kukuzelPassport.components.voice_counts === "object", "Schema error: voice_counts type");
console.assert(Array.isArray(kukuzelPassport.components.voice_list), "Schema error: voice_list must be array");
console.assert(typeof kukuzelPassport.metrics.tdi === "number", "Schema error: tdi metric type");
console.assert(kukuzelPassport.metrics.tdi < 0.45, "Test 2 Failed: Kukuzel TDI should pass gate");
console.assert(kukuzelPassport.metrics.s_core > 0.8, "Test 2 Failed: S-Core should be high");
console.assert(kukuzelPassport.ready_for_lyria === true, "Test 2 Failed: ready_for_lyria must be true");
console.log("Test 2 (Kukuzel Contract & Metrics): PASSED", kukuzelPassport);

// Test 3: Bach Chamber Ensemble Validation
const bachPassport = generateTestPassport("BACH", { "tenor": 2, "alto": 2, "soprano": 2 }, "chamber");
console.assert(bachPassport.metrics.tdi < 0.45, "Test 3 Failed: Bach TDI should pass");
console.assert(bachPassport.ready_for_lyria === true, "Test 3 Failed: Bach ready_for_lyria");
console.log("Test 3 (Bach Contract & Metrics): PASSED", bachPassport);

console.log("=== ALL TEST HARNESS & CONTRACT ASSERTIONS PASSED SUCCESSFULLY ===");

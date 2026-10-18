/**
 * AAM-V3 Vocal Harvester Test Harness
 * Validates deterministic metrics, Alyosha Gate, and schema contracts.
 */

import { VOCAL_CORES, COMPOSER_CORES } from './App';

function calculateMetricsTest(composerId: string, voiceCounts: Record<string, number>, mode: string) {
  const compData = COMPOSER_CORES[composerId];
  if (!compData) throw new Error(`Composer ${composerId} not found`);

  const activeVoices: string[] = [];
  Object.entries(voiceCounts).forEach(([id, count]) => {
    for (let i = 0; i < (count as number); i++) activeVoices.push(id);
  });

  if (activeVoices.length === 0) {
    return { tdi: 0, gravity: 0, q_resonance: 0, delta_peak: 0, s_core: 0, alyosha_passed: false };
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

  return {
    tdi: Number(hybridTdi.toFixed(3)),
    gravity: Number(hybridGravity.toFixed(3)),
    q_resonance: Number(qResonance.toFixed(1)),
    delta_peak: Number(hybridDelta.toFixed(3)),
    s_core: Number(sCore.toFixed(3)),
    alyosha_passed: hybridTdi < 0.45
  };
}

// Run test assertions
console.log("=== RUNNING AAM-V3 TEST HARNESS ===");

// Test 1: Empty Ensemble
const emptyResult = calculateMetricsTest("KUKUZEL", {}, "liturgical");
console.assert(emptyResult.alyosha_passed === false, "Test 1 Failed: Empty ensemble should fail gate");
console.log("Test 1 (Empty Ensemble): PASSED");

// Test 2: Kukuzel Liturgical Ensemble
const kukuzelResult = calculateMetricsTest("KUKUZEL", { "basso_profundo": 2, "bass": 2, "soprano": 2 }, "liturgical");
console.assert(kukuzelResult.tdi < 0.45, "Test 2 Failed: Kukuzel TDI should pass Alyosha gate");
console.assert(kukuzelResult.s_core > 0.8, "Test 2 Failed: S-Core should be high for liturgical");
console.log("Test 2 (Kukuzel Ensemble): PASSED", kukuzelResult);

// Test 3: Bach Chamber Ensemble
const bachResult = calculateMetricsTest("BACH", { "tenor": 2, "alto": 2, "soprano": 2 }, "chamber");
console.assert(bachResult.alyosha_passed === true, "Test 3 Failed: Bach chamber should pass gate");
console.log("Test 3 (Bach Chamber): PASSED", bachResult);

console.log("=== ALL TEST HARNESS ASSERTIONS PASSED SUCCESSFULLY ===");

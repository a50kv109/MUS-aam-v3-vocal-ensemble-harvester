# Testing & Quality Assurance: AAM-V3

## 1. Automated Test Suites & Production Logic Verification
- **TypeScript Test Harness (`src/test_harness.ts`):** Exercises the exact mathematical algorithms implemented in `src/App.tsx` (Topological Dissonance Index `TDI`, Hybrid Gravity, Q-Resonance, Delta Peak, S-CORE, and the Alyosha Gate threshold `hybridTdi < 0.45`).
- **Python Verification Script (`vocal_skill_generator.py`):** Independent standalone engine validating schema version `3.0.0`, empty ensemble handling, and strict passport assertions for Rachmaninoff and Tchaikovsky.

## 2. Test Cases Breakdown (`src/test_harness.ts`)
1. **Test 1 (Empty Ensemble Full Passport):** Verifies empty voice list handling, setting `ready_for_lyria: false` and `alyosha_passed: false` with specific validation logs.
2. **Test 2 (Single Voice):** Verifies single voice calculation (e.g. Basso Profundo).
3. **Test 3 (Kukuzel Multi-Voice):** Verifies multi-voice ensemble metric aggregation.
4. **Test 4 (Bach Chamber):** Verifies chamber mode metric scaling.
5. **Test 5 (Negative Count Rejection):** Verifies robust input validation throwing an error on negative voice counts.
6. **Test 6 (Unknown Voice Rejection):** Verifies input validation throwing an error on invalid voice IDs.

## 3. Verification Commands & Execution Results
- **TypeScript Test Harness:** `npx tsx src/test_harness.ts` — **PASSED** (All 6 regression tests passed successfully).
- **TypeScript Linter / Type Check:** `npm run lint` (`tsc --noEmit`) — **PASSED** (0 errors).
- **Production Build:** `compile_applet` (`vite build`) — **PASSED** (Build succeeded).
- **Python Verification:** `python3 vocal_skill_generator.py` — **PASSED** (Exit code 0, strict validation passed).

## 4. Known Limitations & Gaps
- React UI components (`src/App.tsx`) are verified via static type-checking and build compilation; interactive browser DOM actions are simulated via programmatic test harnesses rather than live headless browser tests in this environment.


# AAM-V3 Agent Interaction Protocol (`AGENT_PROTOCOL.md`)

This document defines the standard protocol for AI agents (Gemini, Claude, ChatGPT, Cursor, Copilot) interacting with, extending, or auditing the **AAM-V3 Vocal Ensemble Harvester** repository.

---

## 1. Agent Entrypoint Architecture

When an AI agent accesses this repository, it must follow this structured execution pipeline:

1. **Context Discovery**: Read `README.md` and files in `docs/`:
   - `docs/ARCHITECTURE.md` — Core system design & harmonic gravity math.
   - `docs/DATA_CONTRACT.md` — Canonical JSON passport schema (`schema_version: "3.0.0"`).
   - `docs/METHODOLOGY.md` — Vocal timbre, frequency grids (256, 432, 440 Hz), and resonance equations.
   - `docs/METRICS.md` — Topological Dissonance Index (TDI), S-Core, and Resonance factor calculations.
   - `docs/TESTING.md` — Automated test harness specifications.
2. **Verification Suite Execution**: Run the automated validation scripts before making any code changes:
   ```bash
   # 1. Run TypeScript strict test harness (validates all constraints & edge cases)
   npx tsx src/test_harness.ts

   # 2. Run Python strict generator & passport verifier
   python3 vocal_skill_generator.py

   # 3. Run production build & type check
   npm run build
   ```
3. **Code & Documentation Synchronization**: Any modification to the vocal algorithms, data contracts, or metrics must be simultaneously synchronized in:
   - TypeScript application core (`src/App.tsx`)
   - TypeScript test harness (`src/test_harness.ts`)
   - Python skill generator (`vocal_skill_generator.py`)
   - Relevant documentation in `docs/` and `README.md`

---

## 2. Permitted Operations & Constraints for AI Agents

| Operation | Command / Tool | Safety & Contract Rules |
| :--- | :--- | :--- |
| **Run Tests** | `npx tsx src/test_harness.ts` | Must exit with code `0`. All 6 strict regression tests must pass. |
| **Run Python Gen** | `python3 vocal_skill_generator.py` | Must exit with code `0`. Validates empty ensemble, Rachmaninoff, and Tchaikovsky. |
| **Build App** | `npm run build` | Zero TypeScript errors, clean Vite bundle output. |
| **Schema Updates** | Edit `docs/DATA_CONTRACT.md` & code | Maintain backward compatibility for `schema_version: "3.0.0"`. |

---

## 3. Empty Ensemble & Alyosha Gate Specifications

- **Empty Ensemble Handling**: When `activeVoices.length === 0`, the system must generate a valid passport with `ready_for_lyria: false`, zero metrics (`tdi: 0`, `gravity: 0`, `resonance: 0`, `score: 0`), and empty analysis logs.
- **Alyosha Gate**: Enforces strict frequency quantization (256, 432, 440 Hz) and minimum ensemble requirements for Lyria export readiness.

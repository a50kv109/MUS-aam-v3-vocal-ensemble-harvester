# AAM-V3 Vocal Ensemble Harvester — Agent Entrypoint (`AGENTS.md`)

Welcome, AI Agent. This repository (**AAM-V3 Vocal Ensemble Harvester**) is structured for autonomous inspection, testing, and extension by AI coding agents (Gemini, Claude, ChatGPT, Cursor, Copilot).

---

## 1. Quick Navigation & Core Documentation
- **[AGENT Protocol (`docs/AGENT_PROTOCOL.md`)](docs/AGENT_PROTOCOL.md)** — Detailed specification of protocols, commands, and constraints.
- **[Data Contract (`docs/DATA_CONTRACT.md`)](docs/DATA_CONTRACT.md)** — Canonical JSON schema (`schema_version: "3.0.0"`).
- **[Architecture (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md)** — Core harmonic gravity and resonance mechanics.
- **[Methodology (`docs/METHODOLOGY.md`)](docs/METHODOLOGY.md)** — Frequency grid (256Hz, 432Hz, 440Hz) and timbre rules.
- **[Metrics (`docs/METRICS.md`)](docs/METRICS.md)** — TDI, S-Core, Q-Resonance formulas.
- **[Testing Guide (`docs/TESTING.md`)](docs/TESTING.md)** — Harness and verification instructions.

---

## 2. Mandatory Verification Commands
Before making any changes or submitting an audit report, run:

```bash
# 1. Run TypeScript strict test harness (validates all constraints & edge cases)
npx tsx src/test_harness.ts

# 2. Run Python strict generator & passport verifier
python3 vocal_skill_generator.py

# 3. Run production build & type check
npm run build
```

---

## 3. Key Architectural Constants
- **Schema Version**: `"3.0.0"`
- **Allowed Frequencies**: `[256.0, 432.0, 440.0]` Hz
- **Signature**: `AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS`
- **Empty Ensemble Rule**: `activeVoices.length === 0` must produce a valid passport with `ready_for_lyria: false`.

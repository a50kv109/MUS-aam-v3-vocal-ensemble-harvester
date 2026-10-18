# AAM-V3 Vocal Ensemble Harvester (Axis 3)

> **Architect:** Andrey Artsybashev (Kharkiv, Ukraine)  
> **System Signature:** `AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS`  
> **Status:** Production Prototype / Ready for Review

## Overview
The **Vocal Ensemble Harvester** is the executive performance layer (Axis 3) of the AAM-V3 Triaxis System. It combines master composer cores (Axis 2) with multi-archetype vocal ensembles to generate structured Vocal Performance Passports (JSON Skills) ready for downstream rendering engines (e.g., Lyria).

## Features
- **Composer Library Registry:** 7 master liturgical and classical cores (Kukuzel, Palestrina, Arkhangelsky, Bortnyansky, Grechaninov, Bach, Mozart) with EVRID tensors.
- **Vocal Archetypes Database:** 7 primary vocal types (Basso Profundo to Soprano) with topological dissonance, gravity, and sacredness coefficients.
- **Deterministic Metrics Engine:** Real-time calculation of TDI, Ensemble Gravity, Q-Resonance, $\delta$-Peak, S-CORE, and Coherence.
- **Alyosha Gate Validation:** Automated threshold enforcement (`TDI < 0.45`).

## Quick Start

### Development Server (React UI)
```bash
npm install
npm run dev
```

### Type Checking & Build
```bash
npm run lint
npm run build
```

### Python Generator & Tests
```bash
python3 vocal_skill_generator.py
```

## Documentation
- [Architecture](docs/ARCHITECTURE.md)
- [Methodology](docs/METHODOLOGY.md)
- [Metrics Specification](docs/METRICS.md)
- [Data Contract](docs/DATA_CONTRACT.md)
- [Testing Guide](docs/TESTING.md)

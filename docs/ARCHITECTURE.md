# Architecture: AAM-V3 Vocal Ensemble Harvester (Axis 3)

## 1. System Context & Triaxis Model
The AAM-V3 system is partitioned into three principal axes:
- **Axis 1:** Semantic Intent & Linguistic Core (meaning and intention).
- **Axis 2:** Composer Core / MCG-V3.0 Terminal (harmonic architecture, style, EVRID tensors).
- **Axis 3:** Vocal Performance / Ensemble Harvester (vocal archetype distribution, acoustic properties, and performance parameters).

## 2. Component Diagram
```
[ Axis 2: Composer Library ] ──(Composer Core JSON)──┐
                                                      ▼
[ Vocal Archetype DB ] ──(Voice Selection & Counts)──► [ Vocal Ensemble Harvester ] 
                                                      │
                                                      ▼ (Alyosha Gate Check TDI < 0.45)
                                               [ Vocal Passport JSON ] ──► [ Lyria Engine ]
```

## 3. Internal Modules
1. **Composer Library Registry (`COMPOSER_CORES`):** In-memory repository of historical and liturgical composers (Kukuzel, Palestrina, Arkhangelsky, Bortnyansky, Grechaninov, Bach, Mozart) with EVRID tensors, NADI channels, and acoustic profiles.
2. **Vocal Archetypes Database (`VOCAL_CORES`):** 7 core voice types (Basso Profundo, Bass, Baritone, Tenor, Alto, Mezzo, Soprano) with topological dissonance index (TDI), gravity, guna, element, nadi, and sacredness.
3. **Calculation Engine (`_calculate_metrics`):** Deterministic mathematical aggregator combining composer modifier matrices with ensemble averages.
4. **Alyosha Gate Validator (`check_alyosha_gate`):** Threshold gate enforcing `TDI < 0.45` for safe musical generation.

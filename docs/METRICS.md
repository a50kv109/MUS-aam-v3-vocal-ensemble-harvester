# Mathematical Metrics: AAM-V3 Vocal Performance Core

## 1. Topological Dissonance Index (TDI)
- **Formula:** $\text{TDI}_{\text{hybrid}} = \frac{\text{TDI}_{\text{composer}} + \text{TDI}_{\text{avg\_voice}}}{2}$
- **Range:** $[0.0, 1.0]$
- **Interpretation:** Measures harmonic tension. Values below $0.45$ pass the Alyosha Gate.

## 2. Ensemble Gravity ($G$)
- **Formula:** $G_{\text{hybrid}} = \min\left(\text{avg}(G_{\text{voices}}) \times M_{\text{gravity}}, 1.0\right)$
- **Range:** $[0.0, 1.0]$
- **Interpretation:** Vertical acoustic weight and grounding of the choir.

## 3. Q-Resonance ($Q$)
- **Formula:** $Q = \frac{G_{\text{hybrid}} \times 50}{\text{TDI}_{\text{hybrid}} + 0.1}$
- **Range:** $[0.0, 500.0]$
- **Interpretation:** Empirical acoustic quality factor representing spectral focus.

## 4. Delta Peak ($\delta_{\text{peak}}$)
- **Formula:** $\delta_{\text{peak}} = \delta_{\text{composer}} \times G_{\text{hybrid}}$
- **Range:** $[0.0, 1.0]$
- **Interpretation:** Energy transfer coefficient from the composer core to the vocal ensemble.

## 5. S-CORE (Sacred Core)
- **Formula:** $S = \min\left(\text{avg}(\text{sacredness}_{\text{voices}}) \times (1.15 \text{ if liturgical else } 1.0), 1.0\right)$
- **Range:** $[0.0, 1.0]$
- **Interpretation:** Spiritual saturation index.

# AAM-V3 Canonical Data Contract: Vocal Performance Passport (Axis 3)

## 1. Overview
The Vocal Performance Passport is the standardized JSON schema exchanged between the Vocal Ensemble Harvester (Axis 3) and downstream systems (such as MCG-V3.0 Terminal / Axis 2, or Lyria Music Engine).

## 2. Schema Definition (`vocal_passport.schema.json`)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "AAMV3VocalPerformancePassport",
  "type": "object",
  "required": [
    "schema_version",
    "skill_name",
    "type",
    "components",
    "parameters",
    "metrics",
    "signature",
    "validation_log",
    "ready_for_lyria"
  ],
  "properties": {
    "schema_version": {
      "type": "string",
      "const": "3.0.0"
    },
    "skill_name": {
      "type": "string",
      "description": "Unique identifier / title of the generated vocal skill."
    },
    "type": {
      "type": "string",
      "const": "musical_generation"
    },
    "components": {
      "type": "object",
      "required": ["composer_core", "voice_counts", "voice_list"],
      "properties": {
        "composer_core": {
          "type": "string",
          "description": "ID of the selected composer core from Axis 2."
        },
        "voice_counts": {
          "type": "object",
          "additionalProperties": { "type": "integer", "minimum": 0 },
          "description": "Mapping of vocal archetype ID to count."
        },
        "voice_list": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Flattened list of individual active voice instances."
        }
      }
    },
    "parameters": {
      "type": "object",
      "required": ["mode", "tempo", "key", "rubato", "reverb", "frequency"],
      "properties": {
        "mode": { "type": "string", "enum": ["liturgical", "dramatic", "chamber"] },
        "tempo": { "type": "integer", "minimum": 40, "maximum": 200 },
        "key": { "type": "string" },
        "rubato": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
        "reverb": { "type": "string" },
        "frequency": { "type": "number", "enum": [256.0, 432.0, 440.0] }
      }
    },
    "metrics": {
      "type": "object",
      "required": ["tdi", "gravity", "q_resonance", "delta_peak", "s_core", "coherence"],
      "properties": {
        "tdi": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
        "gravity": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
        "q_resonance": { "type": "number", "minimum": 0.0 },
        "delta_peak": { "type": "number" },
        "s_core": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
        "coherence": { "type": "number", "minimum": 0.0, "maximum": 1.0 }
      }
    },
    "signature": {
      "type": "string",
      "const": "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS"
    },
    "validation_log": {
      "type": "array",
      "items": { "type": "string" }
    },
    "ready_for_lyria": {
      "type": "boolean",
      "description": "Gate check result (True if TDI < 0.45)."
    }
  }
}
```

## 3. Data Unification Rules
- Both TypeScript and Python implementations adhere strictly to the dual representation of voice counts (`voice_counts` dictionary and `voice_list` array) to ensure zero parser friction.
- Floating-point metrics are rounded to 3 decimal places (Q-Resonance to 1 decimal place).

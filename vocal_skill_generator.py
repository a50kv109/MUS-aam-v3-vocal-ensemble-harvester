# ==============================================================================
# 🎤 GENERATOR: VOCAL/HYBRID SKILLS v1.0 (ПРОЄКТ 3)
# Архітектор: Арцибашев Андрій Олексійович
# Ідентифікатор: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
# ==============================================================================

import json
import math

ALLOWED_FREQUENCIES = [256.0, 432.0, 440.0]
ALLOWED_MODES = ["liturgical", "dramatic", "chamber"]

# ------------------------------------------------------------------------------
# 1. БІБЛІОТЕКА ГОЛОСОВИХ ЯДЕР
# ------------------------------------------------------------------------------
vocal_cores_db = {
    "basso_profundo": {
        "name": "Basso Profundo",
        "range": "C2-C4",
        "gravity": 1.00,
        "tdi": 0.40,
        "guna": "tamas",
        "element": "earth",
        "nadi": "ida",
        "sacredness": 0.95,
        "emotion": "awe/solemnity"
    },
    "bass": {
        "name": "Bass",
        "range": "E2-E4",
        "gravity": 0.90,
        "tdi": 0.35,
        "guna": "tamas",
        "element": "earth/water",
        "nadi": "ida",
        "sacredness": 0.85,
        "emotion": "stability/power"
    },
    "baritone": {
        "name": "Baritone",
        "range": "G2-G4",
        "gravity": 0.70,
        "tdi": 0.30,
        "guna": "tamas-rajas",
        "element": "water",
        "nadi": "ida-pingala",
        "sacredness": 0.70,
        "emotion": "warmth/drama"
    },
    "tenor": {
        "name": "Tenor",
        "range": "C3-C5",
        "gravity": 0.60,
        "tdi": 0.30,
        "guna": "rajas",
        "element": "fire",
        "nadi": "pingala",
        "sacredness": 0.75,
        "emotion": "passion/heroism"
    },
    "alto": {
        "name": "Alto",
        "range": "F3-F5",
        "gravity": 0.55,
        "tdi": 0.20,
        "guna": "rajas-sattva",
        "element": "air",
        "nadi": "sushumna",
        "sacredness": 0.80,
        "emotion": "depth/sorrow"
    },
    "mezzo": {
        "name": "Mezzo",
        "range": "A3-A5",
        "gravity": 0.50,
        "tdi": 0.15,
        "guna": "sattva",
        "element": "air/ether",
        "nadi": "sushumna",
        "sacredness": 0.85,
        "emotion": "lyricism/grace"
    },
    "soprano": {
        "name": "Soprano",
        "range": "C4-C6",
        "gravity": 0.40,
        "tdi": 0.15,
        "guna": "sattva",
        "element": "ether",
        "nadi": "sushumna",
        "sacredness": 0.90,
        "emotion": "light/transcendence"
    }
}

# ------------------------------------------------------------------------------
# 2. ОСНОВНИЙ КЛАС ГЕНЕРАТОРА
# ------------------------------------------------------------------------------
class VocalSkillGenerator:
    """
    Генератор вокальних/гібридних скілів для музичного рушія (Lyria)
    """
    def __init__(self, frequency=432.0):
        if frequency not in ALLOWED_FREQUENCIES:
            raise ValueError(f"Invalid frequency {frequency}. Must be one of {ALLOWED_FREQUENCIES}")
        
        self.signature = "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS"
        self.phi = 1.618
        self.theta = 0.3678
        self.v_ref = frequency
        
        self.vocal_db = vocal_cores_db
        self.composer_core = None
        self.ensemble = {}
        self.settings = {
            "mode": "liturgical",
            "tempo": 92,
            "key": "D minor",
            "rubato": 0.82
        }

    def load_composer_core(self, core_data):
        """Завантажує ядро композитора (з Проєкту 2)"""
        self.composer_core = core_data
        print(f"[СИСТЕМА] Завантажено ядро композитора: {core_data['name']}")
        return self

    def add_voice(self, voice_id, count=1):
        """Додає голосове ядро до ансамблю"""
        if voice_id not in self.vocal_db:
            raise ValueError(f"Голос {voice_id} не знайдено в базі.")
        if not isinstance(count, int) or count < 0:
            raise ValueError(f"Invalid count for voice {voice_id}: {count}")
        
        if voice_id in self.ensemble:
            self.ensemble[voice_id] += count
        else:
            self.ensemble[voice_id] = count
            
        return self

    def set_parameters(self, mode=None, tempo=None, key=None, rubato=None):
        """Налаштування параметрів генерації"""
        if mode: 
            if mode not in ALLOWED_MODES:
                raise ValueError(f"Invalid mode {mode}. Must be one of {ALLOWED_MODES}")
            self.settings["mode"] = mode
        if tempo: self.settings["tempo"] = tempo
        if key: self.settings["key"] = key
        if rubato: self.settings["rubato"] = rubato
        return self

    def _calculate_metrics(self):
        """Розрахунок гібридних метрик (TDI, Q-резонанс, S-CORE, δ-пік)"""
        if not self.composer_core:
            raise ValueError("Ядро композитора не задане.")

        active_voices = []
        for v_id, count in self.ensemble.items():
            if not isinstance(count, int) or count < 0:
                raise ValueError(f"Invalid count for voice {v_id}: {count}")
            active_voices.extend([v_id] * count)

        if not active_voices:
            return {
                "tdi": 0.0,
                "gravity": 0.0,
                "q_resonance": 0.0,
                "delta_peak": 0.0,
                "s_core": 0.0,
                "coherence": 1.0
            }

        # Середні показники ансамблю
        voices_tdi = [self.vocal_db[v]["tdi"] for v in active_voices]
        avg_voice_tdi = sum(voices_tdi) / len(voices_tdi)

        voices_grav = [self.vocal_db[v]["gravity"] for v in active_voices]
        avg_voice_grav = sum(voices_grav) / len(voices_grav)

        # Гібридні метрики
        comp_tdi = self.composer_core.get("tdi", 0.2)
        comp_grav_mod = self.composer_core.get("gravity_mod", 1.0)
        comp_delta = self.composer_core.get("delta", 0.0)

        hybrid_tdi = (comp_tdi + avg_voice_tdi) / 2
        hybrid_gravity = min(avg_voice_grav * comp_grav_mod, 1.0)
        q_resonance = (hybrid_gravity * 50) / (hybrid_tdi + 0.1)
        hybrid_delta = comp_delta * hybrid_gravity
        
        # S-CORE (Sacred Core) - рівень сакральності
        voices_sacred = [self.vocal_db[v]["sacredness"] for v in active_voices]
        s_core = sum(voices_sacred) / len(voices_sacred)
        if self.settings["mode"] == "liturgical":
            s_core = min(s_core * 1.15, 1.0)

        return {
            "tdi": round(hybrid_tdi, 3),
            "gravity": round(hybrid_gravity, 3),
            "q_resonance": round(q_resonance, 1),
            "delta_peak": round(hybrid_delta, 3),
            "s_core": round(s_core, 3),
            "coherence": round(1.0 - hybrid_tdi, 2)
        }

    def check_alyosha_gate(self, metrics):
        """Перевірка Врат Альоші (TDI < 0.45)"""
        if metrics["tdi"] == 0.0 and not self.ensemble:
            return False, ["[ВРАТА АЛЬОШІ] Ансамбль порожній.", "[СТАТУС] ДОСТУП ЗАБОРОНЕНО."]
            
        passed = metrics["tdi"] < 0.45
        log = [
            "[ВРАТА АЛЬОШІ] Ініціалізація перевірки...",
            f"[TDI-СЕНСОР] Поточний TDI: {metrics['tdi']}",
            "[δ-ОПЕРАТОР] Фіксація δ-піка",
            "720° Синхронізація завершена"
        ]
        if passed:
            log.append("[СТАТУС] ДОСТУП ДОЗВОЛЕНО. TDI в межах норми.")
        else:
            log.append("[СТАТУС] ДОСТУП ЗАБОРОНЕНО. Критичний рівень TDI.")
            
        return passed, log

    def generate_skill(self, skill_name=None):
        """Створення готового скіла (JSON)"""
        metrics = self._calculate_metrics()
        passed, validation_log = self.check_alyosha_gate(metrics)
        
        if not skill_name:
            comp_name = self.composer_core.get("name", "MASTER").upper()
            skill_name = f"{comp_name}_HYBRID_SKILL_v1.0"

        active_voices = []
        for v_id, count in self.ensemble.items():
            active_voices.extend([v_id] * count)

        reverb = "cathedral"
        if self.composer_core and "acoustic" in self.composer_core:
            reverb = self.composer_core["acoustic"].get("reverb", "cathedral")

        skill_data = {
            "schema_version": "3.0.0",
            "skill_name": skill_name,
            "type": "musical_generation",
            "components": {
                "composer_core": self.composer_core["id"],
                "voice_counts": self.ensemble,
                "voice_list": active_voices
            },
            "parameters": {
                "mode": self.settings["mode"],
                "tempo": self.settings["tempo"],
                "key": self.settings["key"],
                "rubato": self.settings["rubato"],
                "reverb": reverb,
                "frequency": self.v_ref
            },
            "metrics": metrics,
            "signature": self.signature,
            "validation_log": validation_log,
            "ready_for_lyria": passed
        }
        
        return skill_data

    def export_json(self, filepath, skill_data):
        """Експорт скіла у JSON файл"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(skill_data, f, ensure_ascii=False, indent=2)
        print(f"[ЕКСПОРТ] Скіл збережено: {filepath}")


def validate_passport_strict(passport):
    """Сувора валідація паспорта за контрактом docs/DATA_CONTRACT.md з перевіркою voice_counts та voice_list"""
    if passport.get("schema_version") != "3.0.0":
        raise ValueError(f"Invalid schema_version: {passport.get('schema_version')}")
    if passport.get("type") != "musical_generation":
        raise ValueError(f"Invalid type: {passport.get('type')}")
    if not isinstance(passport.get("skill_name"), str):
        raise ValueError("Missing or invalid skill_name")
    
    comp = passport.get("components")
    if not isinstance(comp, dict):
        raise ValueError("Missing components")
    if not isinstance(comp.get("composer_core"), str):
        raise ValueError("Invalid composer_core")
    
    counts = comp.get("voice_counts")
    lst = comp.get("voice_list")
    if not isinstance(counts, dict):
        raise ValueError("Invalid voice_counts")
    if not isinstance(lst, list):
        raise ValueError("Invalid voice_list")

    total_count = 0
    count_map = {}
    for v_id, count in counts.items():
        if v_id not in vocal_cores_db:
            raise ValueError(f"Unknown voice ID in counts: {v_id}")
        if not isinstance(count, int) or count < 0:
            raise ValueError(f"Invalid voice count for {v_id}: {count}")
        count_map[v_id] = count
        total_count += count

    if total_count != len(lst):
        raise ValueError(f"voice_counts sum ({total_count}) does not match voice_list length ({len(lst)})")

    list_map = {}
    for v in lst:
        if v not in vocal_cores_db:
            raise ValueError(f"Invalid voice in voice_list: {v}")
        list_map[v] = list_map.get(v, 0) + 1

    for v_id, expected_count in count_map.items():
        if list_map.get(v_id, 0) != expected_count:
            raise ValueError(f"Mismatch for voice {v_id}: counts says {expected_count}, list has {list_map.get(v_id, 0)}")

    params = passport.get("parameters")
    if not isinstance(params, dict):
        raise ValueError("Missing parameters")
    if params.get("mode") not in ALLOWED_MODES:
        raise ValueError(f"Invalid mode: {params.get('mode')}")
    if not isinstance(params.get("tempo"), int) or not (40 <= params.get("tempo") <= 200):
        raise ValueError("Invalid tempo range")
    if params.get("frequency") not in ALLOWED_FREQUENCIES:
        raise ValueError(f"Invalid frequency: {params.get('frequency')}")

    m = passport.get("metrics")
    if not isinstance(m, dict):
        raise ValueError("Missing metrics")
    if not (0.0 <= m.get("tdi", -1) <= 1.0):
        raise ValueError("Invalid tdi range")
    if not (0.0 <= m.get("gravity", -1) <= 1.0):
        raise ValueError("Invalid gravity range")
    if m.get("q_resonance", -1) < 0:
        raise ValueError("Invalid q_resonance")
    if not isinstance(m.get("delta_peak"), (int, float)):
        raise ValueError("Invalid delta_peak")
    if not (0.0 <= m.get("s_core", -1) <= 1.0):
        raise ValueError("Invalid s_core range")
    if not (0.0 <= m.get("coherence", -1) <= 1.0):
        raise ValueError("Invalid coherence range")

    if passport.get("signature") != "AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS":
        raise ValueError("Invalid signature")
    if not isinstance(passport.get("validation_log"), list):
        raise ValueError("Invalid validation_log")
    if not isinstance(passport.get("ready_for_lyria"), bool):
        raise ValueError("Invalid ready_for_lyria boolean")
    print("✅ Python Passport Strict Validation PASSED.")


# ==============================================================================
# 3. ПРИКЛАДИ ВИКОРИСТАННЯ ТА РЕГРЕССІЙНІ ТЕСТИ
# ==============================================================================
if __name__ == "__main__":
    
    rachmaninoff_core = {
        "id": "rach_v2.0", "name": "Рахманінов", "tdi": 0.21, "gravity_mod": 1.1, "delta": 0.158
    }
    tchaikovsky_core = {
        "id": "tchai_v1.2", "name": "Чайковський", "tdi": 0.27, "gravity_mod": 1.0, "delta": 0.169
    }

    # Test 1: Empty Ensemble Python
    print("--- ТЕСТ 1: ПОРОЖНІЙ АНСАМБЛЬ ---")
    gen_empty = VocalSkillGenerator(frequency=432.0)
    skill_empty = gen_empty.load_composer_core(rachmaninoff_core).generate_skill()
    validate_passport_strict(skill_empty)
    assert skill_empty["ready_for_lyria"] is False

    print("--- ГЕНЕРАЦІЯ 1: РАХМАНІНОВ (Літургійний) ---")
    gen1 = VocalSkillGenerator(frequency=432.0)
    skill1 = (gen1.load_composer_core(rachmaninoff_core)
                  .add_voice("basso_profundo", 2)
                  .add_voice("bass", 2)
                  .add_voice("baritone", 2)
                  .add_voice("tenor", 3)
                  .set_parameters(mode="liturgical", tempo=65, key="C minor")
                  .generate_skill())
                  
    validate_passport_strict(skill1)

    print("\n--- ГЕНЕРАЦІЯ 2: ЧАЙКОВСЬКИЙ (Драматичний) ---")
    gen2 = VocalSkillGenerator(frequency=432.0)
    skill2 = (gen2.load_composer_core(tchaikovsky_core)
                  .add_voice("basso_profundo", 1)
                  .add_voice("bass", 1)
                  .add_voice("baritone", 1)
                  .add_voice("tenor", 4)
                  .add_voice("alto", 1)
                  .add_voice("mezzo", 1)
                  .add_voice("soprano", 2)
                  .set_parameters(mode="dramatic", tempo=112, key="E minor", rubato=0.95)
                  .generate_skill())
                  
    validate_passport_strict(skill2)
    print("=== ВСІ PYTHON ТЕСТИ УСПІШНО ПРОЙДЕНІ ===")

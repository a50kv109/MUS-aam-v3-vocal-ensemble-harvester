import React, { useState, useEffect, useMemo } from 'react';
import { 
  Database, Activity, Download, Box, Cpu, FileJson, 
  ShieldCheck, Zap, Server, Layers, Trash2, Music, Settings2, PlayCircle, Save
} from 'lucide-react';
import { COMPOSER_CORES, VOCAL_CORES, generateSkillPassport, computeEnsembleResult } from './vocal_harvester';

/**
 * 🎤 VOCAL/HYBRID CORE GENERATOR v1.0 (ПРОЄКТ 3)
 * Архітектор: Арцибашев Андрій Олексійович (Kharkiv, UA)
 * Идентификатор: AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS
 */

const MODES = ["liturgical", "dramatic", "chamber"];
const KEYS = ["C major", "C minor", "D major", "D minor", "E major", "E minor", "F major", "F minor", "G major", "G minor", "A major", "A minor", "B major", "B minor"];

export default function App() {
  const [selectedComposer, setSelectedComposer] = useState<string>("KUKUZEL");
  const [voiceCounts, setVoiceCounts] = useState<Record<string, number>>({
    "basso_profundo": 2,
    "bass": 0,
    "baritone": 2,
    "tenor": 3,
    "alto": 0,
    "mezzo": 0,
    "soprano": 0
  });

  const [settings, setSettings] = useState({
    mode: "liturgical",
    tempo: 92,
    key: "D minor",
    rubato: 0.82
  });

  const [generatedSkill, setGeneratedSkill] = useState<any | null>(null);

  // Update default mode when composer changes
  useEffect(() => {
    if (selectedComposer) {
      setSettings(s => ({ ...s, mode: COMPOSER_CORES[selectedComposer].default_mode }));
    }
  }, [selectedComposer]);

  const handleVoiceCountChange = (id: string, delta: number) => {
    setVoiceCounts(prev => {
      const newCount = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newCount };
    });
  };

  const autoBalance = () => {
    if (selectedComposer === "KUKUZEL" || selectedComposer === "ARKHANGELSKY") {
      setVoiceCounts({ "basso_profundo": 2, "bass": 2, "baritone": 2, "tenor": 3, "alto": 0, "mezzo": 0, "soprano": 0 });
    } else if (selectedComposer === "BACH") {
      setVoiceCounts({ "basso_profundo": 0, "bass": 1, "baritone": 0, "tenor": 1, "alto": 2, "mezzo": 0, "soprano": 2 });
    } else if (selectedComposer === "GRECHANINOV") {
      setVoiceCounts({ "basso_profundo": 1, "bass": 1, "baritone": 1, "tenor": 4, "alto": 1, "mezzo": 1, "soprano": 2 });
    } else if (selectedComposer === "MOZART" || selectedComposer === "PALESTRINA") {
      setVoiceCounts({ "basso_profundo": 0, "bass": 1, "baritone": 1, "tenor": 1, "alto": 1, "mezzo": 1, "soprano": 2 });
    } else if (selectedComposer === "BORTNYANSKY") {
      setVoiceCounts({ "basso_profundo": 1, "bass": 2, "baritone": 1, "tenor": 2, "alto": 2, "mezzo": 0, "soprano": 2 });
    }
  };

  const metrics = useMemo(() => {
    try {
      const res = computeEnsembleResult(selectedComposer, voiceCounts, settings);
      return {
        tdi: res.tdi,
        gravity: res.gravity,
        q_resonance: res.q_resonance,
        delta_peak: res.delta_peak,
        s_core: res.s_core,
        coherence: res.coherence,
        alyosha_passed: res.alyosha_passed,
        activeVoices: res.activeVoices
      };
    } catch {
      return null;
    }
  }, [selectedComposer, voiceCounts, settings]);

  const generateSkill = () => {
    const passport = generateSkillPassport(selectedComposer, voiceCounts, settings);
    setGeneratedSkill(passport);
  };

  const downloadSkill = () => {
    if (!generatedSkill) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(generatedSkill, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${generatedSkill.skill_name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const totalVoices = Object.values(voiceCounts).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans p-6 overflow-hidden select-none">
      {/* HEADER */}
      <header className="flex justify-between items-center pb-6 border-b border-slate-900 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={16} className="text-cyan-500 animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-slate-500 uppercase">AAM-V3 / Hybrid Combinator</span>
          </div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Vocal/Hybrid Generator</h1>
          <p className="text-[9px] text-slate-600 mt-2 tracking-widest uppercase">ПРОЄКТ 3 • ID: AAM-V1_ARTSYBASHEV_UA_KHARKIV</p>
        </div>
        
        <div className="flex gap-4 items-center bg-black/40 p-3 rounded-xl border border-slate-800/50">
          <div className="text-right">
            <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-wider">TDI Status</div>
            <div className={`text-2xl font-black tabular-nums tracking-tighter ${metrics && metrics.tdi > 0.45 ? 'text-rose-500' : 'text-cyan-400'}`}>
              {metrics ? metrics.tdi.toFixed(3) : "0.000"}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 gap-4 overflow-hidden pt-4">
        
        {/* LEFT COLUMN: STEPS 1 & 2 */}
        <div className="w-[400px] flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          
          {/* STEP 1: COMPOSER CORE */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 tracking-[0.2em]">
                <Layers size={14} className="text-cyan-500" /> 1. Ядро Композитора
              </h2>
              <button 
                onClick={autoBalance}
                className="text-[9px] px-2 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded uppercase font-bold tracking-wider transition-colors"
              >
                Auto-Balance
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {Object.entries(COMPOSER_CORES).map(([id, core]) => {
                const isSelected = selectedComposer === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedComposer(id)}
                    className={`p-3 rounded-lg border text-left transition-all flex justify-between items-center ${isSelected ? core.activeColor : 'bg-black/20 border-slate-800/80 hover:border-slate-700'}`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white uppercase">{core.name}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{core.type}</div>
                    </div>
                    <div className="text-right font-mono text-[10px]">
                      <span className="text-cyan-400 font-bold">TDI: {core.tdi}</span>
                      <div className="text-slate-500">δ: {core.delta}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* STEP 2: VOCAL ENSEMBLE */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-xl">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 tracking-[0.2em] mb-4">
              <Music size={14} className="text-emerald-500" /> 2. Вокальний Ансамбль ({totalVoices})
            </h2>

            <div className="flex flex-col gap-2">
              {Object.entries(VOCAL_CORES).map(([vId, vData]) => {
                const count = voiceCounts[vId] || 0;
                return (
                  <div key={vId} className="flex justify-between items-center bg-black/30 p-2.5 rounded-lg border border-slate-800/60">
                    <div>
                      <div className="text-xs font-bold text-white uppercase">{vData.name}</div>
                      <div className="text-[9px] text-slate-500 font-mono">Діапазон: {vData.range} | TDI: {vData.tdi}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleVoiceCountChange(vId, -1)}
                        className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold text-xs flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-cyan-400">{count}</span>
                      <button 
                        onClick={() => handleVoiceCountChange(vId, 1)}
                        className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold text-xs flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: PARAMETERS & PREVIEW */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          
          {/* STEP 3: PARAMETERS */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-xl">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 tracking-[0.2em] mb-4">
              <Settings2 size={14} className="text-amber-500" /> 3. Параметри Синтезу та Резонансу
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Режим (Mode)</label>
                <select 
                  value={settings.mode}
                  onChange={(e) => setSettings(s => ({ ...s, mode: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-[11px] p-2 rounded outline-none focus:border-cyan-500 transition-colors"
                >
                  {MODES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Темп (Tempo)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" min="40" max="200" value={settings.tempo}
                    onChange={(e) => setSettings(s => ({ ...s, tempo: parseInt(e.target.value) || 90 }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-[11px] p-2 rounded outline-none focus:border-cyan-500 transition-colors"
                  />
                  <span className="text-[10px] text-slate-500 font-mono">BPM</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Тональність (Key)</label>
                <select 
                  value={settings.key}
                  onChange={(e) => setSettings(s => ({ ...s, key: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-[11px] p-2 rounded outline-none focus:border-cyan-500 transition-colors"
                >
                  {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Rubato (Еластичність)</label>
                  <span className="text-[10px] font-mono text-cyan-400">{settings.rubato.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.01" value={settings.rubato}
                  onChange={(e) => setSettings(s => ({ ...s, rubato: parseFloat(e.target.value) }))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>
          </section>

          {/* PREVIEW & EXPORT */}
          <section className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl p-6 flex flex-col relative shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <h2 className="text-[10px] font-bold text-cyan-500 uppercase flex items-center gap-2 tracking-[0.2em] mb-6 relative z-10">
              <Activity size={14} /> Попередній Перегляд
            </h2>

            <div className="flex-1 flex flex-col gap-6 relative z-10">
              {metrics && metrics.activeVoices.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-4 rounded-lg border border-slate-800">
                      <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Ядро Композитора</div>
                      <div className="text-sm font-black text-white uppercase">{COMPOSER_CORES[selectedComposer].name}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>{selectedComposer}</span>
                        <span className="text-purple-400">δ: {COMPOSER_CORES[selectedComposer].delta}</span>
                      </div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-lg border border-slate-800">
                      <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Голосовий Ансамбль</div>
                      <div className="text-sm font-black text-white uppercase">{totalVoices} Голосів</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {Object.entries(voiceCounts).filter(([_, c]) => (c as number) > 0).map(([id, c]) => `${c} ${VOCAL_CORES[id].name}`).join(' + ')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">TDI</div>
                      <div className={`text-lg font-mono font-bold ${metrics.tdi > 0.45 ? 'text-rose-500' : 'text-cyan-400'}`}>{metrics.tdi.toFixed(3)}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">Q-Резонанс</div>
                      <div className="text-lg font-mono font-bold text-emerald-400">{metrics.q_resonance.toFixed(1)}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">Гравітація</div>
                      <div className="text-lg font-mono font-bold text-amber-400">{metrics.gravity.toFixed(3)}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">δ-Пік</div>
                      <div className="text-lg font-mono font-bold text-purple-400">{metrics.delta_peak.toFixed(3)}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">S-CORE</div>
                      <div className="text-lg font-mono font-bold text-indigo-400">{metrics.s_core.toFixed(3)}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-center">
                      <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">Статус</div>
                      <div className="text-lg font-mono font-bold mt-1">
                        {metrics.alyosha_passed ? <span className="text-emerald-500 text-xs">✅ ГОТОВО</span> : <span className="text-rose-500 text-xs">❌ FAIL</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={generateSkill}
                      disabled={!metrics}
                      className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-[11px] font-black rounded-lg uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:shadow-none"
                    >
                      <Box size={16} /> Створити Скіл
                    </button>
                    {generatedSkill && (
                      <button 
                        onClick={downloadSkill}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black rounded-lg uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      >
                        <Download size={16} /> Завантажити JSON
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <Music size={48} className="mb-4 text-slate-500" />
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Додайте голоси для перегляду</div>
                </div>
              )}
            </div>
          </section>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="h-8 flex justify-between items-center text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] border-t border-slate-900 pt-3 mt-1 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-cyan-700">
            <ShieldCheck size={12} /> 720° СИНХРОНІЗАЦІЯ
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Activity size={12} /> СТАТУС: ОНЛАЙН
          </div>
        </div>
        <div className="text-slate-700">AAM-V1_ARTSYBASHEV_UA_KHARKIV_AIANALYSIS © 2026</div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; border: 1px solid #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />
    </div>
  );
}

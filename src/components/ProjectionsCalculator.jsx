import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Sparkles, TrendingUp } from 'lucide-react';

export default function ProjectionsCalculator() {
  // Main Projection Inputs (COP)
  const [initialAmount, setInitialAmount] = useState(5000000);
  const [monthlyContribution, setMonthlyContribution] = useState(300000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [years, setYears] = useState(10);

  // Target Goal Calculator Inputs
  const [targetGoal, setTargetGoal] = useState(150000000);
  const [targetYears, setTargetYears] = useState(15);
  const [targetRate, setTargetRate] = useState(9);

  // Force dots formatting helper
  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '$ 0';
    const isNegative = val < 0;
    const absVal = Math.round(Math.abs(val));
    const formatted = absVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${isNegative ? '-' : ''}$ ${formatted}`;
  };

  const formatNumberInput = (value) => {
    if (value === undefined || value === null || isNaN(value)) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseNumberInput = (value) => {
    const clean = value.replace(/\D/g, '');
    return parseFloat(clean) || 0;
  };

  // Compound Interest Calculation
  const projectionData = useMemo(() => {
    const data = [];
    const monthlyRate = interestRate / 100 / 12;
    let totalValue = initialAmount;
    let totalInvested = initialAmount;

    data.push({
      year: 0,
      'Aportes Ahorrados': Math.round(totalInvested),
      'Ahorro Acumulado': Math.round(totalValue),
      'Intereses Ganados': 0
    });

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        totalValue = (totalValue + monthlyContribution) * (1 + monthlyRate);
        totalInvested += monthlyContribution;
      }
      data.push({
        year: year,
        'Aportes Ahorrados': Math.round(totalInvested),
        'Ahorro Acumulado': Math.round(totalValue),
        'Intereses Ganados': Math.round(totalValue - totalInvested)
      });
    }
    return data;
  }, [initialAmount, monthlyContribution, interestRate, years]);

  const finalMetrics = projectionData[projectionData.length - 1];

  // Target Goal Calculation (PMT)
  const requiredMonthlyContribution = useMemo(() => {
    const rate = targetRate / 100 / 12;
    const months = targetYears * 12;
    if (rate === 0) return targetGoal / months;
    
    const numerator = targetGoal * rate;
    const denominator = Math.pow(1 + rate, months) - 1;
    return numerator / denominator;
  }, [targetGoal, targetYears, targetRate]);

  return (
    <div className="tab-pane active">
      <div className="top-header">
        <div className="header-title-area">
          <h1>Plan de Estudios (Proyecciones)</h1>
          <p>Planifica tus ahorros a mediano y largo plazo. ¡Visualiza tus metas futuras, hermosa! 🍂✨</p>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid-cols-3">
        {/* Inputs Form */}
        <div className="glass-card col-span-1" style={{ height: 'fit-content' }}>
          <h2>Táctica de Planificación (Simulación)</h2>
          
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Ahorro Inicial (Capital)</label>
              <span className="text-cyan font-bold">{formatCurrency(initialAmount)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100000000" 
              step="500000"
              value={initialAmount} 
              onChange={(e) => setInitialAmount(parseFloat(e.target.value))}
            />
            <input 
              type="text" 
              value={formatNumberInput(initialAmount)} 
              onChange={(e) => setInitialAmount(parseNumberInput(e.target.value))}
              style={{ marginTop: '-5px' }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Aporte Mensual (Tus Ahorros)</label>
              <span className="text-cyan font-bold">{formatCurrency(monthlyContribution)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000000" 
              step="50000"
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
            />
            <input 
              type="text" 
              value={formatNumberInput(monthlyContribution)} 
              onChange={(e) => setMonthlyContribution(parseNumberInput(e.target.value))}
              style={{ marginTop: '-5px' }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label>Rendimiento Anual Estimado (%)</label>
              <span className="text-cyan font-bold">{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="25" 
              step="0.5"
              value={interestRate} 
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
            <input 
              type="number" 
              value={interestRate} 
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              style={{ marginTop: '-5px' }}
            />
          </div>

          <div className="form-group">
            <label>Plazo de Ahorro (Años Lectivos)</label>
            <select value={years} onChange={(e) => setYears(parseInt(e.target.value))}>
              <option value={3}>3 Años (Lectivos)</option>
              <option value={5}>5 Años (Lectivos)</option>
              <option value={10}>10 Años (Lectivos)</option>
              <option value={15}>15 Años (Lectivos)</option>
              <option value={20}>20 Años (Lectivos)</option>
            </select>
          </div>
        </div>

        {/* Chart Area */}
        <div className="glass-card col-span-2">
          <h2>Crecimiento Patrimonial Escolar</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#8e7365" fontSize={11} label={{ value: 'Años Lectivos', position: 'insideBottom', offset: -5, fill: '#8e7365' }} />
                <YAxis stroke="#8e7365" fontSize={11} tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c0e07', borderColor: 'rgba(255,255,255,0.08)' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line type="monotone" dataKey="Aportes Ahorrados" stroke="#e76f51" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Ahorro Acumulado" stroke="#e07a5f" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Results metrics */}
          <div className="grid-cols-3" style={{ marginTop: '1.5rem', marginBottom: 0, gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Ahorros Aportados</span>
              <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: 'var(--accent-rose)' }}>
                {formatCurrency(finalMetrics['Aportes Ahorrados'])}
              </h3>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Intereses Ganados (Rendimiento)</span>
              <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: 'var(--accent-emerald)' }}>
                {formatCurrency(finalMetrics['Intereses Ganados'])}
              </h3>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ahorro Final Acumulado</span>
              <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>
                {formatCurrency(finalMetrics['Ahorro Acumulado'])}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Target Goal Calculator */}
      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Trophy className="text-gold" size={24} />
          <h2>Plan de Metas (Sueños por Cumplir)</h2>
        </div>
        
        <p style={{ marginBottom: '1.5rem' }}>
          ¿Tienes una meta de ahorro en mente para un viaje o proyecto? Calcula exactamente cuánto necesitas ahorrar mensualmente para cumplir tu sueño, considerando el interés compuesto anual de tus fondos.
        </p>

        <div className="grid-cols-4" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label>Meta de Ahorro Objetivo</label>
            <input 
              type="text" 
              value={formatNumberInput(targetGoal)} 
              onChange={(e) => setTargetGoal(parseNumberInput(e.target.value))}
              placeholder="Ej. 150.000.000"
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatCurrency(targetGoal)}</span>
          </div>

          <div className="form-group">
            <label>Plazo para Lograrlo (Años)</label>
            <input 
              type="number" 
              value={targetYears} 
              onChange={(e) => setTargetYears(parseInt(e.target.value) || 1)}
              placeholder="Ej. 15"
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Rendimiento Anual Estimado (%)</label>
            <input 
              type="number" 
              value={targetRate} 
              onChange={(e) => setTargetRate(parseFloat(e.target.value) || 0)}
              placeholder="Ej. 9"
              step="0.5"
            />
          </div>

          <div className="metric-card gold" style={{ background: 'rgba(244, 162, 97, 0.04)', border: '1px solid rgba(244, 162, 97, 0.15)', padding: '1rem', borderRadius: '12px' }}>
            <div className="metric-header" style={{ marginBottom: '0.25rem' }}>
              <span className="metric-title" style={{ color: 'var(--accent-gold)' }}>Ahorro Mensual Requerido</span>
              <TrendingUp size={16} className="text-gold" />
            </div>
            <div className="metric-value text-gold" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
              {formatCurrency(requiredMonthlyContribution)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Durante {targetYears} años al {targetRate}% anual
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

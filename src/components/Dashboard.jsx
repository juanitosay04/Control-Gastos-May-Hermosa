import React from 'react';
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity, 
  RefreshCw, 
  Download,
  BookOpen,
  Award,
  Trash2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';

export default function Dashboard({ 
  financialData, 
  simulateBankSync, 
  exportData,
  onDeleteTransaction,
  clearData
}) {
  const { income, expenses, transactions, investments } = financialData;

  // Calculations
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
  const netWorth = (income - totalExpenses) + totalInvestments;
  
  const savingsAmount = income - totalExpenses;
  const savingsRate = income > 0 ? ((savingsAmount / income) * 100).toFixed(1) : 0;

  // Force dots formatting helper
  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '$ 0';
    const isNegative = val < 0;
    const absVal = Math.round(Math.abs(val));
    const formatted = absVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${isNegative ? '-' : ''}$ ${formatted}`;
  };

  // Mock historical data scaled for COP
  const historicalCashFlow = [
    { name: 'Mar', Ingresos: 3300000, Gastos: 1800000 },
    { name: 'Abr', Ingresos: 3500000, Gastos: 2100000 },
    { name: 'May', Ingresos: 3500000, Gastos: 2200000 },
    { name: 'Jun', Ingresos: 3500000, Gastos: 1900000 },
    { name: 'Jul', Ingresos: 3500000, Gastos: 2400000 },
    { name: 'Ago', Ingresos: income, Gastos: totalExpenses },
  ];

  const historicalNetWorth = [
    { name: 'Mar', Patrimonio: 18000000 },
    { name: 'Abr', Patrimonio: 19500000 },
    { name: 'May', Patrimonio: 21000000 },
    { name: 'Jun', Patrimonio: 22400000 },
    { name: 'Jul', Patrimonio: 23600000 },
    { name: 'Ago', Patrimonio: netWorth },
  ];

  return (
    <div className="tab-pane active">
      {/* Header bar */}
      <div className="top-header">
        <div className="header-title-area">
          <h1>Cuaderno de Tareas</h1>
          <p>Control del mes de mi hermosa profe. ¡Monitorea tus ingresos, gastos y metas! 🍂👩‍🏫</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={simulateBankSync} style={{ width: 'auto' }}>
            <RefreshCw size={16} />
            <span>Simular Turno de Clases</span>
          </button>
          <button className="btn btn-primary" onClick={exportData} style={{ width: 'auto' }}>
            <Download size={16} />
            <span>Descargar Boletín (JSON)</span>
          </button>
          {clearData && (
            <button className="btn btn-danger" onClick={clearData} style={{ width: 'auto', background: 'var(--accent-rose)', color: '#120904' }}>
              <Trash2 size={16} />
              <span>Limpiar Demostración</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid-cols-4">
        {/* Net Worth */}
        <div className="glass-card metric-card cyan">
          <div className="metric-header">
            <span className="metric-title">Patrimonio Neto (Ahorros)</span>
            <div className="metric-icon-wrapper">
              <Heart size={20} className="text-cyan" fill="var(--accent-cyan)" />
            </div>
          </div>
          <div className="metric-value">{formatCurrency(netWorth)}</div>
          <div className="metric-footer">
            <span className="trend-badge up">
              <ArrowUpRight size={12} />
              +4.8%
            </span>
            <span>este mes</span>
          </div>
        </div>

        {/* Income */}
        <div className="glass-card metric-card emerald">
          <div className="metric-header">
            <span className="metric-title">Ingresos Totales (Clases)</span>
            <div className="metric-icon-wrapper">
              <ArrowUpRight size={20} className="text-emerald" />
            </div>
          </div>
          <div className="metric-value">{formatCurrency(income)}</div>
          <div className="metric-footer">
            <span className="trend-badge up">
              <ArrowUpRight size={12} />
              Estable
            </span>
            <span>mensual base</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="glass-card metric-card rose">
          <div className="metric-header">
            <span className="metric-title">Gastos Escolares & Ocio</span>
            <div className="metric-icon-wrapper">
              <ArrowDownRight size={20} className="text-rose" />
            </div>
          </div>
          <div className="metric-value">{formatCurrency(totalExpenses)}</div>
          <div className="metric-footer">
            <span className={`trend-badge ${totalExpenses > 2800000 ? 'down' : 'up'}`}>
              {totalExpenses > 2800000 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {totalExpenses > 2800000 ? 'Cerca al límite' : 'Bajo control'}
            </span>
            <span>este periodo</span>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="glass-card metric-card gold">
          <div className="metric-header">
            <span className="metric-title">Tasa de Aprobación (Ahorro)</span>
            <div className="metric-icon-wrapper">
              <Activity size={20} className="text-gold" />
            </div>
          </div>
          <div className="metric-value">{savingsRate}%</div>
          <div className="metric-footer">
            <span className="trend-badge up">
              <ArrowUpRight size={12} />
              {savingsRate > 35 ? 'Excelente Ahorro' : 'Progreso Óptimo'}
            </span>
            <span>del salario</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-cols-2">
        {/* Net Worth Area Chart */}
        <div className="glass-card">
          <h2>Evolución de Ahorros de la Profe</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalNetWorth} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatrimonio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e07a5f" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#e07a5f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#8e7365" fontSize={12} />
                <YAxis 
                  stroke="#8e7365" 
                  fontSize={12} 
                  tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} 
                  domain={['dataMin - 2000000', 'dataMax + 2000000']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c0e07', borderColor: 'rgba(255,255,255,0.08)' }}
                  formatter={(value) => [formatCurrency(value), 'Ahorros Totales']}
                />
                <Area 
                  type="monotone" 
                  dataKey="Patrimonio" 
                  stroke="#e07a5f" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPatrimonio)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cash Flow Bar Chart */}
        <div className="glass-card">
          <h2>Rendimiento Mensual (Ingresos vs Gastos)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalCashFlow} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#8e7365" fontSize={12} />
                <YAxis stroke="#8e7365" fontSize={12} tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c0e07', borderColor: 'rgba(255,255,255,0.08)' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="Ingresos" fill="#f4a261" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Gastos" fill="#e76f51" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Info */}
      <div className="grid-cols-3">
        {/* Transactions List */}
        <div className="glass-card col-span-2">
          <h2>Historial de Movimientos Recientes</h2>
          <div style={{ maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
            {transactions.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No hay anotaciones registradas en el cuaderno todavía.
              </p>
            ) : (
              transactions.slice(0, 6).map((t) => {
                const isExpense = t.type === 'expense';
                return (
                  <div key={t.id} className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-icon">
                        {isExpense ? (
                          <TrendingDown className="text-rose" size={16} />
                        ) : (
                          <TrendingUp className="text-emerald" size={16} />
                        )}
                      </div>
                      <div className="transaction-details">
                        <h4>{t.description}</h4>
                        <p>{t.category} • {t.date}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className={`transaction-value ${isExpense ? 'text-rose' : 'text-emerald'}`} style={{ marginRight: '0.25rem' }}>
                        {isExpense ? '-' : '+'}{formatCurrency(t.amount)}
                      </div>
                      {onDeleteTransaction && (
                        <button 
                          onClick={() => onDeleteTransaction(t.id)}
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: 'var(--accent-rose)', 
                            cursor: 'pointer', 
                            padding: '0.25rem', 
                            display: 'flex', 
                            alignItems: 'center',
                            opacity: 0.7
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                          title="Eliminar Movimiento"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Wealth Checkup / Triaje */}
        <div className="glass-card">
          <h2>Evaluación Escolar (Signos)</h2>
          <p style={{ marginBottom: '1.25rem' }}>
            Estado rápido de tu salud financiera y de las reservas del salón.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Caja de Tizas (Fondo de Reserva)</span>
              <span className="badge text-emerald" style={{ background: 'rgba(129, 178, 154, 0.12)' }}>Óptimo (5.4 meses)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tensión de Deudas</span>
              <span className="badge text-cyan" style={{ background: 'rgba(224, 122, 95, 0.12)' }}>Bajo control (9%)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Distribución del Aula</span>
              <span className="badge text-purple" style={{ background: 'rgba(244, 162, 97, 0.12)' }}>Saludable</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Rendimiento Académico</span>
              <span className="badge text-gold" style={{ background: 'rgba(244, 162, 97, 0.12)' }}>¡Excelente Profe! 🍎</span>
            </div>
          </div>

          <div className="quick-actions-grid">
            <div className="quick-action-btn" onClick={() => window.alert('Próximamente: Integrador de Notas y Plan de Clases.')}>
              <BookOpen size={18} />
              <span>Clases</span>
            </div>
            <div className="quick-action-btn" onClick={simulateBankSync}>
              <RefreshCw size={18} />
              <span>Sincronizar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

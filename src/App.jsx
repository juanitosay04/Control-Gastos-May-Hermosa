import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExpensesTracker from './components/ExpensesTracker';
import ProjectionsCalculator from './components/ProjectionsCalculator';
import InvestmentsTracker from './components/InvestmentsTracker';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Floating custom toast alert state
  const [activeAlert, setActiveAlert] = useState({
    show: false,
    message: '',
    type: 'info' // 'income' or 'expense'
  });

  // Initial State tailored for May (Teacher & Autumn Theme)
  const [financialData, setFinancialData] = useState({
    income: 3500000, // May's budget limit (monthly salary)
    expenses: [
      { id: 1, description: 'Arriendo Apartamento', amount: 1000000, category: 'Vivienda', date: '2026-08-01' },
      { id: 2, description: 'Materiales Escolares (Colores, Marcadores, Copias)', amount: 180000, category: 'Otros', date: '2026-08-03' },
      { id: 3, description: 'Salida a Cenar con mi Inge Lindo', amount: 150000, category: 'Entretenimiento', date: '2026-08-04' },
      { id: 4, description: 'Servicios Públicos (Luz/Internet)', amount: 280000, category: 'Servicios', date: '2026-08-05' },
      { id: 5, description: 'Suscripción Canva Pro (para clases)', amount: 39000, category: 'Otros', date: '2026-08-06' },
      { id: 6, description: 'Plan de Celular Claro', amount: 75000, category: 'Servicios', date: '2026-08-07' }
    ],
    investments: [
      { id: 1, name: 'CDT Bancolombia Profe', type: 'Renta Fija', shares: 1, averageCost: 5000000, currentPrice: 5250000 },
      { id: 2, name: 'Ahorro Vacaciones Inge & May', type: 'Renta Fija', shares: 1, averageCost: 3000000, currentPrice: 3120000 }
    ],
    transactions: [
      { id: 1, description: 'Plan de Celular Claro', amount: 75000, category: 'Servicios', type: 'expense', date: '2026-08-07' },
      { id: 2, description: 'Suscripción Canva Pro (para clases)', amount: 39000, category: 'Otros', type: 'expense', date: '2026-08-06' },
      { id: 3, description: 'Sueldo Docencia Colegio', amount: 3500000, category: 'Sueldo', type: 'income', date: '2026-08-05' },
      { id: 4, description: 'Servicios Públicos (Luz/Internet)', amount: 280000, category: 'Servicios', type: 'expense', date: '2026-08-05' },
      { id: 5, description: 'Salida a Cenar con mi Inge Lindo', amount: 150000, category: 'Entretenimiento', type: 'expense', date: '2026-08-04' }
    ],
    obligations: [
      { id: 1, description: 'Arriendo Apartamento', amount: 1000000, category: 'Vivienda', type: 'Gasto Fijo', dueDate: 'Día 05', paid: true },
      { id: 2, description: 'Plan de Celular Claro', amount: 75000, category: 'Servicios', type: 'Gasto Fijo', dueDate: 'Día 07', paid: true },
      { id: 3, description: 'Cuota Crédito Educativo ICETEX', amount: 250000, category: 'Créditos', type: 'Crédito Educativo', dueDate: 'Día 15', paid: false },
      { id: 4, description: 'Servicios Públicos (Luz/Internet)', amount: 280000, category: 'Servicios', type: 'Gasto Fijo', dueDate: 'Día 20', paid: false }
    ]
  });

  // Trigger global toast alert helper
  const triggerToastAlert = (message, type) => {
    setActiveAlert({ show: true, message, type });
    // Reset after 8 seconds
    const timer = setTimeout(() => {
      setActiveAlert((prev) => ({ ...prev, show: false }));
    }, 8000);
    return () => clearTimeout(timer);
  };

  // Messages chosen based on prospective total expenses
  const getExpenseMessage = (newTotal) => {
    if (newTotal < 1000000) {
      const list = [
        "¡Empezamos el mes tranquilas, hermosa! 🍂",
        "Un gustico no le hace daño a nadie. ✨",
        "Todo bajo control, mi profe favorita. 👩‍🏫"
      ];
      return list[Math.floor(Math.random() * list.length)];
    } else if (newTotal >= 1000000 && newTotal < 2000000) {
      const list = [
        "Upa, más gastos... pero te lo mereces, preciosa. 😘",
        "¡Cuidado con la billetera! Pero bueno, la vida es una sola. 🍁",
        "La economía está temblando un poquito, mi amor. 💸"
      ];
      return list[Math.floor(Math.random() * list.length)];
    } else if (newTotal >= 2000000 && newTotal < 3000000) {
      const list = [
        "¡Epa! Ese carrito de compras va lleno. ¿Todo es para el colegio? 🏫",
        "Alguien está gastando como si el inge fuera millonario... mentiras, mi amor, ¡disfruta! 😂",
        "¡Alerta naranja! El presupuesto escolar está bajando. ⚠️"
      ];
      return list[Math.floor(Math.random() * list.length)];
    } else {
      const list = [
        "¡DIOS MÍO, PARTE EL LÁPIZ! 🛑 ¡Llegamos a zona de tarjeta roja de gastos!",
        "Mi amor... ¿compraste un salón de clases entero o qué pasó aquí? 😱",
        "¡Emergencia financiera! Reportarse con el inge para un rescate económico inmediato. 🚨❤️"
      ];
      return list[Math.floor(Math.random() * list.length)];
    }
  };

  // Income messages from the inge
  const getIncomeMessage = () => {
    const list = [
      "¡Uy, hola, hermosa! Entró platica fresca. 💸✨",
      "No te olvides de comprarle alguito a tu inge hermoso... guiño guiño. 😉❤️",
      "¡Llegó el pago de las clases! A consentir a la mejor profesora del mundo. 👩‍🏫🍎",
      "Entrada registrada. ¡Qué novia tan trabajadora e inteligente tengo! 😍",
      "¡Platica para el próximo viaje juntos! Qué felicidad, mi vida. ✈️🍂",
      "¡Felicidades, mi amor! Tu esfuerzo siempre da frutos. Te amo. ❤️"
    ];
    return list[Math.floor(Math.random() * list.length)];
  };

  // Handlers for Expenses
  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now()
    };
    
    const transaction = {
      id: Date.now() + 1,
      description: newExpense.description,
      amount: newExpense.amount,
      category: newExpense.category,
      type: 'expense',
      date: newExpense.date
    };

    setFinancialData((prev) => {
      const updatedExpenses = [expenseWithId, ...prev.expenses];
      const newTotal = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      
      triggerToastAlert(getExpenseMessage(newTotal), 'expense');

      return {
        ...prev,
        expenses: updatedExpenses,
        transactions: [transaction, ...prev.transactions]
      };
    });
  };

  const handleDeleteExpense = (id) => {
    setFinancialData((prev) => {
      const expenseToDelete = prev.expenses.find(exp => exp.id === id);
      const filteredExpenses = prev.expenses.filter((exp) => exp.id !== id);
      
      const filteredTransactions = prev.transactions.filter(
        (t) => !(t.description === expenseToDelete?.description && t.amount === expenseToDelete?.amount)
      );

      return {
        ...prev,
        expenses: filteredExpenses,
        transactions: filteredTransactions
      };
    });
  };

  // Handlers for Investments
  const handleAddInvestment = (newInv) => {
    const investmentWithId = {
      ...newInv,
      id: Date.now()
    };

    setFinancialData((prev) => ({
      ...prev,
      investments: [investmentWithId, ...prev.investments]
    }));
  };

  const handleDeleteInvestment = (id) => {
    setFinancialData((prev) => ({
      ...prev,
      investments: prev.investments.filter((inv) => inv.id !== id)
    }));
  };

  // Handlers for Obligations
  const handleToggleObligation = (id) => {
    setFinancialData((prev) => {
      const obligation = prev.obligations.find((ob) => ob.id === id);
      if (!obligation) return prev;

      const isMarkingPaid = !obligation.paid;
      const updatedObligations = prev.obligations.map((ob) => {
        if (ob.id === id) {
          return { ...ob, paid: isMarkingPaid };
        }
        return ob;
      });

      let updatedExpenses = [...prev.expenses];
      let updatedTransactions = [...prev.transactions];

      if (isMarkingPaid) {
        const newExpense = {
          id: Date.now(),
          description: obligation.description,
          amount: obligation.amount,
          category: obligation.category,
          date: new Date().toISOString().split('T')[0]
        };
        const newTransaction = {
          id: Date.now() + 1,
          description: obligation.description,
          amount: obligation.amount,
          category: obligation.category,
          type: 'expense',
          date: new Date().toISOString().split('T')[0]
        };
        updatedExpenses = [newExpense, ...updatedExpenses];
        updatedTransactions = [newTransaction, ...updatedTransactions];

        // Trigger expense alert message
        const newTotal = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        triggerToastAlert(getExpenseMessage(newTotal), 'expense');
      } else {
        updatedExpenses = updatedExpenses.filter(
          (exp) => !(exp.description === obligation.description && exp.amount === obligation.amount)
        );
        updatedTransactions = updatedTransactions.filter(
          (t) => !(t.description === obligation.description && t.amount === obligation.amount)
        );
      }

      return {
        ...prev,
        obligations: updatedObligations,
        expenses: updatedExpenses,
        transactions: updatedTransactions
      };
    });
  };

  const handleAddObligation = (newObl) => {
    setFinancialData((prev) => ({
      ...prev,
      obligations: [
        ...prev.obligations,
        {
          ...newObl,
          id: Date.now(),
          paid: false
        }
      ]
    }));
  };

  const handleDeleteObligation = (id) => {
    setFinancialData((prev) => ({
      ...prev,
      obligations: prev.obligations.filter((ob) => ob.id !== id)
    }));
  };

  // Simulates automatic sync with teacher shifts and loving items
  const handleSimulateBankSync = () => {
    const mockDescriptions = [
      { desc: 'Pago Asesoría Proyecto Escolar', amount: 350000, category: 'Sueldo', type: 'income' },
      { desc: 'Material Didáctico Manualidades', amount: 80000, category: 'Otros', type: 'expense' },
      { desc: 'Merienda en Cafetería del Colegio', amount: 25000, category: 'Alimentación', type: 'expense' },
      { desc: 'Detallito Lindo para el Inge', amount: 65000, category: 'Entretenimiento', type: 'expense' },
      { desc: 'Clase Extra de Refuerzo Sábado', amount: 200000, category: 'Sueldo', type: 'income' }
    ];

    const randomIndex = Math.floor(Math.random() * mockDescriptions.length);
    const mock = mockDescriptions[randomIndex];
    const newId = Date.now();

    const newTransaction = {
      id: newId,
      description: mock.desc,
      amount: mock.amount,
      category: mock.category,
      type: mock.type,
      date: new Date().toISOString().split('T')[0]
    };

    setFinancialData((prev) => {
      const updatedTransactions = [newTransaction, ...prev.transactions];
      let updatedExpenses = prev.expenses;

      if (mock.type === 'expense') {
        const newExpense = {
          id: newId + 1,
          description: mock.desc,
          amount: mock.amount,
          category: mock.category,
          date: newTransaction.date
        };
        updatedExpenses = [newExpense, ...prev.expenses];
        
        // Trigger alert
        const newTotal = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        triggerToastAlert(getExpenseMessage(newTotal), 'expense');
      } else if (mock.type === 'income') {
        // Trigger income alert
        triggerToastAlert(getIncomeMessage(), 'income');

        return {
          ...prev,
          income: prev.income + mock.amount,
          transactions: updatedTransactions
        };
      }

      return {
        ...prev,
        expenses: updatedExpenses,
        transactions: updatedTransactions
      };
    });
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(financialData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Diario_Financiero_May_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="app-container">
      <div className="aurora-2"></div>
      
      {/* Floating alert toast notification */}
      {activeAlert.show && (
        <div className="toast-container">
          <div className={`toast-alert ${activeAlert.type}`}>
            <span className="toast-alert-text">{activeAlert.message}</span>
            <button 
              className="toast-alert-close" 
              onClick={() => setActiveAlert((prev) => ({ ...prev, show: false }))}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Sidebar with themed links */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main panel */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            financialData={financialData} 
            simulateBankSync={handleSimulateBankSync}
            exportData={handleExportData}
          />
        )}
        
        {activeTab === 'expenses' && (
          <ExpensesTracker 
            expenses={financialData.expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            obligations={financialData.obligations}
            onToggleObligation={handleToggleObligation}
            onAddObligation={handleAddObligation}
            onDeleteObligation={handleDeleteObligation}
          />
        )}

        {activeTab === 'projections' && (
          <ProjectionsCalculator />
        )}

        {activeTab === 'investments' && (
          <InvestmentsTracker 
            investments={financialData.investments}
            onAddInvestment={handleAddInvestment}
            onDeleteInvestment={handleDeleteInvestment}
          />
        )}
      </main>
    </div>
  );
}

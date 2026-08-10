import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExpensesTracker from './components/ExpensesTracker';
import ProjectionsCalculator from './components/ProjectionsCalculator';
import InvestmentsTracker from './components/InvestmentsTracker';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [welcomeGreeting, setWelcomeGreeting] = useState('');
  const [showMimoModal, setShowMimoModal] = useState(false);
  const [currentMimoNote, setCurrentMimoNote] = useState('');
  const [syncStatus, setSyncStatus] = useState('loading');
  const [syncError, setSyncError] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedHistoryPeriod, setSelectedHistoryPeriod] = useState(null);

  const welcomeGreetings = [
    "¡Hola, mi hermosa profe! Que tengas un día tan espectacular como tu sonrisa. Recuerda que te amo. ❤️ - Tu Inge",
    "Hola, mi reina. 🌸 Aquí está tu inge hermoso listo para ayudarte a cuidar de tu saloncito financiero. ¡Te ves preciosa hoy! 😘",
    "¡Hola, mi vida! Espero que tu jornada escolar sea maravillosa. P.D: No olvides que eres la profesora más linda del mundo entero. 😍✨",
    "¡Buenas nuevas, mi amor! Entrando al diario de la profe consentida. Hoy vas a tener un día increíble. ¡Te amo muchísimo! 💕🏫",
    "¡Hola, hermosa! Que hoy tus estudiantes se porten de maravilla y que tu corazón se llene de alegría. Te mando un abrazo gigante. 👩‍🏫❤️",
    "¡Mi amor! Recuerda tomarte una pausa para respirar y sonreír. Eres la docente más brillante y la novia más dulce. 🥰✨",
    "¡Hola, mi profe favorita! Si el día se pone difícil, recuerda que tu inge te espera con los brazos abiertos y muchos besitos. 🍁💋",
    "¡Hola, mi cielo! Hoy tienes cara de que vas a cambiar el mundo de un estudiante... y de que estás más hermosa que nunca. 😍📚",
    "¡Entrando al cuaderno de la novia más linda del planeta! Que hoy todo te salga de maravilla, mi reina. Te amo. ❤️🏫",
    "¡Hola, mi vida! Eres la profe de mi vida, la que me enseña todos los días lo que es el amor de verdad. ¡Que tengas un gran día! 🌸✨",
    "¡Hola, hermosa! Un cafecito virtual ☕ y todo el amor del mundo de parte de tu inge para empezar el día escolar. 🛠️❤️",
    "¡Mi profe consentida! Deja que tu luz brille hoy en el salón, y recuerda que en la tarde te lleno de mimos. 😘🌟",
    "¡Hola, mi reina hermosa! Que hoy la paciencia te sobre y las sonrisas te sobren aún más. ¡Te amo con locura! 💕🏫",
    "¡Hola, mi amor! Pasaba a desearte un día maravilloso y a recordarte que eres mi persona favorita de todo el universo. 😍💫",
    "¡Buenos días, preciosa! Que hoy tu pizarra se llene de ideas lindas y tu día de momentos felices. 👩‍🏫🍂",
    "¡Hola, mi vida! Eres el recreo favorito de mi corazón. ¡Que tengas un día escolar increíble! 🥰🎒",
    "¡Hola, hermosa! Recuerda que eres una profesional brillante y una novia perfecta. ¡Orgulloso de ti, siempre! 🎓❤️",
    "¡Hola, mi sol! Que hoy brilles en tu colegio y que nada te quite esa sonrisa tan espectacular. Te amo. 💕✨",
    "¡Hola, mi amor lindo! Un abracito apretado de tu inge para que empieces con toda la energía. ¡Te adoro! 🥰🍁",
    "¡Hola, preciosa! Eres la dueña absoluta de mi corazón y de mi presupuesto de amor (que es infinito). 😘💸",
    "¡Hola, mi vida! ¿Sabías que eres más linda que un fin de semana completo? ¡Ten un día espectacular hoy! 😍🌻",
    "¡Hola, mi profe hermosa! Hoy vas a ser la inspiración de tus alumnos y la reina de mi corazón, como siempre. ❤️🏫"
  ];

  const mimoNotes = [
    "Mi amor, eres la casualidad más bonita que me ha pasado en la vida. Gracias por hacerme tan feliz. ❤️ - Tu Inge",
    "Paso por aquí para recordarte que estoy súper orgulloso de ti. Eres una profesora increíblemente dedicada e inteligente. 👩‍🏫✨",
    "¿Un secreto? No importa lo difícil que sea el día, saber que tengo tu amor me hace sentir el ingeniero más afortunado del universo. 🛠️❤️",
    "Un vale por: Una cena deliciosa preparada por tu inge lindo + muchos besitos en la frente. (Válido para cobrar hoy mismo). 😉🍲",
    "Te amo no solo por lo hermosa que eres, sino por la paz y felicidad que le das a mi vida todos los días. Eres mi lugar seguro. 🌸",
    "Si te sientes cansadita por las clases, cierra los ojos un segundo: imagina que te estoy abrazando fuerte y te doy un besito. ¡Tú puedes, mi reina! 💕",
    "¡Alerta de piropo! Definición de perfección: Eres tú explicando clases a tus niños con esa dedicación tan bonita. 😍👩‍🏫",
    "P.D: Te amo más de lo que los programadores aman el café, y mira que eso es muchísimo... ☕❤️",
    "No te olvides de comprarle alguito a tu inge hermoso con tus ahorros... o mejor, ¡vamos juntos y yo te invito todo! 😉✨",
    "Eres el código más perfecto que el universo ha escrito. Te amo con locura. 💻❤️",
    "Un recordatorio rápido: eres increíble, eres capaz de todo y tu inge te adora con todo el alma. ¡Que tengas un día grandioso! 🌟",
    "Vale por: Una tarde entera de masajes y arrurrucos sin interrupciones. ¡Te lo has ganado por ser tan juiciosa! 🥰🛌",
    "Si la escuela de la vida tuviera calificaciones, tú tendrías un 10 definitivo en belleza, inteligencia y ternura. 😍💯",
    "Me encantas en todas tus variables y funciones, mi profe hermosa. Eres mi constante favorita en la vida. 🛠️📊",
    "Cuando te veo sonreír, siento que todos mis problemas de ingeniería se resuelven solos. Eres pura magia. ✨❤️",
    "Gracias por apoyarme, por comprenderme y por estar siempre a mi lado. Eres la mejor compañera de vida que pude desear. 💕",
    "Hoy te amo más que ayer, pero menos que mañana. Y mira que ayer te amaba a niveles incalculables... 😉💖",
    "Un vale por: Un helado gigante y una caminata de la mano hablando de cualquier tontería que nos haga reír. 🍦🍁",
    "Eres el sol que calienta mis días de otoño. Gracias por ser tan dulce y cariñosa conmigo, mi reina. 🍂🌻",
    "Te amo en mayúsculas, en minúsculas, en cursiva y en negrita. En todos los formatos posibles, mi amor. 😍📝",
    "Paso por aquí para recordarte que me encantas demasiado. Eres preciosa, por dentro y por fuera. ¡Nunca lo olvides! 😘🌸",
    "Si necesitas un escape de calificar tareas, escríbeme: tu inge siempre está disponible para robarte una sonrisa. 💻📞",
    "Ahorrar es genial, pero gastar tiempo a tu lado es la mejor inversión de mi vida. Te amo con locura. ❤️📈",
    "Eres la melodía más bonita en mi día a día. Gracias por existir y por ser mi novia hermosa. 💕🎶",
    "Un besito volador directo a tu mejilla para recordarte que te amo y que estoy contando las horas para verte. 😘⏰",
    "Eres mi prioridad número uno, hoy y todos los días de mi vida. Gracias por llenar mi mundo de colores cálidos. 🍁❤️",
    "¡Hola, mi reina! Tu inge te manda un abrazo de oso de esos que recargan la batería al 100%. ¡A comerse el mundo hoy! 🐻💪"
  ];

  useEffect(() => {
    const randomGreeting = welcomeGreetings[Math.floor(Math.random() * welcomeGreetings.length)];
    setWelcomeGreeting(randomGreeting);

    const loadFromCloud = async () => {
      try {
        const res = await fetch('/api/finances');
        if (res.ok) {
          const data = await res.json();
          if (data && data.warning) {
            setSyncStatus('local');
            setSyncError('');
          } else {
            setSyncStatus('synced');
            setSyncError('');
            if (data && (data.incomes || data.expenses || data.investments)) {
              const localSaved = localStorage.getItem(localStorageKey);
              const localObj = localSaved ? JSON.parse(localSaved) : null;
              const localTime = localObj?.updatedAt || 0;
              const cloudTime = data.updatedAt || 0;

              // Only update local state if the cloud state is strictly newer
              if (cloudTime > localTime) {
                setRawFinancialData(data);
                localStorage.setItem(localStorageKey, JSON.stringify(data));
              }
            }
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          setSyncError(errData.error || `HTTP ${res.status}`);
          setSyncStatus('error');
        }
      } catch (e) {
        console.warn("Could not load from Vercel KV cloud", e);
        setSyncError(e.message);
        setSyncStatus('error');
      }
    };
    loadFromCloud();
  }, []);

  const handleOpenMimo = () => {
    const randomNote = mimoNotes[Math.floor(Math.random() * mimoNotes.length)];
    setCurrentMimoNote(randomNote);
    setShowMimoModal(true);
  };

  const handleNewMimo = () => {
    let randomNote = mimoNotes[Math.floor(Math.random() * mimoNotes.length)];
    while (randomNote === currentMimoNote && mimoNotes.length > 1) {
      randomNote = mimoNotes[Math.floor(Math.random() * mimoNotes.length)];
    }
    setCurrentMimoNote(randomNote);
  };

  // Floating custom toast alert state
  const [activeAlert, setActiveAlert] = useState({
    show: false,
    message: '',
    type: 'info' // 'income' or 'expense'
  });

  const localStorageKey = 'finances_may_data';

  // Initial State tailored for May (Teacher & Autumn Theme)
  const [financialData, setRawFinancialData] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    let parsedData = null;
    if (saved) {
      try {
        parsedData = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved financial data", e);
      }
    }

    const defaultData = {
      incomes: [
        { id: 1, description: 'Sueldo Docencia Colegio', amount: 3500000, category: 'Sueldo', date: '2026-08-05' }
      ],
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
      ],
      config: {
        monthlyBudget: 3500000,
        cycleStartDay: 1
      },
      updatedAt: 1
    };

    if (!parsedData) return defaultData;

    // Migrate old data missing config field
    if (!parsedData.config) {
      parsedData.config = {
        monthlyBudget: 3500000,
        cycleStartDay: 1
      };
    }
    return parsedData;
  });

  const setFinancialData = (updater) => {
    setRawFinancialData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (!next) return prev;
      return {
        ...next,
        updatedAt: Date.now()
      };
    });
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(financialData));

    // Asynchronously push updates to Vercel KV database
    const saveToCloud = async () => {
      try {
        const res = await fetch('/api/finances', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(financialData)
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.warning) {
            setSyncStatus('local');
            setSyncError('');
          } else {
            setSyncStatus('synced');
            setSyncError('');
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          setSyncError(errData.error || `HTTP ${res.status}`);
          setSyncStatus('error');
        }
      } catch (e) {
        console.warn("Could not save to Vercel KV cloud", e);
        setSyncError(e.message);
        setSyncStatus('error');
      }
    };
    saveToCloud();
  }, [financialData]);

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
        "Todo bajo control, mi profe favorita. 👩‍🏫",
        "¡Me parece muy bien consentirse! Para eso se trabaja duro, mi vida. 💕",
        "Menos de un millón, vamos volando como avioncito de papel. ✈️",
        "Un gasto chiquito, como un mimo en el alma. ❤️"
      ];
      return list[Math.floor(Math.random() * list.length)];
    } else if (newTotal >= 1000000 && newTotal < 2000000) {
      const list = [
        "Upa, más gastos... pero te lo mereces, preciosa. 😘",
        "¡Cuidado con la billetera! Pero bueno, la vida es una sola. 🍁",
        "La economía está temblando un poquito, mi amor. 💸",
        "Ayayay, ¡que no se nos vaya la mano con los marcadores de colores! 🎨",
        "Un gustito de los buenos. ¡Te amo, mi compradora estrella! 🛍️"
      ];
      return list[Math.floor(Math.random() * list.length)];
    } else if (newTotal >= 2000000 && newTotal < 3000000) {
      const list = [
        "¡Epa! Ese carrito de compras va lleno. ¿Todo es para el colegio? 🏫",
        "Alguien está gastando como si el inge fuera millonario... mentiras, mi amor, ¡disfruta! 😂",
        "¡Alerta naranja! El presupuesto escolar está bajando. ⚠️",
        "Mi amor, las tizas se están gastando rápido. ¿Hacemos junta presupuestal? ☕",
        "¡Ojo al charco! Pasamos los dos millones. ¡A respirar hondo! 🧘‍♀️"
      ];
      return list[Math.floor(Math.random() * list.length)];
    } else {
      const list = [
        "¡DIOS MÍO, PARTE EL LÁPIZ! 🛑 ¡Llegamos a zona de tarjeta roja de gastos!",
        "Mi amor... ¿compraste un salón de clases entero o qué pasó aquí? 😱",
        "¡Emergencia financiera! Reportarse con el inge para un rescate económico inmediato. 🚨❤️",
        "¡Auxilio! El boletín de notas está en números rojos. ¡Un abrazo de contención! 🫂",
        "¡Mi amor, nos excedimos! Pero no te preocupes, el inge te consiente y te respalda siempre. 💕"
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
      "¡Felicidades, mi amor! Tu esfuerzo siempre da frutos. Te amo. ❤️",
      "¡Eso, mi profe preciosa! Dinero bien ganado en las aulas. ¡A celebrar! 🎉",
      "¡Lluvia de billetes! Te mereces todo el éxito del universo, hermosa. 🌟"
    ];
    return list[Math.floor(Math.random() * list.length)];
  };

  // Handlers for Incomes
  const handleAddIncome = (newIncome) => {
    const incomeWithId = {
      ...newIncome,
      id: Date.now()
    };
    
    const transaction = {
      id: Date.now() + 1,
      description: newIncome.description,
      amount: newIncome.amount,
      category: newIncome.category,
      type: 'income',
      date: newIncome.date
    };

    setFinancialData((prev) => ({
      ...prev,
      incomes: [incomeWithId, ...prev.incomes],
      transactions: [transaction, ...prev.transactions]
    }));

    triggerToastAlert(getIncomeMessage(), 'income');
  };

  const handleDeleteIncome = (id) => {
    setFinancialData((prev) => {
      const incomeToDelete = prev.incomes.find(inc => inc.id === id);
      const filteredIncomes = prev.incomes.filter((inc) => inc.id !== id);
      
      const filteredTransactions = prev.transactions.filter(
        (t) => !(t.description === incomeToDelete?.description && t.amount === incomeToDelete?.amount)
      );

      return {
        ...prev,
        incomes: filteredIncomes,
        transactions: filteredTransactions
      };
    });
  };

  const handleDeleteTransaction = (id) => {
    setFinancialData((prev) => {
      const tx = prev.transactions.find(t => t.id === id);
      if (!tx) return prev;

      const filteredTransactions = prev.transactions.filter(t => t.id !== id);
      
      let updatedExpenses = prev.expenses;
      let updatedIncomes = prev.incomes;

      if (tx.type === 'expense') {
        updatedExpenses = prev.expenses.filter(
          exp => !(exp.description === tx.description && exp.amount === tx.amount)
        );
      } else if (tx.type === 'income') {
        updatedIncomes = prev.incomes.filter(
          inc => !(inc.description === tx.description && inc.amount === tx.amount)
        );
      }

      return {
        ...prev,
        transactions: filteredTransactions,
        expenses: updatedExpenses,
        incomes: updatedIncomes
      };
    });
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

    setFinancialData((prev) => ({
      ...prev,
      expenses: [expenseWithId, ...prev.expenses],
      transactions: [transaction, ...prev.transactions]
    }));

    const currentTotal = financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const newTotal = currentTotal + newExpense.amount;
    triggerToastAlert(getExpenseMessage(newTotal), 'expense');
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
  const handleToggleObligation = (id, isMarkingPaid) => {
    const obligation = financialData.obligations.find(ob => ob.id === id);
    if (!obligation) return;

    setFinancialData((prev) => {
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

    if (isMarkingPaid) {
      const currentTotal = financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const newTotal = currentTotal + obligation.amount;
      triggerToastAlert(getExpenseMessage(newTotal), 'expense');
    }
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
      } else if (mock.type === 'income') {
        const newIncome = {
          id: newId + 2,
          description: mock.desc,
          amount: mock.amount,
          category: mock.category,
          date: newTransaction.date
        };

        return {
          ...prev,
          incomes: [newIncome, ...prev.incomes],
          transactions: updatedTransactions
        };
      }

      return {
        ...prev,
        expenses: updatedExpenses,
        transactions: updatedTransactions
      };
    });

    // Trigger alerts OUTSIDE of the setState callback
    if (mock.type === 'expense') {
      const currentTotal = financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const newTotal = currentTotal + mock.amount;
      triggerToastAlert(getExpenseMessage(newTotal), 'expense');
    } else if (mock.type === 'income') {
      triggerToastAlert(getIncomeMessage(), 'income');
    }
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

  const handleClearData = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar todos los datos de demostración para iniciar en limpio con tus valores reales? Esto vaciará tus registros e inversiones actuales.")) {
      setFinancialData({
        incomes: [],
        expenses: [],
        investments: [],
        transactions: [],
        obligations: []
      });
      triggerToastAlert("Boletín escolar restablecido. ¡Listo para tus datos reales! 👩‍🏫✨", "info");
    }
  };

  const config = financialData.config || { monthlyBudget: 3500000, cycleStartDay: 1 };

  const getPeriodRange = (startDay) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    let startYear = year;
    let startMonth = month;

    if (day < startDay) {
      startMonth = month - 1;
    }

    const startDate = new Date(startYear, startMonth, startDay);
    const endDate = new Date(startYear, startMonth + 1, startDay - 1, 23, 59, 59);

    return { startDate, endDate };
  };

  const { startDate, endDate } = getPeriodRange(config.cycleStartDay);

  const isInCurrentPeriod = (dateStr) => {
    if (!dateStr) return false;
    const txDate = new Date(dateStr + 'T00:00:00');
    return txDate >= startDate && txDate <= endDate;
  };

  // Filter lists for current period
  const currentIncomes = (financialData.incomes || []).filter(inc => isInCurrentPeriod(inc.date));
  const currentExpenses = (financialData.expenses || []).filter(exp => isInCurrentPeriod(exp.date));
  const currentTransactions = (financialData.transactions || []).filter(tx => isInCurrentPeriod(tx.date));

  const totalIncome = currentIncomes.reduce((sum, inc) => sum + inc.amount, 0);
  const financialDataWithTotals = {
    ...financialData,
    incomes: currentIncomes,
    expenses: currentExpenses,
    transactions: currentTransactions,
    income: totalIncome
  };

  const getHistoricalPeriods = () => {
    const periodsMap = {};
    const txs = financialData.transactions || [];
    const startDay = config.cycleStartDay;

    txs.forEach(tx => {
      const parts = tx.date.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      let pYear = year;
      let pMonth = month;

      if (day < startDay) {
        const prev = new Date(year, month - 1, 1);
        pYear = prev.getFullYear();
        pMonth = prev.getMonth();
      }

      const pKey = `${pYear}-${String(pMonth + 1).padStart(2, '0')}`;
      
      if (!periodsMap[pKey]) {
        const pStartDate = new Date(pYear, pMonth, startDay);
        const pEndDate = new Date(pYear, pMonth + 1, startDay - 1);
        
        const opt = { day: '2-digit', month: 'short' };
        const label = `${pStartDate.toLocaleDateString('es-ES', opt)} - ${pEndDate.toLocaleDateString('es-ES', opt)}`;
        const name = pStartDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

        periodsMap[pKey] = {
          key: pKey,
          label,
          name: capitalizedName,
          incomes: 0,
          expenses: 0,
          transactions: []
        };
      }

      if (tx.type === 'income') {
        periodsMap[pKey].incomes += tx.amount;
      } else {
        periodsMap[pKey].expenses += tx.amount;
      }
      periodsMap[pKey].transactions.push(tx);
    });

    return Object.values(periodsMap).sort((a, b) => b.key.localeCompare(a.key));
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '$ 0';
    const isNegative = val < 0;
    const absVal = Math.round(Math.abs(val));
    const formatted = absVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${isNegative ? '-' : ''}$ ${formatted}`;
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
            financialData={financialDataWithTotals} 
            simulateBankSync={handleSimulateBankSync}
            exportData={handleExportData}
            onDeleteTransaction={handleDeleteTransaction}
            clearData={handleClearData}
            syncStatus={syncStatus}
            syncError={syncError}
            config={config}
          />
        )}
        
        {activeTab === 'expenses' && (
          <ExpensesTracker 
            expenses={financialDataWithTotals.expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            incomes={financialDataWithTotals.incomes}
            onAddIncome={handleAddIncome}
            onDeleteIncome={handleDeleteIncome}
            obligations={financialData.obligations}
            onToggleObligation={handleToggleObligation}
            onAddObligation={handleAddObligation}
            onDeleteObligation={handleDeleteObligation}
            config={config}
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

        {activeTab === 'history' && (
          <div className="tab-pane active">
            <div className="top-header">
              <div className="header-title-area">
                <h1>Historial de Cierres de May</h1>
                <p>Consulta el rendimiento escolar de tus meses anteriores y ahorros. 🍎🍂</p>
              </div>
            </div>

            <div className="glass-card">
              <div className="table-container">
                {getHistoricalPeriods().length === 0 ? (
                  <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No hay suficientes anotaciones registradas en el cuaderno para armar un histórico mensual.
                  </p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Período</th>
                        <th>Rango de Fechas</th>
                        <th>Ingresos (Colegio)</th>
                        <th>Gastos Escolares</th>
                        <th>Ahorro Neto</th>
                        <th>Presupuesto Pactado</th>
                        <th>Desempeño</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getHistoricalPeriods().map((period) => {
                        const netSavings = period.incomes - period.expenses;
                        const isExceeded = period.expenses > (config.monthlyBudget);
                        return (
                          <tr key={period.key}>
                            <td style={{ fontWeight: 700 }}>{period.name}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{period.label}</td>
                            <td className="text-emerald">{formatCurrency(period.incomes)}</td>
                            <td className="text-rose">{formatCurrency(period.expenses)}</td>
                            <td className={netSavings >= 0 ? 'text-emerald' : 'text-rose'} style={{ fontWeight: 700 }}>
                              {formatCurrency(netSavings)}
                            </td>
                            <td>{formatCurrency(config.monthlyBudget)}</td>
                            <td>
                              <span className={`badge ${isExceeded ? 'text-rose' : 'text-emerald'}`} style={{ background: isExceeded ? 'rgba(230, 57, 70, 0.12)' : 'rgba(129, 178, 154, 0.12)' }}>
                                {isExceeded ? "Excedido 🛑" : "Cumplido 🍎"}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                                onClick={() => {
                                  setSelectedHistoryPeriod(period);
                                  setShowHistoryModal(true);
                                }}
                              >
                                Ver Tareas
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Modal para ver detalles del periodo seleccionado */}
            {showHistoryModal && selectedHistoryPeriod && (
              <div className="modal-overlay" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3000,
                backdropFilter: 'blur(5px)'
              }}>
                <div className="glass-card" style={{
                  width: '90%',
                  maxWidth: '650px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                    <div>
                      <h2 style={{ margin: 0 }}>Anotaciones del Período</h2>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedHistoryPeriod.name} ({selectedHistoryPeriod.label})</p>
                    </div>
                    <button 
                      onClick={() => setShowHistoryModal(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ingresos</span>
                      <div className="text-emerald" style={{ fontWeight: 800, fontSize: '1.25rem' }}>{formatCurrency(selectedHistoryPeriod.incomes)}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gastos</span>
                      <div className="text-rose" style={{ fontWeight: 800, fontSize: '1.25rem' }}>{formatCurrency(selectedHistoryPeriod.expenses)}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ahorro Neto</span>
                      <div className={selectedHistoryPeriod.incomes - selectedHistoryPeriod.expenses >= 0 ? 'text-emerald' : 'text-rose'} style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                        {formatCurrency(selectedHistoryPeriod.incomes - selectedHistoryPeriod.expenses)}
                      </div>
                    </div>
                  </div>

                  <h3>Desglose de Movimientos</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedHistoryPeriod.transactions.map((tx) => {
                      const isExpense = tx.type === 'expense';
                      return (
                        <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{tx.description}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.category} • {tx.date}</div>
                          </div>
                          <div className={isExpense ? 'text-rose' : 'text-emerald'} style={{ fontWeight: 700 }}>
                            {isExpense ? '-' : '+'}{formatCurrency(tx.amount)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'config' && (
          <div className="tab-pane active">
            <div className="top-header">
              <div className="header-title-area">
                <h1>Configuración del Diario de May</h1>
                <p>Personaliza tu presupuesto mensual del salón y fija los días de inicio de ciclo. 🛠️🍂</p>
              </div>
            </div>
            
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-purple)' }}>Parámetros de Ciclo</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const budgetInput = document.getElementById('cfg-budget').value;
                const cycleInput = parseInt(document.getElementById('cfg-cycle-day').value, 10);
                const cleanBudget = parseFloat(budgetInput.replace(/\./g, '')) || 0;
                
                setFinancialData(prev => ({
                  ...prev,
                  config: {
                    monthlyBudget: cleanBudget,
                    cycleStartDay: cycleInput
                  }
                }));
                triggerToastAlert("Ajustes del diario guardados con éxito. 🍎✨", "info");
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                    Presupuesto Mensual / Sueldo Base (COP)
                  </label>
                  <input 
                    id="cfg-budget"
                    type="text"
                    defaultValue={formatCurrency(config.monthlyBudget).replace('$ ', '')}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '');
                      e.target.value = clean.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                    Día de Inicio de Ciclo
                  </label>
                  <select 
                    id="cfg-cycle-day"
                    defaultValue={config.cycleStartDay}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  >
                    {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day} style={{ background: '#1c0e07', color: 'var(--text-primary)' }}>
                        Día {day} de cada mes
                      </option>
                    ))}
                  </select>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Tus gastos e ingresos se agruparán en ciclos automáticos desde el día {config.cycleStartDay} de un mes hasta el día {config.cycleStartDay === 1 ? '30/31' : config.cycleStartDay - 1} del mes siguiente.
                  </p>
                </div>

                <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                  Guardar Cambios del Cuaderno
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Floating Mimo del Inge heart button */}
      <button 
        className="floating-mimo-btn"
        onClick={handleOpenMimo}
        title="Un Mimo del Inge"
      >
        <Heart size={16} fill="#120904" />
        <span>Mimos del Inge</span>
      </button>

      {/* Romantic Welcome Modal */}
      {showWelcomeModal && welcomeGreeting && (
        <div className="romantic-modal-overlay">
          <div className="romantic-modal-card">
            <div className="romantic-modal-heart">❤️</div>
            <h3>¡Hola, mi hermosa profe!</h3>
            <p className="romantic-modal-greeting">{welcomeGreeting}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowWelcomeModal(false)}
              style={{ width: '100%', marginTop: '1.25rem' }}
            >
              Empezar mi día con amor 🥰
            </button>
          </div>
        </div>
      )}

      {/* Mimo Modal (Notebook page) */}
      {showMimoModal && (
        <div className="romantic-modal-overlay" onClick={() => setShowMimoModal(false)}>
          <div className="romantic-mimo-card" onClick={(e) => e.stopPropagation()}>
            <div className="romantic-mimo-notebook-header">
              <span className="notebook-spiral">✏️</span>
              <span className="notebook-title">Mimos de tu Inge Hermoso</span>
              <button className="notebook-close" onClick={() => setShowMimoModal(false)}>×</button>
            </div>
            <div className="romantic-mimo-notebook-body">
              <p className="romantic-mimo-text">{currentMimoNote}</p>
              <div className="romantic-mimo-signature">
                Te ama con todo el corazón,<br />
                <strong>Tu Inge Hermoso 🛠️❤️</strong>
              </div>
            </div>
            <button 
              type="button"
              className="btn btn-secondary" 
              onClick={handleNewMimo}
              style={{ width: '100%', marginTop: '1.25rem', borderColor: '#e07a5f', color: '#c95d3b' }}
            >
              Leer otro mimo ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
          } else {
            setSyncStatus('synced');
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
          setSyncStatus('error');
        }
      } catch (e) {
        console.warn("Could not load from Vercel KV cloud", e);
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
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved financial data", e);
      }
    }
    return {
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
      updatedAt: 1
    };
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
          } else {
            setSyncStatus('synced');
          }
        } else {
          setSyncStatus('error');
        }
      } catch (e) {
        console.warn("Could not save to Vercel KV cloud", e);
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

  const totalIncome = (financialData.incomes || []).reduce((sum, inc) => sum + inc.amount, 0);
  const financialDataWithTotals = {
    ...financialData,
    income: totalIncome
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
          />
        )}
        
        {activeTab === 'expenses' && (
          <ExpensesTracker 
            expenses={financialData.expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            incomes={financialData.incomes}
            onAddIncome={handleAddIncome}
            onDeleteIncome={handleDeleteIncome}
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

import React from 'react';
import { BookOpen, CalendarCheck, GraduationCap, LineChart, Heart } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', name: 'Cuaderno de Tareas', icon: BookOpen },
    { id: 'expenses', name: 'Control Asistencia', icon: CalendarCheck },
    { id: 'projections', name: 'Plan de Estudios', icon: LineChart },
    { id: 'investments', name: 'Aula de Ahorro', icon: GraduationCap },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Heart className="text-cyan pulse-heart" size={22} fill="var(--accent-cyan)" />
        <span className="sidebar-logo-text">MayWealth</span>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
      
      <div className="sidebar-footer">
        <div>Diario de la Profe May v1.0</div>
        <div className="partner-badge">PROFE DE MI CORAZÓN ❤️</div>
      </div>
    </aside>
  );
}

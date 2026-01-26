"use client";
import React from 'react';
import {
    Home,
    Building2,
    Users,
    Settings,
    Calendar,
    DollarSign,
    FileText,
    Mail,
    BarChart2,
    CheckSquare,
    Wrench,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <Home size={20} />, label: 'Dashboard' },
        { icon: <Building2 size={20} />, label: 'Companies', active: true },
        { icon: <Users size={20} />, label: 'Contacts' },
        { icon: <Calendar size={20} />, label: 'Calendar' },
        { icon: <DollarSign size={20} />, label: 'Sales' },
        { icon: <FileText size={20} />, label: 'Quotes' },
        { icon: <Mail size={20} />, label: 'Emails' },
        { icon: <BarChart2 size={20} />, label: 'Reports' },
        { icon: <CheckSquare size={20} />, label: 'Tasks' },
        { icon: <Wrench size={20} />, label: 'Tools' },
    ];

    return (
        <aside style={{
            width: '60px',
            background: '#1e5d52',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            zIndex: 10
        }}>
            <div style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '24px' }}>L</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '25px', flex: 1 }}>
                {menuItems.map((item, idx) => (
                    <div
                        key={idx}
                        title={item.label}
                        style={{
                            opacity: item.active ? 1 : 0.6,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent'
                        }}
                    >
                        {item.icon}
                    </div>
                ))}
            </nav>
            <div style={{ marginTop: 'auto', opacity: 0.6 }}>
                <ChevronRight size={20} />
            </div>
        </aside>
    );
};

export default Sidebar;

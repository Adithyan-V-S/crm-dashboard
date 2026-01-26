"use client";
import React from 'react';
import { Search, Bell, User, HelpCircle, Menu, Layout } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            height: '60px',
            background: '#fff',
            borderBottom: '1px solid #e1e4e8',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: '20px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button style={{
                    padding: '8px 12px',
                    background: '#f8f9fa',
                    border: '1px solid #e1e4e8',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#1e5d52',
                    fontWeight: '500'
                }}>
                    New <Menu size={16} />
                </button>
                <button style={{ padding: '8px' }}>
                    <Search size={18} color="#666" />
                </button>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search for anything"
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        padding: '10px 15px',
                        borderRadius: '20px',
                        border: '1px solid #e1e4e8',
                        background: '#f8f9fa',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ position: 'relative' }}>
                    <Bell size={20} color="#666" />
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#d32f2f',
                        color: '#fff',
                        fontSize: '10px',
                        padding: '2px 5px',
                        borderRadius: '10px'
                    }}>3</span>
                </div>
                <User size={20} color="#666" />
                <Menu size={20} color="#666" />
                <span style={{ color: '#666', fontSize: '14px' }}>Help</span>
                <Layout size={20} color="#666" />
            </div>
        </header>
    );
};

export default Header;

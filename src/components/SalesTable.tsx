"use client";
import React, { useEffect, useState } from 'react';
import { RefreshCw, Plus, Trash2, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface Lead {
    _id: string;
    saleName: string;
    status: 'Open' | 'Lost' | 'Sold' | 'Stalled';
    saleDate: string;
    amount: number;
    stage: string;
    nextActivityDate: string;
}

const SalesTable = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState('Sales');

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/leads?page=${page}&limit=5`);
            const data = await res.json();
            setLeads(data.leads || []);
            setTotalPages(data.pagination?.pages || 1);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'Sales') {
            fetchLeads();
        }
    }, [page, refreshTrigger, activeTab]);

    const getStatusBadgeClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'open': return 'badge-open';
            case 'sold': return 'badge-sold';
            case 'lost': return 'badge-lost';
            case 'stalled': return 'badge-stalled';
            default: return '';
        }
    };

    return (
        <div className="card" style={{ marginTop: '20px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
                {['Activities', 'Contacts', 'Projects', 'Sales', 'Requests'].map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 20px',
                            fontSize: '14px',
                            fontWeight: tab === activeTab ? '600' : '400',
                            borderBottom: tab === activeTab ? '2px solid #1e5d52' : 'none',
                            color: tab === activeTab ? '#1e5d52' : '#666',
                            cursor: 'pointer',
                            background: tab === activeTab ? '#edf7f5' : 'transparent'
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {activeTab === 'Sales' ? (
                <>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                                    <th style={{ padding: '12px', width: '40px' }}><input type="checkbox" /></th>
                                    <th style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Status</th>
                                    <th style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Sale date</th>
                                    <th style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Amount</th>
                                    <th style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Stage</th>
                                    <th style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Next activity</th>
                                    <th style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Sale name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                                ) : leads.length === 0 ? (
                                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>No records found.</td></tr>
                                ) : leads.map((lead) => (
                                    <tr key={lead._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '12px' }}><input type="checkbox" /></td>
                                        <td style={{ padding: '12px' }}>
                                            <span className={`badge ${getStatusBadgeClass(lead.status)}`}>
                                                {lead.status === 'Open' ? `€ ${lead.status}` : lead.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>{new Date(lead.saleDate).toLocaleDateString()}</td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>{lead.amount.toLocaleString()} .00</td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>{lead.stage}</td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>{new Date(lead.nextActivityDate).toLocaleDateString()}</td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>{lead.saleName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#666' }}>
                                <Trash2 size={16} /> Delete
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#666' }}>
                                <Filter size={16} /> Filter
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#666' }}>
                                <Download size={16} /> Export
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    style={{ padding: '5px', border: '1px solid #eee', borderRadius: '4px', opacity: page === 1 ? 0.5 : 1 }}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    style={{ padding: '5px', border: '1px solid #eee', borderRadius: '4px', opacity: page === totalPages ? 0.5 : 1 }}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            <button onClick={fetchLeads}><RefreshCw size={16} color="#666" /></button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                    <p style={{ fontSize: '16px', fontWeight: '500' }}>{activeTab} Content</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>Displaying content for the {activeTab} section.</p>
                </div>
            )}
        </div>
    );
};

export default SalesTable;

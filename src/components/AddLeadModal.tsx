"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const AddLeadModal = ({ onClose, onSuccess }: Props) => {
    const [formData, setFormData] = useState({
        saleName: '',
        status: 'Open',
        amount: '',
        stage: '',
        nextActivityDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount)
                })
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to add lead. Please check your connection.');
            }
        } catch (err) {
            console.error('Failed to add lead:', err);
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px' }}>Add New Lead</h2>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {error && (
                        <div style={{ padding: '10px', background: '#ffebee', color: '#d32f2f', borderRadius: '4px', fontSize: '13px' }}>
                            {error}
                        </div>
                    )}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Sale Name *</label>
                        <input
                            required
                            className="input"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            value={formData.saleName}
                            onChange={e => setFormData({ ...formData, saleName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Status</label>
                        <select
                            className="input"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                        >
                            <option value="Open">Open</option>
                            <option value="Lost">Lost</option>
                            <option value="Sold">Sold</option>
                            <option value="Stalled">Stalled</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Amount (€) *</label>
                        <input
                            required
                            type="number"
                            className="input"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Stage *</label>
                        <input
                            required
                            placeholder="e.g. Proposal (60%)"
                            className="input"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            value={formData.stage}
                            onChange={e => setFormData({ ...formData, stage: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Next Activity Date *</label>
                        <input
                            required
                            type="date"
                            className="input"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                            value={formData.nextActivityDate}
                            onChange={e => setFormData({ ...formData, nextActivityDate: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '4px', background: '#eee' }}>Cancel</button>
                        <button type="submit" disabled={loading} style={{ padding: '10px 20px', borderRadius: '4px', background: '#1e5d52', color: '#fff' }}>
                            {loading ? 'Adding...' : 'Add Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;

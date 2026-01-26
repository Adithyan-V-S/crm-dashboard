"use client";
import React, { useState } from 'react';
import {
  Star,
  Edit3,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  Building,
  Hash,
  Info,
  DollarSign,
  Calendar,
  FileText
} from 'lucide-react';
import SalesTable from '@/components/SalesTable';
import AddLeadModal from '@/components/AddLeadModal';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Company Header */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#e8f0fe',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a73e8'
              }}>
                <Building size={32} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>SuperCompany Ltd ASA</h1>
                  <Star size={20} color="#ffb400" />
                </div>
                <p style={{ color: '#666', fontSize: '14px' }}>Department Stockholm</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '8px', background: 'var(--accent)', borderRadius: '50%', color: '#fff' }}><Edit3 size={18} /></button>
              <button style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '50%' }}><MoreHorizontal size={18} /></button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            {['Company', 'More', 'Interest', 'Note', 'Market data', 'Misc'].map((t, i) => (
              <span key={i} style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                background: t === 'Company' ? '#edf7f5' : 'transparent',
                color: t === 'Company' ? '#1e5d52' : '#666',
                border: t === 'Company' ? '1px solid #1e5d52' : 'none',
                cursor: 'pointer'
              }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InfoItem icon={<MapPin size={16} />} label="Postal" value="Västgötagatan 5, 102 61 Stock.." link />
              <InfoItem icon={<Globe size={16} />} label="Country" value="Sweden" />
              <InfoItem icon={<Phone size={16} />} label="Phone" value="+46 800 193 2820 Main" link />
              <InfoItem icon={<Globe size={16} />} label="Webbadress" value="info@sc.se" link />
              <InfoItem icon={<Mail size={16} />} label="E-mail" value="www.sc.se" link />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InfoItem icon={<User size={16} />} label="Category" value="Customer A" />
              <InfoItem icon={<Hash size={16} />} label="Code" value="SUPERCO" />
              <InfoItem icon={<Hash size={16} />} label="Number" value="2002" />
              <InfoItem icon={<Hash size={16} />} label="VAT No." value="SE123456789" />
              <InfoItem icon={<Briefcase size={16} />} label="Business" value="IT" />
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <label style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked readOnly /> Stop
              </label>
              <label style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" /> No mailings
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '12px', color: '#999' }}>Updated: 18/09/2023 OG</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button style={{ padding: '2px', border: '1px solid #eee', borderRadius: '4px' }}><ChevronLeft size={16} /></button>
                <button style={{ padding: '2px', border: '1px solid #eee', borderRadius: '4px' }}><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent)',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              <Plus size={20} /> Add
            </button>
          </div>
          <SalesTable refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Info size={16} color="#666" />
              <DollarSign size={16} color="#666" />
              <Calendar size={16} color="#666" />
              <FileText size={16} color="#666" />
            </div>
            <ChevronRight size={16} color="#666" />
          </div>
          <p style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', marginBottom: '10px' }}>Preview</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{ width: '32px', height: '32px', background: '#e3f2fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1976d2' }}>
              <DollarSign size={16} />
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a73e8' }}>45 Components - RTS</p>
              <p style={{ fontSize: '13px', color: '#666' }}>17 344 EUR</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <PreviewRow label="Company" value="SuperCompany Ltd ASA" link />
            <PreviewRow label="Contact" value="Peter Elliot" link />
            <PreviewRow label="Sale date" value="01/02/2025" />
            <PreviewRow label="Owner" value="Eric Davies" />
            <PreviewRow label="Sale type" value="Cross-sale to existing customer..." />
            <PreviewRow label="Status" value="Open (20%)" />
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Activities</p>
            <ActivityItem date="04/11/2024" label="Follow-up call" />
            <ActivityItem date="01/11/2024" label="Quote for 45 components..." />
            <ActivityItem date="23/09/2024" label="Prospect meeting" />
            <ActivityItem date="22/09/2024" label="Introduction call" />
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Stakeholders</p>
            <p style={{ fontSize: '13px', color: '#666' }}>James Vargas</p>
            <p style={{ fontSize: '13px', color: '#666' }}>Lisa Jansson</p>
          </div>
        </div>
      </div>

      {isModalOpen && <AddLeadModal onClose={() => setIsModalOpen(false)} onSuccess={handleSuccess} />}
    </div>
  );
}

const InfoItem = ({ icon, label, value, link = false }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '14px' }}>
    <div style={{ width: '100px', flexShrink: 0, color: '#666' }}>{label}:</div>
    <div style={{ color: link ? '#1a73e8' : '#333', textDecoration: link ? 'none' : 'none' }}>{value}</div>
  </div>
);

const PreviewRow = ({ label, value, link = false }: any) => (
  <div style={{ display: 'flex', fontSize: '12px' }}>
    <div style={{ width: '80px', color: '#999' }}>{label}:</div>
    <div style={{ color: link ? '#1a73e8' : '#333', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
  </div>
);

const ActivityItem = ({ date, label }: any) => (
  <div style={{ display: 'flex', gap: '10px', fontSize: '12px', marginBottom: '8px' }}>
    <span style={{ color: '#999', width: '70px' }}>{date}</span>
    <span style={{ color: '#1a73e8' }}>{label}</span>
  </div>
);

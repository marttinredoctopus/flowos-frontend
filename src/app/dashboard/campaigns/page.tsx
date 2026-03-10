'use client';
import { useState } from 'react';

const CAMPAIGNS = [
  { name: 'Ramadan 2026', platform: 'Meta', budget: 5000, status: 'active', reach: '42K' },
  { name: 'Summer Launch', platform: 'Google', budget: 3000, status: 'planned', reach: '—' },
  { name: 'Brand Awareness Q1', platform: 'TikTok', budget: 2000, status: 'completed', reach: '120K' },
];
const STATUS_C: Record<string,string> = { active:'bg-green-500/20 text-green-400', planned:'bg-yellow-500/20 text-yellow-400', completed:'bg-blue-500/20 text-blue-400', paused:'bg-red-500/20 text-red-400' };

export default function CampaignsPage() {
  const [campaigns] = useState(CAMPAIGNS);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-2xl font-bold text-white">Ad Campaigns</h1><p className="text-slate-400 text-sm mt-1">{campaigns.length} campaigns</p></div>
        <button className="px-4 py-2 gradient-bg rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">+ New Campaign</button>
      </div>
      <div className="bg-[#0f1117] border border-white/5 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 px-5 py-3 border-b border-white/5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
          {['Campaign','Platform','Budget','Reach','Status'].map(h => <div key={h}>{h}</div>)}
        </div>
        {campaigns.map((c,i) => (
          <div key={i} className={`grid grid-cols-5 items-center px-5 py-4 hover:bg-white/5 transition ${i ? 'border-t border-white/5' : ''}`}>
            <p className="text-sm font-medium text-white">{c.name}</p>
            <p className="text-sm text-slate-400">{c.platform}</p>
            <p className="text-sm text-white font-mono">${c.budget.toLocaleString()}</p>
            <p className="text-sm text-slate-400">{c.reach}</p>
            <span className={`text-xs px-2.5 py-1 rounded-full w-fit font-medium ${STATUS_C[c.status]}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

const SHOOTS = [
  { title: 'Product Photography - Collection 2026', date: 'Mar 12, 9:00 AM', location: 'Studio A', crew: 3, status: 'confirmed' },
  { title: 'Brand Video - Homepage Hero', date: 'Mar 18, 8:00 AM', location: 'Outdoor - Cairo', crew: 6, status: 'planned' },
  { title: 'Testimonial Videos', date: 'Mar 22, 10:00 AM', location: 'Client Office', crew: 2, status: 'planned' },
];
const STATUS_C: Record<string,string> = { confirmed:'bg-green-500/20 text-green-400', planned:'bg-yellow-500/20 text-yellow-400', completed:'bg-blue-500/20 text-blue-400' };

export default function ShootsPage() {
  const [shoots] = useState(SHOOTS);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-2xl font-bold text-white">Shoot Sessions</h1><p className="text-slate-400 text-sm mt-1">{shoots.length} upcoming</p></div>
        <button className="px-4 py-2 gradient-bg rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">+ Book Session</button>
      </div>
      <div className="space-y-4">
        {shoots.map((s, i) => (
          <div key={i} className="bg-[#0f1117] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-slate-400 mt-1">📅 {s.date}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_C[s.status]}`}>{s.status}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>📍 {s.location}</span>
              <span>👥 {s.crew} crew</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

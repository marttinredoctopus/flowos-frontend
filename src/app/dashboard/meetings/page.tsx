'use client';
import { useState } from 'react';

const MEETINGS = [
  { title: 'Weekly Sync', date: 'Today, 3:00 PM', attendees: 5, type: 'Internal' },
  { title: 'Client Review - Red Octopus', date: 'Tomorrow, 11:00 AM', attendees: 3, type: 'Client' },
  { title: 'Q2 Planning', date: 'Mar 15, 2:00 PM', attendees: 8, type: 'Internal' },
];

export default function MeetingsPage() {
  const [meetings] = useState(MEETINGS);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-2xl font-bold text-white">Meetings</h1><p className="text-slate-400 text-sm mt-1">Upcoming meetings</p></div>
        <button className="px-4 py-2 gradient-bg rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">+ Schedule</button>
      </div>
      <div className="space-y-3">
        {meetings.map((m, i) => (
          <div key={i} className="bg-[#0f1117] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition flex items-center gap-5">
            <div className="w-12 h-12 gradient-bg rounded-xl flex-shrink-0 flex items-center justify-center text-xl">🎥</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white">{m.title}</p>
              <p className="text-sm text-slate-400 mt-0.5">{m.date} · {m.attendees} attendees</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${m.type === 'Client' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>{m.type}</span>
            <button className="px-4 py-2 border border-white/10 rounded-xl text-xs text-slate-400 hover:text-white hover:border-white/20 transition">Join</button>
          </div>
        ))}
      </div>
    </div>
  );
}

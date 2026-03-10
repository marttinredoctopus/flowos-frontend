'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';

export default function ReportsPage() {
  const [data, setData] = useState({ projects: 0, tasks: 0, done: 0, clients: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get('/projects').then(r => r.data).catch(() => []),
      apiClient.get('/tasks').then(r => r.data).catch(() => []),
      apiClient.get('/clients').then(r => r.data).catch(() => []),
    ]).then(([p, t, c]) => {
      setData({ projects: p.length, tasks: t.length, done: t.filter((x:any) => x.status==='done').length, clients: c.length });
    }).finally(() => setLoading(false));
  }, []);

  const completion = data.tasks ? Math.round((data.done / data.tasks) * 100) : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8"><h1 className="font-display text-2xl font-bold text-white">Reports</h1><p className="text-slate-400 text-sm mt-1">Agency performance overview</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Projects', value: data.projects, icon: '📁', color: 'text-brand-blue' },
          { label: 'Total Tasks', value: data.tasks, icon: '✅', color: 'text-brand-purple' },
          { label: 'Completed', value: data.done, icon: '🏆', color: 'text-green-400' },
          { label: 'Clients', value: data.clients, icon: '👥', color: 'text-brand-pink' },
        ].map(s => (
          <div key={s.label} className="bg-[#0f1117] border border-white/5 rounded-2xl p-5">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className={`font-display text-3xl font-bold mb-1 ${s.color}`}>{loading ? '–' : s.value}</div>
            <div className="text-slate-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#0f1117] border border-white/5 rounded-2xl p-6">
        <h2 className="font-display font-semibold mb-5">Task Completion Rate</h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${completion}%` }} />
          </div>
          <span className="font-display text-xl font-bold gradient-text w-14 text-right">{completion}%</span>
        </div>
        <p className="text-slate-500 text-sm">{data.done} of {data.tasks} tasks completed</p>
      </div>
    </div>
  );
}

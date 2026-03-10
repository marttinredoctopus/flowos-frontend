'use client';
import { useState } from 'react';

const INITIAL = [
  { id: 1, title: 'Behind-the-scenes Reels series', tag: 'Reels', color: 'bg-purple-500/20 text-purple-400' },
  { id: 2, title: 'Client success story carousel', tag: 'Carousel', color: 'bg-blue-500/20 text-blue-400' },
  { id: 3, title: 'Team day vlog', tag: 'YouTube', color: 'bg-red-500/20 text-red-400' },
];

export default function IdeasPage() {
  const [ideas, setIdeas] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [tag, setTag] = useState('Idea');

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setIdeas([...ideas, { id: Date.now(), title: input, tag, color: 'bg-green-500/20 text-green-400' }]);
    setInput('');
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8"><h1 className="font-display text-2xl font-bold text-white">Idea Bank</h1><p className="text-slate-400 text-sm mt-1">Capture content ideas before they disappear</p></div>
      <form onSubmit={add} className="flex gap-3 mb-8">
        <input className="flex-1 px-4 py-2.5 bg-[#0f1117] border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-blue/50" placeholder="Write your idea..." value={input} onChange={e => setInput(e.target.value)} />
        <select className="px-3 py-2.5 bg-[#0f1117] border border-white/10 rounded-xl text-white text-sm focus:outline-none" value={tag} onChange={e => setTag(e.target.value)}>
          {['Idea','Reel','Post','Story','Carousel','YouTube','TikTok','Blog'].map(t => <option key={t}>{t}</option>)}
        </select>
        <button type="submit" className="px-5 py-2.5 gradient-bg rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">Add</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map(idea => (
          <div key={idea.id} className="bg-[#0f1117] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${idea.color}`}>{idea.tag}</span>
              <button onClick={() => setIdeas(ideas.filter(i => i.id !== idea.id))} className="text-slate-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100 text-xs">✕</button>
            </div>
            <p className="text-sm text-white leading-relaxed">💡 {idea.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { createClient } from '@/lib/supabaseClient';
import { useState } from 'react';

export default function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState('saulo.lauers@gmail.com');
  const [pwd, setPwd] = useState('');

  async function loginEmail(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    if (error) alert(error.message); else window.location.href = '/';
  }

  async function loginGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) alert(error.message);
  }

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center'}}>
      <div style={{width:360,background:'#fff',padding:16,borderRadius:12,boxShadow:'0 8px 24px rgba(0,0,0,.08)'}}>
        <h1 style={{textAlign:'center',fontWeight:700,marginBottom:12}}>Login</h1>
        <button onClick={loginGoogle} style={{width:'100%',padding:10,border:'1px solid #ddd',borderRadius:8,marginBottom:8}}>Entrar com Google</button>
        <div style={{textAlign:'center',opacity:.6,fontSize:12,margin:'8px 0'}}>ou</div>
        <form onSubmit={loginEmail} style={{display:'grid',gap:8}}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10,border:'1px solid #ddd',borderRadius:8}} />
          <input type="password" placeholder="Senha" value={pwd} onChange={e=>setPwd(e.target.value)} style={{padding:10,border:'1px solid #ddd',borderRadius:8}} />
          <button style={{padding:10,background:'#111',color:'#fff',borderRadius:8}}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

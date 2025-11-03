import { createServerSupabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default async function Home() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div style={{minHeight:'100vh',display:'grid',placeItems:'center',textAlign:'center'}}>
        <div>
          <h1 style={{fontWeight:700,fontSize:24}}>Seu Nome Fitness</h1>
          <p style={{opacity:.7,margin:'8px 0 16px'}}>Faça login para continuar.</p>
          <Link href="/login" style={{textDecoration:'underline'}}>Ir para login</Link>
        </div>
      </div>
    );
  }

  return <div style={{padding:20}}>Logado como: {user.email}</div>;
}

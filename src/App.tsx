import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) throw error;
      
      setStatus('success');
      setMessage('Votre e-mail a bien été enregistré, merci !');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Cet e-mail est déjà enregistré ou un problème s’est produit. Veuillez réessayer.');
      console.error('Erreur :', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-2">Prochainement ...</h1>
          <p className="text-blue-100 mb-8">
            Le site web de YOUSAY Consulting sera bientôt disponible.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Renseignez votre e-mail"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-blue-300/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              <span>Prévenez-moi !</span>
              <Send size={18} />
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-center ${
              status === 'success' ? 'text-green-300' : 'text-red-300'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { MENU_DATA } from '../data';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'gus';
  timestamp: Date;
}

const SUGGESTIONS = [
  "Especiales del día",
  "¿Qué me recomiendas?",
  "El mejor postre",
  "¿Tienen opciones vegetarianas?"
];

const ChatGus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: '¡Hola! Soy Gus 🤖, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      sender: 'gus',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Gus Thinking and Response
    setTimeout(() => {
      const responseText = getGusResponse(text);
      const gusMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'gus',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, gusMsg]);
    }, 600);
  };

  const getGusResponse = (query: string): string => {
    const lower = query.toLowerCase();
    
    if (lower.includes('especiales') || lower.includes('dia') || lower.includes('día')) {
      return "¡Hoy nuestro chef se lució! 👨‍🍳 El especial es la **Pasta Carbonara**. ¡Cremosa y auténtica! 🍝";
    }
    if (lower.includes('recomienda') || lower.includes('sugiere')) {
      return "Si tienes mucha hambre, ¡la **Hamburguesa Gus** es legendaria! 🍔 Si buscas algo más ligero, el **Carpaccio de Res** es excelente. ✨";
    }
    if (lower.includes('postre') || lower.includes('dulce')) {
      return "¡Uy! Mi circuito de dulces dice que el **Cheesecake NY** es imbatible 🍰. Aunque la galleta caliente... ¡uf! 🍪";
    }
    if (lower.includes('vegetariana') || lower.includes('vegan')) {
      return "¡Claro! La **Bruschetta Italiana** es una entrada deliciosa sin carne 🍅. También puedo sugerirte modificar la pasta.";
    }
    if (lower.includes('hola') || lower.includes('buenas')) {
      return "¡Hola hola! 👋 ¿Listo para comer algo rico?";
    }
    if (lower.includes('gracias')) {
      return "¡Con gusto! Aquí estaré si me necesitas. 🤖💙";
    }
    
    return "¡Qué interesante! 🤔 Aún estoy aprendiendo sobre gastronomía humana, pero suena genial. ¿Te gustaría ver el menú de postres?";
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-28 right-5 z-40 size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </button>

      {/* Chat Interface Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center bg-black/20 backdrop-blur-[2px]">
          <div 
            className="bg-surface-light dark:bg-surface-dark w-full sm:max-w-md h-[85vh] sm:h-[600px] sm:rounded-3xl rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-white text-[24px]">smart_toy</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-none">Gus</h3>
                  <p className="text-blue-100 text-xs flex items-center gap-1">
                    <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    En línea
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-black/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-700 text-text-light dark:text-text-dark rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-600'
                    }`}
                  >
                    <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    <span className={`text-[10px] block mt-1 opacity-70 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark overflow-x-auto no-scrollbar flex gap-2 shrink-0">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-primary text-xs font-bold border border-transparent hover:border-primary/30 transition-all active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-sm text-text-light dark:text-text-dark placeholder-slate-400"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="size-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatGus;
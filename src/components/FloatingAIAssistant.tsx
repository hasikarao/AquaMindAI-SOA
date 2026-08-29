import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Droplets, 
  HelpCircle, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { ChatMessage, CitizenProfile } from '../types';
import { initialChatMessages } from '../data/mockData';

interface FloatingAIAssistantProps {
  profile: CitizenProfile;
}

export const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateBotReply = (userQuery: string): { text: string; suggestions?: string[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('when') || q.includes('timing') || q.includes('next supply') || q.includes('kondapur')) {
      return {
        text: `Based on AquaMind's real-time schedule for Ward 104 (Kondapur), your next water supply is scheduled in approximately 2 hours 42 minutes (target window: 06:00 AM - 08:00 AM) with good pressure.`,
        suggestions: [
          'What is the water quality TDS level?',
          'How do I book a water tanker?',
          'How do I report a leakage?',
        ],
      };
    }

    if (q.includes('tds') || q.includes('purity') || q.includes('potable') || q.includes('quality')) {
      return {
        text: `Your current water quality index is Grade-A with a TDS of 135 PPM (Optimal drinking range is 100-300 PPM) and pH of 7.3. The water is filtered and certified safe for domestic use.`,
        suggestions: [
          'When is the next supply?',
          'How do I book a water tanker?',
          'Where is my water supplied from?',
        ],
      };
    }

    if (q.includes('leak') || q.includes('pipe') || q.includes('broken') || q.includes('spill')) {
      return {
        text: `If you see a street leak or pipe burst, go to the 'Report Leakage' tab to upload a photo and location coordinates for quick repair dispatch!`,
        suggestions: [
          'Open Report Leak Form',
          'When is my next water supply?',
          'Check my complaints',
        ],
      };
    }

    if (q.includes('osmansagar') || q.includes('himayatsagar') || q.includes('reservoir') || q.includes('dam')) {
      return {
        text: `Hyderabad's twin reservoirs are in healthy condition! Osmansagar (Gandipet) is at 1,787.8 ft (93.6% capacity) with 1,450 Cusecs monsoon inflow. Himayatsagar is at 1,761.4 ft (91.9% capacity). Storage is sufficient for 280+ days.`,
        suggestions: [
          'View all reservoir charts',
          'Check Singur Dam levels',
          'What is my household water usage?',
        ],
      };
    }

    if (q.includes('rebate') || q.includes('harvesting') || q.includes('bill') || q.includes('tariff')) {
      return {
        text: `With an EcoScore of ${profile.ecoScore}/100, your household in Kondapur qualifies for GHMC's 10% Green Water Conservation Rebate on your monthly water bill. Installing a Rainwater Harvesting Pit can earn you an additional ₹1,200 annual subsidy.`,
        suggestions: [
          'Take Jal Samrakshak Pledge',
          'How to improve my EcoScore?',
          'When is my next water supply?',
        ],
      };
    }

    return {
      text: `AquaMind AI has registered your query: "${userQuery}". Our smart city neural grid is continuously monitoring Ward 104 pipeline dynamics and reservoir inflows to ensure equitable supply.`,
      suggestions: [
        'When is my next water supply in Kondapur?',
        'Check current Osmansagar & Himayatsagar levels',
        'How does AquaMind AI optimize water pressure?',
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: reply.suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          id="floating-ai-assistant-btn"
          className="relative group p-4 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-teal-400 text-slate-950 shadow-2xl shadow-cyan-500/40 flex items-center justify-center cursor-pointer border border-cyan-300/60"
          title="Open AquaBot AI Assistant"
        >
          {/* Cyber Pulse Ring */}
          <span className="absolute -inset-1 rounded-2xl bg-cyan-400 opacity-40 group-hover:opacity-75 blur-sm animate-pulse transition-opacity" />
          
          <div className="relative flex items-center gap-2">
            <Bot className="w-6 h-6 text-slate-950 drop-shadow" />
            <span className="hidden sm:inline font-black text-xs uppercase tracking-wider text-slate-950">
              AquaBot AI
            </span>
          </div>

          {/* Online status indicator */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </span>
        </motion.button>
      </div>

      {/* Expandable Chat Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[580px] h-[550px] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Chat Drawer Header */}
            <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">AquaBot Jal Mitra</h4>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-1.5 py-0.5 rounded-md font-mono font-medium">
                      v2.6 AI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Hyderabad Smart Water Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages(initialChatMessages)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                        : 'glass-inner-card border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block mt-1 text-right font-mono ${msg.sender === 'user' ? 'text-slate-950/70' : 'text-slate-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Suggestion Chips from Bot */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="px-3 py-1 rounded-full glass-inner-card hover:bg-slate-800 border border-slate-800 text-cyan-300 text-[11px] font-medium transition-all text-left"
                        >
                          ⚡ {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs p-2.5 glass-inner-card rounded-2xl w-fit border border-slate-800">
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>AquaBot is checking water services...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Field */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about water supply, TDS, reservoirs..."
                  className="flex-1 px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-white outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 disabled:opacity-40 text-slate-950 font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OverviewProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isInitial: boolean;
}

export const Overview = ({ input, setInput, handleSubmit, isInitial }: OverviewProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      key="overview"
      className={`max-w-3xl mx-auto ${isInitial ? 'mt-[30vh]' : 'mt-4'}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.3 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl mx-auto">
        <div className="flex flex-row justify-center gap-2 items-center text-lg font-medium">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-6 h-6 fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          RecLLM
        </div>
        
        {isInitial && (
          <motion.form 
            className="relative w-full max-w-lg mx-auto"
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`relative flex items-center transition-all duration-300 ${
              isFocused ? 'shadow-lg' : 'shadow'
            } rounded-lg bg-background border`}>
              <input
                type="text"
                placeholder="Search for YouTube videos..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 px-4 py-3 bg-transparent outline-none rounded-lg"
              />
              <button 
                type="submit"
                className="px-4 py-2 mr-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Search
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}; 
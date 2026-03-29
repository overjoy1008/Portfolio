"use client";

import { motion, AnimatePresence } from "motion/react";
import { Mail, X, Copy, Check } from "lucide-react";
import { useState } from "react";

export const EmailModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const email = "overjoy1008@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/10 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-5 text-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-300 hover:text-neutral-900 transition-colors">
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="w-16 h-16 bg-neutral-50 text-neutral-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h3 className="font-noto text-xl font-bold text-neutral-700 tracking-tight">Contact Me</h3>
              <p className="font-noto text-neutral-700 text-sm mt-2">Feel free to reach out anytime.</p>
            </div>

            <div 
              onClick={handleCopy}
              className="group relative flex items-center justify-between gap-4 px-6 py-4 bg-neutral-50 hover:bg-neutral-100 rounded-2xl cursor-pointer transition-all duration-300"
            >
              <span className="font-noto text-sm text-neutral-700 font-medium truncate">{email}</span>
              <div className="flex-shrink-0 text-neutral-400 group-hover:text-neutral-700 transition-colors">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </div>
              
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-noto"
                  >
                    Copied to clipboard
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

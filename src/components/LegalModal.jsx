import React from 'react';
import { X, ShieldAlert, FileText } from 'lucide-react';

export default function LegalModal({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(0,0,0,0.85)] backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[rgba(17,16,20,0.98)] border border-[rgba(198,165,107,0.3)] rounded-3xl shadow-2xl p-6 md:p-8 animate-fadeIn max-h-[85vh] flex flex-col justify-between">
        <button
          onClick={onClose}
          id="close-legal-modal-btn"
          aria-label="Close Dialog"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[rgba(255,255,255,0.06)] text-[#AAA4A0] hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto pr-2 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            {isPrivacy ? <ShieldAlert className="text-[#C6A56B]" size={24} /> : <FileText className="text-[#C6A56B]" size={24} />}
            <h3 className="font-serif text-3xl text-[#F5F0E8]">
              {isPrivacy ? 'Demo Privacy Notice' : 'Demo Terms & Conditions'}
            </h3>
          </div>

          <div className="text-xs text-[#AAA4A0] leading-relaxed space-y-3 font-light">
            <p className="p-3 rounded-xl bg-[rgba(198,165,107,0.1)] text-[#C6A56B] font-mono text-[11px]">
              <strong>NOTICE:</strong> BLOOM Florist is a concept design showcase and creative technology competition demonstration.
            </p>

            {isPrivacy ? (
              <>
                <p>
                  1. <strong>Data Collection:</strong> We do not transmit or store personal financial credentials, credit cards, or banking information on external servers. All customer entries and demo orders remain stored locally in your browser’s localStorage.
                </p>
                <p>
                  2. <strong>Confidentiality:</strong> Simulated names, addresses, and recipient messages are utilized solely for rendering the interactive checkout receipt and order confirmation experience.
                </p>
                <p>
                  3. <strong>Cookies & Analytics:</strong> This site uses standard local browser storage to persist cart selections and demo order history across browser reloads.
                </p>
              </>
            ) : (
              <>
                <p>
                  1. <strong>Simulated Commerce:</strong> All prices displayed in Indian Rupees (INR) and floral descriptions are part of an interactive portfolio demonstration. No real financial debits or physical merchandise dispatches occur.
                </p>
                <p>
                  2. <strong>Intellectual Assets:</strong> The 100 cinematic animation frames and brand presentation represent the creative work of the BLOOM project.
                </p>
                <p>
                  3. <strong>Availability:</strong> Floral arrangements displayed represent artisanal compositions inspired by luxury seasonal botanicals.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] mt-6 text-right">
          <button
            onClick={onClose}
            className="btn-gold px-6 py-2.5 text-xs"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

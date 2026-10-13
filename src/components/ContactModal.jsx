import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Floral Inquiry',
    message: ''
  });

  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(0,0,0,0.85)] backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[rgba(17,16,20,0.98)] border border-[rgba(198,165,107,0.3)] rounded-3xl shadow-2xl p-6 md:p-8 animate-fadeIn">
        <button
          onClick={onClose}
          id="close-contact-modal-btn"
          aria-label="Close Contact Dialog"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[rgba(255,255,255,0.06)] text-[#AAA4A0] hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C6A56B] block mb-1">
            HAUTE FLORISTRY CONCIERGE
          </span>
          <h3 className="font-serif text-3xl text-[#F5F0E8] font-normal">
            Connect with Our Atelier
          </h3>
          <p className="text-xs text-[#AAA4A0] mt-1 font-light">
            Need bespoke bridal styling, corporate installations, or express consultation?
          </p>
        </div>

        {sentSuccess ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle size={44} className="text-[#4ADE80] mx-auto animate-bounce" />
            <h4 className="font-serif text-2xl text-[#F5F0E8]">Message Received</h4>
            <p className="text-xs text-[#AAA4A0] max-w-sm mx-auto">
              Our floral designer will be in touch within 2 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-[#AAA4A0] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-[rgba(8,8,9,0.7)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C6A56B]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#AAA4A0] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-[rgba(8,8,9,0.7)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C6A56B]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#AAA4A0] block mb-1">Inquiry Type</label>
              <select
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full bg-[rgba(8,8,9,0.7)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C6A56B]"
              >
                <option value="General Floral Inquiry">General Floral Inquiry</option>
                <option value="Bespoke Wedding Consultation">Bespoke Wedding Consultation</option>
                <option value="Anniversary Grand Surprise">Anniversary Grand Surprise</option>
                <option value="Corporate / Event Floristry">Corporate / Event Floristry</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#AAA4A0] block mb-1">Your Message</label>
              <textarea
                required
                rows="3"
                placeholder="Share your floral ideas or timing requirements..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full bg-[rgba(8,8,9,0.7)] border border-[rgba(255,255,255,0.1)] rounded-xl p-3 text-xs text-[#F5F0E8] focus:outline-none focus:border-[#C6A56B] resize-none"
              />
            </div>

            {/* Atelier Information Chips */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#AAA4A0]">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[rgba(8,8,9,0.5)]">
                <Clock size={12} className="text-[#C6A56B]" />
                <span>Mon – Sun &bull; 9 AM – 9 PM IST</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[rgba(8,8,9,0.5)]">
                <Mail size={12} className="text-[#C6A56B]" />
                <span>concierge@bloomflorist.demo</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-3 text-xs tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <Send size={13} />
              <span>SEND INQUIRY</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

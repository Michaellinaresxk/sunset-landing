// src/components/ContactModal.tsx
'use client';

import { useState } from 'react';
import {
  X,
  Mail,
  User,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in all fields');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStatus('idle');
      setErrorMsg('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-xl animate-fadeIn'>
      <div className='bg-zinc-900 rounded-3xl max-w-md w-full border border-white/10'>
        {/* Header */}
        <div className='flex justify-between items-center px-6 py-5 border-b border-white/5'>
          <h3 className='text-lg font-light text-white tracking-tight'>
            Contact Us
          </h3>
          <button
            onClick={handleClose}
            className='text-white/40 hover:text-white transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-6'>
          {status === 'sent' ? (
            <div className='text-center py-8 space-y-4'>
              <div className='w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto'>
                <CheckCircle className='w-7 h-7 text-emerald-400' />
              </div>
              <p className='text-white font-light'>Message sent!</p>
              <p className='text-white/40 text-sm font-light'>
                We&apos;ll get back to you soon.
              </p>
              <button
                onClick={handleClose}
                className='mt-4 px-8 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white text-sm transition-colors'
              >
                Close
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              {/* Name */}
              <div className='flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus-within:border-amber-300/50 transition-colors'>
                <User className='w-4 h-4 text-amber-400 flex-shrink-0' />
                <input
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  className='flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none'
                />
              </div>

              {/* Email */}
              <div className='flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus-within:border-amber-300/50 transition-colors'>
                <Mail className='w-4 h-4 text-amber-400 flex-shrink-0' />
                <input
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='Your email'
                  className='flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none'
                />
              </div>

              {/* Message */}
              <div className='flex gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus-within:border-amber-300/50 transition-colors'>
                <MessageSquare className='w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5' />
                <textarea
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder='Date, number of guests, hotel name...'
                  rows={4}
                  className='flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none resize-none'
                />
              </div>

              {/* Error */}
              {status === 'error' && errorMsg && (
                <p className='text-red-400 text-xs flex items-center gap-1.5'>
                  <AlertTriangle className='w-3 h-3' />
                  {errorMsg}
                </p>
              )}

              {/* Actions */}
              <div className='flex gap-3 pt-2'>
                <button
                  onClick={handleClose}
                  disabled={status === 'sending'}
                  className='flex-1 px-5 py-3 border border-white/20 rounded-xl text-white/70 hover:text-white transition text-sm font-medium disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  className='flex-1 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 shadow-lg'
                >
                  {status === 'sending' ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Mail className='w-4 h-4' />
                  )}
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

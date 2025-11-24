'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AddTestimonialForm from './AddTestimonialForm';
import './AddTestimonialModal.css';

type Props = {
  onCancel?: () => void;
  onAdded?: any;
};

export default function AddTestimonialModal({ onCancel, onAdded }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="atm-backdrop" onClick={onCancel}>
      <div
        className="atm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="atm-title"
      >
        <button type="button" className="atm-close" aria-label="Close" onClick={onCancel}>
          ×
        </button>
        <h3 id="atm-title" className="atm-title">Add Testimonial</h3>
        <AddTestimonialForm onCancel={onCancel} onAdded={onAdded} />
      </div>
    </div>,
    document.body
  );
}

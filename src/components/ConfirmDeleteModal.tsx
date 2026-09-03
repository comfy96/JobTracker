import React from 'react';
import type { JobApplication } from '../types/job';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  application: JobApplication | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  application,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !application) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container modal-small"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="delete-modal-content">
          <div className="delete-icon-wrapper">
            <AlertTriangle size={28} className="text-rose-500" />
          </div>

          <h3 className="delete-title">Delete Application?</h3>
          <p className="delete-description">
            Are you sure you want to remove tracking for{' '}
            <strong>{application.role}</strong> at <strong>{application.company}</strong>?
            This action cannot be undone.
          </p>

          <div className="modal-footer justify-end">
            <button onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button onClick={onConfirm} className="btn btn-danger btn-icon">
              <Trash2 size={16} />
              <span>Delete Application</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

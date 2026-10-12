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
    <div className="editorial-modal-backdrop" onClick={onClose}>
      <div
        className="editorial-modal-card modal-compact"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="delete-modal-inner">
          <div className="delete-warning-icon">
            <AlertTriangle size={24} />
          </div>

          <h3 className="delete-title">Delete Application</h3>
          <p className="delete-message">
            Are you sure you want to remove tracking for <strong>{application.role}</strong> at{' '}
            <strong>{application.company}</strong>?
          </p>

          <div className="delete-modal-actions">
            <button onClick={onClose} className="btn-modal-cancel">
              Cancel
            </button>
            <button onClick={onConfirm} className="btn-danger-confirm">
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

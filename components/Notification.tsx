
import React from 'react';
import { NotificationType } from '../types';
import { ICONS } from '../constants';
import { cx } from '../styles';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const baseClasses = 'relative w-full max-w-sm overflow-hidden rounded-2xl border p-4 pr-10 shadow-[0_14px_32px_rgba(23,23,23,0.12)]';
  const typeClasses = {
    [NotificationType.Success]: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    [NotificationType.Error]: 'border-red-200 bg-red-50 text-red-900',
    [NotificationType.Info]: 'border-border bg-card text-foreground',
  };

  return (
    <div className={cx(baseClasses, typeClasses[type])}>
      <p className="text-sm font-medium leading-5">{message}</p>
      <button onClick={onClose} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-current/50 transition hover:text-current">
        <span className="sr-only">Close</span>
        {ICONS.close}
      </button>
    </div>
  );
};

export default Notification;


import React from 'react';
import { NotificationType } from '../types';
import { ICONS } from '../constants';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const baseClasses = 'relative w-full max-w-sm p-4 pr-10 overflow-hidden rounded-lg shadow-lg';
  const typeClasses = {
    [NotificationType.Success]: 'bg-green-500 text-white',
    [NotificationType.Error]: 'bg-red-500 text-white',
    [NotificationType.Info]: 'bg-blue-500 text-white',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="absolute top-1/2 right-2.5 -translate-y-1/2 text-white/70 hover:text-white">
        <span className="sr-only">Close</span>
        {ICONS.close}
      </button>
    </div>
  );
};

export default Notification;

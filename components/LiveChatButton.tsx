
import React from 'react';
import { ICONS } from '../constants';
import { styles } from '../styles';

const LiveChatButton: React.FC = () => {
  return (
    <button
      type="button"
      className={`${styles.button.base} ${styles.button.secondary} fixed bottom-24 right-5 z-40 h-12 w-12 rounded-2xl bg-card p-0 shadow-lg`}
      aria-label="Open live chat"
    >
      {ICONS.chat}
    </button>
  );
};

export default LiveChatButton;

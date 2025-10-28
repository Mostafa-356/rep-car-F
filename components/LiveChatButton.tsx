
import React from 'react';
import { ICONS } from '../constants';

const LiveChatButton: React.FC = () => {
  return (
    <button
      type="button"
      className="fixed bottom-20 right-5 z-40 p-3 rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-110"
      aria-label="Open live chat"
    >
      {ICONS.chat}
    </button>
  );
};

export default LiveChatButton;

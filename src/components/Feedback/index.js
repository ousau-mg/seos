import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function Feedback() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openTally = () => {
    Tally.openPopup('KYLGQK', {
      layout: 'popover', 
      width: 400,
      hideTitle: true,
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        /* Ajustes exclusivos para telas menores (mobile) */
        @media screen and (max-width: 768px) {
          .feedback-widget-container {
            right: 10px !important;
            bottom: 20px !important;
            padding: 5px !important;
            transform: scale(0.8); /* Reduz o tamanho geral em 20% no mobile */
            transform-origin: bottom right;
          }
        }
      `}</style>

      <div className="feedback-widget-container" style={{
        position: 'fixed',
        right: '20px',
        bottom: '100px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '8px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #ddd'
      }}>
        {/* Botão de fechar (X) */}
        <button 
          onClick={() => setIsVisible(false)}
          style={{ 
            alignSelf: 'flex-end', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '0',
            lineHeight: '0'
          }}
        >
          <Icon icon="material-symbols:close" color="#999" width="18" />
        </button>

        <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>Feedback</span>

        <button 
          onClick={openTally}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '5px' }}
        >
          <Icon icon="material-symbols:thumb-up-outline" color="#2e7d32" width="26" />
        </button>
        
        <button 
          onClick={openTally}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '5px' }}
        >
          <Icon icon="material-symbols:thumb-down-outline" color="#d32f2f" width="26" />
        </button>
      </div>
    </>
  );
}
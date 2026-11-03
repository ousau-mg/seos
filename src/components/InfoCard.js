import React from 'react';
import { Icon } from '@iconify/react';

export default function InfoCard({ iconName, title, description, link, linkText, download }) {
  return (
    <>
      <style>{`
        .info-card-container {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.25rem;
          background-color: var(--ifm-card-background-color);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
          width: 100%;
        }

        .info-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.15rem;
          font-weight: bold;
          line-height: 1.2;
          /* Altura mínima fixa para o cabeçalho alinhar perfeitamente lado a lado */
          min-height: 3.8rem; 
        }

        .info-card-footer {
          margin-top: 0.8rem;
        }

        /* Ajustes específicos para mobile se necessário */
        @media screen and (max-width: 768px) {
          .info-card-header {
            font-size: 1rem;
            min-height: 4rem; /* Garante espaço igual para títulos de até 3 linhas no celular */
          }
          .info-card-container {
            padding: 0.9rem;
          }
        }
      `}</style>

      <div className="info-card-container">
        {/* Topo do Card */}
        <div className="info-card-header">
          <Icon icon={iconName} width="24" height="24" style={{ flexShrink: 0 }} />
          <span>{title}</span>
        </div>
        
        <hr style={{ margin: '8px 0' }} />
        
        {/* Conteúdo */}
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.35' }}>{description}</p>
        </div>
        
        {/* Botão posicionado no final */}
        <div className="info-card-footer">
          <a 
            href={link} 
            download={download} 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#245c3f', 
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              width: 'fit-content'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            {linkText}
          </a>
        </div>
      </div>
    </>
  );
}
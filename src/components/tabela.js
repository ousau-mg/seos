import React from 'react';

export const LinkRow = ({ tema, fonte, desc, url }) => (
  <>
    <style>{`
      .link-row-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--ifm-color-emphasis-200);
        color: inherit;
        text-decoration: none;
        transition: background-color 0.2s ease;
        cursor: pointer;
      }
      .link-row-container:hover {
        background-color: var(--ifm-color-emphasis-100);
      }

      /* Container da parte inferior no mobile (descrição + seta) */
      .link-row-bottom-row {
        display: contents;
      }

      /* Responsividade para Celulares (telas menores que 768px) */
      @media screen and (max-width: 768px) {
        .link-row-container {
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 6px;
          padding: 12px 14px;
        }
        .link-row-col-1, .link-row-col-2, .link-row-col-3 {
          width: 100% !important;
          flex: none !important;
          padding: 0 !important;
        }
        /* Tema e ano juntos na primeira linha */
        .link-row-col-1 {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .link-row-col-1 small {
          margin-bottom: 0 !important;
          font-size: 0.75rem !important;
        }
        .link-row-col-1 strong {
          font-size: 0.85rem !important;
        }
        /* Transforma a linha inferior num flex container real para a seta aparecer ao lado da descrição */
        .link-row-bottom-row {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          gap: 10px;
        }
        .link-row-col-2 {
          font-size: 0.82rem !important;
          line-height: 1.3 !important;
          padding-right: 0 !important;
        }
        .link-row-col-3 {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          flex-shrink: 0 !important;
        }
      }
    `}</style>

    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-row-container"
    >
      {/* Coluna 1: Tema e Fonte */}
      <div className="link-row-col-1" style={{ flex: '0 0 220px', paddingRight: '15px' }}>
        {tema && (
          <small
            style={{
              color: 'var(--ifm-color-primary)',
              fontWeight: 'bold',
              display: 'block',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            {tema}
          </small>
        )}
        {fonte && <strong style={{ fontSize: '1rem' }}>{fonte}</strong>}
      </div>

      {/* Linha inferior no mobile agrupando descrição e seta */}
      <div className="link-row-bottom-row">
        {/* Coluna 2: Descrição */}
        <div
          className="link-row-col-2"
          style={{
            flex: 1,
            paddingRight: '20px',
            fontSize: '0.9rem',
            color: 'var(--ifm-font-color-base)',
            lineHeight: '1.4',
          }}
        >
          {desc}
        </div>

        {/* Coluna 3: Seta */}
        <div
          className="link-row-col-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--ifm-color-primary)',
            fontSize: '1.1rem',
          }}
        >
          <span>➔</span>
        </div>
      </div>
    </a>
  </>
);

export default LinkRow;
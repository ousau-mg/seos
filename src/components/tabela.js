import React from 'react';

export const LinkRow = ({ tema, fonte, desc, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: '1px solid var(--ifm-color-emphasis-200)',
      color: 'inherit',
      textDecoration: 'none',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    }}
  >
    {/* Coluna 1: Tema e Fonte */}
    <div style={{ flex: '0 0 220px', paddingRight: '15px' }}>
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
      {fonte && <strong>{fonte}</strong>}
    </div>

    {/* Coluna 2: Descrição */}
    <div
      style={{
        flex: 1,
        paddingRight: '20px',
        fontSize: '0.9rem',
        color: 'var(--ifm-font-color-base)',
      }}
    >
      {desc}
    </div>

    {/* Coluna 3: Seta indicando que a caixa é um link */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'var(--ifm-color-primary)',
        fontSize: '1.1rem',
      }}
    >
      ➔
    </div>
  </a>
);

export default LinkRow;
import React from 'react';
import { Icon } from '@iconify/react';

export default function StatusNotice({
  icon,
  eyebrow = 'SEOS/MG',
  badge = 'Em implantação',
  title = 'Conteúdo em fase de implantação',
  description = 'Esta seção está em desenvolvimento e validação pela equipe. Alguns itens podem passar por ajustes ou serem liberados gradualmente.',
  buttonText = 'Entendi, continuar',
  onConfirm,
  secondaryText,
  secondaryHref,
  overlay = false,
  compact = false,
}) {
  const cardContent = (
    <div
      className="status-notice-card"
      role={overlay ? 'dialog' : 'region'}
      aria-modal={overlay ? 'true' : undefined}
      style={{
        width: '100%',
        maxWidth: overlay ? '500px' : '1300px',
        margin: overlay ? '0 1rem' : '0 auto 1.25rem auto',
        padding: compact ? '0.9rem 1.1rem' : '1.35rem 1.5rem',
        backgroundColor: 'var(--ifm-background-surface-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '10px',
        boxShadow: overlay
          ? '0 18px 40px rgba(0, 0, 0, 0.16)'
          : '0 2px 8px rgba(0, 0, 0, 0.04)',
        textAlign: 'left',
      }}
    >
      {(eyebrow || badge) && (
        <div
          className="status-notice-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '0.45rem',
          }}
        >
          {eyebrow ? (
            <span
              className="status-notice-eyebrow"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--ifm-color-content-secondary)',
              }}
            >
              {eyebrow}
            </span>
          ) : (
            <span />
          )}

          {badge && (
            <span
              className="status-notice-badge"
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '0.18rem 0.6rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(36, 92, 63, 0.12)',
                color: '#245c3f',
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      <div
        className="status-notice-title-row"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: icon ? '0.5rem' : 0,
          marginBottom: '0.35rem',
        }}
      >
        {icon && (
          <Icon
            icon={icon}
            width={compact ? 16 : 20}
            height={compact ? 16 : 20}
            style={{
              color: '#245c3f',
              flexShrink: 0,
              marginTop: '0.15rem',
            }}
          />
        )}

        <h3
          className="status-notice-title"
          style={{
            margin: 0,
            fontSize: compact ? '1.05rem' : '1.2rem',
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
      </div>

      <p
        className="status-notice-desc"
        style={{
          margin: onConfirm || secondaryText ? '0 0 1rem 0' : 0,
          fontSize: compact ? '0.88rem' : '0.95rem',
          lineHeight: 1.55,
          color: 'var(--ifm-color-content-secondary)',
        }}
      >
        {description}
      </p>

      {(onConfirm || secondaryText) && (
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              style={{
                backgroundColor: '#245c3f',
                color: '#ffffff',
                border: '6px solid #245c3f',
                borderRadius: '7px',
                padding: '0.2rem 1.1rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {buttonText}
            </button>
          )}

          {secondaryText && secondaryHref && (
            <a
              href={secondaryHref}
              style={{
                color: 'var(--ifm-color-content)',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '7px',
                padding: '0.3rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {secondaryText}
            </a>
          )}
        </div>
      )}

      <style>{`
        @media screen and (max-width: 768px) {
          .status-notice-card {
            padding: 0.65rem 0.85rem !important;
            margin-bottom: 0.75rem !important;
            border-radius: 8px !important;
          }

          .status-notice-header {
            margin-bottom: 0.25rem !important;
          }

          .status-notice-eyebrow {
            font-size: 0.65rem !important;
          }

          .status-notice-badge {
            font-size: 0.66rem !important;
            padding: 0.1rem 0.45rem !important;
          }

          .status-notice-title-row {
            margin-bottom: 0.2rem !important;
            gap: 0.4rem !important;
          }

          .status-notice-title {
            font-size: 0.92rem !important;
            line-height: 1.25 !important;
          }

          .status-notice-desc {
            font-size: 0.78rem !important;
            line-height: 1.38 !important;
          }
        }
      `}</style>
    </div>
  );

  if (!overlay) {
    return cardContent;
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        backgroundColor: 'rgba(15, 23, 42, 0.25)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '3.5rem',
      }}
    >
      {cardContent}
    </div>
  );
}
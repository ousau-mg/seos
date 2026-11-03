---
sidebar_position: 3
---

import Accordion from '@site/src/components/dobravel';
import { LinkRow } from '@site/src/components/tabela';
import Heading from '@theme/Heading';

# Paineis e relatórios

## BI {#secao-bi}

<section className="bi-section">

  <Heading as="h3" className="bi-section-title">
    OUSAU - REGIONAIS E MUNICÍPIOS
  </Heading>

  {/* AVISO PARA DISPOSITIVOS MOBILE */}
  <div className="bi-desktop-notice">
    <span className="bi-notice-icon">ⓘ</span>
    <span>
      Para uma melhor experiência de visualização,
      recomendamos acessar este painel por um computador.
    </span>
  </div>

  <div className="bi-mobile-scroll">
    <div className="bi-report-container">
      <iframe
        src="https://app.powerbi.com/reportEmbed?reportId=a9b6ccf4-dc2e-43fe-b5d5-52aaeef2ebf4&autoAuth=true&ctid=53356986-688c-4cb9-ae3a-e8dbf6911a43"
        title="BI Interno - OUSAU Regionais e Municípios"
        allowFullScreen
      />
    </div>
  </div>

</section>

<style>{`
  .bi-section {
    width: 100%;
    margin-bottom: 30px;
  }

  .bi-section-title {
    font-size: 20px;
    margin: 20px 0 14px;
  }

  /* AVISO MOBILE */
  .bi-desktop-notice {
    display: none;
  }

  /* CONTAINER DESKTOP (Ajustado para não sobrar espaço nas laterais e embaixo) */
  .bi-mobile-scroll {
    width: 100%;
    height: 550px;
    overflow: hidden;
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 8px;
    background: #fff;
  }

  .bi-report-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .bi-report-container iframe {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none !important;
    border: none;
  }

  /* TABLETS E CELULARES */
  @media screen and (max-width: 768px) {
    .bi-desktop-notice {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 8px;
      margin-bottom: 8px;
      border-radius: 5px;
      background: var(--ifm-color-emphasis-100);
      color: var(--ifm-color-content-secondary);
      font-size: 11px;
      line-height: 1.35;
    }

    .bi-notice-icon {
      font-size: 14px;
      font-weight: bold;
      flex-shrink: 0;
    }

    .bi-section-title {
      font-size: 17px;
      line-height: 1.4;
    }

    .bi-mobile-scroll {
      height: 600px;
      overflow-x: auto;
      overflow-y: auto;
      overscroll-behavior: contain;
      touch-action: pan-x pan-y;
      -webkit-overflow-scrolling: touch;
    }

    .bi-report-container {
      width: 900px !important;
      min-width: 900px !important;
      height: 600px;
    }

    .bi-report-container iframe {
      width: 900px !important;
      min-width: 900px !important;
      max-width: none !important;
      height: 600px !important;
    }
  }

  /* CELULARES PEQUENOS */
  @media screen and (max-width: 380px) {
    .bi-report-container,
    .bi-report-container iframe {
      width: 900px !important;
      min-width: 900px !important;
    }
  }
`}</style>

---

## Trimestrais

<Accordion title="Trimestre 2025_4">
  <p style={{ color: 'var(--ifm-color-content-secondary)', textAlign: 'center' }}>
    Aguardando publicação dos documentos.
  </p>
  
</Accordion>

<Accordion title="Trimestre 2025_3">
  <p style={{ color: 'var(--ifm-color-content-secondary)', textAlign: 'center' }}>
    Aguardando publicação dos documentos.
  </p>
</Accordion>

<Accordion title="Trimestre 2025_2">
  <p style={{ color: 'var(--ifm-color-content-secondary)', textAlign: 'center' }}>
    Aguardando publicação dos documentos.
  </p>
</Accordion>

<Accordion title="Trimestre 2025_1">
  <p style={{ color: 'var(--ifm-color-content-secondary)', textAlign: 'center' }}>
    Aguardando publicação dos documentos.
  </p>
</Accordion>

---

## Síntese

- **Nossas metas**: Descrição detalhada das metas estabelecidas.
- **Principais avanços**: Nossos principais marcos no último ano.
- **Objetivos**: Metas para o próximo ciclo anual.

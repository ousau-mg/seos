import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import Feedback from '@site/src/components/Feedback';
import InfoCard from '@site/src/components/InfoCard';
import VideoPlayer from '@site/src/components/VideoPlayer';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, 'text--center')} style={{padding: '2rem 1rem'}}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', lineHeight: '1.2'}}>
          {siteConfig.title}
        </Heading>
        {siteConfig.tagline && <p className="hero__subtitle" style={{fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', marginTop: '0.5rem'}}>{siteConfig.tagline}</p>}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  // Confira se o nome do arquivo em static/img/ é tipificacoes.mp4 ou tipificacao.mp4
  const videoUrl = useBaseUrl('/img/tipificacao.mp4');
  const posterUrl = useBaseUrl('/img/Tipificacao.png'); // Sua imagem de capa

  return (
    <Layout
      title={`Início | ${siteConfig.title}`}
      description="Sistema Estadual de Ouvidorias de Saúde - SEOS/MG">
      <HomepageHeader />

      <main>
        <div className="container margin-vert--lg">
          
          {/* SEÇÃO PRINCIPAL: TEXTO À ESQUERDA + VÍDEO À DIREITA */}
          <section style={{ marginBottom: '3rem', marginTop: '1rem' }}>
            <div className="row" style={{ alignItems: 'center' }}>
              
              {/* Coluna do Texto */}
              <div className="col col--6" style={{ paddingRight: '2rem', marginBottom: '1.5rem' }}>
                <Heading as="h2" style={{ fontSize: '1.75rem', marginBottom: '1rem', textAlign: 'left' }}>
                  Apoio Técnico e Formação em Ouvidoria
                </Heading>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--ifm-color-content-secondary)', marginBottom: '1rem', textAlign: 'left' }}>
                  Portal de apoio técnico e formação para a rede de ouvidorias do SUS em Minas Gerais. Selecione uma das áreas abaixo para acessar manuais, trilhas de aprendizagem, respostas padrão, painéis gerenciais e canais de suporte.
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--ifm-color-emphasis-700)', textAlign: 'left', marginBottom: 0 }}>
                  <strong>Tipificação de manifestações:</strong> Assista ao vídeo ao lado para conferir um panorama geral sobre como classificar corretamente cada tipo de manifestação.
                </p>
              </div>

              {/* Coluna do Vídeo */}
              <div className="col col--6">
                <VideoPlayer url={videoUrl} poster={posterUrl} isLocal={true} />
              </div>

            </div>
          </section>

          {/* SEÇÃO: SUBMENUS (CARDS) */}
          <section style={{
            marginBottom: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--ifm-color-emphasis-200)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '12px',
              alignItems: 'stretch',
            }}>
              <InfoCard
                iconName="akar-icons:book"
                title="Material de apoio"
                description="Base legal, contexto, documentos, legislação, paineis e relatórios"
                link="/seos/docs/SEOS/Base-Legal"
                linkText="Acessar"
              />
              <InfoCard
                iconName="mdi:map-add"
                title="Criar Ouvidoria"
                description="Cartilhas, Guias e Manuais, Adesão e inclusão; operação e tutoriais"
                link="/seos/docs/Criar"
                linkText="Acessar"
              />
              <InfoCard
                iconName="pinhead:treasure-map"
                title="Trilhas de aprendizagem"
                description="Capacitações para atuação nas ouvidorias do SUS."
                link="/seos/Trilhas"
                linkText="Acessar"
              />
              <InfoCard
                iconName="andrsrxn:file-paper-clip"
                title="Respostas padrão"
                description="Guia com as principais respostas padrão"
                link="/seos/docs/Guia_Respostas"
                linkText="Acessar"
              />
              <InfoCard
                iconName="arcticons:microsoft-power-bi"
                title="Painéis B.I"
                description="Status de manifestações de ouvidorias de saúde"
                link="/seos/docs/SEOS/Paineis#secao-bi"
                linkText="Acessar"
              />
              <InfoCard
                iconName="cuida:headset-outline"
                title="Canais de Atendimento"
                description="Principais canais de atendimento da SEOS"
                link="/seos/docs/Canais_Atendimento"
                linkText="Acessar"
              />
            </div>
          </section>
          <Feedback />
        </div>
      </main>
    </Layout>
  );
}

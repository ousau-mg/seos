import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import VideoPlayer from '@site/src/components/VideoPlayer';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import GiscusComments from '../components/GiscusComments';
import Feedback from '@site/src/components/Feedback';
import InfoCard from '@site/src/components/InfoCard';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner, 'text--center')} style={{padding: '2rem 1rem'}}>
      <div className="container">
        {/* Título responsivo com clamp para não ficar gigante no mobile */}
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
  return (
    <Layout
      title={`Início | ${siteConfig.title}`}
      description="Sistema Estadual de Ouvidorias de Saúde - SEOS/MG">
      <HomepageHeader />

      <main>
        <div className="container margin-vert--lg">
          
          {/* SEÇÃO DE TEXTO COM ESPAÇAMENTO (RESPIRO EM BRANCO) */}
          <div className="row" style={{ alignItems: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
            <div className="col col--8 col--offset-2 text--center">
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--ifm-color-content-secondary)' }}>
                É responsável por receber reclamações, denúncias e sugestões, acompanhando o tratamento da manifestação até a decisão final. Aproxima os usuários dos serviços através de atendimento presencial e móvel.
              </p>
            </div>
          </div>

          {/* SEÇÃO: SUBMENUS (CARDS) */}
          <section style={{ marginBottom: '3rem' }}>
            <Heading as="h3" style={{ textAlign: 'center', marginBottom: '1.5rem' }}></Heading>
            <div style={{
              display: 'grid',
              /* Garante 2 colunas no mobile e expande automaticamente no PC */
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              alignItems: 'stretch',
            }}>
              <InfoCard
                iconName="mdi:pill"
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
                iconName="mdi:book-open-variant"
                title="Agenda e capacitações"
                description="Apresentações, Capacitações e Eventos"
                link="/seos/docs/Agenda"
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
              <InfoCard
                iconName="andrsrxn:file-paper-clip"
                title="Respostas padrão"
                description="Guia com as principais respostas padrão"
                link="/seos/docs/Guia_Respostas"
                linkText="Acessar"
              />
            </div>
          </section>

          {/* SEÇÃO: FEEDBACK E COMENTÁRIOS */}
          <div className="row">
            <div className="col col--12">
               <Feedback />
               <div className="margin-top--lg">
                  <GiscusComments />
               </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
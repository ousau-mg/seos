import React, { useEffect, useMemo, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react';

function detectarSeparador(linhaCabecalho) {
  const linhaLimpa = linhaCabecalho.replace(/^\uFEFF/, '');
  const pontosVirgula = (linhaLimpa.match(/;/g) || []).length;
  const virgulas = (linhaLimpa.match(/,/g) || []).length;
  return pontosVirgula >= virgulas ? ';' : ',';
}

function parseLinhaCSV(linha, separador) {
  const colunas = [];
  let atual = '';
  let entreAspas = false;

  for (let i = 0; i < linha.length; i += 1) {
    const char = linha[i];
    const proximo = linha[i + 1];

    if (char === '"') {
      if (entreAspas && proximo === '"') {
        atual += '"';
        i += 1;
      } else {
        entreAspas = !entreAspas;
      }
    } else if (char === separador && !entreAspas) {
      colunas.push(atual.trim());
      atual = '';
    } else {
      atual += char;
    }
  }
  colunas.push(atual.trim());
  return colunas;
}

function limparChave(chave) {
  return String(chave || '')
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function buscarCampo(raw, candidatos) {
  for (const cand of candidatos) {
    const chaveAlvo = limparChave(cand);
    if (raw[chaveAlvo] !== undefined && String(raw[chaveAlvo]).trim() !== '') {
      return String(raw[chaveAlvo]).trim();
    }
  }
  const entradas = Object.entries(raw);
  for (const cand of candidatos) {
    const chaveAlvo = limparChave(cand);
    const encontrada = entradas.find(
      ([k, v]) => k.includes(chaveAlvo) && String(v || '').trim() !== ''
    );
    if (encontrada) {
      return String(encontrada[1]).trim();
    }
  }
  return '';
}

function normalizarLinha(raw, index) {
  const data = buscarCampo(raw, ['data']);
  const tipo = buscarCampo(raw, ['tipo de acao', 'tipo', 'acao']);
  const descricaoCompleta = buscarCampo(raw, ['descricao', 'detalhes']);
  const tituloColuna = buscarCampo(raw, ['titulo', 'assunto', 'evento']);
  const local = buscarCampo(raw, ['local / municipio', 'local', 'municipio']);
  const srs = buscarCampo(raw, ['regional de saude (srs)', 'regional', 'srs']);
  const modalidade = buscarCampo(raw, ['modalidade']);
  const quadrimestre = buscarCampo(raw, ['quadrimestre']);
  const publico = buscarCampo(raw, [
    'publico-alvo',
    'publico alvo',
    'responsavel',
  ]);
  const obs = buscarCampo(raw, ['observacoes', 'observacao', 'link']);

  const textoCombinado = `${data} ${tipo} ${descricaoCompleta} ${tituloColuna}`.toLowerCase();
  if (!data && !tipo && !descricaoCompleta && !tituloColuna) {
    return null;
  }
  if (
    textoCombinado.includes('preencha uma linha') ||
    textoCombinado.includes('registro de acoes de sensibilizacao')
  ) {
    return null;
  }

  let titulo = tituloColuna;
  if (!titulo) {
    if (tipo) {
      titulo = local ? `${tipo} — ${local}` : tipo;
    } else if (descricaoCompleta) {
      titulo =
        descricaoCompleta.length > 75
          ? `${descricaoCompleta.slice(0, 72).trim().replace(/\s+\S*$/, '')}...`
          : descricaoCompleta;
    } else {
      titulo = 'Ação de sensibilização';
    }
  }

  const metadados = [
    local ? `Local: ${local}` : '',
    srs ? `Regional/SRS: ${srs}` : '',
    modalidade ? `Modalidade: ${modalidade}` : '',
    quadrimestre || '',
  ]
    .filter(Boolean)
    .join(' · ');

  const link = obs.startsWith('http') ? obs : '';
  const responsavel = publico || (!link ? obs : '');

  return {
    _id: index,
    data,
    titulo,
    tipo: tipo || 'Ação / Orientação',
    descricao: descricaoCompleta,
    metadados,
    responsavel,
    link,
  };
}

function parseCSV(texto) {
  const linhas = texto
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (linhas.length < 2) return [];

  let indiceCabecalho = 0;
  for (let i = 0; i < Math.min(linhas.length, 8); i += 1) {
    const sepTeste = detectarSeparador(linhas[i]);
    const cols = parseLinhaCSV(linhas[i], sepTeste).map(limparChave);
    if (
      cols.some((c) =>
        ['data', 'tipo de acao', 'descricao', 'titulo', 'tipo'].includes(c)
      )
    ) {
      indiceCabecalho = i;
      break;
    }
  }

  const separador = detectarSeparador(linhas[indiceCabecalho]);
  const cabecalhos = parseLinhaCSV(linhas[indiceCabecalho], separador).map(
    limparChave
  );

  return linhas
    .slice(indiceCabecalho + 1)
    .map((linha, index) => {
      const valores = parseLinhaCSV(linha, separador);
      const item = {};
      cabecalhos.forEach((chave, idx) => {
        if (chave) item[chave] = valores[idx] || '';
      });
      return normalizarLinha(item, index);
    })
    .filter(Boolean);
}

async function lerTextoComEncoding(response) {
  const buffer = await response.arrayBuffer();
  const textoUtf8 = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (textoUtf8.includes('\uFFFD')) {
    try {
      return new TextDecoder('windows-1252').decode(buffer);
    } catch {
      return textoUtf8;
    }
  }
  return textoUtf8;
}

export default function AgendaApresentacoes({
  csvPath = '/img/Registro_Acoes_Sensibilizacao.csv',
  tituloFiltro = 'Filtrar por tipo',
  limiteInicial = 12,
}) {
  const urlCsv = useBaseUrl(csvPath);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos');
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro('');

    fetch(urlCsv)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Não foi possível carregar a planilha em: ${urlCsv}`);
        }
        return lerTextoComEncoding(res);
      })
      .then((texto) => {
        if (!ativo) return;
        const parsed = parseCSV(texto);
        if (parsed.length === 0) {
          throw new Error('Nenhum registro válido encontrado no CSV.');
        }
        setItens(parsed);
        setCarregando(false);
      })
      .catch((err) => {
        if (!ativo) return;
        setErro(err.message || 'Erro ao ler os dados.');
        setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [urlCsv]);

  const tiposDisponiveis = useMemo(() => {
    const setTipos = new Set();
    itens.forEach((item) => {
      if (item.tipo) setTipos.add(item.tipo);
    });
    return ['Todos', ...Array.from(setTipos)];
  }, [itens]);

  const itensFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return itens.filter((item) => {
      const bateTipo =
        tipoSelecionado === 'Todos' ||
        (item.tipo || '').toLowerCase() === tipoSelecionado.toLowerCase();

      if (!bateTipo) return false;
      if (!termo) return true;

      const camposTexto = [
        item.data,
        item.titulo,
        item.tipo,
        item.descricao,
        item.metadados,
        item.responsavel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return camposTexto.includes(termo);
    });
  }, [itens, busca, tipoSelecionado]);

  const itensExibidos = useMemo(() => {
    if (mostrarTodos || busca.trim() || tipoSelecionado !== 'Todos') {
      return itensFiltrados;
    }
    return itensFiltrados.slice(0, limiteInicial);
  }, [itensFiltrados, mostrarTodos, busca, tipoSelecionado, limiteInicial]);

  if (carregando) {
    return (
      <div className="agenda-seos-box">
        <p style={{ margin: 0 }}>Carregando agendas e apresentações...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="agenda-seos-box agenda-seos-erro">
        <p style={{ margin: 0 }}>{erro}</p>
      </div>
    );
  }

  const temMaisItens =
    !mostrarTodos &&
    !busca.trim() &&
    tipoSelecionado === 'Todos' &&
    itensFiltrados.length > limiteInicial;

  return (
    <div className="agenda-seos-wrapper">
      <div className="agenda-seos-controles">
        <div className="agenda-seos-busca">
          <Icon icon="mdi:magnify" className="agenda-seos-busca-icone" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por tipo, descrição, data, município ou público..."
            aria-label="Buscar agendas e apresentações"
            className="agenda-seos-input"
          />
        </div>

        {tiposDisponiveis.length > 1 && (
          <button
            type="button"
            onClick={() => setFiltrosAbertos((prev) => !prev)}
            aria-expanded={filtrosAbertos}
            className={`agenda-seos-toggle-filtro ${
              filtrosAbertos || tipoSelecionado !== 'Todos' ? 'is-destaque' : ''
            }`}
          >
            <Icon
              icon="mdi:filter-variant"
              style={{ verticalAlign: '-2px', marginRight: '6px' }}
            />
            {tipoSelecionado !== 'Todos'
              ? `Filtro: ${tipoSelecionado}`
              : 'Filtros'}
            <Icon
              icon={filtrosAbertos ? 'mdi:chevron-up' : 'mdi:chevron-down'}
              style={{ verticalAlign: '-2px', marginLeft: '4px' }}
            />
          </button>
        )}
      </div>

      {filtrosAbertos && tiposDisponiveis.length > 1 && (
        <div className="agenda-seos-painel-filtros" aria-label={tituloFiltro}>
          <div className="agenda-seos-filtros">
            {tiposDisponiveis.map((tipo) => {
              const ativo = tipoSelecionado === tipo;
              return (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => {
                    setTipoSelecionado(tipo);
                    setMostrarTodos(false);
                  }}
                  className={`agenda-seos-chip ${ativo ? 'is-ativo' : ''}`}
                >
                  {tipo}
                </button>
              );
            })}
          </div>

          {tipoSelecionado !== 'Todos' && (
            <button
              type="button"
              onClick={() => setTipoSelecionado('Todos')}
              className="agenda-seos-limpar-filtro"
            >
              Limpar filtro
            </button>
          )}
        </div>
      )}

      {itensExibidos.length === 0 ? (
        <div className="agenda-seos-box">
          <p style={{ margin: 0 }}>
            Nenhum registro encontrado para o filtro selecionado.
          </p>
        </div>
      ) : (
        <>
          <div className="agenda-seos-lista">
            {itensExibidos.map((item) => {
              const ehApresentacao = (item.tipo || '')
                .toLowerCase()
                .includes('apresenta');

              return (
                <article key={item._id} className="agenda-seos-card">
                  <div>
                    <div className="agenda-seos-card-topo">
                      {item.tipo && (
                        <span className="agenda-seos-badge">{item.tipo}</span>
                      )}
                      {item.data && (
                        <span className="agenda-seos-data">
                          <Icon
                            icon="mdi:calendar-month-outline"
                            style={{ verticalAlign: '-2px', marginRight: '4px' }}
                          />
                          {item.data}
                        </span>
                      )}
                    </div>

                    <h3 className="agenda-seos-titulo">{item.titulo}</h3>

                    {item.descricao && (
                      <p className="agenda-seos-descricao">{item.descricao}</p>
                    )}

                    {item.metadados && (
                      <p className="agenda-seos-metadados">{item.metadados}</p>
                    )}
                  </div>

                  <div className="agenda-seos-rodape">
                    {item.responsavel ? (
                      <span className="agenda-seos-responsavel">
                        <Icon
                          icon="mdi:account-outline"
                          style={{ verticalAlign: '-2px', marginRight: '4px' }}
                        />
                        {item.responsavel}
                      </span>
                    ) : (
                      <span />
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="agenda-seos-link"
                      >
                        {ehApresentacao ? 'Abrir apresentação' : 'Ver detalhes'}
                        <Icon
                          icon="mdi:open-in-new"
                          style={{ verticalAlign: '-2px', marginLeft: '5px' }}
                        />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {temMaisItens && (
            <div className="agenda-seos-mais">
              <button
                type="button"
                onClick={() => setMostrarTodos(true)}
                className="agenda-seos-btn-mais"
              >
                Ver todos os {itensFiltrados.length} registros
              </button>
            </div>
          )}

          {mostrarTodos && itensFiltrados.length > limiteInicial && (
            <div className="agenda-seos-mais">
              <button
                type="button"
                onClick={() => setMostrarTodos(false)}
                className="agenda-seos-btn-mais"
              >
                Mostrar menos ({limiteInicial} primeiros)
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        .agenda-seos-wrapper {
          margin: 1.25rem 0 2rem;
        }

        .agenda-seos-controles {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .agenda-seos-busca {
          position: relative;
          flex: 1 1 260px;
        }

        .agenda-seos-busca-icone {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.15rem;
          color: var(--ifm-color-emphasis-600);
          pointer-events: none;
        }

        .agenda-seos-input {
          width: 100%;
          padding: 0.55rem 0.75rem 0.55rem 2.25rem;
          border-radius: 8px;
          border: 1px solid var(--ifm-color-emphasis-300);
          background: var(--ifm-background-surface-color);
          color: var(--ifm-font-color-base);
          font-size: clamp(0.9rem, 2vw, 0.98rem);
        }

        .agenda-seos-input:focus {
          outline: 2px solid #245c3f;
          outline-offset: 1px;
        }

        .agenda-seos-toggle-filtro {
          display: inline-flex;
          align-items: center;
          padding: 0.55rem 0.9rem;
          border-radius: 8px;
          border: 1px solid var(--ifm-color-emphasis-300);
          background: var(--ifm-background-surface-color);
          color: var(--ifm-font-color-base);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .agenda-seos-toggle-filtro.is-destaque {
          border-color: #245c3f;
          color: #245c3f;
          background: rgba(36, 92, 63, 0.08);
        }

        .agenda-seos-painel-filtros {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 0.85rem 1rem;
          margin-bottom: 1.25rem;
          border-radius: 10px;
          border: 1px solid var(--ifm-color-emphasis-200);
          background: var(--ifm-background-surface-color);
        }

        .agenda-seos-filtros {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .agenda-seos-chip {
          padding: 0.38rem 0.78rem;
          border-radius: 999px;
          border: 1px solid var(--ifm-color-emphasis-300);
          background: transparent;
          color: var(--ifm-font-color-base);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .agenda-seos-chip.is-ativo {
          background: #245c3f;
          border-color: #245c3f;
          color: #ffffff;
        }

        .agenda-seos-limpar-filtro {
          border: none;
          background: transparent;
          color: #245c3f;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .agenda-seos-lista {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 14px;
        }

        .agenda-seos-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--ifm-color-emphasis-200);
          border-radius: 10px;
          padding: 1rem 1.15rem;
          background: var(--ifm-card-background-color, var(--ifm-background-surface-color));
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .agenda-seos-card-topo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 0.65rem;
          flex-wrap: wrap;
        }

        .agenda-seos-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.22rem 0.58rem;
          border-radius: 6px;
          background: rgba(36, 92, 63, 0.12);
          color: #245c3f;
        }

        .agenda-seos-data {
          font-size: 0.85rem;
          color: var(--ifm-color-emphasis-700);
        }

        .agenda-seos-titulo {
          font-size: clamp(1rem, 2.5vw, 1.12rem);
          line-height: 1.35;
          margin: 0 0 0.55rem;
        }

        .agenda-seos-descricao {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--ifm-font-color-base);
          margin: 0 0 0.65rem;
        }

        .agenda-seos-metadados {
          font-size: 0.82rem;
          line-height: 1.4;
          color: var(--ifm-color-content-secondary);
          margin: 0 0 0.85rem;
        }

        .agenda-seos-rodape {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-top: 0.75rem;
          border-top: 1px solid var(--ifm-color-emphasis-100);
          font-size: 0.85rem;
        }

        .agenda-seos-responsavel {
          color: var(--ifm-color-emphasis-700);
        }

        .agenda-seos-link {
          font-weight: 600;
          color: #245c3f;
          text-decoration: none;
          white-space: nowrap;
        }

        .agenda-seos-link:hover {
          text-decoration: underline;
        }

        .agenda-seos-mais {
          display: flex;
          justify-content: center;
          margin-top: 1.25rem;
        }

        .agenda-seos-btn-mais {
          padding: 0.55rem 1.2rem;
          border-radius: 8px;
          border: 1px solid #245c3f;
          background: transparent;
          color: #245c3f;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .agenda-seos-btn-mais:hover {
          background: #245c3f;
          color: #ffffff;
        }

        .agenda-seos-box {
          padding: 1rem 1.25rem;
          border-radius: 8px;
          border: 1px solid var(--ifm-color-emphasis-200);
          background: var(--ifm-background-surface-color);
        }

        .agenda-seos-erro {
          border-color: #c62828;
          color: #c62828;
        }

        @media screen and (max-width: 768px) {
          .agenda-seos-lista {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .agenda-seos-card {
            padding: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
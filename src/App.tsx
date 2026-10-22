import { useMemo, useState, type ReactNode } from "react";

type IconName =
  | "activity"
  | "alert"
  | "camera"
  | "check"
  | "chevron"
  | "clock"
  | "download"
  | "flag"
  | "gauge"
  | "pause"
  | "play"
  | "ruler"
  | "scan"
  | "spark"
  | "target";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    activity: <path d="M3 12h4l2.2-7 4.1 14 2.2-7H21" />,
    alert: (
      <>
        <path d="M10.3 3.7 2.5 17.2A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.8L13.7 3.7a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    camera: (
      <>
        <path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z" />
        <circle cx="12" cy="12.5" r="3.5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4m0 1h11l-2 3 2 3H5" />
      </>
    ),
    gauge: (
      <>
        <path d="M4.9 19a9 9 0 1 1 14.2 0" />
        <path d="m12 13 4-4" />
      </>
    ),
    pause: (
      <>
        <path d="M8 5v14M16 5v14" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    ruler: (
      <>
        <path d="m4 16 12-12 4 4L8 20l-4-4Z" />
        <path d="m13 7 2 2m-5 1 2 2m-5 1 2 2" />
      </>
    ),
    scan: (
      <>
        <path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3M4 16v3a1 1 0 0 0 1 1h3m8 0h3a1 1 0 0 0 1-1v-3" />
        <path d="M7 12h10" />
      </>
    ),
    spark: <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Zm7 13 .5 2 .5-2 2-.5-2-.5-.5-2-.5 2-2 .5 2 .5Z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name]}
      </g>
    </svg>
  );
}

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
};

function Button({ children, className = "", onClick, title }: ButtonProps) {
  return (
    <button className={`button ${className}`} onClick={onClick} title={title} type="button">
      {children}
    </button>
  );
}

const initialDefects = [
  { time: "14:32:18", meter: "842,15 m", type: "Mancha de Óleo", kind: "oil" },
  { time: "14:15:04", meter: "412,80 m", type: "Fio Puxado", kind: "thread" },
  { time: "13:58:41", meter: "126,42 m", type: "Variação de Trama", kind: "weave" },
];

const kpis = [
  { label: "Metragem total", value: "842", unit: "m", icon: "ruler" as IconName, tone: "neutral" },
  { label: "Total de defeitos", value: "3", unit: "detectados", icon: "target" as IconName, tone: "danger" },
  { label: "Taxa de aprovação", value: "99.6", unit: "%", icon: "check" as IconName, tone: "success" },
  { label: "Velocidade", value: "114", unit: "m/min", icon: "gauge" as IconName, tone: "warning" },
];

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [sensitivity, setSensitivity] = useState(78);
  const [manualDefect, setManualDefect] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const statusText = isEmergency
    ? "PARADA DE EMERGÊNCIA"
    : isPaused
      ? "INSPEÇÃO PAUSADA"
      : "EM OPERAÇÃO · 114 m/min";

  const statusTone = isEmergency ? "danger" : isPaused ? "warning" : "success";
  const sensitivityLabel = useMemo(() => {
    if (sensitivity < 45) return "Baixa";
    if (sensitivity < 75) return "Média";
    return "Alta";
  }, [sensitivity]);

  function togglePause() {
    if (isEmergency) return;
    setIsPaused((current) => !current);
  }

  function toggleEmergency() {
    setIsEmergency((current) => !current);
    setIsPaused(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">
            <Icon name="scan" size={24} />
          </div>
          <div>
            <div className="eyebrow">INCOWAF / VISÃO COMPUTACIONAL</div>
            <div className="brand-title">Controle de Qualidade</div>
          </div>
        </div>

        <div className="status-cluster">
          <div className={`system-status ${statusTone}`}>
            <span className="status-dot" />
            <div>
              <span className="status-label">Status do sistema</span>
              <strong>{statusText}</strong>
            </div>
          </div>
          <div className="production-id">
            <div>
              <span>Bobina atual</span>
              <strong>#104-B</strong>
            </div>
            <i />
            <div>
              <span>Linha</span>
              <strong>Produção 01</strong>
            </div>
          </div>
        </div>

        <Button
          className={`emergency-button ${isEmergency ? "active" : ""}`}
          onClick={toggleEmergency}
          title="Acionar parada de emergência"
        >
          <span className="emergency-icon">
            {isEmergency ? <Icon name="play" size={19} /> : <Icon name="pause" size={19} />}
          </span>
          <span>
            <small>{isEmergency ? "RETOMAR SISTEMA" : "EMERGÊNCIA"}</small>
            <b>{isEmergency ? "LIBERAR LINHA" : "PARAR LINHA"}</b>
          </span>
        </Button>
      </header>

      <section className="workspace">
        <section className="monitor-panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">
                <Icon name="camera" size={15} />
                INSPEÇÃO AO VIVO
              </span>
              <h1>Feed da câmera principal</h1>
            </div>
            <div className="live-indicator">
              <span />
              CAM 01 · LIVE
            </div>
          </div>

          <div className={`camera-feed ${isPaused || isEmergency ? "paused" : ""}`}>
            <div className="camera-grid" />
            <div className="feed-vignette" />
            <div className="machine-rail rail-top">
              <span />
              <span />
              <span />
            </div>
            <div className="elastic-belt">
              <div className="belt-edge belt-edge-top" />
              <div className="belt-texture" />
              <div className="belt-edge belt-edge-bottom" />
              <div className="oil-mark" />
              <div className="pulled-thread" />
            </div>
            <div className="machine-rail rail-bottom">
              <span />
              <span />
              <span />
            </div>
            <div className="scan-line" />

            <div className="defect-box defect-red">
              <span className="box-corner top-left" />
              <span className="box-corner top-right" />
              <span className="box-corner bottom-left" />
              <span className="box-corner bottom-right" />
              <div className="defect-label">
                <strong>Mancha de Óleo</strong>
                <span>Confiança 98%</span>
              </div>
            </div>
            <div className="defect-box defect-yellow">
              <span className="box-corner top-left" />
              <span className="box-corner top-right" />
              <span className="box-corner bottom-left" />
              <span className="box-corner bottom-right" />
              <div className="defect-label">
                <strong>Fio Puxado</strong>
                <span>Confiança 92%</span>
              </div>
            </div>

            <div className="feed-metadata">
              <div>
                <span>Metragem</span>
                <strong>842.15 m</strong>
              </div>
              <i />
              <div>
                <span>Câmera</span>
                <strong>120 FPS</strong>
              </div>
            </div>

            <div className="feed-model">
              <Icon name="spark" size={14} />
              INCOWAF-CV v2.4
            </div>

            {(isPaused || isEmergency) && (
              <div className="feed-paused">
                <div className={isEmergency ? "danger" : "warning"}>
                  <Icon name={isEmergency ? "alert" : "pause"} size={24} />
                </div>
                <strong>{isEmergency ? "LINHA INTERROMPIDA" : "INSPEÇÃO PAUSADA"}</strong>
                <span>{isEmergency ? "Aguardando liberação manual" : "Feed congelado em 842,15 m"}</span>
              </div>
            )}
          </div>

          <div className="monitor-statusbar">
            <div><span className="good-dot" /> Iluminação calibrada</div>
            <div><Icon name="activity" size={15} /> Latência <strong>8.3 ms</strong></div>
            <div><Icon name="target" size={15} /> Limiar <strong>{sensitivity}%</strong></div>
          </div>
        </section>

        <aside className="side-panel">
          <section className="kpi-grid" aria-label="Indicadores de produção">
            {kpis.map((kpi) => (
              <article className={`kpi-card ${kpi.tone}`} key={kpi.label}>
                <div className="kpi-topline">
                  <span>{kpi.label}</span>
                  <div className="kpi-icon"><Icon name={kpi.icon} size={17} /></div>
                </div>
                <div className="kpi-value">
                  <strong>{kpi.value}</strong>
                  <span>{kpi.unit}</span>
                </div>
                <div className="kpi-trend">
                  {kpi.tone === "danger" ? "↑ 1 na última hora" : kpi.tone === "success" ? "↑ 0.2% vs. anterior" : "Bobina #104-B"}
                </div>
              </article>
            ))}
          </section>

          <section className="history-panel">
            <div className="history-header">
              <div>
                <span className="section-kicker"><Icon name="clock" size={14} /> REGISTRO</span>
                <h2>Histórico de defeitos</h2>
              </div>
              <span className="count-badge">{initialDefects.length + (manualDefect ? 1 : 0)} eventos</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Horário</th>
                    <th>Metragem</th>
                    <th>Tipo de defeito</th>
                    <th>Captura</th>
                  </tr>
                </thead>
                <tbody>
                  {manualDefect && (
                    <tr className="new-row">
                      <td className="mono">14:34:02</td>
                      <td className="mono">842,32 m</td>
                      <td><span className="defect-type manual">Manual</span></td>
                      <td><div className="thumbnail manual-thumb"><Icon name="flag" size={14} /></div></td>
                    </tr>
                  )}
                  {initialDefects.map((defect) => (
                    <tr key={`${defect.time}-${defect.meter}`}>
                      <td className="mono">{defect.time}</td>
                      <td className="mono">{defect.meter}</td>
                      <td><span className={`defect-type ${defect.kind}`}>{defect.type}</span></td>
                      <td><div className={`thumbnail ${defect.kind}`}><span /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button className="history-link">
              Ver registro completo
              <Icon name="chevron" size={15} />
            </Button>
          </section>
        </aside>
      </section>

      <footer className="operation-bar">
        <div className="sensitivity-control">
          <div className="control-icon"><Icon name="spark" size={20} /></div>
          <div className="control-copy">
            <span>Sensibilidade da IA</span>
            <strong>{sensitivityLabel} · {sensitivity}%</strong>
          </div>
          <input
            aria-label="Sensibilidade da inteligência artificial"
            max="100"
            min="0"
            onChange={(event) => setSensitivity(Number(event.target.value))}
            style={{ "--range-value": `${sensitivity}%` } as React.CSSProperties}
            type="range"
            value={sensitivity}
          />
          <div className="range-labels"><span>MENOS</span><span>MAIS</span></div>
        </div>

        <div className="operation-actions">
          <Button className={`action-button pause-action ${isPaused ? "active" : ""}`} onClick={togglePause}>
            <Icon name={isPaused ? "play" : "pause"} size={19} />
            {isPaused ? "Retomar inspeção" : "Pausar inspeção"}
          </Button>
          <Button
            className={`action-button flag-action ${manualDefect ? "active" : ""}`}
            onClick={() => setManualDefect(true)}
          >
            <Icon name={manualDefect ? "check" : "flag"} size={19} />
            {manualDefect ? "Defeito sinalizado" : "Sinalizar defeito manual"}
          </Button>
          <Button
            className={`action-button report-action ${reportReady ? "active" : ""}`}
            onClick={() => setReportReady(true)}
          >
            <Icon name={reportReady ? "check" : "download"} size={19} />
            {reportReady ? "Relatório gerado" : "Gerar relatório da bobina"}
          </Button>
        </div>
      </footer>
    </main>
  );
}

import './Execchef.css'

const appLaunchers = [
    {
        name: 'Recipe Browser',
        description: 'Search recipes, manage details, and keep the kitchen catalog moving.',
        href: 'http://localhost:5173/',
        accent: '#facc15',
        accentSoft: 'rgba(250, 204, 21, 0.18)',
        glyph: 'RB',
    },
    {
        name: 'Feedback Dash',
        description: 'Review guest feedback and submissions in a focused dashboard.',
        href: 'http://localhost:5174/',
        accent: '#a855f7',
        accentSoft: 'rgba(168, 85, 247, 0.18)',
        glyph: 'FD',
    },
    {
        name: 'Ops Server',
        description: 'Backend services, data, and support systems for the suite. Start this one from the terminal.',
        href: null,
        accent: '#94a3b8',
        accentSoft: 'rgba(148, 163, 184, 0.18)',
        glyph: 'OS',
    },
]

function App() {
    return (
        <main className="suite-shell">
            <div className="suite-backdrop" aria-hidden="true" />

            <section className="suite-hero">
                <div className="suite-copy">
                    <p className="suite-eyebrow">ExecChef Suite</p>
                    <h1>One landing page for the whole foodservice stack.</h1>
                    <p className="suite-summary">
                        A darker, card-based home screen that matches the recipe-browser app and makes
                        each product feel like a launchable part of the same system.
                    </p>
                </div>

                <div className="suite-summary-card" aria-label="Suite overview">
                    <div className="suite-summary-header">
                        <span className="suite-chip">Stacked apps</span>
                        <span className="suite-chip muted">Live launchers</span>
                    </div>

                    <div className="suite-launcher-stack" aria-hidden="true">
                        {appLaunchers.map((app, index) => (
                            <span
                                key={app.name}
                                className="stack-pill"
                                style={{
                                    '--stack-accent': app.accent,
                                    '--stack-soft': app.accentSoft,
                                    '--stack-offset': `${index * 14}px`,
                                }}
                            >
                                <span className="stack-pill-icon">{app.glyph}</span>
                            </span>
                        ))}
                    </div>

                    <p className="suite-summary-note">
                        Use the buttons below to jump into each app without losing the suite identity.
                    </p>
                </div>
            </section>

            <section className="launcher-section" aria-labelledby="launcher-heading">
                <div className="launcher-heading">
                    <p className="suite-eyebrow">Launchers</p>
                    <h2 id="launcher-heading">Pick an app</h2>
                </div>

                <div className="launcher-grid">
                    {appLaunchers.map((app) => (
                        app.href ? (
                            <a
                                key={app.name}
                                className="launcher-card"
                                href={app.href}
                                style={{
                                    '--card-accent': app.accent,
                                    '--card-accent-soft': app.accentSoft,
                                }}
                            >
                                <span className="launcher-stack" aria-hidden="true">
                                    <span className="launcher-icon icon-back" />
                                    <span className="launcher-icon icon-mid" />
                                    <span className="launcher-icon icon-front">{app.glyph}</span>
                                </span>

                                <span className="launcher-copy">
                                    <span className="launcher-name">{app.name}</span>
                                    <span className="launcher-description">{app.description}</span>
                                </span>

                                <span className="launcher-arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        ) : (
                            <button
                                key={app.name}
                                className="launcher-card launcher-card-disabled"
                                type="button"
                                disabled
                                aria-disabled="true"
                                title="Start this app from the terminal"
                                style={{
                                    '--card-accent': app.accent,
                                    '--card-accent-soft': app.accentSoft,
                                }}
                            >
                                <span className="launcher-stack" aria-hidden="true">
                                    <span className="launcher-icon icon-back" />
                                    <span className="launcher-icon icon-mid" />
                                    <span className="launcher-icon icon-front">{app.glyph}</span>
                                </span>

                                <span className="launcher-copy">
                                    <span className="launcher-name">{app.name}</span>
                                    <span className="launcher-description">{app.description}</span>
                                </span>

                                <span className="launcher-arrow launcher-arrow-muted" aria-hidden="true">
                                    ⌁
                                </span>
                            </button>
                        )
                    ))}
                </div>
            </section>

            <footer className="suite-footer">
                <p>ExecChef is built as a suite of focused tools for foodservice operations.</p>
                <p>React + Vite landing page with a recipe-browser inspired visual system.</p>
            </footer>
        </main>
    )
}

export default App
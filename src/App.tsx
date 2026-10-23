import { useEffect, useState, type ReactNode, type CSSProperties } from "react"
import kitProduto from "./assets/kit-produto.png"

type Page = "home" | "how" | "discover" | "profile" | "inspiration" | "prepare" | "letters" | "membership" | "auth" | "account" | "help" | "dashboard"
type IconName = "arrow" | "menu" | "close" | "heart" | "pen" | "mail" | "check" | "shield" | "globe" | "user" | "clock" | "spark" | "box"

const photos = {
  stationery: kitProduto,
  portrait1:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=88",
  portrait2:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=88",
  portrait3:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=88",
}

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    pen: (
      <>
        <path d="m12 19 7-7 3 3-7 7-4 1 1-4Z" />
        <path d="m18 13-7-7-8 8v3h3l8-8" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    shield: <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    spark: (
      <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" />
    ),
    box: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "outline" | "text" | "light"
  type?: "button" | "submit"
  className?: string
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
function Heading({
  children,
  as = "h2",
  className = "",
  style,
}: {
  children: ReactNode
  as?: "h1" | "h2" | "h3" | "h4"
  className?: string
  style?: CSSProperties
}) {
  const T = as
  return (
    <T className={`heading ${className}`} style={style}>
      {children}
    </T>
  )
}
function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} />
    </label>
  )
}
function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>
}

const navItems: { label: string page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Como funciona", page: "how" },
  { label: "Assinatura", page: "discover" },
  { label: "", page: "membership" },
]
function Nav({
  page,
  go,
  className = "",
}: {
  page: Page
  go: (p: Page) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`nav ${className}`}>
      <nav
        className={open ? "nav-links open" : "nav-links"}
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <button
            key={item.page}
            className={page === item.page ? "active" : ""}
            onClick={() => {
              go(item.page)
              setOpen(false)
            }}
          >
            {item.label}
          </button>
        ))}
        <button onClick={() => go("auth")}>Log in</button>
        <Button className="btn-selected-large" onClick={() => go("auth")}>
          Criar conta
        </Button>
      </nav>
      <button
        className="menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
    </header>
  )
}
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer>
      <div>
        <div className="brand footer-brand">
          <span className="brand-mark"></span>
          <span></span>
        </div>
        <p>
          More human connection,
          <br />
          one letter at a time.
        </p>
      </div>
      <div>
        <strong>Explore</strong>
        <button onClick={() => go("discover")}></button>
        <button onClick={() => go("membership")}>Monthly kit</button>
        <button onClick={() => go("how")}>How it works</button>
      </div>
      <div>
        <strong>Care</strong>
        <button onClick={() => go("help")}>Safety & privacy</button>
        <button onClick={() => go("help")}>Help center</button>
        <button onClick={() => go("account")}>Account settings</button>
      </div>
      <div className="postcard">
        <span>A note for your inbox</span>
        <p>Occasional prompts, stories and paper things.</p>
        <div>
          <input aria-label="Email address" placeholder="Email address" />
          <button aria-label="Subscribe">
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <small>© 2026 Dearly. A prototype for slower connection.</small>
    </footer>
  )
}

function EnvelopeIntro({ dismiss }: { dismiss: () => void }) {
  const [opening, setOpening] = useState(false)
  useEffect(() => {
    const openingTimer = window.setTimeout(() => setOpening(true), 500)
    const revealTimer = window.setTimeout(dismiss, 3000)
    return () => {
      window.clearTimeout(openingTimer)
      window.clearTimeout(revealTimer)
    }
  }, [dismiss])
  const openEnvelope = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(dismiss, 2500)
  }
  return (
    <div
      className={`intro ${opening ? "is-opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Cartas Vivas"
    >
      <Button variant="text" className="skip" onClick={dismiss}>
        Skip introduction
      </Button>
      <div className="intro-brand">
        <span className="brand-mark">D</span>Dearly
      </div>
      <div className="intro-heading">
        <span className="eyebrow">Tem uma carta esperando por você</span>
        <p>Faça alguém se sentir lembrado, mesmo de longe.</p>
      </div>
      <button
        className="envelope"
        onClick={openEnvelope}
        aria-label="Open the envelope"
      >
        <span className="envelope-back"></span>
        <span className="letter">
          <span>Querido leitor,</span>
          <strong>
            Porque estar conectado é diferente de se sentir perto.
          </strong>
          <b>Uma nova história.</b>
        </span>
        <span className="envelope-flap"></span>
        <span className="envelope-front"></span>
        <span className="heart-seal" aria-hidden="true"></span>
      </button>
      <button className="open-invite" onClick={openEnvelope}>
        {opening ? "Opening your letter…" : "Open the envelope"}{" "}
        {!opening && <Icon name="arrow" size={17} />}
      </button>
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow?: string
  title: string
  copy?: string
  center?: boolean
}) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading>{title}</Heading>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function KitPromo({ go }: { go: (p: Page) => void }) {
  return (
    <section className="kit-promo">
      <div>
        <div className="kit-promo-img">
          <img src={kitProduto} alt="Kit de papelaria Cartas Vivas" />
        </div>
        <div>
          <SectionHead title="Tudo que você precisa em um kit" />
          <p>
            Receba na sua casa um kit mensalmente contendo os itens de papelaria
            necessários para escrever cartas criativas.&nbsp;&nbsp;
          </p>
          <div className="price">
            <strong>RS 50</strong>
            <span style={{ fontSize: "20px" }}> Por mês </span>
          </div>
          <Button
            className="btn-selected-large"
            onClick={() => go("membership")}
          >
            Vire um membro!
          </Button>
        </div>
      </div>
    </section>
  )
}

function Home({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <main className="home-main">
        <section className="hero">
          <div className="hero-copy">
            <span className="pill home-hero-pill">
              Menos tela.  Mais conexão.
            </span>
            <Heading as="h1">
              <em>Cartas Vivas</em>
            </Heading>
            <div className="actions">
              <Button
                className="btn-selected-large"
                onClick={() => go("inspiration")}
              >
                Escrever uma carta
              </Button>
            </div>
            <span className="tiny-note">
              Sem respostas imediatas. Sem feed infinito. Apenas algo real.
            </span>
          </div>
        </section>
        <section className="marquee" aria-label="Dearly values">
          <span>Thoughtful discovery</span>
          <i>✦</i>
          <span>Beautiful stationery</span>
          <i>✦</i>
          <span>Written by hand</span>
          <i>✦</i>
          <span>Sent by you</span>
        </section>
        <section className="idea">
          <div className="idea-grid"></div>
        </section>
        <section className="steps-preview">
          <div className="steps-row">
            {[
              [
                "user",
                "Find someone",
                "Explore introductions shaped around interests, not popularity.",
              ],
              [
                "heart",
                "Choose to connect",
                "Send a thoughtful invitation. They choose whether to accept.",
              ],
              [
                "box",
                "Receive your kit",
                "We send beautiful paper, envelopes and a creative extra.",
              ],
              [
                "mail",
                "Write & send",
                "You write by hand, add postage and mail it yourself.",
              ],
            ].map((s, i) => (
              <article key={s[1]}>
                <span className="step-no">0{i + 1}</span>
                <Icon name={s[0] as IconName} size={30} />
                <Heading as="h3">{s[1]}</Heading>
                <p>{s[2]}</p>
              </article>
            ))}
          </div>
          <Button variant="outline" onClick={() => go("how")}>
            See how Dearly works <Icon name="arrow" />
          </Button>
        </section>
        <KitPromo go={go} />
        <section className="why">
          <div className="why-grid">
            <article>
              <span className="big-serif">20</span>
              <small>minutes away from your screen</small>
              <p>Writing by hand slows thought down enough to notice it.</p>
            </article>
            <article>
              <Icon name="globe" size={54} />
              <small>A window into another life</small>
              <p>
                Exchange perspectives, traditions and ordinary details across
                distance.
              </p>
            </article>
            <article>
              <span className="big-serif">∞</span>
              <small>Ways to make it yours</small>
              <p>
                Draw, collage, press a flower, or simply fill the page with
                honest words.
              </p>
            </article>
          </div>
        </section>
        <section className="final-cta">
          <span className="script">Ready when you are</span>
          <div className="actions">
            <Button variant="light" onClick={() => go("discover")}>
              Discover people <Icon name="arrow" />
            </Button>
            <Button variant="text" onClick={() => go("inspiration")}>
              Start with someone you know
            </Button>
          </div>
        </section>
      </main>
      <Footer go={go} />
    </>
  )
}

function How({ go }: { go: (p: Page) => void }) {
  const steps = [
    [
      "01",
      "Discover",
      "Browse warm, privacy-conscious introductions. Filter by interests, languages, and the kind of exchange you hope to have.",
    ],
    [
      "02",
      "Connect",
      "Send a considered invitation. Only when both people say yes do we help you take the next step—no public contact details.",
    ],
    [
      "03",
      "Create",
      "Use your own paper or receive the monthly Dearly kit. Prompts are there when the blank page feels a little too blank.",
    ],
    [
      "04",
      "Send it yourself",
      "Address, stamp, and post your letter. Mark it sent in Dearly so your new correspondent knows to keep an eye out.",
    ],
  ]
  return (
    <PageShell
      eyebrow="How Dearly works"
      title="Four small steps. One meaningful exchange."
      intro="The digital part helps you find each other. The important part happens away from the screen."
      go={go}
    >
      <div className="process">
        {steps.map((s, i) => (
          <article key={s[0]} className={i % 2 ? "reverse" : ""}>
            <div className="process-visual">
              <span>{s[0]}</span>
              <Icon
                name={(["globe", "heart", "pen", "mail"] as IconName[])[i]}
                size={64}
              />
            </div>
            <div>
              <span className="eyebrow">Step {s[0]}</span>
              <Heading as="h2">{s[1]}</Heading>
              <p>{s[2]}</p>
              {i === 3 && (
                <div className="notice">
                  <Icon name="shield" />
                  <span>
                    <b>You stay in control.</b> Dearly never mails letters for
                    you and doesn’t confirm delivery.
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="page-cta">
        <Heading>Start where you are.</Heading>
        <p>Meet someone new, or write to someone already in your life.</p>
        <div className="actions">
          <Button onClick={() => go("discover")}>Discover people</Button>
          <Button variant="outline" onClick={() => go("inspiration")}>
            Create a letter
          </Button>
        </div>
      </div>
    </PageShell>
  )
}

const people = [
  {
    name: "Maya",
    place: "Lisbon, Portugal",
    img: photos.portrait1,
    tags: ["Urban gardens", "Poetry", "Slow travel"],
    quote:
      "I’d love to trade ordinary stories about our cities—the café you always pass, the tree outside your window.",
  },
  {
    name: "Noor",
    place: "Amman, Jordan",
    img: photos.portrait2,
    tags: ["Ceramics", "Food culture", "Arabic"],
    quote:
      "Tell me what your family cooks when everyone comes home. I’ll send a recipe in return.",
  },
  {
    name: "Elias",
    place: "Copenhagen, Denmark",
    img: photos.portrait3,
    tags: ["Architecture", "Jazz", "Sketching"],
    quote:
      "I collect small observations and draw buildings badly. Looking for a thoughtful monthly exchange.",
  },
]
function Discover({ go }: { go: (p: Page) => void }) {
  return (
    <PageShell
      eyebrow="Discover people"
      title="Find a story you'd like to know."
      intro="Introductions are about interests and intentions—not follower counts. Personal details stay private until both people choose to connect."
      go={go}
    >
      <div className="filter-bar">
        <button className="filter active">All interests</button>
        <button className="filter">Arts & making</button>
        <button className="filter">Culture & place</button>
        <button className="filter">Books & ideas</button>
        <button className="filter">Languages</button>
        <button className="filter">More filters</button>
      </div>
      <div className="profile-grid">
        {people.map((p, i) => (
          <article className="profile-card" key={p.name}>
            <div className="profile-image">
              <img src={p.img} alt={`${p.name} in ${p.place}`} />
              <span>Open to letters</span>
            </div>
            <div className="profile-body">
              <div>
                <Heading as="h3">{p.name}</Heading>
                <span className="location">
                  <Icon name="globe" size={15} />
                  {p.place}
                </span>
              </div>
              <p>“{p.quote}”</p>
              <div className="tag-row">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
              <Button
                variant={i === 0 ? "primary" : "outline"}
                onClick={() => go("profile")}
              >
                Read introduction <Icon name="arrow" />
              </Button>
            </div>
          </article>
        ))}
      </div>
      <p className="responsibility">
        <Icon name="shield" /> Dearly is for meaningful correspondence. Never
        share financial information, and use our reporting tools if anything
        feels wrong.
      </p>
    </PageShell>
  )
}

function Profile({ go }: { go: (p: Page) => void }) {
  return (
    <PageShell
      eyebrow="Member introduction"
      title="Meet Maya."
      intro="A gardener, museum wanderer and careful observer in Lisbon."
      go={go}
    >
      <div className="profile-page">
        <aside>
          <img src={photos.portrait1} alt="Portrait of Maya" />
          <div className="profile-facts">
            <span>
              <Icon name="globe" /> Lisbon, Portugal
            </span>
            <span>
              <Icon name="clock" /> Hopes to write monthly
            </span>
            <span>
              <Icon name="mail" /> Writes in English & Portuguese
            </span>
          </div>
        </aside>
        <article className="intro-letter">
          <span className="script">Hello from Lisbon</span>
          <Heading as="h2">
            “I notice places through the people who care for them.”
          </Heading>
          <p>
            I’m Maya. Most weekends I’m either helping at our neighborhood
            garden or taking a very long way home with my camera. I’d love to
            exchange letters about small rituals, changing seasons, and the
            quiet corners of where we live.
          </p>
          <p>
            I’m especially curious about what “home” means in different places.
            Your letter doesn’t need to be polished—I’d rather it be true.
          </p>
          <div className="tag-row">
            <Pill>Urban gardens</Pill>
            <Pill>Poetry</Pill>
            <Pill>Photography</Pill>
            <Pill>Slow travel</Pill>
          </div>
          <div className="connection-box">
            <Icon name="shield" />
            <div>
              <b>Privacy first</b>
              <p>
                Your mailing address is never public. If you both agree to
                correspond, each person chooses how to share delivery details.
              </p>
            </div>
          </div>
          <Button onClick={() => go("inspiration")}>
            Invite Maya to correspond <Icon name="heart" />
          </Button>
        </article>
      </div>
    </PageShell>
  )
}

function Inspiration({ go }: { go: (p: Page) => void }) {
  const [prompt, setPrompt] = useState(0)
  const prompts = [
    "Conte a eles sobre o seu último sonho",
    "Describe an ordinary ritual that makes your day better.",
    "What is something your corner of the world does beautifully?",
  ]
  return (
    <DashboardShell current="inspiration" go={go}>
      <div className="workspace-head">
        <div>
          <span className="eyebrow"></span>
          <Heading as="h1">Inspirações de escrita</Heading>
          <p>
            Um ambiente para organizar os seus pensamentos. Nada aqui é enviado
            para ninguém.      
          </p>
        </div>
        <span className="script">Take your time</span>
      </div>
      <div className="inspire-grid">
        <article
          className="prompt-card"
          style={{ backgroundColor: "rgb(220,230,239)" }}
        >
          <span style={{ color: "rgb(101,0,0)", fontSize: "20px" }}>
            Ideia de hoje:
          </span>
          <Heading
            as="h2"
            style={{ color: "rgb(101,0,0)", fontWeight: 700, fontSize: "55px" }}
          >
            {prompts[prompt]}
          </Heading>
          <button
            style={{ color: "rgb(101,0,0)" }}
            onClick={() => setPrompt((prompt + 1) % prompts.length)}
          >
            Tente outra ideia <Icon name="arrow" />
          </button>
        </article>
        <article className="prep-card">
          <Heading as="h3" style={{ fontWeight: 700, fontSize: "30px" }}>
            Um ritual de escrita
          </Heading>
          {[
            "Escolha um lugar confortável",
            "Se distancie do celular",
            "Faça uma bebida do seu gosto",
            "Escreva por 20 minutos seguidos",
          ].map((x) => (
            <label
              key={x}
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <span>{x}</span>
            </label>
          ))}
        </article>
        <article className="wide-card">
          <div>
            <span className="eyebrow">Escrevendo para alguém especial</span>
            <Heading as="h2" style={{ color: "rgb(101,0,0)" }}>
              Pequenas ideias para começar
            </Heading>
          </div>
          <div className="thread-list">
            <span style={{ fontSize: "15px" }}>
              01 Um lugar que te faz sentir em casa{" "}
              <span className="fg-inline-bold"> </span>
            </span>
            <span style={{ fontSize: "15px" }}>
              02 Algo que esteja crescendo em você{" "}
              <span className="fg-inline-bold"> </span>
            </span>
            <span style={{ fontSize: "15px" }}>
              03{" "}
              <span className="fg-inline-bold">
                Uma pergunta que somente essa pessoa pode responder
              </span>
            </span>
          </div>
          <Button onClick={() => go("prepare")}>
            Estou pronto para preparar a minha carta!
          </Button>
        </article>
      </div>
    </DashboardShell>
  )
}

function Prepare({ go }: { go: (p: Page) => void }) {
  const [sent, setSent] = useState(false)
  return (
    <DashboardShell current="prepare" go={go}>
      <div className="workspace-head">
        <div>
          <span className="eyebrow">Prepare a carta</span>
          <Heading as="h1">Toques finais</Heading>
          <p>
            Você é o responsável por colocar o endereço na carta e enviar ao
            correio.{" "}
          </p>
        </div>
      </div>
      <div className="send-layout">
        <div className="timeline">
          {[
            ["check", "Finalize a sua carta", ""],
            ["check", "Coloque o endereço do destinatário", ""],
            ["check", "Leve ao Correio", ""],
            [sent ? "check" : "mail", "E pronto!", ""],
          ].map((s, i) => (
            <article className={i < 3 || sent ? "done" : ""} key={s[1]}>
              <span>
                <Icon name={s[0] as IconName} />
              </span>
              <div>
                <Heading as="h3">{s[1]}</Heading>
                <p>{s[2]}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="status-card">
          <span className="eyebrow">Letter to Maya</span>
          <div className="mini-envelope">
            <span></span>
          </div>
          <Heading as="h2">
            {sent ? "On its way" : "Pronto pra enviar?"}
          </Heading>
          <p>
            {sent
              ? "Marked sent today. Delivery times vary, especially across borders."
              : ""}
          </p>
          <Button onClick={() => setSent(!sent)}>
            {sent ? "Undo sent status" : "Marque como enviado"}
          </Button>
          <button className="text-link" onClick={() => go("letters")}>
            Ver minhas cartas
          </button>
        </aside>
      </div>
    </DashboardShell>
  )
}

function Letters({ go }: { go: (p: Page) => void }) {
  return (
    <DashboardShell current="letters" go={go}>
      <div className="workspace-head">
        <div>
          <Heading as="h1" style={{color:"rgb(139,0,0)"}}>Suas cartas</Heading>
          <p> Uma forma de lembrar para quem você já enviou as cartas.</p>
        </div>
      </div>
      <div className="stat-row">
        <div>
          <strong>3</strong>
          <span>Correspondencias ativas</span>
        </div>
        <div>
          <strong>7</strong>
          <span>Cartas enviadas</span>
        </div>
        <div>
          <strong>4</strong>
          <span>Cartas recebidas</span>
        </div>
      </div>
      <div className="letters-table">
        <div className="table-head">
          <span>Correspondent</span>
          <span></span>
          <span>Status</span>
          <span></span>
        </div>
        {people.map((p, i) => (
          <div className="table-row" key={p.name}>
            <span className="person-cell">
              <img src={p.img} alt="" />
              <b>{p.name}</b>
              <small>{p.place}</small>
            </span>
            <span>{["", "", ""][i]}</span>
            <span>
              <Pill>{["In the post", "Received", "Writing"][i]}</Pill>
            </span>
            <button aria-label={`Open correspondence with ${p.name}`}>
              <Icon name="arrow" />
            </button>
          </div>
        ))}
      </div>
      <div className="notice">
        <span></span>
      </div>
    </DashboardShell>
  )
}

function Membership({ go }: { go: (p: Page) => void }) {
  return (
    <PageShell
      eyebrow="Monthly membership"
      title="Razões para se tornar assinante"
      intro="Itens de papelaria enviados mensalmente selecionados para inspirar."
      go={go}
    >
      <div className="membership-hero">
        <div className="product-shot">
          <img src={photos.stationery} alt="Monthly Dearly stationery kit" />
        </div>
        <div className="plan-card">
          <span className="script" style={{ fontSize: "60px" }}>
            Plano mensal
          </span>
          <p> Todo mês vem materiais diferentes.</p>
          <div className="price">
            <strong>RS 50</strong>
            <span> Por mês&nbsp;&nbsp;</span>
          </div>
          <Button onClick={() => go("auth")}>Vire membro!</Button>
        </div>
      </div>
      <div className="page-cta olive-bg">
        <Heading>
          A assinatura garante os materiais. Você cria o significado das cartas.{" "}
        </Heading>
        <Button variant="light" onClick={() => go("auth")}>
          Faça sua assinatura
        </Button>
      </div>
    </PageShell>
  )
}

function Auth({ go }: { go: (p: Page) => void }) {
  const [register, setRegister] = useState(true)
  return (
    <>
      <div className="auth-page">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">D</span>
          <span>Dearly</span>
        </button>
        <div className="auth-art">
          <span className="script">A letter can begin anywhere</span>
          <div className="floating-note">
            What have you been meaning to say?
          </div>
        </div>
        <div className="auth-form">
          <span className="eyebrow">
            {register ? "Begin your correspondence" : "Welcome back"}
          </span>
          <Heading as="h1">
            {register
              ? "Create your Dearly account."
              : "Good to see you again."}
          </Heading>
          <p>
            {register
              ? "Discover thoughtful people and make space for handwritten connection."
              : "Your letters and monthly kit are waiting."}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              go("dashboard")
            }}
          >
            {register && (
              <Field
                label="Your name"
                placeholder="How should we address you?"
              />
            )}
            <Field
              label="Email address"
              placeholder="you@example.com"
              type="email"
            />
            <Field
              label="Password"
              placeholder="At least 8 characters"
              type="password"
            />
            {register && (
              <label className="consent">
                <input type="checkbox" required />
                <span>
                  I’m 18 or older and agree to Dearly’s community and privacy
                  guidelines.
                </span>
              </label>
            )}
            <Button type="submit">
              {register ? "Create account" : "Log in"} <Icon name="arrow" />
            </Button>
          </form>
          <button
            className="switch-auth"
            onClick={() => setRegister(!register)}
          >
            {register
              ? "Already have an account? Log in"
              : "New to Dearly? Create an account"}
          </button>
          <button className="text-link" onClick={() => go("help")}>
            Read safety & privacy guidelines
          </button>
        </div>
      </div>
      <KitPromo go={go} />
    </>
  )
}

function Account({ go }: { go: (p: Page) => void }) {
  return (
    <DashboardShell current="account" go={go}>
      <div className="workspace-head">
        <div>
          <span className="eyebrow">Profile & settings</span>
          <Heading as="h1">Your corner of Dearly.</Heading>
          <p>Control what people see and how Dearly keeps in touch.</p>
        </div>
        <Button variant="outline">Save changes</Button>
      </div>
      <div className="settings-grid">
        <section>
          <Heading as="h2">Profile</Heading>
          <Field label="Display name" placeholder="Alex" />
          <Field
            label="Location shown to members"
            placeholder="Bristol, United Kingdom"
          />
          <label className="field">
            <span>Short introduction</span>
            <textarea defaultValue="I like old cinemas, coastal walks and collecting recipes from friends." />
          </label>
        </section>
        <section>
          <Heading as="h2">Privacy</Heading>
          {[
            "Show my profile in Discover",
            "Let people invite me to correspond",
            "Show my city (not my exact address)",
            "Receive occasional product emails",
          ].map((x, i) => (
            <label className="toggle-row" key={x}>
              <span>
                <b>{x}</b>
                <small>
                  {i === 2
                    ? "Your full address is never public."
                    : "You can change this at any time."}
                </small>
              </span>
              <input type="checkbox" defaultChecked={i < 3} />
            </label>
          ))}
        </section>
        <section>
          <Heading as="h2">Membership</Heading>
          <div className="membership-status">
            <Pill>Active</Pill>
            <b>Dearly Monthly</b>
            <span>Next renewal: May 18 · $18 + shipping</span>
            <Button variant="outline" onClick={() => go("membership")}>
              Manage membership
            </Button>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}

function Help({ go }: { go: (p: Page) => void }) {
  const faqs = [
    "How are mailing addresses protected?",
    "What should I do if a letter feels inappropriate?",
    "Does Dearly track my physical letters?",
    "Can I pause a correspondence?",
    "How do international letters work?",
  ]
  return (
    <PageShell
      eyebrow="Safety, privacy & help"
      title="Connection should always feel considered."
      intro="Clear boundaries, practical guidance, and real support whenever you need it."
      go={go}
    >
      <div className="help-grid">
        <aside>
          <Icon name="shield" size={52} />
          <Heading as="h2">Your address is yours.</Heading>
          <p>
            It is never shown on a public profile. You decide whether and how to
            share mailing details after a mutual connection.
          </p>
          <Button variant="outline">Read privacy policy</Button>
        </aside>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={f} open={i === 0}>
              <summary>
                {f}
                <span>+</span>
              </summary>
              <p>
                {i === 0
                  ? "Addresses are not part of public profiles or discovery. Once both people accept a connection, each person can privately choose what delivery information to share. You can remove access and end a correspondence at any time."
                  : "Our help team can guide you. Dearly relies on self-reported updates and cannot guarantee postal delivery or member behavior."}
              </p>
            </details>
          ))}
        </div>
      </div>
      <div className="safety-cards">
        <article>
          <Icon name="shield" />
          <Heading as="h3">Trust your instincts</Heading>
          <p>
            Pause or end any exchange. Report pressure, harassment, requests for
            money, or boundary-crossing behavior.
          </p>
        </article>
        <article>
          <Icon name="user" />
          <Heading as="h3">Keep personal details personal</Heading>
          <p>
            Use a PO box where available and avoid sharing financial, workplace,
            or routine information.
          </p>
        </article>
        <article>
          <Icon name="heart" />
          <Heading as="h3">Write with care</Heading>
          <p>
            Be curious without being intrusive. Respect differences, response
            times, and the right not to continue.
          </p>
        </article>
      </div>
      <div className="page-cta">
        <Heading>Still need a human?</Heading>
        <p>Our support team replies within two working days.</p>
        <Button>Contact support</Button>
      </div>
    </PageShell>
  )
}

function Dashboard({ go }: { go: (p: Page) => void }) {
  return (
    <DashboardShell current="dashboard" go={go}>
      <div className="dashboard-welcome">
        <div>
          <span className="script">Good morning, Alex</span>
          <Heading as="h1">
            What will you put
            <br />
            on paper today?
          </Heading>
          <div className="actions">
            <Button onClick={() => go("inspiration")}>
              Start writing <Icon name="pen" />
            </Button>
            <Button variant="outline" onClick={() => go("discover")}>
              Discover people
            </Button>
          </div>
        </div>
        <div className="mail-summary">
          <span className="eyebrow">Your correspondence</span>
          <div>
            <strong>3</strong>
            <span>
              active
              <br />
              connections
            </span>
          </div>
          <div>
            <strong>1</strong>
            <span>
              letter
              <br />
              in the post
            </span>
          </div>
          <button onClick={() => go("letters")}>
            View all letters <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div className="dash-grid">
        <article className="next-letter">
          <span className="eyebrow">A letter from Noor</span>
          <Heading as="h2">Marked received 8 days ago</Heading>
          <p>When you’re ready, use a prompt or begin on your own.</p>
          <Button variant="light" onClick={() => go("inspiration")}>
            Write back
          </Button>
        </article>
        <article className="kit-tile">
          <Icon name="box" size={38} />
          <span className="eyebrow">May kit</span>
          <Heading as="h3">Field notes</Heading>
          <p>Preparing for dispatch on May 20.</p>
          <button onClick={() => go("membership")}>
            View your kit <Icon name="arrow" />
          </button>
        </article>
        <article className="quote-tile">
          <span className="script">A thought for the page</span>
          <p>
            “Describe the sound of your street before the rest of the world
            wakes up.”
          </p>
        </article>
      </div>
    </DashboardShell>
  )
}

function PageShell({
  eyebrow,
  title,
  intro,
  go,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  go: (p: Page) => void
  children: ReactNode
}) {
  return (
    <>
      <Nav
        page={
          title.includes("Discover")
            ? "discover"
            : title.includes("Four")
              ? "how"
              : title.includes("reason")
                ? "membership"
                : "home"
        }
        go={go}
      />
      <main className="inner-page">
        <header className="page-hero">
          <span className="eyebrow">{eyebrow}</span>
          <Heading as="h1">{title}</Heading>
          <p>{intro}</p>
        </header>
        {children}
        <KitPromo go={go} />
      </main>
      <Footer go={go} />
    </>
  )
}
const dashNav: { label: string page: Page icon: IconName }[] = [
  { label: "Overview", page: "dashboard", icon: "spark" },
  { label: "Discover people", page: "discover", icon: "globe" },
  { label: "Writing inspiration", page: "inspiration", icon: "pen" },
  { label: "Prepare a letter", page: "prepare", icon: "mail" },
  { label: "My letters", page: "letters", icon: "heart" },
  { label: "My monthly kit", page: "membership", icon: "box" },
  { label: "Profile & settings", page: "account", icon: "user" },
]
function DashboardShell({
  current,
  go,
  children,
}: {
  current: Page
  go: (p: Page) => void
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const inspirationLabels: Partial<Record<Page, string>> = {
    discover: "",
    inspiration: "Inspirações",
    prepare: "Prepare a carta",
    letters: "Meus rascunhos",
    membership: "Kit mensal",
    account: "Perfil",
  }
  return (
    <div className="dashboard-shell">
      <aside className={open ? "dash-nav open" : "dash-nav"}>
        <button className="brand" onClick={() => go("home")}>
          {current !== "inspiration" && current !== "prepare" && (
            <span className="brand-mark">D</span>
          )}
          <span>
            {current === "inspiration" || current === "prepare"
              ? "Cartas Vivas"
              : "Dearly"}
          </span>
        </button>
        <nav>
          {dashNav.map((n) => (
            <button
              className={current === n.page ? "active" : ""}
              key={n.page}
              onClick={() => {
                go(n.page)
                setOpen(false)
              }}
            >
              <Icon name={n.icon} />
              <span>
                {current === "inspiration" || current === "prepare"
                  ? (inspirationLabels[n.page] ?? n.label)
                  : n.label}
              </span>
            </button>
          ))}
        </nav>
        <button className="support-link" onClick={() => go("help")}>
          {current !== "inspiration" && current !== "prepare" && (
            <Icon name="shield" />
          )}
          {current === "inspiration" ? "   " : " Safety & help"}
        </button>
        <div className="avatar">
          <span>A</span>
          <div>
            <b>Alex Morgan</b>
            <small>Member since April</small>
          </div>
        </div>
      </aside>
      <button
        className="dash-menu"
        aria-label="Toggle dashboard navigation"
        onClick={() => setOpen(!open)}
      >
        {current !== "inspiration" && <Icon name={open ? "close" : "menu"} />}
      </button>
      <main className="dash-main">
        {children}
        <KitPromo go={go} />
      </main>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>(
    () => location.hash.slice(1) as Page || "home",
  )
  const [intro, setIntro] = useState(true)
  const go = (p: Page) => {
    setPage(p)
    location.hash = p
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const dismiss = () => setIntro(false)
  useEffect(() => {
    const h = () => setPage(location.hash.slice(1) as Page || "home")
    addEventListener("hashchange", h)
    return () => removeEventListener("hashchange", h)
  }, [])
  let content: ReactNode
  switch (page) {
    case "how":
      content = <How go={go} />
      break
    case "discover":
      content = <Discover go={go} />
      break
    case "profile":
      content = <Profile go={go} />
      break
    case "inspiration":
      content = <Inspiration go={go} />
      break
    case "prepare":
      content = <Prepare go={go} />
      break
    case "letters":
      content = <Letters go={go} />
      break
    case "membership":
      content = <Membership go={go} />
      break
    case "auth":
      content = <Auth go={go} />
      break
    case "account":
      content = <Account go={go} />
      break
    case "help":
      content = <Help go={go} />
      break
    case "dashboard":
      content = <Dashboard go={go} />
      break
    default:
      content = (
        <>
          <Nav page="home" go={go} className="home-nav" />
          <Home go={go} />
        </>
      )
  }
  return (
    <>
      {intro && page === "home" && <EnvelopeIntro dismiss={dismiss} />}
      <div className={intro && page === "home" ? "app-hidden" : "app-revealed"}>
        {content}
      </div>
    </>
  )
}

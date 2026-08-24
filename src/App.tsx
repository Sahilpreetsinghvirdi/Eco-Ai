import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Recycle,
  Bot,
  Lightbulb,
  TriangleAlert,
  Trash2,
  Earth,
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
  Check,
  Layers,
  Sprout,
  ShieldCheck,
  FlaskConical,
  Globe,
  Monitor,
  Download,
  Zap,
  Apple,
  BarChart3,
  Database,
  Cpu,
  FileText,
  Package,
  ScanSearch,
  ArrowUpRight,
  Award,
  ExternalLink,
  Box,
  History,
  Atom,
  ClipboardCheck,
} from "lucide-react"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [activeNav, setActiveNav] = useState("home")
  const [mobileMenu, setMobileMenu] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [mockHovered, setMockHovered] = useState(false)
  const [progressHovered, setProgressHovered] = useState(false)

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      const sections = ["home", "what", "features", "software", "how", "about"]
      const scrollPos = window.scrollY + 140
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveNav(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenu(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-[64px] w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold text-[18px] tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-[16px]">🌱</span>
            <span className="hidden sm:inline">
              Sustainability <span className="text-primary">Hub</span>
            </span>
            <span className="sm:hidden">
              SH<span className="text-primary">.</span>
            </span>
            <Badge variant="outline" className="ml-1 hidden rounded-full border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-primary lg:inline-flex">
              ISC 2026
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "what", label: "What It Does" },
              { id: "features", label: "Features" },
              { id: "software", label: "Download" },
              { id: "about", label: "About" },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`rounded-full px-3.5 py-2 text-[13px] transition ${activeNav === n.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button className="hidden md:inline-flex rounded-full px-5" onClick={() => scrollTo("software")}>
              <Download className="size-4" /> Get App
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
              {mobileMenu ? <ShieldCheck className="size-5" /> : <Layers className="size-5" />}
            </Button>
          </div>
        </div>
        {mobileMenu && (
          <div className="border-t bg-background md:hidden">
            <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 p-4">
              {[
                { id: "home", label: "Home" },
                { id: "what", label: "What It Does" },
                { id: "features", label: "Features" },
                { id: "software", label: "Download" },
                { id: "how", label: "How It Works" },
                { id: "about", label: "About ISC 2026" },
              ].map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className={`rounded-xl px-4 py-3 text-left text-sm font-medium ${activeNav === n.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                >
                  {n.label}
                </button>
              ))}
              <Button className="mt-2 w-full rounded-xl" onClick={() => scrollTo("software")}>
                <Download className="size-4" /> Download for Windows
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-transparent to-transparent" />
          <div className="absolute -top-24 right-[-10%] size-[520px] rounded-full bg-primary/10 blur-[90px]" />
          <div className="absolute top-[30%] left-[-10%] size-[420px] rounded-full bg-emerald-300/10 blur-[90px] dark:bg-emerald-900/15" />
        </div>

        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-16 items-start">
          {/* Left - fully responsive */}
          <div className="flex flex-col justify-start pt-2 min-w-0 w-full">
            <Badge variant="secondary" className="mb-4 w-fit gap-1.5 sm:gap-2 rounded-full border bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.06em] sm:tracking-[0.08em] shadow-sm dark:bg-card max-w-full text-center leading-tight">
              <span className="flex size-4 sm:size-5 items-center justify-center rounded-full bg-primary text-[10px] sm:text-[11px] text-white shrink-0"><Award className="size-3" /></span>
              <span className="hidden sm:inline">INDIAN SCIENCE CONGRESS 2026 • OFFICIAL ENTRY</span>
              <span className="sm:hidden">ISC 2026 • OFFICIAL ENTRY</span>
            </Badge>

            <h1 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[50px] font-extrabold leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-br from-primary to-emerald-600 bg-clip-text text-transparent">Sustainability</span> Hub
              <span className="mt-1.5 sm:mt-2 block text-[15px] sm:text-[17px] lg:text-[20px] font-semibold tracking-tight text-muted-foreground">AI that sees waste differently.</span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-[580px] text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed text-muted-foreground">
              The core is simple and powerful — <span className="font-semibold text-foreground">take a photo of any garbage</span> and the hub tells you
              material breakdown by %, toxins & hazard score, everyday uses, eco-alternatives, reuse ideas and <span className="font-semibold text-foreground">exactly where to dispose it</span>.
              Built as a real standalone Windows app (Tauri .exe + .msi) with live Gemini AI.
            </p>

            <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-7 shadow-lg shadow-primary/20 text-[14px] sm:text-[15px] h-11 sm:h-12" onClick={() => scrollTo("software")}>
                <Download className="size-4" /> Download for Windows
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-white dark:bg-card text-[14px] sm:text-[15px] h-11 sm:h-12" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}>
                <GithubIcon className="size-4" /> View on GitHub <ExternalLink className="size-3.5 opacity-60" />
              </Button>
            </div>

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border bg-card px-2.5 sm:px-3 py-1 sm:py-1.5 font-medium">
                <span className="size-1.5 sm:size-2 rounded-full bg-emerald-500 animate-pulse" /> Live Gemini 3.6 Flash
              </span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border bg-card px-2.5 sm:px-3 py-1 sm:py-1.5 font-medium">
                <Monitor className="size-3 sm:size-3.5" /> Tauri v2 • .exe + .msi
              </span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border bg-card px-2.5 sm:px-3 py-1 sm:py-1.5 font-medium">
                <FileText className="size-3 sm:size-3.5" /> Daily Logs
              </span>
            </div>

            <div className="mt-6 sm:mt-7 grid max-w-full sm:max-w-[520px] grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: <Recycle className="size-4 text-primary" />, label: "100%", sub: "Material %" },
                { icon: <TriangleAlert className="size-4 text-amber-600" />, label: "Toxin", sub: "& Hazard" },
                { icon: <Earth className="size-4 text-emerald-600" />, label: "Reuse", sub: "+ Disposal" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border bg-card px-3 py-2.5 sm:py-3 shadow-sm">
                  <div className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">{s.icon}</div>
                  <div className="leading-none min-w-0">
                    <div className="text-sm font-bold truncate">{s.label}</div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground truncate">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual - App mockup - INTERACTIVE 2D - responsive, never out of window */}
          <div className="relative flex items-center justify-center min-w-0 w-full lg:justify-end lg:pl-4">
            <div
              className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[480px] xl:max-w-[560px] mx-auto lg:mx-0 shrink-0"
              onMouseEnter={() => setMockHovered(true)}
              onMouseLeave={() => setMockHovered(false)}
            >
              {/* glow that intensifies on hover - 2D only */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-primary/15 via-emerald-200/15 to-teal-200/15 blur-[1px] transition-all duration-500 dark:from-primary/10 ${mockHovered ? "scale-[1.015] opacity-100" : "scale-100 opacity-80"}`}
              />
              <div className={`pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-br from-primary/20 to-emerald-500/20 blur-2xl transition-opacity duration-500 ${mockHovered ? "opacity-50" : "opacity-0"}`} />

              {/* main card - fixed, only 2D transforms - NO layout shift */}
              <div
                className={`relative overflow-hidden rounded-[28px] border bg-card shadow-2xl transition-all duration-300 will-change-transform isolate ${mockHovered ? "shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] scale-[1.01]" : "shadow-xl scale-100"}`}
              >
                {/* top shimmer on hover */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 ${mockHovered ? "translate-x-[100%] opacity-100" : "-translate-x-[100%] opacity-0"}`} style={{ transform: mockHovered ? "translateX(0)" : "translateX(-100%)" }} />

                {/* window chrome - interactive dots */}
                <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className={`size-3 rounded-full bg-red-400 transition-all duration-300 ${mockHovered ? "scale-110 shadow-[0_0_8px_rgba(248,113,113,0.6)]" : ""}`} />
                      <span className={`size-3 rounded-full bg-yellow-400 transition-all duration-300 delay-75 ${mockHovered ? "scale-110 shadow-[0_0_8px_rgba(251,191,36,0.6)]" : ""}`} />
                      <span className={`size-3 rounded-full bg-emerald-400 transition-all duration-300 delay-100 ${mockHovered ? "scale-110 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : ""}`} />
                    </div>
                    <span className="ml-2 hidden items-center gap-1.5 text-xs font-semibold sm:inline-flex"><Leaf className={`size-3.5 text-primary transition-transform duration-500 ${mockHovered ? "rotate-12 scale-110" : ""}`} /> Sustainability Hub</span>
                  </div>
                  <Badge className={`rounded-full bg-emerald-500 px-2.5 py-0 text-[11px] transition-all duration-300 ${mockHovered ? "scale-105 shadow-md" : ""}`}><span className="size-1.5 rounded-full bg-white animate-pulse" /> Online • Gemini Live</Badge>
                </div>

                {/* mock header */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span className={`flex size-8 items-center justify-center rounded-xl bg-primary text-white transition-all duration-500 ${mockHovered ? "rotate-6 scale-110 shadow-lg shadow-primary/25" : ""}`}><ScanSearch className={`size-4 transition-transform duration-500 ${mockHovered ? "scale-110" : ""}`} /></span>
                      AI Waste Analyzer
                    </div>
                    <span className={`rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary transition-all duration-300 ${mockHovered ? "bg-primary text-white scale-105" : ""}`}>ISC 2026</span>
                  </div>

                  {/* fake upload + result - progress area is hover-sensitive */}
                  <div className="mt-4 grid gap-3">
                    <div
                      className={`rounded-2xl border p-3 transition-all duration-300 ${progressHovered ? "border-primary/30 bg-primary/5 shadow-md" : "bg-muted/30"}`}
                      onMouseEnter={() => setProgressHovered(true)}
                      onMouseLeave={() => setProgressHovered(false)}
                    >
                      <div className="flex gap-3">
                        <div className={`flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-100 text-2xl transition-all duration-500 dark:from-zinc-800 dark:to-zinc-700 ${mockHovered ? "scale-105 shadow-md" : ""} ${progressHovered ? "rotate-3" : ""}`}>🗑️</div>
                        <div className="min-w-0 flex-1">
                          <div className={`h-2 w-3/4 rounded transition-all duration-500 ${progressHovered ? "bg-primary/30 w-[85%]" : "bg-primary/20"}`} />
                          <div className={`mt-2 h-2 rounded transition-all duration-500 delay-75 ${progressHovered ? "w-[65%] bg-primary/20" : "w-1/2 bg-muted"}`} />
                          <div className="mt-3 flex gap-1.5">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white transition-all duration-300 ${progressHovered ? "bg-emerald-600 scale-105 shadow" : "bg-primary"}`}>{progressHovered ? "✓ Complete" : "Analyzing…"}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] transition-all duration-300 ${progressHovered ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 scale-105" : "bg-white dark:bg-card"}`}>82% PET • 12% HDPE</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-700 ease-out"
                          style={{ width: progressHovered ? "100%" : mockHovered ? "88%" : "78%" }}
                        />
                      </div>
                      <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                        <span className={progressHovered ? "text-primary font-medium" : ""}>Gemini 3.6 Flash • 10s</span>
                        <span className={progressHovered ? "text-emerald-600 font-bold" : ""}>{progressHovered ? "100% complete ✓" : mockHovered ? "88% complete" : "78% complete"}</span>
                      </div>
                    </div>

                    {/* Interactive stat cards */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "62%", sub: "Plastic", detail: "0.05kg CO₂ saved", iconBg: "bg-sky-500", icon: "PET", hoverColor: "border-sky-300 bg-sky-50 dark:bg-sky-950/20", glow: "shadow-sky-500/20" },
                        { label: "23%", sub: "Organic", detail: "Compost in 14d", iconBg: "bg-amber-500", icon: <Apple className="size-4" />, hoverColor: "border-amber-300 bg-amber-50 dark:bg-amber-950/20", glow: "shadow-amber-500/20" },
                        { label: "15%", sub: "Recyclable", detail: "→ MRF ₹12/kg", iconBg: "bg-emerald-500", icon: <Recycle className="size-4" />, hoverColor: "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20", glow: "shadow-emerald-500/20" },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredStat(i)}
                          onMouseLeave={() => setHoveredStat(null)}
                          className={`group relative flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-[transform,box-shadow,border-color,background-color] duration-300 cursor-pointer will-change-transform h-[88px] overflow-visible isolate ${hoveredStat === i ? `${stat.hoverColor} scale-[1.04] shadow-md ${stat.glow} z-10` : "bg-white dark:bg-card hover:shadow-sm hover:scale-[1.02]"} `}
                        >
                          <div className={`mx-auto flex size-8 items-center justify-center rounded-xl text-white text-xs transition-all duration-300 ${stat.iconBg} ${hoveredStat === i ? "scale-105 shadow" : "group-hover:scale-105"}`}>{stat.icon}</div>
                          <div className={`mt-1.5 text-sm font-extrabold leading-none transition-colors duration-300 ${hoveredStat === i ? "text-primary" : ""}`}>{stat.label}</div>
                          <div className="text-[11px] leading-none text-muted-foreground mt-1">{stat.sub}</div>
                          {/* fixed placeholder - no layout shift, just crossfade */}
                          <div className="relative mt-1 h-3 w-full flex items-center justify-center">
                            <span className={`absolute text-[10px] font-medium text-primary transition-all duration-300 ${hoveredStat === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>{stat.detail}</span>
                            <span className={`absolute text-[10px] text-muted-foreground transition-all duration-300 ${hoveredStat === i ? "opacity-0 -translate-y-1" : "opacity-0"}`}> </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* hazard card - interactive - fixed height, no layout push, calm */}
                    <div className={`group relative flex flex-col justify-between rounded-2xl border p-3 transition-[border-color,background-color,box-shadow] duration-300 cursor-pointer isolate h-[112px] overflow-hidden ${hoveredStat === 99 ? "border-amber-300 bg-amber-50 shadow-sm dark:bg-amber-950/30" : "bg-amber-50/70 dark:bg-amber-950/20 hover:border-amber-200 hover:shadow-sm"}`} onMouseEnter={() => setHoveredStat(99)} onMouseLeave={() => setHoveredStat(null)}>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300"><TriangleAlert className={`size-3.5 transition-transform duration-300 ${hoveredStat === 99 ? "scale-105 text-amber-600" : "group-hover:scale-105"}`} /> Low hazard • BPA trace <span className={`ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white transition-all duration-300 ${hoveredStat === 99 ? "opacity-100 scale-100" : "opacity-60 group-hover:opacity-100"}`}>Tap to learn</span></div>
                        <div className="mt-1.5 text-[11px] leading-relaxed text-amber-800/80 dark:text-amber-100/70">Rinse & flatten. Dispose in blue bin — Kabadiwala / MRF accepts PET at ₹12–14/kg.</div>
                      </div>
                      <div className={`rounded-xl border bg-white p-2 text-[11px] leading-relaxed shadow-sm dark:bg-card transition-all duration-300 ${hoveredStat === 99 ? "opacity-100 translate-y-0 mt-2" : "opacity-60 translate-y-0 mt-2 group-hover:opacity-100"}`}>
                        💡 <span className="font-semibold">Why?</span> PET is safe at room temp but BPA leaches when heated. Never microwave.
                      </div>
                    </div>
                  </div>

                  {/* bottom chips - interactive */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    {[
                      { top: "~10s", bottom: "Live AI", base: "bg-primary/10 text-primary", hover: "bg-primary text-white shadow-lg shadow-primary/25 scale-105" },
                      { top: ".exe", bottom: "Portable", base: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400", hover: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105" },
                      { top: ".msi", bottom: "Installer", base: "bg-zinc-900 text-white dark:bg-zinc-800", hover: "bg-zinc-700 dark:bg-zinc-700 shadow-lg scale-105" },
                    ].map((chip, i) => (
                      <div key={i} className={`group relative overflow-hidden rounded-2xl py-2.5 font-semibold transition-all duration-300 cursor-pointer ${hoveredStat === 10 + i ? chip.hover : chip.base} ${mockHovered ? "hover:scale-[1.03]" : ""}`} onMouseEnter={() => setHoveredStat(10 + i)} onMouseLeave={() => setHoveredStat(null)}>
                        <div className="relative z-10"><div className="text-base font-extrabold leading-none">{chip.top}</div>{chip.bottom}</div>
                        {hoveredStat === 10 + i && <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_0.8s_ease]" />}
                      </div>
                    ))}
                  </div>
                  <div className="relative h-4 mt-1">
                    <div className={`absolute inset-0 flex items-center justify-center text-[11px] text-muted-foreground transition-all duration-300 ${mockHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}>✨ Hover the cards above — they come alive</div>
                  </div>
                </div>
              </div>

              {/* floating badges - fully outside corners, gap, not touching */}
              <div
                className={`absolute bottom-full mb-3 sm:mb-4 right-full mr-3 sm:mr-4 hidden items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-xl transition-all duration-300 dark:bg-card lg:flex ${mockHovered ? "scale-[1.02] shadow-xl" : "scale-100"} hover:scale-105 hover:shadow-xl cursor-pointer group z-20`}
                onMouseEnter={() => setHoveredStat(20)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <span className={`flex size-8 items-center justify-center rounded-xl transition-all duration-300 ${hoveredStat === 20 ? "bg-violet-600 text-white scale-105" : "bg-violet-100 dark:bg-violet-900/30 text-violet-600"}`}><Bot className="size-4" /></span>
                <span className="text-xs font-bold leading-none">Gemini Vision<br /><span className="text-[11px] font-medium text-violet-600">Live AI</span></span>
                <span className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white transition-all duration-300 ${hoveredStat === 20 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>Powered by Gemini 3.6 Flash</span>
                <span className={`absolute -top-1 -right-1 size-2 rounded-full bg-emerald-500 ${hoveredStat === 20 ? "animate-ping" : "animate-pulse"}`} />
              </div>
              <div
                className={`absolute top-full mt-3 sm:mt-4 left-full ml-3 sm:ml-4 hidden items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-xl transition-all duration-300 dark:bg-card lg:flex ${mockHovered ? "scale-[1.02] shadow-xl" : "scale-100"} hover:scale-105 hover:shadow-xl cursor-pointer group z-20`}
                onMouseEnter={() => setHoveredStat(21)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <span className={`flex size-8 items-center justify-center rounded-xl transition-all duration-300 ${hoveredStat === 21 ? "bg-emerald-600 text-white scale-105" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"}`}><Package className="size-4" /></span>
                <span className="text-xs font-bold leading-none">Tauri Native<br /><span className="text-[11px] font-medium text-emerald-600">Offline shell</span></span>
                <span className={`pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white transition-all duration-300 ${hoveredStat === 21 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>Rust + Tauri v2 — zero browser</span>
              </div>

              {/* sparkles on hover */}
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${mockHovered ? "opacity-100" : "opacity-0"}`}>
                <span className="absolute right-6 top-6 animate-pulse text-primary">✦</span>
                <span className="absolute left-8 bottom-20 animate-pulse delay-150 text-emerald-500">✦</span>
                <span className="absolute right-12 bottom-6 animate-pulse delay-300 text-violet-500">✦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES - responsive */}
      <section id="what" className="border-t bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-[760px] text-center px-2 sm:px-0">
            <Badge variant="secondary" className="rounded-full border bg-white px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs dark:bg-card">CORE FEATURE • AI GARBAGE ANALYSIS</Badge>
            <h2 className="mt-3 text-[22px] sm:text-[28px] lg:text-[32px] xl:text-4xl font-extrabold tracking-tight">What Sustainability Hub Does</h2>
            <p className="mt-2 sm:mt-3 text-[13px] sm:text-sm lg:text-[15px] leading-relaxed text-muted-foreground">
              One photo is enough. The hub runs a structured Gemini vision prompt and returns everything a citizen, student or kabadiwala needs to act — not just a label.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <BarChart3 className="size-5" />,
                title: "Material % Breakdown",
                desc: "Every material in the frame with share % — e.g. PET 62% • HDPE 12% • Food waste 18% • Aluminium 8%. Sorted, colored pie with legend.",
                color: "bg-sky-600",
                foot: "12-color per-material palette",
              },
              {
                icon: <TriangleAlert className="size-5" />,
                title: "Toxins & Hazard Score",
                desc: "Harmfulness meter (Low/Med/High), toxin list (BPA, lead, cadmium…) and why it matters for soil, water & lungs — in plain English.",
                color: "bg-amber-500",
                foot: "plain-English risk",
              },
              {
                icon: <Atom className="size-5" />,
                title: "Uses & Alternatives",
                desc: "What the item is actually used for + eco-friendly swaps you can buy tomorrow (cloth bag vs polythene, steel vs plastic bottle).",
                color: "bg-violet-600",
                foot: "actionable swaps",
              },
              {
                icon: <Lightbulb className="size-5" />,
                title: "Reuse Ideas",
                desc: "3–5 creative reuse ideas per item — DIY planters, storage, upcycling — so trash becomes resource before it becomes waste.",
                color: "bg-emerald-600",
                foot: "circular-economy nudges",
              },
              {
                icon: <ClipboardCheck className="size-5" />,
                title: "Disposal Destinations",
                desc: "Exactly where each fraction goes — blue bin / green bin / e-waste kiosk / MRF / kabadiwala rate (₹/kg) — no more guessing.",
                color: "bg-zinc-800 dark:bg-zinc-700",
                foot: "hyper-local guidance",
              },
              {
                icon: <History className="size-5" />,
                title: "History & Insights",
                desc: "Every analysis saved locally (SQLite) with thumbnail, stats and re-open. Dashboard, Carbon, Energy & FoodWaste wire to real aggregates.",
                color: "bg-primary",
                foot: "SQLite • zero cloud DB",
              },
            ].map((f) => (
              <Card key={f.title} className="group relative overflow-hidden rounded-[22px] border bg-card p-5 shadow-sm transition hover:shadow-md">
                <div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-muted/40" />
                <div className={`flex size-10 items-center justify-center rounded-xl text-white shadow ${f.color}`}>{f.icon}</div>
                <div className="mt-4 text-[15px] font-bold">{f.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</div>
                <div className="mt-3 inline-flex rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground">{f.foot}</div>
              </Card>
            ))}
          </div>

          <Card className="mt-6 sm:mt-8 overflow-hidden rounded-[20px] sm:rounded-[22px] border bg-card p-0 shadow-sm">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-4 sm:p-6 lg:p-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold text-primary"><Sparkles className="size-3 sm:size-3.5" /> EXAMPLE OUTPUT</div>
                <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold leading-tight">A plastic bottle with leftover juice</h3>
                <div className="mt-3 grid gap-3 text-sm">
                  <div className="rounded-xl border bg-muted/40 p-2.5 sm:p-3">
                    <div className="text-[11px] sm:text-xs font-bold tracking-wide text-muted-foreground">GEMINI RETURNS (structured JSON)</div>
                    <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                      <div className="rounded-xl bg-white p-2 sm:p-2.5 text-center dark:bg-card"><div className="font-extrabold">PET 58%</div><div className="text-muted-foreground text-[10px] sm:text-xs">Bottle</div></div>
                      <div className="rounded-xl bg-white p-2 sm:p-2.5 text-center dark:bg-card"><div className="font-extrabold">PP 22%</div><div className="text-muted-foreground text-[10px] sm:text-xs">Cap</div></div>
                      <div className="rounded-xl bg-white p-2 sm:p-2.5 text-center dark:bg-card"><div className="font-extrabold">Organic 20%</div><div className="text-muted-foreground text-[10px] sm:text-xs">Residue</div></div>
                    </div>
                    <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-amber-600">Hazard: Low</span> • BPA trace if heated • <span className="font-semibold text-emerald-600">Reuse:</span> refill, planter, storage •
                      <span className="font-semibold text-sky-600"> Bin:</span> Rinse → flatten → blue bin / MRF ₹12/kg
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border bg-white px-3 py-1 dark:bg-card">⏱ ~10s live</span>
                    <span className="rounded-full border bg-white px-3 py-1 dark:bg-card">📸 Any phone/camera photo</span>
                    <span className="rounded-full border bg-white px-3 py-1 dark:bg-card">🧠 gemini-3.6-flash</span>
                  </div>
                </div>
              </div>
              <div className="border-t bg-muted/30 p-6 sm:p-7 lg:border-l lg:border-t-0">
                <div className="text-xs font-bold tracking-[0.12em] text-primary">WHY IT MATTERS</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  India generates <span className="font-semibold text-foreground">62M tonnes of waste / year</span> — 70% mixed. People want to segregate but don’t know how. A photo that turns into a clear “do this” card is the fastest way to change behaviour at scale.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-2xl bg-white p-4 dark:bg-card"><div className="text-xl font-extrabold">14%</div><div className="text-xs text-muted-foreground">Plastic actually recycled</div></div>
                  <div className="rounded-2xl bg-primary p-4 text-white"><div className="text-xl font-extrabold">95%</div><div className="text-xs opacity-80">Energy saved by recycling Al</div></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FEATURES - responsive */}
      <section id="features" className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center px-2 sm:px-0">
            <div className="text-[11px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.14em] text-primary">BEYOND THE SCANNER — FULL HUB</div>
            <h2 className="mt-2 text-[22px] sm:text-[28px] lg:text-[32px] xl:text-4xl font-extrabold tracking-tight">Four Pillars + One Hub</h2>
            <p className="mx-auto mt-2 max-w-[640px] text-[13px] sm:text-sm leading-relaxed text-muted-foreground">The analyzer is the hero, but the hub wraps it in the daily sustainability life — carbon, energy, food — all in one native app.</p>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ScanSearch className="size-5" />,
                title: "AI Waste Analyzer",
                desc: "Hero feature: upload or webcam → live Gemini vision → composition pie, hazard gauge, toxins, uses, alternatives, disposal cards + history.",
                color: "bg-primary",
                badge: "Live • Gemini 3.6 Flash",
              },
              {
                icon: <Leaf className="size-5" />,
                title: "Carbon Tracker",
                desc: "Scan receipts or manually log purchases. Each product auto-categorized with kg CO₂e estimate and weekly trends.",
                color: "bg-emerald-600",
                badge: "Receipt → CO₂e",
              },
              {
                icon: <Zap className="size-5" />,
                title: "Energy Monitor",
                desc: "Parse electricity/gas/water bills (kWh/therms/gallons), run home energy audits with personalised saving recommendations.",
                color: "bg-amber-500",
                badge: "Bill parse + audit",
              },
              {
                icon: <Apple className="size-5" />,
                title: "Food Waste Logger",
                desc: "Photo-log plate waste: what was wasted, why, stale vs spoilage streaks + breakdowns to cut kitchen waste.",
                color: "bg-orange-600",
                badge: "Streaks & breakdowns",
              },
              {
                icon: <BarChart3 className="size-5" />,
                title: "Unified Dashboard",
                desc: "One glance: carbon, energy, waste, streaks, quick actions, area charts — all theme-aware light/dark and built for ISC demo.",
                color: "bg-violet-600",
                badge: "Theme-aware charts",
              },
              {
                icon: <Database className="size-5" />,
                title: "History & Stats (New)",
                desc: "SQLite-backed persistence (no Postgres needed) — save-on-analyze with thumbnails, GET /stats/overview, History UI in analyzer.",
                color: "bg-zinc-800 dark:bg-zinc-700",
                badge: "Coming in-app",
              },
            ].map((f) => (
              <Card key={f.title} className="rounded-[20px] border bg-card p-5 shadow-sm">
                <div className={`flex size-10 items-center justify-center rounded-xl text-white shadow ${f.color}`}>{f.icon}</div>
                <div className="mt-4 text-[15px] font-bold">{f.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</div>
                <div className="mt-3 inline-flex rounded-full border bg-muted px-2.5 py-1 text-[11px] font-semibold">{f.badge}</div>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-2xl border bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-2 font-bold text-sm"><Cpu className="size-4 text-primary" /> Gemini, not mock</div>
              <div className="mt-1 text-[13px] sm:text-sm leading-relaxed text-muted-foreground">Real `POST /api/v1/waste/analyze` with 180s timeout, structured JSON, ~10s verified.</div>
            </Card>
            <Card className="rounded-2xl border bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-2 font-bold text-sm"><Box className="size-4 text-emerald-600" /> Light • Dark • Midnight</div>
              <div className="mt-1 text-[13px] sm:text-sm leading-relaxed text-muted-foreground">Porcelain vs Midnight tokens, anti-flash — ships in the .exe.</div>
            </Card>
            <Card className="rounded-2xl border bg-muted/30 p-4 text-sm sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 font-bold text-sm"><GithubIcon className="size-4" /> Daily GitHub proof</div>
              <div className="mt-1 text-[13px] sm:text-sm leading-relaxed text-muted-foreground">Every day’s work logged in `logs/YYYY-MM-DD.md` — auto-committed.</div>
            </Card>
          </div>
        </div>
      </section>

      {/* SOFTWARE / DOWNLOAD - responsive */}
      <section id="software" className="border-y bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="min-w-0">
              <Badge className="rounded-full bg-primary px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide">REAL SOFTWARE • NOT A DEMO SITE</Badge>
              <h2 className="mt-3 text-[22px] sm:text-[28px] lg:text-[30px] xl:text-[34px] font-extrabold tracking-tight">Standalone Windows App</h2>
              <h3 className="text-[15px] sm:text-[17px] lg:text-[18px] font-semibold text-primary">Native Tauri • .exe portable + .msi installer</h3>
              <p className="mt-3 max-w-[560px] text-[13px] sm:text-sm leading-relaxed text-muted-foreground">
                The website you’re on is the promo. The product lives in{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-[11px] sm:text-xs dark:bg-card break-all">D:\Visual Studio Files\Sustainability</code> — a Vite + React frontend baked into a Rust/Tauri shell. No browser tab, no localhost faff — double-click and it runs.
              </p>

              <div className="mt-6 grid gap-3">
                <Card className="flex items-start gap-3 rounded-2xl border bg-card p-3 sm:p-4">
                  <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white"><Package className="size-4 sm:size-5" /></span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold">Zero-install .exe (portable)</div>
                    <div className="text-[11px] sm:text-xs leading-relaxed text-muted-foreground break-words">`desktop/src-tauri/target/release/Sustainability Hub.exe` — runs straight, embeds `dist/` at build time. Backend on :8000 + Vite on :1420 auto-started by `start-app.pyw` (windowless pythonw + ShellExecuteW, no console flash).</div>
                  </div>
                </Card>
                <Card className="flex items-start gap-3 rounded-2xl border bg-card p-3 sm:p-4">
                  <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-800"><Download className="size-4 sm:size-5" /></span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold">Installer .msi</div>
                    <div className="text-[11px] sm:text-xs leading-relaxed text-muted-foreground break-words">`.../bundle/msi/Sustainability Hub_1.0.0_x64_en-US.msi` — proper Windows installer with Start Menu + Desktop shortcut. Build with `-j1` on low-disk machines.</div>
                  </div>
                </Card>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-6 text-[14px] sm:text-[15px]" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases", "_blank")}>
                  <Download className="size-4" /> Download .exe / .msi <ArrowUpRight className="size-4 opacity-70" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full bg-white dark:bg-card text-[14px] sm:text-[15px]" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}>
                  <GithubIcon className="size-4" /> Source + logs
                </Button>
              </div>
              <div className="mt-3 text-[11px] sm:text-xs leading-relaxed text-muted-foreground break-words">Build: <code className="rounded bg-white px-1 py-0.5 dark:bg-card break-all">npx vite build → npx tauri build --bundles msi</code> • Desktop shortcut → <code className="rounded bg-white px-1 py-0.5 dark:bg-card break-all">pythonw + start-app.pyw</code></div>
            </div>

            <div className="space-y-4">
              <Card className="overflow-hidden rounded-[22px] border bg-card shadow-xl">
                <div className="border-b bg-muted/40 px-4 py-3 text-xs font-bold tracking-wide">SYSTEM REQUIREMENTS</div>
                <CardContent className="grid gap-3 p-4 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">OS</span><span className="font-semibold">Windows 10/11 x64</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">RAM / Disk</span><span className="font-semibold">4 GB RAM, 600 MB free</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Backend</span><span className="font-semibold">Bundled FastAPI (auto-starts)</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">AI</span><span className="font-semibold">Gemini API key in backend/.env</span></div>
                  <div className="rounded-xl bg-primary/10 p-3 text-xs leading-relaxed text-primary">
                    <span className="font-bold">Tip:</span> Frontend changes need <code className="rounded bg-white px-1 dark:bg-card">tauri build</code> before the shortcut sees them — `dist/` is embedded.
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Card className="rounded-2xl border bg-card p-4 text-center">
                  <div className="mx-auto flex size-9 items-center justify-center rounded-xl bg-emerald-500 text-white"><Check className="size-5" /></div>
                  <div className="mt-2 text-sm font-bold">Offline shell</div>
                  <div className="text-xs text-muted-foreground">Tauri window works even if backend restarts</div>
                </Card>
                <Card className="rounded-2xl border bg-card p-4 text-center">
                  <div className="mx-auto flex size-9 items-center justify-center rounded-xl bg-violet-500 text-white"><ShieldCheck className="size-5" /></div>
                  <div className="mt-2 text-sm font-bold">Leaf icon</div>
                  <div className="text-xs text-muted-foreground">Desktop shortcut with leaf, no console</div>
                </Card>
              </div>

              <Card className="rounded-2xl border bg-zinc-900 p-4 text-white dark:bg-zinc-900">
                <div className="text-xs font-bold tracking-[0.14em] opacity-60">ALSO AVAILABLE</div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-white/10"><Apple className="size-5" /></span>
                  <div>
                    <div className="text-sm font-bold">Mobile — Expo</div>
                    <div className="text-xs opacity-70">React Native + Zustand, same backend, scan-on-the-go</div>
                  </div>
                  <ArrowRight className="ml-auto size-4 opacity-60" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - responsive */}
      <section id="how" className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center px-2 sm:px-0">
            <div className="text-[11px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.14em] text-primary">HOW IT WORKS</div>
            <h2 className="mt-2 text-[22px] sm:text-[28px] lg:text-[32px] xl:text-4xl font-extrabold tracking-tight">Photo → Insight → Action in ~10s</h2>
            <p className="mx-auto mt-2 max-w-[620px] text-[13px] sm:text-sm leading-relaxed text-muted-foreground">No manual sorting, no guessing bins. The hub does the thinking, you do the doing.</p>
          </div>

          <div className="relative mt-6 sm:mt-8 lg:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-[36px] hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 md:block" />
            {[
              { n: "01", icon: <ScanSearch className="size-6" />, title: "Capture", desc: "Drop a photo or snap with webcam. Any garbage — mixed pile, kitchen waste, e-waste — one image is enough." },
              { n: "02", icon: <Bot className="size-6" />, title: "Gemini Analyzes", desc: "Live structured prompt returns materials %, hazard & toxins, uses, green swaps, reuse & disposal — in ~10s." },
              { n: "03", icon: <Recycle className="size-6" />, title: "Act Correctly", desc: "Follow the colour-coded disposal cards, reuse ideas and MRF/kabadiwala guidance. History saved for trends." },
            ].map((s) => (
              <Card key={s.n} className="relative rounded-[20px] border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">{s.icon}</div>
                <div className="mx-auto mt-3 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wide text-primary">{s.n}</div>
                <div className="mt-3 text-base font-bold">{s.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</div>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-6 sm:mt-8 flex max-w-[720px] items-start sm:items-center gap-2 sm:gap-3 rounded-2xl border bg-amber-50 px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-medium leading-relaxed text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            <Lightbulb className="size-4 shrink-0 mt-0.5 sm:mt-0" /> <span>Editing <code className="rounded bg-white px-1 dark:bg-card break-all">tailwind.config.js</code> needs a Vite restart + hard refresh — otherwise styles stay stale. Same for frontend → rebuild exe before desktop sees it.</span>
          </div>
        </div>
      </section>

      {/* ABOUT ISC - responsive */}
      <section id="about" className="border-t bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2">
            <div className="min-w-0">
              <div className="text-[11px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.14em] text-primary">ABOUT • INDIAN SCIENCE CONGRESS 2026</div>
              <h2 className="mt-2 text-[22px] sm:text-[28px] lg:text-[32px] xl:text-4xl font-extrabold tracking-tight">Technology For A Cleaner India</h2>
              <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm lg:text-[15px] leading-relaxed text-muted-foreground">
                Sustainability Hub is our ISC 2026 entry — <span className="font-semibold text-foreground">practical environmental education</span>, not a poster.
                Instead of saying “waste is bad”, it shows <span className="font-semibold text-foreground">what it is, why it matters, and what you can do right now</span> — with a real AI, a real .exe, and daily public proof on GitHub.
              </p>
              <p className="mt-3 text-[13px] sm:text-sm leading-relaxed text-muted-foreground break-words">Branch <code className="rounded bg-white px-1.5 py-0.5 text-[11px] sm:text-xs dark:bg-card break-all">master</code> • Remote <code className="rounded bg-white px-1.5 py-0.5 text-[11px] sm:text-xs dark:bg-card break-all">sustainability-hub.git</code> • Latest: pie-color fix, windowless launcher, dark-mode tokens.</p>

              <div className="mt-5 sm:mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2">
                <div className="flex gap-3 rounded-2xl border bg-card p-3 sm:p-4">
                  <span className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 shrink-0"><Sprout className="size-4 sm:size-5" /></span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold">Small actions, big delta</div>
                    <div className="text-xs leading-relaxed text-muted-foreground">One correct bin choice × 1.4B people = gigatonnes avoided.</div>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl border bg-card p-3 sm:p-4">
                  <span className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 shrink-0"><FlaskConical className="size-4 sm:size-5" /></span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold">Expandable to city scale</div>
                    <div className="text-xs leading-relaxed text-muted-foreground">Add centre DB, maps, user accounts & impact ledger anytime.</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 rounded-2xl border bg-card p-3 sm:p-4">
                <div className="text-[11px] sm:text-xs font-bold tracking-wide">TECH STACK</div>
                <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[11px] sm:text-xs">
                  <div className="rounded-xl bg-muted/40 p-2 sm:p-3"><div className="font-bold text-[11px] sm:text-xs">Desktop</div><div className="text-muted-foreground text-[10px] sm:text-xs leading-tight">Tauri v2 + Vite + React</div></div>
                  <div className="rounded-xl bg-muted/40 p-2 sm:p-3"><div className="font-bold text-[11px] sm:text-xs">Mobile</div><div className="text-muted-foreground text-[10px] sm:text-xs leading-tight">Expo Router + Zustand</div></div>
                  <div className="rounded-xl bg-muted/40 p-2 sm:p-3"><div className="font-bold text-[11px] sm:text-xs">Backend</div><div className="text-muted-foreground text-[10px] sm:text-xs leading-tight">FastAPI + SQLite</div></div>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 min-w-0">
              <div className="rounded-[20px] sm:rounded-[22px] border bg-gradient-to-br from-primary to-emerald-600 p-5 sm:p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold opacity-90"><Globe className="size-4" /> Mission</div>
                <div className="mt-2 sm:mt-3 text-[20px] sm:text-[22px] font-extrabold leading-tight">Make segregation a reflex — with AI.</div>
                <div className="mt-2 text-[13px] sm:text-sm leading-relaxed opacity-90">From classrooms to societies to MRFs, Sustainability Hub turns everyday waste photos into clean, actionable knowledge — installable in one click.</div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Card className="rounded-[20px] p-5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600"><Trash2 className="size-5" /></div>
                  <div className="mt-3 text-2xl font-extrabold leading-none">62M</div>
                  <div className="text-xs font-medium text-muted-foreground">Tonnes waste / year (India)</div>
                </Card>
                <Card className="rounded-[20px] p-5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><Recycle className="size-5" /></div>
                  <div className="mt-3 text-2xl font-extrabold leading-none">70%</div>
                  <div className="text-xs font-medium text-muted-foreground">Mixed / unsegregated</div>
                </Card>
                <Card className="rounded-[20px] p-5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600"><Leaf className="size-5" /></div>
                  <div className="mt-3 text-2xl font-extrabold leading-none">Daily</div>
                  <div className="text-xs font-medium text-muted-foreground">GitHub logs • ISC proof</div>
                </Card>
                <Card className="rounded-[20px] bg-zinc-900 p-5 text-white dark:bg-zinc-900">
                  <div className="text-xs font-semibold tracking-wide opacity-70">SUSTAINABILITY HUB</div>
                  <div className="mt-2 text-sm font-bold leading-snug">Smart Waste • Smart Living • Better Future</div>
                  <div className="mt-2 text-xs opacity-70">Educate • Empower • Act</div>
                </Card>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button className="rounded-full" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}><GithubIcon className="size-4" /> Open Repo</Button>
                <Button variant="outline" className="rounded-full bg-white dark:bg-card" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub/tree/master/logs", "_blank")}>
                  <FileText className="size-4" /> Daily Logs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white">🌱</span>
              <div>
                <div className="text-sm font-bold">Sustainability <span className="text-primary">Hub</span> <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-primary">ISC 2026</span></div>
                <div className="text-xs text-muted-foreground">Smart Waste • Smart Recycling • Better Future</div>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
              <button onClick={() => scrollTo("home")} className="rounded-full px-3 py-1.5 hover:bg-accent">Home</button>
              <button onClick={() => scrollTo("what")} className="rounded-full px-3 py-1.5 hover:bg-accent">What It Does</button>
              <button onClick={() => scrollTo("features")} className="rounded-full px-3 py-1.5 hover:bg-accent">Features</button>
              <button onClick={() => scrollTo("software")} className="rounded-full px-3 py-1.5 hover:bg-accent">Download</button>
              <a href="https://github.com/Sahilpreetsinghvirdi/sustainability-hub" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 hover:bg-accent">
                <GithubIcon className="size-3.5" /> GitHub
              </a>
            </nav>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>© 2026 Sustainability Hub — Sahil Virdi • Indian Science Congress 2026</span>
            <span className="inline-flex items-center gap-1.5">Made with <span className="text-red-500">♥</span> for a cleaner India • TypeScript + Tailwind + shadcn/ui + Tauri + Gemini</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

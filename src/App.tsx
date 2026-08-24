import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Lightbulb,
  TriangleAlert,
  ArrowRight,
  Moon,
  Sun,
  Menu,
  X,
  Download,
  Zap,
  Apple,
  BarChart3,
  Database,
  FileText,
  Package,
  ScanSearch,
  ArrowUpRight,
  Award,
  ExternalLink,
  ShieldCheck,
  Globe,
  Sprout,
  FlaskConical,
  Sparkles,
  Layers,
  Monitor,
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
  const [mobileMenu, setMobileMenu] = useState(false)
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const ids = ["home", "work", "features", "download", "about"]
      const y = window.scrollY + 120
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(id)
          break
        }
      }
    }
    onScroll()
    addEventListener("scroll", onScroll)
    return () => removeEventListener("scroll", onScroll)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenu(false)
  }

  return (
    <div className="min-h-screen bg-[#FCFCF9] dark:bg-[#0A0A0B] text-zinc-900 dark:text-zinc-100 overflow-x-clip selection:bg-primary/20">
      {/* NAV - fixed so it NEVER leaves viewport, links always in view */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${scrolled ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.06)]" : "border-zinc-200/60 dark:border-zinc-800/60 bg-[#FCFCF9]/80 dark:bg-[#0A0A0B]/80"}`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
              <Leaf className="size-5" />
            </div>
            <div>
              <div className="text-[15px] font-bold tracking-tight leading-none">
                Sustainability<span className="font-light">Hub</span>
              </div>
              <div className="hidden sm:block text-[11px] font-medium tracking-[0.12em] text-zinc-500 dark:text-zinc-400">INDIAN SCIENCE CONGRESS 2026</div>
            </div>
            <Badge className="hidden lg:inline-flex ml-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-2.5 py-0.5 text-[10px] tracking-widest">
              ISC 2026
            </Badge>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              ["home", "Home"],
              ["work", "How it works"],
              ["features", "Features"],
              ["download", "Download"],
              ["about", "About"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${active === id ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full size-9" onClick={() => setDark(!dark)}>
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              className="hidden sm:inline-flex rounded-full"
              onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}
            >
              <GithubIcon className="size-4" /> GitHub
            </Button>
            <Button className="hidden lg:inline-flex rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 px-5" onClick={() => go("download")}>
              Download <ArrowUpRight className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden size-9" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-[#FCFCF9] dark:bg-[#0A0A0B]">
            <nav className="mx-auto max-w-[1280px] px-4 py-4 space-y-1">
              {["home", "work", "features", "download", "about"].map((id) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 capitalize"
                >
                  {id === "work" ? "How it works" : id}
                </button>
              ))}
              <Button className="w-full mt-2 rounded-xl" onClick={() => go("download")}>
                <Download className="size-4" /> Download for Windows
              </Button>
            </nav>
          </div>
        )}
        {/* scroll progress */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-zinc-900 dark:bg-white transition-all" style={{ width: scrolled ? "100%" : "0%", opacity: scrolled ? 0.12 : 0 }} />
      </header>
      {/* spacer for fixed header */}
      <div className="h-[68px]" aria-hidden />

      {/* floating pill nav - always visible, keeps links in view while scrolling (mobile + tablet) */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-[420px]">
        <div className="flex items-center justify-between gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-1.5">
          {[
            ["home", "Home"],
            ["work", "Work"],
            ["features", "Features"],
            ["download", "Get"],
            ["about", "About"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition ${active === id ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow" : "text-zinc-600 dark:text-zinc-400"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/30 via-transparent to-transparent blur-3xl dark:from-emerald-900/20" />
        </div>

        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 pt-8 sm:pt-12 lg:pt-16 pb-8">
            {/* left */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium shadow-sm w-fit">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Award className="size-3" />
                </span>
                <span className="hidden sm:inline">Official Entry • Indian Science Congress 2026</span>
                <span className="sm:hidden">ISC 2026 • Official Entry</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-2 py-0.5 text-[10px] ml-1">
                  Live <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </div>

              <h1 className="mt-6 text-[32px] sm:text-[42px] lg:text-[52px] xl:text-[58px] font-[800] tracking-[-0.04em] leading-[0.9]">
                Waste,
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">understood.</span>
              </h1>
              <p className="mt-4 max-w-[560px] text-[15px] sm:text-[16px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                Photograph any garbage. <span className="font-semibold text-zinc-900 dark:text-zinc-100">Sustainability Hub</span> returns material
                breakdown, toxins &amp; hazard, reuse ideas and <span className="font-semibold text-zinc-900 dark:text-zinc-100">exactly where to dispose it</span> — as a real Windows app.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="rounded-full h-12 px-7 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-[15px] shadow-lg shadow-zinc-900/10" onClick={() => go("download")}>
                  <Download className="size-4" /> Download for Windows
                  <span className="ml-2 hidden sm:inline-flex items-center gap-1 text-xs opacity-60">.exe • .msi <ArrowRight className="size-3" /></span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-7 bg-white dark:bg-zinc-900 text-[15px]"
                  onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}
                >
                  <GithubIcon className="size-4" /> View source
                  <ExternalLink className="size-3.5 opacity-50" />
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-2 rounded-full border bg-white dark:bg-zinc-900 px-3 py-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Gemini 3.6 Flash • ~10s
                </div>
                <div className="flex items-center gap-2 rounded-full border bg-white dark:bg-zinc-900 px-3 py-1.5">
                  <Monitor className="size-3.5" /> Tauri v2 • .exe + .msi
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <div className="flex -space-x-1">
                    <img src="https://i.pravatar.cc/24?img=1" alt="" className="size-6 rounded-full border-2 border-white dark:border-zinc-900" />
                    <img src="https://i.pravatar.cc/24?img=2" alt="" className="size-6 rounded-full border-2 border-white dark:border-zinc-900" />
                    <img src="https://i.pravatar.cc/24?img=3" alt="" className="size-6 rounded-full border-2 border-white dark:border-zinc-900" />
                  </div>
                  <span className="text-xs">Trusted by 200+ testers</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-[480px]">
                {[
                  { k: "62%", l: "Avg. waste", s: "correctly sorted" },
                  { k: "95%", l: "Energy saved", s: "recycling Al" },
                  { k: "10s", l: "Avg. analysis", s: "Gemini live" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border bg-white dark:bg-zinc-900 p-3 sm:p-4">
                    <div className="text-[20px] sm:text-[22px] font-bold tracking-tight leading-none">{x.k}</div>
                    <div className="text-[11px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100 leading-none mt-1">{x.l}</div>
                    <div className="text-[11px] text-zinc-500 leading-none">{x.s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right app window */}
            <div className="lg:col-span-6 xl:col-span-6 relative lg:pl-6">
              <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-emerald-200/40 via-teal-200/20 to-zinc-200/40 blur-2xl dark:from-emerald-900/20 dark:via-teal-900/10 dark:to-zinc-800/20" />
                <div className="overflow-hidden rounded-[20px] sm:rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]">
                  {/* titlebar */}
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 px-3 sm:px-4 py-3 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="size-3 rounded-full bg-[#FF5F57] border border-black/10" />
                        <span className="size-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                        <span className="size-3 rounded-full bg-[#28CA42] border border-black/10" />
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
                        <span className="flex size-6 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                          <Leaf className="size-3.5" />
                        </span>
                        Sustainability Hub
                        <span className="hidden sm:inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">● Live</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-800 border px-2.5 py-1 text-[11px] font-medium">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Gemini Live
                      </span>
                      <span className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-2.5 py-1 text-[11px] font-bold">ISC 2026</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[200px_1fr] sm:grid-cols-[220px_1fr] lg:grid-cols-[180px_1fr] xl:grid-cols-[200px_1fr] max-sm:grid-cols-1">
                    {/* sidebar - hidden on mobile */}
                    <div className="hidden sm:flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-3 gap-1">
                      {[
                        ["Dashboard", BarChart3, false],
                        ["Analyzer", ScanSearch, true],
                        ["Carbon", Leaf, false],
                        ["Energy", Zap, false],
                        ["Food Waste", Apple, false],
                        ["History", Database, false],
                      ].map(([label, Icon, active]: any) => (
                        <div
                          key={label}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium ${active ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow" : "text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800"}`}
                        >
                          <Icon className="size-4" /> {label}
                          {active && <span className="ml-auto size-1.5 rounded-full bg-emerald-400" />}
                        </div>
                      ))}
                      <div className="mt-auto rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-3">
                        <div className="text-xs font-bold">Daily GitHub log</div>
                        <div className="text-[11px] opacity-70 leading-relaxed">Every commit pushed to sustainability-hub • ISC proof</div>
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-medium">
                          View logs <ArrowRight className="size-3" />
                        </div>
                      </div>
                    </div>

                    {/* main */}
                    <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                            <ScanSearch className="size-4" />
                          </span>
                          AI Waste Analyzer
                        </h3>
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 px-2.5 py-1 text-[11px] font-medium">
                          <Sparkles className="size-3" /> 96% confident
                        </span>
                      </div>

                      <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-900/50">
                        <div className="flex gap-3">
                          <div className="size-14 sm:size-16 rounded-xl bg-white dark:bg-zinc-800 border flex items-center justify-center text-xl">🗑️</div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="h-2 w-3/4 rounded-full bg-zinc-900/10 dark:bg-white/10" />
                            <div className="h-2 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-2 py-0.5 text-[11px] font-bold">Analyzing… 78%</span>
                              <span className="rounded-full bg-white dark:bg-zinc-800 border px-2 py-0.5 text-[11px]">PET 62% • HDPE 12%</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                          <div className="h-full w-[78%] bg-gradient-to-r from-zinc-900 to-emerald-600 dark:from-white dark:to-emerald-500 rounded-full" />
                        </div>
                        <div className="mt-1.5 flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span>Gemini 3.6 Flash • 10s</span>
                          <span>78% complete</span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          { v: "62%", l: "Plastic", c: "bg-sky-500", t: "PET" },
                          { v: "23%", l: "Organic", c: "bg-amber-500", t: "🍎" },
                          { v: "15%", l: "Other", c: "bg-emerald-500", t: "♻️" },
                        ].map((s) => (
                          <div key={s.l} className="rounded-2xl border bg-white dark:bg-zinc-800 p-2 sm:p-3 text-center">
                            <div className={`mx-auto flex size-7 sm:size-8 items-center justify-center rounded-xl text-white text-[11px] font-bold ${s.c}`}>{s.t}</div>
                            <div className="mt-1 text-[13px] sm:text-sm font-bold leading-none">{s.v}</div>
                            <div className="text-[11px] text-zinc-500 leading-none mt-0.5">{s.l}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-2.5 sm:p-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                          <TriangleAlert className="size-3.5" /> Low hazard • BPA trace
                        </div>
                        <div className="mt-1 text-[11px] leading-relaxed text-amber-800/70 dark:text-amber-200/70">Rinse & flatten. Blue bin • MRF ₹12–14/kg</div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-2.5 text-center">
                          <div className="text-[11px] opacity-70">Latency</div>
                          <div className="text-sm font-bold">~10s</div>
                        </div>
                        <div className="rounded-xl border bg-white dark:bg-zinc-800 p-2.5 text-center">
                          <div className="text-[11px] text-zinc-500">Format</div>
                          <div className="text-sm font-bold">.exe</div>
                        </div>
                        <div className="rounded-xl border bg-white dark:bg-zinc-800 p-2.5 text-center">
                          <div className="text-[11px] text-zinc-500">Install</div>
                          <div className="text-sm font-bold">.msi</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="hidden sm:inline">Press</span> <kbd className="rounded bg-white dark:bg-zinc-800 border px-1.5 py-0.5 text-[11px]">⌘ K</kbd> <span className="hidden sm:inline">to search waste • No browser needed</span>
                  <span className="sm:hidden">No browser • Native Tauri</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-[20px] border bg-white dark:bg-zinc-900 p-3 sm:p-4 shadow-sm">
              {[
                ["62M tonnes", "Waste / year in India"],
                ["70% mixed", "Unsegregated waste"],
                ["14% only", "Plastic recycled"],
                ["Daily logs", "GitHub proof for ISC"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-3 sm:p-4 text-center">
                  <div className="text-sm sm:text-base font-bold tracking-tight">{k}</div>
                  <div className="text-[11px] sm:text-xs text-zinc-500">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT */}
      <section id="work" className="py-10 sm:py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full border bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs font-medium">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> How it works
            </div>
            <h2 className="mt-3 text-[26px] sm:text-[32px] lg:text-[36px] font-bold tracking-tight leading-[0.95]">One photo. Every answer.</h2>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Drop any garbage photo. The hub runs a structured Gemini vision prompt and returns a complete, human-readable decision card — not just a label.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: BarChart3,
                  title: "Material % breakdown",
                  desc: "Every material with share % — PET 62% • HDPE 12% • Organic 18% • Al 8%. Sorted pie, 12-color palette.",
                  color: "bg-sky-500",
                },
                {
                  icon: TriangleAlert,
                  title: "Toxins & hazard",
                  desc: "Low/Med/High meter, toxin list (BPA, lead, cadmium) and plain-English risk for soil, water, lungs.",
                  color: "bg-amber-500",
                },
                {
                  icon: Lightbulb,
                  title: "Reuse ideas",
                  desc: "3–5 practical reuses — planters, storage, upcycling — so trash becomes resource.",
                  color: "bg-emerald-500",
                },
                {
                  icon: ClipboardCheck,
                  title: "Where to dispose",
                  desc: "Exact bin — blue/green/e-waste/MRF/kabadiwala ₹/kg — no more guessing.",
                  color: "bg-zinc-900 dark:bg-white dark:text-zinc-900",
                },
              ].map((f) => (
                <Card key={f.title} className="rounded-[20px] p-5 border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                  <div className={`flex size-9 items-center justify-center rounded-xl text-white ${f.color}`}>
                    <f.icon className="size-5" />
                  </div>
                  <div className="mt-3 text-[15px] font-bold">{f.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{f.desc}</div>
                </Card>
              ))}
            </div>

            <Card className="lg:col-span-5 rounded-[24px] p-0 overflow-hidden border-zinc-200 dark:border-zinc-800">
              <div className="p-5 sm:p-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1 text-xs font-bold">
                  <Sparkles className="size-3" /> Example
                </div>
                <h3 className="mt-3 text-lg font-bold leading-tight">Plastic bottle + leftover juice</h3>
                <div className="mt-4 rounded-2xl border bg-zinc-50 dark:bg-zinc-900 p-3">
                  <div className="text-[11px] font-bold tracking-wide text-zinc-500">GEMINI RETURNS</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      ["PET 58%", "Bottle"],
                      ["PP 22%", "Cap"],
                      ["Organic 20%", "Residue"],
                    ].map(([a, b]) => (
                      <div key={a} className="rounded-xl bg-white dark:bg-zinc-800 border p-2.5 text-center">
                        <div className="text-xs font-bold">{a}</div>
                        <div className="text-[11px] text-zinc-500">{b}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2.5 py-1 font-medium">
                      Hazard: Low • BPA if heated
                    </span>
                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 font-medium">
                      Blue bin • MRF ₹12/kg
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-3">
                    <div className="text-lg font-bold leading-none">~10s</div>
                    <div className="text-[11px] opacity-70">Gemini live</div>
                  </div>
                  <div className="rounded-xl border bg-white dark:bg-zinc-800 p-3">
                    <div className="text-lg font-bold leading-none">Any</div>
                    <div className="text-[11px] text-zinc-500">photo</div>
                  </div>
                  <div className="rounded-xl border bg-white dark:bg-zinc-800 p-3">
                    <div className="text-lg font-bold leading-none">12</div>
                    <div className="text-[11px] text-zinc-500">materials</div>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900 dark:bg-zinc-800 text-white p-5">
                <div className="text-xs font-bold tracking-widest opacity-60">WHY IT MATTERS</div>
                <div className="mt-2 text-sm leading-relaxed opacity-90">
                  India generates <span className="font-bold text-white">62M tonnes/yr</span> — 70% mixed. People want to sort but don’t know how. A photo → decision card closes the gap.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES bento */}
      <section id="features" className="py-10 sm:py-16 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 border px-3 py-1 text-xs font-medium">
                <Layers className="size-3.5" /> Platform
              </div>
              <h2 className="mt-3 text-[26px] sm:text-[32px] font-bold tracking-tight">Four pillars. One hub.</h2>
            </div>
            <p className="max-w-[520px] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Analyzer is the hero. The hub wraps it in daily life — carbon, energy, food — all native, all offline-capable, all ISC-ready.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                span: "sm:col-span-2 lg:col-span-2",
                icon: ScanSearch,
                title: "AI Waste Analyzer",
                desc: "Upload or webcam → Gemini vision → pie, hazard gauge, toxins, uses, alternatives, disposal + history. ~10s, structured JSON, 180s timeout.",
                meta: "Gemini 3.6 Flash • Live",
                color: "bg-zinc-900 dark:bg-white dark:text-zinc-900",
              },
              {
                icon: BarChart3,
                title: "Dashboard",
                desc: "One glance: carbon, energy, waste, streaks, area charts. Theme-aware (Porcelain/Midnight) with anti-flash.",
                meta: "Charts • Badges",
                color: "bg-violet-600",
              },
              {
                icon: Leaf,
                title: "Carbon Tracker",
                desc: "Scan receipts or log manually. Auto-categorized kg CO₂e with weekly trends.",
                meta: "Receipt → CO₂e",
                color: "bg-emerald-600",
              },
              {
                icon: Zap,
                title: "Energy Monitor",
                desc: "Parse bills (kWh/therms/gal), run audits with saving tips.",
                meta: "Bill parse",
                color: "bg-amber-500",
              },
              {
                icon: Apple,
                title: "Food Waste",
                desc: "Photo-log plate waste, streaks, breakdowns. Cut kitchen waste.",
                meta: "Streaks",
                color: "bg-orange-500",
              },
              {
                icon: Database,
                title: "History & Stats",
                desc: "SQLite (no Postgres). Thumbnails, GET /stats/overview, History UI.",
                meta: "New",
                color: "bg-zinc-800",
              },
            ].map((f) => (
              <Card key={f.title} className={`rounded-[20px] p-5 sm:p-6 border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all hover:-translate-y-0.5 ${f.span || ""}`}>
                <div className={`flex size-10 items-center justify-center rounded-xl text-white ${f.color}`}>
                  <f.icon className="size-5" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="text-[15px] font-bold">{f.title}</div>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border px-2 py-0.5 text-[10px] font-bold tracking-wide">{f.meta}</span>
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{f.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="py-10 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <Badge className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">REAL SOFTWARE • NOT A DEMO</Badge>
              <h2 className="mt-3 text-[26px] sm:text-[32px] lg:text-[36px] font-bold tracking-tight leading-[0.9]">
                Double-click.
                <br />
                <span className="text-zinc-500 dark:text-zinc-400">It just runs.</span>
              </h2>
              <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                No browser, no localhost faff. Vite + React baked into Tauri. Backend on :8000 + Vite on :1420 auto-started by{" "}
                <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs break-all">start-app.pyw</code> (windowless pythonw).
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Card className="rounded-2xl p-4 border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                      <Package className="size-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold">Portable .exe</div>
                      <div className="text-xs text-zinc-500">Zero-install</div>
                    </div>
                    <span className="ml-auto text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">~12MB</span>
                  </div>
                  <div className="mt-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border p-2.5 font-mono text-[11px] break-all">desktop/src-tauri/target/release/Sustainability Hub.exe</div>
                </Card>
                <Card className="rounded-2xl p-4 border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 dark:bg-zinc-900/10">
                      <Download className="size-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold">Installer .msi</div>
                      <div className="text-xs opacity-70">Windows Installer</div>
                    </div>
                    <span className="ml-auto text-xs font-mono bg-white/15 dark:bg-zinc-900/10 px-2 py-1 rounded-full">x64</span>
                  </div>
                  <div className="mt-3 rounded-xl bg-white/10 dark:bg-zinc-900/10 border border-white/10 dark:border-zinc-900/10 p-2.5 font-mono text-[11px] break-all">
                    .../bundle/msi/Sustainability Hub_1.0.0_x64_en-US.msi
                  </div>
                </Card>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="rounded-full h-11 px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 w-full sm:w-auto" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases", "_blank")}>
                  <Download className="size-4" /> Download .exe / .msi
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-11 px-6 w-full sm:w-auto bg-white dark:bg-zinc-900"
                  onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}
                >
                  <GithubIcon className="size-4" /> Source
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="size-4" /> Code-signed • No console flash • Leaf icon
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <Card className="rounded-[20px] overflow-hidden border-zinc-200 dark:border-zinc-800">
                <div className="bg-zinc-900 dark:bg-zinc-800 text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="size-2 rounded-full bg-red-500" /> <span className="size-2 rounded-full bg-yellow-500" /> <span className="size-2 rounded-full bg-green-500" />
                    <span className="ml-2 opacity-70">build — sustainability-hub</span>
                  </div>
                  <span className="text-[11px] opacity-60">zsh</span>
                </div>
                <div className="bg-[#0A0A0B] dark:bg-black text-zinc-100 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <div className="text-zinc-500"># memory-constrained machine</div>
                  <div>$env:RUSTUP_HOME="D:\rust\rustup"</div>
                  <div>$env:CARGO_BUILD_JOBS="1"</div>
                  <div className="text-emerald-400">npx vite build</div>
                  <div className="text-emerald-400">npx tauri build --bundles msi</div>
                  <div className="mt-2 text-zinc-500">→ dist/ embedded • shortcut → pythonw + start-app.pyw</div>
                </div>
              </Card>

              <Card className="rounded-2xl p-4 border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-bold tracking-wide">SYSTEM</div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border p-3">
                    <div className="text-[11px] text-zinc-500">OS</div>
                    <div className="font-medium">Windows 10/11 x64</div>
                  </div>
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border p-3">
                    <div className="text-[11px] text-zinc-500">AI</div>
                    <div className="font-medium">Gemini in .env</div>
                  </div>
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border p-3">
                    <div className="text-[11px] text-zinc-500">RAM</div>
                    <div className="font-medium">4 GB</div>
                  </div>
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border p-3">
                    <div className="text-[11px] text-zinc-500">Disk</div>
                    <div className="font-medium">600 MB</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-10 sm:py-16 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 border px-3 py-1 text-xs font-medium">
                <Globe className="size-3.5" /> Indian Science Congress 2026
              </div>
              <h2 className="mt-4 text-[26px] sm:text-[32px] font-bold tracking-tight">Technology for a cleaner India.</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Not a poster — <span className="font-semibold text-zinc-900 dark:text-zinc-100">practical education</span>. We show{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">what it is, why it matters, what to do now</span> — with a real
                .exe, live AI and daily GitHub proof.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border p-4 flex gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shrink-0">
                    <Sprout className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm font-bold">Small actions, big delta</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">One correct bin × 1.4B people = gigatonnes avoided.</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border p-4 flex gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shrink-0">
                    <FlaskConical className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm font-bold">City-scale ready</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Add DB, maps, accounts, impact ledger anytime.</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-white dark:bg-zinc-900 border p-4">
                <div className="text-xs font-bold tracking-wide">STACK</div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 border p-3">
                    <div className="text-xs font-bold">Desktop</div>
                    <div className="text-[11px] text-zinc-500">Tauri • Vite • React</div>
                  </div>
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 border p-3">
                    <div className="text-xs font-bold">Mobile</div>
                    <div className="text-[11px] text-zinc-500">Expo • Zustand</div>
                  </div>
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 border p-3">
                    <div className="text-xs font-bold">Backend</div>
                    <div className="text-[11px] text-zinc-500">FastAPI • SQLite</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-[24px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-6 sm:p-7">
                <div className="text-xs tracking-[0.14em] opacity-60">MISSION</div>
                <div className="mt-3 text-[22px] font-bold leading-tight">Make segregation a reflex — with AI.</div>
                <div className="mt-2 text-sm leading-relaxed opacity-80">From classrooms to MRFs, turn waste photos into clean, installable knowledge.</div>
                <div className="mt-6 flex gap-2">
                  <Button size="sm" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}>
                    <GithubIcon className="size-4" /> Repo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-zinc-900/20 dark:text-zinc-900"
                    onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub/tree/master/logs", "_blank")}
                  >
                    <FileText className="size-4" /> Logs
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["62M", "t waste/yr"],
                  ["70%", "mixed"],
                  ["Daily", "logs"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white dark:bg-zinc-900 border p-4 text-center">
                    <div className="text-lg font-bold leading-none">{k}</div>
                    <div className="text-[11px] text-zinc-500 leading-none mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                <Leaf className="size-5" />
              </span>
              <div>
                <div className="text-sm font-bold tracking-tight">
                  Sustainability<span className="font-light">Hub</span> <span className="ml-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-1.5 py-0.5 text-[10px]">ISC 2026</span>
                </div>
                <div className="text-xs text-zinc-500">Smart Waste • Smart Recycling • Better Future</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button onClick={() => go("home")} className="rounded-full border px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                Home
              </button>
              <button onClick={() => go("features")} className="rounded-full border px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                Features
              </button>
              <a href="https://github.com/Sahilpreetsinghvirdi/sustainability-hub" target="_blank" rel="noreferrer" className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1.5 inline-flex items-center gap-1">
                <GithubIcon className="size-3.5" /> GitHub
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 text-xs text-zinc-500">
            <span>© 2026 Sahil Virdi • Indian Science Congress 2026</span>
            <span className="inline-flex items-center gap-1">
              Built with <span className="text-red-500">♥</span> TypeScript • Tailwind • shadcn • Tauri • Gemini
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

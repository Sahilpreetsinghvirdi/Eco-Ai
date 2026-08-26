import { useEffect, useLayoutEffect, useRef, useState } from "react"
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
  Smartphone,
  Flower2,
  Bug,
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
  const desktopNavRef = useRef<HTMLDivElement>(null)
  const mobilePillRef = useRef<HTMLDivElement>(null)
  const [desktopIndicator, setDesktopIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  const [mobileIndicator, setMobileIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  const jumpingRef = useRef(false)
  const [release, setRelease] = useState<any>(null)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const featuresSectionRef = useRef<HTMLElement>(null)
  const featuresTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (jumpingRef.current) return
      const ids = ["home", "work", "features", "download", "about"]
      // use viewport center + "last passed" logic so short Download stays active longer
      const y = window.scrollY + window.innerHeight * 0.5
      let current = "home"
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop - 100) {
          current = id
        }
      }
      // if scrolled to bottom, force About
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        current = "about"
      }
      setActive(current)
    }
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })
    return () => removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    fetch("https://api.github.com/repos/Sahilpreetsinghvirdi/sustainability-hub/releases/latest")
      .then((r) => r.json())
      .then(setRelease)
      .catch(() => {})
  }, [])

  // smooth sliding highlight - measures active pill and animates indicator with spring
  useLayoutEffect(() => {
    const update = () => {
      if (desktopNavRef.current) {
        const activeEl = desktopNavRef.current.querySelector(`[data-nav="${active}"]`) as HTMLElement | null
        if (activeEl) {
          const navRect = desktopNavRef.current.getBoundingClientRect()
          const rect = activeEl.getBoundingClientRect()
          setDesktopIndicator({ left: rect.left - navRect.left, width: rect.width, opacity: 1 })
        }
      }
      if (mobilePillRef.current) {
        const activeEl = mobilePillRef.current.querySelector(`[data-mnav="${active}"]`) as HTMLElement | null
        if (activeEl) {
          const navRect = mobilePillRef.current.getBoundingClientRect()
          const rect = activeEl.getBoundingClientRect()
          setMobileIndicator({ left: rect.left - navRect.left, width: rect.width, opacity: 1 })
        }
      }
    }
    // next frame to ensure layout is ready
    const id = requestAnimationFrame(update)
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener("resize", update)
    }
  }, [active])

  // features: scroll down to scroll horizontal, only after last box does page continue
  useEffect(() => {
    const onScroll = () => {
      if (!featuresSectionRef.current || !featuresTrackRef.current) return
      const rect = featuresSectionRef.current.getBoundingClientRect()
      const sectionHeight = featuresSectionRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = sectionHeight - viewportHeight
      if (scrollable <= 0) return
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      const maxX = featuresTrackRef.current.scrollWidth - window.innerWidth + 32
      if (maxX > 0) {
        featuresTrackRef.current.style.transform = `translateX(-${progress * maxX}px)`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const go = (id: string) => {
    // jump directly - keep simple scroll spy but don't hang over intermediate pills
    jumpingRef.current = true
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenu(false)
    window.setTimeout(() => {
      jumpingRef.current = false
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#FCFCF9] dark:bg-[#0A0A0B] text-zinc-900 dark:text-zinc-100 overflow-x-clip selection:bg-primary/20">
      {/* NAV - milky greyish transparent */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-2xl transition-all duration-300 ${scrolled ? "border-white/20 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-saturate-150" : "border-zinc-200/40 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-900/20 backdrop-saturate-150"}`}
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

          <nav ref={desktopNavRef} className="hidden lg:flex items-center gap-1 relative p-1">
            {/* sliding black pill */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-zinc-900 dark:bg-white shadow-sm will-change-transform"
              style={{
                left: desktopIndicator.left,
                width: desktopIndicator.width,
                opacity: desktopIndicator.opacity,
                transition: "left 520ms cubic-bezier(0.32, 0.72, 0, 1), width 520ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms",
              }}
              aria-hidden
            />
            {[
              ["home", "Home"],
              ["work", "How it works"],
              ["features", "Features"],
              ["download", "Download"],
              ["about", "About"],
            ].map(([id, label]) => (
              <button
                key={id}
                data-nav={id}
                onClick={() => go(id)}
                className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${active === id ? "text-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
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
            <Button className="hidden lg:inline-flex rounded-full bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 px-5 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300" onClick={() => go("download")}>
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

      {/* floating pill nav - always visible, smooth sliding highlight */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-[420px]">
        <div ref={mobilePillRef} className="relative flex items-center justify-between gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-1.5">
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-zinc-900 dark:bg-white shadow will-change-transform"
            style={{
              left: mobileIndicator.left,
              width: mobileIndicator.width,
              opacity: mobileIndicator.opacity,
              transition: "left 520ms cubic-bezier(0.32, 0.72, 0, 1), width 520ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms",
            }}
            aria-hidden
          />
          {[
            ["home", "Home"],
            ["work", "Work"],
            ["features", "Features"],
            ["download", "Get"],
            ["about", "About"],
          ].map(([id, label]) => (
            <button
              key={id}
              data-mnav={id}
              onClick={() => go(id)}
              className={`relative z-10 flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-300 ${active === id ? "text-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-400"}`}
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
              <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 px-3 py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                <span className="hidden sm:inline">207 MB offline installer (fully offline, no WebView2) + 215 MB Android APK — one Release</span>
                <span className="sm:hidden">207 MB offline + 215 MB APK — one Release</span>
                <span className="hidden sm:inline-flex items-center gap-1 ml-1 rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[10px]">v1.4.1</span>
              </div>
              <p className="mt-2 max-w-[560px] text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Works on any Windows 10/11 without internet + Android like Instagram. Also: small 3.8 MB online installer if you have internet.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="rounded-full h-12 px-7 bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-[15px] shadow-lg shadow-zinc-900/10 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300" onClick={() => go("download")}>
                  <Download className="size-4" /> Get the App
                  <span className="ml-2 hidden sm:inline-flex items-center gap-1 text-xs opacity-60">v1.4.1 • Free <ArrowRight className="size-3" /></span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-7 bg-white dark:bg-zinc-900 text-[15px] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300"
                  onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}
                >
                  <GithubIcon className="size-4" /> View source
                  <ExternalLink className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
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

      {/* FEATURES - pinned horizontal, scroll down to go horizontal, long vertical cards */}
      <section ref={featuresSectionRef} id="features" className="relative h-[260vh] sm:h-[300vh] bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="sticky top-[68px] h-[calc(100vh-68px)] min-h-[520px] flex flex-col overflow-hidden">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4 shrink-0">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-900 border px-3 py-1 text-xs font-medium">
                <Layers className="size-3.5" /> Platform
              </div>
              <h2 className="mt-3 text-[24px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight">AIs first, then everything else.</h2>
            </div>
            <p className="max-w-[520px] text-[13px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Important features only — 3 AIs then trackers. Scroll down, the strip moves. Only after the last card does the page continue.
            </p>
          </div>

          <div className="flex-1 flex items-center mt-4 sm:mt-6 overflow-hidden border-y border-zinc-200 dark:border-zinc-800">
            <div ref={featuresTrackRef} className="flex gap-0 w-full will-change-transform" style={{ transform: "translateX(0px)" }}>
              {[
                {
                  icon: ScanSearch,
                  title: "AI Waste Analyzer",
                  desc: "Upload or webcam → Gemini vision → pie, hazard gauge, toxins, uses, alternatives, disposal + history. ~10s, structured JSON, 180s timeout.",
                  meta: "Gemini 3.6 Flash • Live",
                  color: "bg-zinc-900 dark:bg-white dark:text-zinc-900",
                  short: "WASTE",
                },
                {
                  icon: Sprout,
                  title: "AgriSense",
                  desc: "Photograph any fertilizer; get NPK, suitability verdict 0–100 for crop/soil/stage, dosage, risks & alternatives.",
                  meta: "Fertilizer • NPK",
                  color: "bg-green-600",
                  short: "AGRI",
                },
                {
                  icon: Flower2,
                  title: "PlantSense",
                  desc: "AI plant doctor — health score, diseases, care plan, fertilizer suggestions. Snap a leaf, get diagnosis.",
                  meta: "New • v1.2+",
                  color: "bg-emerald-700",
                  short: "PLANT",
                },

                {
                  icon: Leaf,
                  title: "Carbon Tracker",
                  desc: "Scan receipts or log manually. Auto-categorized kg CO₂e with weekly trends.",
                  meta: "Receipt → CO₂e",
                  color: "bg-emerald-600",
                  short: "CARBON",
                },
                {
                  icon: Zap,
                  title: "Energy Monitor",
                  desc: "Parse bills (kWh/therms/gal), run audits with saving tips.",
                  meta: "Bill parse",
                  color: "bg-amber-500",
                  short: "ENERGY",
                },
                {
                  icon: Apple,
                  title: "Food Waste",
                  desc: "Photo-log plate waste, streaks, breakdowns. Cut kitchen waste.",
                  meta: "Streaks",
                  color: "bg-orange-500",
                  short: "FOOD",
                },
                {
                  icon: Smartphone,
                  title: "Android Companion",
                  desc: "Same AI tools on Android, standalone APK like Instagram. No Expo Go, shares backend over LAN.",
                  meta: "New • v1.4.0",
                  color: "bg-indigo-600",
                  short: "ANDROID",
                },
                {
                  icon: Database,
                  title: "History & Stats",
                  desc: "SQLite (no Postgres). Thumbnails, GET /stats/overview, History UI.",
                  meta: "New",
                  color: "bg-zinc-800",
                  short: "HISTORY",
                },
              ].map((f, idx) => {
                const isActive = activeFeature === idx
                return (
                  <Card
                    key={f.title}
                    onMouseEnter={() => setActiveFeature(idx)}
                    onMouseLeave={() => setActiveFeature(null)}
                    onClick={() => setActiveFeature(isActive ? null : idx)}
                    className={`group relative flex-shrink-0 snap-start rounded-none border-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer select-none transition-all duration-500 ease-out ${isActive ? "w-[340px] sm:w-[400px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" : "w-[260px] sm:w-[280px] hover:w-[300px] sm:hover:w-[320px]"} h-[68vh] sm:h-[72vh] min-h-[480px] max-h-[560px] flex flex-col last:border-r-0`}
                  >
                    {/* big feature name like numbers - sharp, no gap */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                      <span
                        className={`text-[72px] sm:text-[84px] font-black tracking-tighter leading-none select-none transition-all duration-700 ease-out ${isActive ? "scale-105 text-zinc-900 dark:text-white" : "scale-100 text-zinc-900/[0.06] dark:text-white/[0.06] group-hover:text-zinc-900/[0.08] dark:group-hover:text-white/[0.08]"}`}
                        style={{ writingMode: "vertical-rl" } as React.CSSProperties}
                      >
                        {f.short}
                      </span>
                    </div>
                    {/* image - smooth reveal with scale */}
                    <div className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      <div className={`absolute inset-0 ${f.color} opacity-[0.03]`} />
                      <img
                        src={`https://picsum.photos/seed/${encodeURIComponent(f.title)}/600/600`}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isActive ? "opacity-15 scale-105" : "opacity-0 scale-100 group-hover:opacity-10 group-hover:scale-102"}`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    {/* top number + meta */}
                    <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between">
                        <span className="flex size-8 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm text-xs font-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className={`flex size-8 items-center justify-center rounded-xl text-white shadow-sm ${f.color} transition-all duration-500 ${isActive ? "scale-110 rotate-3" : "group-hover:scale-105"}`}>
                          <f.icon className="size-4" />
                        </span>
                      </div>

                      {/* center large number fallback for non-active - show short name big */}
                      <div className="flex-1 flex items-center justify-center sm:hidden">
                        <span className={`text-[48px] font-black tracking-tighter ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-300 dark:text-zinc-700"}`}>{String(idx + 1).padStart(2, "0")}</span>
                      </div>

                      <div className="mt-auto">
                        <h3 className="text-[15px] sm:text-[16px] font-bold leading-tight tracking-tight">{f.title}</h3>
                        <p className={`mt-1.5 text-xs sm:text-[13px] leading-relaxed line-clamp-3 transition-all duration-500 ${isActive ? "text-zinc-600 dark:text-zinc-400 opacity-100" : "text-zinc-500 dark:text-zinc-500 opacity-80 group-hover:opacity-100"}`}>{f.desc}</p>
                        <div className="mt-3">
                          <span className="inline-flex rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 text-[10px] font-bold tracking-wide">{f.meta}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="hidden sm:inline-flex items-center gap-1.5">← Drag or hover to expand →</span>
              <span className="sm:hidden">Tap to expand • Swipe</span>
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" /> Hover to grow
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD - give it more page space so nav highlight lingers */}
      <section id="download" className="py-16 sm:py-20 lg:py-24 scroll-mt-[80px]">
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

              {/* dual download - v1.4.1 offline */}
              {(() => {
                const msi = (release as any)?.assets?.find((a: any) => a.name === "Sustainability-Hub-v1.4.1-offline.msi") || (release as any)?.assets?.find((a: any) => a.name.endsWith(".msi"))
                const apk = (release as any)?.assets?.find((a: any) => a.name.endsWith(".apk"))
                const tag = (release as any)?.tag_name || "v1.4.1"
                const msiUrl = msi?.browser_download_url || "https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/download/v1.4.1/Sustainability-Hub-v1.4.1-offline.msi"
                const apkUrl = apk?.browser_download_url || "https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/download/v1.4.1/SustainabilityHub-mobile-v1.0.4.apk"
                const msiSize = msi ? `${(msi.size / 1024 / 1024).toFixed(0)} MB` : "207 MB"
                const apkSize = apk ? `${(apk.size / 1024 / 1024).toFixed(0)} MB` : "215 MB"
                return (
                  <>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1 text-xs font-bold">
                      Latest: {tag} <span className="opacity-60">•</span> {msiSize} MSI + {apkSize} APK
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Card className="rounded-2xl p-4 border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 dark:bg-zinc-900/10">
                            <Monitor className="size-5" />
                          </span>
                          <div>
                            <div className="text-sm font-bold">Windows</div>
                            <div className="text-xs opacity-70">{tag} • {msiSize} MSI • Fully offline</div>
                          </div>
                        </div>
                        <div className="mt-3 rounded-xl bg-white/10 dark:bg-zinc-900/10 border border-white/10 p-2.5 font-mono text-[11px] break-all">Sustainability-Hub-v1.4.1-offline.msi</div>
                        <Button size="sm" className="mt-3 w-full rounded-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800" onClick={() => window.open(msiUrl, "_blank")}>
                          <Download className="size-4" /> Download for Windows
                        </Button>
                        <div className="mt-2 text-[11px] leading-relaxed opacity-70">Bundles WebView2 — no internet needed. <a href="https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/download/v1.4.0/Sustainability-Hub-v1.4.0-setup.msi" className="underline">Small 3.8 MB online installer</a> also available.</div>
                      </Card>
                      <Card className="rounded-2xl p-4 border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                            <Smartphone className="size-5" />
                          </span>
                          <div>
                            <div className="text-sm font-bold">Android</div>
                            <div className="text-xs text-zinc-500">APK • {apkSize} • Standalone</div>
                          </div>
                        </div>
                        <div className="mt-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border p-2.5 font-mono text-[11px] break-all">SustainabilityHub-mobile-v1.0.4.apk</div>
                        <Button size="sm" className="mt-3 w-full rounded-full" onClick={() => window.open(apkUrl, "_blank")}>
                          <Smartphone className="size-4" /> Download for Android
                        </Button>
                        <div className="mt-2 text-[11px] leading-relaxed text-zinc-500">Install like Instagram — allow “Install unknown apps”.</div>
                      </Card>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Button size="lg" className="rounded-full h-11 px-6 bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 w-full sm:w-auto shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300" onClick={() => window.open(msiUrl, "_blank")}>
                        <Download className="size-4" /> Download .exe / .msi
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full h-11 px-6 w-full sm:w-auto bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] transition-all duration-300"
                        onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/latest", "_blank")}
                      >
                        <GithubIcon className="size-4" /> All releases
                      </Button>
                    </div>
                  </>
                )
              })()}
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

      {/* CHANGELOG - v1.4.1 */}
      <section id="changelog" className="py-10 sm:py-16 bg-white dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full border bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs font-medium">
              <FileText className="size-3.5" /> Changelog
            </div>
            <h2 className="mt-3 text-[26px] sm:text-[32px] font-bold tracking-tight">What shipped.</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Latest is <span className="font-semibold text-zinc-900 dark:text-zinc-100">{(release as any)?.tag_name || "v1.4.1"}</span> — single Release with both MSI + APK.{" "}
              <a href="https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/latest" target="_blank" rel="noreferrer" className="underline">
                View on GitHub
              </a>
            </p>
          </div>
          <div className="mt-8 grid gap-4">
            {[
              {
                ver: "v1.4.1",
                date: "2026-08-26",
                badge: "Latest • Offline",
                color: "bg-emerald-600",
                items: ["Fully offline Windows — 207 MB MSI bundles WebView2 (no internet needed)", "Same Android APK 215 MB in one Release", "Tauri windows.webviewInstallMode: offlineInstaller"],
              },
              {
                ver: "v1.4.0",
                date: "2026-08-25",
                badge: "First combined",
                color: "bg-zinc-900 dark:bg-white dark:text-zinc-900",
                items: ["First combined Release: small MSI 3.8 MB + APK 215 MB in one", "Expo 54, Waste/Agri/PlantSense + Carbon/Energy/Food", "Fixed UTF-16 asset corruption, worklets 0.5.1"],
              },
              {
                ver: "v1.3.0",
                date: "2026-08-24",
                badge: "MSI only",
                color: "bg-zinc-600",
                items: ["Auto-open results, full-res 1600px, harmful red grading (0/100)", "AI keys settings, small MSI downloadBootstrapper 3.8 MB"],
              },
              {
                ver: "v1.2.0",
                date: "2026-08-23",
                badge: "Memory",
                color: "bg-violet-600",
                items: ["Persistent scan history with thumbnails", "Mid-analysis navigation survival", "All pages load real persisted data"],
              },
            ].map((r) => (
              <Card key={r.ver} className="rounded-2xl p-5 border-zinc-200 dark:border-zinc-800 flex gap-4">
                <div className={`hidden sm:flex size-10 items-center justify-center rounded-xl text-white shrink-0 ${r.color}`}>
                  <span className="text-xs font-bold">{r.ver}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold">{r.ver}</span>
                    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border px-2 py-0.5 text-[11px]">{r.date}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold text-white ${r.color}`}>{r.badge}</span>
                  </div>
                  <ul className="mt-2 list-disc pl-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {r.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-10 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full border bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs font-medium">
              <Bug className="size-3.5" /> FAQ & Troubleshooting
            </div>
            <h2 className="mt-3 text-[26px] sm:text-[32px] font-bold tracking-tight">Answers, honestly.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Why 207 MB vs 3.8 MB?",
                a: "3.8 MB is an online installer — if WebView2 is missing (common on Win 10), it downloads ~150 MB on first install. 207 MB bundles WebView2, so it installs fully offline. Both contain the complete app. After install, the app runs offline; only the AI analyzers need internet for Gemini.",
              },
              {
                q: "SmartScreen / antivirus warns?",
                a: "The MSI/APK are unsigned (student build). On Windows: “More info → Run anyway”. Antivirus may flag unsigned installers — allow it. Android: enable “Install unknown apps” for your browser, like with Instagram APK.",
              },
              {
                q: "Backend port 8000 conflict?",
                a: "The desktop app auto-starts FastAPI on :8000 + Vite on :1420 via start-app.pyw (windowless). If 8000 is busy, close the other app or change backend/.env PORT. Logs at start-app.log.",
              },
              {
                q: "Camera not working?",
                a: "Desktop: allow camera permission in Windows Settings → Privacy → Camera and in the WebView. Android: grant Camera permission when prompted. Try gallery upload if camera fails.",
              },
              {
                q: "Gemini API key?",
                a: "Put your key in backend/.env as GEMINI_API_KEY (get one at aistudio.google.com). Never put it in the website — all AI runs locally in the installed app. Without a key, trackers still work offline.",
              },
              {
                q: "Receipt OCR / Food photo accuracy?",
                a: "Receipt/bill OCR is currently simulated with plausible extraction — real OCR is on the roadmap. Food waste uses on-device color clustering (k-means in Lab), not Gemini — framed as smart estimation. Emission factors are published averages.",
              },
            ].map((f) => (
              <Card key={f.q} className="rounded-2xl p-5 border-zinc-200 dark:border-zinc-800">
                <div className="text-sm font-bold">{f.q}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{f.a}</div>
              </Card>
            ))}
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
                  <Button size="sm" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-[0.97] transition-all duration-300" onClick={() => window.open("https://github.com/Sahilpreetsinghvirdi/sustainability-hub", "_blank")}>
                    <GithubIcon className="size-4" /> Repo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-transparent border-white/20 text-white hover:bg-white hover:text-zinc-900 dark:border-zinc-900/20 dark:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-[0.97] transition-all duration-300"
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
          <div className="mt-8 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-6 text-xs text-zinc-500">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              <span>© 2026 Sahil Virdi • Indian Science Congress 2026</span>
              <span className="inline-flex items-center gap-1">
                Built with <span className="text-red-500">♥</span> TypeScript • Tailwind • shadcn • Tauri • Gemini
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">
                Latest: {(release as any)?.tag_name || "v1.4.1"}
                <a href="https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/tag/v1.4.1" target="_blank" rel="noreferrer" className="underline">
                  Release
                </a>
                <span className="opacity-60">•</span>
                <a href="https://github.com/Sahilpreetsinghvirdi/sustainability-hub/releases/latest" target="_blank" rel="noreferrer" className="underline">
                  Download
                </a>
              </span>
              <span className="text-zinc-400">207 MB MSI (offline) + 215 MB APK — one Release</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Upload,
  Scan,
  Leaf,
  Recycle,
  Bot,
  Lightbulb,
  Smartphone,
  TriangleAlert,
  Search,
  Trash2,
  Earth,
  Sparkles,
  ArrowRight,
  Moon,
  Sun,
  X,
  RotateCcw,
  Check,
  Clock,
  BarChart3,
  Globe,
  Sprout,
  ShieldCheck,
  Layers,
  FlaskConical,
} from "lucide-react"

// Types
type WasteCategory = {
  id: string
  label: string
  icon: string
  category: string
  color: string
  bg: string
  confidence: number
  recyclable: string
  impact: string
  guide: string[]
  reuse: string[]
  time: string
  co2: string
}

const wasteDatabase: WasteCategory[] = [
  {
    id: "plastic",
    label: "Plastic Bottle",
    icon: "🧴",
    category: "Plastic • PET",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500",
    confidence: 96,
    recyclable: "Highly Recyclable",
    impact:
      "Plastic takes up to 450 years to decompose. When littered, it breaks into microplastics that contaminate soil, oceans and food chains, harming marine life and human health.",
    guide: [
      "Empty and rinse the bottle",
      "Remove cap & label if possible",
      "Flatten to save space",
      "Put in the plastic / PET recycling bin",
    ],
    reuse: [
      "Refill as a water bottle",
      "DIY planter or bird feeder",
      "Storage for grains or craft supplies",
    ],
    time: "450 years",
    co2: "0.05 kg CO₂ saved per bottle recycled",
  },
  {
    id: "organic",
    label: "Organic Waste",
    icon: "🍎",
    category: "Organic • Compostable",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500",
    confidence: 94,
    recyclable: "Compostable",
    impact:
      "Food scraps in landfills generate methane — a greenhouse gas 80x more potent than CO₂. Composting returns nutrients to soil and cuts methane emissions.",
    guide: [
      "Separate from plastic & metal",
      "Collect in compost bin / green waste",
      "Keep moist but not soggy",
      "Turn compost regularly",
    ],
    reuse: [
      "Home compost for garden fertilizer",
      "Make vegetable stock from peels",
      "Worm composting (vermicompost)",
    ],
    time: "2-6 weeks",
    co2: "0.2 kg CO₂e avoided per kg composted",
  },
  {
    id: "metal",
    label: "Metal Can",
    icon: "🥫",
    category: "Metal • Aluminium",
    color: "text-zinc-600 dark:text-zinc-300",
    bg: "bg-zinc-500",
    confidence: 97,
    recyclable: "Infinitely Recyclable",
    impact:
      "Mining bauxite and iron ore is energy-intensive and destroys habitats. Recycling aluminium saves 95% of the energy needed to make new metal.",
    guide: [
      "Rinse to remove food residue",
      "Crush if possible",
      "Do not include aerosols with gas",
      "Drop in metal recycling bin",
    ],
    reuse: [
      "Pencil holder or planter",
      "DIY lantern or organizer",
      "Scrap collection for artisans",
    ],
    time: "50-200 years",
    co2: "2.5 kg CO₂ saved per kg aluminium recycled",
  },
  {
    id: "paper",
    label: "Paper & Cardboard",
    icon: "📦",
    category: "Paper • Cellulose",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500",
    confidence: 92,
    recyclable: "Highly Recyclable",
    impact:
      "Paper production drives deforestation and high water use. Recycling 1 ton of paper saves 17 trees and 26,000 liters of water.",
    guide: [
      "Keep dry and clean",
      "Remove tape & staples",
      "Flatten boxes",
      "Put in paper recycling",
    ],
    reuse: [
      "Wrap gifts or protect fragile items",
      "DIY storage boxes",
      "Shred for compost or packing",
    ],
    time: "2-6 months",
    co2: "1 ton = 17 trees saved",
  },
  {
    id: "glass",
    label: "Glass Bottle",
    icon: "🍾",
    category: "Glass • Silica",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500",
    confidence: 95,
    recyclable: "100% Recyclable",
    impact:
      "Glass never truly decomposes. In landfills it sits for millennia, but it is infinitely recyclable without quality loss.",
    guide: [
      "Rinse and remove lids",
      "Do not mix broken ceramics",
      "Separate by color if required",
      "Use glass recycling container",
    ],
    reuse: [
      "Vase or storage jar",
      "Candle holder",
      "Self-watering planter",
    ],
    time: "1M+ years (doesn't decompose)",
    co2: "0.3 kg CO₂ saved per kg recycled",
  },
  {
    id: "ewaste",
    label: "E-Waste",
    icon: "🔋",
    category: "E-Waste • Hazardous",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-500",
    confidence: 89,
    recyclable: "Special Handling Required",
    impact:
      "E-waste contains lead, mercury and cadmium that leach into soil and water. 50M tons are generated yearly, only 20% properly recycled.",
    guide: [
      "Never put in regular trash",
      "Tape battery terminals",
      "Take to e-waste kiosk / retailer",
      "Erase personal data first",
    ],
    reuse: [
      "Donate working devices",
      "Repair / refurbish",
      "Sell parts to certified recyclers",
    ],
    time: "500+ years + toxin leak",
    co2: "Prevents heavy metal pollution",
  },
]

export default function App() {
  const [dark, setDark] = useState(false)
  const [activeNav, setActiveNav] = useState("home")
  const [isStreaming, setIsStreaming] = useState(false)
  const [captured, setCaptured] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<WasteCategory | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // dark mode
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [dark])

  // scroll spy
  useEffect(() => {
    const onScroll = () => {
      const sections = ["home", "scanner", "how", "about"]
      const scrollPos = window.scrollY + 120
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

  // cleanup stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsStreaming(true)
      setCaptured(null)
      setResult(null)
    } catch (e) {
      console.error(e)
      alert("Could not access camera. Please allow camera permission or use Upload.")
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setIsStreaming(false)
    if (videoRef.current) videoRef.current.srcObject = null
  }

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return
    const v = videoRef.current
    const c = canvasRef.current
    c.width = v.videoWidth
    c.height = v.videoHeight
    const ctx = c.getContext("2d")
    if (!ctx) return
    ctx.drawImage(v, 0, 0)
    const data = c.toDataURL("image/jpeg", 0.9)
    setCaptured(data)
    stopCamera()
    analyze(data)
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      setCaptured(data)
      setIsStreaming(false)
      stopCamera()
      analyze(data)
    }
    reader.readAsDataURL(f)
    // reset so same file can be selected again
    e.target.value = ""
  }

  const analyze = (imageData: string) => {
    void imageData
    setAnalyzing(true)
    setResult(null)
    // quick heuristic: pick based on random but seeded by image size?
    setTimeout(() => {
      const pick = wasteDatabase[Math.floor(Math.random() * wasteDatabase.length)]
      // add slight variance to confidence
      const jittered = { ...pick, confidence: 88 + Math.floor(Math.random() * 11) }
      setResult(jittered)
      setAnalyzing(false)
      // scroll result into view on mobile
      setTimeout(() => {
        document.getElementById("analysis-card")?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    }, 1650)
  }

  const reset = () => {
    setCaptured(null)
    setResult(null)
    setAnalyzing(false)
    stopCamera()
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenu(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-[64px] w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold text-[18px] tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-[16px]">
              🌱
            </span>
            <span className="hidden sm:inline">
              Eco <span className="text-primary">AI</span>
            </span>
            <span className="sm:hidden">
              Eco<span className="text-primary">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "scanner", label: "Scanner" },
              { id: "how", label: "How It Works" },
              { id: "about", label: "About" },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`rounded-full px-4 py-2 transition ${activeNav === n.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button className="hidden md:inline-flex rounded-full" onClick={() => scrollTo("scanner")}>
              <Scan className="size-4" /> Scan Waste
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Menu"
            >
              {mobileMenu ? <X className="size-5" /> : <Layers className="size-5" />}
            </Button>
          </div>
        </div>
        {mobileMenu && (
          <div className="border-t bg-background md:hidden">
            <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 p-4">
              {["home", "scanner", "how", "about"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`rounded-xl px-4 py-3 text-left text-sm font-medium capitalize ${activeNav === id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                >
                  {id === "how" ? "How It Works" : id}
                </button>
              ))}
              <Button className="mt-2 w-full rounded-xl" onClick={() => scrollTo("scanner")}>
                <Camera className="size-4" /> Scan Waste Now
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        {/* subtle background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />
          <div className="absolute -top-24 right-[-10%] size-[520px] rounded-full bg-primary/10 blur-[90px]" />
          <div className="absolute top-[30%] left-[-10%] size-[420px] rounded-full bg-emerald-300/10 blur-[90px] dark:bg-emerald-900/15" />
        </div>

        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-8 md:py-16 lg:py-20">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-4 w-fit gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold tracking-wide shadow-sm dark:bg-card">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />♻️ AI-POWERED ENVIRONMENTAL TECHNOLOGY
            </Badge>

            <h1 className="text-[34px] font-extrabold leading-[0.98] tracking-tight sm:text-[42px] lg:text-[54px]">
              Turn Your <span className="bg-gradient-to-br from-primary to-emerald-600 bg-clip-text text-transparent">Waste</span> Into Action.
            </h1>

            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Take a photo of garbage and Eco AI helps you understand what it is, its environmental effects, possible reuse, and how it should be
              recycled.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-7 shadow-lg shadow-primary/20" onClick={() => scrollTo("scanner")}>
                <Camera className="size-4" /> Scan Waste
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-white dark:bg-card" onClick={() => scrollTo("how")}>
                Learn More <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-[480px]">
              {[
                { icon: <Recycle className="size-4 text-primary" />, label: "Recycle", sub: "Smarter" },
                { icon: <Earth className="size-4 text-emerald-600" />, label: "Protect", sub: "Earth" },
                { icon: <Bot className="size-4 text-violet-600" />, label: "AI", sub: "Powered" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 rounded-2xl border bg-card px-3 py-3 shadow-sm">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">{s.icon}</div>
                  <div className="leading-none">
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[520px]">
              {/* soft card behind */}
              <div className="absolute inset-0 -rotate-1 rounded-[28px] bg-gradient-to-br from-primary/15 via-emerald-200/20 to-teal-200/20 blur-[1px] dark:from-primary/10" />
              <div className="relative rounded-[28px] border bg-card p-5 shadow-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-white">
                      <Recycle className="size-4" />
                    </span>
                    Eco Scanner Live
                  </div>
                  <Badge className="rounded-full bg-emerald-500 hover:bg-emerald-500">
                    <span className="size-1.5 rounded-full bg-white animate-pulse" /> Online
                  </Badge>
                </div>

                {/* recycle hero illustration */}
                <div className="mt-5 flex items-center justify-center">
                  <div className="relative">
                    <div className="flex size-[190px] items-center justify-center rounded-full border-[8px] border-primary/10 bg-gradient-to-br from-primary/15 to-emerald-500/15 sm:size-[220px]">
                      <div className="flex size-[150px] items-center justify-center rounded-full bg-white shadow-inner dark:bg-card sm:size-[170px]">
                        <span className="text-[82px] leading-none drop-shadow-sm">♻️</span>
                      </div>
                    </div>
                    {/* floating badges */}
                    <div className="absolute -left-6 top-4 flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-lg dark:bg-card sm:-left-10">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-sky-100 text-[18px] dark:bg-sky-900/30">🧴</span>
                      <span className="text-sm font-semibold leading-none">
                        Plastic<br />
                        <span className="text-xs font-medium text-emerald-600">Recyclable</span>
                      </span>
                    </div>
                    <div className="absolute -right-2 bottom-10 flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-lg dark:bg-card sm:-right-8">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-amber-100 text-[18px] dark:bg-amber-900/30">🍎</span>
                      <span className="text-sm font-semibold leading-none">
                        Organic<br />
                        <span className="text-xs font-medium text-amber-600">Compostable</span>
                      </span>
                    </div>
                    <div className="absolute -left-2 bottom-0 flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-lg dark:bg-card sm:-left-6">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-zinc-100 text-[18px] dark:bg-zinc-800">🥫</span>
                      <span className="text-sm font-semibold leading-none">
                        Metal<br />
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Recyclable</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-2xl bg-primary/10 py-3 font-medium text-primary">
                    <div className="text-lg font-bold leading-none">96%</div> Accuracy
                  </div>
                  <div className="rounded-2xl bg-emerald-500/10 py-3 font-medium text-emerald-700 dark:text-emerald-400">
                    <div className="text-lg font-bold leading-none">&lt;2s</div> Analysis
                  </div>
                  <div className="rounded-2xl bg-amber-500/10 py-3 font-medium text-amber-700 dark:text-amber-400">
                    <div className="text-lg font-bold leading-none">6+</div> Categories
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCANNER */}
      <section id="scanner" className="border-t bg-muted/30 py-10 sm:py-14">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-[720px] text-center">
            <Badge variant="secondary" className="rounded-full border bg-white px-3 py-1 dark:bg-card">
              SMART WASTE SCANNER
            </Badge>
            <h2 className="mt-3 text-[28px] font-extrabold tracking-tight sm:text-4xl">Identify Your Garbage</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">Use your camera or upload a photo to analyze waste.</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Step 1 */}
            <Card className="overflow-hidden rounded-[22px] border shadow-sm">
              <div className="flex items-center gap-3 border-b bg-card px-5 py-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</span>
                <div>
                  <div className="text-sm font-semibold">Capture Waste</div>
                  <div className="text-xs text-muted-foreground">Camera or upload</div>
                </div>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 sm:inline-flex">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>
              <CardContent className="p-5">
                {/* preview area */}
                <div className="relative overflow-hidden rounded-2xl border bg-black">
                  {captured ? (
                    <img src={captured} alt="Captured waste" className="aspect-[4/3] w-full object-cover" />
                  ) : isStreaming ? (
                    <video ref={videoRef} autoPlay playsInline muted className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 text-center">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                        <Camera className="size-7 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-white">Camera Ready</div>
                      <div className="max-w-[260px] text-xs leading-relaxed text-white/60">Start the camera to photograph waste — good lighting helps AI accuracy</div>
                    </div>
                  )}

                  {/* overlay label */}
                  <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    <Scan className="size-3.5" /> Eco AI Scanner
                  </div>

                  {captured && (
                    <button
                      onClick={reset}
                      className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
                      aria-label="Remove"
                    >
                      <X className="size-4" />
                    </button>
                  )}

                  {isStreaming && (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      <span className="size-2 animate-pulse rounded-full bg-white" /> Recording
                    </div>
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {!isStreaming ? (
                    <Button onClick={startCamera} className="col-span-2 rounded-xl">
                      <Camera className="size-4" /> Start Camera
                    </Button>
                  ) : (
                    <>
                      <Button onClick={capture} className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                        <Scan className="size-4" /> Capture
                      </Button>
                      <Button variant="outline" onClick={stopCamera} className="rounded-xl">
                        Stop
                      </Button>
                    </>
                  )}
                  <Button
                    variant={isStreaming ? "outline" : "secondary"}
                    className="rounded-xl"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload className="size-4" /> Upload
                  </Button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>Supports JPG, PNG • Max 10MB</span>
                  {captured && (
                    <button onClick={reset} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      <RotateCcw className="size-3" /> Retake
                    </button>
                  )}
                </div>

                <div className="mt-3 hidden items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-800 dark:bg-amber-950/40 dark:text-amber-200 sm:flex">
                  <Lightbulb className="size-4 shrink-0" /> Tip: Capture a clear, well-lit image for best results.
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card id="analysis-card" className="overflow-hidden rounded-[22px] border shadow-sm">
              <div className="flex items-center gap-3 border-b bg-card px-5 py-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">2</span>
                <div>
                  <div className="text-sm font-semibold">Eco AI Analysis</div>
                  <div className="text-xs text-muted-foreground">Environmental report</div>
                </div>
                {result && <Badge className="ml-auto rounded-full bg-emerald-500">Done</Badge>}
                {analyzing && <Badge variant="secondary" className="ml-auto animate-pulse rounded-full">Analyzing…</Badge>}
                {!result && !analyzing && <Badge variant="outline" className="ml-auto rounded-full">Waiting</Badge>}
              </div>

              <CardContent className="p-5">
                {!captured && !analyzing && !result ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/40 px-6 py-14 text-center">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-card">
                      <Search className="size-6 text-muted-foreground" />
                    </div>
                    <div className="mt-4 text-sm font-semibold">No Waste Detected Yet</div>
                    <div className="mt-1 max-w-[280px] text-xs leading-relaxed text-muted-foreground">
                      Capture or upload a picture to receive your environmental report.
                    </div>
                    <div className="mt-5 grid w-full max-w-[320px] grid-cols-3 gap-2 text-xs">
                      <div className="rounded-xl border bg-white px-2 py-3 dark:bg-card">
                        <div className="text-[18px]">♻️</div>
                        <div className="mt-1 font-medium">Recycling</div>
                      </div>
                      <div className="rounded-xl border bg-white px-2 py-3 dark:bg-card">
                        <div className="text-[18px]">🌍</div>
                        <div className="mt-1 font-medium">Impact</div>
                      </div>
                      <div className="rounded-xl border bg-white px-2 py-3 dark:bg-card">
                        <div className="text-[18px]">💡</div>
                        <div className="mt-1 font-medium">Reuse</div>
                      </div>
                    </div>
                  </div>
                ) : analyzing ? (
                  <div className="rounded-2xl border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                        <Sparkles className="size-5 animate-pulse text-primary" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold">Eco AI is analyzing…</div>
                        <div className="text-xs text-muted-foreground">Detecting material • Checking impact • Finding reuse ideas</div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[75%] animate-[shimmer_1.2s_ease-in-out_infinite] bg-gradient-to-r from-primary via-emerald-500 to-primary" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 animate-pulse rounded-xl bg-muted" />
                        <div className="h-16 animate-pulse rounded-xl bg-muted delay-100" />
                        <div className="h-16 animate-pulse rounded-xl bg-muted delay-200" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                    <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}`}</style>
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    {/* detected header */}
                    <div className="flex items-start gap-3 rounded-2xl border bg-gradient-to-br from-white to-muted/40 p-4 dark:from-card dark:to-muted/20">
                      <div className={`flex size-14 items-center justify-center rounded-2xl text-2xl text-white shadow ${result.bg}`}>{result.icon}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold leading-none">{result.label}</h3>
                          <Badge className="rounded-full bg-emerald-500 text-[11px]">{result.confidence}% confident</Badge>
                        </div>
                        <div className={`mt-1 text-xs font-medium ${result.color}`}>{result.category}</div>
                        <div className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{result.recyclable}</div>
                      </div>
                    </div>

                    {/* stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-2xl border bg-card p-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <Clock className="size-3.5" /> Decomposition
                        </div>
                        <div className="mt-1 text-sm font-bold">{result.time}</div>
                      </div>
                      <div className="rounded-2xl border bg-card p-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <BarChart3 className="size-3.5" /> Impact
                        </div>
                        <div className="mt-1 text-sm font-bold leading-none">{result.co2}</div>
                      </div>
                    </div>

                    {/* impact */}
                    <div className="rounded-2xl border bg-amber-50/70 p-4 dark:bg-amber-950/20">
                      <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
                        <TriangleAlert className="size-4" /> Environmental Impact
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80">{result.impact}</p>
                    </div>

                    {/* guide */}
                    <div className="rounded-2xl border bg-emerald-50/70 p-4 dark:bg-emerald-950/20">
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                        <Recycle className="size-4" /> Recycling Guide
                      </div>
                      <ul className="mt-2 space-y-2">
                        {result.guide.map((g) => (
                          <li key={g} className="flex gap-2 text-xs leading-relaxed">
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                              <Check className="size-3" />
                            </span>
                            <span className="text-emerald-900/80 dark:text-emerald-100/80">{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* reuse */}
                    <div className="rounded-2xl border bg-violet-50/70 p-4 dark:bg-violet-950/20">
                      <div className="flex items-center gap-2 text-sm font-semibold text-violet-800 dark:text-violet-200">
                        <Lightbulb className="size-4" /> Reuse Ideas
                      </div>
                      <ul className="mt-2 space-y-2">
                        {result.reuse.map((r) => (
                          <li key={r} className="flex gap-2 text-xs leading-relaxed">
                            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-violet-600" />
                            <span className="text-violet-900/80 dark:text-violet-100/80">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-xl" onClick={reset}>
                        <RotateCcw className="size-4" /> Scan Another
                      </Button>
                      <Button className="flex-1 rounded-xl" onClick={() => scrollTo("how")}>
                        Learn More
                      </Button>
                    </div>

                    <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                      Demo inference • For best results, replace with a real vision model (TensorFlow, Roboflow, or OpenAI Vision).
                    </p>
                  </div>
                ) : null}

                {/* recycling recommendation empty state decorative */}
                {!result && !analyzing && captured && (
                  <div className="mt-4 hidden rounded-xl border bg-white px-4 py-3 dark:bg-card">
                    <div className="text-xs font-semibold">♻️ Recycling Recommendation</div>
                    <div className="mt-1 text-xs text-muted-foreground">Analyzing your image…</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center">
            <div className="text-xs font-bold tracking-[0.14em] text-primary">POWERFUL FEATURES</div>
            <h2 className="mt-2 text-[28px] font-extrabold tracking-tight sm:text-4xl">More Than Just A Scanner</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Bot className="size-5" />,
                title: "AI Waste Detection",
                desc: "Analyze images and identify common waste categories instantly.",
                color: "bg-violet-600",
              },
              {
                icon: <TriangleAlert className="size-5" />,
                title: "Environmental Impact",
                desc: "Learn about the harmful effects of incorrectly disposing different materials.",
                color: "bg-amber-500",
              },
              {
                icon: <Recycle className="size-5" />,
                title: "Recycling Guide",
                desc: "Get simple, step-by-step instructions for recycling and separation.",
                color: "bg-emerald-600",
              },
              {
                icon: <Lightbulb className="size-5" />,
                title: "Reuse Ideas",
                desc: "Discover creative ways to reuse waste instead of throwing it away.",
                color: "bg-sky-600",
              },
              {
                icon: <Leaf className="size-5" />,
                title: "Eco Friendly",
                desc: "Encourage better waste habits and reduce environmental damage.",
                color: "bg-green-600",
              },
              {
                icon: <Smartphone className="size-5" />,
                title: "Mobile Friendly",
                desc: "Use Eco AI from your phone, tablet or computer — anywhere.",
                color: "bg-zinc-800 dark:bg-zinc-700",
              },
            ].map((f) => (
              <Card key={f.title} className="group rounded-[20px] border bg-card p-5 shadow-sm transition hover:shadow-md">
                <div className={`flex size-10 items-center justify-center rounded-xl text-white shadow ${f.color}`}>{f.icon}</div>
                <div className="mt-4 text-[15px] font-semibold">{f.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center">
            <div className="text-xs font-bold tracking-[0.14em] text-primary">HOW IT WORKS</div>
            <h2 className="mt-2 text-[28px] font-extrabold tracking-tight sm:text-4xl">Three Simple Steps</h2>
          </div>

          <div className="relative mt-10 grid gap-6 md:grid-cols-3">
            {/* connector line */}
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-[36px] hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20 md:block" />
            {[
              {
                n: "01",
                icon: <Camera className="size-6" />,
                title: "Take A Photo",
                desc: "Point your camera at the garbage and capture a clear image.",
              },
              {
                n: "02",
                icon: <Bot className="size-6" />,
                title: "Eco AI Analyzes",
                desc: "The system analyzes the image and determines likely waste categories.",
              },
              {
                n: "03",
                icon: <Recycle className="size-6" />,
                title: "Recycle Correctly",
                desc: "Follow the recommended reuse, recycling and disposal guidance.",
              },
            ].map((s) => (
              <Card key={s.n} className="relative rounded-[20px] border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">{s.icon}</div>
                <div className="mx-auto mt-3 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wide text-primary">{s.n}</div>
                <div className="mt-3 text-base font-semibold">{s.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs font-bold tracking-[0.14em] text-primary">ABOUT ECO AI</div>
              <h2 className="mt-2 text-[28px] font-extrabold tracking-tight sm:text-4xl">Technology For A Cleaner Future</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Eco AI is designed to make environmental education practical. Instead of simply telling people that waste is harmful, it explains{" "}
                <span className="font-semibold text-foreground">what the material is, why it matters and what people can do with it.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                The application can be expanded with a real computer vision model, recycling-center databases, AI APIs, user accounts and
                environmental impact tracking — turning a demo into a city-scale waste assistant.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex gap-3 rounded-2xl border bg-card p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <Sprout className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Small Actions</div>
                    <div className="text-xs leading-relaxed text-muted-foreground">Can create a big environmental difference when multiplied by millions.</div>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl border bg-card p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                    <FlaskConical className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Expandable AI</div>
                    <div className="text-xs leading-relaxed text-muted-foreground">Add real detection models, maps, and impact dashboards anytime.</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full" onClick={() => scrollTo("scanner")}>
                  <Sparkles className="size-4" /> Try Scanner Now
                </Button>
                <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-medium shadow-sm">
                  <ShieldCheck className="size-4 text-primary" /> Built with TypeScript + shadcn/ui
                </div>
              </div>
            </div>

            {/* right stats */}
            <div className="relative">
              <div className="grid gap-4">
                <div className="rounded-[22px] border bg-gradient-to-br from-primary to-emerald-600 p-6 text-white shadow-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
                    <Globe className="size-4" /> Our Mission
                  </div>
                  <div className="mt-3 text-[22px] font-extrabold leading-tight">Make recycling second nature — with AI.</div>
                  <div className="mt-2 text-sm leading-relaxed opacity-90">From classrooms to smart cities, Eco AI turns everyday waste photos into actionable eco-knowledge.</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="rounded-[20px] p-5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                      <Trash2 className="size-5" />
                    </div>
                    <div className="mt-3 text-2xl font-extrabold leading-none">2B+</div>
                    <div className="text-xs font-medium text-muted-foreground">Tons of waste / year globally</div>
                  </Card>
                  <Card className="rounded-[20px] p-5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <Recycle className="size-5" />
                    </div>
                    <div className="mt-3 text-2xl font-extrabold leading-none">14%</div>
                    <div className="text-xs font-medium text-muted-foreground">Plastic actually recycled today</div>
                  </Card>
                  <Card className="rounded-[20px] p-5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                      <Leaf className="size-5" />
                    </div>
                    <div className="mt-3 text-2xl font-extrabold leading-none">71%</div>
                    <div className="text-xs font-medium text-muted-foreground">People want to recycle — need guidance</div>
                  </Card>
                  <Card className="rounded-[20px] p-5 bg-zinc-900 text-white dark:bg-zinc-900">
                    <div className="text-xs font-semibold tracking-wide opacity-70">ECO AI PROMISE</div>
                    <div className="mt-2 text-sm font-bold leading-snug">Smart Waste • Smart Recycling • Better Future</div>
                    <div className="mt-2 text-xs opacity-70">Educate • Empower • Act</div>
                  </Card>
                </div>
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
                <div className="text-sm font-bold">
                  Eco <span className="text-primary">AI</span>
                </div>
                <div className="text-xs text-muted-foreground">Smart Waste • Smart Recycling • Better Future</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <button onClick={() => scrollTo("home")} className="rounded-full px-3 py-1.5 hover:bg-accent">
                Home
              </button>
              <button onClick={() => scrollTo("scanner")} className="rounded-full px-3 py-1.5 hover:bg-accent">
                Scanner
              </button>
              <button onClick={() => scrollTo("how")} className="rounded-full px-3 py-1.5 hover:bg-accent">
                How It Works
              </button>
              <button onClick={() => scrollTo("about")} className="rounded-full px-3 py-1.5 hover:bg-accent">
                About
              </button>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>© 2026 Eco AI — Technology for a cleaner future.</span>
            <span className="inline-flex items-center gap-1.5">
              Made with <span className="text-red-500">♥</span> for the planet • TypeScript + Tailwind + shadcn/ui
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

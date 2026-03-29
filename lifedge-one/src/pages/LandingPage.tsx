import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Globe,
  ShieldCheck,
  ArrowRight,
  Landmark,
  FileText,
  Briefcase,
  Layers,
  Sun,
  Moon,
  Filter
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, Brush
} from 'recharts';
import { useTheme } from '../components/ThemeProvider';
import LiberiaInteractiveMap from '../components/LiberiaInteractiveMap';
import { cn } from '../lib/utils';
// Remove HeroMagazineSpread as we are reverting to direct carousel
// import HeroMagazineSpread from '../components/HeroMagazineSpread';

const COLORS = ['#D4AF37', '#1E4D2B', '#4ade80', '#facc15', '#60a5fa'];

const generateMockDataArea = () => {
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let baseValue = 3000;
  for (let year = 2022; year <= 2026; year++) {
    for (let month = 0; month < 12; month++) {
      baseValue += Math.floor(Math.random() * 1000) - 400;
      data.push({
        name: `${months[month]} '${year.toString().slice(2)}`,
        value: Math.max(1000, baseValue),
        year,
        month
      });
    }
  }
  return data;
};

const generateMockDataBar = () => {
  const data = [];
  let rev = 2000;
  let exp = 1500;
  for (let year = 2022; year <= 2026; year++) {
    for (let q = 1; q <= 4; q++) {
      rev += Math.floor(Math.random() * 800) - 300;
      exp += Math.floor(Math.random() * 600) - 200;
      data.push({
        name: `Q${q} '${year.toString().slice(2)}`,
        revenue: Math.max(1000, rev),
        expense: Math.max(800, exp),
        year
      });
    }
  }
  return data;
};

const fullDataArea = generateMockDataArea();
const fullDataBar = generateMockDataBar();

const mockDataPie = [
  { name: 'Education', value: 400 }, { name: 'Health', value: 300 },
  { name: 'Infrastructure', value: 300 }, { name: 'Defense', value: 200 },
];

const mockDataScatter = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
];

const CustomTooltip = ({ active, payload, label, chartType }: any) => {
  if (active && payload && payload.length) {
    if (chartType === 'scatter') {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
          <p className="text-sm font-medium text-foreground mb-2">Risk Profile</p>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted">Probability:</span>
              <span className="font-medium text-foreground">{data.x}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">Impact:</span>
              <span className="font-medium text-foreground">${data.y}M</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">Exposure:</span>
              <span className="font-medium text-foreground">${data.z}M</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background/95 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
        <p className="text-sm font-medium text-foreground mb-2">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            <span className="text-muted capitalize">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {chartType === 'pie' ? `$${entry.value.toLocaleString()}M` : `$${entry.value.toLocaleString()}`}
            </span>
          </div>
        ))}
        {chartType === 'bar' && payload.length === 2 && (
          <div className="mt-2 pt-2 border-t border-border flex items-center gap-2 text-sm">
            <span className="text-muted">Net:</span>
            <span className={cn("font-medium", payload[0].value - payload[1].value >= 0 ? "text-brand-green" : "text-red-500")}>
              ${(payload[0].value - payload[1].value).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const ChartCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [timeframe, setTimeframe] = useState('1Y');
  const { theme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const tooltipBg = isDark ? '#1A1A1A' : '#FFFFFF';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Filter data based on timeframe
  const getFilteredData = (data: any[]) => {
    const currentYear = 2026;
    if (timeframe === 'YTD') {
      return data.filter(d => d.year === currentYear);
    } else if (timeframe === '1Y') {
      return data.slice(-12); // Last 12 items (months or quarters might differ, but for simplicity)
    } else if (timeframe === '5Y') {
      return data;
    }
    return data;
  };

  const filteredArea = getFilteredData(fullDataArea);
  const filteredBar = timeframe === '1Y' ? fullDataBar.slice(-4) : timeframe === 'YTD' ? fullDataBar.filter(d => d.year === 2026) : fullDataBar;

  const charts = [
    {
      id: 'area',
      title: 'Macroeconomic Forecasting',
      component: (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredArea}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
            <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <RechartsTooltip content={<CustomTooltip chartType="area" />} cursor={{ stroke: axisColor, strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorValue)" activeDot={{ r: 6, fill: '#D4AF37', stroke: tooltipBg, strokeWidth: 2 }} />
            <Brush dataKey="name" height={30} stroke="#D4AF37" fill={isDark ? '#1A1A1A' : '#F5F5F5'} tickFormatter={() => ''} />
          </AreaChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'bar',
      title: 'Budget vs Execution',
      component: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredBar}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <RechartsTooltip content={<CustomTooltip chartType="bar" />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
            <Bar dataKey="revenue" name="Revenue" fill="#1E4D2B" radius={[4, 4, 0, 0]} activeBar={{ stroke: '#4ade80', strokeWidth: 2 }} />
            <Bar dataKey="expense" name="Expense" fill="#D4AF37" radius={[4, 4, 0, 0]} activeBar={{ stroke: '#facc15', strokeWidth: 2 }} />
            <Brush dataKey="name" height={30} stroke="#1E4D2B" fill={isDark ? '#1A1A1A' : '#F5F5F5'} tickFormatter={() => ''} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'pie',
      title: 'Appropriation by Sector',
      component: (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={mockDataPie}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {mockDataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer" />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip chartType="pie" />} />
          </RechartsPieChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'scatter',
      title: 'Fiscal Risk Distribution',
      component: (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={mockDataScatter}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis type="number" dataKey="x" name="Probability" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis type="number" dataKey="y" name="Impact" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <ZAxis type="number" dataKey="z" range={[60, 400]} name="Exposure" />
            <RechartsTooltip content={<CustomTooltip chartType="scatter" />} cursor={{ strokeDasharray: '3 3', stroke: axisColor }} />
            <Scatter name="Risks" fill="#D4AF37" opacity={0.8} className="cursor-pointer hover:opacity-100 transition-opacity" />
            <Brush dataKey="x" height={30} stroke="#D4AF37" fill={isDark ? '#1A1A1A' : '#F5F5F5'} tickFormatter={() => ''} />
          </ScatterChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'map',
      title: 'Geographic Tool (Liberia)',
      component: (
        <div className="w-full h-full flex flex-col pt-4 overflow-visible min-h-[300px]">
          <LiberiaInteractiveMap />
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % charts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [charts.length, isHovered]);

  return (
    <div
      className="relative w-full h-[450px] lg:h-[550px] glass-panel p-6 overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 z-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2 bg-foreground/5 border border-border rounded-lg px-3 py-1.5 hover:bg-foreground/10 transition-colors cursor-pointer">
            <span className="text-lg font-medium text-foreground font-serif tracking-wide pointer-events-none">
              {charts[currentIndex].title}
            </span>
            <div className="pointer-events-none text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Select economic indicator"
            >
              {charts.map((chart, idx) => (
                <option key={idx} value={idx} className="text-sm font-sans">{chart.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {['area', 'bar'].includes(charts[currentIndex].id) && (
            <div className="relative flex items-center gap-2 bg-foreground/5 border border-border rounded-lg px-3 py-1.5 hover:bg-foreground/10 transition-colors cursor-pointer">
              <Filter className="w-3.5 h-3.5 text-muted pointer-events-none" />
              <span className="text-xs font-medium text-foreground pointer-events-none">
                {timeframe === 'YTD' ? 'YTD' : timeframe === '1Y' ? '1 Year' : '5 Years'}
              </span>
              <div className="pointer-events-none text-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Select timeframe"
              >
                <option value="YTD">YTD</option>
                <option value="1Y">1 Year</option>
                <option value="5Y">5 Years</option>
              </select>
            </div>
          )}
          <div className="flex gap-2">
            {charts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View chart ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-gold w-6' : 'bg-foreground/20'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full aspect-[4/3] md:aspect-auto"
          >
            {charts[currentIndex].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-green/10 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
};

const Typewriter = ({ className }: { className?: string }) => {
  const [parts, setParts] = useState<{ text: string, className: string }[]>([]);
  const isActiveRef = useRef(true);

  useEffect(() => {
    isActiveRef.current = true;
    setParts([]); // Reset to prevent double typing in React StrictMode

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const phrases = [
      { text: "Unified Finance.", className: "text-gradient-gold" },
      { text: " Smarter Planning.", className: "text-gradient-green" },
      { text: " Stronger Delivery.", className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500" }
    ];

    const standalonePhrases = [
      { text: "Unified Finance.", className: "text-gradient-gold" },
      { text: "Smarter Planning.", className: "text-gradient-green" },
      { text: "Stronger Delivery.", className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500" }
    ];

    const typeText = async (textToType: string, className: string) => {
      setParts(prev => [...prev, { text: '', className }]);
      for (let i = 1; i <= textToType.length; i++) {
        if (!isActiveRef.current) return;
        setParts(prev => {
          const newParts = [...prev];
          newParts[newParts.length - 1] = { ...newParts[newParts.length - 1], text: textToType.slice(0, i) };
          return newParts;
        });
        await delay(40);
      }
    };

    const deleteLastPart = async () => {
      let textLength = 0;
      setParts(prev => {
        textLength = prev[prev.length - 1]?.text.length || 0;
        return prev;
      });

      for (let i = textLength - 1; i >= 0; i--) {
        if (!isActiveRef.current) return;
        setParts(prev => {
          const newParts = [...prev];
          if (newParts.length > 0) {
            newParts[newParts.length - 1] = { ...newParts[newParts.length - 1], text: newParts[newParts.length - 1].text.slice(0, i) };
          }
          return newParts;
        });
        await delay(25);
      }
      setParts(prev => prev.slice(0, prev.length - 1));
    };

    const runSequence = async () => {
      // --- PHASE 1: Bring in the entire title (Runs Once) ---
      await typeText(phrases[0].text, phrases[0].className);
      await typeText(phrases[1].text, phrases[1].className);
      await typeText(phrases[2].text, phrases[2].className);

      while (isActiveRef.current) {
        await delay(5000); // Wait 5 seconds
        if (!isActiveRef.current) return;

        // --- PHASE 2: Repeat only on "Stronger Delivery." (Loops Continuously) ---
        await deleteLastPart(); // Deletes " Stronger Delivery."
        await delay(500);
        await typeText(phrases[2].text, phrases[2].className); // Retypes " Stronger Delivery."
      }
    };

    runSequence();

    return () => {
      isActiveRef.current = false;
    };
  }, []);

  return (
    <span className={cn(className, "relative inline-block")}>
      {parts.map((p, i) => (
        <span key={i} className={p.className}>{p.text}</span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[4px] h-[1em] bg-brand-gold ml-1 -mb-1 align-middle"
      />
    </span>
  );
};

export default function LandingPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-gold transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-x-0 !border-t-0 !border-b-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-brand-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] shrink-0">
              <img src="/logo.jpg" alt="MFDP Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-serif font-semibold tracking-wide text-foreground leading-tight">
                TRA<span className="text-brand-gold">CE</span>
              </span>
              <span className="text-[10px] text-muted font-medium hidden sm:block tracking-wide mt-0.5">
                Transparent Resource Allocation, Control & Execution
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#modules" className="hover:text-foreground transition-colors">Modules</a>
            <a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/login" className="hidden md:flex px-4 py-2 text-sm font-medium text-foreground hover:text-brand-gold transition-colors">
              Sign In
            </Link>
            <Link to="/login" className="px-5 py-2.5 text-sm font-medium bg-brand-gold text-white dark:text-brand-dark rounded-full hover:bg-brand-gold-dark transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center gap-2">
              Enter Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
        {/* Background ambient glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-green/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-medium uppercase tracking-wider w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sovereign-Grade Digital OS
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.2] tracking-tight min-h-[100px] md:min-h-[120px] xl:min-h-[140px]">
              <Typewriter />
            </h1>

            <p className="text-lg text-muted leading-relaxed max-w-xl font-light">
              A secure national platform for budget authority, treasury control, oversight, and development execution.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/login" className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                Access Command Center
              </Link>
              <Link to="/about" className="px-8 py-4 glass-panel !rounded-full font-medium hover:bg-foreground/5 transition-colors flex items-center gap-2">
                Explore Architecture
              </Link>
            </div>
          </motion.div>

          {/* Right: Carousel Restoration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-full min-h-[500px]"
          >
            <ChartCarousel />

            {/* Floating decorative elements fixed to the carousel container */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-panel p-4 flex items-center gap-3 z-20 hidden md:flex"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wider">Live Execution</p>
                <p className="text-sm font-medium text-foreground">98.4% Sync Rate</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 glass-panel p-4 flex items-center gap-3 z-20 hidden md:flex"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-brand-gold" />
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase tracking-wider">Geographic View</p>
                <p className="text-sm font-medium text-foreground">15 Counties Active</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 relative z-10 bg-background border-t border-border/50 mt-12 md:mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center glass-panel p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold via-brand-green to-brand-gold opacity-50"></div>
            {[
              { label: "Total Budget Managed", value: "$3.2B+" },
              { label: "Ministries & Agencies", value: "85+" },
              { label: "Real-time Sync", value: "99.9%" },
              { label: "Projects Tracked", value: "1,200+" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-3 relative z-10">
                <span className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">{stat.value}</span>
                <span className="text-xs md:text-sm text-muted font-medium uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="py-24 px-6 relative z-10 bg-foreground/[0.02] border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">Unified National Command</h2>
            <p className="text-muted max-w-2xl mx-auto">Consolidating and orchestrating existing siloed finance, planning, oversight, and development workflows.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FileText />, title: "Budget & Appropriations", desc: "Formulation, MTEF, and approved allocation handoff." },
              { icon: <Layers />, title: "Allotments & Release", desc: "Centralized control, validation, and release authority." },
              { icon: <Briefcase />, title: "Expenditure & Treasury", desc: "Commitment control, EFT payments, and reconciliation." },
              { icon: <Globe />, title: "Aid & NGO Management", desc: "Donor-funded projects, NGO registration, and accreditation." },
              { icon: <BarChart3 />, title: "Revenue Intelligence", desc: "Tax and customs data integration for fiscal planning." },
              { icon: <ShieldCheck />, title: "MAC & SOE Oversight", desc: "Performance scorecards, financial submissions, and risk." }
            ].map((mod, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 group hover:bg-foreground/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-300">
                  {mod.icon}
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{mod.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50 bg-background relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center border border-brand-gold/50 shadow-sm">
                <img src="/logo.jpg" alt="MFDP Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-serif font-semibold text-foreground tracking-wide">
                TRA<span className="text-brand-gold">CE</span>
              </span>
            </div>
            <p className="text-muted max-w-md leading-relaxed mb-8 text-sm md:text-base">
              Empowering the nation through intelligent financial management, transparent oversight, robust development execution, and macroeconomic visibility.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-brand-gold/20 hover:text-brand-gold transition-all duration-300">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-brand-gold/20 hover:text-brand-gold transition-all duration-300">
                <ShieldCheck className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-brand-gold/20 hover:text-brand-gold transition-all duration-300">
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs md:text-sm">Platform Core</h4>
            <div className="flex flex-col gap-4 text-muted text-sm border-l border-border/50 pl-4">
              <a href="#modules" className="hover:text-brand-gold transition-colors block">Module Ecosystem</a>
              <a href="#architecture" className="hover:text-brand-gold transition-colors block">Enterprise Architecture</a>
              <a href="#security" className="hover:text-brand-gold transition-colors block">Security & Compliance</a>
              <a href="#" className="hover:text-brand-gold transition-colors block">Interoperability API</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs md:text-sm">Resources</h4>
            <div className="flex flex-col gap-4 text-muted text-sm border-l border-border/50 pl-4">
              <a href="#" className="hover:text-brand-gold transition-colors block">Knowledge Base</a>
              <a href="#" className="hover:text-brand-gold transition-colors block">Training Portal</a>
              <a href="#" className="hover:text-brand-gold transition-colors block">Support Desk</a>
              <a href="#" className="hover:text-brand-gold transition-colors block">System Status</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border/50 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Ministry of Finance and Development Planning, Liberia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState, memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ShapeMorphHero } from "./components/ShapeMorphHero";
import { labels } from "./components/ShapeMorphHero.data";

import {
  Code as JavascriptIcon,
  Atom as ReactIcon,
  Database as MongoIcon,
  CloudSunny as ApiIcon,
  GitBranch as GitIcon,
  DesignNib as FigmaIcon,
  Accessibility as AccessibilityIcon,
  ColorFilter as StorybookIcon,
  Flask as NodeIcon,
  AccessibilitySign as AgileIcon,
  Square as TypescriptIcon,
  GridPlus as TailwindIcon,
} from "iconoir-react";

// ================= Tech Radar =================

type RadarItem = {
  icon: ReactNode;
  label: string;
  angle: number; // 角度：用来决定在圆上的位置
};

type SkillLevel = {
  label: string;
  icon: ReactNode;
  level: number; // 0-100 熟练度百分比
};

const radarItems: RadarItem[] = [
  { icon: <ReactIcon />, label: "React", angle: -90 },
  { icon: <TypescriptIcon />, label: "TypeScript", angle: -45 },
  { icon: <TailwindIcon />, label: "Tailwind", angle: 0 },
  { icon: <ApiIcon />, label: "REST API", angle: 45 },
  { icon: <NodeIcon />, label: "Node.js", angle: 90 },
  { icon: <MongoIcon />, label: "MongoDB", angle: 135 },
  { icon: <GitIcon />, label: "Git", angle: 180 },
  { icon: <FigmaIcon />, label: "Figma", angle: -135 },
];

// 技术熟练度数据 - 分为两层：设计层和开发层
type SkillCategory = {
  title: string;
  skills: SkillLevel[];
};

const designSkills: SkillLevel[] = [
  { label: "Figma", icon: <FigmaIcon />, level: 90 },
  { label: "FigJam/Miro", icon: <FigmaIcon />, level: 90 },
  { label: "UI Design System", icon: <StorybookIcon />, level: 90 },
  { label: "Accesibility", icon: <AccessibilityIcon />, level: 85 },
  { label: "UX Research", icon: <AgileIcon />, level: 80 },
  { label: "Agile Teamwork/Trello", icon: <AgileIcon />, level: 90 },
  { label: "Documentation/Notion", icon: <AgileIcon />, level: 70 },
];

const developmentSkills: SkillLevel[] = [
  { label: "React", icon: <ReactIcon />, level: 65 },
  { label: "TypeScript", icon: <JavascriptIcon />, level: 60 },
  { label: "Tailwind", icon: <TailwindIcon />, level: 60 },
  { label: "REST API", icon: <ApiIcon />, level: 60 },
  { label: "Node.js", icon: <NodeIcon />, level: 60 },
  { label: "MongoDB", icon: <MongoIcon />, level: 65 },
  { label: "CI/CD· Github", icon: <GitIcon />, level: 70 },
];

const aiBusinessSkills: SkillLevel[] = [
  { label: "AI", icon: <ReactIcon />, level: 80 },
  { label: "Strategy", icon: <TypescriptIcon />, level: 70 },
  { label: "Communication", icon: <TailwindIcon />, level: 90 },
  { label: "Teamwork", icon: <ApiIcon />, level: 90 },
];

const skillCategories: SkillCategory[] = [
  { title: "Design", skills: designSkills },
  { title: "Development", skills: developmentSkills },
  { title: "AI & Business", skills: aiBusinessSkills },
];

// 移入移出视口时都有动画效果
const radarVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1.35,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1] as const,
    },
  },
};

const TechRadar = memo(function TechRadar() {
  return (
    <motion.div
      className="mt-4 mb-4 relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mx-auto z-0"
      variants={radarVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      // once: false = 移入移出时都触发动画
      // amount: 0.5 = 至少有一半在视口内才触发
    >
      {/* 亮蓝色背景 panel */}
      <div className="absolute inset-0 rounded-full border border-blue-300/60 dark:border-blue-500/60 overflow-hidden shadow-[0_26px_70px_rgba(59,130,246,0.3)] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.20),transparent_55%),linear-gradient(145deg,rgba(219,234,254,0.9),rgba(191,219,254,0.8))] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.30),transparent_55%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.25),transparent_55%),linear-gradient(145deg,rgba(30,58,138,0.6),rgba(30,64,175,0.5))]" />

      {/* 网格 overlay */}
      <div
        className="pointer-events-none absolute inset-[10%] opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.3) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* 同心圆 */}
      <div className="absolute inset-[20%] rounded-full border border-white/20" />
      <div className="absolute inset-[33%] rounded-full border border-white/10" />
      <div className="absolute inset-[50%] rounded-full border border-white/8" />

      {/* 中心：人本 + 产品 */}
      <div className="absolute inset-[40%] rounded-full bg-white/95 dark:bg-slate-950/90 flex flex-col items-center justify-center text-center px-3 py-2 shadow-lg">
        <p className="text-[16px] uppercase tracking-[0.18em] text-slate-400">
          Core
        </p>
        <p className=" text-[12px] font-semibold text-slate-800 dark:text-slate-100">
          Human-centered Product 
        </p>
      </div>

      {/* 圆周上的技能 icon */}
      {radarItems.map((item, index) => {
        const radius = 38; // 距离中心的百分比
        const rad = (item.angle * Math.PI) / 180;
        const left = 50 + radius * Math.cos(rad);
        const top = 50 + radius * Math.sin(rad);

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-white/40 shadow-sm text-slate-800 dark:text-slate-100 text-xl">
              {item.icon}
            </div>
            <span className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-slate-300">
              {item.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
});

// ================= Skills Bar Chart =================

const SkillsChart = memo(function SkillsChart() {
  let globalIndex = 0;

  return (
    <div className="w-full space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-3">
          {/* Category Title */}
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {category.title}
          </h4>

          {/* Skills in this category */}
          <div className="space-y-3">
            {category.skills.map((skill, skillIndex) => {
              const currentIndex = globalIndex++;
              return (
                <div key={skillIndex} className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-slate-700 dark:text-slate-200">
                    {skill.icon}
                  </div>

                  {/* Label */}
                  <div className="flex-shrink-0 w-24 md:w-28">
                    <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200">
                      {skill.label}
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-6 md:h-7 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full flex items-center justify-end pr-2 ${
                        categoryIndex === 0
                          ? "bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 1,
                        delay: currentIndex * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <span className="text-[10px] md:text-xs font-semibold text-white">
                        {skill.level}%
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // 如果没有存过，就跟随系统
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const [currentLabel, setCurrentLabel] = useState(labels[0]);

  const cardVariants = {
    initial: { opacity: 0, y: 40, scale: 0.94 },
    inView: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-6 md:py-10">
        {/* NAVBAR */}
        <header
          className="
            sticky top-0 z-40
            mb-16 md:mb-20
            flex justify-between items-center
            rounded-2xl border border-black/5 dark:border-white/5
            bg-white/80 dark:bg-slate-950/70
            backdrop-blur-lg supports-[backdrop-filter]:bg-white/60
            px-4 py-3 md:px-6 md:py-4
            transition-colors duration-300
          "
        >
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            Hua Guo
          </h1>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-slate-300">
              <a
                href="#projects"
                className="hover:text-black dark:hover:text-white"
              >
                Projects
              </a>
              <a
                href="#about"
                className="hover:text-black dark:hover:text-white"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-black dark:hover:text-white"
              >
                Contact
              </a>
            </nav>

            {/* 主题切换按钮 */}
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/20 text-xs font-medium flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="mb-24 md:mb-28 animate-fade-up min-h-[60vh] md:min-h-[70vh]">
          <div className="grid md:grid-cols-[1.5fr,1fr] gap-6 md:gap-6 items-center md:items-start">
            {/* 左侧：大标题 + 文案 + 按钮 */}
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 dark:text-slate-400 uppercase mb-4">
                FRONTEND · FULL-STACK · UX/UI · PRODUCT · AGILE · AI
              </p>

              <h2 className="text-6xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="inline-flex items-center align-middle">
                  {/*icon hello*/}
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Waving-Hand-1--Streamline-Emoji"
                    height="64"
                    width="64"
                    className="inline-block align-middle"
                  >
                    <desc>
                      Waving Hand 1 Streamline Emoji: https://streamlinehq.com
                    </desc>
                    <path
                      d="M15.333333333333332 60.666666666666664a16.666666666666664 2 0 1 0 33.33333333333333 0 16.666666666666664 2 0 1 0 -33.33333333333333 0Z"
                      fill="#45413c"
                      opacity=".15"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m44.61333333333333 25.68 -0.17333333333333334 4.346666666666666 -14.96 -14.973333333333333a3.453333333333333 3.453333333333333 0 0 0 -4.586666666666666 -0.3866666666666666 3.3200000000000003 3.3200000000000003 0 0 0 -0.2533333333333333 4.933333333333334l-2.12 -2.12a3.6933333333333334 3.6933333333333334 0 0 0 -5.026666666666666 -0.27999999999999997 3.5599999999999996 3.5599999999999996 0 0 0 -0.13333333333333333 5.16l-0.026666666666666665 -0.06666666666666667a3.373333333333333 3.373333333333333 0 0 0 -4 -0.6133333333333333 3.333333333333333 3.333333333333333 0 0 0 -0.7066666666666667 5.253333333333333l4 4a2.92 2.92 0 0 0 -4.32 0.21333333333333332 3.0399999999999996 3.0399999999999996 0 0 0 0.31999999999999995 4L29.333333333333332 52a12.52 12.52 0 0 0 17.826666666666664 -0.07999999999999999 19.293333333333333 19.293333333333333 0 0 0 5.333333333333333 -14.413333333333334L52 21.333333333333332a1.44 1.44 0 0 0 -1.44 -1.3333333333333333 5.933333333333334 5.933333333333334 0 0 0 -5.946666666666666 5.68Z"
                      fill="#ffe500"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M44.44 30.026666666666664 29.479999999999997 15.053333333333331a3.453333333333333 3.453333333333333 0 0 0 -4.586666666666666 -0.3866666666666666 3.3066666666666666 3.3066666666666666 0 0 0 -0.48 4.653333333333333 2.4 2.4 0 0 1 0.48 -0.4933333333333333 3.453333333333333 3.453333333333333 0 0 1 4.586666666666666 0.36l12.879999999999999 12.893333333333333Z"
                      fill="#fff48c"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M52.120000000000005 25.493333333333332 52 21.333333333333332a1.44 1.44 0 0 0 -1.44 -1.3333333333333333 5.933333333333334 5.933333333333334 0 0 0 -5.933333333333334 5.72l-0.17333333333333334 4.346666666666666 0.17333333333333334 -0.18666666666666668a5.946666666666666 5.946666666666666 0 0 1 5.933333333333334 -5.72 1.5599999999999998 1.5599999999999998 0 0 1 1.5599999999999998 1.3333333333333333Z"
                      fill="#fff48c"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m44.61333333333333 25.68 -0.17333333333333334 4.346666666666666 -14.96 -14.973333333333333a3.453333333333333 3.453333333333333 0 0 0 -4.586666666666666 -0.3866666666666666 3.3200000000000003 3.3200000000000003 0 0 0 -0.2533333333333333 4.933333333333334l-2.12 -2.12a3.6933333333333334 3.6933333333333334 0 0 0 -5.026666666666666 -0.27999999999999997 3.5599999999999996 3.5599999999999996 0 0 0 -0.13333333333333333 5.16l-0.026666666666666665 -0.06666666666666667a3.373333333333333 3.373333333333333 0 0 0 -4 -0.6133333333333333 3.333333333333333 3.333333333333333 0 0 0 -0.7066666666666667 5.253333333333333l4 4a2.92 2.92 0 0 0 -4.32 0.21333333333333332 3.0399999999999996 3.0399999999999996 0 0 0 0.31999999999999995 4L29.333333333333332 52a12.52 12.52 0 0 0 17.826666666666664 -0.07999999999999999 19.293333333333333 19.293333333333333 0 0 0 5.333333333333333 -14.413333333333334L52 21.333333333333332a1.44 1.44 0 0 0 -1.44 -1.3333333333333333h0a5.933333333333334 5.933333333333334 0 0 0 -5.946666666666666 5.68Z"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m16.453333333333333 30.906666666666666 8.079999999999998 8.066666666666666"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m17.36 22.373333333333335 11.879999999999999 11.879999999999999"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m24.64 19.626666666666665 9.613333333333333 9.626666666666665"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="m44.44 30.026666666666664 -4.76 4.76a8 8 0 0 0 0 11.32h0"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M32.14666666666666 11.68a12.08 12.08 0 0 1 5.746666666666666 2.6666666666666665 12.96 12.96 0 0 1 3.6 5.333333333333333"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M32.906666666666666 8.12A14.746666666666666 14.746666666666666 0 0 1 40 11.346666666666666a15.786666666666665 15.786666666666665 0 0 1 4.4399999999999995 6.573333333333332"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M6.2 32.31999999999999a12 12 0 0 0 1.0533333333333332 6.226666666666667 12.866666666666667 12.866666666666667 0 0 0 4.226666666666667 4.84"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M2.5599999999999996 32.13333333333333a14.76 14.76 0 0 0 1.3333333333333333 7.6933333333333325 16 16 0 0 0 5.213333333333333 5.986666666666666"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                  </svg>
                  {/*icon smile */}
                  <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Relieved-Face-1--Streamline-Emoji"
                    height="64"
                    width="64"
                    className="inline-block align-middle"
                  >
                    <desc>
                      Relieved Face 1 Streamline Emoji: https://streamlinehq.com
                    </desc>
                    <path
                      d="M5.333333333333333 28.666666666666664a26.666666666666664 26.666666666666664 0 1 0 53.33333333333333 0 26.666666666666664 26.666666666666664 0 1 0 -53.33333333333333 0Z"
                      fill="#ffe500"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M32 2a26.666666666666664 26.666666666666664 0 1 0 26.666666666666664 26.666666666666664 26.666666666666664 26.666666666666664 0 0 0 -26.666666666666664 -26.666666666666664Zm0 49.33333333333333a24.333333333333332 24.333333333333332 0 1 1 24.333333333333332 -24.333333333333332A24.333333333333332 24.333333333333332 0 0 1 32 51.33333333333333Z"
                      fill="#ebcb00"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M24 7.333333333333333a8 2 0 1 0 16 0 8 2 0 1 0 -16 0Z"
                      fill="#fff48c"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M10.666666666666666 60.666666666666664a21.333333333333332 2 0 1 0 42.666666666666664 0 21.333333333333332 2 0 1 0 -42.666666666666664 0Z"
                      fill="#45413c"
                      opacity=".15"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M5.333333333333333 28.666666666666664a26.666666666666664 26.666666666666664 0 1 0 53.33333333333333 0 26.666666666666664 26.666666666666664 0 1 0 -53.33333333333333 0Z"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M38.666666666666664 39.306666666666665a12 12 0 0 1 -13.333333333333332 0"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M51.33333333333333 35.33333333333333c0 1.1066666666666665 -1.4933333333333334 2 -3.333333333333333 2s-3.333333333333333 -0.8933333333333333 -3.333333333333333 -2S46.16 33.33333333333333 48 33.33333333333333s3.333333333333333 0.8933333333333333 3.333333333333333 2Z"
                      fill="#ffaa54"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M12.666666666666666 35.33333333333333c0 1.1066666666666665 1.4933333333333334 2 3.333333333333333 2s3.333333333333333 -0.8933333333333333 3.333333333333333 -2S17.84 33.33333333333333 16 33.33333333333333s-3.333333333333333 0.8933333333333333 -3.333333333333333 2Z"
                      fill="#ffaa54"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M50.666666666666664 27.333333333333332a2.333333333333333 2.333333333333333 0 0 1 -4.666666666666666 0"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                    <path
                      d="M18 27.333333333333332a2.333333333333333 2.333333333333333 0 0 1 -4.666666666666666 0"
                      fill="none"
                      stroke="#45413c"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                    ></path>
                  </svg>
                </span>{" "}
                I am a UX/UI {" "}
                <span className="text-green-500 dark:text-emerald-300">
                Designer {" "}
                </span>
                <br />
                & 
                Frontend <span className="text-blue-500 dark:text-emerald-300">
                Developer
                </span>
              </h2>
              <h3 className="text-4xl">Bridging design, engineering, and real product thinking.</h3>

              <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                I care about intuitive, detailed, and user-centered experiences.
                I help teams ship digital products that are clear, fast and
                beautiful — from UX and UI to React frontends, Node backends and
                real deployments.
              </p>

              {/* 能力领域 Tag，一眼看清你会什么 */}
              <div className="mt-8 flex flex-wrap gap-4 text-[16px] md:text-md">
                <span className="px-3 py-1 rounded-full  bg-orange-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                  UX/UI · User-Centred-Design · creative & Anysis
                </span>
                <span className="px-3 py-1 rounded-full  bg-orange-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                  UI/UX · Design Systems
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                  React · TypeScript · Frontend Engineering
                </span>
                <span className="px-3 py-1 rounded-full  bg-blue-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                  Node.js · REST API · MongoDB
                </span>
                <span className="px-3 py-1 rounded-full bg-green-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                  Product thinker · Business strategy · Teamwork · Agil ways ·
                  Communication
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 ">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition shadow-sm dark:bg-slate-800 dark:text-slate-100"
                >
                  View Projects
                </a>
                <a
                  href="#about"
                  className="px-6 py-3 rounded-full border border-gray-300 dark:border-slate-600 text-sm font-medium text-gray-800 dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-900 transition"
                >
                  About Me
                </a>
              </div>
            </div>

            {/* 右侧: 动效 */}
            <div className="flex justify-center md:justify-end">
              <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex-col items-center gap-4 md:gap-5">
                {/* 动态文字 —— 始终居中 */}
                
                  <motion.p
                    key={currentLabel}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-md md:text-md font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-slate-400 text-center"
                  >
                    {currentLabel}
                  </motion.p>
                

                {/* 形状动效容器：glass + grid + 大尺寸 + 响应式 */}
                <div
                  className="
                   relative  w-full aspect-square 
                    max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px]
                    rounded-3xl border border-slate-200/70 dark:border-slate-700/80 
                    bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl 
                    shadow-[0_30px_70px_rgba(0,0,0,0.12)]
                    overflow-hidden"
                >
                  {/* 浅浅网格背景 */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-35"
                    aria-hidden="true"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(148,163,184,0.33) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.33) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* 真正的 icon 动效 */}
                  <div className="relative flex h-full w-full items-center justify-center p-8 sm:p-10">
                    <ShapeMorphHero
                      onShapeChange={(i) => {
                        const safeIndex = i % labels.length;
                        setCurrentLabel(labels[safeIndex]);
                      }}
                    />
                  </div>
                </div>

                {/* 固定 tagline —— 居中对齐 */}
                <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 mt-1.5 text-center max-w-sm">
                  Creative · Product Designer · Frontend · Agile · Multicultural
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-24 md:mb-28">
          <h3 className="text-2xl md:text-2xl font-semibold mb-4 tracking-tight">
            My Projects
          </h3>
          <p className="text-gray-600 dark:text-slate-300 mb-8 text-sm md:text-[15px] max-w-4xl">
            A selection of end-to-end projects where I combined UX, UI and
            engineering – from concept and visuals to working code and
            deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-6 px-6 md:px-2 lg:px-2">
            {/* TRAVEL ME */}
            <motion.article
              className="card-hover rounded-3xl border border-stone-200 dark:border-slate-700 bg-stone-50/90 dark:bg-slate-900/80 overflow-hidden"
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              viewport={{ amount: 0.5, once: false }}
            >
              {/* 顶部大图 */}
              <div className="bg-stone-100 dark:bg-slate-800 border-b border-stone-200/70 dark:border-slate-700/70">
                <div className="relative aspect-[4/3] md:aspect-[4/3]">
                  <img
                    src="/projects/travel-me.png"
                    alt="Travel Me – skill-matching travel platform"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* 文案区域 */}
              <div className="p-6 md:p-8 flex flex-col gap-4 md:gap-5">
                <div>
                  <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                    Travel Me
                  </h4>
                  <p className="text-gray-600 dark:text-slate-300 text-sm md:text-[0.95rem] max-w-2xl">
                    A full-stack platform connecting volunteers and hosts
                    through skill-matching instead of money, making travel more
                    affordable and purposeful.
                  </p>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 text-xs md:text-[13px]">
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-400/20 dark:text-sky-200">
                  UX/UI · Design System · Product Design
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 dark:bg-slate-700 dark:text-slate-100">
                  React Frontend · TypeScript · Full-Stack
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 dark:bg-slate-700 dark:text-slate-100">
                    Node.js · MongoDB
                  </span>
                </div>

                {/* 按钮 */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://github.com/BorisFeuze/Travel-Me"
                    target="_blank"
                    className="px-5 py-2.5 text-sm border border-stone-300 dark:border-slate-600 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://travel-me-2.onrender.com/"
                    target="_blank"
                    className="px-5 py-2.5 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-slate-200"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>

            {/* MONA */}
            <motion.article
              className="card-hover rounded-3xl border border-stone-200 dark:border-slate-700 bg-[#f6efe8] dark:bg-slate-900/80 overflow-hidden"
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              viewport={{ amount: 0.5, once: false }}
            >
              <div className="bg-[#f3e5d8] dark:bg-slate-800 border-b border-stone-200/70 dark:border-slate-700/70">
                <div className="relative aspect-[4/3] md:aspect-[4/3]">
                  <img
                    src="/projects/mona.png"
                    alt="Mona – women-centered financial wellness app"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4 md:gap-5">
                <div>
                  <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                    Mona
                  </h4>
                  <p className="text-gray-700 dark:text-slate-300 text-sm md:text-[0.95rem] max-w-2xl">
                    A women-centered financial wellness concept combining
                    budgeting, emotional check-ins and gentle learning to make
                    finance feel safe and empowering.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs md:text-[13px]">
                  <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-400/20 dark:text-pink-200">
                    UX / UI
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 dark:bg-slate-700 dark:text-slate-100">
                    Product Design
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 dark:bg-slate-700 dark:text-slate-100">
                    Prototype
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://www.figma.com/design/SSbd5eBRNHFiLtSvLcvjvm/MONA-APP?node-id=1628-9974&t=nrAr8jKFubd6t5cD-1"
                    target="_blank"
                    className="px-5 py-2.5 text-sm border border-stone-300 dark:border-slate-600 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition"
                  >
                    Figma
                  </a>
                  <a
                    href="https://www.figma.com/proto/SSbd5eBRNHFiLtSvLcvjvm/Gruppe_6_Capstone_Daniel_Hua--Copy-?page-id=701%3A4204&node-id=4043-1945&viewport=-440%2C-567%2C0.35&t=DizwqrVBFR9Hcdus-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=4043%3A1945"
                    target="_blank"
                    className="px-5 py-2.5 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-slate-200"
                  >
                    Case Study
                  </a>
                </div>
              </div>
            </motion.article>

            {/* BEE GOOD */}
            <motion.article
              className="card-hover rounded-3xl border border-stone-200 dark:border-slate-700 bg-[#f3f2ee] dark:bg-slate-900/80 overflow-hidden"
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              viewport={{ amount: 0.5, once: false }}
            >
              <div className="bg-[#e6e3dc] dark:bg-slate-800 border-b border-stone-200/70 dark:border-slate-700/70">
                <div className="relative aspect-[4/3] md:aspect-[4/3]">
                  <img
                    src="/projects/bee-good.png"
                    alt="Bee Good – design system and component library"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4 md:gap-5">
                <div>
                  <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                    Bee Good Design System
                  </h4>
                  <p className="text-gray-700 dark:text-slate-300 text-sm md:text-[0.95rem] max-w-2xl">
                    A design system with reusable React components, tokens and
                    Storybook documentation for a consistent, scalable
                    e-commerce experience.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs md:text-[13px]">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200">
                    Design System
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 dark:bg-slate-700 dark:text-slate-100">
                    Storybook
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 dark:bg-slate-700 dark:text-slate-100">
                    React
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://www.figma.com/design/iOTZR0s5XkQAlWMs3qddoT/BeeGood-ECommerce-UI-Project_Hua?node-id=1234-25999&t=KgSj118YS7izF23J-1"
                    target="_blank"
                    className="px-5 py-2.5 text-sm border border-stone-300 dark:border-slate-600 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition"
                  >
                    Figma
                  </a>
                  <a
                    href="https://github.com/guohuasdesign/Bee-Good-DesignSystem"
                    target="_blank"
                    className="px-5 py-2.5 text-sm border border-stone-300 dark:border-slate-600 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.chromatic.com/library?appId=68ab501f645a22ed111f2b5b&inviteToken=chpi_dc6343856e3e49668d5b3da595e8e5e5"
                    target="_blank"
                    className="px-5 py-2.5 text-sm rounded-full bg-black text-white hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-slate-200"
                  >
                    Storybook
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mb-24 md:mb-32">
          {/* 上半部分：About 文本 + Tech Radar 左右排布 */}
          <motion.div
            className="grid gap-10 md:grid-cols-[1fr,1.3fr]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* 文本：Desktop 在右侧（md:order-2） */}
            <div className="md:order-2">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
                About Me
              </h3>

              <p className="mb-6 text-[16 px] md:text-md text-gray-500 dark:text-slate-400 text-start md:text-left max-w-3xl">
                A balanced mix of frontend engineering, UX design and product
                thinking – not just coding, not just pretty pixels.
              </p>

              <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-[15px] md:text-[16px] max-w-3xl">
                I’m a <span className="font-semibold text-green-500">UX/UI Designer</span> with
                an academic background in communication design (M.A. HAW
                Hamburg, B.A. MKH Kiel &amp; BIGC Beijing) now focusing on{" "}
                <span className="font-semibold text-green-500 ">Frontend Development</span>. I
                build end-to-end products – from research and UX flows to React
                / TypeScript frontends, Node APIs and real deployments.
              </p>

              <p className="mt-4 text-gray-700 dark:text-slate-300 leading-relaxed text-[15px] md:text-[16px] max-w-3xl">
                In teams I’m often the person who connects{" "}
                <span className="font-semibold text-green-500">
                  design, coding and business
                </span>
                : human-centred design thinking, design systems in Figma &amp;
                Storybook, WCAG-aware interfaces, and pragmatic collaboration in{" "}
                <span className="font-semibold text-green-500">Scrum / Kanban</span>. Through{" "}
                <span className="font-semibold text-green-500">d.MBA</span>,{" "}
                <span className="font-semibold text-green-500">AI &amp; UX/UI</span> and{" "}
                <span className="font-semibold text-green-500">Full-stack bootcamps</span> I
                also bring product thinking and a sustainable, value-driven
                mindset.
              </p>

              <p className="mt-4 mb-4 text-gray-700 dark:text-slate-300 leading-relaxed text-[16px] md:text-[16px] max-w-3xl">
                I enjoy working in{" "}
                <span className="font-semibold text-green-500">multicultural teams</span> and
                communicate in <span className="font-semibold text-green-500">German, English and Chinese</span>. My goal is to help
                users and companies ship interfaces that feel clear, fast and
                meaningful – turning complex requirements into simple,
                effective, intuitive human experiences.
              </p>
            </div>

            {/* Tech Radar：Desktop 在左侧（md:order-1） */}
            <div className="flex flex-col text-center items-center md:items-center mb-8 gap-4 md:order-1">
              <p className="text-md font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-slate-400 text-center md:text-left relative z-10">
                Design &amp; Tech Radar · Skills I actually use
              </p>
              <TechRadar />
            </div>
          </motion.div>

          {/* 下半部分：整行 Skill Proficiency，两栏柱状图 */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-slate-400 mb-4 text-center md:text-left">
              Skill Proficiency
            </p>
            <SkillsChart />
          </motion.div>
        </section>

        {/* HIRE ME SECTION */}
        <section id="hire-me" className="mb-24 md:mb-32">
          <motion.div
            className="grid gap-10 md:grid-cols-[1.3fr,1fr]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* 左侧：Hire me 叙事 */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
                Hire me
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
                Here’s how I create value for your team
              </h3>

              <p className="text-gray-700 dark:text-slate-300 text-[15px] md:text-[16px] leading-relaxed max-w-3xl">
                I&apos;m not a pure developer and not a pure designer – I sit
                exactly in between. My background in communication design,
                business &amp; innovation and full-stack development helps me
                connect{" "}
                <span className="font-semibold">
                  people, product and technology
                </span>{" "}
                instead of thinking only in tickets.
              </p>

              <ul className="mt-5 space-y-3 text-[14px] md:text-[15px] text-gray-700 dark:text-slate-300">
                <li>
                  •{" "}
                  <span className="font-semibold">
                    From discovery to deployment:
                  </span>{" "}
                  I can join at any stage – research, UX, UI and React / Node
                  implementation – and push it to a shippable release.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold">
                    Less handover, more outcome:
                  </span>{" "}
                  the same person designs the flow, builds the UI and talks to
                  stakeholders about constraints and trade-offs.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold">
                    Business &amp; impact aware:
                  </span>{" "}
                  experience with d.MBA, fintech, e-commerce and sustainable
                  concepts – I care about user value, KPIs and long-term impact.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold">
                    Multicultural collaboration:
                  </span>{" "}
                  I work comfortably in German, English and Chinese and enjoy
                  diverse, cross-functional teams.
                </li>
              </ul>
            </div>

            {/* 右侧：四个价值卡片 */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Frontend Engineering */}
              <motion.div
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 md:p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.05, duration: 0.4 }}
              >
                <div className="mb-2 text-2xl">👩‍💻</div>
                <h4 className="text-sm font-semibold mb-1">
                  Frontend Engineering
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  React, TypeScript, Tailwind, REST APIs &amp; MongoDB –
                  production ready frontends that are fast, accessible and
                  maintainable.
                </p>
              </motion.div>

              {/* UX/UI & Design Systems */}
              <motion.div
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 md:p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.12, duration: 0.4 }}
              >
                <div className="mb-2 text-2xl">🎨</div>
                <h4 className="text-sm font-semibold mb-1">
                  UX/UI &amp; Design Systems
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  Research, flows, prototypes and design systems in Figma &amp;
                  Storybook – ensuring consistency and reducing design-dev
                  friction.
                </p>
              </motion.div>

              {/* Product & Sustainable Value */}
              <motion.div
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 md:p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.18, duration: 0.4 }}
              >
                <div className="mb-2 text-2xl">📈</div>
                <h4 className="text-sm font-semibold mb-1">
                  Product &amp; Sustainable Value
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  d.MBA and impact-driven projects – I think in user journeys,
                  KPIs and sustainable value, not only in features.
                </p>
              </motion.div>

              {/* Agile & Multicultural */}
              <motion.div
                className="rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 md:p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.24, duration: 0.4 }}
              >
                <div className="mb-2 text-2xl">🌍</div>
                <h4 className="text-sm font-semibold mb-1">
                  Agile &amp; Multicultural
                </h4>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  Used to Scrum / Kanban, remote collaboration and multilingual
                  communication – bridging teams in DE / EN / CN.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-16">
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-700 dark:text-slate-300 mb-6">
            Feel free to reach out for collaboration or opportunities.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="mailto:huaguo@outlook.de"
              className="px-6 py-3 border border-black dark:border-slate-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/guohua-design/"
              target="_blank"
              className="px-6 py-3 border border-black dark:border-slate-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/guohuasdesign"
              target="_blank"
              className="px-6 py-3 border border-black dark:border-slate-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition"
            >
              GitHub
            </a>
          </div>
        </section>

        <footer className="text-xs text-gray-400 dark:text-slate-500 mt-20">
          © 2025 Hua Guo
        </footer>
      </div>
    </div>
  );
}

export default App;

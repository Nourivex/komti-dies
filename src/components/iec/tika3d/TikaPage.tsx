/**
 * TikaPage v2 - Full-page TIKA Campus Assistant
 *
 * Uses comprehensive knowledge base from tika-knowledge.ts
 */

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Send,
  Bot,
  Sparkles,
  GraduationCap,
  MapPin,
  BookOpen,
  Briefcase,
  HelpCircle,
  Building2,
} from "lucide-react";
import { TikaAvatar } from "@/components/iec/avatar";
import type { TikaAvatarState } from "@/components/iec/avatar";
import { getTikaResponse } from "@/lib/tika-service";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/navigator/ThemeToggle";
import {
  UHN_PROFILE,
  CAMPUSES,
  FACULTIES,
  PROGRAM_DETAILS,
  ALL_PROGRAMS,
  FACILITIES,
  ORGANIZATIONS,
  CAREER_PROSPECTS,
  SCHOLARSHIPS,
  ADMISSION,
  CONTACTS,
  INDUSTRY_PARTNERS,
  ACHIEVEMENTS,
} from "@/lib/tika-knowledge";

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
}

// ═══════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════

const quickTopics = [
  { label: "Program Studi", icon: BookOpen, query: "program studi" },
  { label: "Pendaftaran", icon: GraduationCap, query: "cara daftar" },
  { label: "Lokasi Kampus", icon: MapPin, query: "alamat kampus" },
  { label: "Karier Lulusan", icon: Briefcase, query: "karier lulusan" },
  { label: "Fasilitas", icon: Building2, query: "fasilitas kampus" },
  { label: "Beasiswa", icon: Sparkles, query: "beasiswa" },
  { label: "Mitra Industri", icon: HelpCircle, query: "mitra industri" },
  { label: "Prestasi", icon: HelpCircle, query: "prestasi" },
];

export function TikaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: "bot",
      text: `Halo! 👋 Aku TIKA, asisten digital ${UHN_PROFILE.name}. Ada yang bisa aku bantu seputar kampus?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [charState, setCharState] = useState<TikaAvatarState>("idle");
  const { theme, toggleTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor network status for graceful offline fallback
  useEffect(() => {
    const handleOnline = () => {
      setCharState((prev) => (prev === "offline" ? "idle" : prev));
    };
    const handleOffline = () => {
      setCharState("offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    if (!navigator.onLine) setCharState("offline");

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (charState === "speaking") {
      const timer = setTimeout(() => {
        setCharState(input.trim().length > 0 ? "listening" : "idle");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [charState, input]);

  // Text-to-Speech using browser SpeechSynthesis
  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Clean text for TTS (remove emojis, markdown, special chars)
      const cleanText = text
        .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // emoticons
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // symbols & pictographs
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // transport & map
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "") // flags
        .replace(/[•\-✓★●◆]/g, "") // bullet points
        .replace(/\n+/g, ". ") // newlines to pauses
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "id-ID"; // Indonesian
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Friendly tone
      utterance.volume = 1.0;

      // Try to find Indonesian voice
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.startsWith("id"));
      if (idVoice) utterance.voice = idVoice;

      utterance.onend = () =>
        setCharState(input.trim().length > 0 ? "listening" : "idle");
      utterance.onerror = () => setCharState("idle");

      window.speechSynthesis.speak(utterance);
    },
    [input],
  );

  const sendMessage = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg) return;

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text: msg },
      ]);
      setInput("");
      setCharState("thinking");

      setTimeout(async () => {
        const response = await getTikaResponse(msg);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: response },
        ]);
        setCharState("speaking");
        speak(response);
      }, 500);
    },
    [input, speak],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (
      charState !== "speaking" &&
      charState !== "thinking" &&
      charState !== "offline"
    ) {
      setCharState(val.trim().length > 0 ? "listening" : "idle");
    }
  };

  return (
    <div
      className={`${theme} relative min-h-screen overflow-hidden bg-background`}
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
        <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 pl-4 pr-2.5 sm:pl-6">
          <a
            href="/"
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              TIKA Campus Assistant
            </span>
            <ThemeToggle isDark={theme === "dark"} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Layout - fixed height, no scroll on outer container */}
      <div className="flex h-screen pt-20 overflow-hidden">
        {/* LEFT: Video Avatar (Desktop Presentation) */}
        <div className="relative hidden w-1/2 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--rose),transparent_70%)] opacity-10" />
          <div className="relative flex h-full w-full items-center justify-center p-8">
            <TikaAvatar
              state={charState}
              showStatusBadge={true}
              badgePosition="bottom-center"
              className="h-full max-h-[85vh] w-full max-w-md rounded-3xl"
            />
          </div>
        </div>

        {/* RIGHT: Chat Interface - fixed height, scrollable messages */}
        <div className="flex h-full w-full flex-col overflow-hidden border-l border-glass-border lg:w-1/2">
          {/* Mobile Video Avatar Header */}
          <div className="relative h-44 w-full shrink-0 border-b border-glass-border bg-gradient-to-b from-rose/5 to-transparent lg:hidden">
            <TikaAvatar
              state={charState}
              showStatusBadge={true}
              badgePosition="bottom-left"
              className="h-full w-full"
            />
          </div>

          {/* Quick Topics - wrap, no horizontal scroll */}
          <div className="flex flex-wrap gap-2 border-b border-glass-border px-4 py-3 shrink-0">
            {quickTopics.map((topic) => (
              <button
                key={topic.label}
                onClick={() => sendMessage(topic.query)}
                className="flex items-center gap-1.5 rounded-full border border-glass-border bg-glass px-3 py-1.5 text-[0.65rem] font-medium transition-all duration-300 hover:border-rose/40 hover:bg-rose/10"
              >
                <topic.icon className="h-3.5 w-3.5 text-rose" />
                {topic.label}
              </button>
            ))}
          </div>

          {/* Messages - only this area scrolls */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto max-w-lg space-y-5">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-cta)]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[image:var(--gradient-cta)] text-white rounded-br-sm"
                        : "glass-panel rounded-bl-sm"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <span className="mb-1 block text-[0.65rem] font-medium text-rose">
                        TIKA
                      </span>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-glass-border px-6 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="mx-auto flex max-w-lg items-center gap-3"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ketik pertanyaanmu tentang kampus..."
                className="flex-1 rounded-full border border-glass-border bg-glass px-5 py-3 text-sm outline-none transition-colors focus:border-rose/40 focus:ring-2 focus:ring-rose/20"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] text-white shadow-[0_8px_24px_-4px_var(--wine)] transition-all duration-300 hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <p className="mt-2 text-center text-[0.65rem] text-muted-foreground/50">
              TIKA menggunakan basis pengetahuan lokal. Untuk info resmi,
              kunjungi {CONTACTS.website}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

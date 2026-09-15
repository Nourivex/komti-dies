/**
 * TikaChat v3 - Floating Chat with 3D Character
 *
 * Uses shared knowledge base from tika-knowledge.ts
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { TikaAvatar } from "./avatar";
import type { TikaAvatarState } from "./avatar";
import { getTikaResponse } from "@/lib/tika-service";
import {
  UHN_PROFILE,
  CAMPUSES,
  FACULTIES,
  PROGRAM_DETAILS,
  FACILITIES,
  ORGANIZATIONS,
  CAREER_PROSPECTS,
  SCHOLARSHIPS,
  ADMISSION,
  CONTACTS,
  INDUSTRY_PARTNERS,
} from "@/lib/tika-knowledge";

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export function TikaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: "bot",
      text: `Halo! 👋 Aku TIKA. Ada yang bisa aku bantu seputar ${UHN_PROFILE.abbreviation}?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [charState, setCharState] = useState<TikaAvatarState>("idle");
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
      const t = setTimeout(() => {
        setCharState(input.trim().length > 0 ? "listening" : "idle");
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [charState, input]);

  // Text-to-Speech
  const speak = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const clean = text
        .replace(
          /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu,
          "",
        )
        .replace(/[•\-✓★●◆]/g, "")
        .replace(/\n+/g, ". ")
        .trim();
      if (!clean) return;
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = "id-ID";
      u.rate = 1.0;
      u.pitch = 1.1;
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.startsWith("id"));
      if (idVoice) u.voice = idVoice;
      u.onend = () =>
        setCharState(input.trim().length > 0 ? "listening" : "idle");
      u.onerror = () => setCharState("idle");
      window.speechSynthesis.speak(u);
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] text-white shadow-[0_8px_30px_-4px_var(--wine)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_-4px_var(--rose)]"
        aria-label="Buka chat TIKA"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-glass-border bg-background shadow-2xl sm:bottom-6 sm:right-6 sm:top-6 sm:rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-glass-border px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-cta)]">
                  <Bot className="h-5 w-5 text-white" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold">TIKA</p>
                  <p className="text-xs text-muted-foreground">
                    Campus Assistant
                  </p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full ${charState === "speaking" ? "bg-emerald-400 animate-pulse" : "bg-emerald-400"}`}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Video Avatar */}
              <div className="relative h-48 w-full shrink-0 border-b border-glass-border bg-gradient-to-b from-rose/5 to-transparent sm:h-56">
                <TikaAvatar
                  state={charState}
                  showStatusBadge={true}
                  badgePosition="bottom-center"
                  className="h-full w-full"
                />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.sender === "user" ? "bg-[image:var(--gradient-cta)] text-white" : "glass-panel"}`}
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

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 px-5 pb-2">
                {[
                  "Program studi",
                  "Cara daftar",
                  "Fasilitas",
                  "Karier lulusan",
                  "Beasiswa",
                  "Kontak",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-glass-border bg-glass px-3 py-1.5 text-xs text-muted-foreground hover:border-rose/40 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-glass-border px-5 py-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ketik pertanyaan..."
                    className="flex-1 rounded-full border border-glass-border bg-glass px-4 py-2.5 text-sm outline-none focus:border-rose/40"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] text-white hover:scale-105 disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

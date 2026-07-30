/**
 * Cyber Attack Simulation Engine - Realistic Threat Campaign Engine.
 *
 * Simulates authentic cyber warfare campaigns, APT infiltrations, DDoS bursts,
 * and national cyber defense shields with realistic cadence and zero monotony.
 */

import { CITIES, ATTACK_TYPES, type City, type AttackType } from "./cyber-data";

export interface Attack {
  id: string;
  source: City;
  target: City;
  type: AttackType;
  sourceIP: string;
  targetIP: string;
  port: number;
  protocol: "TCP" | "UDP" | "HTTP" | "HTTPS" | "DNS";
  bandwidth: string;
  timestamp: number;
  active: boolean;
  campaign?: string;
  cve?: string;
}

export interface CyberStats {
  attacksPerSecond: number;
  attacksPerMinute: number;
  activeThreats: number;
  countriesAffected: number;
  topTarget: string;
  totalAttacks: number;
  criticalAlarms: number;
  attackTypeCounts: Record<string, number>;
}

let attackCounter = 0;

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomIP(prefix = ""): string {
  if (prefix) return `${prefix}.${Math.floor(Math.random() * 254) + 1}`;
  const blocks = [
    Math.floor(Math.random() * 190) + 10,
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 254) + 1,
  ];
  return blocks.join(".");
}

const COMMON_PORTS = [80, 443, 22, 53, 3389, 8080, 21, 445, 8443, 1433, 3306, 5432];
const PROTOCOLS: Array<"TCP" | "UDP" | "HTTP" | "HTTPS" | "DNS"> = ["TCP", "UDP", "HTTP", "HTTPS", "DNS"];

const CVE_LIST = [
  "CVE-2026-8819 (Zero-Day RCE)",
  "CVE-2026-4412 (BGP Hijack Probe)",
  "CVE-2025-9011 (Spring Cloud Vuln)",
  "CVE-2026-1024 (Auth Bypass)",
  "CVE-2025-3390 (SQL Injection)",
  "CVE-2026-5501 (OpenSSL Overflow)",
];

const CAMPAIGNS = [
  { name: "🌊 Gelombang DDoS Infrastruktur Global", focusSeverity: "critical" },
  { name: "🔒 Wabah Ransomware Zero-Day Enterprise", focusSeverity: "high" },
  { name: "🇮🇩 Cyber Shield Perbatasan Indonesia", focusIndo: true },
  { name: "👁️ Infiltrasi Terdistribusi APT Group", focusSeverity: "high" },
  { name: "⚡ Amplifikasi DNS & DNSSEC Flooding", focusSeverity: "medium" },
];

/** Generate a realistic, campaign-driven attack event */
function generateCampaignAttack(currentCampaignIndex: number): Attack {
  const campaignInfo = CAMPAIGNS[currentCampaignIndex % CAMPAIGNS.length];

  // Select Source & Target based on campaign context
  const indoCities = CITIES.filter((c) => c.country === "Indonesia");
  const foreignCities = CITIES.filter((c) => c.country !== "Indonesia");

  let source: City;
  let target: City;

  if (campaignInfo.focusIndo) {
    // 50% chance Indonesia as target of foreign attack, 50% Indonesia outbound
    if (Math.random() > 0.5) {
      source = randomFromArray(foreignCities);
      target = randomFromArray(indoCities);
    } else {
      source = randomFromArray(indoCities);
      target = randomFromArray(foreignCities);
    }
  } else {
    source = randomFromArray(CITIES);
    target = randomFromArray(CITIES);
    while (target.name === source.name) {
      target = randomFromArray(CITIES);
    }
  }

  // Pick attack type aligned with campaign
  let type = randomFromArray(ATTACK_TYPES);
  if (campaignInfo.focusSeverity) {
    const matched = ATTACK_TYPES.filter((t) => t.severity === campaignInfo.focusSeverity);
    if (matched.length > 0) type = randomFromArray(matched);
  }

  const port = randomFromArray(COMMON_PORTS);
  const protocol = randomFromArray(PROTOCOLS);

  const bwBase = type.severity === "critical" ? 400 + Math.random() * 550 : Math.random() * 300 + 10;
  const unit = type.severity === "critical" ? "Gbps" : type.severity === "high" ? "Mbps" : "Kbps";

  return {
    id: `atk-${Date.now()}-${++attackCounter}`,
    source,
    target,
    type,
    sourceIP: generateRandomIP(),
    targetIP: generateRandomIP(),
    port,
    protocol,
    bandwidth: `${bwBase.toFixed(1)} ${unit}`,
    timestamp: Date.now(),
    active: true,
    campaign: campaignInfo.name,
    cve: randomFromArray(CVE_LIST),
  };
}

export function calculateStats(recentAttacks: Attack[]): CyberStats {
  const now = Date.now();
  const lastSecond = recentAttacks.filter((a) => now - a.timestamp < 1000);
  const lastMinute = recentAttacks.filter((a) => now - a.timestamp < 60000);
  const active = recentAttacks.filter((a) => now - a.timestamp < 4000);
  const critical = recentAttacks.filter((a) => a.type.severity === "critical");

  const countriesSet = new Set<string>();
  recentAttacks.forEach((a) => {
    countriesSet.add(a.source.country);
    countriesSet.add(a.target.country);
  });

  const targetCounts: Record<string, number> = {};
  recentAttacks.forEach((a) => {
    targetCounts[a.target.name] = (targetCounts[a.target.name] || 0) + 1;
  });

  const sortedTargets = Object.entries(targetCounts).sort((a, b) => b[1] - a[1]);
  const topTarget = sortedTargets[0] ? `${sortedTargets[0][0]} (${sortedTargets[0][1]})` : "—";

  const attackTypeCounts: Record<string, number> = {};
  recentAttacks.forEach((a) => {
    attackTypeCounts[a.type.name] = (attackTypeCounts[a.type.name] || 0) + 1;
  });

  return {
    attacksPerSecond: lastSecond.length,
    attacksPerMinute: lastMinute.length,
    activeThreats: active.length,
    countriesAffected: countriesSet.size,
    topTarget,
    totalAttacks: recentAttacks.length,
    criticalAlarms: critical.length,
    attackTypeCounts,
  };
}

export type AttackCallback = (attack: Attack) => void;

export class CyberEngine {
  private attacks: Attack[] = [];
  private maxAttacks = 150;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private listeners: AttackCallback[] = [];
  private isRunning = false;
  private speedMultiplier = 1;
  private currentCampaignIndex = 0;
  private campaignBurstCount = 0;

  start(speedMultiplier = 1) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.speedMultiplier = speedMultiplier;

    // Seed initial batch of active attacks for immediate density
    for (let i = 0; i < 15; i++) {
      const atk = generateCampaignAttack(Math.floor(Math.random() * CAMPAIGNS.length));
      atk.timestamp = Date.now() - Math.random() * 3000;
      this.attacks.push(atk);
    }

    const loop = () => {
      if (!this.isRunning) return;

      const attack = generateCampaignAttack(this.currentCampaignIndex);
      this.attacks.unshift(attack);
      if (this.attacks.length > this.maxAttacks) {
        this.attacks.pop();
      }

      const now = Date.now();
      this.attacks.forEach((a) => {
        a.active = now - a.timestamp < 3500;
      });

      this.listeners.forEach((cb) => cb(attack));

      this.campaignBurstCount++;
      let delay = 250 + Math.random() * 400; // Natural realistic attack rhythm (250ms - 650ms)

      // Every 4-8 attacks, trigger a campaign shift & realistic network pause (800ms - 1500ms)
      if (this.campaignBurstCount >= Math.floor(Math.random() * 4) + 4) {
        this.campaignBurstCount = 0;
        this.currentCampaignIndex = (this.currentCampaignIndex + 1) % CAMPAIGNS.length;
        delay = 800 + Math.random() * 900;
      }

      const finalDelay = Math.max(80, delay / this.speedMultiplier);
      this.timerId = setTimeout(loop, finalDelay);
    };

    loop();
  }

  setSpeed(multiplier: number) {
    this.speedMultiplier = multiplier;
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  getAttacks(): Attack[] {
    return [...this.attacks];
  }

  getStats(): CyberStats {
    return calculateStats(this.attacks);
  }

  onAttack(callback: AttackCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  destroy() {
    this.stop();
    this.listeners = [];
    this.attacks = [];
  }
}

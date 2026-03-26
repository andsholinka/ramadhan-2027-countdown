"use client";

import { useEffect, useMemo, useState } from "react";

type Countdown = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_ISO = "2027-02-08T00:00:00+07:00";
const RAMADHAN_2027 = new Date(TARGET_ISO).getTime();
const START_TRACKING = new Date("2026-03-25T00:00:00+07:00").getTime();

function getCountdown(target: number): Countdown {
  const total = target - Date.now();

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
}

function formatGregorianDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

function formatHijriDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

function getNowInJakarta() {
  const now = new Date();
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(now);
}

function TimeCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-[0_14px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200/35 hover:bg-white/15">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)] opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
      <div className="relative flex flex-col items-center gap-2">
        <span className="text-4xl font-black tracking-tight text-white drop-shadow md:text-6xl">
          {String(value).padStart(2, "0")}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-100/80 md:text-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

function Ornament() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-10 top-16 h-28 w-28 rounded-full border border-emerald-200/10" />
      <div className="absolute left-14 top-20 h-20 w-20 rounded-full border border-emerald-100/10" />
      <div className="absolute right-10 top-20 h-24 w-24 rounded-full border border-yellow-100/10" />
      <div className="absolute right-16 top-26 h-16 w-16 rounded-full border border-yellow-50/10" />
      <div className="absolute bottom-16 left-[8%] h-40 w-40 rounded-full border border-white/5" />
      <div className="absolute bottom-12 right-[10%] h-52 w-52 rounded-full border border-white/5" />
    </div>
  );
}

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(RAMADHAN_2027));
  const [jakartaNow, setJakartaNow] = useState("");

  useEffect(() => {
    setJakartaNow(getNowInJakarta());

    const timer = setInterval(() => {
      setCountdown(getCountdown(RAMADHAN_2027));
      setJakartaNow(getNowInJakarta());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progress = useMemo(() => {
    const totalRange = RAMADHAN_2027 - START_TRACKING;
    const elapsed = Math.min(Math.max(Date.now() - START_TRACKING, 0), totalRange);
    return (elapsed / totalRange) * 100;
  }, []);

  const targetDate = useMemo(() => new Date(TARGET_ISO), []);
  const isArrived = countdown.total <= 0;
  const targetGregorian = useMemo(() => formatGregorianDate(targetDate), [targetDate]);
  const targetHijri = useMemo(() => formatHijriDate(targetDate), [targetDate]);
  const todayHijri = useMemo(() => formatHijriDate(new Date()), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#04110d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_30%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.16),transparent_24%),radial-gradient(circle_at_bottom,rgba(6,78,59,0.65),transparent_42%),linear-gradient(135deg,#01050b_0%,#062821_40%,#04110d_100%)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.7)_1px,transparent_1.2px)] [background-size:22px_22px]" />
      <Ornament />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-14 md:px-10">
        <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-emerald-200/20 bg-white/10 px-4 py-2 text-sm text-emerald-50/90 backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
          Countdown menuju Ramadhan 2027
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.18fr_0.82fr]">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-emerald-200/70">
              Ramadan Kareem · 1448 H
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl xl:text-[5.5rem]">
              Menanti hadirnya
              <span className="mt-2 block bg-gradient-to-r from-emerald-200 via-yellow-100 to-emerald-300 bg-clip-text text-transparent">
                bulan Ramadhan 2027
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50/75 md:text-lg">
              Sebuah penghitung waktu yang lebih premium dan tenang untuk menyambut bulan
              penuh rahmat. Nuansa visual dibuat lebih hangat, elegan, dan reflektif — cocok
              untuk menemani penantian menuju Ramadhan.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <TimeCard label="Hari" value={countdown.days} />
              <TimeCard label="Jam" value={countdown.hours} />
              <TimeCard label="Menit" value={countdown.minutes} />
              <TimeCard label="Detik" value={countdown.seconds} />
            </div>

            <div className="mt-10 max-w-2xl rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between text-sm text-emerald-50/80">
                <span>Perjalanan menuju Ramadhan 2027</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-lime-200 to-yellow-200 shadow-[0_0_24px_rgba(167,243,208,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-5 grid gap-3 text-sm text-emerald-50/70 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-emerald-100/55">Tanggal Masehi target</p>
                  <p className="mt-1 font-semibold text-white">{targetGregorian}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-emerald-100/55">Tanggal Hijriah target</p>
                  <p className="mt-1 font-semibold text-white">{targetHijri}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-emerald-50/65">
                Hitungan diarahkan ke <strong>8 Februari 2027 pukul 00:00 WIB</strong>. Awal
                resmi Ramadhan tetap dapat berbeda mengikuti hasil rukyat dan penetapan otoritas.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-emerald-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-yellow-200/15 blur-2xl" />
              <div className="absolute -right-4 top-12 text-7xl opacity-90">☾</div>
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/70">Target</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">1 Ramadhan 1448 H</h2>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-3xl shadow-[0_0_30px_rgba(253,224,71,0.18)]">
                    🕌
                  </div>
                </div>

                <div className="space-y-4 text-emerald-50/80">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-sm text-emerald-100/60">Tanggal Hijriah hari ini</p>
                    <p className="mt-1 text-lg font-semibold text-white">{todayHijri}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-sm text-emerald-100/60">Waktu Jakarta saat ini</p>
                    <p className="mt-1 text-lg font-semibold text-white">{jakartaNow || "Memuat..."}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <p className="text-sm text-emerald-100/60">Status penantian</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {isArrived ? "Ramadhan telah tiba" : "Masih dalam hitungan mundur"}
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-emerald-200/15 bg-emerald-300/10 p-5 text-sm leading-7 text-emerald-50/80">
                  “Ya Allah, berkahilah kami di bulan Rajab dan Sya'ban, dan sampaikanlah kami ke bulan Ramadhan.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

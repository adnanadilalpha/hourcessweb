"use client";

import WaitlistForm from "@/components/WaitlistForm";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";
import Device from "@/components/Device";

export default function ReducedMotionStory() {
  return (
    <main className="bg-background text-primary">
      <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-8 font-ui text-sm uppercase tracking-[0.4em] text-secondary">Be honest.</p>
        <h1 className="mb-6 font-display text-[clamp(2rem,6vw,4rem)] font-semibold tracking-tight">
          Why did you pick up your phone?
        </h1>
        <p className="font-display text-xl text-secondary">You probably don&apos;t remember.</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="mb-4 font-display text-4xl font-semibold">You kept scrolling.</p>
        <p className="font-ui text-secondary">You only meant to check something. Sound familiar?</p>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden">
        <img src="/story/phone-down.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/30" />
        <p className="absolute inset-x-8 bottom-16 max-w-xl font-display text-3xl font-semibold leading-tight">
          Maybe the problem isn&apos;t that you use your phone.
        </p>
      </section>

      <section className="flex min-h-[50vh] items-center justify-center px-8 py-24">
        <p className="max-w-2xl text-center font-display text-3xl font-medium leading-snug">
          It&apos;s that sometimes you don&apos;t know{" "}
          <span className="text-lavender">what you want to do instead.</span>
        </p>
      </section>

      <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">
        <img src="/story/football-dusk.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <p className="relative z-10 font-display text-3xl font-semibold">
          What if your phone could help you choose?
        </p>
        <div className="relative z-10">
          <HourcessIcon size={64} />
        </div>
        <div className="relative z-10">
          <HourcessWordmarkSVG width={180} />
        </div>
      </section>

      <section className="flex flex-col items-center px-6 py-24 text-center">
        <p className="mb-8 font-display text-2xl font-semibold">Still scrolling?</p>
        <Device scale={0.48}>
          <img src="/app/home.png" alt="Hourcess home" className="h-full w-full object-cover object-top" />
        </Device>
      </section>

      <section className="relative min-h-[80vh] overflow-hidden">
        <img src="/story/running-night.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex min-h-[80vh] items-end px-8 pb-20">
          <div>
            <p className="mb-4 font-ui text-xs uppercase tracking-[0.35em] text-lavender">That&apos;s Hourcess</p>
            <p className="font-display text-[clamp(2rem,6vw,4rem)] font-semibold leading-tight">
              You don&apos;t need less phone.
            </p>
            <p className="mt-4 font-display text-2xl text-lavender">
              You need more moments worth choosing.
            </p>
          </div>
        </div>
      </section>

      <section id="waitlist" className="relative overflow-hidden px-6 py-28">
        <img src="/story/leaving-room.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 mx-auto max-w-md text-center">
          <div className="flex justify-center">
            <HourcessIcon size={48} />
          </div>
          <p className="mt-8 mb-8 font-display text-[clamp(1.8rem,5vw,2.8rem)] font-semibold">
            What will you choose next?
          </p>
          <div
            className="rounded-3xl border border-white/12 p-5 text-left backdrop-blur-xl"
            style={{ background: "rgba(12,12,16,0.55)" }}
          >
            <WaitlistForm />
          </div>
        </div>
      </section>
    </main>
  );
}

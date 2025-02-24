import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="h-screen container flex flex-col lg:flex-row items-center justify-between  py-16 md:py-24">
      <div className="flex flex-col items-center lg:items-center text-center lg:text-left space-y-6 flex-1">
        <h1 className=" font-bold tracking-tight sm:text-5xl md:text-sm text-xl lg:text-7xl">
          Next+Ts+Tailwindcss+ShadcnUI 
        </h1>
        <p className="max-w-[700px] text-base sm:text-lg text-muted-foreground">
          A starter template for Next.js, TypeScript, Tailwind CSS, and Shadcn UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="px-6 py-3 text-lg" asChild>
            <a href="#">Get Stared</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

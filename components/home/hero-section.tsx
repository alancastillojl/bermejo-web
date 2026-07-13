import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PrivatePassDialog } from "@/components/home/private-pass-dialog";

export function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1800px] flex-col items-center px-6 pt-6 pb-16 text-center md:px-10">
      <Image
        src="/images/logo-b.png"
        alt="Bermejo"
        width={220}
        height={220}
        priority
        className="h-40 w-auto md:h-56"
      />

      <div className="mt-8 flex items-center">
        <PrivatePassDialog
          trigger={
            <Button
              size="lg"
              variant="outline"
              className="rounded-none border-ink/30 bg-transparent px-10 text-xs font-semibold tracking-[0.2em] text-ink uppercase hover:bg-ink/5"
            >
              Private Pass
            </Button>
          }
        />
      </div>
    </section>
  );
}

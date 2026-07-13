import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CommunitySignupDialog } from "@/components/home/community-signup-dialog";

export function CommunityDropSection() {
  return (
    <section id="community" className="mx-auto w-full max-w-[1800px] px-6 py-4 md:px-10">
      <div className="flex flex-col items-center gap-6 bg-card px-8 py-10 text-center">
        <p className="text-xs font-semibold tracking-[0.15em] text-brand uppercase">
          Private Community
        </p>
        <p className="text-[11px] font-semibold tracking-[0.05em] text-ink/70 uppercase">
          Early access. Exclusive collections.
          <br />
          Members only.
        </p>

        <CommunitySignupDialog
          trigger={
            <Button
              variant="outline"
              className="rounded-none border-ink/30 bg-transparent px-8 text-[11px] font-semibold tracking-[0.15em] text-ink uppercase hover:bg-ink/5"
            >
              Get Your Private Pass &rarr;
            </Button>
          }
        />

        <Image
          src="/images/logo-b.png"
          alt="Bermejo"
          width={100}
          height={100}
          className="mt-2 h-14 w-auto opacity-80"
        />
      </div>
    </section>
  );
}

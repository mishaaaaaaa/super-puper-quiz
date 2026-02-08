"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/card";
import { LANG_NAMES } from "@/lib/constants";

export default function StepOne() {
  const router = useRouter();

  const handleSelect = useCallback(
    (langCode: string) => {
      // Switch locale and move to step 2
      router.push(`/${langCode}/quiz/2`);
    },
    [router],
  );

  const variants = [
    { label: LANG_NAMES.en, code: "en" },
    { label: LANG_NAMES.fr, code: "fr" },
    { label: LANG_NAMES.de, code: "de" },
    { label: LANG_NAMES.es, code: "es" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <h1 className="mb-6 text-3xl font-semibold">
          What is your preferred language?
        </h1>
        <div className="mb-6 text-zinc-400">Choose language</div>
      </div>

      <div className="mb-5 grid w-full gap-y-3 lg:w-3/4 lg:grid-cols-2 lg:gap-x-3">
        {variants.map((variant) => (
          <Card
            key={variant.code}
            label={variant.label}
            onSelect={() => handleSelect(variant.code)}
          />
        ))}
      </div>
    </div>
  );
}

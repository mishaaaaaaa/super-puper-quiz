import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("finalStep");

  return (
    <div className="smin-h-screen flex flex-col items-center justify-center p-8 text-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-4 text-4xl font-bold">Quiz App Migration</h1>
      <p className="mb-8 text-lg">Work in progress...</p>

      <p className="text-xl text-green-600">{t("title")}</p>

      <div className="rounded-xl border border-[var(--color-quiz-pink)] bg-[var(--color-quiz-purple)] p-4 text-white">
        Color test block
      </div>
    </div>
  );
}

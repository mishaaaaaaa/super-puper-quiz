import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NotFound() {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        </div>
      </body>
    </html>
  );
}

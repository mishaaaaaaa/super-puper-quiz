import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pb-20">
            <h1 className="text-[120px] leading-none font-bold text-[#e4229c] mb-2">
                404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Page Not Found
            </h2>
            <p className="text-[#C4C8CC] mb-12 max-w-md text-lg">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="inline-block w-full md:w-auto px-12 md:px-24 py-4 rounded-3xl hover:cursor-pointer bg-[#E4229C] text-white font-bold transition-transform hover:scale-105 active:scale-95"
            >
                Go Home
            </Link>
        </div>
    );
}

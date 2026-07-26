import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-start justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-trust">
        404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-douyin-sans)] text-3xl font-bold text-ink">
        微泊云
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-trust-hover"
      >
        Home / 首页
      </Link>
    </div>
  );
}

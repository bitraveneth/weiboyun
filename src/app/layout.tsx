import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Root layout — html/body live in `[locale]/layout.tsx`. */
export default function RootLayout({ children }: Props) {
  return children;
}

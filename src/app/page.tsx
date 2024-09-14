import Dashboard from "@/pages/Dashboard";
import { Suspense } from "react";

export const AppVersion: string = "V 1.0.0";

export default function Home() {
  return (
    <Suspense fallback>
      <Dashboard/>
    </Suspense>
  );
}

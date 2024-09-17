import Dashboard from "@/pages/Dashboard";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback>
      <Dashboard/>
    </Suspense>
  );
}

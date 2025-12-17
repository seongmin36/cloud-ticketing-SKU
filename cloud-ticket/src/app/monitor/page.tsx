import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import MonitoringClient from "./ui/MonitoringClient";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] p-6 flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col gap-4">
        <div className="flex justify-end">
          <Link
            href={ROUTES.SUCCESS}
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#525252] hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            티켓 화면으로 돌아가기
          </Link>
        </div>
        <div className="flex-1">
          <MonitoringClient />
        </div>
      </div>
    </main>
  );
}

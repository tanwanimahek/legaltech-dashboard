import Sidebar from "@/components/ui/Sidebar";
import ProtectedLayout from "@/components/ProtectedLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedLayout>
  );
}

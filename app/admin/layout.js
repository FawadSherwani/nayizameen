import AdminShell from "@/components/AdminShell";

export const metadata = { title: "Admin | Nayizameen" };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
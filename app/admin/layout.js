import AdminShell from "@/components/AdminShell";

export const metadata = { title: "Admin | Nayi Zameen" };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
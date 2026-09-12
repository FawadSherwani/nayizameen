"use client";

import { ShieldCheck, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

const ROLE_STORAGE_KEY = "nayizameen-role-permissions";
const USER_STORAGE_KEY = "nayizameen-admin-users";
const roles = [
  { value: "super_admin", label: "Super admin", description: "Complete portal control" },
  { value: "customer", label: "Customer", description: "Property seeker account" },
  { value: "agency", label: "Agency", description: "Agency workspace access" },
  { value: "agent", label: "Agent", description: "Individual listing access" },
];
const permissionGroups = [
  { label: "Admin workspace", items: [{ key: "dashboard", label: "Dashboard", description: "Overview and quick actions" }, { key: "properties", label: "Properties", description: "Manage listings" }, { key: "agents", label: "Agents", description: "Manage agent profiles" }, { key: "projects", label: "Projects", description: "Manage developments" }] },
  { label: "Portal tools", items: [{ key: "maps", label: "Society maps", description: "Manage maps and locations" }, { key: "analytics", label: "Analytics", description: "View portal insights" }, { key: "agency_profile", label: "Agency profile", description: "Manage agency information" }, { key: "user_roles", label: "User roles", description: "Assign roles and permissions" }] },
];
const allPermissions = Object.fromEntries(permissionGroups.flatMap((group) => group.items.map((item) => [item.key, true])));
const defaultPermissions = {
  super_admin: allPermissions,
  customer: { dashboard: false, properties: false, agents: false, projects: false, maps: false, analytics: false, agency_profile: false, user_roles: false },
  agency: { dashboard: true, properties: true, agents: true, projects: false, maps: false, analytics: true, agency_profile: true, user_roles: false },
  agent: { dashboard: true, properties: true, agents: false, projects: false, maps: false, analytics: true, agency_profile: false, user_roles: false },
};
const seedUsers = [
  { id: "admin-1", name: "Admin User", email: "admin@nayizameen.test", role: "super_admin", status: "active" },
  { id: "customer-1", name: "Demo Customer", email: "demo.user@nayizameen.test", role: "customer", status: "active" },
  { id: "agency-1", name: "Demo Agency", email: "demo.agency@nayizameen.test", role: "agency", status: "active" },
  { id: "agent-1", name: "Demo Agent", email: "agent@nayizameen.test", role: "agent", status: "active" },
];

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "null");
    return value || fallback;
  } catch {
    return fallback;
  }
}

function getCurrentRole() {
  const session = readStorage("nayizameen-session", null);
  const role = session?.role || session?.type || "super_admin";
  return role === "user" || role === "buyer" ? "customer" : role;
}

export default function UserRolesPage() {
  const [currentRole] = useState(getCurrentRole);
  const [users, setUsers] = useState(() => readStorage(USER_STORAGE_KEY, seedUsers).map((user) => ({ ...user, status: user.status || "active" })));
  const [permissions, setPermissions] = useState(() => {
    const saved = readStorage(ROLE_STORAGE_KEY, {});
    return Object.fromEntries(roles.map(({ value }) => [value, { ...defaultPermissions[value], ...(saved[value] || {}) }]));
  });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event("nayizameen-role-permissions-updated"));
  }, [users]);

  useEffect(() => {
    window.localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(permissions));
    window.dispatchEvent(new Event("nayizameen-role-permissions-updated"));
  }, [permissions]);

  const updateUserRole = (id, role) => {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, role } : user)));
    setNotice("User role updated.");
  };

  const toggleAccountStatus = (id) => {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user)));
    setNotice("Account status updated.");
  };

  const togglePermission = (role, key) => {
    if (role === "super_admin") return;
    setPermissions((current) => ({ ...current, [role]: { ...current[role], [key]: !current[role][key] } }));
    setNotice("Visibility settings saved.");
  };

  const addUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email) return;
    setUsers((current) => [...current, { id: `user-${Date.now()}`, name, email, role: String(data.get("role") || "customer") }]);
    event.currentTarget.reset();
    setNotice("User added with the selected role.");
  };

  if (currentRole !== "super_admin") {
    return <section className="rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-10 w-10 text-rose-500" /><h1 className="mt-4 text-xl font-bold text-slate-900">Super admin access required</h1><p className="mt-2 text-sm text-slate-500">Only a super admin can assign roles or change feature visibility.</p></section>;
  }

  return <>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-primary-700">ACCESS CONTROL</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">User roles & permissions</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Assign account roles, then choose which admin tools each role can see.</p></div><span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800"><ShieldCheck className="h-4 w-4" />Super admin</span></div>
    {notice && <p role="status" className="mt-6 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-medium text-primary-800">{notice}</p>}
    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-semibold text-slate-900">Users</h2><p className="mt-1 text-sm text-slate-500">Choose one of the four roles for every account.</p></div><span className="inline-flex items-center gap-2 text-sm text-slate-500"><Users className="h-4 w-4" />{users.length} accounts</span></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><tr><th className="pb-3 font-medium">User</th><th className="pb-3 font-medium">Email</th><th className="pb-3 font-medium">Role</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Account</th></tr></thead><tbody>{users.map((user) => <tr key={user.id} className="border-b border-slate-100 last:border-0"><td className="py-4 font-semibold text-slate-800">{user.name}</td><td className="py-4 text-slate-500">{user.email}</td><td className="py-4"><select value={user.role} onChange={(event) => updateUserRole(user.id, event.target.value)} className="h-10 min-w-40 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100">{roles.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select></td><td className="py-4"><span className={"rounded-full px-2.5 py-1 text-xs font-semibold " + (user.status === "suspended" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700")}>{user.status === "suspended" ? "Suspended" : "Active"}</span></td><td className="py-4"><button type="button" disabled={user.role === "super_admin"} onClick={() => toggleAccountStatus(user.id)} className={"rounded-lg px-3 py-2 text-xs font-semibold transition " + (user.role === "super_admin" ? "cursor-not-allowed bg-slate-100 text-slate-400" : user.status === "suspended" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-rose-50 text-rose-700 hover:bg-rose-100")}>{user.role === "super_admin" ? "Protected" : user.status === "suspended" ? "Reactivate" : "Suspend"}</button></td></tr>)}</tbody></table></div></section>
    <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div><h2 className="text-lg font-semibold text-slate-900">Add a user role</h2><p className="mt-1 text-sm text-slate-500">Create a local account entry and assign its starting role.</p></div><form onSubmit={addUser} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_11rem_auto]"><input required name="name" placeholder="Full name" className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /><input required name="email" type="email" placeholder="Email address" className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /><select name="role" defaultValue="customer" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100">{roles.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select><button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white hover:bg-primary-800"><UserPlus className="h-4 w-4" />Add user</button></form></section>
    <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"><div><h2 className="text-lg font-semibold text-slate-900">Feature visibility</h2><p className="mt-1 text-sm text-slate-500">Turn a tool on to show it in that role&apos;s admin navigation. Super admins always have complete access.</p></div><div className="mt-6 grid gap-5 xl:grid-cols-2">{roles.map((role) => <article key={role.value} className="overflow-hidden rounded-2xl border border-slate-200"><div className="border-b border-slate-100 bg-slate-50 px-5 py-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-900">{role.label}</h3><p className="mt-1 text-xs text-slate-500">{role.description}</p></div>{role.value === "super_admin" ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Full access</span> : <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">Custom</span>}</div></div><div className="divide-y divide-slate-100">{permissionGroups.map((group) => <div key={group.label} className="p-5"><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{group.label}</p><div className="space-y-3">{group.items.map((item) => <label key={item.key} className="flex cursor-pointer items-start justify-between gap-4"><span><span className="block text-sm font-medium text-slate-700">{item.label}</span><span className="mt-0.5 block text-xs text-slate-500">{item.description}</span></span><input type="checkbox" checked={permissions[role.value][item.key]} disabled={role.value === "super_admin"} onChange={() => togglePermission(role.value, item.key)} className="mt-1 h-4 w-4 shrink-0 accent-primary-700 disabled:cursor-not-allowed disabled:opacity-70" /></label>)}</div></div>)}</div></article>)}</div></section>
  </>;
}

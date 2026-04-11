"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserRoleManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, newRole: string) => {
    setUpdating(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });

      if (res.ok) {
        setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-sst-teal" /></div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 text-muted-foreground">
          <tr>
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Current Role</th>
            <th className="pb-3 font-medium text-right">Update Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-4 text-white font-medium">{user.name}</td>
              <td className="py-4 text-muted-foreground">{user.email}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${
                  user.role === 'ADMIN' ? 'bg-red-500/20 text-red-400' :
                  user.role === 'TEACHER' ? 'bg-blue-500/20 text-blue-400' : 
                  user.role === 'CR' ? 'bg-sst-gold/20 text-sst-gold' :
                  user.role === 'STUDENT' ? 'bg-sst-teal/20 text-sst-teal' : 
                  'bg-white/10 text-white/60'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="py-4 text-right">
                <select
                  disabled={updating === user.id}
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-xs rounded px-2 py-1 focus:outline-none focus:border-sst-teal disabled:opacity-50"
                >
                  <option value="GUEST" className="text-black">GUEST</option>
                  <option value="STUDENT" className="text-black">STUDENT</option>
                  <option value="CR" className="text-black">CR</option>
                  <option value="TEACHER" className="text-black">TEACHER</option>
                  <option value="ADMIN" className="text-black">ADMIN</option>
                </select>
                {updating === user.id && <Loader2 className="w-3 h-3 animate-spin inline ml-2 text-sst-teal" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

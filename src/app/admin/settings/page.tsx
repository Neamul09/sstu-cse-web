"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Settings, 
  ShieldCheck, 
  Globe, 
  Mail, 
  Power,
  Loader2,
  Lock,
  User,
  Save
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    departmentName: "",
    supportEmail: "",
    maintenanceMode: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (res.ok) setSettings(data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Settings saved successfully");
      }
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-outfit font-bold">Portal Settings</h1>
            <p className="text-muted-foreground text-sm">Configure global environment variables and administrative preferences.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-sst-teal" /></div>
        ) : (
          <form onSubmit={handleSave} className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-8">
                  <Globe className="w-5 h-5 text-sst-teal" />
                  <h2 className="text-xl font-bold">Branding & Identity</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Department Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sst-teal"
                      value={settings.departmentName}
                      onChange={(e) => setSettings({...settings, departmentName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">Support Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sst-teal"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-8">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-bold">System Operations</h2>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                  <div>
                    <p className="font-bold text-sm">Public Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Restrict portal access to administrators only.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.maintenanceMode ? 'bg-red-500' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.maintenanceMode ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-3xl p-8 border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-8">
                  <Lock className="w-5 h-5 text-sst-gold" />
                  <h2 className="text-xl font-bold">Admin Credentials</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Security settings for the current administrative session.</p>
                <div className="space-y-4">
                   <button type="button" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm group">
                      <div className="flex items-center gap-3">
                         <User className="w-4 h-4 group-hover:text-sst-gold" /> Update Profile Information
                      </div>
                      <ArrowLeft className="w-4 h-4 rotate-180 opacity-50" />
                   </button>
                   <button type="button" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm group">
                      <div className="flex items-center gap-3">
                         <Lock className="w-4 h-4 group-hover:text-sst-gold" /> Change Master Password
                      </div>
                      <ArrowLeft className="w-4 h-4 rotate-180 opacity-50" />
                   </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <button 
                   disabled={saving}
                   type="submit" 
                   className="flex-1 py-4 bg-sst-teal text-black font-bold rounded-2xl hover:bg-sst-teal/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Configuration
                 </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import ProfileForm from "@/components/dashboard/settings/ProfileForm";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3">
            <Settings className="h-6 w-6 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>

            <p className="mt-1 text-neutral-400">
              Manage your profile and account information.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/2 p-8 backdrop-blur-xl">
        <ProfileForm />
      </div>
    </section>
  );
}

import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "@/components/settings/notification-form";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Varslinger</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurer hvordan du mottar varsler.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}

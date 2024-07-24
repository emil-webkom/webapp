import { AccountForm } from "@/components/settings/account-form";
import { Separator } from "@/components/ui/separator";



export default function SettingsAccountPage() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Konto</h3>
          <p className="text-sm text-muted-foreground">
            Oppdater kontoinnstillinger. Sett fødselsdato og foretrukkne preferanser her.
          </p>
        </div>
        <Separator />
        <AccountForm />
      </div>
    )
  }
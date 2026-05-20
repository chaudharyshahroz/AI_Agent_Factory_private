import { Card } from "@/components/ui/card";
import { requireUser, getDefaultOrganization } from "@/lib/auth/access";

export default async function SettingsPage() {
  const user = await requireUser();
  const org = await getDefaultOrganization(user.id);
  return <div><h1 className="text-3xl font-semibold">Settings</h1><Card className="mt-8"><p className="font-medium">{org?.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></Card></div>;
}

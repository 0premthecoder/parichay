import { Globe, Shield, Brush } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your app settings and find helpful resources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Brush /> Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle">Theme</Label>
              <ThemeToggle />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Switch between light, dark, and system themes.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield /> Privacy & Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="#" className="block text-sm font-medium text-primary hover:underline">Privacy Policy</a>
            <a href="#" className="block text-sm font-medium text-primary hover:underline">Manage Your Data</a>
            <a href="#" className="block text-sm font-medium text-destructive hover:underline">Delete Account</a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

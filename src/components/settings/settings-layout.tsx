"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Plane, Wallet, Bell, Globe, Shield, Award, Bookmark, LifeBuoy } from 'lucide-react';

import { ProfileSettings } from './profile-settings';
import { TravelPreferences } from './travel-preferences';
import { PaymentSettings } from './payment-settings';
import { NotificationSettings } from './notification-settings';
import { LanguageSettings } from './language-settings';
import { SecuritySettings } from './security-settings';
import { RewardsSettings } from './rewards-settings';
import { SavedContent } from './saved-content';
import { SupportSettings } from './support-settings';

const navItems = [
  { id: 'profile', label: 'Profile', icon: User, component: ProfileSettings },
  { id: 'preferences', label: 'Travel Preferences', icon: Plane, component: TravelPreferences },
  { id: 'payments', label: 'Payments & Bookings', icon: Wallet, component: PaymentSettings },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationSettings },
  { id: 'language', label: 'Language & Region', icon: Globe, component: LanguageSettings },
  { id: 'security', label: 'Privacy & Security', icon: Shield, component: SecuritySettings },
  { id: 'rewards', label: 'Rewards & Membership', icon: Award, component: RewardsSettings },
  { id: 'saved', label: 'Saved Content', icon: Bookmark, component: SavedContent },
  { id: 'support', label: 'Support', icon: LifeBuoy, component: SupportSettings },
];

export function SettingsLayout() {
  const [activeTab, setActiveTab] = useState('profile');

  const ActiveComponent = navItems.find((item) => item.id === activeTab)?.component || (() => <div>Select a category</div>);

  return (
    <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
            <nav className="flex flex-col gap-1 p-2 border-r bg-muted/50">
            {navItems.map((item) => (
                <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'secondary' : 'ghost'}
                    className="justify-start gap-3"
                    onClick={() => setActiveTab(item.id)}
                >
                    <item.icon className="h-5 w-5" />
                    <span className="hidden md:inline">{item.label}</span>
                </Button>
            ))}
            </nav>
            <main className="col-span-1 md:col-span-3">
                <ActiveComponent />
            </main>
        </div>
    </Card>
  );
}

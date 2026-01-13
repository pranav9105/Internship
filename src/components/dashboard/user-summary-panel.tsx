
"use client";

import { User } from 'firebase/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

interface UserSummaryPanelProps {
  user: User;
}

export function UserSummaryPanel({ user }: UserSummaryPanelProps) {
  const firestore = useFirestore();

  const rewardDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'rewards', 'summary');
  }, [user, firestore]);

  const { data: rewards, isLoading } = useDoc(rewardDocRef);
  
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const travelerLevel = rewards?.level || "Newcomer";
  const travelPoints = rewards?.points || 0;
  const progressToNextLevel = rewards?.progress || 0;
  const membershipTier = rewards?.tier || 'Bronze';

  return (
    <Card className="h-full">
      <CardContent className="p-6 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/50 shadow-md">
          {user.photoURL ? <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} /> : null}
          <AvatarFallback className="text-3xl bg-muted">{getInitials(user.displayName)}</AvatarFallback>
        </Avatar>
        <h2 className="font-headline text-2xl font-bold">{user.displayName}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        {isLoading ? (
          <div className="mt-6">Loading rewards...</div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="flex justify-around text-center">
              <div>
                <p className="font-bold text-lg">{travelPoints}</p>
                <p className="text-xs text-muted-foreground">Travel Points</p>
              </div>
              <div>
                <Badge variant="secondary" className="text-sm bg-amber-400/20 text-amber-600 border-amber-400/50">
                  <Star className="w-3.5 h-3.5 mr-1" />
                  {membershipTier}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Membership</p>
              </div>
            </div>
            
            <div className="text-left">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-semibold flex items-center">
                  <Award className="w-4 h-4 mr-1.5 text-primary" />
                  {travelerLevel}
                </p>
                <p className="text-xs text-muted-foreground">{progressToNextLevel}%</p>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Star } from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export function RewardsSummary() {
  const { user } = useUser();
  const firestore = useFirestore();

  const rewardDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'rewards', 'summary');
  }, [user, firestore]);

  const { data: rewards, isLoading } = useDoc(rewardDocRef);
  
  const travelerLevel = rewards?.level || "Newcomer";
  const travelPoints = rewards?.points || 0;
  const progressToNextLevel = rewards?.progress || 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
            <Award />
            Rewards
        </CardTitle>
        <Button variant="link" asChild>
            <Link href="/settings">View Tiers</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading rewards...</p>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
                <p className="text-4xl font-bold">{travelPoints}</p>
                <p className="text-sm text-muted-foreground">Travel Points</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1.5 text-yellow-500" />
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

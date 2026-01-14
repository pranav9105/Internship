'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Repeat } from 'lucide-react';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import Link from 'next/link';

export function TransactionsSummary() {
  const { user } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'transactions'), orderBy('createdAt', 'desc'), limit(3));
  }, [user, firestore]);

  const { data: transactions, isLoading } = useCollection(transactionsQuery);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Repeat />
          Recent Transactions
        </CardTitle>
         <Button variant="link" asChild>
            <Link href="/transactions">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading transactions...</p>}
        {!isLoading && transactions?.length === 0 && (
             <div className="text-center text-muted-foreground p-4">
                <p>No recent transactions.</p>
            </div>
        )}
        <div className="space-y-3">
          {transactions?.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
              <div>
                <p className="font-semibold">{tx.purpose}: {tx.destinationName}</p>
                <p className="text-sm text-muted-foreground">{tx.createdAt ? format(tx.createdAt.toDate(), 'PP') : 'N/A'}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{tx.amount.toLocaleString()}</p>
                <Badge variant={tx.status === 'Paid' ? 'default' : 'secondary'} className={tx.status === 'Paid' ? 'bg-green-600/80' : ''}>{tx.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { Sidebar } from '@/components/layout/sidebar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Repeat, Download } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';

export default function TransactionsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'transactions'), orderBy('createdAt', 'desc'));
  }, [user, firestore]);

  const { data: transactions, isLoading } = useCollection(transactionsQuery);

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'refunded':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };
  
   const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-600/80';
      case 'pending':
        return 'bg-yellow-500/80';
      case 'refunded':
        return 'bg-blue-500/80';
      case 'failed':
        return 'bg-red-600/80';
      default:
        return '';
    }
  };

  return (
    <div className="flex w-full">
        <Sidebar />
        <main className="flex-grow p-8">
          <div className="container mx-auto px-4 md:px-6">
            <AnimateOnScroll>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Repeat />
                    Transaction History
                  </CardTitle>
                  <CardDescription>
                    A record of all your payments and transactions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>For</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center">
                            Loading your transactions...
                          </TableCell>
                        </TableRow>
                      )}
                      {!isLoading && transactions?.length === 0 && (
                         <TableRow>
                          <TableCell colSpan={7} className="text-center">
                            You have no transactions yet.
                          </TableCell>
                        </TableRow>
                      )}
                      {transactions?.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id.substring(0, 8)}...</TableCell>
                          <TableCell>
                            {tx.createdAt ? format(tx.createdAt.toDate(), 'PPp') : 'N/A'}
                            </TableCell>
                          <TableCell>
                            <div>
                                <p className="font-semibold">{tx.purpose}: {tx.destinationName}</p>
                                <p className="text-xs text-muted-foreground">{tx.travelerName}</p>
                            </div>
                          </TableCell>
                          <TableCell>₹{tx.amount.toLocaleString()}</TableCell>
                          <TableCell>
                             <div>
                                <p>{tx.paymentMethod}</p>
                                <p className="text-xs text-muted-foreground">{tx.paymentMethodDetails}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                             <Badge
                              variant={getStatusVariant(tx.status)}
                              className={getStatusClass(tx.status)}
                            >
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download Invoice</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </main>
    </div>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Printer } from 'lucide-react';
import { format } from 'date-fns';

export default function ReceiptPage() {
  const { transactionId } = useParams();
  const { user } = useUser();
  const firestore = useFirestore();

  const transactionDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !transactionId) return null;
    return doc(firestore, 'users', user.uid, 'transactions', transactionId as string);
  }, [user, firestore, transactionId]);

  const { data: transaction, isLoading } = useDoc(transactionDocRef);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/40">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <p className="ml-4 text-lg">Loading Receipt...</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/40">
        <Card className="text-center p-8">
            <CardTitle>Transaction Not Found</CardTitle>
            <CardDescription>The receipt you are looking for could not be found.</CardDescription>
        </Card>
      </div>
    );
  }
  
  const handlePrint = () => {
    window.print();
  };

  const subtotal = transaction.amount / 1.18;
  const tax = transaction.amount - subtotal;

  return (
    <div className="bg-muted/40 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4 print:hidden">
            <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print / Download
            </Button>
        </div>
        <Card className="p-8 shadow-lg">
          <CardHeader className="p-0">
            <div className="flex justify-between items-start">
                <div>
                    <Logo />
                    <p className="text-muted-foreground mt-2">123 Travel Lane, Adventure City, India</p>
                </div>
                <div className="text-right">
                    <h1 className="font-headline text-4xl font-bold">Invoice</h1>
                    <p className="text-muted-foreground"># {transaction.id}</p>
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-8">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold text-lg">Billed To:</h3>
                    <p className="font-bold text-primary">{transaction.travelerName}</p>
                    <p className="text-muted-foreground">{user?.email}</p>
                </div>
                 <div className="text-right">
                    <h3 className="font-semibold text-lg">Invoice Details:</h3>
                    <p><strong>Date:</strong> {transaction.createdAt ? format(transaction.createdAt.toDate(), 'PPP') : 'N/A'}</p>
                    <p><strong>Status:</strong> <span className="font-semibold text-green-600">{transaction.status}</span></p>
                </div>
            </div>
            
            <Separator className="my-8" />

             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p className="font-bold">{transaction.purpose} Package: {transaction.destinationName}</p>
                            <p className="text-sm text-muted-foreground">Booking ID: {transaction.bookingId}</p>
                        </TableCell>
                        <TableCell className="text-right font-medium">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
            <div className="flex justify-end mt-4">
                <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxes (18% GST)</span>
                        <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                     <Separator />
                     <div className="flex justify-between font-bold text-xl">
                        <span>Total Paid</span>
                        <span className="text-primary">₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
            
             <Separator className="my-8" />
             
             <div>
                <h3 className="font-semibold text-lg">Payment Details</h3>
                <p><span className="text-muted-foreground">Method:</span> {transaction.paymentMethod}</p>
                <p><span className="text-muted-foreground">Details:</span> {transaction.paymentMethodDetails}</p>
             </div>
          </CardContent>
          <CardFooter className="p-0 mt-8">
              <div className="text-center text-muted-foreground text-sm w-full">
                <p>Thank you for choosing RoamReady! We wish you a fantastic journey.</p>
                <p>For any queries, contact us at support@roamready.com</p>
              </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

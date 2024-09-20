"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Form, FormField, FormItem } from "./ui/form";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useTransition } from "react";
import { Button } from "./ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { ReloadIcon } from "@radix-ui/react-icons";
import { formatPrice } from "@/lib/utils";
import { handleGoToCheckout } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function CartForm({
  products,
}: {
  products: {
    id: string;
    name: string;
    image: string;
    priceInCents: number;
    finalPriceInCents?: number;
    amountInStock: number;
    quantity: number;
  }[];
}) {
  const [state, action] = useFormState(handleGoToCheckout, {
    errors: {
      cartTotal: undefined,
      ...products.reduce(
        (acc, product) => ({ ...acc, [product.id]: undefined }),
        {}
      ),
    },
    message: undefined,
  });
  const [isPending, startTransition] = useTransition();
  const schema = z.record(z.number());
  const defaultValues = useMemo(
    () =>
      products.reduce(
        (acc, product) => ({ ...acc, [product.id]: product.quantity }),
        {
          cartTotal: products.reduce(
            (acc, { finalPriceInCents, quantity, priceInCents }) =>
              acc + quantity * (finalPriceInCents ?? priceInCents),
            0
          ),
        }
      ),
    [products]
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const cartTotal = form.getValues("cartTotal");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      <Form {...form}>
        <form
          className="space-y-8"
          action={(formData) => {
            startTransition(() => {
              action(formData);
            });
          }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50 py-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent className="p-0">
              {/**SUMMARY TABLE */}
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-1/2">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.map((product) => (
                    <FormField
                      key={product.id}
                      control={form.control}
                      name={product.id}
                      render={({ field }) => (
                        <TableRow className="hover:bg-gray-50 transition-colors">
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-4">
                              <Link
                                href={`/product/${product.id}`}
                                className="shrink-0"
                              >
                                <Image
                                  width={60}
                                  height={60}
                                  src={product.image}
                                  alt={product.name}
                                  className="rounded-md object-cover"
                                />
                              </Link>
                              <span className="font-medium">
                                {product.name}
                              </span>
                            </div>
                          </TableCell>

                          {/**PRODUCT PRICE */}
                          <TableCell>
                            {formatPrice(
                              product.finalPriceInCents ?? product.priceInCents
                            )}
                          </TableCell>

                          {/**PRODUCT QUANTITY */}
                          <TableCell>
                            <FormItem>
                              <div className="flex items-center space-x-2">
                                <span className="w-6 ml-3">{field.value}</span>

                                {/**QUANTITY BUTTONS  GROUP*/}
                                <div className="flex flex-col w-4 gap-0.5 h-10">
                                  {/**PLUS */}
                                  <Button
                                    onClick={() => {
                                      //don't exceed the amount in stock
                                      if (
                                        field.value !== product.amountInStock
                                      ) {
                                        //update the cart total
                                        form.setValue(
                                          "cartTotal",
                                          form.getValues("cartTotal") +
                                            (product.finalPriceInCents ??
                                              product.priceInCents)
                                        );

                                        ///update the quantity
                                        field.onChange(field.value + 1);
                                      }
                                    }}
                                    variant="secondary"
                                    className="p-0 m-0 rounded-b-none rounded-t-full"
                                  >
                                    <FaPlus size={10} />
                                  </Button>

                                  {/**MINUS */}
                                  <Button
                                    onClick={() => {
                                      //don't go below 1
                                      if (field.value !== 1) {
                                        //update the cart total
                                        form.setValue(
                                          "cartTotal",
                                          form.getValues("cartTotal") -
                                            (product.finalPriceInCents ??
                                              product.priceInCents)
                                        );

                                        //update the quantity
                                        field.onChange(field.value - 1);
                                      }
                                    }}
                                    variant="secondary"
                                    className="p-0 m-0 rounded-t-none rounded-b-full"
                                  >
                                    <FaMinus size={10} />
                                  </Button>
                                </div>
                              </div>
                            </FormItem>
                          </TableCell>

                          {/**SUBTOTAL */}
                          <TableCell className="text-right font-medium">
                            {formatPrice(
                              (product.finalPriceInCents ??
                                product.priceInCents) * field.value
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/**LINKS */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <Button asChild variant="outline" className="w-full md:w-auto">
              <Link href="/search">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full md:w-auto">
              <Link href="/wishlist">View Wishlist</Link>
            </Button>
          </div>

          {/**CART SUMMARY CARD */}
          <Card className="w-full md:w-1/2 md:ml-auto">
            <CardHeader>
              <h2 className="text-xl font-semibold">Cart Total</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

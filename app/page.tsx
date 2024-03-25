"use client";

import ProductCard, { ProductGrade } from "@/components/product-card";
import Image from "next/image";
import Ghost from "@/public/ghost.png";
import { useEffect, useState } from "react";
import { getProducts } from "@/server-actions/sellix";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Globe } from "@/components/globe";
import { GlobeDemo } from "@/components/so-globe";
import { BackgroundBeams } from "@/components/background-beams";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col ">
      <div className="bg-[#121212] relative overflow-hidden">
        <div className="grid grid-cols-2 mt-16 container">
          <div className="flex flex-col space-y-5 justify-center z-20 y-10">
            <span className="text-4xl font-bold text-secondary-foreground">
              ShadowOverlay Store
            </span>
            <p className="text-muted-foreground">
              Welcome to the ShadowOverlay store, where you can find the best
              cheats for the most popular games.
            </p>
          </div>
          <Image src={Ghost} alt="Ghost" width={600} height={580} />
        </div>
        <div className="absolute bottom-0 h-[200px] w-[200%] ml-[-50%] mb-[-150px] rounded-t-[100%] bg-background"></div>
      </div>
      <div className="bg-transparent container flex flex-col space-y-10">
        <div className="flex flex-col gap-2 my-5">
          <span className="text-secondary-foreground text-4xl font-bold">
            Popular Products
          </span>
          <p className="text-muted-foreground">
            Extensive selection of private cheats for the most popular games.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
              description={product.description}
              price={product.price_display}
              title={product.title}
              category={`${product.recurring_interval_count} ${product.recurring_interval}S`}
              image={
                product.image_attachments &&
                product.image_attachments[0].cloudflare_image_id
                  ? `https://imagedelivery.net/95QNzrEeP7RU5l5WdbyrKw/${product.image_attachments[0].cloudflare_image_id}/shopitem`
                  : undefined
              }
              grade={
                (product.title as string).includes("Premium Plus")
                  ? ProductGrade.PREMIUM_PLUS
                  : product.title.includes("Premium")
                  ? ProductGrade.PREMIUM
                  : ProductGrade.ESP_ONLY
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}

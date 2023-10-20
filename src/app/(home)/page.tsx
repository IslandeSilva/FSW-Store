
import Image from "next/image"
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,      
      },
    },
  });
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'keyboards',      
      },
    },
  });
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: 'mouses',      
      },
    },
  });
return (
<div> 
  <Image 
    src="/banner-top-discount.png"
    height={0}
    width={0}
    alt="Até 55% de desconto, somente esse Mês!"
    className=" h-auto w-full p-5"
    sizes="100vw"
  />

<div className="mt-8 p-5">
  <Categories />
</div>

<div className="mt-8">
  <p className="font-bold uppercase pl-5 mb-3">Ofertas</p>
  <ProductList products={deals} />
</div>

<div className="mt-8">
<Image 
    src="/banner-mouses.png"
    height={0}
    width={0}
    alt="Até 55% de desconto em mouses!"
    className=" h-auto w-full p-5"
    sizes="100vw"
  />
  </div>

  <div className="mt-8">
  <p className="font-bold uppercase pl-5 mb-3">Teclados</p>
  <ProductList products={keyboards} />
  </div>

  <div className="mt-8">
<Image 
    src="/banner-fones.png"
    height={0}
    width={0}
    alt="Até 20% de desconto em fones!"
    className=" h-auto w-full p-5"
    sizes="100vw"
  />
  </div>

  <div className="mt-8">
  <p className="font-bold uppercase pl-5 mb-3">Mouses</p>
  <ProductList products={mouses} />
  </div>

<div className="mt-8"></div>


</div>
);
}

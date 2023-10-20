
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
  <ProductList products={deals} />
</div>



</div>


);
}

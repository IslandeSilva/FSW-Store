import ProductItem from "@/app/(home)/components/product-item";
import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import { computeProductTotalPrice } from "../../../../helpers/product";

const CategoryProducts = async ({ params }: any) => {
    const products = await prismaClient. product.findMany({
        where: {
            category: {
                slug: params.slug,
            },
        },
    });


    return (
        <div className="gap-8 p-5">
        <Badge className="gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant="outline">
            <ShapesIcon size={16} />
            {params.slug}
        </Badge>

            <div className="grid grid-cols-2 gap-8 pt-5 pl-[10%]">
                {products.map(product => (
                <ProductItem key={product.id} 
                product={computeProductTotalPrice(product)}
                />
                ))}
            </div>
        </div>
    );
};
 
export default CategoryProducts;
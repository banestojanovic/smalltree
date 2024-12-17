import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';

import AddToCartButton from '@/app/components/application/product/AddToCartButton';
import { Badge } from '@/app/components/ui/badge';

interface Props {
    product: App.Data.ProductData;
}

const ProductCard = ({ product }: Props) => {
    return (
        <Card key={product.id}>
            <CardHeader>
                <div className="">
                    <img
                        className="h-40 w-full object-cover sm:h-60"
                        src={product.cover.original_url}
                        alt={product.name}
                    />
                </div>

                <CardDescription>
                    {product.categories?.map((category) => (
                        <Badge key={category.id} variant="outline">
                            {category.name}
                        </Badge>
                    ))}
                </CardDescription>
                <CardTitle>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        {product.name}
                    </h4>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="h-40 overflow-hidden">{product.description}</p>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-between">
                <span className="font-semibold">${product.price}</span>
                <AddToCartButton product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;

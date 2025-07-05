import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardFooter } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ShoppingCart, Package } from 'lucide-react'

const ProductCard = ({ product, onAddToCart }) => {
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 right-2"
            >
              خصم {product.discount}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">
                {discountedPrice.toFixed(2)} ج.م
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {product.price.toFixed(2)} ج.م
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 ml-2" />
          إضافة للسلة
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard


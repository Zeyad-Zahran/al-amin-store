import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet.jsx'
import { 
  Zap, 
  ShoppingCart, 
  Search, 
  Menu,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

const Header = ({ cartItems, onCartOpen, searchTerm, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 ml-2" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 ml-2" />
                <span>info@alamine-electric.com</span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 ml-2" />
              <span>القاهرة، مصر</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="mr-3">
              <h1 className="text-xl font-bold text-gray-900">Al-Amine Electric</h1>
              <p className="text-xs text-gray-600">متجر الأجهزة الكهربائية</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {/* Cart and Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -left-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>القائمة</SheetTitle>
                  <SheetDescription>
                    تصفح أقسام المتجر
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="ابحث عن المنتجات..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      الرئيسية
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      المنتجات
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      العروض
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      اتصل بنا
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet.jsx'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Package,
  MapPin,
  User,
  Phone,
  MessageSquare
} from 'lucide-react'

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [location, setLocation] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })

  const total = cartItems.reduce((sum, item) => {
    const discountedPrice = item.discount > 0 
      ? item.price * (1 - item.discount / 100)
      : item.price
    return sum + (discountedPrice * item.quantity)
  }, 0)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude}, ${longitude}`)
        },
        (error) => {
          setError('لا يمكن الحصول على الموقع الحالي')
        }
      )
    } else {
      setError('المتصفح لا يدعم خدمة تحديد الموقع')
    }
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Prepare order data
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        location: location,
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          discount: item.discount,
          quantity: item.quantity,
          total: (item.discount > 0 
            ? item.price * (1 - item.discount / 100)
            : item.price) * item.quantity
        })),
        total: total,
        orderDate: new Date().toLocaleString('ar-EG')
      }

      // Create order summary for Formspree
      const orderSummary = `
طلب جديد من متجر Al-Amine Electric

بيانات العميل:
الاسم: ${orderData.name}
رقم الهاتف: ${orderData.phone}
العنوان: ${orderData.address}
الموقع: ${orderData.location || 'غير محدد'}
ملاحظات: ${orderData.notes || 'لا توجد'}

تفاصيل الطلب:
${orderData.items.map(item => 
  `- ${item.name} × ${item.quantity} = ${item.total.toFixed(2)} ج.م`
).join('\n')}

إجمالي المبلغ: ${orderData.total.toFixed(2)} ج.م
تاريخ الطلب: ${orderData.orderDate}
      `

      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mgvewbgd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: orderData.name,
          phone: orderData.phone,
          address: orderData.address,
          location: orderData.location,
          message: orderSummary
        }),
      })

      if (response.ok) {
        setSuccess('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.')
        onClearCart()
        setFormData({ name: '', phone: '', address: '', notes: '' })
        setLocation('')
        setTimeout(() => {
          setIsCheckoutOpen(false)
          onClose()
        }, 2000)
      } else {
        setError('خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.')
      }
    } catch (err) {
      setError('خطأ في الاتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 ml-2" />
              سلة التسوق
            </SheetTitle>
            <SheetDescription>
              {cartItems.length > 0 
                ? `${cartItems.length} منتج في السلة`
                : 'السلة فارغة'
              }
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">السلة فارغة</p>
                <p className="text-sm text-gray-400">أضف بعض المنتجات للبدء</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const discountedPrice = item.discount > 0 
                    ? item.price * (1 - item.discount / 100)
                    : item.price

                  return (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-blue-600 font-semibold">
                          {discountedPrice.toFixed(2)} ج.م
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">الإجمالي:</span>
                <span className="text-xl font-bold text-blue-600">
                  {total.toFixed(2)} ج.م
                </span>
              </div>
              
              <div className="space-y-2">
                <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      إتمام الطلب
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>إتمام الطلب</DialogTitle>
                      <DialogDescription>
                        أدخل بياناتك لإتمام عملية الطلب
                      </DialogDescription>
                    </DialogHeader>
                    
                    {success && (
                      <Alert>
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmitOrder} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="أدخل اسمك الكامل"
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="01xxxxxxxxx"
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">العنوان</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="أدخل عنوانك بالتفصيل"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>الموقع الحالي</Label>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={getLocation}
                            className="flex-1"
                          >
                            <MapPin className="h-4 w-4 ml-2" />
                            تحديد الموقع
                          </Button>
                        </div>
                        {location && (
                          <p className="text-sm text-green-600">
                            تم تحديد الموقع: {location}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                        <div className="relative">
                          <MessageSquare className="absolute right-3 top-3 text-gray-400 h-4 w-4" />
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            placeholder="أي ملاحظات خاصة بالطلب"
                            className="pr-10"
                            rows={2}
                          />
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">إجمالي الطلب:</span>
                          <span className="text-lg font-bold text-blue-600">
                            {total.toFixed(2)} ج.م
                          </span>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'جاري إرسال الطلب...' : 'تأكيد الطلب'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="w-full" onClick={onClearCart}>
                  إفراغ السلة
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Cart


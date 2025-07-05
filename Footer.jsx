import { Zap, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="mr-3">
                <h3 className="text-xl font-bold">Al-Amine Electric</h3>
                <p className="text-gray-400 text-sm">متجر الأجهزة الكهربائية</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              نحن متخصصون في توفير أفضل الأجهزة الكهربائية والإلكترونية بأسعار تنافسية وجودة عالية. 
              نسعى لتقديم أفضل خدمة لعملائنا الكرام.
            </p>
            <div className="flex space-x-4">
              <div className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                <Facebook className="h-4 w-4" />
              </div>
              <div className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </div>
              <div className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  المنتجات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  العروض الخاصة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 ml-3 text-blue-400" />
                <span className="text-gray-300">+20 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 ml-3 text-blue-400" />
                <span className="text-gray-300">info@alamine-electric.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 ml-3 text-blue-400" />
                <span className="text-gray-300">القاهرة، مصر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Al-Amine Electric. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


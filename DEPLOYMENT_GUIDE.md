# دليل النشر على Vercel

## خطوات النشر

### 1. إعداد المستودع على GitHub

1. أنشئ مستودع جديد على GitHub
2. ارفع المشروع إلى المستودع:

```bash
git init
git add .
git commit -m "Initial commit: Al-Amine Electric Store"
git branch -M main
git remote add origin https://github.com/username/al-amine-electric-store.git
git push -u origin main
```

### 2. النشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط على "New Project"
4. اختر المستودع من GitHub
5. اتبع الخطوات التالية:

#### إعدادات المشروع:
- **Framework Preset**: Other
- **Root Directory**: `./` (الجذر)
- **Build Command**: `cd frontend/store && npm run build`
- **Output Directory**: `frontend/store/dist`

#### متغيرات البيئة:
لا توجد متغيرات بيئة مطلوبة حالياً.

### 3. التحقق من النشر

بعد النشر الناجح:
1. ستحصل على رابط المشروع (مثل: `https://your-project.vercel.app`)
2. تأكد من عمل جميع الوظائف:
   - عرض المنتجات
   - البحث والتصفية
   - سلة التسوق
   - إرسال الطلبات عبر Formspree
   - لوحة تحكم الإدارة

## ملاحظات مهمة

### بوابات الدفع
حالياً المشروع لا يتضمن بوابات دفع مدمجة. يمكن إضافة بوابات الدفع التالية:

#### للسوق المصري:
- **Paymob**: بوابة دفع مصرية تدعم الفيزا والماستركارد والمحافظ الإلكترونية
- **Fawry**: خدمة دفع مصرية شائعة
- **PayPal**: للمدفوعات الدولية

#### للأسواق العربية:
- **PayTabs**: بوابة دفع عربية
- **Telr**: بوابة دفع إماراتية
- **HyperPay**: بوابة دفع سعودية

### إضافة بوابة دفع (مثال Paymob):

1. سجل في [Paymob](https://paymob.com)
2. احصل على API Keys
3. أضف المتغيرات في Vercel:
   ```
   PAYMOB_API_KEY=your_api_key
   PAYMOB_INTEGRATION_ID=your_integration_id
   ```
4. أضف مكون الدفع في الواجهة الأمامية

### تحديث Formspree

تأكد من أن رابط Formspree يعمل:
- الرابط الحالي: `https://formspree.io/f/mgvewbgd`
- يمكنك إنشاء حساب جديد على [Formspree](https://formspree.io) وتحديث الرابط

## استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في تحميل المنتجات**:
   - تأكد من أن API يعمل بشكل صحيح
   - تحقق من إعدادات CORS

2. **مشاكل في النشر**:
   - تأكد من صحة ملف `vercel.json`
   - تحقق من مسارات الملفات

3. **مشاكل في قاعدة البيانات**:
   - في الإنتاج، قد تحتاج لاستخدام قاعدة بيانات خارجية مثل PostgreSQL

## التطوير المستقبلي

### ميزات يمكن إضافتها:
- نظام المراجعات والتقييمات
- نظام الكوبونات والخصومات
- تتبع الطلبات
- نظام الإشعارات
- تحليلات المبيعات
- دعم متعدد اللغات
- تطبيق موبايل

### تحسينات الأداء:
- تحسين الصور (Image Optimization)
- التخزين المؤقت (Caching)
- تحسين محركات البحث (SEO)
- Progressive Web App (PWA)

## الدعم

للحصول على المساعدة:
1. راجع وثائق [Vercel](https://vercel.com/docs)
2. راجع وثائق [React](https://reactjs.org/docs)
3. راجع وثائق [Flask](https://flask.palletsprojects.com/)


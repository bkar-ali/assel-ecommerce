"use client";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

type SlidersType = {
  id: number;
  image: string;
  text: string;
  link: string;
};

const slides: SlidersType[] = [
  {
    id: 1,
    image: "/images/casual.jpg",
    text: "Sneakers",
    link: "categores/sneakers",
  },
  {
    id: 2,
    image: "/images/accWomen.jpg",
    text: "jewelry",
    link: "categores/jewelry",
  },
  { id: 3, image: "/images/men.jpg", text: "T-shirts", link: "categores/men" },
  {
    id: 4,
    image: "/images/accMen.jpg",
    text: "Men Watches",
    link: "/categores/watches",
  },
  {
    id: 5,
    image: "/images/women.jpg",
    text: "Dresses",
    link: "/categores/women",
  },
  {
    id: 6,
    image: "/images/womenwatches.jpg",
    text: "Women Watches",
    link: "/categores/womenwatches",
  },
  {
    id: 7,
    image: "/images/heels.jpg",
    text: "Heels",
    link: "/categores/heels",
  },
];

// Variants
const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.6, // <- داالديلاي العام قبل بداية ظهور الحروف
      staggerChildren: 0.08,
    },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-[80vh] relative rounded-xl overflow-hidden pt-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        speed={1000}
        // pagination={{
        //   type: "progressbar",
        // }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative rounded-xl overflow-hidden"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <Link
                href={slide.link}
                className="absolute inset-0 bg-black/40"
              ></Link>

              {/* النص */}
              <motion.h2
                // نجعل key يعتمد على السلايد والـ activeIndex عشان يعيد المونت ويشغّل الأنيميشن
                key={`${slide.id}-${activeIndex}`}
                className="relative z-10 text-white/80 text-3xl md:text-6xl font-bold text-center max-w-3xl leading-tight " //[writing-mode:vertical-rl] [text-orientation:upright] عمودي
                initial="hidden"
                animate="visible"
                variants={letterContainer} // الأب هو المسؤول عن delay + stagger
              >
                <SplitText text={slide.text} />
              </motion.h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// SplitText مصحح: الغلاف الخارجي span عادي، والأحرف كل واحدة motion.span بمتغيراتها letter
function SplitText({ text }: { text: string }) {
  // props
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <span style={{ display: "inline-block" }}>
      {letters.map((char, i) => {
        //! If We Find Space In The char
        if (char === " ") {
          return (
            <span
              key={`space-${i}`}
              style={{ display: "inline-block", width: "1rem" }}
            >
              {" "}
            </span>
          );
        }
        return (
          <motion.span
            key={i}
            variants={letter}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}

export default Slider;

// "use client";
// // ✅ بيقول لـ Next.js إن الكومبوننت دي "Client Component"
// // يعني تشتغل في المتصفح (مش على السيرفر) — عشان فيها useState, useMemo, و animation

// import { useMemo, useState } from "react";
// // ✅ useState: لتخزين حالة (زي رقم السلايد الحالي)
// // ✅ useMemo: لتحسين الأداء، بحيث ميحسبش نفس القيمة أكتر من مرة بدون داعي

// import { Swiper, SwiperSlide } from "swiper/react";
// // ✅ استيراد مكونات Swiper الجاهزة لعمل سلايدر (المكتبة الشهيرة للعروض المتحركة)

// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// // ✅ استيراد الموديولات اللي بتضيف وظائف للسلايدر:
// // Autoplay = تشغيل تلقائي
// // Pagination = النقاط أسفل السلايدر
// // Navigation = الأسهم يمين ويسار

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// // ✅ استيراد ملفات الـ CSS الجاهزة من Swiper لتنسيق السلايدر والنقاط والأسهم

// import { motion, Variants } from "framer-motion";
// // ✅ استيراد أدوات الأنيميشن من مكتبة Framer Motion
// // motion = لتطبيق أنيميشن على العناصر
// // Variants = لتحديد حالات الأنيميشن (hidden, visible, إلخ)

// // ---------------------------
// // 📸 بيانات السلايدر
// // ---------------------------
// const slides = [
//   { id: 1, image: "/images/casual.jpg", text: "Casual" },
//   { id: 2, image: "/images/accWomen.jpg", text: "Accessories" },
//   { id: 3, image: "/images/accMen.jpg", text: "Accessories" },
//   { id: 4, image: "/images/men.jpg", text: "Men's" },
//   { id: 5, image: "/images/sport.jpg", text: "Sport" },
//   { id: 6, image: "/images/women.jpg", text: "Women" },
// ];
// // ✅ كل سلايد فيها id + صورة + نص بيتعرض على الصورة

// // ---------------------------
// // ⚙️ إعدادات الأنيميشن
// // ---------------------------

// // ✨ أنيميشن الحروف (الأب)
// const letterContainer: Variants = {
//   hidden: {}, // الحالة قبل الظهور
//   visible: {
//     transition: {
//       delayChildren: 0.4, // تأخير بسيط قبل بدء ظهور أول حرف
//       staggerChildren: 0.08, // كل حرف يظهر بعد اللي قبله بـ 0.08 ثانية
//     },
//   },
// };

// // ✨ أنيميشن الحرف الواحد
// const letter: Variants = {
//   hidden: { opacity: 0, y: 20 }, // الحرف شفاف وتحت شوية
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6, // زمن الحركة
//       ease: "easeOut", // منحنى الحركة (خروج ناعم)
//     },
//   },
// };

// // ---------------------------
// // 🧩 الكومبوننت الرئيسية للسلايدر
// // ---------------------------
// const Slider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   // ✅ activeIndex بيخزن رقم السلايد الحالي
//   // عشان نقدر نعيد تشغيل الأنيميشن كل مرة تتغير فيها السلايد

//   return (
//     <div className="w-full h-[80vh] relative rounded-xl overflow-hidden mt-4">
//       {/* ✅ مكون السلايدر الرئيسي */}
//       <Swiper
//         modules={[Autoplay, Pagination, Navigation]} // تشغيل الموديولات
//         spaceBetween={30} // مسافة بين السلايدات
//         slidesPerView={1} // عرض سلايد واحدة فقط في كل مرة
//         loop={true} // لما يخلص يرجع لأول سلايد
//         autoplay={{ delay: 5000, disableOnInteraction: false }} // كل 5 ثواني يبدّل تلقائيًا
//         speed={1000} // سرعة الإنتقال (1 ثانية)
//         pagination={{ clickable: true }} // النقاط قابلة للضغط
//         navigation // تشغيل الأسهم
//         className="h-full"
//         onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//         // ✅ كل مرة السلايد تتغير، نحفظ الرقم الحالي في activeIndex
//       >
//         {/* ✅ إنشاء السلايدات من المصفوفة */}
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             {/* خلفية الصورة */}
//             <div
//               className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
//               style={{ backgroundImage: `url(${slide.image})` }}
//             >
//               {/* ✅ overlay شفاف فوق الصورة عشان يغمقها شوي */}
//               <div className="absolute inset-0 bg-black/40"></div>

//               {/* ✅ النص المتحرك */}
//               <motion.h2
//                 // تغيير الـ key يخلي العنصر يُعاد تحميله (remount)
//                 // وبالتالي الأنيميشن يعيد تشغيل نفسه كل مرة
//                 key={`${slide.id}-${activeIndex}`}
//                 className="relative z-10 text-white text-3xl md:text-6xl font-bold text-center max-w-3xl leading-tight cursor-pointer"
//                 initial="hidden" // بداية الأنيميشن
//                 animate="visible" // الحالة بعد التشغيل
//                 variants={letterContainer} // أنيميشن الأب (يتحكم في الحروف)
//               >
//                 <SplitText text={slide.text} />
//               </motion.h2>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// // ---------------------------
// // 🧩 دالة لتقسيم النص إلى حروف وتحريك كل حرف لوحده
// // ---------------------------
// function SplitText({ text }: { text: string }) {
//   const letters = useMemo(() => text.split(""), [text]);
//   // ✅ نستخدم useMemo عشان نقسم النص مرة واحدة فقط
//   // (مش كل ما الكومبوننت تعمل render)

//   return (
//     <span style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
//       {/* ✅ نلف على كل حرف */}
//       {letters.map((char, i) => {
//         if (char === " ") {
//           // ✅ لو الحرف مسافة، نضيف span فاضي عشان يحافظ على شكل الكلمة
//           return (
//             <span
//               key={`space-${i}`}
//               style={{ display: "inline-block", width: "0.5rem" }}
//             >
//               {" "}
//             </span>
//           );
//         }
//         // ✅ لو الحرف عادي، نعمله motion.span بأنيميشن الحروف
//         return (
//           <motion.span
//             key={i}
//             variants={letter}
//             style={{ display: "inline-block" }}
//           >
//             {char}
//           </motion.span>
//         );
//       })}
//     </span>
//   );
// }

// export default Slider;
// // ✅ تصدير الكومبوننت عشان نقدر نستخدمها في أي مكان تاني بالمشروع

//!

// السؤال ده احترافي جدًا وبيوضح إنك بقيت تفكر بعقلية Frontend Developer فعلاً 🔥

// خليني أشرحلك خطوة بخطوة الفكرة، وبعدها أديك الحل العملي.

// 🎯 أولًا: الفكرة اللي بتحصل

// لما تخلي الـ Swiper يعرض سلايدين في نفس الوقت (مثلاً slidesPerView={2})،
// ويكون عندك أنيميشن بيبدأ عند تغيير السلايد (زي النص اللي بيطلع بالحروف)،
// اللي بيحصل هو:

// السلايد اللي كانت ظاهرة بالفعل (قبل ما السهم يتحرك)
// بتتأثر بتغيير الـ activeIndex، فـ الأنيميشن بيشتغل فيها من جديد بدون داعي.

// السلايد الجديدة اللي دخلت المفروض فقط هي اللي تعمل الأنيميشن.

// 💡 الهدف

// نخلي الأنيميشن يشتغل بس في السلايد الجديدة اللي دخلت
// وميتكررش في السلايد اللي كانت ظاهرة.

// 🧠 الفكرة البرمجية

// هنحتاج:

// نحدد السلايد الحالية اللي ظاهرة فعلاً باستخدام swiper.activeIndex.

// نحسب إيه السلايدات اللي ظهرت جديدة لما يتغير السلايدر.

// نخلي الأنيميشن يشتغل بس فيهم.

// وده هنعمله باستخدام state نحفظ فيها إيه السلايدات اللي ظاهرة دلوقتي،
// ولما السلايد تتغير، نقارنها بالسابقين.

// ✅ الحل العملي خطوة بخطوة

// أولًا غيّر إعداد السلايدر:

// <Swiper
//   modules={[Autoplay, Pagination, Navigation]}
//   spaceBetween={30}
//   slidesPerView={2} // ✅ خليها 2 بدل 1
//   loop={true}
//   autoplay={{ delay: 5000, disableOnInteraction: false }}
//   speed={1000}
//   pagination={{ clickable: true }}
//   onSwiper={(swiper) => (swiperRef.current = swiper)}
//   onSlideChange={(swiper) => handleSlideChange(swiper)}
//   className="h-full"
// >

// ثانياً: أضف state لتتبع السلايدات الظاهرة
// const [visibleSlides, setVisibleSlides] = useState<number[]>([]);

// ثالثًا: دالة تحديث السلايدات الظاهرة
// const handleSlideChange = (swiper: any) => {
//   const active = swiper.activeIndex; // أول سلايد ظاهرة
//   const visible = [
//     active % slides.length,
//     (active + 1) % slides.length // لأننا بنعرض 2 في نفس الوقت
//   ];
//   setVisibleSlides(visible);
// };

// رابعًا: خلي كل Slide تعرف إذا كانت ظاهرة حاليًا أو لأ
// {slides.map((slide, index) => {
//   const isVisible = visibleSlides.includes(index);

//   return (
//     <SwiperSlide key={slide.id}>
//       <div
//         className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
//         style={{ backgroundImage: `url(${slide.image})` }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* ✅ هنا نتحكم في تشغيل الأنيميشن */}
//         <motion.h2
//           key={isVisible ? `visible-${index}` : `hidden-${index}`}
//           className="relative z-10 text-white text-3xl md:text-6xl font-bold text-center max-w-3xl leading-tight cursor-pointer"
//           initial={isVisible ? "hidden" : false}
//           animate={isVisible ? "visible" : false}
//           variants={letterContainer}
//         >
//           <SplitText text={slide.text} />
//         </motion.h2>
//       </div>
//     </SwiperSlide>
//   );
// })}

// ⚙️ النتيجة:

// الأنيميشن هيشتغل فقط في السلايد اللي دخلت جديدة.

// السلايد اللي لسه كانت ظاهرة مش هيعيد الأنيميشن.

// وكل ده هيشتغل حتى لو عندك slidesPerView=2 أو أكتر.

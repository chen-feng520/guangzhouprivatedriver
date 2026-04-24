"use client";

import React, { useState, useEffect } from 'react';

// --- 全站多语言翻译数据字典 (包含动态 FAQ 数据) ---
const translations = {
  en: {
    // Nav & Hero
    nav_home: "Home", nav_airport: "Airport Transfer", nav_canton: "Canton Fair", nav_factory: "Factory Visits", nav_quote: "Get Quote",
    hero_badge: "5.0 Rated by 200+ International Clients",
    hero_title: "Your Premium <span class='text-blue-400'>English-Speaking</span> Guangzhou Private Driver.",
    hero_desc: "Hassle-free Airport Pickups, Canton Fair Transport & Guided Factory Visits. Bypass the taxi queues, overcome language hurdles, and hit the road with a dependable local professional.",
    btn_book: "Book Your Ride Now", btn_meet: "Meet Your Driver",
    
    // Stats
    stat_1_val: "10+", stat_1_lbl: "Years Driving Exp.",
    stat_2_val: "Fluent", stat_2_lbl: "English & Mandarin",
    stat_3_val: "100%", stat_3_lbl: "On-Time Record",
    stat_4_val: "Premium", stat_4_lbl: "Spacious Vehicles",
    
    // Video Section
    vid_h2: "Welcome! I'm more than just a driver—I'm your local business ally.",
    vid_p1_1: "Traveling through China can be daunting if you don't speak Mandarin or use local payment tools like (",
    vid_p1_2: "). Recognizing this challenge, I established my Guangzhou Private Driver service to bridge the gap for international professionals.",
    vid_p2: "My role extends far beyond transportation. I serve as your on-the-ground assistant—facilitating factory translations, handling hotel check-ins, recommending authentic dining, and protecting you from common tourist pitfalls. I am dedicated to maximizing your productivity while ensuring your stay is thoroughly enjoyable.",
    vid_li1: "Deal directly with your driver (Zero agency commissions)",
    vid_li2: "Upfront, flat-rate pricing (No surprise fees)",
    vid_li3: "Complimentary high-speed Wi-Fi & premium bottled water",
    
    // Services Summary
    srv_h2: "Specialized Solutions for Global Executives",
    srv_p: "Custom-crafted transportation services built for international buyers and business travelers navigating Guangdong.",
    srv_learn: "Learn More",
    srv_1_h3: "Guangzhou Airport (CAN) Pickups",
    srv_1_p1: "Enjoy a seamless meet-and-greet arrival at ",
    srv_1_p2: ". With real-time flight tracking, your driver will be waiting—even if you're delayed.",
    srv_2_h3: "Factory Tours & Bilingual Support",
    srv_2_p1: "Effortlessly reach remote manufacturing hubs across ",
    srv_2_p2: ", and ",
    srv_2_p3: ". Bonus: Professional English-Chinese interpreting on the factory floor.",
    srv_3_h3: "Canton Fair Transportation",
    srv_3_p1: "Skip the endless taxi lines. Secure your exclusive daily transfer to the ",
    srv_3_p2: " and start your exhibition day energized and focused.",
    
    // Testimonials
    testi_title: "What My Clients Say",
    t1_q: "\"Finding a reliable Guangzhou Private Driver was crucial for our team. His knowledge of the wholesale markets saved us days of wasted time. Highly recommend!\"",
    t1_role: "CEO, UK",
    t2_q: "\"As a frequent buyer in China, having a professional Guangzhou Private Driver who speaks fluent English changes everything. Safe, punctual, and helpful with translations.\"",
    t2_role: "Buyer, UAE",
    t3_q: "\"Exceptional service from airport pickup to our final Canton Fair day. If you need a trustworthy Guangzhou Private Driver, look no further. The car was spotless.\"",
    t3_role: "Designer, Canada",
    t4_q: "\"We visited five factories across Shenzhen and Foshan in two days. Our Guangzhou Private Driver made the impossible schedule feel effortless and secure.\"",
    t4_role: "Logistics Director, Italy",
    t5_q: "\"Beyond just driving, he acted as our local fixer. A top-tier Guangzhou Private Driver who knows the best restaurants and helps navigate local customs.\"",
    t5_role: "Entrepreneurs, Australia",
    t6_q: "\"Our flight was delayed by 3 hours, arriving at 3 AM. Our Guangzhou Private Driver was still there waiting with a smile. True dedication and professionalism.\"",
    t6_role: "Sourcing Agent, USA",
    
    // Airport Section
    apt_h1: "Guangzhou Baiyun Airport (CAN) Transfers",
    apt_sub: "Kick off your China business trip without a hitch. Experience a VIP meet-and-greet with your dedicated, English-speaking Guangzhou Private Driver.",
    apt_h2: "Why book a private airport transfer?",
    apt_l1_t: "Zero Language Barriers & Scam-Free",
    apt_l1_d1: "Trying to direct a local taxi in Mandarin can be a nightmare. ",
    apt_l1_d2: "Avoid the hassle.",
    apt_l1_d3: " Your driver already has your destination mapped out before your plane touches down.",
    apt_l2_t: "Live Flight Monitoring & Grace Period",
    apt_l2_d: "Stuck at customs or facing a flight delay? Rest easy. I actively monitor your flight status and offer a complimentary 90-minute wait time post-landing.",
    apt_l3_t: "Personalized Arrival Hall Welcome",
    apt_l3_d: "Spot your name on a greeting board the moment you exit baggage claim. I will assist with your heavy luggage and escort you directly to your premium vehicle.",
    
    // Canton Fair Section
    can_h1: "Exclusive Canton Fair Car Services",
    can_sub: "Optimize your schedule at the Pazhou Complex. We provide dependable daily shuttles and bilingual assistance for global buyers.",
    can_h2: "Master the Canton Fair Rush",
    can_p1: "When over 200,000 attendees swarm the ",
    can_p2: "Canton Fair",
    can_p3: ", securing a taxi or ",
    can_p4: " becomes nearly impossible, and subways are overwhelmingly crowded. Preserve your energy for closing deals.",
    can_l1_t: "Seamless Hotel-to-Gate Shuttles",
    can_l1_d1: "Enjoy prompt morning pickups from your hotel lobby and direct drop-offs at the most accessible entrances of the ",
    can_l2_t: "Unrestricted Evening Availability",
    can_l2_d: "Hosting a supplier dinner post-exhibition? Keep the car on standby. A standard taxi won't wait for you, but your dedicated Guangzhou Private Driver is at your service all day.",
    
    // Factory Section
    fac_h1: "Sourcing Trips & Factory Expeditions",
    fac_sub: "Move swiftly through the Greater Bay Area's core manufacturing centers: ",
    fac_sub2: ", and surrounding industrial zones.",
    fac_h2: "Your On-the-Go Office & Local Fixer",
    fac_p: "Top suppliers are often hidden deep within complex industrial parks, far from downtown. You need a local expert who knows the quickest routes—which is exactly what I deliver as your Guangzhou Private Driver.",
    fac_b1_t: "🚗 Optimized Multi-Stop Routing",
    fac_b1_d: "Need to inspect three different factories in a single day? I'll engineer the smartest itinerary to minimize transit time and maximize your productivity.",
    fac_b2_t: "🗣️ Professional On-Site Interpreting",
    fac_b2_d: "My service doesn't stop at the parking lot. I accompany you to the production lines to translate technical specs and ensure clear communication with your suppliers.",
    
    // Form & Footer
    form_title: "Get a Quick, Free Quote",
    form_subtitle: "Fill out the details below, and I will reply within 12 hours. Or message me instantly on WhatsApp.",
    lbl_name: "Your Name *", lbl_email: "Email Address *", lbl_whatsapp: "WhatsApp Number (Highly recommended)",
    lbl_service: "Service Required", lbl_details: "Trip Dates & Details *", btn_send: "Send Request",
    opt_airport: "Airport Transfer (CAN)", opt_canton: "Canton Fair Daily Transfer", opt_factory: "Factory Visits / Multi-City Tour", opt_city: "City Sightseeing Tour", opt_other: "Other / Custom Itinerary",
    ft_desc: "Your reliable English-speaking Guangzhou Private Driver and business guide.",
    ft_links: "Quick Links", ft_contact: "Contact Directly", ft_copy: "© 2026 Guangzhou Private Driver. All rights reserved.",
    whatsapp_float: "WhatsApp Me",

    // FAQ Section
    faq_title: "Frequently Asked Questions",
    faqs: [
      { q: "Is it better to use a private driver or a taxi in Guangzhou?", a: "A private driver offers a more reliable and comfortable experience compared to taxis. With fixed pricing, professional service, and no language barriers, it is especially suitable for business travelers with tight schedules." },
      { q: "How does your service compare to ride-hailing apps like Didi?", a: "Unlike ride-hailing apps, our service guarantees an English-speaking driver, consistent vehicle quality, and pre-arranged schedules. There is no uncertainty with driver availability, communication, or last-minute cancellations." },
      { q: "Are taxis or ride-hailing apps reliable for business trips in Guangzhou?", a: "While taxis and ride-hailing apps are suitable for short trips, they may not be reliable for business use. Issues such as language barriers, unclear pricing, and inconsistent service can affect your schedule and overall experience." },
      { q: "What are the risks of using unlicensed or informal drivers?", a: "Unlicensed drivers may offer lower prices but often lack proper insurance, service standards, and accountability. This can lead to safety concerns, unclear pricing, and unreliable service during important business trips." },
      { q: "Why do international business travelers prefer private driver services?", a: "Private driver services provide professionalism, punctuality, and clear communication. For airport transfers, factory visits, and exhibitions, this ensures a smooth and stress-free experience." },
      { q: "Is a private driver more expensive than taxis or Didi?", a: "While the upfront cost may be higher, a private driver provides greater value through time savings, reliability, and service quality. For business travelers, this often results in a better overall return on investment." },
      { q: "Can I rely on taxis for Canton Fair or exhibition transportation?", a: "During major events like the Canton Fair, taxis can be difficult to find and waiting times can be unpredictable. A pre-booked private driver ensures punctual pick-up and a smooth daily schedule." },
      { q: "What makes your Guangzhou private driver service different?", a: "We focus on serving international clients with English-speaking drivers, fixed pricing, high-end vehicles, and customized itineraries. Our service is designed specifically for business efficiency and comfort." },
      { q: "How do I book your private driver service?", a: "You can book easily through our website, WhatsApp, or email. Simply send us your schedule, and we will confirm your booking quickly." },
      { q: "Do I need to pay a deposit to confirm the booking?", a: "Yes, we require a 30% deposit of the total quoted price to confirm your booking. The deposit can be paid online via PayPal or Wise, with the remaining balance paid before or at the start of the service." }
    ]
  },
  es: {
    // Nav & Hero
    nav_home: "Inicio", nav_airport: "Traslado Aeropuerto", nav_canton: "Feria de Cantón", nav_factory: "Visitas a Fábricas", nav_quote: "Cotización",
    hero_badge: "Calificación 5.0 por más de 200 clientes internacionales",
    hero_title: "Su <span class='text-blue-400'>Conductor Privado Premium</span> en Guangzhou.",
    hero_desc: "Recogidas en el aeropuerto sin complicaciones, transporte a la Feria de Cantón y visitas guiadas a fábricas. Evite las colas de taxis, supere las barreras del idioma y viaje con un profesional local confiable.",
    btn_book: "Reserve su viaje ahora", btn_meet: "Conozca a su conductor",
    
    // Stats
    stat_1_val: "10+", stat_1_lbl: "Años de Exp.",
    stat_2_val: "Fluido", stat_2_lbl: "Inglés y Mandarín",
    stat_3_val: "100%", stat_3_lbl: "Puntualidad",
    stat_4_val: "Premium", stat_4_lbl: "Vehículos Amplios",
    
    // Video Section
    vid_h2: "¡Bienvenido! Soy más que un conductor: soy su socio comercial local.",
    vid_p1_1: "Viajar por China puede ser abrumador si no hablas mandarín o no usas herramientas de pago locales como (",
    vid_p1_2: "). Reconociendo este desafío, establecí mi servicio de Conductor Privado en Guangzhou para cerrar la brecha para los profesionales internacionales.",
    vid_p2: "Mi papel va mucho más allá del transporte. Sirvo como su asistente en el terreno: facilitando traducciones en fábricas, gestionando el check-in en hoteles, recomendando comida auténtica y protegiéndolo de las trampas turísticas comunes. Estoy dedicado a maximizar su productividad mientras aseguro que su estadía sea totalmente agradable.",
    vid_li1: "Trato directo con su conductor (Cero comisiones de agencia)",
    vid_li2: "Precios fijos y transparentes (Sin cargos sorpresa)",
    vid_li3: "Wi-Fi de alta velocidad gratis y agua embotellada premium",
    
    // Services Summary
    srv_h2: "Soluciones Especializadas para Ejecutivos Globales",
    srv_p: "Servicios de transporte diseñados a medida para compradores internacionales y viajeros de negocios que navegan por Guangdong.",
    srv_learn: "Saber Más",
    srv_1_h3: "Recogidas en el Aeropuerto de Guangzhou (CAN)",
    srv_1_p1: "Disfrute de una llegada sin problemas en el ",
    srv_1_p2: ". Con seguimiento de vuelos en tiempo real, su conductor lo estará esperando, incluso si se retrasa.",
    srv_2_h3: "Visitas a Fábricas y Soporte Bilingüe",
    srv_2_p1: "Llegue sin esfuerzo a centros de fabricación remotos en ",
    srv_2_p2: ", y ",
    srv_2_p3: ". Bono: Interpretación profesional inglés-chino en la fábrica.",
    srv_3_h3: "Transporte a la Feria de Cantón",
    srv_3_p1: "Evite las interminables colas de taxis. Asegure su traslado diario exclusivo al ",
    srv_3_p2: " y comience su día de exhibición con energía y concentración.",
    
    // Testimonials
    testi_title: "Lo Que Dicen Mis Clientes",
    t1_q: "\"Encontrar un Conductor Privado en Guangzhou confiable fue crucial para nuestro equipo. Su conocimiento de los mercados mayoristas nos ahorró días de pérdida de tiempo. ¡Muy recomendable!\"",
    t1_role: "CEO, Reino Unido",
    t2_q: "\"Como comprador frecuente en China, tener un Conductor Privado en Guangzhou que hable inglés fluido lo cambia todo. Seguro, puntual y útil con las traducciones.\"",
    t2_role: "Comprador, EAU",
    t3_q: "\"Servicio excepcional desde la recogida en el aeropuerto hasta nuestro último día en la Feria de Cantón. El coche estaba impecable.\"",
    t3_role: "Diseñadora, Canadá",
    t4_q: "\"Visitamos cinco fábricas en Shenzhen y Foshan en dos días. Nuestro Conductor Privado hizo que la agenda imposible pareciera fácil y segura.\"",
    t4_role: "Director de Logística, Italia",
    t5_q: "\"Más allá de solo conducir, actuó como nuestro solucionador local. Un Conductor Privado de primer nivel que conoce los mejores restaurantes.\"",
    t5_role: "Emprendedores, Australia",
    t6_q: "\"Nuestro vuelo se retrasó 3 horas, llegando a las 3 AM. Nuestro Conductor Privado seguía allí esperando con una sonrisa. Verdadera profesionalidad.\"",
    t6_role: "Agente de Compras, EE. UU.",
    
    // Airport Section
    apt_h1: "Traslados al Aeropuerto de Guangzhou Baiyun (CAN)",
    apt_sub: "Inicie su viaje de negocios en China sin contratiempos. Experimente una recepción VIP con su dedicado Conductor Privado en Guangzhou que habla inglés.",
    apt_h2: "¿Por qué reservar un traslado privado al aeropuerto?",
    apt_l1_t: "Cero Barreras de Idioma y Sin Estafas",
    apt_l1_d1: "Intentar dirigir a un taxi local en mandarín puede ser una pesadilla. ",
    apt_l1_d2: "Evite las molestias.",
    apt_l1_d3: " Su conductor ya tiene su destino trazado antes de que su avión aterrice.",
    apt_l2_t: "Monitoreo de Vuelos y Tiempo de Gracia",
    apt_l2_d: "¿Atrapado en la aduana o enfrentando un retraso? Descanse tranquilo. Monitoreo activamente el estado de su vuelo y ofrezco un tiempo de espera gratuito de 90 minutos.",
    apt_l3_t: "Bienvenida Personalizada en Llegadas",
    apt_l3_d: "Vea su nombre en un cartel en el momento en que sale de la recogida de equipaje. Le asistiré con su equipaje pesado y lo acompañaré directamente a su vehículo premium.",
    
    // Canton Fair Section
    can_h1: "Servicios Exclusivos para la Feria de Cantón",
    can_sub: "Optimice su agenda en el Complejo Pazhou. Brindamos traslados diarios confiables y asistencia bilingüe para compradores globales.",
    can_h2: "Domine el Ajetreo de la Feria de Cantón",
    can_p1: "Cuando más de 200,000 asistentes inundan la ",
    can_p2: "Feria de Cantón",
    can_p3: ", conseguir un taxi o ",
    can_p4: " se vuelve casi imposible. Preserve su energía para cerrar tratos.",
    can_l1_t: "Traslados Directos del Hotel a la Puerta",
    can_l1_d1: "Disfrute de recogidas matutinas puntuales en el lobby de su hotel y llegadas directas a las entradas más accesibles del ",
    can_l2_t: "Disponibilidad Nocturna Sin Restricciones",
    can_l2_d: "¿Organizando una cena con proveedores después de la exposición? Mantenga el coche en espera. Su Conductor Privado de Guangzhou está a su servicio todo el día.",
    
    // Factory Section
    fac_h1: "Viajes de Compras y Expediciones a Fábricas",
    fac_sub: "Muévase rápidamente por los principales centros de fabricación de la Gran Bahía: ",
    fac_sub2: ", y zonas industriales circundantes.",
    fac_h2: "Su Oficina Móvil y Guía Local",
    fac_p: "Los mejores proveedores suelen estar escondidos en complejos parques industriales, lejos del centro. Necesita un experto local que conozca las rutas más rápidas.",
    fac_b1_t: "🚗 Rutas Optimizadas con Múltiples Paradas",
    fac_b1_d: "¿Necesita inspeccionar tres fábricas en un solo día? Diseñaré el itinerario más inteligente para minimizar el tiempo de tránsito y maximizar su productividad.",
    fac_b2_t: "🗣️ Interpretación Profesional In-Situ",
    fac_b2_d: "Mi servicio no se detiene en el estacionamiento. Lo acompaño a las líneas de producción para traducir especificaciones técnicas y garantizar una comunicación clara.",
    
    // Form & Footer
    form_title: "Obtenga una Cotización Gratis",
    form_subtitle: "Complete los detalles y le responderé en 12 horas. O envíeme un mensaje al instante por WhatsApp.",
    lbl_name: "Su Nombre *", lbl_email: "Correo Electrónico *", lbl_whatsapp: "Número de WhatsApp",
    lbl_service: "Servicio Requerido", lbl_details: "Fechas y Detalles del Viaje *", btn_send: "Enviar Solicitud",
    opt_airport: "Traslado Aeropuerto (CAN)", opt_canton: "Traslado Diario Feria de Cantón", opt_factory: "Visita a Fábricas / Tour Multi-Ciudad", opt_city: "Tour Turístico por la Ciudad", opt_other: "Otro / Itinerario Personalizado",
    ft_desc: "Su conductor privado y guía de negocios confiable en Guangzhou.",
    ft_links: "Enlaces Rápidos", ft_contact: "Contacto Directo", ft_copy: "© 2026 Guangzhou Private Driver. Todos los derechos reservados.",
    whatsapp_float: "Escríbeme",

    // FAQ Section
    faq_title: "Preguntas Frecuentes",
    faqs: [
      { q: "¿Es mejor usar un conductor privado o un taxi en Guangzhou?", a: "Un conductor privado ofrece una experiencia más confiable y cómoda en comparación con los taxis. Con precios fijos, servicio profesional y sin barreras idiomáticas, es ideal para viajeros de negocios con horarios ajustados." },
      { q: "¿Cómo se compara su servicio con aplicaciones como Didi?", a: "A diferencia de las aplicaciones de transporte, nuestro servicio garantiza un conductor que habla inglés, calidad constante del vehículo y horarios preestablecidos. No hay incertidumbre con la disponibilidad o cancelaciones de última hora." },
      { q: "¿Son confiables los taxis o aplicaciones para viajes de negocios en Guangzhou?", a: "Aunque son adecuados para viajes cortos, pueden no ser confiables para negocios. Los problemas de idioma, precios poco claros y servicio inconsistente pueden afectar su agenda." },
      { q: "¿Cuáles son los riesgos de usar conductores informales o sin licencia?", a: "Pueden ofrecer precios más bajos pero carecen de seguro adecuado, estándares de servicio y responsabilidad. Esto genera problemas de seguridad y servicio poco confiable en viajes importantes." },
      { q: "¿Por qué los viajeros de negocios prefieren servicios de conductor privado?", a: "Proporcionan profesionalismo, puntualidad y comunicación clara. Para traslados al aeropuerto, visitas a fábricas y exposiciones, esto asegura una experiencia fluida y sin estrés." },
      { q: "¿Es más caro un conductor privado que un taxi o Didi?", a: "Aunque el costo inicial puede ser mayor, un conductor privado ofrece más valor al ahorrar tiempo y brindar confiabilidad. Para viajeros de negocios, es una mejor inversión en general." },
      { q: "¿Puedo confiar en los taxis para ir a la Feria de Cantón u otras exposiciones?", a: "Durante eventos masivos como la Feria de Cantón, los taxis son difíciles de encontrar y los tiempos de espera son impredecibles. Un conductor pre-reservado asegura recogidas puntuales." },
      { q: "¿Qué hace diferente a su servicio de conductor privado en Guangzhou?", a: "Nos enfocamos en clientes internacionales con conductores de habla inglesa, precios fijos, vehículos de alta gama e itinerarios personalizados. Un servicio diseñado para la eficiencia comercial." },
      { q: "¿Cómo reservo su servicio de conductor privado?", a: "Puede reservar fácilmente a través de nuestro sitio web, WhatsApp o correo electrónico. Simplemente envíenos su horario y confirmaremos su reserva rápidamente." },
      { q: "¿Necesito pagar un depósito para confirmar la reserva?", a: "Sí, requerimos un depósito del 30% del precio total. El depósito se puede pagar en línea vía PayPal o Wise, y el saldo restante se paga antes o al inicio del servicio." }
    ]
  },
  ar: {
    // Nav & Hero
    nav_home: "الرئيسية", nav_airport: "نقل المطار", nav_canton: "معرض كانتون", nav_factory: "زيارات المصانع", nav_quote: "تسعيرة",
    hero_badge: "تقييم 5.0 من قبل أكثر من 200 عميل دولي",
    hero_title: "<span class='text-blue-400'>سائقك الخاص</span> المتميز والمتحدث بالإنجليزية في قوانغتشو.",
    hero_desc: "استقبال خالي من المتاعب في المطار، نقل لمعرض كانتون وجولات في المصانع. تخطى طوابير سيارات الأجرة، وتغلب على حواجز اللغة، وانطلق مع محترف محلي موثوق.",
    btn_book: "احجز رحلتك الآن", btn_meet: "قابل سائقك",
    
    // Stats
    stat_1_val: "+10", stat_1_lbl: "سنوات خبرة",
    stat_2_val: "بطلاقة", stat_2_lbl: "الإنجليزية والصينية",
    stat_3_val: "100%", stat_3_lbl: "دقة في المواعيد",
    stat_4_val: "فاخرة", stat_4_lbl: "سيارات واسعة",
    
    // Video Section
    vid_h2: "مرحباً! أنا لست مجرد سائق — أنا حليف عملك المحلي.",
    vid_p1_1: "السفر عبر الصين يمكن أن يكون شاقاً إذا كنت لا تتحدث لغة الماندرين أو لا تستخدم أدوات الدفع المحلية مثل (",
    vid_p1_2: "). إدراكاً لهذا التحدي، أسست خدمة سائق قوانغتشو الخاص لسد الفجوة للمهنيين الدوليين.",
    vid_p2: "دوري يمتد إلى ما هو أبعد من النقل. أنا أعمل كمساعدك على الأرض — أسهل الترجمات في المصانع، وأتعامل مع تسجيل الدخول للفنادق، وأوصي بالطعام الأصيل، وأحميك من المزالق السياحية. أنا مكرس لزيادة إنتاجيتك مع ضمان أن تكون إقامتك ممتعة.",
    vid_li1: "التعامل المباشر مع سائقك (بدون عمولات وكالات)",
    vid_li2: "أسعار ثابتة وواضحة (بدون رسوم مفاجئة)",
    vid_li3: "واي فاي سريع مجاني ومياه شرب فاخرة",
    
    // Services Summary
    srv_h2: "حلول متخصصة للمديرين التنفيذيين العالميين",
    srv_p: "خدمات نقل مصممة خصيصاً للمشترين الدوليين ورجال الأعمال الذين يتنقلون في قوانغدونغ.",
    srv_learn: "اعرف المزيد",
    srv_1_h3: "استقبال مطار قوانغتشو (CAN)",
    srv_1_p1: "استمتع بوصول سلس واستقبال في ",
    srv_1_p2: ". مع تتبع الرحلات، سيكون سائقك في انتظارك، حتى لو تأخرت.",
    srv_2_h3: "جولات المصانع ودعم ثنائي اللغة",
    srv_2_p1: "الوصول بسهولة إلى مراكز التصنيع في ",
    srv_2_p2: "، و ",
    srv_2_p3: ". مكافأة: ترجمة احترافية (إنجليزي-صيني) داخل المصنع.",
    srv_3_h3: "مواصلات معرض كانتون",
    srv_3_p1: "تخطى طوابير التاكسي الطويلة. اضمن نقلك اليومي الحصري إلى ",
    srv_3_p2: " وابدأ يومك في المعرض بطاقة وتركيز.",
    
    // Testimonials
    testi_title: "ماذا يقول عملائي",
    t1_q: "\"العثور على سائق خاص موثوق في قوانغتشو كان أمراً حاسماً لفريقنا. معرفته بأسواق الجملة وفرت علينا أياماً من الوقت الضائع. نوصي به بشدة!\"",
    t1_role: "المدير التنفيذي، المملكة المتحدة",
    t2_q: "\"كمشترٍ متكرر في الصين، وجود سائق خاص في قوانغتشو يتحدث الإنجليزية بطلاقة يغير كل شيء. آمن، دقيق، ومفيد في الترجمة.\"",
    t2_role: "مشتري، الإمارات العربية المتحدة",
    t3_q: "\"خدمة استثنائية من الاستقبال في المطار وحتى آخر يوم لنا في معرض كانتون. السيارة كانت نظيفة جداً.\"",
    t3_role: "مصممة، كندا",
    t4_q: "\"زرنا خمسة مصانع عبر شنتشن وفوشان في يومين. سائقنا جعل الجدول الزمني المستحيل يبدو سهلاً وآمناً.\"",
    t4_role: "مدير لوجستيات، إيطاليا",
    t5_q: "\"إلى جانب القيادة، تصرف كمرشدنا المحلي. سائق من الطراز الأول يعرف أفضل المطاعم.\"",
    t5_role: "رواد أعمال، أستراليا",
    t6_q: "\"تأخرت رحلتنا 3 ساعات، ووصلنا في 3 صباحاً. سائقنا كان لا يزال ينتظرنا بابتسامة. تفاني واحترافية حقيقية.\"",
    t6_role: "وكيل مصادر، الولايات المتحدة",
    
    // Airport Section
    apt_h1: "انتقالات مطار قوانغتشو باييون (CAN)",
    apt_sub: "ابدأ رحلة عملك في الصين بدون أي عقبات. جرب استقبال كبار الشخصيات مع سائقك الخاص المتحدث بالإنجليزية.",
    apt_h2: "لماذا تحجز نقل خاص من المطار؟",
    apt_l1_t: "بدون حواجز لغوية أو عمليات احتيال",
    apt_l1_d1: "محاولة توجيه تاكسي محلي بلغة الماندرين يمكن أن يكون كابوساً. ",
    apt_l1_d2: "تجنب المتاعب.",
    apt_l1_d3: " سائقك لديه وجهتك محددة مسبقاً قبل هبوط طائرتك.",
    apt_l2_t: "تتبع الرحلات المباشر ووقت انتظار مجاني",
    apt_l2_d: "عالق في الجمارك أو تواجه تأخيراً في الرحلة؟ لا تقلق. أراقب حالة رحلتك وأقدم وقت انتظار مجاني لمدة 90 دقيقة بعد الهبوط.",
    apt_l3_t: "ترحيب شخصي في صالة الوصول",
    apt_l3_d: "شاهد اسمك على لوحة ترحيب بمجرد خروجك من استلام الأمتعة. سأساعدك في حقائبك الثقيلة وأرافقك مباشرة إلى سيارتك الفاخرة.",
    
    // Canton Fair Section
    can_h1: "خدمات سيارات حصرية لمعرض كانتون",
    can_sub: "قم بتحسين جدولك الزمني في مجمع باتشو. نحن نوفر حافلات يومية يمكن الاعتماد عليها ومساعدة ثنائية اللغة للمشترين العالميين.",
    can_h2: "تغلب على زحام معرض كانتون",
    can_p1: "عندما يتدفق أكثر من 200,000 زائر إلى ",
    can_p2: "معرض كانتون",
    can_p3: "، يصبح تأمين سيارة أجرة أو ",
    can_p4: " شبه مستحيل. حافظ على طاقتك لإبرام الصفقات.",
    can_l1_t: "نقل سلس من الفندق إلى البوابة",
    can_l1_d1: "استمتع بالانتقال الصباحي في الوقت المحدد من بهو فندقك والوصول المباشر إلى المداخل الأكثر سهولة في ",
    can_l2_t: "تواجد مسائي غير مقيد",
    can_l2_d: "تستضيف عشاء مع الموردين بعد المعرض؟ احتفظ بالسيارة في وضع الاستعداد. سائقك الخاص في خدمتك طوال اليوم.",
    
    // Factory Section
    fac_h1: "رحلات التوريد وجولات المصانع",
    fac_sub: "تحرك بسرعة عبر مراكز التصنيع الأساسية في منطقة الخليج الكبرى: ",
    fac_sub2: "، والمناطق الصناعية المحيطة.",
    fac_h2: "مكتبك المتنقل ومرشدك المحلي",
    fac_p: "غالباً ما يكون كبار الموردين مختبئين في مجمعات صناعية معقدة، بعيداً عن وسط المدينة. تحتاج إلى خبير محلي يعرف أسرع الطرق.",
    fac_b1_t: "🚗 توجيه مُحسَّن متعدد المحطات",
    fac_b1_d: "هل تحتاج إلى فحص ثلاثة مصانع مختلفة في يوم واحد؟ سأصمم أذكى خط سير لتقليل وقت العبور وزيادة إنتاجيتك.",
    fac_b2_t: "🗣️ ترجمة فورية احترافية في الموقع",
    fac_b2_d: "خدمتي لا تتوقف في موقف السيارات. أرافقك إلى خطوط الإنتاج لترجمة المواصفات الفنية وضمان التواصل الواضح مع الموردين.",
    
    // Form & Footer
    form_title: "احصل على تسعيرة مجانية",
    form_subtitle: "املأ التفاصيل أدناه، وسأرد في غضون 12 ساعة. أو راسلني عبر واتساب.",
    lbl_name: "الاسم الكريم *", lbl_email: "البريد الإلكتروني *", lbl_whatsapp: "رقم الواتساب (موصى به للغاية)",
    lbl_service: "الخدمة المطلوبة", lbl_details: "تواريخ وتفاصيل الرحلة *", btn_send: "إرسال الطلب",
    opt_airport: "نقل المطار (CAN)", opt_canton: "نقل يومي لمعرض كانتون", opt_factory: "زيارات المصانع / جولة مدن متعددة", opt_city: "جولة سياحية في المدينة", opt_other: "أخرى / خط سير مخصص",
    ft_desc: "سائقك الخاص المتحدث بالإنجليزية ومرشدك التجاري الموثوق في قوانغتشو.",
    ft_links: "روابط سريعة", ft_contact: "تواصل مباشرة", ft_copy: "© 2026 Guangzhou Private Driver. جميع الحقوق محفوظة.",
    whatsapp_float: "راسلني واتساب",

    // FAQ Section
    faq_title: "الأسئلة الشائعة",
    faqs: [
      { q: "هل من الأفضل استخدام سائق خاص أم سيارة أجرة في قوانغتشو؟", a: "يوفر السائق الخاص تجربة أكثر موثوقية وراحة مقارنة بسيارات الأجرة. مع أسعار ثابتة، وخدمة احترافية، وبدون حواجز لغوية، فهو مناسب جداً لرجال الأعمال ذوي الجداول المزدحمة." },
      { q: "كيف تقارن خدمتك بتطبيقات النقل مثل ديدي (Didi)؟", a: "على عكس تطبيقات النقل، تضمن خدمتنا سائقاً يتحدث الإنجليزية، وجودة سيارات ثابتة، وجداول زمنية مرتبة مسبقاً. لا يوجد أي غموض بشأن توفر السائق أو التواصل أو الإلغاء في اللحظة الأخيرة." },
      { q: "هل سيارات الأجرة أو تطبيقات النقل موثوقة لرحلات العمل في قوانغتشو؟", a: "على الرغم من أنها مناسبة للرحلات القصيرة، إلا أنها قد لا تكون موثوقة لأغراض العمل. قضايا مثل حواجز اللغة والأسعار غير الواضحة والخدمة غير المتسقة يمكن أن تؤثر على جدولك الزمني وتجربتك بشكل عام." },
      { q: "ما هي مخاطر استخدام سائقين غير مرخصين أو غير رسميين؟", a: "قد يقدم السائقون غير المرخصين أسعاراً أقل لكنهم غالباً ما يفتقرون إلى التأمين المناسب ومعايير الخدمة والمسؤولية. هذا يمكن أن يؤدي إلى مخاوف تتعلق بالسلامة وخدمة غير موثوقة خلال رحلات العمل المهمة." },
      { q: "لماذا يفضل المسافرون الدوليون بغرض الأعمال خدمات السائق الخاص؟", a: "توفر خدمات السائق الخاص الاحترافية والالتزام بالمواعيد والتواصل الواضح. بالنسبة لنقل المطار وزيارات المصانع والمعارض، يضمن ذلك تجربة سلسة وخالية من الإجهاد." },
      { q: "هل السائق الخاص أغلى من سيارات الأجرة أو ديدي؟", a: "في حين أن التكلفة المبدئية قد تكون أعلى، إلا أن السائق الخاص يوفر قيمة أكبر من خلال توفير الوقت والموثوقية وجودة الخدمة. بالنسبة لرجال الأعمال، غالباً ما يؤدي ذلك إلى عائد استثمار أفضل." },
      { q: "هل يمكنني الاعتماد على سيارات الأجرة للذهاب إلى معرض كانتون أو المعارض الأخرى؟", a: "خلال الأحداث الكبرى مثل معرض كانتون، قد يكون من الصعب العثور على سيارات أجرة وأوقات الانتظار غير متوقعة. السائق الخاص المحجوز مسبقاً يضمن الاستلام في الوقت المحدد وجدولاً يومياً سلساً." },
      { q: "ما الذي يميز خدمة السائق الخاص بك في قوانغتشو؟", a: "نحن نركز على خدمة العملاء الدوليين مع سائقين يتحدثون الإنجليزية، وأسعار ثابتة، وسيارات راقية، ومسارات مخصصة. خدمتنا مصممة خصيصاً لراحة وكفاءة العمل." },
      { q: "كيف يمكنني حجز خدمة السائق الخاص بك؟", a: "يمكنك الحجز بسهولة عبر موقعنا الإلكتروني أو واتساب أو البريد الإلكتروني. ما عليك سوى إرسال جدولك الزمني وسنقوم بتأكيد حجزك بسرعة." },
      { q: "هل أحتاج إلى دفع عربون لتأكيد الحجز؟", a: "نعم، نطلب عربوناً بنسبة 30% من إجمالي السعر المعروض لتأكيد الحجز. يمكن دفع العربون عبر الإنترنت عبر PayPal أو Wise، مع دفع الرصيد المتبقي قبل أو عند بدء الخدمة." }
    ]
  }
};

export default function Home() {
  // --- 状态管理 (State Management) ---
  const [currentView, setCurrentView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // 新增：用于兼容平板的点击下拉状态
  const [language, setLanguage] = useState('en');
  const [clientIp, setClientIp] = useState('Fetching...');
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formMessage, setFormMessage] = useState('');

  // --- 辅助函数 ---
  const t = (key) => translations[language]?.[key] || key;
  const tHtml = (key) => ({ __html: translations[language]?.[key] || key });

  const navigateTo = (viewId) => {
    setCurrentView(viewId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferred_lang', lang);
    setIsMenuOpen(false);
  };

  // --- 初始化与副作用 (Hooks) ---
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_lang') || 'en';
    setLanguage(savedLang);

    // 抓取用户真实 IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setClientIp(data.ip))
      .catch(err => console.error('IP Fetch Error:', err));
  }, []);

  useEffect(() => {
    // 监听语言变化，支持阿拉伯语的 RTL 排版自动翻转
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // --- 动态获取当前语言的 FAQ 并生成 Schema (用于 Google SEO) ---
  const currentFaqs = translations[language]?.faqs || translations['en'].faqs;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // --- 预加载图片优化 ---
  const handlePreload = (serviceType) => {
    const imgMap = {
      /* 🔴🔴🔴 修改此处的图片名称：对应 public/images/ 文件夹下的文件名 🔴🔴🔴 */
      'airport': '/images/airport-pick-up.webp',
      'canton': '/images/canton-fair-car-service.webp',
      'factory': '/images/visit-a-handbag-factory.webp'
    };
    if (imgMap[serviceType]) {
      const img = new Image();
      img.src = imgMap[serviceType];
    }
  };

  // --- 询盘表单提交逻辑 (Web3Forms API) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormMessage('');

    const formData = new FormData(e.target);
    const countryCode = formData.get('country_code');
    const whatsappNum = formData.get('whatsapp_number');
    if (whatsappNum) {
      formData.set('whatsapp', (countryCode ? countryCode + ' ' : '') + whatsappNum);
    }
    formData.delete('country_code');
    formData.delete('whatsapp_number');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      });
      const result = await response.json();
      
      if (response.status === 200) {
        setFormStatus('success');
        setFormMessage('✅ Message sent successfully! I will reply to you soon.');
        e.target.reset();
      } else {
        setFormStatus('error');
        setFormMessage(result.message || '❌ Something went wrong. Please try WhatsApp instead.');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('❌ Network error. Please contact via WhatsApp.');
    } finally {
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen selection:bg-blue-500 selection:text-white">
      {/* --- 全局注入 CSS 样式 --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .view-section { display: none; animation: fadeIn 0.5s ease-in-out; }
        .view-section.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .marquee-container {
          overflow: hidden; display: flex; width: 100%;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .marquee-content { display: flex; gap: 2rem; animation: marquee 40s linear infinite; min-width: max-content; }
        .marquee-content:hover { animation-play-state: paused; }
        .marquee-group { display: flex; gap: 2rem; flex-shrink: 0; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 1rem * (var(--dir-sign, 1)))); } }
        
        html[dir="rtl"] .marquee-content { animation-direction: reverse; }
        html[dir="rtl"] .whatsapp-float { right: auto; left: 30px; }

        .testimonial-card { width: 350px; flex-shrink: 0; white-space: normal; }
        .py-24, #booking-form, footer { content-visibility: auto; contain-intrinsic-size: 1px 600px; } /* 修复：移除了 #video-intro 以解决手机端视频无法点击的问题 */
        .asset-placeholder { background-color: #DBEAFE; border: 2px dashed #3B82F6; color: #1E3A8A; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; border-radius: 0.75rem; }
        .whatsapp-float { position: fixed; bottom: 30px; right: 30px; background-color: #166534; color: white; border-radius: 50px; padding: 12px 24px; font-weight: bold; box-shadow: 0 10px 25px rgba(22, 101, 52, 0.4); z-index: 100; display: flex; align-items: center; gap: 8px; transition: transform 0.3s; }
        .whatsapp-float:hover { transform: scale(1.05) translateY(-5px); }
      `}} />

      {/* --- 顶部导航栏 --- */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigateTo('home')} role="button" tabIndex="0" aria-label="Go to homepage">
              <span className="text-2xl font-bold text-gray-900 tracking-tight"> <span className="text-blue-600">Guangzhou</span>Private<span className="text-blue-600">Driver</span>.</span>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <button onClick={() => navigateTo('home')} className={`font-medium transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>{t('nav_home')}</button>
              <button onClick={() => navigateTo('airport')} className={`font-medium transition-colors ${currentView === 'airport' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>{t('nav_airport')}</button>
              <button onClick={() => navigateTo('canton')} className={`font-medium transition-colors ${currentView === 'canton' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>{t('nav_canton')}</button>
              <button onClick={() => navigateTo('factory')} className={`font-medium transition-colors ${currentView === 'factory' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>{t('nav_factory')}</button>
              <a href="#booking-form" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 shadow-md transition-colors mx-2">{t('nav_quote')}</a>
              
              {/* Language Switcher Desktop & Tablet (修复平板触控问题) */}
              <div 
                className="relative inline-block text-left"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button 
                  type="button" 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="inline-flex justify-center items-center w-full rounded-md border border-gray-200 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  🌐 <span className="mx-1 font-bold">{language.toUpperCase()}</span>
                </button>
                <div className={`origin-top-right absolute end-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all ${isLangOpen ? 'block' : 'hidden'}`}>
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button onClick={() => { changeLanguage('en'); setIsLangOpen(false); }} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" role="menuitem">English</button>
                    <button onClick={() => { changeLanguage('es'); setIsLangOpen(false); }} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" role="menuitem">Español</button>
                    <button onClick={() => { changeLanguage('ar'); setIsLangOpen(false); }} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" role="menuitem">العربية (Arabic)</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle mobile menu" aria-expanded={isMenuOpen} className="text-gray-700 hover:text-blue-600 focus:outline-none p-2">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu content */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => navigateTo('home')} className="w-full text-start block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium">{t('nav_home')}</button>
              <button onClick={() => navigateTo('airport')} className="w-full text-start block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium">{t('nav_airport')}</button>
              <button onClick={() => navigateTo('canton')} className="w-full text-start block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium">{t('nav_canton')}</button>
              <button onClick={() => navigateTo('factory')} className="w-full text-start block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium">{t('nav_factory')}</button>
              <div className="pt-2">
                <a href="#booking-form" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-blue-600 text-white py-3 rounded-full font-semibold">{t('nav_quote')}</a>
              </div>
              <div className="pt-4 flex justify-center gap-6 border-t border-gray-100 mt-3">
                <button onClick={() => changeLanguage('en')} className={`text-sm font-bold hover:text-blue-600 ${language === 'en' ? 'text-blue-600' : 'text-gray-700'}`}>EN</button>
                <span className="text-gray-300">|</span>
                <button onClick={() => changeLanguage('es')} className={`text-sm font-bold hover:text-blue-600 ${language === 'es' ? 'text-blue-600' : 'text-gray-700'}`}>ES</button>
                <span className="text-gray-300">|</span>
                <button onClick={() => changeLanguage('ar')} className={`text-sm font-bold hover:text-blue-600 ${language === 'ar' ? 'text-blue-600' : 'text-gray-700'}`}>AR</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div id="app-content" className="pt-20">
        
        {/* --- 首页 (Home View) --- */}
        <section id="home" className={`view-section ${currentView === 'home' ? 'active' : ''}`}>
          <div className="relative bg-gray-900 overflow-hidden">
            {/* 🔴🔴🔴 修改此处背景图片：对应 public/images/ 文件夹下的首屏大图文件名 🔴🔴🔴 */}
            <div className="absolute inset-0 opacity-60 m-0 rounded-none border-none justify-end pb-10" style={{ backgroundImage: "url('/images/guangzhou-private-driver.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
              <div className="md:w-2/3 space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-semibold tracking-wide">
                  {t('hero_badge')}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight" dangerouslySetInnerHTML={tHtml('hero_title')} />
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {t('hero_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href="#booking-form" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all text-center">
                    {t('btn_book')}
                  </a>
                  <a href="#video-intro" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all text-center">
                    {t('btn_meet')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-b border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{t('stat_1_val')}</div>
                  <div className="text-sm text-gray-600 font-medium">{t('stat_1_lbl')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{t('stat_2_val')}</div>
                  <div className="text-sm text-gray-600 font-medium">{t('stat_2_lbl')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{t('stat_3_val')}</div>
                  <div className="text-sm text-gray-600 font-medium">{t('stat_3_lbl')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{t('stat_4_val')}</div>
                  <div className="text-sm text-gray-600 font-medium">{t('stat_4_lbl')}</div>
                </div>
              </div>
            </div>
          </div>

          <div id="video-intro" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2">
                  {/* 修复：增加 z-10 和 transform translateZ(0) 以解决部分移动端 iOS 浏览器 iframe 点击失效 Bug */}
                  <div className="h-80 w-full shadow-lg rounded-2xl overflow-hidden bg-black relative z-10" style={{ transform: 'translateZ(0)' }}>
                    {/* 🔴🔴🔴 修改此处视频：将 src 中的 YouTube_Video_ID 替换为你上传的真实 YouTube 视频ID 🔴🔴🔴 */}
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full" 
                      src="https://www.youtube.com/embed/dnKVlN3MpL0" 
                      title="Guangzhou Private Driver Video" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
                <div className="md:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">{t('vid_h2')}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('vid_p1_1')}<a href="https://www.wechat.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">WeChat</a>/<a href="https://global.alipay.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Alipay</a>{t('vid_p1_2')}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('vid_p2')}
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-center text-gray-700">
                      <svg className="h-6 w-6 text-green-500 mx-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      {t('vid_li1')}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="h-6 w-6 text-green-500 mx-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      {t('vid_li2')}
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="h-6 w-6 text-green-500 mx-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      {t('vid_li3')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('srv_h2')}</h2>
                <p className="text-lg text-gray-600">{t('srv_p')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Airport Card */}
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col cursor-pointer service-card" onClick={() => navigateTo('airport')} onMouseEnter={() => handlePreload('airport')} role="button" tabIndex="0">
                  <div className="h-64 overflow-hidden rounded-none border-b-0 ">
                    {/* 🔴🔴🔴 修改此处图片：服务卡片 1 的本地图片 🔴🔴🔴 */}
                    <img src="/images/airport-pick-up.webp" alt="airport-pick-up" className="block w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t('srv_1_h3')}</h3>
                    <p className="text-gray-600 mb-6 flex-1">
                      {t('srv_1_p1')}<a href="https://www.baiyunairport.com/english/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium" onClick={(e)=>e.stopPropagation()}>Guangzhou Baiyun International Airport</a>{t('srv_1_p2')}
                    </p>
                    <span className="text-blue-600 font-semibold flex items-center group">
                      {t('srv_learn')} 
                      <svg className="w-4 h-4 mx-2 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </div>
                </div>

                {/* Factory Card */}
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col cursor-pointer service-card" onClick={() => navigateTo('factory')} onMouseEnter={() => handlePreload('factory')} role="button" tabIndex="0">
                  <div className="h-64 overflow-hidden rounded-none border-b-0 bg-indigo-50 border-indigo-300 text-indigo-800">
                    {/* 🔴🔴🔴 修改此处图片：服务卡片 2 的本地图片 🔴🔴🔴 */}
                    <img src="/images/visit-a-handbag-factory.webp" alt="factory-visits" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t('srv_2_h3')}</h3>
                    <p className="text-gray-600 mb-6 flex-1">
                      {t('srv_2_p1')}<a href="https://en.wikipedia.org/wiki/Foshan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium" onClick={(e)=>e.stopPropagation()}>Foshan</a>, <a href="https://en.wikipedia.org/wiki/Dongguan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium" onClick={(e)=>e.stopPropagation()}>Dongguan</a>{t('srv_2_p2')}<a href="https://en.wikipedia.org/wiki/Shenzhen" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium" onClick={(e)=>e.stopPropagation()}>Shenzhen</a>{t('srv_2_p3')}
                    </p>
                    <span className="text-blue-600 font-semibold flex items-center group">
                      {t('srv_learn')} 
                      <svg className="w-4 h-4 mx-2 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </div>
                </div>

                {/* Canton Fair Card */}
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col cursor-pointer service-card" onClick={() => navigateTo('canton')} onMouseEnter={() => handlePreload('canton')} role="button" tabIndex="0">
                  <div className="h-64 overflow-hidden rounded-none border-b-0 ">
                    {/* 🔴🔴🔴 修改此处图片：服务卡片 3 的本地图片 🔴🔴🔴 */}
                    <img src="/images/canton-fair-car-service.webp" alt="taxi queues out of canton fair" className="block w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t('srv_3_h3')}</h3>
                    <p className="text-gray-600 mb-6 flex-1">
                      {t('srv_3_p1')}<a href="https://www.cantonfair.org.cn/en-US" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium" onClick={(e)=>e.stopPropagation()}>Pazhou Complex</a>{t('srv_3_p2')}
                    </p>
                    <span className="text-blue-600 font-semibold flex items-center group">
                      {t('srv_learn')} 
                      <svg className="w-4 h-4 mx-2 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="py-20 bg-gray-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
              <h2 className="text-3xl font-bold text-center">{t('testi_title')}</h2>
            </div>
            <div className="marquee-container">
              <div className="marquee-content">
                {/* 滚动评价 第一组 */}
                <div className="marquee-group">
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t1_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">S</div>
                      <div className="mx-3"><p className="font-semibold">Sarah L.</p><p className="text-sm text-gray-400">{t('t1_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t2_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">A</div>
                      <div className="mx-3"><p className="font-semibold">Ahmed M.</p><p className="text-sm text-gray-400">{t('t2_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t3_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">C</div>
                      <div className="mx-3"><p className="font-semibold">Chloe J.</p><p className="text-sm text-gray-400">{t('t3_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t4_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">R</div>
                      <div className="mx-3"><p className="font-semibold">Roberto C.</p><p className="text-sm text-gray-400">{t('t4_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t5_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">E</div>
                      <div className="mx-3"><p className="font-semibold">Emily & James</p><p className="text-sm text-gray-400">{t('t5_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t6_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">M</div>
                      <div className="mx-3"><p className="font-semibold">Michael B.</p><p className="text-sm text-gray-400">{t('t6_role')}</p></div>
                    </div>
                  </div>
                </div>
                {/* 滚动评价 第二组 (无限循环) */}
                <div className="marquee-group">
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t1_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">S</div>
                      <div className="mx-3"><p className="font-semibold">Sarah L.</p><p className="text-sm text-gray-400">{t('t1_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t2_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">A</div>
                      <div className="mx-3"><p className="font-semibold">Ahmed M.</p><p className="text-sm text-gray-400">{t('t2_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t3_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">C</div>
                      <div className="mx-3"><p className="font-semibold">Chloe J.</p><p className="text-sm text-gray-400">{t('t3_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t4_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">R</div>
                      <div className="mx-3"><p className="font-semibold">Roberto C.</p><p className="text-sm text-gray-400">{t('t4_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t5_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">E</div>
                      <div className="mx-3"><p className="font-semibold">Emily & James</p><p className="text-sm text-gray-400">{t('t5_role')}</p></div>
                    </div>
                  </div>
                  <div className="testimonial-card bg-gray-800 p-8 rounded-2xl relative">
                    <div className="text-blue-400 mb-4 flex" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="text-gray-300 italic mb-6">{t('t6_q')}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center font-bold">M</div>
                      <div className="mx-3"><p className="font-semibold">Michael B.</p><p className="text-sm text-gray-400">{t('t6_role')}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 机场接送 (Airport View) --- */}
        <section id="airport" className={`view-section ${currentView === 'airport' ? 'active' : ''}`}>
          <div className="bg-blue-50 py-20 border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('apt_h1')}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('apt_sub')}</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">{t('apt_h2')}</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 p-1 rounded-full mx-4 mt-1 shrink-0">✓</span>
                    <div>
                      <strong className="block text-gray-900 text-lg">{t('apt_l1_t')}</strong>
                      <p className="text-gray-600">
                        {t('apt_l1_d1')} <a href="https://guangzhouprivatedriver.top/avoiding-taxi-scams-in-china/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">{t('apt_l1_d2')}</a> {t('apt_l1_d3')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 p-1 rounded-full mx-4 mt-1 shrink-0">✓</span>
                    <div>
                      <strong className="block text-gray-900 text-lg">{t('apt_l2_t')}</strong>
                      <p className="text-gray-600">{t('apt_l2_d')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 p-1 rounded-full mx-4 mt-1 shrink-0">✓</span>
                    <div>
                      <strong className="block text-gray-900 text-lg">{t('apt_l3_t')}</strong>
                      <p className="text-gray-600">{t('apt_l3_d')}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 w-full">
                {/* 🔴🔴🔴 修改此处图片：机场页面配图 🔴🔴🔴 */}
                <div className="asset-placeholder h-64 md:h-[400px] lg:h-[500px] w-full shadow-lg overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl" style={{ backgroundImage: "url('/images/a-spacious-car-trunk.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 广交会 (Canton Fair View) --- */}
        <section id="canton" className={`view-section ${currentView === 'canton' ? 'active' : ''}`}>
          <div className="bg-emerald-50 py-20 border-b border-emerald-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('can_h1')}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('can_sub')}</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">{t('can_h2')}</h2>
                <p className="text-lg text-gray-600">
                  {t('can_p1')} <a href="https://www.cantonfair.org.cn/en-US" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">{t('can_p2')}</a>{t('can_p3')}<a href="https://www.didiglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">Didi</a>{t('can_p4')}
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-600 p-1 rounded-full mx-4 mt-1 shrink-0">✓</span>
                    <div>
                      <strong className="block text-gray-900 text-lg">{t('can_l1_t')}</strong>
                      <p className="text-gray-600">
                        {t('can_l1_d1')} <a href="https://www.cantonfair.org.cn/en-US" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">Pazhou Complex</a>.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-600 p-1 rounded-full mx-4 mt-1 shrink-0">✓</span>
                    <div>
                      <strong className="block text-gray-900 text-lg">{t('can_l2_t')}</strong>
                      <p className="text-gray-600">{t('can_l2_d')}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 w-full">
                {/* 🔴🔴🔴 修改此处图片：广交会页面配图 🔴🔴🔴 */}
                <div className="asset-placeholder h-64 md:h-[400px] lg:h-[500px] w-full shadow-lg rounded-2xl border border-emerald-300 overflow-hidden transition-shadow duration-300 hover:shadow-2xl" style={{ backgroundImage: "url('/images/canton-fair-car-service.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}> 
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 看厂 (Factory View) --- */}
        <section id="factory" className={`view-section ${currentView === 'factory' ? 'active' : ''}`}>
          <div className="bg-indigo-50 py-20 border-b border-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{t('fac_h1')}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('fac_sub')}<a href="https://en.wikipedia.org/wiki/Foshan" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Foshan</a>, <a href="https://en.wikipedia.org/wiki/Dongguan" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Dongguan</a>, <a href="https://en.wikipedia.org/wiki/Shenzhen" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">Shenzhen</a>{t('fac_sub2')}
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">{t('fac_h2')}</h2>
                <p className="text-lg text-gray-600">{t('fac_p')}</p>
                <div className="space-y-6 mt-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('fac_b1_t')}</h3>
                    <p className="text-gray-600">{t('fac_b1_d')}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('fac_b2_t')}</h3>
                    <p className="text-gray-600">{t('fac_b2_d')}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 w-full sticky top-28">
                {/* 🔴🔴🔴 修改此处图片：看厂页面配图 🔴🔴🔴 */}
                <div className="asset-placeholder h-64 md:h-[400px] lg:h-[550px] w-full shadow-lg overflow-hidden rounded-2xl border border-gray-100 transition-shadow duration-300 hover:shadow-2xl" style={{ backgroundImage: "url('/images/visit-a-handbag-factory.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 询盘表单 & FAQ (Booking Form & FAQ) --- */}
        <section id="booking-form" className="py-24 bg-gray-900 text-white border-t border-gray-800">
          {/* 注入 Google SEO FAQ Schema (跟随当前语言动态变化) */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('form_title')}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{t('form_subtitle')}</p>
            </div>

            {/* 左右非对称布局：引入材质深度与微妙色差，引导视觉重心 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* --- 左侧：FAQ (降维/深邃质感，作为辅助阅读区) --- */}
              <div className="lg:col-span-7 bg-gray-900/40 rounded-3xl p-6 sm:p-8 border border-gray-800/60 shadow-inner">
                <h3 className="text-2xl font-bold text-gray-200 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t('faq_title')}
                </h3>
                <div className="space-y-4">
                  {currentFaqs.map((faq, index) => (
                    <details key={index} className="group bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700/50 open:border-blue-500/50 transition-colors">
                      <summary className="cursor-pointer p-5 font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex justify-between items-center select-none">
                        <span className="pr-4 text-start">{faq.q}</span>
                        <span className="text-blue-500 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                      </summary>
                      <div className="p-5 text-gray-400 bg-gray-900/60 border-t border-gray-700/50 leading-relaxed text-sm text-start">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* --- 右侧：询盘表单 (升维/提亮质感，作为核心转化区 + 吸顶悬浮) --- */}
              <div className="lg:col-span-5 bg-gradient-to-b from-gray-800 to-gray-800/95 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative border border-gray-700 lg:sticky lg:top-28 border-t-4 border-t-blue-500">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="access_key" value="6627a624-a77b-4c8a-9c66-7d6eb4224dce" />
                  <input type="hidden" name="subject" value="New Inquiry from Guangzhou Private Driver Website" />
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} aria-hidden="true" tabIndex="-1" />
                  <input type="hidden" name="Client_IP" value={clientIp} />

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="frm-name" className="block text-sm font-medium text-gray-300 mb-2">{t('lbl_name')}</label>
                      <input type="text" id="frm-name" name="name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="frm-email" className="block text-sm font-medium text-gray-300 mb-2">{t('lbl_email')}</label>
                      <input type="email" id="frm-email" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="frm-whatsapp" className="block text-sm font-medium text-gray-300 mb-2">{t('lbl_whatsapp')}</label>
                    <div className="flex gap-2">
                      <select id="frm-country-code" name="country_code" defaultValue="+1" className="w-1/3 bg-gray-700 border border-gray-600 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                        <option value="+1">US (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+61">AU (+61)</option>
                        <option value="+971">UAE (+971)</option>
                        <option value="+966">SA (+966)</option>
                        <option value="">Other</option>
                      </select>
                      <input type="tel" id="frm-whatsapp" name="whatsapp_number" className="w-2/3 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="234 567 8900" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="frm-service" className="block text-sm font-medium text-gray-300 mb-2">{t('lbl_service')}</label>
                    <select id="frm-service" name="service" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <option value="Airport Transfer">{t('opt_airport')}</option>
                      <option value="Canton Fair">{t('opt_canton')}</option>
                      <option value="Factory Visits">{t('opt_factory')}</option>
                      <option value="City Tour">{t('opt_city')}</option>
                      <option value="Other">{t('opt_other')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="frm-message" className="block text-sm font-medium text-gray-300 mb-2">{t('lbl_details')}</label>
                    <textarea id="frm-message" name="message" required rows="4" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                  </div>

                  <button type="submit" disabled={formStatus === 'loading'} className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4 rounded-lg transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] flex justify-center items-center ${formStatus === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}>
                    <span>{t('btn_send')}</span>
                    <svg className={`${formStatus === 'loading' ? 'block' : 'hidden'} animate-spin mx-3 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </button>
                  
                  {formStatus !== 'idle' && formStatus !== 'loading' && (
                    <div className={`p-4 rounded-lg text-center font-medium mt-4 ${formStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} aria-live="polite">
                      {formMessage}
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* --- 页脚 (Footer) --- */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="text-2xl font-bold text-white tracking-tight"><span className="text-blue-500">Guangzhou</span>Private<span className="text-blue-500">Driver</span>.</span>
              <p className="mt-4 text-sm">{t('ft_desc')}</p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-4 text-base">{t('ft_links')}</h2>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('home')} className="hover:text-blue-400 text-start">{t('nav_home')}</button></li>
                <li><button onClick={() => navigateTo('airport')} className="hover:text-blue-400 text-start">{t('nav_airport')}</button></li>
                <li><button onClick={() => navigateTo('canton')} className="hover:text-blue-400 text-start">{t('nav_canton')}</button></li>
                <li><button onClick={() => navigateTo('factory')} className="hover:text-blue-400 text-start">{t('nav_factory')}</button></li>
              </ul>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-4 text-base">{t('ft_contact')}</h2>
              <ul className="space-y-2 text-sm">
                <li className="text-start">Email: andy.privatedriver@gmail.com</li>
                <li className="text-start">WhatsApp: +86 159 7320 0512</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>{t('ft_copy')}</p>
          </div>
        </div>
      </footer>

      {/* --- WhatsApp 悬浮按钮 --- */}
      <a href="https://wa.me/8615973200512" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Contact us on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span>{t('whatsapp_float')}</span>
      </a>
    </div>
  );
}
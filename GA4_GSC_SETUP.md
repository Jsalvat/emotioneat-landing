# Google Analytics 4 & Google Search Console Setup Guide

## 🚀 Configuración de GA4 y GSC

### Paso 1: Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Google Analytics 4 - ID de medición
PUBLIC_GA4_ID=G-XXXXXXXXXX

# Google Search Console - Código de verificación
PUBLIC_GSC_VERIFICATION_CODE=your_verification_code_here

# App Configuration
PUBLIC_APP_URL=https://your-app-domain.com
```

## 📊 Google Analytics 4 (GA4)

### Cómo obtener el ID de GA4:

1. **Ve a Google Analytics**: https://analytics.google.com/
2. **Crea una nueva propiedad** o selecciona una existente
3. **Ve a "Administrar"** (ícono de engranaje)
4. **Flujos de datos** > **Web**
5. **Copia el "ID de medición"** (formato: G-XXXXXXXXXX)
6. **Pégalo en `.env`** como `PUBLIC_GA4_ID`

### Qué mide GA4 automáticamente:
- ✅ **Páginas vistas** por idioma (EN/ES)
- ✅ **Tiempo en página** y **tasa de rebote**
- ✅ **Origen del tráfico** (orgánico, directo, social)
- ✅ **Conversiones** (CTA clicks, form submissions)
- ✅ **Comportamiento móvil** vs desktop
- ✅ **Eventos personalizados** (puedes añadir más)

## 🔍 Google Search Console (GSC)

### Cómo obtener el código de verificación:

1. **Ve a Google Search Console**: https://search.google.com/search-console/
2. **Añade propiedad** > **URL prefix** o **Domain**
3. **Ingresa tu dominio**: `https://emotioneat.com`
4. **Selecciona "HTML tag"** para verificación
5. **Copia el código de verificación** del meta tag
6. **Pégalo en `.env`** como `PUBLIC_GSC_VERIFICATION_CODE`

### Qué te da GSC:
- ✅ **Posicionamiento en búsquedas** para tus keywords
- ✅ **Impresiones y clicks** de Google
- ✅ **Palabras clave** que usan los usuarios
- ✅ **Errores de indexación** y **problemas técnicos**
- ✅ **Datos móviles** vs desktop
- ✅ **Cobertura de indexación**

## 📈 Métricas a Monitorear

### GA4 KPIs principales:
- **Tráfico orgánico** por mes
- **Tasa de conversión** de visitantes a usuarios
- **Páginas más vistas** (EN vs ES)
- **Tiempo promedio en página**
- **Eventos importantes** (CTA clicks, form submissions)

### GSC KPIs principales:
- **Posicionamiento promedio** para keywords principales
- **CTR (Click-Through Rate)** de resultados orgánicos
- **Número de páginas indexadas**
- **Errores de rastreo** (404s, etc.)

## 🎯 Próximos Pasos

1. **Configura las variables** en `.env`
2. **Despliega a producción** para que GA4 y GSC funcionen
3. **Espera 24-48 horas** para que los datos empiecen a aparecer
4. **Configura goals** en GA4 para medir conversiones
5. **Revisa semanalmente** el rendimiento SEO

## 🔧 Configuración Avanzada (Opcional)

### Eventos Personalizados GA4:
```javascript
// En tus componentes, puedes añadir eventos personalizados:
gtag('event', 'cta_click', {
  event_category: 'engagement',
  event_label: 'hero_primary_cta',
  page_language: 'es' // o 'en'
});
```

### E-commerce Tracking:
Si añades compras en el futuro, puedes configurar seguimiento de comercio electrónico.

## 📞 Soporte

Si tienes problemas con la configuración:
- **GA4**: https://support.google.com/analytics
- **GSC**: https://support.google.com/webmasters

---

**Estado**: ✅ **GA4 y GSC integrados en el código**
**Próximo paso**: Configurar las variables de entorno y desplegar

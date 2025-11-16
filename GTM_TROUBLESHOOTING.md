# 🔍 Google Tag Manager - Guía de Troubleshooting

## ✅ Verificación del Código Implementado

El código GTM está correctamente implementado en `src/layouts/Layout.astro`:

### En `<head>` (líneas 115-125):
```html
<!-- Google Tag Manager -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PCW4M72');
</script>
<!-- End Google Tag Manager -->
```

### En `<body>` (líneas 253-259):
```html
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PCW4M72"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
```

## 🔧 Pasos para Verificar y Solucionar

### 1. Verificar Variable de Entorno en Netlify

1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Selecciona tu sitio
3. **Site settings** → **Environment variables**
4. Verifica que existe:
   - **Key**: `PUBLIC_GTM_ID`
   - **Value**: `GTM-5PCW4M72`
5. Si no existe, créala y **redespliega** el sitio

### 2. Verificar el HTML Renderizado en Producción

1. Abre tu sitio en producción: `https://emotioneat.com`
2. **Click derecho** → **Ver código fuente** (o `Ctrl+U`)
3. Busca `GTM-5PCW4M72` en el código fuente
4. Debes ver:
   - El `<script>` completo en `<head>`
   - El `<noscript>` con el iframe en `<body>`

**Si NO ves el código:**
- La variable `PUBLIC_GTM_ID` no está configurada en Netlify
- O el build no se ha ejecutado después de configurarla

### 3. Verificar con Google Tag Assistant

1. Instala [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abre tu sitio en producción
3. Click en el icono de Tag Assistant
4. Click en **Enable**
5. Recarga la página
6. Deberías ver:
   - ✅ **Google Tag Manager** detectado
   - ✅ Tu contenedor `GTM-5PCW4M72` listado

**Si NO aparece:**
- El código no se está renderizando correctamente
- O hay un error de JavaScript bloqueando la carga

### 4. Verificar con Google Tag Manager Preview Mode

**⚠️ PROBLEMA COMÚN: Tag Assistant detecta GTM pero Preview Mode no funciona**

Si Tag Assistant detecta GTM pero Preview Mode no conecta, sigue estos pasos:

1. **Verifica el formato del código en producción:**
   - Abre `https://emotioneat.com`
   - Click derecho → Ver código fuente
   - Busca el script de GTM
   - El código debe verse exactamente así (sin espacios extra, sin saltos de línea incorrectos):
   ```html
   <script>
   (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-5PCW4M72');
   </script>
   ```

2. **Habilita cookies de terceros:**
   - Chrome: Configuración → Privacidad y seguridad → Cookies → Permitir todas las cookies
   - O prueba en modo incógnito con cookies habilitadas

3. **Desactiva extensiones:**
   - AdBlock, Ghostery, uBlock Origin pueden bloquear Preview Mode
   - Desactívalas temporalmente o usa modo incógnito

4. **Verifica permisos en GTM:**
   - Ve a GTM → Admin → User Management
   - Asegúrate de tener permisos de **Edit** o **Publish** (no solo View)

5. **Prueba Preview Mode:**
   - Ve a [Google Tag Manager](https://tagmanager.google.com/)
   - Selecciona tu contenedor `GTM-5PCW4M72`
   - Click en **Preview** (arriba a la derecha)
   - Ingresa tu URL: `https://emotioneat.com`
   - Click en **Connect**
   - Deberías ver:
     - ✅ **Container Loaded** en verde
     - ✅ Los tags configurados (GA4, etc.)
     - ✅ El panel de debug a la izquierda

**Si sigue sin funcionar:**
- Verifica que el GTM ID en el código coincida exactamente con el contenedor
- Asegúrate de que el código esté en `<head>` (no en `<body>`)
- Verifica que no haya errores de JavaScript en la consola

### 5. Verificar en la Consola del Navegador

1. Abre tu sitio en producción
2. **F12** → **Console**
3. Busca errores relacionados con:
   - `googletagmanager.com`
   - `GTM`
   - `dataLayer`

**Errores comunes:**
- `Failed to load resource: net::ERR_BLOCKED_BY_CLIENT` → Adblocker bloqueando GTM
- `GTM is not defined` → El script no se cargó
- `Container ID not found` → El GTM ID es incorrecto

### 6. Verificar que GA4 esté Configurado en GTM

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Selecciona tu contenedor `GTM-5PCW4M72`
3. Ve a **Tags** → Verifica que existe un tag de tipo **Google Analytics: GA4 Configuration**
4. El tag debe tener:
   - **Measurement ID**: Tu GA4 ID (ej: `G-XXXXXXXXXX`)
   - **Triggering**: **All Pages**

**Si el tag no existe:**
- Crea un nuevo tag:
  - **Tag Type**: Google Analytics: GA4 Configuration
  - **Measurement ID**: Tu `PUBLIC_GA4_ID`
  - **Triggering**: All Pages
- Guarda y **Publica** el contenedor

## 🚨 Problemas Comunes y Soluciones

### Problema: "GTM está en el código pero Google no lo detecta"

**Causas posibles:**
1. ❌ Variable `PUBLIC_GTM_ID` no configurada en Netlify
2. ❌ Build no ejecutado después de configurar la variable
3. ❌ Adblocker bloqueando GTM
4. ❌ Código no renderizado correctamente

**Solución:**
1. Verifica la variable en Netlify
2. Haz un nuevo deploy
3. Verifica el código fuente en producción
4. Prueba en modo incógnito (sin adblockers)

### Problema: "GTM detectado pero GA4 no funciona"

**Causa:**
- GA4 no está configurado dentro de GTM

**Solución:**
1. Ve a GTM → Tags
2. Crea un tag de tipo **Google Analytics: GA4 Configuration**
3. Configura tu Measurement ID
4. Trigger: All Pages
5. Publica el contenedor

### Problema: "Duplicación de eventos GA4"

**Causa:**
- Tienes GA4 directo Y GA4 en GTM activos al mismo tiempo

**Solución:**
- El código ya está configurado para evitar esto:
  - Si `PUBLIC_GTM_ID` existe → Solo carga GTM
  - Si `PUBLIC_GTM_ID` NO existe → Solo carga GA4 directo
- Verifica que solo tengas una configuración activa

## 📋 Checklist Final

- [ ] Variable `PUBLIC_GTM_ID` configurada en Netlify
- [ ] Build ejecutado después de configurar la variable
- [ ] Código GTM visible en el HTML fuente de producción
- [ ] Tag Assistant detecta GTM
- [ ] GTM Preview Mode funciona
- [ ] GA4 configurado dentro de GTM
- [ ] Contenedor GTM publicado
- [ ] Sin errores en la consola del navegador

## 🆘 Si Nada Funciona

1. **Verifica el código fuente en producción:**
   - Busca `GTM-5PCW4M72`
   - Debe aparecer en el `<script>` y en el `<noscript>`

2. **Verifica las variables de entorno:**
   - Netlify Dashboard → Environment variables
   - Asegúrate de que `PUBLIC_GTM_ID` tiene el valor correcto

3. **Haz un nuevo deploy:**
   - Netlify Dashboard → Deploys → Trigger deploy

4. **Contacta soporte:**
   - Si el código está correcto pero GTM no lo detecta, puede ser un problema de Google Tag Manager


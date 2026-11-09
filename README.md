# Maison Atelier | Haute-Couture ERP & Management System

Sistema de gestión profesional para alta costura y diseño de moda (Catálogo, Matriz de Tallas/Colores, Control de Stock en tiempo real, POS y Analíticas), optimizado para rendimiento y seguridad con soporte multi-idioma (10 países y divisas) y modo claro/oscuro.

## 🚀 Despliegue en Render.com

1. Sube este repositorio a **GitHub**.
2. En [Render Dashboard](https://dashboard.render.com/), haz clic en **New +** -> **Static Site**.
3. Conecta tu repositorio de GitHub.
4. Render detectará automáticamente la configuración del archivo `render.yaml` o utiliza estos valores:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Haz clic en **Create Static Site**.

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Generar build de producción
npm run build
```

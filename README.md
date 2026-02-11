# Explorador de Nodos - Prueba Técnica Grupo Apok

Este proyecto es una aplicación web responsive desarrollada con **Vue 3** y **TypeScript** que permite visualizar, navegar y gestionar una estructura jerárquica de nodos a través de una API REST.

## 🚀 Tecnologías Utilizadas

*   **Framework**: Vue 3 (Composition API + Setup Script)
*   **Build Tool**: Vite
*   **Lenguaje**: TypeScript
*   **Estado Global**: Pinia
*   **Routing**: Vue Router
*   **Cliente HTTP**: Axios
*   **Internacionalización**: Vue I18n
*   **UI Components**: Shadcn-vue (Radix UI + Tailwind CSS)
*   **Estilos**: Tailwind CSS v4
*   **Notificaciones**: Vue Sonner
*   **Mock Backend**: JSON Server

## 📋 Funcionalidades Implementadas

### 1. Navegación Jerárquica
*   Visualización de nodos raíz al inicio.
*   Navegación profunda a través de los hijos (drill-down).
*   **Breadcrumbs** interactivos para volver a niveles superiores.
*   Indicadores visuales de carpetas.

### 2. Gestión de Nodos (CRUD)
*   **Creación**: Permite crear nuevos nodos especificando su nombre tanto en **Español** como en **Inglés**.
*   **Eliminación**: Validación estricta que impide eliminar nodos que tengan hijos, garantizando la integridad referencial.
*   **Visualización**: El título del nodo se muestra automáticamente en el idioma seleccionado por el usuario.

### 3. Internacionalización (i18n)
*   Soporte completo para **Español (ES)** e **Inglés (EN)**.
*   Cambio de idioma en tiempo real desde la interfaz.
*   Los nodos almacenan traducciones (`locales: { es: "...", en: "..." }`).

### 4. Interfaz de Usuario (UI/UX)
*   Diseño moderno y limpio.
*   **Tema Oscuro / Claro** persistente.
*   Feedback al usuario mediante **Toasts** (notificaciones) para acciones exitosas o errores (ej: intentar eliminar un padre con hijos).
*   Manejo de estados de carga (`loading`) y errores de API.

## 🛠️ Instalación y Ejecución

Sigue estos pasos para levantar el proyecto localmente.

### Prerrequisitos
*   Node.js (v18+ recomendado)
*   npm

### 1. Clonar e Instalar
```bash
git clone [<URL_DEL_REPOSITORIO>](https://github.com/DevOld112/prueba-tecnica-grupo-apok)
cd vite-project
npm install
```

### 2. Ejecutar el Backend (Mock API)
El proyecto utiliza `json-server` para simular la API REST requerida y soportar la persistencia de datos localmente.

```bash
npm run server
```
> Esto iniciará el servidor en `http://localhost:3010`.

### 3. Ejecutar el Frontend
En una nueva terminal:

```bash
npm run dev
```
> La aplicación estará disponible en `http://localhost:5173`.

---

## 🏗️ Estructura del Proyecto

```
src/
├── api/            # Servicios HTTP (Axios)
├── assets/         # Estilos globales (Tailwind, Sonner)
├── components/     # Componentes Vue reutilizables (UI, Dialogs, Cards)
├── composables/    # Lógica extraída (Hooks reutilizables como useNodes)
├── db/             # Base de datos Mock (db.json, routes.json)
├── i18n/           # Archivos de traducción (en.json, es.json)
├── stores/         # Estado global (Pinia)
├── types/          # Definiciones de tipos TypeScript
└── views/          # Vistas principales (HomeView)
```

## 📝 Notas de Desarrollo

*   **API Mock**: Se configuró `json-server` con un archivo `routes.json` para mapear las rutas especificadas en los requerimientos (`/api/node`, `/api/nodes`) a los endpoints REST estándar.
*   **Patrones**: Se utilizó el patrón `Composable` (`useNodes`) para separar la lógica de negocio de la UI, facilitando el mantenimiento y testeo.
*   **Validación**: La validación de eliminación ("no eliminar si tiene hijos") se realiza tanto en frontend (UI feedback) como lógica preventiva antes de la llamada a la API de eliminación.

---
Desarrollado por **W. Lopez** para la prueba técnica de **Grupo Apok**.

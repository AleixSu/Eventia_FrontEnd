# EventHub - Frontend (WORK IN PROGRESS)

Aplicación web construida con **React**, **Vite** y **React Router** para la gestión de eventos y localizaciones.

Interfaz responsive que consume la API REST de EventHub, permitiendo registro de usuarios, navegación de eventos, inscripciones y gestión de perfil.

---

## Aplicación desplegada

Frontend (Vercel):
https://eventiafest.vercel.app/

Repositorio Backend:
https://github.com/AleixSu/Eventia_BackEnd

Backend desplegado (Render):
https://eventhub-backend-7hna.onrender.com

## Instalación y uso

### 1. Clona el repositorio:

```bash
git clone https://github.com/AleixSu/Project13.Final_Project_FrontEnd.git
```

### 2. Entra al directorio del frontend:

```bash
cd frontend
```

### 3. Instala dependencias:

```bash
npm install
```

### 4. Crea archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_URL=http://localhost:5173
```

Para producción, usa la URL de tu backend desplegado:

```env
VITE_API_URL=https://tu-backend.onrender.com/api/v1
VITE_APP_URL=https://tu-dominio.vercel.app
```

### 5. Inicia servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 6. Build para producción:

```bash
npm run build
```

### 7. Preview del build:

```bash
npm run preview
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Forms/
│   │   ├── adminForms/
│   │   ├── eventComponents/
│   │   │   └── attendeesList/
│   │   ├── EventsList/
│   │   ├── filterBox/
│   │   ├── homeElements/
│   │   ├── LocationList/
│   │   ├── loginRegisterForms/
│   │   ├── searchBox/
│   │   ├── updateEventInfo/
│   │   ├── updateInfoProfile/
│   │   └── updateLocationInfo/
│   ├── Layout/
│   │   ├── banner/
│   │   └── header/
│   └── UI/
│       ├── button/
│       ├── card/
│       ├── deleteMessage/
│       ├── inputDOM/
│       └── loadingIcon/
├── constants/
├── context/
├── pages/
│   ├── adminArea/
│   ├── event/
│   ├── home/
│   ├── location/
│   ├── loginRegister/
│   ├── myProfile/
│   └── RouteNotFound/
├── utils/
│   ├── api/
│   │   ├── queries/       # Hooks de TanStack Query por endpoint
│   │   └── api.js         # Utilidad centralizada de fetch
│   └── Hooks/             # Custom hooks reutilizables
│       ├── useDebounce.jsx
│       └── useScrollToTop.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## Funcionalidades

### Autenticación

- ✅ Registro de usuarios con validación
- ✅ Login mediante JWT almacenado en cookies httpOnly
- ✅ Persistencia de sesión automática
- ✅ Protección de rutas privadas
- ✅ Logout seguro

### Perfil de usuario

- ✅ Visualización de perfil
- ✅ Edición de datos personales
- ✅ Subida de foto de perfil
- ✅ Visualización de eventos inscritos

### Eventos

- ✅ Listado de todos los eventos
- ✅ Filtrado por país/localización
- ✅ Detalle de evento
- ✅ Inscripción a eventos
- ✅ Cancelación de inscripción
- ✅ Visualización de aforo disponible

### Localizaciones

- ✅ Listado de países/localizaciones
- ✅ Eventos por localización
- ✅ Navegación entre localizaciones

### UI/UX

- ✅ Diseño responsive (mobile-first)
- ✅ Navegación fluida con React Router
- ✅ Mensajes de éxito/error
- ✅ Loading states
- ✅ Imágenes optimizadas con Cloudinary
- ✅ SEO por página con React Helmet Async

---

## Tecnologías usadas

### Core

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento

### Gestión de estado y datos

- **Context API** - Estado global (autenticación)
- **TanStack Query** - Fetching, caché y sincronización del estado del servidor
- **React Hook Form** - Manejo de formularios

### SEO

- **React Helmet Async** - Gestión dinámica de metadatos por página

### Estilos

- **CSS Modules** - Estilos encapsulados
- **CSS Custom Properties** - Variables CSS

### Otras

- **Cookies httpOnly** - Persistencia segura de sesión JWT

---

## Autenticación y Context

El proyecto usa **Context API** para manejar el estado global de autenticación.

La autenticación funciona mediante cookies `httpOnly` enviadas automáticamente por el navegador en cada petición gracias a `credentials: 'include'`.

El frontend nunca tiene acceso directo al JWT, aumentando la seguridad frente a ataques XSS.

```javascript
// AuthContext proporciona:
- user: Datos del usuario autenticado
- isAuthenticated: Boolean
- loading: Boolean para estados de carga
- logIn(email, password): Función de login
- registerUser(nickName, email, password): Función de registro
- logOut(): Función de logout
- updateUser(updatedUserData): Actualiza el usuario en contexto
```

Al cargar la aplicación, el contexto realiza automáticamente una petición a:

```javascript
GET /users/profile
```

Si la cookie JWT es válida, el backend devuelve el usuario autenticado y restaura la sesión automáticamente.

---

## API Integration — TanStack Query

Toda la capa de fetching está implementada con **TanStack Query**, eliminando el patrón manual de `useEffect` + `useState` para gestionar estado del servidor.

Cada endpoint tiene su propio hook en `utils/api/queries/`, separados por dominio (`events`, `users`, `locations`):

- `useQuery` para operaciones de lectura (GET), con caché automática y revalidación en segundo plano.
- `useMutation` para operaciones de escritura (POST, PATCH, DELETE), con `queryClient.invalidateQueries` para mantener los datos sincronizados tras cada mutación.
- Los estados `isPending`, `isError` e `isSuccess` sustituyen por completo el estado local vinculado al servidor.

```javascript
// Ejemplo de hook de query — utils/api/queries/events/useGetEvents.js
const useGetEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => API({ endpoint: '/events', method: 'GET' })
  })
}

// Ejemplo de hook de mutación — utils/api/queries/events/useCreateEvent.js
const useCreateEvent = (token) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData) =>
      API({ endpoint: '/events', method: 'POST', body: formData, token }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] })
  })
}
```

La utilidad centralizada de fetch se mantiene en `utils/api/api.js`:

```javascript
API({
  endpoint: '/users/login',
  method: 'POST',
  body: { email, password }
})
```

El `QueryClient` está configurado globalmente en `main.jsx` con `refetchOnWindowFocus: false` para evitar refetches innecesarios al cambiar de pestaña.

---

## SEO — React Helmet Async

El SEO se gestiona con **React Helmet Async**, con metadata definida individualmente en cada página.

- Cada página define su propio `<title>`, `<meta name="description">` y `<link rel="canonical">`.
- Las páginas privadas (perfil, admin) incluyen directivas `noindex, nofollow` para evitar su indexación.
- Los metadatos se actualizan dinámicamente en cada cambio de ruta.

```jsx
<Helmet>
  <title>EventHub — Discover Events</title>
  <meta name="description" content="Find and join events near you." />
  <link rel="canonical" href={`${import.meta.env.VITE_APP_URL}/events`} />
</Helmet>

// Páginas privadas
<Helmet>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
```

---

## Custom Hooks

La lógica reutilizable está centralizada en `utils/Hooks/`:

**`useDebounce(value, delay)`**
Retrasa la actualización de un valor hasta que el usuario deja de escribir. Usado en el buscador de asistentes para evitar peticiones en cada tecla.

```javascript
const debouncedSearch = useDebounce(searchQuery, 500)

useEffect(() => {
  if (!debouncedSearch.trim()) return
  searchMutation.mutate({ searchQuery: debouncedSearch })
}, [debouncedSearch])
```

**`useScrollToTop()`**
Escucha los cambios de ruta mediante `useLocation` y hace scroll al inicio de la página en cada navegación. Montado directamente en `App.jsx`.

```javascript
// App.jsx
function App() {
  useScrollToTop()
  return (...)
}
```

---

## Diseño

### Paleta de colores

Definida en `index.css` mediante CSS Custom Properties:

```css
:root {
  --color-primary: #tu-color-primario;
  --color-secondary: #tu-color-secundario;
  --color-bg: #tu-color-fondo;
  --color-text: #tu-color-texto;
}
```

### Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Testing local

1. Asegúrate de que el backend esté corriendo
2. Configura la URL correcta en `.env`
3. Ejecuta `npm run dev`
4. Prueba las siguientes rutas:
   - `/` - Home
   - `/Events` - Listado de eventos
   - `/Locations` - Localizaciones
   - `/profile` - Perfil (requiere autenticación)
   - `/admin_area` - Panel de administración (requiere rol admin)

---

## Despliegue

### Recomendado: Vercel

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Selecciona el directorio `frontend`
4. Configura las variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api/v1
   VITE_APP_URL=https://tu-dominio.vercel.app
   ```
5. Deploy automático

### Alternativas

- **Netlify**
- **GitHub Pages**
- **Render**

---

## Variables de entorno

```env
# Desarrollo
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_URL=http://localhost:5173

# Producción
VITE_API_URL=https://tu-backend-production.onrender.com/api/v1
VITE_APP_URL=https://tu-dominio.vercel.app
```

**Nota:** Las variables deben empezar con `VITE_` para ser accesibles en Vite.

---

## Problemas conocidos y soluciones

### CORS errors

- Asegúrate de que el backend tenga configurado CORS correctamente
- Verifica que la URL del API sea la correcta

### Imágenes no cargan

- Verifica la configuración de Cloudinary
- Asegúrate de que las URLs de las imágenes sean correctas

### Canonical URL indefinida

- Asegúrate de que `VITE_APP_URL` esté definida tanto en `.env` local como en las variables de entorno de Vercel
- Sin esta variable el canonical se renderizará como `undefined/ruta`

---

## Autor

**Aleix Suero Corral**
GitHub: [@AleixSu](https://github.com/AleixSu/)

---

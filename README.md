# EventHub - Frontend (WORK IN PROGRESS)

Aplicación web construida con **React**, **Vite** y **React Router** para la gestión de eventos y localizaciones.

Interfaz responsive que consume la API REST de EventHub, permitiendo registro de usuarios, navegación de eventos, inscripciones y gestión de perfil.

---

## Aplicación desplegada

Frontend (Vercel):
https://project13-final-project-front-end.vercel.app/

Repositorio Backend:
https://github.com/AleixSu/Project13.Final_Project_BackEnd

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
```

Para producción, usa la URL de tu backend desplegado:

```env
VITE_API_URL=https://tu-backend.onrender.com/api/v1
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
frontend/
├── public/
│   └── images/           # Imágenes estáticas
├── src/
│   ├── assets/           # Recursos (logos, iconos)
│   ├── components/       # Componentes reutilizables
│   │   ├── Layout/       # Header, Footer, Banner
│   │   └── UI/           # Inputs, Buttons, Cards
│   ├── constants/        # Constantes (rutas de imágenes, etc.)
│   ├── context/          # Context API (AuthContext)
│   ├── pages/            # Páginas principales
│   │   ├── Home/
│   │   ├── Events/
│   │   ├── Locations/
│   │   ├── MyProfile/
│   │   ├── Login/
│   │   └── Register/
│   ├── utils/            # Utilidades (API, helpers)
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── .env                  # Variables de entorno
├── vite.config.js        # Configuración de Vite
└── package.json
```

---

## Funcionalidades

### Autenticación

- ✅ Registro de usuarios con validación
- ✅ Login con JWT
- ✅ Protección de rutas privadas
- ✅ Logout

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

---

## Tecnologías usadas

### Core

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento

### Gestión de estado

- **Context API** - Estado global (autenticación)
- **React Hook Form** - Manejo de formularios

### Estilos

- **CSS Modules** - Estilos encapsulados
- **CSS Custom Properties** - Variables CSS

### Otras

- **Fetch API** - Peticiones HTTP
- **localStorage** - Persistencia de token

---

## Autenticación y Context

El proyecto usa **Context API** para manejar el estado de autenticación:

```javascript
// AuthContext proporciona:
- user: Datos del usuario autenticado
- token: JWT token
- isAuthenticated: Boolean
- loading: Boolean para estados de carga
- logIn(email, password): Función de login
- registerUser(nickName, email, password): Función de registro
- logOut(): Función de logout
```

---

## API Integration

La aplicación se comunica con el backend mediante una utilidad centralizada:

```javascript
// utils/api/api.js
API({
  endpoint: '/users/login',
  method: 'POST',
  body: { email, password },
  isJSON: true,
  token: 'optional-token'
})
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
   - `/events` - Listado de eventos
   - `/locations` - Localizaciones
   - `/login` - Iniciar sesión
   - `/register` - Registro
   - `/profile` - Perfil (requiere autenticación)

---

## Despliegue

### Recomendado: Vercel

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Selecciona el directorio `frontend`
4. Configura las variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api/v1
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

# Producción
VITE_API_URL=https://tu-backend-production.onrender.com/api/v1
```

**Nota:** Las variables deben empezar con `VITE_` para ser accesibles en Vite.

---

## Problemas conocidos y soluciones

### CORS errors

- Asegúrate de que el backend tenga configurado CORS correctamente
- Verifica que la URL del API sea la correcta

### Token expirado

- El token JWT tiene una duración limitada
- Implementa refresh token o relogin automático

### Imágenes no cargan

- Verifica la configuración de Cloudinary
- Asegúrate de que las URLs de las imágenes sean correctas

---

## Autor

**Aleix Suero Corral**  
GitHub: [@AleixSu](https://github.com/AleixSu/)

---

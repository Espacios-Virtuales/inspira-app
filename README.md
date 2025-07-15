# 🌟 Inspira App – Visión Estratégica

**Versión**: 0.1  
**Última actualización**: 2025-06-13  
**Autor**: David Utreras  
**Proyecto raíz**: Espacios Virtuales

---

## 🎯 Propósito

Inspira es la interfaz viva de **Espacios Virtuales**, diseñada para ofrecer una experiencia intuitiva, hermosa y funcional que facilite la conexión entre emprendedores conscientes, herramientas digitales y procesos formativos. Es más que un panel: es un puente entre la visión y la acción.

---

## 🌱 Rol de Inspira dentro del Ecosistema

| Módulo               | Función principal                                             |
|----------------------|--------------------------------------------------------------|
| `espacios-virtuales-api` | Fuente única de datos vía REST API                        |
| `Inspira` (esta app)     | Interfaz para usuarios y administradores                   |
| `Raíces`                 | Programa de formación y activación                        |
| `Aura Digital`           | Herramienta futura para gestión de proyectos              |

---

## 🧠 Filosofía de Diseño

- **Modularidad:** Componentes reutilizables y claros.
- **Belleza funcional:** Diseño SCSS con tonos inspirados en la naturaleza y la elegancia.
- **Accesibilidad:** Interacción simplificada, sin sobrecarga cognitiva.
- **Identidad visual viva:** Logo, colores y fuentes coherentes con la estética de Espacios Virtuales.

---

## 👥 Tipos de Usuario

| Rol         | Descripción                                             |
|-------------|---------------------------------------------------------|
| Usuario     | Emprendedor que accede a su perfil, datos y formación. |
| Administrador | Facilitador que gestiona usuarios, módulos y analítica.|

---

## 🔐 Seguridad & Accesos

- Autenticación vía JWT
- Roles definidos en backend
- Vuex maneja sesión y permisos
- Rutas protegidas dinámicamente por rol

---

## 🧭 Flujo General

```
Inicio (Login)
  └── Validación → Dashboard
       ├── Si es ADMIN → Panel de control (gestión de usuarios, analítica)
       └── Si es USER → Panel personal (perfil, progreso, módulos)
```

---

## 📐 Componentes Clave

- `ComponentNav` → Navegación superior (responsiva)
- `ComponentSidebar` → Acceso a secciones clave por rol
- `ComponentFooter` → Firma visual de Espacios Virtuales
- `ComponentAnnouncement` → Barra de bienvenida y toggles
- `views/` → Vistas por rol y propósito

---

## 🔮 Futuro: Extensiones

- Integración con Liora (asistente virtual GPT)
- Soporte de archivos, descargas y progresos personalizados
- Dashboard analítico para admins
- Notificaciones en tiempo real
- Aura Digital: conexión con herramientas como Odoo y Payload

---

## 📎 Notas finales

Este documento guía el desarrollo no solo técnico, sino también **espiritual y visual** de Inspira, alineado con los valores del proyecto madre. Debe actualizarse conforme evolucione la plataforma.
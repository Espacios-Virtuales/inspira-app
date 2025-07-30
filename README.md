# ✅ Checklist de Desarrollo – Inspira App

**Versión:** 0.2  
**Actualizado:** 2025-07-30  
**Autor:** David Utreras   
**Proyecto Independiente:** Inspira - Espacios Virtuales

---

## 📘 Visión General

**Inspira App** es la interfaz modular del ecosistema **Espacios Virtuales**, diseñada para ser una experiencia estética, intuitiva y conectada a la acción consciente.

Actúa como un canal donde se **visualiza el impacto regenerativo**, se accede a contenidos transformadores y se conecta con la comunidad en resonancia con la Tierra.

---

## 📊 Fases y Sprints

| Fase         | Sprint | Tarea                  | Descripción                                                  | Estado         |
|--------------|--------|------------------------|--------------------------------------------------------------|----------------|
| 🌱 Base      | 1.1    | 🎨 Refactor UI Layout   | Unificación de `Nav`, `Sidebar`, `Footer` con SCSS base      | ✅ Completado  |
|              | 1.2    | 🔐 Login JWT            | Conexión con `espacios-virtuales-api`, validación con roles  | ✅ Completado  |
|              | 1.3    | 🧠 Vuex Modular         | Módulos Vuex: `auth`, `layout`, `analytics`, `data`          | ✅ Completado  |
|              | 1.4    | 🧭 Sidebar Interactivo  | Toggle con transición suave y cierre programático            | ✅ Completado  |
|              | 1.5    | 📦 Estructura limpia    | Limpieza de componentes, backup de legacy                    | ✅ Completado  |
|              | 1.6    | 💡 Footer institucional | `ComponentFooter` con branding armonizado en SCSS            | 🟡 En progreso |
| 🌿 Expansión | 2.1    | 📊 Dashboard por rol    | `admin/analitica`, `user/perfil` con datos dinámicos         | 🔲 Pendiente   |
|              | 2.2    | 📤 Subida de archivos   | Integración con `upload-files-service`                       | 🔲 Pendiente   |
|              | 2.3    | 🔔 Notificaciones UI    | Mensajes del sistema con estilo intuitivo                    | 🔲 Pendiente   |
|              | 2.4    | 📄 Página pública       | Página inicial accesible a no autenticados                   | 🔲 Pendiente   |

---

## 📂 Estructura Modular

```
inspira-app/
├── assets/
│   └── icons/
├── components/
│   ├── navs/
│   ├── sidebars/
│   └── footers/
├── services/
│   └── auth, analytics, upload
├── store/
│   └── modules/ → auth, layout, analytics, data
├── views/
│   ├── login, perfil, admin/
├── App.vue, main.js
```

---

## 🎨 Estética & UX

- SCSS modular con identidad visual natural y armónica.
- Animaciones suaves y responsividad.
- Íconos: Bootstrap Icons + FontAwesome.
- Colores variables CSS (`--bs-primary`, `--bs-secondary`, `--bs-selector`).

---

## 🧭 Seguimiento

Este archivo evoluciona junto con la visión regenerativa del ecosistema.

> 🌿 *Inspira no es solo una interfaz, es una experiencia que honra la Tierra con cada línea de código.*

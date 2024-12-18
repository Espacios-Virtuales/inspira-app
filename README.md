# Inspira-App

**Interfaz del sistema de administración y conversión de audiencias para terapeutas y músicos.**

---

## **Misión**

La misión de **Inspira-App** es **potenciar el crecimiento profesional y creativo de terapeutas y músicos**, proporcionando una herramienta integral que simplifica la gestión de su negocio y maximiza el impacto de su contenido en las audiencias.

Inspira-App conecta a los usuarios con servicios clave, optimizando la interacción entre plataformas, y permite la creación de experiencias digitales personalizadas para atraer, fidelizar y convertir audiencias en clientes comprometidos.

---

## **Project setup**

### Instalación del proyecto

npm install

npm run build

npm run lint


## Configuración personalizada
Consulta la [Referencia de Configuración](https://espaciosvirtuales.cl/inspira/document).

---

## Arquitectura de Comunicación

### **1. Interacción con los servicios**
La interfaz de Inspira-App se comunica con diferentes servicios para ofrecer una experiencia integral a los usuarios. A continuación, se describen las conexiones principales:

#### **Odoo ERP (Gestión de Negocios)**
- **Propósito:** Administrar facturación, inventarios y agendamiento.
- **Comunicación:** A través de una API REST para sincronizar datos en tiempo real, como pagos de clientes y creación de facturas automáticas.

#### **WooCommerce (e-Commerce)**
- **Propósito:** Gestionar productos digitales, sesiones privadas y eventos en línea.
- **Comunicación:** Sincronización automática de ventas, inventario y creación de pedidos en WooCommerce desde Inspira-App.

#### **Google Calendar (Gestión de Eventos)**
- **Propósito:** Programar y gestionar horarios de sesiones, eventos o talleres.
- **Comunicación:** Inspira-App envía y recibe datos mediante la API de Google Calendar para coordinar las agendas de terapeutas y clientes.

#### **Servicios Propios (Automatización de Correos y Gestión de Audiencias)**
- **Propósito:** Centralizar y automatizar la comunicación con audiencias utilizando herramientas propias de Espacios Virtuales.
- **Funcionalidades destacadas:**
  - Segmentación de listas según comportamiento o intereses.
  - Creación de campañas de correo electrónico personalizadas.
  - Automatización de secuencias de seguimiento (nurturing).
  - Análisis y métricas en tiempo real para optimizar estrategias.

#### **FastAPI (Chatbot Educativo - Liora)**
- **Propósito:** Brindar soporte interactivo y educativo para los usuarios mediante un chatbot especializado.
- **Comunicación:** La interfaz utiliza peticiones HTTP para interactuar con Liora, ofreciendo recomendaciones, tutoriales y respuestas rápidas.

---

### **2. Flujo de datos**

#### **Frontend (Vue.js)**
- Proporciona una interfaz amigable y responsiva para terapeutas y músicos.
- Procesa la interacción del usuario y envía solicitudes a través de Axios hacia los servicios integrados.

#### **Backend (API Central)**
- Maneja la lógica empresarial, orquesta la comunicación entre servicios y gestiona el almacenamiento de datos.
- Garantiza la seguridad de las transacciones y la consistencia de los datos entre plataformas.

#### **Bases de Datos**
- Inspira-App utiliza una base de datos relacional para almacenar información clave de usuarios, clientes y eventos, asegurando integridad y rapidez en las consultas.

---

## **Características futuras**
- **Dashboard personalizado:** Visualización en tiempo real de métricas clave, como conversiones y engagement.
- **Integración con redes sociales:** Publicación automática de contenido y análisis del impacto en plataformas como Instagram y Facebook.
- **Machine Learning:** Recomendaciones personalizadas basadas en patrones de comportamiento de las audiencias.



#### **¿Tienes preguntas o deseas más detalles sobre la implementación? [Visítanos en Espacios Virtuales](https://espaciosvirtuales.cl).**

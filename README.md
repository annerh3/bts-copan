# BTS Copán — Sistema de Permisos Escolares

Prototipo desarrollado durante el hackathon Build To Solve, construido en aproximadamente 2 horas.

La idea del proyecto es digitalizar el proceso de solicitud y gestión de permisos escolares entre padres de familia y la consejería de un centro educativo.

## ¿Qué logramos construir?

Durante el hackathon desarrollamos un flujo funcional que permite:

- Ingresar un número de teléfono desde el portal de padres.
- Generar un enlace de acceso asociado al padre y estudiante.
- Validar el acceso mediante un token.
- Mostrar un formulario para solicitar un permiso escolar.
- Consultar el estado de la solicitud.
- Visualizar las solicitudes desde un dashboard para consejería.
- Consultar información almacenada en Supabase.

## Flujo planteado
```

Padre de familia
      │
      ▼
Ingresa su teléfono
      │
      ▼
Recibe enlace de acceso
      │
      ▼
Completa solicitud de permiso
      │
      ▼
Consejería revisa la solicitud
      │
      ├── Aprobar
      └── Rechazar
```

## Estado del proyecto

Este repositorio contiene el prototipo alcanzado durante el tiempo del hackathon, por lo que algunas funcionalidades quedaron simuladas o incompletas.

Por ejemplo:

- El formulario de solicitud aún no guarda el permiso en la base de datos.
- Aprobar o rechazar una solicitud actualmente solo modifica el estado en el cliente.
- El dashboard administrativo todavía no cuenta con autenticación.
- Faltan algunos flujos y validaciones para convertirlo en una aplicación lista para producción.

## Tecnologías

- React
- TypeScript
- Vite
- Supabase
- Supabase Edge Functions
- TanStack Query
- shadcn/ui
- Tailwind CSS

## Contexto

El objetivo durante Build To Solve fue validar rápidamente la idea y construir la mayor parte posible del flujo principal dentro del tiempo disponible, priorizando un prototipo demostrable sobre una implementación completa.
# ADR-003: Límites de entornos y proveedores

- Estado: Accepted
- Fecha: 2026-08-01
- Alcance: ZP-01A

## Contexto

La plataforma todavía no tiene proveedores aprobados ni entornos desplegados. La landing existente ya posee su propio contexto operativo y no puede convertirse en fuente de infraestructura, variables o credenciales.

Es necesario fijar los límites antes de introducir auth, datos, pagos, email, almacenamiento, observabilidad o deployment.

## Decisión

ZP-01A funciona únicamente como código local y validación en GitHub Actions.

Durante esta fase:

- no se crea ni conecta Vercel;
- no se usa ningún dominio;
- no se crea Firebase, Neon, Stripe, Resend, R2, Sentry ni otro proveedor operacional;
- no se crean cuentas, proyectos, bases de datos, buckets, webhooks o secretos;
- no se usan recursos de producción;
- no se reutiliza infraestructura de `zentra-coming-soon`.

Las selecciones de auth, base de datos, pagos, email, almacenamiento y observabilidad permanecen abiertas.

## Separación total de sistemas

`zentra-coming-soon` y `zentra-platform` deben tener:

- repositorios distintos;
- historias distintas;
- proyectos de deployment distintos;
- variables y credenciales distintas;
- dominios y routing explícitamente asignados;
- recursos de proveedor distintos;
- datos y controles de acceso distintos;
- ciclos de release independientes.

No se permite usar IDs, tokens, variables o proyectos de la landing para acelerar la configuración de la plataforma.

## Entornos futuros

| Entorno    | Propósito               | Datos y proveedores                                                     |
| ---------- | ----------------------- | ----------------------------------------------------------------------- |
| Local      | Desarrollo individual   | Mocks o recursos locales o aislados; nunca producción                   |
| Test/CI    | Validación reproducible | Sin red ni secretos salvo autorización futura específica                |
| Preview    | Revisión de PR          | Recursos aislados por entorno; nunca credenciales o datos de producción |
| Production | Servicio real           | Solo tras aprobación, runbook, controles y autorización explícita       |

ZP-01A habilita únicamente local y test/CI. Preview se establece como gate futuro antes de merge, pero no se crea en esta fase.

## Variables y secretos

- No trackear `.env` ni `.env.*`.
- Mantener un registro explícito antes de introducir cualquier variable.
- Las variables públicas deben usar `NEXT_PUBLIC_*` solo cuando su exposición sea intencional.
- Secretos y operaciones sensibles deben permanecer server-side.
- No imprimir secretos en logs, errores, tests o reportes.
- No compartir valores entre preview y producción.
- No usar secretos de producción en CI general.
- Rotar y revocar credenciales según el lifecycle del entorno.
- Mantener privilegios mínimos.

## Proveedores futuros

Antes de añadir un SDK o crear un recurso se requiere:

1. decisión del proveedor;
2. autorización explícita;
3. ADR o actualización de ADR;
4. ownership de cuenta;
5. separación de entornos;
6. registro de variables;
7. permisos mínimos;
8. estrategia de datos y borrado;
9. observabilidad y runbook;
10. pruebas sin dependencia de producción.

Los adapters futuros deben mantener las decisiones de proveedor fuera del dominio comercial cuando sea razonable. Esto no autoriza a crear abstracciones vacías en ZP-01A.

## Deployment y dominio

- No existe proyecto Vercel de plataforma en ZP-01A.
- No se reutiliza el proyecto Vercel de la landing.
- No se configura alias ni dominio.
- No se declara `zentrascent.com` como canonical.
- No se despliega.
- No se toca producción.

Cualquier futura conexión requiere una tarea separada y confirmación del proyecto, organización, entornos y dominio objetivo.

## Preview antes de merge

Una preview aislada y autorizada será obligatoria antes de un merge futuro. Debe:

- pertenecer al proyecto de plataforma;
- usar configuración de preview;
- excluir datos y secretos de producción;
- ser no indexable;
- poder destruirse sin impacto productivo.

El Draft PR de ZP-01A no se mergea y esta ADR no autoriza a crear la preview.

## Consecuencias

- La fundación no depende de disponibilidad externa.
- Se reduce el riesgo de contaminación entre landing, previews y producción.
- Las integraciones se postergan hasta contar con decisiones y ownership.
- La configuración inicial requiere fases explícitas adicionales antes de ofrecer funcionalidad real.

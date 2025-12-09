# WhiteStar - Plan de Implementacion y Mantenimiento

## Tipos de Mantenimiento

El sistema puede necesitar cuatro tipos de mantenimiento:

| Tipo | Que es | Ejemplo |
|------|--------|---------|
| **Correctivo** | Arreglar bugs o errores | Un boton no funciona, la pagina no carga |
| **Adaptativo** | Ajustar a cambios externos | Actualizar por nueva version de Node, cambiar API de pagos |
| **Preventivo** | Evitar problemas futuros | Limpiar base de datos, revisar logs, actualizar dependencias |
| **Mejoras** | Agregar funciones nuevas | Nueva seccion, nuevo reporte, mejora de diseño |

---

## 1. Roles y Responsabilidades

### Equipo de Desarrollo

| Rol | Quien | Que hace |
|-----|-------|----------|
| **Lider tecnico** | Sebastian Vasquez | Decide prioridades, revisa el codigo, aprueba cambios |
| **Frontend** | Paolo Grassi | Arregla y mejora la parte visual (React) |
| **Backend** | Benjamin Flores | Arregla y mejora la API y base de datos |
| **DevOps** | Sebastian Vasquez | Maneja servidores, deploy, backups |

### Responsabilidades diarias

- **Sebastian Vasquez (Lider)**: Revisa los Issues nuevos, asigna tareas, hace code review
- **Paolo y Benjamin**: Trabajan en las tareas asignadas, documentan cambios
- **Sebastian (DevOps)**: Monitorea servidores, revisa alertas, hace deploys

### Responsabilidades semanales

- Reunion de 30 min para ver estado del sistema
- Revisar metricas de rendimiento
- Planificar tareas de la semana

---

## 2. Cronograma de Mantenimiento

### Diario

| Tarea | Responsable | Hora |
|-------|-------------|------|
| Revisar alertas de monitoreo | DevOps | 9:00 |
| Revisar Issues nuevos en GitHub | Lider | 9:30 |
| Backup automatico de BD | Sistema (automatico) | 3:00 AM |

### Semanal

| Tarea | Dia | Responsable |
|-------|-----|-------------|
| Reunion de estado | Lunes | Todo el equipo |
| Revisar logs de errores | Martes | Backend |
| Revisar dependencias desactualizadas | Miercoles | Frontend + Backend |
| Pruebas de restauracion de backup | Viernes | DevOps |

### Mensual

| Tarea | Semana | Responsable |
|-------|--------|-------------|
| Actualizar dependencias menores | 1era semana | Devs |
| Limpiar datos de prueba/logs viejos | 2da semana | DevOps |
| Revisar metricas de uso | 3era semana | Lider |
| Documentar cambios del mes | 4ta semana | Todo el equipo |

### Trimestral

| Tarea | Responsable |
|-------|-------------|
| Actualizar dependencias mayores | Devs + Lider |
| Revisar seguridad (vulnerabilidades) | DevOps |
| Evaluar rendimiento y optimizar | Todo el equipo |
| Capacitacion de nuevas funciones | Lider |

---

## 3. Copias de Seguridad y Recuperacion

### Estrategia de Backups

| Que | Cada cuanto | Donde se guarda | Cuanto tiempo |
|-----|-------------|-----------------|---------------|
| Base de datos completa | Diario 3 AM | Almacenamiento externo (S3/Cloud) | 30 dias |
| Base de datos completa | Semanal domingo | Almacenamiento externo | 3 meses |
| Archivos del servidor | Semanal | Almacenamiento externo | 1 mes |
| Codigo fuente | Cada push | GitHub | Siempre |

### Como hacer backup manual (PostgreSQL)

```bash
# Conectar a Railway y exportar
railway run pg_dump -Fc > backup_$(date +%Y%m%d).dump
```

### Como restaurar

```bash
# Restaurar backup
railway run pg_restore -d railway backup_20241209.dump
```

### Proceso de recuperacion ante desastre

1. **Detectar el problema** - Monitoreo avisa o usuario reporta
2. **Evaluar daño** - Ver que tan grave es
3. **Comunicar** - Avisar al equipo y usuarios si es necesario
4. **Restaurar** - Usar ultimo backup bueno
5. **Verificar** - Probar que todo funcione
6. **Documentar** - Escribir que paso y como se arreglo

### Pruebas de restauracion

Cada viernes el DevOps debe:
1. Tomar el backup del dia anterior
2. Restaurarlo en ambiente de prueba
3. Verificar que los datos esten bien
4. Registrar resultado

---

## 4. Actualizaciones y Parches

### Politica de actualizaciones

| Tipo | Cuando | Quien aprueba |
|------|--------|---------------|
| Parches de seguridad criticos | Inmediato | Lider + DevOps |
| Bug fixes menores | Sprint actual | Lider |
| Dependencias menores | Mensual | Devs |
| Dependencias mayores | Trimestral | Todo el equipo |
| Features nuevos | Segun roadmap | Lider |

### Proceso para actualizar dependencias

1. Crear branch de actualizacion
2. Correr `npm audit` para ver vulnerabilidades
3. Actualizar con `npm update` (menores) o manualmente (mayores)
4. Correr tests
5. Probar en ambiente de staging
6. Code review
7. Merge a main
8. Deploy

### Checklist pre-deploy

- [ ] Tests pasan
- [ ] Code review aprobado
- [ ] Probado en staging
- [ ] Backup reciente disponible
- [ ] Documentacion actualizada
- [ ] Plan de rollback listo

### Proceso de deploy

```bash
# Frontend (Vercel) - automatico con push a main

# Backend (Railway) - automatico con push a main
# O manual:
railway up
```

### Rollback si algo sale mal

1. Identificar el commit problematico
2. Revertir en GitHub: `git revert <commit>`
3. Hacer push para trigger deploy automatico
4. Verificar que se arreglo
5. Investigar que salio mal

---

## 5. Monitoreo del Rendimiento

### Metricas a monitorear

| Metrica | Valor normal | Alerta si |
|---------|--------------|-----------|
| Tiempo de respuesta API | < 200ms | > 500ms |
| Uptime | 99.9% | < 99% |
| Errores 5xx por hora | 0-2 | > 10 |
| Uso de CPU servidor | < 60% | > 80% |
| Uso de memoria | < 70% | > 85% |
| Espacio en disco | < 70% | > 85% |

### Herramientas

| Para que | Herramienta | Frecuencia |
|----------|-------------|------------|
| Uptime y disponibilidad | UptimeRobot / BetterStack | Cada 5 min |
| Logs de errores | Railway logs / Vercel logs | Continuo |
| Rendimiento de BD | Railway metrics | Diario |
| Errores de frontend | Console del navegador | En desarrollo |

### Alertas

Configurar alertas por email/Slack cuando:
- El sitio esta caido mas de 2 minutos
- Hay mas de 10 errores 500 en una hora
- El servidor usa mas del 80% de recursos
- Un backup falla

### Revision semanal de rendimiento

Cada martes revisar:
1. Tiempos de respuesta promedio
2. Endpoints mas lentos
3. Errores mas frecuentes
4. Uso de recursos

---

## 6. Gestion de Incidencias y Soporte

### Niveles de severidad

| Nivel | Descripcion | Tiempo de respuesta | Ejemplo |
|-------|-------------|---------------------|---------|
| **Critico** | Sistema caido, nadie puede usar | 15 minutos | El sitio no carga |
| **Alto** | Funcion principal no anda | 2 horas | No se puede pagar |
| **Medio** | Funcion secundaria falla | 8 horas | Notificaciones no llegan |
| **Bajo** | Problema menor, tiene workaround | 3 dias | Typo en un texto |

### Flujo de incidencias

```
Usuario reporta → Issue en GitHub → Triaje → Asignacion → Resolucion → Verificacion → Cierre
```

### Proceso paso a paso

1. **Reporte**: Usuario abre Issue o manda reclamo en la app
2. **Triaje** (Lider): Lee, clasifica severidad, asigna responsable
3. **Investigacion** (Dev asignado): Reproduce el bug, encuentra la causa
4. **Solucion**: Hace el fix, prueba, abre PR
5. **Review**: Otro dev revisa el codigo
6. **Deploy**: Se sube a produccion
7. **Verificacion**: Se confirma que esta arreglado
8. **Cierre**: Se cierra el Issue con explicacion

### Template para reportar incidencias

```markdown
## Descripcion
[Que pasa]

## Pasos para reproducir
1. [Paso 1]
2. [Paso 2]
3. [Resultado]

## Que deberia pasar
[Lo esperado]

## Capturas/Logs
[Si hay]

## Severidad
[Critico/Alto/Medio/Bajo]
```

### Comunicacion durante incidentes criticos

1. Avisar en canal de equipo (#incidentes)
2. Asignar lider de incidente
3. Actualizar cada 30 min mientras se arregla
4. Notificar a usuarios si es necesario
5. Postmortem despues de resolver

---

## 7. Actualizacion de Documentacion

### Documentos a mantener

| Documento | Ubicacion | Cuando actualizar |
|-----------|-----------|-------------------|
| README.md | Raiz del proyecto | Cuando cambia instalacion o estructura |
| MANUAL_USUARIO.md | Raiz | Cuando cambia una funcion de usuario |
| CAPACITACION_USUARIOS.md | Raiz | Cuando cambia flujo de trabajo |
| Este documento | Raiz | Cuando cambia proceso de mantenimiento |
| API docs (si hay) | /docs | Cuando cambia un endpoint |

### Proceso de actualizacion

1. Cuando terminas un feature o fix, revisa si afecta algun doc
2. Actualiza el doc en el mismo PR si es posible
3. Si es cambio grande, abre Issue aparte para documentar
4. El lider revisa que la doc este al dia en reunion semanal

### Checklist para nuevas funciones

- [ ] Agregado al Manual de Usuario
- [ ] Agregado a Capacitacion si es funcion de staff
- [ ] README actualizado si cambia setup
- [ ] Changelog actualizado

### Versionado de documentacion

Usar fecha de ultima actualizacion al inicio de cada doc:

```markdown
# Documento X
> Ultima actualizacion: 2025-12-09
```

---

## Resumen del Plan

| Area | Responsable principal | Frecuencia de revision |
|------|----------------------|------------------------|
| Backups | DevOps | Diario (automatico) + Viernes (prueba) |
| Monitoreo | DevOps | Continuo + Martes (revision) |
| Actualizaciones | Devs | Mensual (menores) + Trimestral (mayores) |
| Incidencias | Lider + Dev asignado | Segun severidad |
| Documentacion | Todo el equipo | Con cada cambio |

### Contactos de emergencia

| Rol | Contacto |
|-----|----------|
| Lider tecnico | Sebastian Vasquez |
| Frontend | Paolo Grassi |
| Backend | Benjamin Flores |

### Repositorio

- GitHub: https://github.com/Sebaxis07/WhiteStar
- Issues: Para reportar bugs y sugerencias
- Wiki: Para documentacion extendida (si se necesita)

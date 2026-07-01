# API de Usuarios para Auditoria con SonarQube

Proyecto sencillo en Node.js, Express y JavaScript para usar como ejemplo academico en una auditoria de software con SonarQube.

La API simula un sistema pequeno de usuarios usando datos en memoria. No se conecta a una base de datos real.

## Estructura

```text
.
├── package.json
├── README.md
└── src
    ├── app.js
    ├── users.js
    └── database.js
```

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/users` | Lista todos los usuarios simulados |
| GET | `/users/:id` | Busca un usuario por ID |
| POST | `/login` | Simula el inicio de sesion |

## Problemas intencionales para SonarQube

Este proyecto incluye problemas de calidad y seguridad de forma intencional para fines academicos:

1. Credenciales falsas hardcodeadas en `src/database.js`.
2. Codigo duplicado en funciones de `src/users.js`.
3. Posibles errores por `null` o `undefined` en `src/app.js`.
4. Metodo con logica demasiado compleja en `src/users.js`.
5. Variables declaradas que no se usan en varios archivos.

> Importante: las credenciales son falsas y solo sirven para demostrar hallazgos en herramientas de analisis estatico.

## Requisitos

- Node.js 18 o superior
- npm

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

## Pruebas manuales

Listar usuarios:

```bash
curl http://localhost:3000/users
```

Buscar usuario por ID:

```bash
curl http://localhost:3000/users/1
```

Login correcto:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"ana@example.com\",\"password\":\"123456\"}"
```

Login incorrecto:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"ana@example.com\",\"password\":\"incorrecta\"}"
```

## Analisis con SonarQube

Una vez que el proyecto este en GitHub, se puede analizar desde SonarQube o SonarCloud conectando el repositorio.

Tambien se puede usar SonarScanner localmente si ya esta instalado:

```bash
sonar-scanner
```

## Comandos Git para subir a GitHub

Inicializar el repositorio local:

```bash
git init
git add .
git commit -m "Proyecto ejemplo para auditoria con SonarQube"
```

Crear un repositorio vacio en GitHub y luego conectar el repositorio local:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sonarqube-audit-example-api.git
git push -u origin main
```

Reemplaza `TU_USUARIO` por tu usuario real de GitHub.

## Nota academica

Este proyecto esta hecho para explicar conceptos de auditoria de codigo. En un proyecto real se deben evitar credenciales hardcodeadas, validar entradas correctamente, reducir duplicacion, simplificar metodos complejos y eliminar variables no usadas.

## Nextjs: Server Actions
Este repositorio contiene el código del proyecto usado en el curso de Server Actions:

[![Nextjs Server Actions](https://i.ytimg.com/vi/1hstTQypAKo/maxresdefault.jpg?v=6511bc8b
)](https://youtu.be/1hstTQypAKo)

## Instalación
Como primer paso, es necesario instalar las dependeicias, por lo tanto, ejecuta el siguiente comando:

```bash
npm install
```

## Inicialización de la base de datos
Para este proyecto he usado Supabase para crear una base de datos Postgres. Puedes usar cualquier otro proveedor o incluso correr el proyecto desde tu ambiente local.

Lo que nos interesa es obtener la URL de conexión, una vez que la tengas hay que crear el archivo `.env` en el directorio del proyecto y le agregaremos las siguientes variables de entorno:

```bash
DATABASE_URL="postgres://<user>:<password>@db.asdfghjkl.supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://<user>:<password>@db.asdfghjkl.supabase.co:5432/postgres"
```

Si tu base de datos no soporta conexiones con PG Bouncer, solo usa `DATABASE_URL`:

```bash
DATABASE_URL="postgresql://<user>:<password>@db.asdfghjkl.supabase.co:5432/postgres"
```

Para inicializar la base de dato ejecutaremos:

```bash
npx prisma migrate deploy
```

## Correr el servidor de desarrollo
Ahora ya podemos correr Nextjs de manera local:

```bash
npm run dev
```

# Nextjs Pro 😎💪
Domina Server Actions y NextJs como todo un profesional. Así como todos los tips avanzados de Aprendo!

[![Nextjs Server Actions](https://public-files.gumroad.com/be0hjx5njav901npxtxgu36thwoj)](https://yovanyluis.gumroad.com/l/nextjs-avanzado)


Este es un proyecto generado con nextjs en conjunto con kirimase.

## Inicializando el proyecto

Para empezar debemos instalar las dependencias correspondientes (actualmente kirimase produce un conflicto de dependencias que no produce ningun efecto secundario en nuestra aplicacion pero que requiere que se utilice la flag force)

```bash
npm i --f
```

Ahora debemos configurar la base de datos local para que los datos persistan y la aplicacion funcione correctamente.

En tu archivo `.env` deberas configurar el valor DATABASE_URL segun la base de datos que tengas en tu dispositivo, puedes usar cualquier base de datos soportada por prisma [https://www.prisma.io/orm](ver aqui).

Luego ejecuta el siguiente comando:

```bash
npm run db:push
```

Con las dependencias instaladas y la base de datos configurada podemos iniciar la app en modo de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

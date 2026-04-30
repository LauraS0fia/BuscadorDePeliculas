# BuscadorDePeliculas

Aplicación web construida con React + Vite para buscar y visualizar películas consumiendo datos desde una API externa.

## Características

- Base de proyecto en React 19 con Vite.
- Consumo de API con Axios.
- Estructura simple para escalar a filtros, listado y detalle de películas.

## Tecnologías

- React
- Vite
- Axios


## Requisitos previos

- Node.js 18 o superior (recomendado: versión LTS).
- npm 9 o superior.

## Scripts disponibles

Desde la carpeta `frontend/`:

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: previsualiza el build de producción.
- `npm run lint`: ejecuta ESLint.

## Estructura del proyecto

```text
BuscadorDePeliculas/
	README
	frontend/
		src/
			App.jsx
			utils/
				actions.js
```

## Configuración de API

La URL base usada para obtener datos se lee desde `import.meta.env.VITE_URL_API` en:

- `frontend/src/utils/actions.js`

Si esta variable no existe o es incorrecta, la app no podrá recuperar películas.

## Estado actual

Actualmente la app realiza una petición inicial y registra la respuesta en consola. El siguiente paso natural es renderizar ese resultado en componentes visuales (cards/listado, buscador y estados de carga/error).
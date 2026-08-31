import { createServer } from 'node:http'

const port = Number(process.env.PORT || 5001)

const recipes = [
	{
		id: 1,
		name: 'Herb Roasted Chicken',
		category: 'Entrée',
		origin: 'Classic',
		servings: 4,
		instructions: 'Season the chicken, roast until cooked through, and rest before carving.',
		ingredients: [
			{ qty: 1, unit: 'whole', item: 'chicken' },
			{ qty: 2, unit: 'tbsp', item: 'olive oil' },
			{ qty: 1, unit: 'tbsp', item: 'chopped rosemary' },
			{ qty: 1, unit: 'tsp', item: 'salt' },
		],
	},
	{
		id: 2,
		name: 'Citrus Green Salad',
		category: 'Salad',
		origin: 'Modern',
		servings: 2,
		instructions: 'Toss the greens with citrus segments and finish with a light vinaigrette.',
		ingredients: [
			{ qty: 4, unit: 'cups', item: 'mixed greens' },
			{ qty: 1, unit: '', item: 'orange, segmented' },
			{ qty: 1, unit: '', item: 'lemon vinaigrette' },
			{ qty: 0.5, unit: 'cup', item: 'toasted almonds' },
		],
	},
]

function sendJson(response, statusCode, data) {
	response.writeHead(statusCode, {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	})
	response.end(JSON.stringify(data))
}

function readBody(request) {
	return new Promise((resolve, reject) => {
		let body = ''

		request.on('data', (chunk) => {
			body += chunk
			if (body.length > 1_000_000) {
				reject(new Error('Request body too large'))
				request.destroy()
			}
		})

		request.on('end', () => {
			if (!body) {
				resolve({})
				return
			}

			try {
				resolve(JSON.parse(body))
			} catch {
				reject(new Error('Invalid JSON body'))
			}
		})

		request.on('error', reject)
	})
}

const server = createServer(async (request, response) => {
	const url = new URL(request.url || '/', `http://${request.headers.host}`)

	if (request.method === 'OPTIONS') {
		response.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		})
		response.end()
		return
	}

	if (url.pathname === '/recipes' && request.method === 'GET') {
		sendJson(response, 200, recipes)
		return
	}

	if (url.pathname === '/recipes' && request.method === 'POST') {
		try {
			const body = await readBody(request)
			const nextId = recipes.length > 0 ? Math.max(...recipes.map((recipe) => recipe.id)) + 1 : 1
			const recipe = {
				id: nextId,
				name: String(body.name || '').trim(),
				category: String(body.category || '').trim(),
				origin: String(body.origin || '').trim(),
				servings: Number(body.servings) || 1,
				instructions: String(body.instructions || '').trim(),
				ingredients: Array.isArray(body.ingredients)
					? body.ingredients.map((ingredient) => ({
							qty: ingredient.qty === '' || ingredient.qty === null || ingredient.qty === undefined
								? ''
								: Number(ingredient.qty),
							unit: String(ingredient.unit || '').trim(),
							item: String(ingredient.item || '').trim(),
						}))
					: [],
			}

			if (!recipe.name) {
				sendJson(response, 400, { error: 'Recipe name is required' })
				return
			}

			if (recipe.ingredients.length === 0 || recipe.ingredients.every((ingredient) => !ingredient.item)) {
				sendJson(response, 400, { error: 'At least one ingredient is required' })
				return
			}

			recipes.push(recipe)
			sendJson(response, 201, recipe)
		} catch (error) {
			sendJson(response, 400, { error: error.message || 'Invalid request' })
		}
		return
	}

	const recipeMatch = url.pathname.match(/^\/recipes\/(\d+)$/)
	if (recipeMatch && request.method === 'DELETE') {
		const recipeId = Number(recipeMatch[1])
		const index = recipes.findIndex((recipe) => recipe.id === recipeId)

		if (index === -1) {
			sendJson(response, 404, { error: 'Recipe not found' })
			return
		}

		recipes.splice(index, 1)
		sendJson(response, 200, { ok: true })
		return
	}

	sendJson(response, 404, { error: 'Not found' })
})

server.listen(port, () => {
	console.log(`ExecChef recipe API running on port ${port}`)
})

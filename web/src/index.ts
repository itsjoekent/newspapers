export interface Env {}

async function getRandomNewspaperSrc(env: Env) {
	const statusResponse = await fetch(`https://api.freedomforum.org/cache/status.js?_=${Date.now()}`);
	const status: [{ dayNumber: number }] = await statusResponse.json();

	const newspaperListResponse = await fetch(`https://api.freedomforum.org/cache/papers.js?_=${Date.now()}`);
	const newspaperList: { paperId: string }[] = await newspaperListResponse.json();

	const randomNewspaper = newspaperList[Math.floor(Math.random() * newspaperList.length)];

	return `https://cdn.freedomforum.org/dfp/jpg${status[0].dayNumber}/lg/${randomNewspaper.paperId}.jpg`;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const path = new URL(request.url).pathname;

		let newspaper: string;
		try {
			newspaper = await getRandomNewspaperSrc(env);
		} catch (error) {
			console.error(error);
			return new Response('error loading newspapers :(', {
				status: 500,
			});
		}

		if (path === '/image') {
			return new Response(
				JSON.stringify({
					image: newspaper,
				}),
				{
					headers: {
						'content-type': 'application/json;charset=UTF-8',
					},
				}
			);
		}

		return new Response(
			`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<style>
					* {
						box-sizing: border-box;
						padding: 0;
						margin: 0;
					}

					body {
						width: 100vw;
						height: 100vh;
					}

					img {
						display: block;
						width: 100vw;
						height: 100vh;
						object-fit: contain;
						position: absolute;
						top: 0;
						left: 0;
					}

					img#secondary {
						z-index: 2;
						opacity: 0;
					}

					@keyframes fade-in {
						0% {
							opacity: 0;
						}
						100% {
							opacity: 1;
						}
					}

					.fade-in {
						animation: fade-in 1s ease-in-out forwards;
					}

					.fade-out {
						animation: fade-in reverse 1s ease-in-out forwards;
					}
				</style>
			</head>
			<body>
				<img id="primary" src="${newspaper}" />
				<img id="secondary" src="" />
				<script>
					const primary = document.getElementById('primary');
					const secondary = document.getElementById('secondary');

					function loadNewspaper() {
						fetch('/image')
							.then((res) => res.json())
							.then((data) => {
								primary.classList.add('fade-out');
								secondary.src = data.image;
								secondary.classList.add('fade-in');
								setTimeout(() => {
									primary.src = data.image;
									primary.classList.remove('fade-out');
									secondary.classList.remove('fade-in');
								}, 1000);
							});
					}

					setInterval(loadNewspaper, 1000 * 15);
				</script>
			</body>
		</html>
		`,
			{
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			}
		);
	},
};

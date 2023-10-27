				import worker, * as OTHER_EXPORTS from "/home/user/pjs/gpt_hono/cloudflare-workshop-examples/projects/chatgpt-plugin/src/index.ts";
				import * as __MIDDLEWARE_0__ from "/home/user/pjs/gpt_hono/cloudflare-workshop-examples/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/home/user/pjs/gpt_hono/cloudflare-workshop-examples/projects/chatgpt-plugin/src/index.ts";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;
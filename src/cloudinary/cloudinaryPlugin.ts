import { Config } from "payload/config";
import { afterChangeHook, afterDeleteHook, beforeChangeHook } from "./hooks/CloudinaryMediaHooks";

const addCloudinary = (incomingConfig: Config): Config => {
	const config: Config = {
		...incomingConfig,
		collections: incomingConfig.collections?.map((collection) => {
			if (Boolean(collection.slug === "media")) {
				return {
					...collection,
					hooks: {
						...collection.hooks,
						beforeChange: [beforeChangeHook],
						afterChange: [afterChangeHook],
						afterDelete: [afterDeleteHook],
					},
					fields: [
						...collection.fields,
						{
							name: "cloudPublicId",
							type: "text",
							access: {
								create: () => false,
								update: () => false,
							},
							admin: {
								position: "sidebar",
								condition: (data) => Boolean(data?.cloudPublicId),
								readOnly: true,
							},
						},
					],
				};
			}

			return collection;
		}),
	};

	return config;
};

export default addCloudinary;

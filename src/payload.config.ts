import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";

// import addCloudinary from "./cloudinary/cloudinaryPlugin";

// const CloudinaryMediaHooks = path.resolve(__dirname, "cloudinary/hooks/CloudinaryMediaHooks");
// const mockModulePath = path.resolve(__dirname, "mocks/emptyObject");

export default buildConfig({
	serverURL: "http://localhost:3000",
	admin: {
		user: Users.slug,
		// webpack: (config) => ({
		// 	...config,
		// 	resolve: {
		// 		...config.resolve,
		// 		alias: {
		// 			...config.resolve!.alias,
		// 			[CloudinaryMediaHooks]: mockModulePath,
		// 		},
		// 		fallback: {
		// 			...config.resolve!.fallback,
		// 			fs: false,
		// 			url: false,
		// 			stream: false,
		// 		},
		// 	},
		// }),
	},
	collections: [Categories, Posts, Tags, Users],
	// plugins: [addCloudinary],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	cors: [`${process.env.NEXT_APP_URL}`],
	csrf: [`${process.env.NEXT_APP_URL}`],
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
	},
});

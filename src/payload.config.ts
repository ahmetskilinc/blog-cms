import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";

export default buildConfig({
	serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS,
	admin: {
		user: Users.slug,
	},
	collections: [Categories, Posts, Tags, Users],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	cors: [`${process.env.NEXT_APP_URL}`],
	csrf: [`${process.env.NEXT_APP_URL}`],
});

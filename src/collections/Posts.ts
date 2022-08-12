import { CollectionConfig } from "payload/types";
import slug from "../fields/Slug";

const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		defaultColumns: ["title", "author", "category", "tags", "status"],
		useAsTitle: "title",
	},
	access: {
		read: () => true,
	},
	fields: [
		slug,
		{
			name: "title",
			type: "text",
		},
		{
			name: "author",
			type: "relationship",
			relationTo: "users",
		},
		{
			name: "publishedDate",
			type: "date",
		},
		{
			name: "category",
			type: "relationship",
			relationTo: "categories",
		},
		{
			name: "tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "content",
			type: "richText",
		},
	],
};

export default Posts;

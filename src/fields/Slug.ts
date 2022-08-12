import type { Field } from "payload/types";
import formatSlug from "../utilities/formatSlug";

const Slug: Field = {
	name: "slug",
	label: "Slug",
	type: "text",
	admin: {
		position: "sidebar",
	},
	hooks: {
		beforeValidate: [formatSlug],
	},
};

export default Slug;

import { FieldHook } from "payload/dist/fields/config/types";

const formatSlug: FieldHook = (args) => {
	return args.data.title
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
		.toLowerCase();
};

export default formatSlug;

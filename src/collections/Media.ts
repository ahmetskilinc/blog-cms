import { CollectionConfig } from "payload/types";

const CloudinaryMedia: CollectionConfig = {
	slug: "media",
	upload: {
		adminThumbnail: ({ doc }) => String(`https://res.cloudinary.com/ahmetk-dev/image/upload/w_320/${doc.cloudPublicId}`),
		disableLocalStorage: true,
		mimeTypes: ["image/*"],
	},
	access: {
		read: () => true,
	},
	fields: [],
};
export default CloudinaryMedia;

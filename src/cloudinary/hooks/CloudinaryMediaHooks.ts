import { AfterChangeHook, AfterDeleteHook, BeforeChangeHook } from "payload/dist/collections/config/types";
import { cloudinary } from "./cloudinaryConfig";
import { UploadApiOptions, UploadApiResponse, UploadStream } from "cloudinary";
import path from "path";
import fs, { promises as Fs } from "fs";
import { Readable } from "stream";

const streamUpload = (file: { data: Buffer }, id?: string): Promise<UploadApiResponse> => {
	return new Promise<UploadApiResponse>((resolve, reject) => {
		const options: UploadApiOptions = {
			...(id && { public_id: id, folder: null }),
			invalidate: true,
			folder: "fab-store",
		};
		const readStream = Readable.from(file.data);
		const stream: UploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
			if (result) {
				resolve(result);
			} else {
				reject(error);
			}
		});
		readStream.pipe(stream);
	});
};

const beforeChangeHook: BeforeChangeHook = async ({ data, req, operation }) => {
	const uploadedFile = req.files.file;
	if (uploadedFile) {
		const result = await streamUpload(uploadedFile, operation === "update" ? data.cloudPublicId : null);
		data.cloudPublicId = result.public_id;
	}
	return data;
};

async function exists(filePath: string) {
	try {
		await Fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function deleteFile(filePath: string) {
	const fileExists = await exists(filePath);
	if (fileExists)
		fs.unlink(filePath, (err) => {
			if (err) {
				console.log(err);
				throw err;
			}
		});
}

const afterChangeHook: AfterChangeHook = ({ doc, operation }) => {
	if (doc?.filename) {
		const mainFilePath = path.resolve(__dirname + `../../../media/${doc.filename}`);
		deleteFile(mainFilePath);
	}
	if (doc?.sizes) {
		for (const imageName in doc.sizes) {
			const filePath = path.resolve(__dirname + `../../../media/${doc.sizes[imageName].filename}`);
			deleteFile(filePath);
		}
	}
	return doc;
};

const afterDeleteHook: AfterDeleteHook = ({ doc }) => {
	cloudinary.uploader.destroy(doc.cloudPublicId, function (result: any, error: any) {
		console.log(result, error);
	});
	return doc;
};

export { streamUpload, beforeChangeHook, afterChangeHook, afterDeleteHook };

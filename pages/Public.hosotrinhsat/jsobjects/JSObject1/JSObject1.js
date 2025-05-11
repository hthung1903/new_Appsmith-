export default {
	getFileHash: async () => {
		const base64String = FilePickerUpload.files[0].data;

		// Decode base64 thành bytes
		const bytes = forge.util.decode64(base64String);

		// Tính SHA-256
		const md = forge.md.sha256.create();
		md.update(bytes);
		const hashHex = md.digest().toHex();

		return hashHex;
	}
}
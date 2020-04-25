import * as path from "https://deno.land/std/path/mod.ts";


/**
 * Determines the MIME type from a file extension.
 *
 * @private
 *
 * @param {string} filePath is the path to a file
 * @returns {string} the MIME type
 */
function _determineMimeType(filePath: string) : string {
	const fileExtension: string = path.extname(filePath);

	switch (fileExtension) {
		case ".aac": return "audio/aac";
		case ".abw": return "application/x-abiword";
		case ".arc": return "application/x-freearc";
		case ".avi": return "video/x-msvideo";
		case ".azw": return "application/vnd.amazon.ebook";
		case ".bin": return "application/octet-stream";
		case ".bmp": return "image/bmp";
		case ".bz": return "application/x-bzip";
		case ".bz2": return "application/x-bzip2";
		case ".csh": return "application/x-csh";
		case ".css": return "text/css";
		case ".csv": return "text/csv";
		case ".doc": return "application/msword";
		case ".docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		case ".eot": return "application/vnd.ms-fontobject";
		case ".epub": return "application/epub+zip";
		case ".gz": return "application/gzip";
		case ".gif": return "image/gif";
		case ".htm": return "text/html";
		case ".html": return "text/html";
		case ".ico": return "image/vnd.microsoft.icon";
		case ".ics": return "text/calendar";
		case ".jar": return "application/java-archive";
		case ".jpeg": return "image/jpeg";
		case ".jpg": return "image/jpeg";
		case ".js": return "text/javascript";
		case ".json": return "application/json";
		case ".jsonld": return "application/ld+json";
		case ".mid": return "audio/midi";
		case ".midi": return "audio/midi";
		case ".mjs": return "text/javascript";
		case ".mp3": return "audio/mpeg";
		case ".mpeg": return "video/mpeg";
		case ".mpkg": return "application/vnd.apple.installer+xml";
		case ".odp": return "application/vnd.oasis.opendocument.presentation";
		case ".ods": return "application/vnd.oasis.opendocument.spreadsheet";
		case ".odt": return "application/vnd.oasis.opendocument.text";
		case ".oga": return "audio/ogg";
		case ".ogv": return "video/ogg";
		case ".ogx": return "application/ogg";
		case ".opus": return "audio/opus";
		case ".otf": return "font/otf";
		case ".png": return "image/png";
		case ".pdf": return "application/pdf";
		case ".php": return "application/php";
		case ".ppt": return "application/vnd.ms-powerpoint";
		case ".pptx": return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
		case ".rar": return "application/vnd.rar";
		case ".rtf": return "application/rtf";
		case ".sh": return "application/x-sh";
		case ".svg": return "image/svg+xml";
		case ".swf": return "application/x-shockwave-flash";
		case ".tar": return "application/x-tar";
		case ".tif": return "image/tiff";
		case ".tiff": return "image/tiff";
		case ".ts": return "video/mp2t";
		case ".ttf": return "font/ttf";
		case ".txt": return "text/plain";
		case ".vsd": return "application/vnd.visio";
		case ".wav": return "audio/wav";
		case ".weba": return "audio/webm";
		case ".webm": return "video/webm";
		case ".webp": return "image/webp";
		case ".woff": return "font/woff";
		case ".woff2": return "font/woff2";
		case ".xhtml": return "application/xhtml+xml";
		case ".xls": return "application/vnd.ms-excel";
		case ".xlsx": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		case ".xml": return "application/xml";
		case ".xul": return "application/vnd.mozilla.xul+xml";
		case ".zip": return "application/zip";
		case ".3gp": return "video/3gpp";
		case ".3g2": return "video/3gpp2";
		case ".7z": return "application/x-7z-compressed";
	}
	
	throw new Error("File extension has no known mimetype");
}


/**
 * Encodes a Uint8Array into a base64 string
 *
 * @private
 *
 * @param {any} uint8arr a Uint8Array
 * @returns {string} a base64 encoded string 
 */
function _encodeU8intToBase64String(uint8arr: any) : string {
	const CHUNK_SIZE = 0x8000;
	
	const charArray: string[] = [];
	
	for (let i = 0; i < uint8arr.length; i += CHUNK_SIZE) {
		charArray.push(String.fromCharCode.apply(null, uint8arr.subarray(i, i + CHUNK_SIZE)));
	}
	
	return btoa(charArray.join(""));
}


/**
 * Reads and encodes file contents into a base64 string
 *
 * @private
 * 
 * @param {string} filePath is the path to a file
 * @returns {string} a base64 encoded string
 */
function _encodeFileToBase64String(filePath: string) : string {
	const fileContents = Deno.readFileSync(filePath);
	const base64encodedString = _encodeU8intToBase64String(fileContents);
	
	return base64encodedString;
}


/**
 * This class provides an easy interface to perform base64 encoding on strings
 * and files.
 */
export class Base64 {
	
	private str: string;
	private mime: string;
	
	public constructor(data: any) {
		this.str = data.str;
		this.mime = data.mime;
	}
	
	
	/**
	 * Creates a Base64 object from a string
	 *
	 * @public
	 * @static
	 *
	 * @param {string} unencodedString a string that will be base64 encoded
	 * @returns {Base64} a Base64 object
	 */
	public static fromString(unencodedString: string) : Base64 {
		return new Base64({
			str: btoa(unencodedString),
			mime: null,
		});
	}
	
	
	/**
	 * Creates a Base64 object from a Uint8Array
	 *
	 * @public
	 * @static
	 *
	 * @param {Uint8Array} uint8arr a Uint8Array that will be base64 encoded
	 * @returns {Base64} a Base64 object
	 */
	public static fromUint8Array(uint8arr: Uint8Array) : Base64 {
		return new Base64({
			str: _encodeU8intToBase64String(uint8arr),
			mime: null,
		});
	}
	
	
	/**
	 * Creates a Base64 object from a Uint8Array
	 *
	 * @public
	 * @static
	 *
	 * @param {string} filePath the path to a file that will be base64 encoded
	 * @returns {Base64} a Base64 object
	 */
	public static fromFile(filePath: string) : Base64 {
		return new Base64({
			str: _encodeFileToBase64String(filePath),
			mime: `data:${_determineMimeType(filePath)};base64,`,
		});
	}
	
	
	/**
	 * Returns the base64 encoded string from the Base64 object
	 *
	 * @public
	 *
	 * @returns {Base64} a base64 encoded string
	 */
	public toString() : string {
		return this.str;
	}
	
	
	/**
	 * Returns the base64 encoded string from the Base64 object, with the
	 * inclusion of the MIME type if the Base64 object was created from a file
	 * (and if not created from a file, works the same as the .toString() method)
	 *
	 * @public
	 *
	 * @returns {string} a base64 encoded string with MIME type included when from a file
	 */
	public toStringWithMime() : string {
		if (!this.mime) {
			return this.str;
		} else {
			return this.mime + this.str;
		}
	}
	
	
	/**
	 * Writes the base64 string from the Base64 object to a file
	 *
	 * @public
	 *
	 * @param {string} filePath the path to the file that the Base64 contents will be written to
	 */
	public toFile(filePath: string) : void {
		Deno.writeFileSync(filePath, new TextEncoder().encode(this.str));
	}
	
	
	/**
	 * Writes the base64 string from the Base64 object to a file, including the
	 * MIME type when writing to the file.
	 *
	 * @public
	 *
	 * @param {string} filePath the path to the file that the Base64 contents will be written to
	 */
	public toFileWithMime(filePath: string) : void {
		Deno.writeFileSync(filePath, new TextEncoder().encode(this.mime + this.str));
	}
}
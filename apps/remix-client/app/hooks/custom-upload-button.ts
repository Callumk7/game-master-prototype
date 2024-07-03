import { useState, useRef, ChangeEvent } from "react";

export const useCustomUploadButton = () => {
	const [fileName, setFileName] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleInputClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;
		if (files?.[0]) {
			const { name } = files[0];
			setFileName(name);
		} else {
			setFileName("");
		}
	};

	return {
		fileName,
		fileInputRef,
		handleInputClick,
		handleFileChange,
	};
};

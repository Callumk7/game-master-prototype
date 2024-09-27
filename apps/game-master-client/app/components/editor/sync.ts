import { type FormMethod, useFetcher } from "@remix-run/react";
import { useDefaultEditor } from ".";
import { useEffect, useLayoutEffect, useState } from "react";
import type { MentionItem } from "~/types/mentions";

type SyncEditorOptions = {
	action?: string;
	method?: FormMethod;
	initContent: string;
	suggestionItems?: () => MentionItem[];
};

export const useSyncEditorContent = (options: SyncEditorOptions) => {
	const fetcher = useFetcher();

	let optimisticContent = options.initContent;

	if (fetcher.formData?.has("htmlContent")) {
		optimisticContent = String(fetcher.formData.get("htmlContent"));
	}

	const editor = useDefaultEditor(optimisticContent, options.suggestionItems);

	const [isEdited, setIsEdited] = useState(false);

	useEffect(() => {
		if (editor) {
			const updateListener = () => {
				if (!isEdited) setIsEdited(true);
			};

			editor.on("update", updateListener);

			return () => {
				editor.off("update", updateListener);
			};
		}
	}, [editor, isEdited]); 

	useLayoutEffect(() => {
		if(editor) {
			editor.commands.setContent(optimisticContent);
		}
	}, [editor, optimisticContent])

	const saveContent = () => {
		if (editor && isEdited) {
			fetcher.submit(
				{
					htmlContent: editor.getHTML(),
					content: editor.getText(),
				},
				{
					method: options.method ?? "patch", // WARN: test this syntax
					action: options.action,
				},
			);
		}
		setIsEdited(false);
	};

	return {
		optimisticContent,
		editor,
		isEdited,
		status: fetcher.state,
		saveContent,
	};
};

type StateFunction = () => void;

const useStateSync = <T>(data: T, stateFunction: StateFunction) => {
	const [prevData, setPrevData] = useState(data);
	if (data !== prevData) {
		setPrevData(data);
		stateFunction();
	}
};

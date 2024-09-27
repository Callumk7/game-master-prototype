import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import type { SuggestionOptions } from "@tiptap/suggestion";
import { MentionList } from "./mention-list";

// biome-ignore lint/suspicious/noExplicitAny: Type required by tiptap plugin
export const suggestion: Omit<SuggestionOptions<any, MentionNodeAttrs>, "editor"> = {
	items: async ({ query }) => {
		return [
			"Lea Thompson",
			"Cyndi Lauper",
			"Tom Cruise",
			"Madonna",
			"Jerry Hall",
			"Joan Collins",
			"Winona Ryder",
			"Christina Applegate",
			"Alyssa Milano",
			"Molly Ringwald",
			"Ally Sheedy",
			"Debbie Harry",
			"Olivia Newton-John",
			"Elton John",
			"Michael J. Fox",
			"Axl Rose",
			"Emilio Estevez",
			"Ralph Macchio",
			"Rob Lowe",
			"Jennifer Grey",
			"Mickey Rourke",
			"John Cusack",
			"Matthew Broderick",
			"Justine Bateman",
			"Lisa Bonet",
		]
			.filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, 5);
	},

	allowSpaces: true,

	render: () => {
		let component;
		let popup;

		return {
			onStart: (props) => {
				component = new ReactRenderer(MentionList, {
					props,
					editor: props.editor,
				});

				if (!props.clientRect) {
					return;
				}

				popup = tippy("body", {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.element,
					showOnCreate: true,
					interactive: true,
					trigger: "manual",
					placement: "bottom-start",
				});
			},

			onUpdate(props) {
				component.updateProps(props);

				if (!props.clientRect) {
					return;
				}

				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
				});
			},

			onKeyDown(props) {
				if (props.event.key === "Escape") {
					popup[0].hide();

					return true;
				}

				return component.ref?.onKeyDown(props);
			},

			onExit() {
				popup[0].destroy();
				component.destroy();
			},
		};
	},
};

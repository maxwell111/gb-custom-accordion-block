import { registerBlockType } from "@wordpress/blocks";
import "../scss/editor.scss";
import edit from "./edit.js";

const attributes = {
  blockTitle: {
    type: "string",
  },
  firstItemExpanded: {
    type: "boolean",
    default: true,
  },
  items: {
    type: "array",
    default: [],
  },
};

registerBlockType("gb-custom-accordion-plugin/gb-custom-accordion-block", {
  title: "GB Custom Accordion block",
  description: "Custom Gutenberg plugin with accordion block",
  category: "text",
  icon: "list-view",
  attributes,
  edit,
  save: () => {
    return null;
  },
});

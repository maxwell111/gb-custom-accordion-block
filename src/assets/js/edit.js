import {
  Button,
  PanelBody,
  PanelRow,
  ToggleControl,
} from "@wordpress/components";
import { InspectorControls, RichText } from "@wordpress/block-editor";
import CustomMediaUpload from "./components/image-uploader";

const Accordion = (props) => {
  const { setAttributes, attributes } = props;
  const { items: accordionItems, blockTitle, firstItemExpanded } = attributes;
  let accordionFields;

  const handleGeneralTitle = (blockTitle) => {
    setAttributes({ blockTitle });
  };

  const handleAddItem = () => {
    const items = [...accordionItems];
    items.push({
      heading: "",
      content: "",
      image: "",
      expanded: false,
    });
    setAttributes({ items });
  };

  const handleRemoveItem = (index) => {
    const items = [...accordionItems];
    items.splice(index, 1);
    setAttributes({ items });
  };

  const handleContentChange = (param, value, index) => {
    const items = [...accordionItems];
    items[index][param] = value;
    setAttributes({ items });
  };

  const onChangeImage = (media, index) => {
    const items = [...accordionItems];
    items[index].image = media;
    setAttributes({ items });
  };

  const onIconClick = (index) => {
    const items = [...accordionItems];
    items[index].expanded = !items[index].expanded;
    setAttributes({ items });
  };

  if (accordionItems.length) {
    accordionFields = accordionItems.map((item, index) => {
      return (
        <>
          <div className="accordion-editor-item">
            <div className="accordion-editor-item-title">
              <h4 className="accordion-editor-item-heading">
                <RichText
                  placeholder="Accordion item heading"
                  tagName={"span"}
                  value={item.heading}
                  onChange={(heading) =>
                    handleContentChange("heading", heading, index)
                  }
                />
              </h4>
              <span
                className={`title-icon ${
                  item.expanded ? "icon-minus" : "icon-plus"
                }`}
                onClick={() => onIconClick(index)}
              ></span>
            </div>
            <div
              className={`accordion-editor-item-content ${
                item.expanded ? "active" : ""
              }`}
            >
              <div className="content-left">
                <p>
                  <RichText
                    placeholder="Accordion item content"
                    value={item.content}
                    onChange={(content) =>
                      handleContentChange("content", content, index)
                    }
                  />
                </p>
              </div>
              <div className="content-right">
                <CustomMediaUpload
                  mediaUrl={item.image}
                  onMediaSelected={(value) => onChangeImage(value, index)}
                />
              </div>
            </div>
          </div>
          <div className="accordion-editor-button-wrap align-right">
            <Button
              variant={"secondary"}
              isLarge
              icon={"remove"}
              onClick={() => handleRemoveItem(index)}
              className={"accordion-editor-item accordion-editor-button"}
            >
              Remove Item
            </Button>
          </div>
        </>
      );
    });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Accordion block settings">
          <PanelRow>
            <ToggleControl
              checked={firstItemExpanded}
              onChange={(value) => {
                setAttributes({ firstItemExpanded: value });
              }}
              label="Expand first item"
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div className="accordion-editor">
        <RichText
          value={blockTitle}
          onChange={(blockTitle) => handleGeneralTitle(blockTitle)}
          tagName={"h2"}
          className={"accordion-editor-title"}
          placeholder="Accordion block title"
        />
        <div className="accordion-editor-wrap">
          <div className="accordion-editor-items">
            {accordionFields}
            <div className="accordion-editor-button-wrap">
              <Button
                variant={"primary"}
                isLarge
                className={"accordion-editor-button button-wfull "}
                icon={"insert"}
                onClick={handleAddItem.bind(this)}
              >
                Add accordion item
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;

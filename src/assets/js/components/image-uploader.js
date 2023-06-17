import {
  MediaUpload,
  MediaPlaceholder,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

const CustomMediaUpload = (props) => {
  return (
    <MediaUpload
      onSelect={(media) => {
        props.onMediaSelected(media.url);
      }}
      type="image"
      multiple={false}
      value={props.mediaUrl}
      // eslint-disable-next-line no-unused-vars
      render={({ open }) => {
        return (
          <>
            <div className="image-upload">
              {props.mediaUrl ? (
                <>
                  <div className="image-upload-holder">
                    <img src={props.mediaUrl} />
                    <MediaUploadCheck>
                      <Button
                        variant="primary"
                        onClick={() => {
                          props.onMediaSelected(null);
                        }}
                      >
                        Remove Image
                      </Button>
                    </MediaUploadCheck>
                  </div>
                </>
              ) : (
                <MediaPlaceholder
                  labels={{ title: "Select an image" }}
                  icon="format-image"
                  onSelect={(media) => {
                    props.onMediaSelected(media.url);
                  }}
                  accept="image/*"
                  allowedTypes={["image"]}
                />
              )}
            </div>
          </>
        );
      }}
    />
  );
};

export default CustomMediaUpload;

import { useCallback, RefObject } from "react";
import { toJpeg } from "html-to-image";

interface Props {
  innerRef: RefObject<HTMLDivElement>;
}

const DonwloadHtml = ({ innerRef }: Props) => {
  const ref = innerRef;

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, {
      cacheBust: true,
      backgroundColor: "#14181c",
      canvasWidth: ref.current.offsetWidth * 2,
      canvasHeight: ref.current.offsetHeight * 2,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `collageboxd.jpeg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="flex-button">
      <button className="button-download" onClick={onButtonClick}>
        Download
      </button>
    </div>
  );
};

export default DonwloadHtml;

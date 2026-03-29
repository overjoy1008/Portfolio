"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";

type ImageMeta = {
  alt: string;
  src: string;
  width?: number;
  height?: number;
};

type MarkdownBlock =
  | { type: "markdown"; content: string }
  | { type: "images"; images: ImageMeta[] };

const IMAGE_LINE_REGEX = /^!\[(.*?)\]\((\S+?)(?:\s+"(.*?)")?\)$/;

const parseSizeOptions = (raw?: string) => {
  if (!raw) {
    return {};
  }

  return raw.split(/\s+/).reduce<{ width?: number; height?: number }>((acc, token) => {
    const [key, value] = token.split("=");
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) {
      return acc;
    }

    if (key === "w") {
      acc.width = parsedValue;
    }

    if (key === "h") {
      acc.height = parsedValue;
    }

    return acc;
  }, {});
};

const parseImageLine = (line: string): ImageMeta | null => {
  const trimmedLine = line.trim();
  const match = trimmedLine.match(IMAGE_LINE_REGEX);

  if (!match) {
    return null;
  }

  const [, alt, src, rawOptions] = match;
  return { alt, src, ...parseSizeOptions(rawOptions) };
};

const parseMarkdownBlocks = (content: string): MarkdownBlock[] => {
  const lines = content.split("\n");
  const blocks: MarkdownBlock[] = [];
  let markdownBuffer: string[] = [];
  let imageBuffer: ImageMeta[] = [];

  const flushMarkdown = () => {
    const markdown = markdownBuffer.join("\n").trim();
    if (markdown) {
      blocks.push({ type: "markdown", content: markdown });
    }
    markdownBuffer = [];
  };

  const flushImages = () => {
    if (imageBuffer.length > 0) {
      blocks.push({ type: "images", images: imageBuffer });
    }
    imageBuffer = [];
  };

  lines.forEach((line) => {
    const parsedImage = parseImageLine(line);

    if (parsedImage) {
      flushMarkdown();
      imageBuffer.push(parsedImage);
      return;
    }

    if (imageBuffer.length > 0) {
      flushImages();
    }

    markdownBuffer.push(line);
  });

  flushImages();
  flushMarkdown();

  return blocks;
};

const imageStyle = (image: ImageMeta) => ({
  width: image.width ? `${image.width}px` : "100%",
  maxWidth: "100%",
  height: image.height ? `${image.height}px` : "auto",
});

const ImageLightbox = ({
  image,
  isOpen,
  onClose,
}: {
  image: ImageMeta;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-lg"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex max-h-[92vh] w-full max-w-[96vw] flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center overflow-hidden">
            <div className="relative inline-block">
              <motion.button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 z-20 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.88)]"
                aria-label="Close image viewer"
                whileHover={{
                  scale: 1.08,
                  scaleX: 1.12,
                  scaleY: 1.12,
                  transition: { type: "spring", stiffness: 280, damping: 16 }
                }}
                whileTap={{
                  scale: 0.94,
                  scaleX: 0.88,
                  scaleY: 0.88,
                  transition: { type: "spring", stiffness: 340, damping: 14 }
                }}
              >
                <X className="h-6 w-6 md:h-9 md:w-9" strokeWidth={2.75} />
              </motion.button>
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-[82vh] w-auto max-w-[92vw] object-contain shadow-2xl"
              />
            </div>
          </div>

          {image.alt && (
            <p className="text-center text-sm text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              {image.alt}
            </p>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const SingleImage = ({ image }: { image: ImageMeta }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <figure className="my-8 flex flex-col gap-3">
        <button type="button" onClick={() => setIsLightboxOpen(true)} className="w-fit text-left">
          <img
            src={image.src}
            alt={image.alt}
            className="border border-neutral-200 bg-neutral-50 object-cover shadow-sm"
            style={imageStyle(image)}
          />
        </button>
        {image.alt && <figcaption className="text-sm text-neutral-500">{image.alt}</figcaption>}
      </figure>

      <ImageLightbox image={image} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} />
    </>
  );
};

const ImageSlider = ({ images }: { images: ImageMeta[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeImage = images[activeIndex];

  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="group relative w-full">
        <div ref={viewportRef} className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: -activeIndex * viewportWidth }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.map((image, index) => (
              <div key={`${image.src}-${index}`} className="w-full shrink-0">
                <button type="button" onClick={() => setIsLightboxOpen(true)} className="block w-full text-left">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="border border-neutral-200 bg-neutral-50 object-contain shadow-sm"
                    style={{ ...imageStyle(image), width: "100%", maxHeight: "560px" }}
                  />
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-label="Previous image"
          whileHover={{
            scale: 1.08,
            scaleX: 1.12,
            scaleY: 1.12,
            transition: { type: "spring", stiffness: 280, damping: 16 }
          }}
          whileTap={{
            scale: 0.94,
            scaleX: 0.88,
            scaleY: 0.88,
            transition: { type: "spring", stiffness: 340, damping: 14 }
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.98)]"
          >
            <path
              d="M14.5 5L8 12L14.5 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-label="Next image"
          whileHover={{
            scale: 1.08,
            scaleX: 1.12,
            scaleY: 1.12,
            transition: { type: "spring", stiffness: 280, damping: 16 }
          }}
          whileTap={{
            scale: 0.94,
            scaleX: 0.88,
            scaleY: 0.88,
            transition: { type: "spring", stiffness: 340, damping: 14 }
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.98)]"
          >
            <path
              d="M9.5 5L16 12L9.5 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {activeImage.alt && <p className="text-sm text-neutral-500">{activeImage.alt}</p>}

      <div className="flex snap-x gap-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={`${image.src}-thumb-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 overflow-hidden border ${
              index === activeIndex ? "border-neutral-900" : "border-neutral-200"
            }`}
          >
            <img src={image.src} alt={image.alt} className="h-20 w-28 object-contain bg-neutral-50" />
          </button>
        ))}
      </div>

      <ImageLightbox image={activeImage} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} />
    </div>
  );
};

export const ProjectMarkdownContent = ({ content }: { content: string }) => {
  const blocks = useMemo(() => parseMarkdownBlocks(content), [content]);

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "images") {
          return block.images.length > 1 ? (
            <ImageSlider key={`images-${index}`} images={block.images} />
          ) : (
            <SingleImage key={`image-${index}`} image={block.images[0]} />
          );
        }

        return (
          <ReactMarkdown key={`markdown-${index}`} rehypePlugins={[rehypeSlug]}>
            {block.content}
          </ReactMarkdown>
        );
      })}
    </>
  );
};

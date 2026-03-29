"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const SingleImage = ({ image }: { image: ImageMeta }) => (
  <figure className="my-8 flex flex-col gap-3">
    <img
      src={image.src}
      alt={image.alt}
      className="rounded-2xl border border-neutral-200 bg-neutral-50 object-cover shadow-sm"
      style={imageStyle(image)}
    />
    {image.alt && <figcaption className="text-sm text-neutral-500">{image.alt}</figcaption>}
  </figure>
);

const ImageSlider = ({ images }: { images: ImageMeta[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const goPrev = () => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="group relative w-full">
        <div className="relative overflow-hidden rounded-[24px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className="rounded-[24px] border border-neutral-200 bg-neutral-50 object-cover shadow-sm"
              style={{ ...imageStyle(activeImage), width: "100%" }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            <path
              d="M14.5 5L8 12L14.5 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-label="Next image"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            <path
              d="M9.5 5L16 12L9.5 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {activeImage.alt && <p className="text-sm text-neutral-500">{activeImage.alt}</p>}

      <div className="flex snap-x gap-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={`${image.src}-thumb-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 overflow-hidden rounded-2xl border ${
              index === activeIndex ? "border-neutral-900" : "border-neutral-200"
            }`}
          >
            <img src={image.src} alt={image.alt} className="h-20 w-28 object-cover" />
          </button>
        ))}
      </div>
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

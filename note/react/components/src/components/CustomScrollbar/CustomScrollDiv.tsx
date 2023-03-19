import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

const DEFAULT_THUMB_HEIGHT = 20;

const CustomScrollDiv = ({ children }: PropsWithChildren) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(DEFAULT_THUMB_HEIGHT);

  const handleResize = (ref: HTMLDivElement) => {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(
      Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        DEFAULT_THUMB_HEIGHT
      )
    );
  };

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !thumbRef.current) {
      return;
    }

    const { clientHeight, scrollTop, scrollHeight } = contentRef.current;
    let newTop = (scrollTop / scrollHeight) * clientHeight;
    newTop = Math.min(newTop, clientHeight - thumbHeight);
    const thumb = thumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, []);

  useEffect(() => {
    if (contentRef.current && trackRef.current) {
      const ref = contentRef.current;
      observer.current = new ResizeObserver(() => {
        if (trackRef.current?.style) {
          trackRef.current.style.height = ref.clientHeight + "px";
        }
        handleResize(ref);
        ref.addEventListener("scroll", handleThumbPosition);
      });
      observer.current.observe(ref);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  });

  return (
    <Container>
      <Content ref={contentRef}>{children}</Content>
      <Track ref={trackRef}>
        <Thumb ref={thumbRef} height={thumbHeight} />
      </Track>
    </Container>
  );
};

export default CustomScrollDiv;

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Track = styled.div`
  top: 0;
  right: 0;
  position: absolute;
  background: none;
  width: 5px;
`;

const Thumb = styled.div<{ height: number }>`
  top: 0;
  right: 0;
  position: absolute;
  background: #d9d9d9;
  border-radius: 3px;
  width: 5px;
  height: ${(props) => props.height}px;
`;

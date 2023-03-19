import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import styled from "@emotion/styled";

const DEFAULT_THUMB_HEIGHT = 20;

const CustomScrollbar = (props: ComponentPropsWithoutRef<"div">) => {
  const { children, ...rest } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(DEFAULT_THUMB_HEIGHT);

  const handleResize = (ref: HTMLDivElement, trackSize: number) => {
    const { clientHeight, scrollHeight } = ref;
    console.log(clientHeight, scrollHeight, trackSize);
    console.log((clientHeight / scrollHeight) * trackSize);
    setThumbHeight(
      Math.max((clientHeight / scrollHeight) * trackSize, DEFAULT_THUMB_HEIGHT)
    );
  };

  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;

    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, []);

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      // const { clientHeight: trackSize } = scrollTrackRef.current;
      const track = scrollTrackRef.current;
      track.style.height = `${ref.clientHeight.toString()}px`;

      console.log("ref-height", ref, ref.clientHeight.toString());
      const { clientHeight: trackSize } = track;
      console.log(scrollTrackRef.current, trackSize);
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, []);

  return (
    <Container>
      <Content ref={contentRef} {...rest}>
        {children}
      </Content>
      <Scrollbar>
        <TrackAndThumb>
          <Track ref={scrollTrackRef}></Track>
          <Thumb ref={scrollThumbRef} height={thumbHeight}></Thumb>
        </TrackAndThumb>
      </Scrollbar>
    </Container>
  );
};

export default CustomScrollbar;

const Container = styled.div`
  background-color: white;
  border: 1px solid #333;
  border-radius: 12px;
  display: grid;
  height: 100%;
  grid-template: auto / 1fr 50px;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  height: 90vh;
  -ms-overflow-style: none;
  overflow: auto;
  padding: 0 1rem;
  scrollbar-width: none;
`;

const Scrollbar = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: row;
  grid-template: auto 1fr auto / 1fr;
  padding: 1rem;
  place-items: center;
`;

const TrackAndThumb = styled.div`
  display: block;
  height: 100%;
  position: relative;
  width: 16px;
`;

const Track = styled.div`
  background-color: gray;
  bottom: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 16px;
`;

const Thumb = styled.div<{ height: number }>`
  background-color: #333;
  position: absolute;
  height: ${(props) => props.height}px;
  width: 16px;
`;

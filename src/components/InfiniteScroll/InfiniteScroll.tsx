import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";

import { throttle } from "../../lib/throttle";

import s from "./InfiniteScroll.module.scss";

type InfiniteScrollProps<T> = PropsWithChildren<{
  data: T[];
  scrollThreshold: number;
  render: (data: T) => JSX.Element;
  onScrollThresholdUp: () => void;
  onScrollThresholdDown: () => void;
}>;

export function InfiniteScroll({
  data,
  scrollThreshold,
  render,
  onScrollThresholdUp,
  onScrollThresholdDown,
  children,
}: InfiniteScrollProps<any>) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) {
      return;
    }

    const current = element.current;

    const handleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = current;

      if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
        onScrollThresholdDown();
      } else if (scrollTop <= scrollThreshold) {
        onScrollThresholdUp();
      }
    });

    current.addEventListener("scroll", handleScroll);

    return () => {
      current.removeEventListener("scroll", handleScroll);
    };
  }, [element, onScrollThresholdDown, onScrollThresholdUp, scrollThreshold]);

  return (
    <div className={s.root} ref={element}>
      {data.map((dataEntry) => render(dataEntry))}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import s from "./InfiniteScroll.module.scss";

import { throttle } from "../lib/throttle";

type Props<T> = {
  fetchUrl: string;
  threshold?: number;
  render: (data: T) => JSX.Element;
};

export function InfiniteScroll({
  fetchUrl,
  render,
  threshold = 100,
}: Props<any>) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const scrollArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${fetchUrl}?page=${page}`)
      .then((response) => response.json())
      .then((d) => {
        setData((data) => [...data, ...d.results]);
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    if (!scrollArea.current) {
      return;
    }

    if (isLoading) {
      return;
    }

    const current = scrollArea.current;

    const handleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = current;

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        setPage((page) => page + 1);
      }
    }, 100);

    current.addEventListener("scroll", handleScroll);

    return () => {
      current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={s.root}>
      <div className={s.scrollable} ref={scrollArea}>
        {data.map((dataEntry) => render(dataEntry))}
        {isLoading && <div className={s.loading}>Loading...</div>}
      </div>
      <div className={s.debugger}>
        <div>Current page: {page}</div>
        <div>Loaded data length: {data.length}</div>
      </div>
    </div>
  );
}

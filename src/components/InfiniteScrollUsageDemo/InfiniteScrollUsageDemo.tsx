import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";

import { DataEntry, data } from "./dummyData";

import s from "./InfiniteScrollUsageDemo.module.scss";

export function InfiniteScrollUsageDemo() {
  return (
    <div className={s.root}>
      <h1>Usage demo</h1>
      <InfiniteScroll
        data={data}
        scrollThreshold={100}
        onScrollThresholdUp={() => {
          console.log("onScrollThresholdUp");
        }}
        onScrollThresholdDown={() => {
          console.log("onScrollThresholdDown");
        }}
        render={(data: DataEntry) => {
          return (
            <div className={s.dataEntry}>
              <div className={s.dataEntry__id}>{data.id}</div>
              <div className={s.dataEntry__title}>{data.author}</div>
              <div className={s.dataEntry__body}>{data.url}</div>
            </div>
          );
        }}
      />
    </div>
  );
}

import { InfiniteScroll } from "./InfiniteScroll/InfiniteScroll";

import s from "./App.module.scss";

type DataEntry = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

function App() {
  return (
    <div className={s.root}>
      <InfiniteScroll
        fetchUrl="https://rickandmortyapi.com/api/character/"
        render={(data: DataEntry) => {
          return (
            <div className={s.dataEntry}>
              <div>
                <img className={s.dataEntry_image} src={data.image} alt="" />
              </div>
              <div>
                <div className={s.dataEntry_name}>Name: {data.name}</div>
                <div className={s.dataEntry_species}>
                  Species: {data.species}
                </div>
                <div className={s.dataEntry_status}>Status: {data.status}</div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default App;

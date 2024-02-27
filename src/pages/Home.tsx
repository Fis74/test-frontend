import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import Search from "../components/Search";

const Home = () => {
  return (
    <main>
      <Search />
      <Filter />
      <ProductList />
    </main>
  );
};

export default Home;

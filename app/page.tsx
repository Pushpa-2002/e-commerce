import NewlyArrivedProducts from "./products/NewlyArrivedProducts";
import OnSaleProducts from "./products/OnSaleProducts";

export default function HomePage() {
  return (
    <>
      <NewlyArrivedProducts />
      <OnSaleProducts />
    </>
  );
}

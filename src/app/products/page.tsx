import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const Products = () => (
  <div>
    <h1>Products</h1>
    <Button onClick={logout}>Sair</Button>
  </div>
);

export default Products;

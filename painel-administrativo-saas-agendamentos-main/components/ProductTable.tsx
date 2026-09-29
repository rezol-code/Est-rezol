```typescript
import React from "react";

interface ProductTableProps extends Props {
  products: any[];
}

function ProductTable({ products, ...props }: ProductTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr>
            <td>{product.title}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
```
```typescript
import { Form, Field } from "react-hook-form";

interface ProductFormProps extends FormProps {
  product: any;
}

function ProductForm({ product, ...props }: ProductFormProps) {
  return (
    <Form
      {...props}
      // ...
    />
  );
}

export default ProductForm;
```
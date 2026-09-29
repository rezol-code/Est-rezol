```typescript
import React from "react";

interface ModelTableProps extends Props {
  models: any[];
}

function ModelTable({ models, ...props }: ModelTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Model</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => (
          <tr>
            <td>{model.title}</td>
            <td>
              <button>
                // ...
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ModelTable;
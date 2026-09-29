import React from "react";

interface ModelFormProps extends FormProps {
  model: any;
}

function ModelForm({ model, ...props }: ModelFormProps) {
  return (
    // TODO: Error handling
    <form {...props}>
      <label>
        Título:
        <input type="text" value={model.title} onChange={(e) => model.title = e.target.value} />
      </label>
      <label>
        Descrição:
        <textarea value={model.description} onChange={(e) => model.description = e.target.value} />
      </label>
    </form>
  );
}

function ModelTable({ models, ...props }: ModelTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Model</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => (
          <tr key={model.id}>
            <td>{model.title}</td>
            <td>{model.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ModelTable;
            <td>{model.description}</td>

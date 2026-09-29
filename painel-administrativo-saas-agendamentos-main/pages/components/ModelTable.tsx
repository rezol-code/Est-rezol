import { NextApiRequest, NextApiResponse } from "next";

/*
// ... existente código ...
*/

function modelsApi(req: NextApiRequest, res: NextApiResponse) {
  const models = [
    { id: 1, title: "Modelo 1", description: "Descrição 1" },
    { id: 2, title: "Modelo 2", description: "Descrição 2" },
  ];

  return res.json(models);
}

export default modelsApi;

/*
// ... existente código ...
*/


import { Request, Response } from "express";
import { RemoveOrderService } from '../../services/order/RemoveOrderService'


class RemoveOrdemController{

    async handle(req: Request, res: Response ){
        const order_id = req.query.order_id as string;

        const removeOrdem = new RemoveOrderService();

        const order =  await removeOrdem.execute({
            order_id

        });

        return res.json(order);

    }

}

export{ RemoveOrdemController}
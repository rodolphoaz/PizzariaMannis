import { Request, Response }from 'express'
import{CreateProductServices} from '../../services/product/CreateProductServices'

class CreateProductController{
    async handle(req: Request , res: Response){
        const{ name, price, description, category_id }= req.body;

        

        const createProductServices =  new CreateProductServices();

        if(!req.file){
           throw new Error("cadastro sem imagem - error upload file") 
        }else{

            const { originalname, filename: banner} = req.file;
        

            const product = await createProductServices.execute({
                name,
                price,
                description,
                banner,
                category_id
             });

             return res.json(product)
        }
        
       

        
    }
}

export{CreateProductController}
var ProductSchema=require('../models/productSchema')
var db=require('../config/db')
class product{
    static async Addproduct(req,res){
        try{
            var InputData=req.body
            await ProductSchema.create(InputData)
            .then((data)=>{
              res.status(200)
              .json({ message: 'Added ' });
            }).catch((err)=>{
              res.status(502).json({ message: err.message });
            })
      
        }catch(error){
            console.error('Error Adding products:', error);
            res.status(500)
            .json({ message: 'Server error' });
        } 
    }
    static async SerchProduct(req, res){
        const searchTerm = req.query.text;
        try {
          const products = await ProductSchema.find({
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
              { 'variants.name': { $regex: searchTerm, $options: 'i' } }
            ]
          });
          if(products){
            res.status(200).json({status: true,
              message: 'Products found',
              data: products});

          }else{
            res.status(200).json({status: true,
            message: 'Products not found',
            data: null });
          }
        } catch (error) {
          console.error('Error searching products:', error);
          res.status(500).json({ status: false,
            message: 'Server error',
            data: null });
        }
      }


    static async UpdateProduct(req,res){
      try {
        var productId=req.query._id
        var updateData=req.body
        await ProductSchema.findByIdAndUpdate(productId, updateData, { new: true }).then((data)=>{
          res.status(200)
          .json({ message: 'update successfull',data:data});
        }).catch((err)=>{
          res.status(502).json({ message: err.message });
        })
      } catch (error) {
        console.error('Error Updataing  products:', error);
            res.status(500)
            .json({ message: 'Server error' });
      }
    }
    static async DeleteProduct(req,res){
      try{
        var productId=req.query.id
      var data=await ProductSchema.findByIdAndRemove(productId)
      if(data){
        console.log(data)
        res.status(200)
        .json({ message: 'Deleted successfull'});
      }else{
        res.status(200).json({ message: "not found" });
      }
      }
      catch(error){
        console.error('Error Deleting products:', error);
            res.status(500)
            .json({ message: 'Server error' });
      }
    }

}

module.exports=product
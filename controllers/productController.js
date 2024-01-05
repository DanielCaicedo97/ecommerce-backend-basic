import Product from "../models/Product.js";
import fs from "fs-extra";
import { 
    uploadImage, 
    deleteImage 
} from "../helper/cloudinary.js";

const test = (req, res) => {
    res.send({
        msg: "In this route, we will handle all requests related to the Product model",
    });
};

const createProducts = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        let image;

        if (req.files !== null) {
            if (req.files.image) {
                const result = await uploadImage(req.files.image.tempFilePath);
                await fs.remove(req.files.image.tempFilePath);
                image = {
                    url: result.secure_url,
                    public_id: result.public_id,
                };
            }
        } else {
            image = {
                url: "https://res.cloudinary.com/dniqcd4qg/image/upload/v1669184946/sample.jpg",
                public_id: "sample",
            };
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image,
            stock,
        });

        await newProduct.save();
        return res.json(newProduct);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        if (!oneProduct) {
            return res.sendStatus(404);
        } else {
            return res.json(oneProduct);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updateProducts = async (req, res) => {
    const { id, name, description, price, stock } = req.body;

    try {
        const updateProduct = await Product.findById(id);
        updateProduct.name = name;
        updateProduct.description = description;
        updateProduct.price = price;
        updateProduct.stock = stock;

        if (req.files !== null) {
            if (req.files.image) {
                if (updateProduct.image.public_id &&
                    updateProduct.image.public_id !== "products/blackandwhiteproduct_ty6jw2") {
                    await deleteImage(updateProduct.image.public_id);
                }

                const result = await uploadImage(req.files.image.tempFilePath);
                await fs.remove(req.files.image.tempFilePath);
                updateProduct.image = {
                    url: result.secure_url,
                    public_id: result.public_id,
                };
            } else {
                updateProduct.image = {
                    url: "https://res.cloudinary.com/dniqcd4qg/image/upload/v1669184946/sample.jpg",
                    public_id: "sample",
                };
            }
        } else {
            if (!updateProduct.image.public_id) {
                updateProduct.image = {
                    url: "https://res.cloudinary.com/dniqcd4qg/image/upload/v1669184946/sample.jpg",
                    public_id: "sample",
                };
            }
        }

        await updateProduct.save();
        return res.status(204).json(updateProduct);
    } catch (error) {
        console.log(error.message);
    }
};

const deleteProducts = async (req, res) => {
    try {
        const productRemoved = await Product.findByIdAndDelete(req.params.id);

        if (!productRemoved) {
            return res.sendStatus(404);
        } else {
            if (productRemoved.image.public_id &&
                productRemoved.image.public_id !== "products/blackandwhiteproduct_ty6jw2") {
                await deleteImage(productRemoved.image.public_id);
            }
            return res.status(200).json({ msg: "Product successfully deleted" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    test,
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    getProduct,
};

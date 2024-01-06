import Sale from "../models/Sale.js";

const test = (request, response) => {
  const successMessage = "Test successfully handled Sales routes correctly";

  response.send({
    msg: successMessage,
  });
};

const createSale = async (req, res) => {
  try {
    const { items, total } = req.body;

    // Validate if required fields are present in the request body
    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !total ||
      isNaN(total)
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid sale information. Please provide valid items array and total.",
        });
    }

    // Additional validation logic can be added here based on your specific requirements

    const newSale = new Sale({
      customer: req.body.customer,
      items: req.body.items,
      total: req.body.total,
      confirmed: req.body.confirmed || false,
      status: req.body.status || "active",
    });

    const saleSaved = await newSale.save();
    res.status(201).json(saleSaved);
  } catch (error) {
    console.error("Error creating sale:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getSale = async (req, res) => {
  try {
    const oneSale = await Sale.findById(req.params.id);
    if (!oneSale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    return res.status(200).json({ sale: oneSale });
  } catch (error) {
    console.error("Error retrieving sale:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    console.log("Error retrieving sale:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSale = async (req, res) => {
  try {
    const saleStatus = await Sale.findById(req.params.id);

    // Validate if sale exists
    if (!saleStatus) {
      return res.status(404).json({ error: "Sale not found" });
    }

    // Validate if the sale status is "active"
    if (saleStatus.status === "active") {
      saleStatus.status = "canceled";
      await saleStatus.save();
      return res.status(204).end(); // 204 No Content indicates successful update with no response body
    } else {
      return res.status(409).json({ error: "The sale is already canceled" }); // 409 Conflict indicates a conflict with the current state
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export { test, getSales, getSale, createSale, updateSale };

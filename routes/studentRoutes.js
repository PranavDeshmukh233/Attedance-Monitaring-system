import express from "express";
import {
  // brainTreePaymentController,
  // braintreeTokenController,
  // createProductController,
  // deleteProductController,
  // getProductController,
  // getSingleProductController,
  // productCategoryController,
  // productCountController,
  // productFiltersController,
  // productListController,
  productPhotoController,
  // realtedProductController,
  // searchProductController,
  // updateProductController,
} from "../controllers/productController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import studentModel from "../models/studentModel.js";

const router = express.Router();

//routes
router.post("/postattendance", async (req, res) => {
  try {
    const { name, newdate, status, longitude, latitude } = req.body;
    // Find student by ID or any other identifier
    const student = await studentModel.findOne({
      name,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Add attendance entry
    // const newAttendance = { date: date, status: status };
    student.attendance.push({ date: newdate, status: status });
    student.coordinates.push({ longitude: longitude, latitude: latitude });

    await student.save();
    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// //routes
// router.put(
//   "/update-product/:pid",
//   requireSignIn,
//   isAdmin,
//   formidable(),
//   updateProductController
// );

//get products
router.get("/getstudent", async (req, res) => {
  try {
    // Fetch all students from the database
    const student = await studentModel.find({});
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

//single product
// router.get("/get-product/:slug", getSingleProductController);

// //get photo
router.get("/student-photo/:pid", productPhotoController);

// //delete rproduct
// router.delete("/delete-product/:pid", deleteProductController);

// //filter product
// router.post("/product-filters", productFiltersController);

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

// //search product
// router.get("/search/:keyword", searchProductController);

// //similar product
// router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);

// //payments routes
// //token
// router.get("/braintree/token", braintreeTokenController);

// //payments
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;

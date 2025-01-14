const express = require("express");
const router = express.Router();

const {
    addRSVP,
    fetchRSVP,
    getRSVP,
    detailRSVP,
    updateRSVP,
    deleteRSVP,
} = require("../controllers/rsvp");

const middleware = require("../middleware");

router.post("/add", [ middleware.verifyJWT ], addRSVP);
router.get("/fetch", [ middleware.verifyJWT ], fetchRSVP);
router.get("/get/:id", getRSVP);
router.get("/detail/:id", [ middleware.verifyJWT ], detailRSVP);
router.put("/update/:id", [ middleware.verifyJWT ], updateRSVP);
router.delete("/delete/:id", [ middleware.verifyJWT ], deleteRSVP);

module.exports = router;
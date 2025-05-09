//backend for evaluation page (sample code only para mag work ang website)
const express = require('express');
const router = express.Router();
const db = require('../database/db');
require('dotenv').config();

router.get('/',async (req, res) => {
try {
    const fullTable = await db.fullEvaluationPage();
    res.status(200).json(fullTable); //sends the data of the joined eval and iventory table to the frontend

} catch (error) {
    console.log("Evaluation Table database error: ", error)
}
});

router.post('/', async (req, res) => {
    const {
        inventory_id, 
        gown_condition, gown_repair, gown_damage, gown_remarks, 
        hood_condition, hood_repair, hood_damage, hood_remarks, 
        tassel_condition, tassel_missing, tassel_damage, tassel_remarks, 
        cap_condition, cap_deform, cap_remarks
    } = req.body
    try {
        const evaluationRows = await db.evalPage(); // returns all rows

        // Check if may existing inventory_id sa eval table
        const existingEval = evaluationRows.find(row => row.inventory_id === inventory_id);
        
        if (existingEval) {
          // update if inventory_id already exists in eval table
          await db.updateEval(
            inventory_id, 
            gown_condition, gown_repair, gown_damage, gown_remarks, 
            hood_condition, hood_repair, hood_damage, hood_remarks, 
            tassel_condition, tassel_missing, tassel_damage, tassel_remarks, 
            cap_condition, cap_deform, cap_remarks
          );
        } else {
          // insert the info if inventory_id is not found
          await db.evalForm({
            inventory_id, 
            gown_condition, gown_repair, gown_damage, gown_remarks, 
            hood_condition, hood_repair, hood_damage, hood_remarks, 
            tassel_condition, tassel_missing, tassel_damage, tassel_remarks, 
            cap_condition, cap_deform, cap_remarks
          });
        }
        console.log("Evaluation saved successfully.");
    } catch (error) {
        console.log("error in evaluation table: ", error); //debug error
    }
    


});

module.exports = router;

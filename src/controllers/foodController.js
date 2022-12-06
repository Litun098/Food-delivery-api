const crud = require('../service/crudService');
const Food = require('../models/food');
const Restaurant = require('../models/restaurant');

const create = async (req, res) => {
    try {
        const food = await crud.create(Food, req.body);
        const restaurant = await crud.getById(Restaurant, req.body.restaurant);
        restaurant.food.push(food);
        restaurant.save();
        return res.status(200).json({ msg: "Successfully added new food item", success: true, data: food });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong.", success: false });
    }
}
const destroy = async (req, res) => {
    try {
        const restaurant = await crud.getById(Restaurant, req.params.restaurantId);
        restaurant.food.forEach((foodItem, index, object) => {
            if (foodItem.id == req.params.id) {
                object.splice(index, 1);
            }
        })
        const food = await crud.destroy(Food, req.params.id);
        return res.status(200).json({ msg: "Successfully added new food item", success: true, data: food });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong.", success: false });
    }
}

module.exports = {
    create,
    destroy
}
import FoodItem from "../../Item/FoodItem";
import ActivityBase from "./ActivityBase";

class GetWaterActivity extends ActivityBase {

  useActivity(player) {
    super.useActivity(player);

    player.addItem(new FoodItem("water", "Full Canteen", "water", 100));
  }

}

export default GetWaterActivity;

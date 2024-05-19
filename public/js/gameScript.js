import { TREES_LIST } from "./config.js";
import { addTreeMarkerToMap } from "./mapScript.js";

TREES_LIST.forEach((treeItem) => {
  const randomlySelected = Math.floor(Math.random() * 5) === 0;
  if (randomlySelected) {
    const location = treeItem.coords.split(",");
    addTreeMarkerToMap(location, treeItem.scientific_name);
  }
});

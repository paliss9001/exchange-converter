import Tabs from "./Tabs";
import {generateTabs} from "../helpers/functions";

export default function Analytics({ tab, setTab, screenWidth, favoritesCount }) {
  function handleActive(e) {
    const currentTab = e.target.dataset["tab"];

    setTab(currentTab);
  }


  const options = ["history", "compare", ["favorites", favoritesCount], "log"]
  
  const optionObjects = []
  for (const option of options) {
    optionObjects.push({
      label: option, value: option + "-id"
    })
  }

  const targetTabs = screenWidth > 767 ? (
    <ul className="analytics__list">
      {generateTabs(
        tab,
        options,
        handleActive,
        "analytics__item"
      )}
    </ul>) :
    <Tabs options={optionObjects} setTab={setTab} tab={tab} favoritesCount={favoritesCount} />

  return (
    <section className="analytics content-container">
      <nav className="analytics__navigation"></nav>
      {targetTabs}
    </section>
  );
}



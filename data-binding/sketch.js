function CountryData() {
  const items = ["USA", "India", "Germany"];

  function prepareData() {
    return d3
      .select("ul")
      .selectAll("li")
      .data(items, data => data);
  }

  function render(items) {
    prepareData()
      .enter()
      .append("li")
      .text((data) => data);
  }

  return {
    items: () => items,
    initView: () => render(),
    addItem: item => {
      items.push(item);
      render(items);
    },
    removeItem: index => {
      items.splice(index, 1);
      prepareData().exit().remove();
      render(items);
    },
    updateItem: (index, item) => {
      items[index] = item;
      prepareData().exit().remove();
      render(items);
    }
  }
}

const countryData = CountryData();

// setup
countryData.initView();

// Simulate user adding a country
setTimeout(() => {
  countryData.addItem("China");
}, 2000);

// Simulate user removing a country
setTimeout(() => {
  countryData.removeItem(1);
}, 4000);

// Simulate user updating a country
setTimeout(() => {
  countryData.updateItem(0, "United Kingdom");
}, 6000);
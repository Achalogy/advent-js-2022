function howManyReindeers(reindeerTypes, gifts) {
  return gifts.map((gift) => {
    let currentMax = gift.weight;
    let weights = Object.values(reindeerTypes)
      .map((x) => [x.type, x.weightCapacity])
      .filter((x) => x[1] < currentMax)
      .sort((x, y) => y[1] - x[1]);
    let currentCapacity = weights.reduce((acc, curr) => (acc += curr[1]), 0);

    let reindeerQuantity = weights.map(([type, weight]) => {
      let quantity = (currentMax / currentCapacity) >> 0;
      currentCapacity -= weight;
      currentMax -= quantity * weight;
      return { type, num: quantity };
    });

    return { country: gift.country, reindeers: reindeerQuantity };
  });
}

module.exports = howManyReindeers
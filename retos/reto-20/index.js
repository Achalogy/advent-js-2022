function howManyReindeers(reindeerTypes, gifts) {
  return gifts.map((gift) => {
    let max = gift.weight;
    let reindeers = reindeerTypes
      .map((x) => [x.type, x.weightCapacity])
      .filter((x) => x[1] < max)
      .sort((a, b) => a[1] - b[1]); // Menor a Mayor

    let res = reindeers.map(([type]) => ({
      type,
      num: 0,
    }));

    reindeers.map((_, i) => {
      let sliced = reindeers.slice(0, reindeers.length - i)
      let sum = sliced.reduce((sum, e) => sum + e[1], 0);
      sliced.map((_, i) => {
        res[i].num += Math.floor(max / sum);
      });
      max %= sum;
    });

    return {
      country: gift.country,
      reindeers: res.reverse(),
    };
  });
}

module.exports = howManyReindeers
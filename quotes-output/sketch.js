const quotes = [
  ["An apt quotation is like a lamp which flings its light over the whole sentence.", "Letitia Elizabeth Landon"],
  ["If you want to make your dreams come true, the first thing you have to do is wake up.", "J.M. Power"],
  ["Leadership has a harder job to do than just choose sides. It must bring sides together.", "Jesse Jackson"],
  ["To avoid criticism do nothing, say nothing, be nothing.", "Elbert Hubbard"],
  ["By the time you get to your ball, if you don't know what to do with it, try another sport.", "Julius Boros"],
  ["The way to love anything is to realize that it may be lost.", "Gilbert K. Chesterton"],
  ["I have a fine sense of the ridiculous, but no sense of humor.", "Edward Albee"]
];

function render(quote) {
  return `
    "${quote[0]}"
    <div>
      <cite>-- ${quote[1]}</cite>
    </div>
  `;
}

d3.select(".output")
  .selectAll()
  .data(quotes)
  .enter()
  .append("blockquote")
  .html(render);

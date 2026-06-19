module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    }
  };
};

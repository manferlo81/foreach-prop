const filter = (content, exclude) => content
  .split(",")
  .map((item) => item.trim())
  .filter((item) => {
    let name = item;
    const match = name.match(/\w+ as (\w+)/);
    if (match) {
      name = match[1];
    }
    return exclude.indexOf(name) === -1;
  })
  .join(", ");

const unexport = (...exclude) => {

  return {

    renderChunk(code) {
      return code
        .replace(/export\s*\{(.*)\}/, (m, content) => {
          return `export { ${filter(content, exclude)} }`;
        });
    },

  };

};

export default unexport;

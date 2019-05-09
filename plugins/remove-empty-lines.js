const removeEmptyLines = () => ({

  renderChunk(code) {
    return code
      .replace(/\r/g, "\n")
      .replace(/\n+/g, "\r\n");
  },

});

export default removeEmptyLines;

const checkInputText = (inputText) => {
  const inputTextEmpty = !inputText.value || inputText.value.length === 0;
  if (inputTextEmpty) {
    return "empty";
  } else {
    return false;
  }
};

const checkInputFile = (inputFile) => {
  const inputFileEmpty = !inputFile.files || !inputFile.files[0];
  if (inputFileEmpty) {
    return "empty";
  } else {
    const file = inputFile.files[0];
    const validFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    const maximumFileSize = 4000000; // Size in bytes
    if (!validFileTypes.includes(file.type)) {
      return "type";
    } else if (file.size > maximumFileSize) {
      return "size";
    } else {
      return false;
    }
  }
};

export const checkInput = (input) => {
  switch (input.type) {
    case "text":
      return checkInputText(input);
    case "file":
      return checkInputFile(input);
    default:
      console.warning(`Unknown input type : ${input.type}.`);
  }
};

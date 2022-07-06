export function validateForm(setInput, input, setInvalid, setMsgError) {
  const isNameValid = validateInputName(input.name);
  const isWeightMinValid = validateInputWeightMin(input);
  const isWeightMaxValid = validateInputWeightMax(input);
  const isHeightMinValid = validateInputHeightMin(input);
  const isHeightMaxValid = validateInputHeightMax(input);
  const isLifeSpanValid = validateInputLifeSpan(input);

  if (isNameValid?.error) {
    setInvalid(true);
    setMsgError(isNameValid.error);
  } else {
    setMsgError("");
  }
  if (isWeightMinValid?.error) {
    setInvalid(true);
    setMsgError(isWeightMinValid.error);
  }
  if (isWeightMaxValid?.error) {
    setInvalid(true);
    setMsgError(isWeightMaxValid.error);
  }
  if (isHeightMinValid?.error) {
    setInvalid(true);
    setMsgError(isHeightMinValid.error);
  }
  if (isHeightMaxValid?.error) {
    setInvalid(true);
    setMsgError(isHeightMaxValid.error);
  }
  if (isLifeSpanValid?.error) {
    setInvalid(true);
    setMsgError(isLifeSpanValid.error);
  }
  if (input.temperament.length === 0) {
    setInvalid(true);
  }
  if (
    isNameValid === true &&
    isWeightMinValid === true &&
    isWeightMaxValid === true &&
    isHeightMinValid === true &&
    isHeightMaxValid === true &&
    isLifeSpanValid === true &&
    input.temperament.length > 0
  ) {
    setMsgError("");
    setInvalid(false);
    return 'success'
  }
}
// --------------     INPUT NAME     --------------
function validateInputName(name) {
  if (name === "") return;
  const expresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
  if (name.match(expresion) !== null) {
    return { error: "El nombre de la raza deben ser solo letras." };
  } else {
    return true;
  }
}
// --------------     INPUT WEIGHT     --------------
function validateInputWeightMin(input) {
  if (input.weightMin === "") return;
  const expresion = /[A-Z/a-z/,*-+._&=]/gi;
  if (input.weightMin.match(expresion) && input.weightMin !== "") {
    return { error: "El peso solo pueden ser números enteros." };
  }
  if ((input.weightMin < 5 || input.weightMin > 180) && input.weightMin !== "") {
    return { error: "El peso mínimo debe estar entre 5 y 180" };
  }
  if (parseInt(input.weightMax) <= parseInt(input.weightMin) && input.weightMax !== "") {
    return { error: "El peso mínimo no puede ser mayor que el peso máximo." };
  } else {
    return true;
  }
}

function validateInputWeightMax(input) {
  if (input.weightMax === "") return;
  const expresion = /[A-Z/a-z/,*-+._&=]/gi;
  if (input.weightMax.match(expresion)) {
    return { error: "El peso solo pueden ser numeros enteros." };
  }
  if (input.weightMax < 5 || input.weightMax > 180) {
    return { error: "El peso máximo debe estar entre 5 y 180." };
  }
  if (parseInt(input.weightMin) >= parseInt(input.weightMax) && input.weightMin !== "") {
    return { error: "El peso máximo no puede ser menor que el peso mínimo" };
  } else {
    return true;
  }
}

// --------------     INPUT HEIGHT     --------------
function validateInputHeightMin(input) {
  if (input.heightMin === "") return;
  const expresion = /[A-Z/a-z/,*-+._&=]/gi;
  if (input.heightMin.match(expresion) && input.heightMin !== "") {
    return { error: "La altura solo pueden ser números enteros." };
  }
  if ((input.heightMin < 15 || input.heightMin > 150) && input.heightMin !== "") {
    return { error: "La altura mínimo debe estar entre 15 y 150" };
  }
  if (parseInt(input.heightMax) < parseInt(input.heightMin) && input.heightMax !== "") {
    return { error: "La altura mínimo no puede ser mayor que el peso máximo." };
  } else {
    return true;
  }
}

function validateInputHeightMax(input) {
  if (input.heightMax === "") return;
  const expresion = /[A-Z/a-z/,*-+._&=]/gi;
  if (input.heightMax.match(expresion)) {
    return { error: "El altura solo pueden ser numeros enteros." };
  }
  if (input.heightMax < 15 || input.heightMax > 150) {
    return { error: "El altura máximo debe estar entre 15 y 150." };
  }
  if (parseInt(input.heightMin) > parseInt(input.heightMax) && input.heightMin !== "") {
    return { error: "El altura máximo no puede ser menor que el peso mínimo" };
  } else {
    return true;
  }
}

// --------------     INPUT LIFE SPAN     --------------
function validateInputLifeSpan(input) {
  if (input.life_span === "") return;
  const expresion = /[A-Z/a-z/,*-+._&=]/gi;
  if (input.life_span.match(expresion)) {
    return { error: "El promedio de vida solo puede ser un número entero" };
  }
  if (input.life_span < 1 || input.life_span > 15) {
    return { error: "El promedio de vida debe ser un número del 1 al 15." };
  }else{
    return true;
  }
}

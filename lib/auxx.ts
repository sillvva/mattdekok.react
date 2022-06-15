export const conClasses = (str: boolean | string | (string | boolean)[]) => {
  return (Array.isArray(str) ? str : typeof str == "string" ? str.split(" ") : []).filter(s => !!s && typeof s == "string").join(" ");
};

export const parseCSSModules = (module: { [key: string]: string }, styles?: (string | boolean)[]) => {
  const parsed = (styles || [])
    .map(c =>
      typeof c === "string"
        ? c
            .split(" ")
            .map(c2 => module[c2] ?? c2)
            .join(" ")
        : c
    )
    .filter(c => typeof c === "string");
  return conClasses(parsed);
};

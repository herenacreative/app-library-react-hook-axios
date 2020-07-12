

export const convertObjectToParams = (params = null) => {
    if (!params) return "";
    const result = [];
    Object.keys(params).map(key => result.push(`${key}=${params[key]}`));
    return `?${result.join("&")}`;
  };
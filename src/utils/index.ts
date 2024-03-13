export const transforBase64 = (file: Blob | File) => {
  return new Promise((res, rej): void => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target!.result;
      res(base64String);
    };
    reader.onerror = (e) => {
      rej(e);
    };
    reader.readAsDataURL(file);
  });
};

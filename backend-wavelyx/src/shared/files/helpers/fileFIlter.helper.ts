export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error("File is empty"), false);

  const fileExtension = file.mimetype.split("/")[1];
  const validExensions = ["jpg", "jpeg", "png", "gif"];
  if (validExensions.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
